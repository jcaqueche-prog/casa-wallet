const STORAGE_KEY = "iglesia-servidores-app";
const DATABASE_SOURCE_VERSION = "grupo-5-excel-2026-04-29";

const SEED_SERVERS = [
  { id: "seed-1", name: "Freddy Armando Figueroa Enriquez", birthday: "1970-02-15", phone: "45240179", address: "3 av 3-15 Fuentes 1 chinautla" },
  { id: "seed-2", name: "Juan Carlos Aqueche Estrada", birthday: "1985-04-28", phone: "30112054", address: "21 calle 5-33 zona 14 edificio Vista Real" },
  { id: "seed-3", name: "David Emanuel Alvarado Callejas", birthday: "2001-09-12", phone: "41382954", address: "Avenida al cementerio las flores, Alamedas del encinal 2 zona 7 de mixco" },
  { id: "seed-4", name: "Fredy Arturo García Mendoza", birthday: "1976-09-19", phone: "41015104", address: "7 calle bulevar sur Condado San Nicolás 3 Fase 1 casa 168 zona 4 de mixco" },
  { id: "seed-5", name: "Javier Francisco Sánchez De León", birthday: "1996-04-03", phone: "30342702", address: "11 calle D 5-62 Santa Elena 2 zona 18" },
  { id: "seed-6", name: "Erwin Rafael Ortiz Vasquez", birthday: "1994-05-04", phone: "32837242", address: "Arco 2 lote 17 col. Fatima z.18" },
  { id: "seed-7", name: "Edgar Alexander Navarro", birthday: "1971-11-08", phone: "41997107", address: "23 av. 21 calle lote 151 col. Lourdes 2 zona 5" },
  { id: "seed-8", name: "Josías Naaman Casia Caxaj", birthday: "1985-03-04", phone: "43812767", address: "Ave Elena A 17 -34 zona 1" },
  { id: "seed-9", name: "Alex Arturo Moreno Villatoro", birthday: "1979-06-19", phone: "50347756", address: "28 avenida 31-62 zona 5" },
  { id: "seed-10", name: "Jorge Luis Sotomayor", birthday: "1988-03-29", phone: "57782816", address: "16 calle 09 , parque 7" },
  { id: "seed-11", name: "Alex Israel Ixcajo Urias", birthday: "1982-04-16", phone: "53556097", address: "4 calle lote 73 cerro gordo zona 21 nimajuyu." },
  { id: "seed-12", name: "Natanael Misael Ixcajo García.", birthday: "2015-04-14", phone: "53556097", address: "4 calle lote 73 cerro gordo zona 21 nimajuyu." },
  { id: "seed-13", name: "Rolando Sol Monroy", birthday: "1975-03-24", phone: "52082061", address: "10c 19av final zona 1 asentamiento santo domingo" },
  { id: "seed-14", name: "Pablo David García Velásquez", birthday: "1983-12-14", phone: "47260470", address: "32 Av a 32-73 zona 5 colonia providencia" },
  { id: "seed-15", name: "Giovanni Alvarado Garcia", birthday: "1974-08-16", phone: "30257648", address: "Av cementerio las flores condominio el encina 2 casa D4" },
  { id: "seed-16", name: "David Ezequiel García Hernández", birthday: "2012-12-04", phone: "47362961", address: "32 Av a 32-73 zona 5 colonia providencia" },
  { id: "seed-17", name: "Edwin Isai Larios Paredes", birthday: "1989-08-16", phone: "35839788", address: "Lote 19 Manzana 26 Residenciales Buena Vista Zona 18" },
  { id: "seed-18", name: "Jorge Alirio Perez", birthday: "1958-03-22", phone: "52057501", address: "Lote 23 Mz. G colonia primero de mayo zona 11 Mixco" },
  { id: "seed-19", name: "Nestor David Coy Grajeda", birthday: "1989-09-25", phone: "32176745", address: "6 calle 4-96 zona 3" },
  { id: "seed-20", name: "Eric Chutan Juárez", birthday: "1991-09-10", phone: "36860260", address: "11-63 zona 1 de la capital" },
  { id: "seed-21", name: "Renato Francisco Chacón González", birthday: "1973-04-03", phone: "47108107", address: "8 calle 0_40 Z 1" },
  { id: "seed-22", name: "Edson Raúl Rac", birthday: "1987-05-25", phone: "55376663", address: "24 calle 25-32 zona 6 barrio san Antonio" },
  { id: "seed-23", name: "Andrés Vidalio Cuchil Cedillo", birthday: "1978-01-13", phone: "44498729", address: "18 ave lote 8 zona 12 villa lobos 1" },
  { id: "seed-24", name: "Jorge Luis Mejía Mendoza", birthday: "1975-02-05", phone: "47545104", address: "29 calle 17-24 Colonia San Pedrito zona 5 ciudad Guatemala" },
  { id: "seed-25", name: "Edwin Enriquez Ruiz", birthday: "1973-10-22", phone: "52552878", address: "1ra.ave.15-76 zona 3" },
  { id: "seed-26", name: "Mario Domingo Mejia Abac", birthday: "1985-01-29", phone: "36537145", address: "35 avenida A 27-24zona 5 colonia santa ana" },
  { id: "seed-27", name: "Alexander Flores Cisneros", birthday: "1960-10-03", phone: "55348015", address: "10 calle y19 avenida zona 1" },
  { id: "seed-28", name: "Salomón Enrique Villatoro Carreto", birthday: "1981-02-12", phone: "34098039", address: "4 avenida 6-14 zona 11 colonia el Peogreso" },
  { id: "seed-29", name: "Manolo Guillermo Herrera Morataya", birthday: "1987-08-21", phone: "59393909", address: "1 calle 4av. Casa #40 Residenciales las Rosas Zona 2 Boca Del Monte Villa Canales" },
  { id: "seed-30", name: "Roberto De paz", birthday: "1986-05-12", phone: "41636070", address: "6a. Avenida Final 11-25 zona 2 hipódromo norte" },
  { id: "seed-31", name: "Oliver Roberto Flores Gómez", birthday: "1977-06-18", phone: "32415436", address: "5 avenida 8-27 zona 3" },
  { id: "seed-32", name: "Marco Antonio Gutierrez Morales", birthday: "1974-10-24", phone: "42062039", address: "5 avenida Lote 164 Col Kenedy Zona 18" },
  { id: "seed-33", name: "William Roberto Gonzales Soto", birthday: "1966-09-11", phone: "51899777", address: "31 Calle 1-25 Col. La Esperanza zona 6 de Mixco" },
  { id: "seed-34", name: "Maximiliano de Jesús Alvarez Lopez", birthday: "2026-08-08", phone: "34488357", address: "S.3 L.11 Lo de Rodriguez zona 18" },
  { id: "seed-35", name: "Byron Estuardo Melendrez Rubio", birthday: "1983-09-02", phone: "36406716", address: "25 avenida 23-73 zona 5 colonia la Palmita" },
  { id: "seed-36", name: "Estuardo Vicente Perez", birthday: "1989-11-01", phone: "50723573", address: "26 calle 1-41 zona 3" },
  { id: "seed-37", name: "Edson Yosimar Morales Alonzo", birthday: "1997-07-09", phone: "30164590", address: "14 calle B 24 colinia el limon zona 18" },
  { id: "seed-38", name: "Juan Luis Ixcoy Sarat", birthday: "1991-09-19", phone: "45701357", address: "Sector 1 casa 103 res. los olivos z 18" },
  { id: "seed-39", name: "Oscar Humberto Juarez", birthday: "1961-09-06", phone: "43639910", address: "21 av 15-63 zona 18 col. el limon" },
  { id: "seed-40", name: "Jose García", birthday: "1949-03-19", phone: "40272191", address: "6calle 1-33 zona 3 col maria Isabel" },
];

const defaultState = {
  sourceVersion: DATABASE_SOURCE_VERSION,
  servers: SEED_SERVERS.map((server) => ({ ...server })),
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
    if (parsed.sourceVersion !== DATABASE_SOURCE_VERSION) {
      return structuredClone(defaultState);
    }

    return {
      sourceVersion: DATABASE_SOURCE_VERSION,
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
