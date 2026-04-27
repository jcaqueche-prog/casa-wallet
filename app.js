const STORAGE_KEY = "iglesia-servidores-app";

const defaultState = {
  servers: [],
  attendance: {},
};

const state = loadState();

const serverForm = document.getElementById("serverForm");
const serverBirthday = document.getElementById("serverBirthday");
const attendanceDate = document.getElementById("attendanceDate");
const serverSearch = document.getElementById("serverSearch");
const todayLabel = document.getElementById("todayLabel");
const totalServers = document.getElementById("totalServers");
const presentToday = document.getElementById("presentToday");
const absentToday = document.getElementById("absentToday");
const serverCards = document.getElementById("serverCards");
const attendanceList = document.getElementById("attendanceList");
const serverCardTemplate = document.getElementById("serverCardTemplate");
const attendanceRowTemplate = document.getElementById("attendanceRowTemplate");
const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const views = Array.from(document.querySelectorAll(".view"));

serverForm.addEventListener("submit", handleCreateServer);
attendanceDate.addEventListener("change", renderApp);
serverSearch.addEventListener("input", renderApp);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.viewTarget));
});

initializeControls();
renderApp();
setActiveView("servidores");

function initializeControls() {
  const today = getTodayIso();
  todayLabel.textContent = formatDate(today);
  attendanceDate.value = today;
  serverBirthday.value = today;
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return structuredClone(defaultState);
    }

    const parsed = JSON.parse(saved);
    return {
      servers: Array.isArray(parsed.servers) ? parsed.servers : [],
      attendance: parsed.attendance && typeof parsed.attendance === "object" ? parsed.attendance : {},
    };
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function handleCreateServer(event) {
  event.preventDefault();
  const formData = new FormData(serverForm);
  const name = String(formData.get("name") || "").trim();
  const birthday = String(formData.get("birthday") || "");
  const phone = String(formData.get("phone") || "").trim();
  const address = String(formData.get("address") || "").trim();

  if (!name || !birthday || !phone || !address) {
    return;
  }

  state.servers.unshift({
    id: crypto.randomUUID(),
    name,
    birthday,
    phone,
    address,
  });

  saveState();
  serverForm.reset();
  serverBirthday.value = getTodayIso();
  renderApp();
}

function renderApp() {
  renderSummary();
  renderServerCards();
  renderAttendanceList();
}

function renderSummary() {
  const dateKey = attendanceDate.value || getTodayIso();
  const attendanceForDate = state.attendance[dateKey] || {};
  const presentCount = state.servers.filter(
    (server) => attendanceForDate[server.id]?.status === "Asistio"
  ).length;
  const absentCount = state.servers.filter(
    (server) => attendanceForDate[server.id]?.status === "No asistio"
  ).length;

  totalServers.textContent = String(state.servers.length);
  presentToday.textContent = String(presentCount);
  absentToday.textContent = String(absentCount);
}

function renderServerCards() {
  serverCards.innerHTML = "";
  const query = serverSearch.value.trim().toLowerCase();

  const filteredServers = state.servers.filter((server) => {
    if (!query) {
      return true;
    }

    return [server.name, server.phone, server.address].join(" ").toLowerCase().includes(query);
  });

  if (!filteredServers.length) {
    serverCards.innerHTML = `
      <article class="server-card">
        <p class="server-card__details">No hay servidores registrados todavia.</p>
      </article>
    `;
    return;
  }

  filteredServers.forEach((server) => {
    const fragment = serverCardTemplate.content.cloneNode(true);
    fragment.querySelector(".server-card__name").textContent = server.name;
    fragment.querySelector(".server-card__birthday").textContent = formatDate(server.birthday);
    fragment.querySelector(".server-card__phone").textContent = server.phone;
    fragment.querySelector(".server-card__address").textContent = server.address;
    fragment.querySelector(".server-card__delete").addEventListener("click", () => {
      deleteServer(server.id);
    });
    serverCards.appendChild(fragment);
  });
}

function renderAttendanceList() {
  attendanceList.innerHTML = "";

  if (!state.servers.length) {
    attendanceList.innerHTML = `
      <article class="attendance-row">
        <div class="attendance-cell">No hay servidores registrados.</div>
      </article>
    `;
    return;
  }

  const dateKey = attendanceDate.value || getTodayIso();
  if (!state.attendance[dateKey]) {
    state.attendance[dateKey] = {};
  }

  state.servers.forEach((server) => {
    const fragment = attendanceRowTemplate.content.cloneNode(true);
    const record = state.attendance[dateKey][server.id] || {
      status: "Pendiente",
      note: "",
    };

    fragment.querySelector(".attendance-name").textContent = server.name;
    fragment.querySelector(".attendance-phone").textContent = server.phone;

    const statusSelect = fragment.querySelector(".attendance-status");
    const noteInput = fragment.querySelector(".attendance-note");

    statusSelect.value = record.status;
    noteInput.value = record.note;

    statusSelect.addEventListener("change", (event) => {
      updateAttendance(dateKey, server.id, {
        status: event.target.value,
        note: noteInput.value.trim(),
      });
    });

    noteInput.addEventListener("change", (event) => {
      updateAttendance(dateKey, server.id, {
        status: statusSelect.value,
        note: event.target.value.trim(),
      });
    });

    attendanceList.appendChild(fragment);
  });
}

function updateAttendance(dateKey, serverId, nextValue) {
  if (!state.attendance[dateKey]) {
    state.attendance[dateKey] = {};
  }

  state.attendance[dateKey][serverId] = nextValue;
  saveState();
  renderSummary();
}

function deleteServer(serverId) {
  state.servers = state.servers.filter((server) => server.id !== serverId);
  Object.keys(state.attendance).forEach((dateKey) => {
    if (state.attendance[dateKey][serverId]) {
      delete state.attendance[dateKey][serverId];
    }
  });
  saveState();
  renderApp();
}

function setActiveView(viewName) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.viewTarget === viewName);
  });

  views.forEach((view) => {
    view.classList.toggle("view--active", view.dataset.view === viewName);
  });
}

function getTodayIso() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(value) {
  if (!value) {
    return "--";
  }

  return new Intl.DateTimeFormat("es-GT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}
