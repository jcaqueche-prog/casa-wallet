const STORAGE_KEY = "iglesia-servidores-app";
const DATABASE_SOURCE_VERSION = "grupo-5-excel-2026-04-30-checklist-v4";
const CONCILIATION_LEADERS = [
  "Juan Carlos Aqueche",
  "Giovany Alvarado",
  "Rafael Ortiz",
  "Freddy garcia",
];
const AREA_CHECKLISTS = {
  puertas: {
    title: "1- Puertas y Bienvenida",
    instructions: [
      "Ingreso principal limpio y ordenado.",
      "Equipo de bienvenida en posicion 15 min antes.",
      "Se entrego saludo y orientacion a visitantes.",
      "Puertas laterales supervisadas durante el servicio.",
    ],
  },
  anexo_ab: {
    title: "2- Anexo A y B",
    instructions: [
      "Sillas alineadas y pasillos despejados.",
      "Audio y ventilacion revisados.",
      "Limpieza general completada.",
      "Cierre de area al finalizar.",
    ],
  },
  anexo_cm: {
    title: "3- Anexo C y M",
    instructions: [
      "Materiales listos para uso.",
      "Control de ingreso en accesos.",
      "Orden y seguridad durante la actividad.",
      "Entrega de area en buen estado.",
    ],
  },
  anexo_def: {
    title: "4- Anexo D, E y F",
    instructions: [
      "Revision de iluminacion y energia.",
      "Apoyo de servidores asignados completo.",
      "Limpieza y recoleccion de desechos.",
      "Cierre final con reporte de pendientes.",
    ],
  },
};

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
  alfolis: [{ id: "line-1", name: "", position: "" }],
};

const state = loadState();

const serverForm = document.getElementById("serverForm");
const serverBirthday = document.getElementById("serverBirthday");
const addServiceButton = document.getElementById("addServiceButton");
const serviceConfigForm = document.getElementById("serviceConfigForm");
const activeServiceText = document.getElementById("activeServiceText");
const finalizeServiceButton = document.getElementById("finalizeServiceButton");
const generateConciliationButton = document.getElementById("generateConciliationButton");
const conciliationBoard = document.getElementById("conciliationBoard");
const attendanceDate = document.getElementById("attendanceDate");
const serviceDay = document.getElementById("serviceDay");
const serviceShift = document.getElementById("serviceShift");
const serviceShiftWrap = document.getElementById("serviceShiftWrap");
const exportPdfButton = document.getElementById("exportPdfButton");
const serviceTotalsText = document.getElementById("serviceTotalsText");
const yesBar = document.getElementById("yesBar");
const noBar = document.getElementById("noBar");
const yesPctText = document.getElementById("yesPctText");
const noPctText = document.getElementById("noPctText");
const yesList = document.getElementById("yesList");
const noList = document.getElementById("noList");
const areaButtons = document.getElementById("areaButtons");
const areaChecklistTitle = document.getElementById("areaChecklistTitle");
const areaChecklistBody = document.getElementById("areaChecklistBody");
const summaryMonth = document.getElementById("summaryMonth");
const summaryServiceSelect = document.getElementById("summaryServiceSelect");
const summaryPdfButton = document.getElementById("summaryPdfButton");
const summaryPreview = document.getElementById("summaryPreview");
const addAlfoliLineButton = document.getElementById("addAlfoliLineButton");
const finalizeAlfolisButton = document.getElementById("finalizeAlfolisButton");
const alfolisList = document.getElementById("alfolisList");
const savedServicesSelect = document.getElementById("savedServicesSelect");
const deleteServiceButton = document.getElementById("deleteServiceButton");
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
let serviceReady = false;
let currentConciliation = null;
let lastConciliationSignature = "";
let activeAreaKey = "puertas";

