const STORAGE_KEY = "iglesia-servicios-checklist";

const GROUP_OPTIONS = [
  "Puertas y Bienvenidas",
  "Anexo A y B",
  "Anexo C y M",
  "Anexd D, E y F",
];

const TEMPLATE_TASKS = {
  domingo: [
    { title: "Revisar puertas principales", group: "Puertas y Bienvenidas", priority: "Alta" },
    { title: "Coordinar bienvenida del ingreso", group: "Puertas y Bienvenidas", priority: "Alta" },
    { title: "Verificar sillas y orden Anexo A", group: "Anexo A y B", priority: "Media" },
    { title: "Revisar limpieza Anexo C", group: "Anexo C y M", priority: "Media" },
    { title: "Preparar apoyo de orden Anexo D", group: "Anexd D, E y F", priority: "Alta" },
  ],
  oracion: [
    { title: "Abrir puertas de ingreso", group: "Puertas y Bienvenidas", priority: "Alta" },
    { title: "Ordenar Anexo B", group: "Anexo A y B", priority: "Media" },
    { title: "Preparar Anexo M", group: "Anexo C y M", priority: "Media" },
  ],
  especial: [
    { title: "Equipo extra de bienvenida", group: "Puertas y Bienvenidas", priority: "Alta" },
    { title: "Cobertura completa Anexo A", group: "Anexo A y B", priority: "Alta" },
    { title: "Apoyo especial Anexo C", group: "Anexo C y M", priority: "Alta" },
    { title: "Reforzar atencion Anexo E", group: "Anexd D, E y F", priority: "Alta" },
  ],
};

const defaultState = {
  tasks: [],
};

const state = loadState();
let activeGroup = GROUP_OPTIONS[0];

const taskForm = document.getElementById("taskForm");
const taskGroup = document.getElementById("taskGroup");
const taskDate = document.getElementById("taskDate");
const filterStatus = document.getElementById("filterStatus");
const filterDate = document.getElementById("filterDate");
const searchInput = document.getElementById("searchInput");
const clearCompletedButton = document.getElementById("clearCompletedButton");
const todayLabel = document.getElementById("todayLabel");
const boardTitle = document.getElementById("boardTitle");
const groupTabs = Array.from(document.querySelectorAll(".tab-button"));
const taskTemplate = document.getElementById("taskTemplate");
const pendingList = document.getElementById("pendingList");
const progressList = document.getElementById("progressList");
const doneList = document.getElementById("doneList");
const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const progressTasks = document.getElementById("progressTasks");
const doneTasks = document.getElementById("doneTasks");
const pendingCountBadge = document.getElementById("pendingCountBadge");
const progressCountBadge = document.getElementById("progressCountBadge");
const doneCountBadge = document.getElementById("doneCountBadge");
const quickTemplateButtons = Array.from(document.querySelectorAll(".quick-template"));

taskForm.addEventListener("submit", handleCreateTask);
filterStatus.addEventListener("change", renderApp);
filterDate.addEventListener("change", renderApp);
searchInput.addEventListener("input", renderApp);
clearCompletedButton.addEventListener("click", handleClearCompleted);
quickTemplateButtons.forEach((button) => {
  button.addEventListener("click", () => createTemplateTasks(button.dataset.template));
});
groupTabs.forEach((button) => {
  button.addEventListener("click", () => setActiveGroup(button.dataset.group));
});

initializeControls();
renderApp();

function initializeControls() {
  taskGroup.innerHTML = buildGroupOptions();
  taskDate.value = getTodayIso();
  todayLabel.textContent = formatDate(getTodayIso());
  taskGroup.value = activeGroup;
}

function buildGroupOptions() {
  return GROUP_OPTIONS.map((group) => `<option value="${escapeHtml(group)}">${escapeHtml(group)}</option>`).join("");
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return structuredClone(defaultState);
    }

    const parsed = JSON.parse(saved);
    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
    };
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function handleCreateTask(event) {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const title = String(formData.get("title") || "").trim();
  const group = String(formData.get("group") || activeGroup);
  const responsible = String(formData.get("responsible") || "").trim();
  const date = String(formData.get("date") || "");
  const priority = String(formData.get("priority") || "Media");
  const notes = String(formData.get("notes") || "").trim();

  if (!title || !responsible || !date) {
    return;
  }

  state.tasks.unshift({
    id: crypto.randomUUID(),
    title,
    group,
    responsible,
    date,
    priority,
    notes,
    status: "Pendiente",
  });

  saveState();
  taskForm.reset();
  taskDate.value = getTodayIso();
  taskGroup.value = activeGroup;
  renderApp();
}