serverForm.addEventListener("submit", handleCreateServer);
addServiceButton.addEventListener("click", handleAddServiceClick);
serviceConfigForm.addEventListener("submit", handleSaveService);
attendanceDate.addEventListener("change", syncShiftVisibility);
serviceDay.addEventListener("change", syncShiftVisibility);
serviceShift.addEventListener("change", syncShiftVisibility);
exportPdfButton.addEventListener("click", exportCurrentChecklistPdf);
finalizeServiceButton.addEventListener("click", finalizeCurrentService);
generateConciliationButton.addEventListener("click", generateConciliationList);
conciliationBoard.addEventListener("click", handleConciliationBoardClick);
summaryMonth.addEventListener("change", renderSummaryView);
summaryServiceSelect.addEventListener("change", renderSummaryView);
summaryPdfButton.addEventListener("click", exportMonthlySummaryPdf);
savedServicesSelect.addEventListener("change", handleSavedServiceSelection);
deleteServiceButton.addEventListener("click", handleDeleteService);
areaButtons.addEventListener("click", handleAreaButtonClick);
addAlfoliLineButton.addEventListener("click", handleAddAlfoliLine);
finalizeAlfolisButton.addEventListener("click", exportAlfolisPdf);
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
  serviceDay.value = "Domingo";
  serviceShift.value = "AM";
  syncShiftVisibility();
  serviceConfigForm.hidden = true;
  exportPdfButton.disabled = true;
  finalizeServiceButton.disabled = true;
  generateConciliationButton.disabled = true;
  summaryMonth.value = today.slice(0, 7);
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
      alfolis: Array.isArray(parsed.alfolis) && parsed.alfolis.length
        ? parsed.alfolis
        : [{ id: "line-1", name: "", position: "" }],
    };
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function syncShiftVisibility() {
  const day = serviceDay.value;
  const weekend = day === "Sabado" || day === "Domingo";
  serviceShiftWrap.hidden = !weekend;
  if (!weekend) {
    serviceShift.value = "NA";
  } else if (serviceShift.value === "NA") {
    serviceShift.value = "AM";
  }
}

function handleAddServiceClick() {
  serviceConfigForm.hidden = false;
  addServiceButton.disabled = true;
}

function handleSaveService(event) {
  event.preventDefault();
  syncShiftVisibility();
  serviceReady = true;
  const key = getServiceKey(getCurrentServiceMeta());
  if (!state.attendance[key]) {
    state.attendance[key] = {};
  }
  saveState();
  serviceConfigForm.hidden = true;
  addServiceButton.disabled = false;
  renderApp();
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
  exportPdfButton.disabled = !serviceReady;
  finalizeServiceButton.disabled = !serviceReady;
  generateConciliationButton.disabled = !serviceReady;
  renderSummary();
  renderServerCards();
  renderSavedServices();
  renderAreaChecklist();
  renderAttendanceList();
  renderResultLists();
  renderServiceMetrics();
  renderConciliationBoard();
  renderSummaryView();
  renderAlfolis();
}

function getCurrentServiceMeta() {
  const date = attendanceDate.value || getTodayIso();
  const day = serviceDay.value || "Domingo";
  const weekend = day === "Sabado" || day === "Domingo";
  const shift = weekend ? serviceShift.value || "AM" : "NA";
  return { date, day, shift };
}

function getServiceKey(meta) {
  return `${meta.date}__${meta.day}__${meta.shift}`;
}

function applyServiceKeyToControls(serviceKey) {
  const meta = parseServiceKey(serviceKey);
  if (!meta.date || !meta.day) return;
  attendanceDate.value = meta.date;
  serviceDay.value = meta.day;
  serviceShift.value = meta.shift || "NA";
  syncShiftVisibility();
}

function renderSavedServices() {
  const keys = Object.keys(state.attendance).sort().reverse();
  const currentKey = getServiceKey(getCurrentServiceMeta());
  savedServicesSelect.innerHTML = "";

  if (!keys.length) {
    savedServicesSelect.innerHTML = `<option value="">Sin servicios guardados</option>`;
    deleteServiceButton.disabled = true;
    return;
  }

  keys.forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = formatServiceKeyLabel(key);
    savedServicesSelect.appendChild(option);
  });

  if (keys.includes(currentKey)) {
    savedServicesSelect.value = currentKey;
  } else {
    savedServicesSelect.value = keys[0];
  }

  deleteServiceButton.disabled = false;
}

function handleSavedServiceSelection() {
  const selectedKey = savedServicesSelect.value;
  if (!selectedKey) return;
  applyServiceKeyToControls(selectedKey);
  serviceReady = true;
  renderApp();
}

function handleDeleteService() {
  const selectedKey = savedServicesSelect.value;
  if (!selectedKey || !state.attendance[selectedKey]) return;

  const confirmDelete = window.confirm(
    `Seguro que quieres borrar este servicio?\n${formatServiceKeyLabel(selectedKey)}`
  );
  if (!confirmDelete) return;

  delete state.attendance[selectedKey];
  if (currentConciliation) {
    currentConciliation = null;
  }
  saveState();

  const remaining = Object.keys(state.attendance).sort().reverse();
  if (!remaining.length) {
    serviceReady = false;
    activeServiceText.textContent = "No hay servicio seleccionado.";
  } else {
    applyServiceKeyToControls(remaining[0]);
    serviceReady = true;
  }

  renderApp();
}

function createLocalId(prefix = "line") {
  if (crypto?.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function renderAlfolis() {
  alfolisList.innerHTML = "";
  state.alfolis.forEach((line, index) => {
    const row = document.createElement("div");
    row.className = "alfolis-row";
    row.innerHTML = `
      <label>
        Nombre
        <input type="text" data-field="name" data-id="${line.id}" value="${escapeHtml(line.name)}" placeholder="Ej. Juan Perez" />
      </label>
      <label>
        Posicion
        <input type="text" data-field="position" data-id="${line.id}" value="${escapeHtml(line.position)}" placeholder="Ej. 2" />
      </label>
      <button type="button" class="ghost-button alfolis-remove" data-id="${line.id}" ${state.alfolis.length === 1 ? "disabled" : ""}>
        Quitar
      </button>
      <span class="alfolis-index">Linea ${index + 1}</span>
    `;
    alfolisList.appendChild(row);
  });

  alfolisList.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", handleAlfolisInputChange);
  });
  alfolisList.querySelectorAll(".alfolis-remove").forEach((button) => {
    button.addEventListener("click", handleRemoveAlfoliLine);
  });
}

function handleAddAlfoliLine() {
  state.alfolis.push({ id: createLocalId(), name: "", position: "" });
  saveState();
  renderAlfolis();
}

function handleAlfolisInputChange(event) {
  const id = event.target.dataset.id;
  const field = event.target.dataset.field;
  const line = state.alfolis.find((item) => item.id === id);
  if (!line || !field) return;
  line[field] = event.target.value;
  saveState();
}

function handleRemoveAlfoliLine(event) {
  const id = event.target.dataset.id;
  state.alfolis = state.alfolis.filter((item) => item.id !== id);
  if (!state.alfolis.length) {
    state.alfolis = [{ id: createLocalId(), name: "", position: "" }];
  }
  saveState();
  renderAlfolis();
}