function createTemplateTasks(templateName) {
  const template = TEMPLATE_TASKS[templateName];
  if (!template) {
    return;
  }

  const today = getTodayIso();
  template.forEach((item) => {
    state.tasks.unshift({
      id: crypto.randomUUID(),
      title: item.title,
      group: item.group,
      responsible: "Asignar responsable",
      date: today,
      priority: item.priority,
      notes: "",
      status: "Pendiente",
    });
  });

  saveState();
  renderApp();
}

function handleClearCompleted() {
  state.tasks = state.tasks.filter((task) => task.status !== "Completado");
  saveState();
  renderApp();
}

function getFilteredTasks() {
  const status = filterStatus.value;
  const date = filterDate.value;
  const query = searchInput.value.trim().toLowerCase();

  return state.tasks.filter((task) => {
    const matchesGroup = task.group === activeGroup;
    const matchesStatus = status === "Todos" || task.status === status;
    const matchesDate = !date || task.date === date;
    const matchesQuery =
      !query ||
      [task.title, task.group, task.responsible, task.notes]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return matchesGroup && matchesStatus && matchesDate && matchesQuery;
  });
}

function renderApp() {
  const tasks = getFilteredTasks();
  const pending = tasks.filter((task) => task.status === "Pendiente");
  const progress = tasks.filter((task) => task.status === "En proceso");
  const done = tasks.filter((task) => task.status === "Completado");

  renderTaskList(pendingList, pending);
  renderTaskList(progressList, progress);
  renderTaskList(doneList, done);

  totalTasks.textContent = String(tasks.length);
  pendingTasks.textContent = String(pending.length);
  progressTasks.textContent = String(progress.length);
  doneTasks.textContent = String(done.length);
  pendingCountBadge.textContent = String(pending.length);
  progressCountBadge.textContent = String(progress.length);
  doneCountBadge.textContent = String(done.length);
  boardTitle.textContent = activeGroup;
  taskGroup.value = activeGroup;

  groupTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.group === activeGroup);
  });
}

function renderTaskList(target, tasks) {
  target.innerHTML = "";

  if (!tasks.length) {
    const empty = document.createElement("div");
    empty.className = "task-card";
    empty.innerHTML = `<p class="task-notes">No hay tareas en esta columna.</p>`;
    target.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    const fragment = taskTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".task-card");
    const group = fragment.querySelector(".task-group");
    const priority = fragment.querySelector(".task-priority");
    const title = fragment.querySelector(".task-title");
    const responsible = fragment.querySelector(".task-responsible");
    const date = fragment.querySelector(".task-date");
    const notes = fragment.querySelector(".task-notes");
    const statusSelect = fragment.querySelector(".task-status-select");
    const duplicateButton = fragment.querySelector(".task-duplicate-button");
    const deleteButton = fragment.querySelector(".task-delete-button");

    group.textContent = task.group;
    priority.textContent = task.priority;
    title.textContent = task.title;
    responsible.textContent = task.responsible;
    date.textContent = formatDate(task.date);
    statusSelect.value = task.status;

    if (task.notes) {
      notes.textContent = task.notes;
      notes.classList.remove("hidden");
    }

    if (task.status === "Completado") {
      card.style.borderColor = "rgba(31, 138, 99, 0.18)";
    } else if (task.status === "En proceso") {
      card.style.borderColor = "rgba(211, 131, 39, 0.2)";
    }

    statusSelect.addEventListener("change", (event) => {
      updateTask(task.id, { status: event.target.value });
    });

    duplicateButton.addEventListener("click", () => {
      state.tasks.unshift({
        ...task,
        id: crypto.randomUUID(),
        status: "Pendiente",
      });
      saveState();
      renderApp();
    });

    deleteButton.addEventListener("click", () => {
      state.tasks = state.tasks.filter((item) => item.id !== task.id);
      saveState();
      renderApp();
    });

    target.appendChild(fragment);
  });
}

function updateTask(id, updates) {
  state.tasks = state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task));
  saveState();
  renderApp();
}

function setActiveGroup(groupName) {
  if (!GROUP_OPTIONS.includes(groupName)) {
    return;
  }

  activeGroup = groupName;
  renderApp();
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