function exportAlfolisPdf() {
  const rows = state.alfolis
    .filter((line) => line.name.trim() || line.position.trim())
    .map(
      (line) =>
        `<tr><td>${escapeHtml(line.name.trim() || "-")}</td><td>${escapeHtml(line.position.trim() || "-")}</td></tr>`
    )
    .join("");
  if (!rows) {
    window.alert("No hay datos en Alfolis para generar PDF.");
    return;
  }

  const printedOn = new Date().toISOString().slice(0, 10);
  const printable = window.open("", "_blank", "width=900,height=800");
  if (!printable) return;
  printable.document.write(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>Alfolis - ${printedOn}</title>
      <style>
        @page { size: A4 portrait; margin: 14mm; }
        body { font-family: Arial, sans-serif; color: #1b2940; margin: 0; }
        h1 { margin: 0 0 10px; font-size: 22px; }
        p { margin: 0 0 12px; font-size: 13px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #c8d2e5; padding: 6px; text-align: left; }
        th { background: #eef4ff; }
      </style>
    </head>
    <body>
      <h1>Alfolis - ${printedOn}</h1>
      <p>Documento para autoridades</p>
      <table>
        <thead>
          <tr><th>Nombre</th><th>Posicion</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </body>
    </html>
  `);
  printable.document.close();
  printable.focus();
  printable.print();
}

function ensureAttendanceRecord(serviceKey, serverId) {
  if (!state.attendance[serviceKey]) {
    state.attendance[serviceKey] = {};
  }
  if (!state.attendance[serviceKey][serverId]) {
    state.attendance[serviceKey][serverId] = { status: "", checks: {} };
  } else if (!state.attendance[serviceKey][serverId].checks) {
    state.attendance[serviceKey][serverId].checks = {};
  }
  return state.attendance[serviceKey][serverId];
}

function handleAreaButtonClick(event) {
  const button = event.target.closest(".area-button");
  if (!button) return;
  activeAreaKey = button.dataset.areaKey || "puertas";
  renderAreaChecklist();
}

function renderAreaChecklist() {
  const area = AREA_CHECKLISTS[activeAreaKey] || AREA_CHECKLISTS.puertas;
  areaChecklistTitle.textContent = area.title;
  Array.from(areaButtons.querySelectorAll(".area-button")).forEach((button) => {
    button.classList.toggle("is-active", button.dataset.areaKey === activeAreaKey);
  });

  if (!serviceReady) {
    areaChecklistBody.innerHTML = `
      <tr>
        <td colspan="4">Primero crea o selecciona un servicio para activar el checklist de area.</td>
      </tr>
    `;
    return;
  }

  const serviceKey = getServiceKey(getCurrentServiceMeta());
  areaChecklistBody.innerHTML = area.instructions
    .map((instruction, index) => {
      const checkKey = `${activeAreaKey}-${index + 1}`;
      const checked = getAreaCheckStatus(serviceKey, checkKey);
      const radioName = `area-check-${serviceKey}-${checkKey}`;
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(instruction)}</td>
          <td><input type="radio" name="${radioName}" value="Si" data-check-key="${checkKey}" ${checked === "Si" ? "checked" : ""} /></td>
          <td><input type="radio" name="${radioName}" value="No" data-check-key="${checkKey}" ${checked === "No" ? "checked" : ""} /></td>
        </tr>
      `;
    })
    .join("");

  areaChecklistBody.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", (event) => {
      const checkKey = event.target.dataset.checkKey;
      updateAreaCheck(serviceKey, checkKey, event.target.value);
    });
  });
}

function getAreaCheckStatus(serviceKey, checkKey) {
  const control = state.attendance[serviceKey]?.__area_control__;
  return control?.checks?.[checkKey] || "";
}

function updateAreaCheck(serviceKey, checkKey, status) {
  if (!state.attendance[serviceKey]) {
    state.attendance[serviceKey] = {};
  }
  const controlId = "__area_control__";
  if (!state.attendance[serviceKey][controlId]) {
    state.attendance[serviceKey][controlId] = { status: "", checks: {} };
  }
  state.attendance[serviceKey][controlId].checks[checkKey] = status;
  saveState();
}

function renderSummary() {
  if (!serviceReady) {
    totalServers.textContent = String(state.servers.length);
    presentToday.textContent = "0";
    absentToday.textContent = "0";
    return;
  }

  const key = getServiceKey(getCurrentServiceMeta());
  const serviceRows = state.attendance[key] || {};
  const presentCount = state.servers.filter((server) => serviceRows[server.id]?.status === "Si").length;
  const absentCount = state.servers.filter((server) => serviceRows[server.id]?.status === "No").length;

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
    fragment.querySelector(".server-card__delete").addEventListener("click", () => deleteServer(server.id));
    serverCards.appendChild(fragment);
  });
}

function renderAttendanceList() {
  attendanceList.innerHTML = "";
  if (!serviceReady) {
    attendanceList.innerHTML = `
      <article class="attendance-row">
        <div class="attendance-cell">Pulsa "Agregar servicio" para crear el checklist.</div>
      </article>
    `;
    activeServiceText.textContent = "No hay servicio seleccionado.";
    return;
  }

  if (!state.servers.length) {
    attendanceList.innerHTML = `
      <article class="attendance-row">
        <div class="attendance-cell">No hay servidores registrados.</div>
      </article>
    `;
    return;
  }

  const serviceKey = getServiceKey(getCurrentServiceMeta());
  activeServiceText.textContent = getServiceLabel(getCurrentServiceMeta());
  state.servers.forEach((server) => {
    const fragment = attendanceRowTemplate.content.cloneNode(true);
    const record = ensureAttendanceRecord(serviceKey, server.id);
    const rowName = `attendance-${serviceKey}-${server.id}`;

    fragment.querySelector(".attendance-name").textContent = server.name;
    fragment.querySelector(".attendance-phone").textContent = server.phone;

    const yesInput = fragment.querySelector(".attendance-yes");
    const noInput = fragment.querySelector(".attendance-no");
    yesInput.name = rowName;
    noInput.name = rowName;
    yesInput.checked = record.status === "Si";
    noInput.checked = record.status === "No";

    yesInput.addEventListener("change", () => updateAttendance(serviceKey, server.id, "Si"));
    noInput.addEventListener("change", () => updateAttendance(serviceKey, server.id, "No"));
    attendanceList.appendChild(fragment);
  });
}

function renderResultLists() {
  if (!serviceReady) {
    yesList.innerHTML = `<p class="result-empty">No hay registros en Si.</p>`;
    noList.innerHTML = `<p class="result-empty">No hay registros en No.</p>`;
    return;
  }

  const key = getServiceKey(getCurrentServiceMeta());
  const rows = state.attendance[key] || {};
  const yesRows = [];
  const noRows = [];

  state.servers.forEach((server) => {
    const status = rows[server.id]?.status;
    if (status === "Si") {
      yesRows.push(server);
    } else if (status === "No") {
      noRows.push(server);
    }
  });

  yesList.innerHTML = renderResultTableHtml(yesRows, "No hay registros en Si.");
  noList.innerHTML = renderResultTableHtml(noRows, "No hay registros en No.");
}

function renderResultTableHtml(items, emptyText) {
  if (!items.length) {
    return `<p class="result-empty">${emptyText}</p>`;
  }

  const rows = items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.phone)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <table class="result-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Telefono</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function updateAttendance(serviceKey, serverId, status) {
  ensureAttendanceRecord(serviceKey, serverId).status = status;
  saveState();
  renderSummary();
  renderResultLists();
  renderServiceMetrics();
}

function exportCurrentChecklistPdf() {
  if (!serviceReady) {
    return;
  }

  const meta = getCurrentServiceMeta();
  const key = getServiceKey(meta);
  const rows = state.attendance[key] || {};
  const yesRows = state.servers.filter((server) => rows[server.id]?.status === "Si");
  const noRows = state.servers.filter((server) => rows[server.id]?.status === "No");
  const shiftLabel = meta.shift === "NA" ? "N/A" : meta.shift;
  const printable = window.open("", "_blank", "width=1000,height=800");
  if (!printable) return;

  printable.document.write(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>Checklist de Servicio</title>
      <style>
        @page { size: A4 landscape; margin: 12mm; }
        body { font-family: Arial, sans-serif; color: #1b2940; margin: 28px; }
        h1 { margin: 0 0 8px; font-size: 22px; }
        .meta { margin-bottom: 12px; font-size: 12px; line-height: 1.4; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        table { border-collapse: collapse; width: 100%; font-size: 11px; }
        th, td { border: 1px solid #c8d2e5; padding: 4px 6px; text-align: left; }
        th { background: #eef4ff; }
        h2 { font-size: 13px; margin: 0 0 6px; }
        p { margin: 0; font-size: 11px; }
      </style>
    </head>
    <body>
      <h1>Checklist de Servicio</h1>
      <div class="meta">
        <strong>Fecha:</strong> ${escapeHtml(formatDate(meta.date))}<br />
        <strong>Dia:</strong> ${escapeHtml(meta.day)}<br />
        <strong>Turno:</strong> ${escapeHtml(shiftLabel)}
      </div>
      <div class="grid">
        <section>
          <h2>Asistieron (Si): ${yesRows.length}</h2>
          ${renderPrintableTable(yesRows)}
        </section>
        <section>
          <h2>No asistieron (No): ${noRows.length}</h2>
          ${renderPrintableTable(noRows)}
        </section>
      </div>
    </body>
    </html>
  `);
  printable.document.close();
  printable.focus();
  printable.print();
}

function getServiceLabel(meta) {
  const shiftText = meta.shift === "NA" ? "" : ` - Turno ${meta.shift}`;
  return `Servicio activo: ${formatDate(meta.date)} - ${meta.day}${shiftText}`;
}

function renderPrintableTable(items) {
  if (!items.length) {
    return "<p>No hay datos.</p>";
  }
  const rows = items.map((item) => `<tr><td>${escapeHtml(item.name)}</td></tr>`).join("");
  return `<table><thead><tr><th>Nombre</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function getCurrentServiceStats() {
  if (!serviceReady) {
    return { yesRows: [], noRows: [], total: state.servers.length, yesPct: 0, noPct: 0 };
  }
  const key = getServiceKey(getCurrentServiceMeta());
  const rows = state.attendance[key] || {};
  const yesRows = state.servers.filter((server) => rows[server.id]?.status === "Si");
  const noRows = state.servers.filter((server) => rows[server.id]?.status === "No");
  const total = state.servers.length;
  const yesPct = total ? Math.round((yesRows.length / total) * 100) : 0;
  const noPct = total ? Math.round((noRows.length / total) * 100) : 0;
  return { yesRows, noRows, total, yesPct, noPct };
}

function renderServiceMetrics() {
  const stats = getCurrentServiceStats();
  if (!serviceReady) {
    serviceTotalsText.textContent = "Aun sin datos para este servicio.";
  } else {
    serviceTotalsText.textContent = `Total servidores: ${stats.total}. Llegaron: ${stats.yesRows.length}. Faltaron: ${stats.noRows.length}.`;
  }
  yesBar.style.width = `${stats.yesPct}%`;
  noBar.style.width = `${stats.noPct}%`;
  yesPctText.textContent = `Si: ${stats.yesPct}%`;
  noPctText.textContent = `No: ${stats.noPct}%`;
}

function renderSummaryView() {
  const monthValue = summaryMonth.value;
  const options = getServiceKeysByMonth(monthValue);
  const current = summaryServiceSelect.value;
  summaryServiceSelect.innerHTML = "";

  if (!options.length) {
    summaryServiceSelect.innerHTML = `<option value="">Sin servicios en este mes</option>`;
    summaryPdfButton.disabled = true;
    summaryPreview.innerHTML = `<p class="result-empty">No hay servicios guardados para el mes seleccionado.</p>`;
    return;
  }

  options.forEach((serviceKey) => {
    const option = document.createElement("option");
    option.value = serviceKey;
    option.textContent = formatServiceKeyLabel(serviceKey);
    summaryServiceSelect.appendChild(option);
  });

  if (options.includes(current)) {
    summaryServiceSelect.value = current;
  } else {
    summaryServiceSelect.value = options[0];
  }

  summaryPdfButton.disabled = false;
  const selectedKey = summaryServiceSelect.value;
  const stats = getStatsByServiceKey(selectedKey);
  summaryPreview.innerHTML = `
    <div class="panel__header">
      <h3>${escapeHtml(formatServiceKeyLabel(selectedKey))}</h3>
      <p>Total: ${stats.total} | Llegaron: ${stats.yesRows.length} (${stats.yesPct}%) | Faltaron: ${stats.noRows.length} (${stats.noPct}%)</p>
    </div>
    <div class="result-grid">
      <article class="result-card">
        <h3>Asistieron (Si)</h3>
        ${renderSummaryTable(stats.yesRows)}
      </article>
      <article class="result-card">
        <h3>No asistieron (No)</h3>
        ${renderSummaryTable(stats.noRows)}
      </article>
    </div>
  `;
}

function getServiceKeysByMonth(monthValue) {
  if (!monthValue) {
    return Object.keys(state.attendance).sort().reverse();
  }
  return Object.keys(state.attendance)
    .filter((key) => key.startsWith(monthValue))
    .sort()
    .reverse();
}

function parseServiceKey(serviceKey) {
  const [date, day, shift] = String(serviceKey).split("__");
  return { date: date || "", day: day || "", shift: shift || "NA" };
}

function formatServiceKeyLabel(serviceKey) {
  const meta = parseServiceKey(serviceKey);
  const shiftText = meta.shift === "NA" ? "" : ` - Turno ${meta.shift}`;
  return `${formatDate(meta.date)} - ${meta.day}${shiftText}`;
}

function getStatsByServiceKey(serviceKey) {
  const rows = state.attendance[serviceKey] || {};
  const yesRows = state.servers.filter((server) => rows[server.id]?.status === "Si");
  const noRows = state.servers.filter((server) => rows[server.id]?.status === "No");
  const total = state.servers.length;
  const yesPct = total ? Math.round((yesRows.length / total) * 100) : 0;
  const noPct = total ? Math.round((noRows.length / total) * 100) : 0;
  return { yesRows, noRows, total, yesPct, noPct };
}

function renderSummaryTable(items) {
  if (!items.length) {
    return `<p class="result-empty">Sin registros.</p>`;
  }
  const rows = items
    .map((item) => `<tr><td>${escapeHtml(item.name)}</td></tr>`)
    .join("");
  return `<table class="result-table"><thead><tr><th>Nombre</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function exportMonthlySummaryPdf() {
  const selectedKey = summaryServiceSelect.value;
  if (!selectedKey) return;

  const stats = getStatsByServiceKey(selectedKey);
  const printable = window.open("", "_blank", "width=1100,height=850");
  if (!printable) return;

  printable.document.write(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>Resumen de Servicio</title>
      <style>
        @page { size: A4 portrait; margin: 14mm; }
        body { font-family: Arial, sans-serif; color: #1b2940; margin: 0; }
        h1 { margin: 0 0 8px; font-size: 22px; }
        p { margin: 0 0 12px; font-size: 13px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #c8d2e5; padding: 6px; text-align: left; }
        th { background: #eef4ff; }
      </style>
    </head>
    <body>
      <h1>Resumen de Servicio</h1>
      <p>${escapeHtml(formatServiceKeyLabel(selectedKey))}</p>
      <p>Total: ${stats.total} | Llegaron: ${stats.yesRows.length} (${stats.yesPct}%) | Faltaron: ${stats.noRows.length} (${stats.noPct}%)</p>
      <div class="grid">
        <section>
          <h3>Asistieron (Si)</h3>
          ${renderPrintableTable(stats.yesRows)}
        </section>
        <section>
          <h3>No asistieron (No)</h3>
          ${renderPrintableTable(stats.noRows)}
        </section>
      </div>
    </body>
    </html>
  `);
  printable.document.close();
  printable.focus();
  printable.print();
}

function finalizeCurrentService() {
  if (!serviceReady) return;
  const stats = getCurrentServiceStats();
  if (stats.yesPct < 50) {
    window.alert(
      `Alerta: la asistencia es menor al 50% (${stats.yesPct}%). Llegaron ${stats.yesRows.length} de ${stats.total}.`
    );
  } else {
    window.alert(
      `Servicio finalizado. Asistencia: ${stats.yesPct}%. Llegaron ${stats.yesRows.length} y faltaron ${stats.noRows.length}.`
    );
  }
}

function generateConciliationList() {
  if (!serviceReady) return;
  let shuffled = shuffleServers(state.servers);
  let signature = shuffled.map((server) => server.id).join("|");
  let attempts = 0;
  while (signature === lastConciliationSignature && attempts < 5) {
    shuffled = shuffleServers(state.servers);
    signature = shuffled.map((server) => server.id).join("|");
    attempts += 1;
  }

  const groups = CONCILIATION_LEADERS.map((leader) => ({ leader, members: [] }));
  shuffled.forEach((server, index) => {
    groups[index % groups.length].members.push(server);
  });

  currentConciliation = groups;
  lastConciliationSignature = signature;
  renderConciliationBoard();
}

function renderConciliationBoard() {
  if (!serviceReady) {
    conciliationBoard.innerHTML = `<p class="result-empty">Primero guarda un servicio.</p>`;
    return;
  }
  if (!currentConciliation) {
    conciliationBoard.innerHTML = `<p class="result-empty">Pulsa "Generar listado de conciliacion".</p>`;
    return;
  }

  conciliationBoard.innerHTML = currentConciliation
    .map((group, index) => {
      const items = group.members
        .map(
          (member) =>
            `<li>${escapeHtml(member.name)} - ${escapeHtml(member.phone)}</li>`
        )
        .join("");
      return `
        <article class="conciliation-card">
          <div class="conciliation-card__head">
            <h4>${escapeHtml(group.leader)}</h4>
            <button type="button" class="primary-button conciliation-pdf-btn" data-group-index="${index}">
              PDF
            </button>
          </div>
          <ol>${items}</ol>
        </article>
      `;
    })
    .join("");
}

function handleConciliationBoardClick(event) {
  const button = event.target.closest(".conciliation-pdf-btn");
  if (!button) return;
  const index = Number(button.dataset.groupIndex);
  exportConciliationGroupPdf(index);
}

function exportConciliationGroupPdf(groupIndex) {
  if (!currentConciliation || Number.isNaN(groupIndex)) return;
  const group = currentConciliation[groupIndex];
  if (!group) return;

  const meta = getCurrentServiceMeta();
  const shiftText = meta.shift === "NA" ? "" : ` - Turno ${meta.shift}`;
  const printedOn = new Date().toISOString().slice(0, 10);
  const fileLabel = `${group.leader} - ${printedOn}`;
  const rows = group.members
    .map((member) => `<tr><td>${escapeHtml(member.name)}</td><td>${escapeHtml(member.phone)}</td></tr>`)
    .join("");
  const printable = window.open("", "_blank", "width=900,height=800");
  if (!printable) return;

  printable.document.write(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>${escapeHtml(fileLabel)}</title>
      <style>
        @page { size: A4 portrait; margin: 14mm; }
        body { font-family: Arial, sans-serif; color: #1b2940; margin: 0; }
        h1 { margin: 0 0 8px; font-size: 22px; }
        p { margin: 0 0 10px; font-size: 13px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #c8d2e5; padding: 6px; text-align: left; }
        th { background: #eef4ff; }
      </style>
    </head>
    <body>
      <h1>${escapeHtml(fileLabel)}</h1>
      <p><strong>Encargado:</strong> ${escapeHtml(group.leader)}</p>
      <p><strong>Servicio:</strong> ${escapeHtml(formatDate(meta.date))} - ${escapeHtml(meta.day)}${escapeHtml(shiftText)}</p>
      <table>
        <thead><tr><th>Servidor</th><th>Telefono</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </body>
    </html>
  `);
  printable.document.close();
  printable.focus();
  printable.print();
}

function shuffleServers(items) {
  const copied = items.map((item) => ({ ...item }));
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[randomIndex]] = [copied[randomIndex], copied[i]];
  }
  return copied;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function deleteServer(serverId) {
  state.servers = state.servers.filter((server) => server.id !== serverId);
  Object.keys(state.attendance).forEach((serviceKey) => {
    if (state.attendance[serviceKey][serverId]) {
      delete state.attendance[serviceKey][serverId];
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
  if (!value) return "--";
  return new Intl.DateTimeFormat("es-GT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}
