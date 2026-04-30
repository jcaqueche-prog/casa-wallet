const STORAGE_KEY = "iglesia-servidores-app";
const DATABASE_SOURCE_VERSION = "v5-replanteado-2026-04-30";

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
  services: [],
  alfolis: {
    male: [{ id: "m-1", name: "", position: "" }],
    female: [{ id: "f-1", name: "", position: "" }],
  },
};

const state = loadState();

const serverForm = document.getElementById("serverForm");
const serverBirthday = document.getElementById("serverBirthday");
const serviceForm = document.getElementById("serviceForm");
const serviceDate = document.getElementById("serviceDate");
const serviceLines = document.getElementById("serviceLines");
const addServiceLineButton = document.getElementById("addServiceLineButton");
const attendanceList = document.getElementById("attendanceList");
const activeServiceText = document.getElementById("activeServiceText");
const serviceTotalsText = document.getElementById("serviceTotalsText");
const pieChart = document.getElementById("pieChart");
const yesPctText = document.getElementById("yesPctText");
const noPctText = document.getElementById("noPctText");
const saveServiceStatsButton = document.getElementById("saveServiceStatsButton");
const generateConciliationButton = document.getElementById("generateConciliationButton");
const conciliationBoard = document.getElementById("conciliationBoard");
const summaryDateFrom = document.getElementById("summaryDateFrom");
const summaryDateTo = document.getElementById("summaryDateTo");
const summaryShareButton = document.getElementById("summaryShareButton");
const summaryButtons = document.getElementById("summaryButtons");
const summaryPreview = document.getElementById("summaryPreview");
const alfolisShareButton = document.getElementById("alfolisShareButton");
const addMaleLineButton = document.getElementById("addMaleLineButton");
const addFemaleLineButton = document.getElementById("addFemaleLineButton");
const maleAlfolisList = document.getElementById("maleAlfolisList");
const femaleAlfolisList = document.getElementById("femaleAlfolisList");

const serverSearch = document.getElementById("serverSearch");
const todayLabel = document.getElementById("todayLabel");
const totalServers = document.getElementById("totalServers");
const presentToday = document.getElementById("presentToday");
const absentToday = document.getElementById("absentToday");
const serverCards = document.getElementById("serverCards");
const serverCardTemplate = document.getElementById("serverCardTemplate");
const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const views = Array.from(document.querySelectorAll(".view"));

let currentServiceId = state.services[0]?.id || "";
let pendingServiceLines = ["Servicio 1", "Servicio 2"];
let currentConciliation = null;
let lastConciliationSignature = "";

serverForm.addEventListener("submit", handleCreateServer);
serviceForm.addEventListener("submit", handleSaveService);
addServiceLineButton.addEventListener("click", handleAddServiceLine);
saveServiceStatsButton.addEventListener("click", handleSaveServiceStats);
generateConciliationButton.addEventListener("click", generateConciliation);
conciliationBoard.addEventListener("click", handleConciliationActions);
summaryDateFrom.addEventListener("change", renderSummary);
summaryDateTo.addEventListener("change", renderSummary);
summaryButtons.addEventListener("click", handleSummaryButtonClick);
summaryShareButton.addEventListener("click", shareSummaryRange);
addMaleLineButton.addEventListener("click", () => addAlfoliLine("male"));
addFemaleLineButton.addEventListener("click", () => addAlfoliLine("female"));
alfolisShareButton.addEventListener("click", shareAlfolis);
serverSearch.addEventListener("input", renderServers);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.viewTarget));
});

initialize();

function initialize() {
  const today = getTodayIso();
  todayLabel.textContent = formatDate(today);
  serverBirthday.value = today;
  serviceDate.value = today;
  summaryDateFrom.value = today.slice(0, 8) + "01";
  summaryDateTo.value = today;
  setActiveView("servidores");
  renderAll();
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    if (parsed.sourceVersion !== DATABASE_SOURCE_VERSION) return structuredClone(defaultState);
    return {
      sourceVersion: DATABASE_SOURCE_VERSION,
      servers: Array.isArray(parsed.servers) ? parsed.servers : [],
      services: Array.isArray(parsed.services) ? parsed.services : [],
      alfolis: parsed.alfolis && typeof parsed.alfolis === "object"
        ? {
            male: Array.isArray(parsed.alfolis.male) && parsed.alfolis.male.length ? parsed.alfolis.male : [{ id: "m-1", name: "", position: "" }],
            female: Array.isArray(parsed.alfolis.female) && parsed.alfolis.female.length ? parsed.alfolis.female : [{ id: "f-1", name: "", position: "" }],
          }
        : structuredClone(defaultState.alfolis),
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderAll() {
  renderServers();
  renderServiceFormLines();
  renderServiceAttendance();
  renderServiceStats();
  renderConciliation();
  renderSummary();
  renderAlfolis();
}

function setActiveView(viewName) {
  tabButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.viewTarget === viewName));
  views.forEach((view) => view.classList.toggle("view--active", view.dataset.view === viewName));
}

function handleCreateServer(event) {
  event.preventDefault();
  const fd = new FormData(serverForm);
  const name = String(fd.get("name") || "").trim();
  const birthday = String(fd.get("birthday") || "");
  const phone = String(fd.get("phone") || "").trim();
  const address = String(fd.get("address") || "").trim();
  if (!name || !birthday || !phone || !address) return;

  state.servers.unshift({ id: createId("srv"), name, birthday, phone, address });
  saveState();
  serverForm.reset();
  serverBirthday.value = getTodayIso();
  renderAll();
}

function renderServers() {
  serverCards.innerHTML = "";
  const query = serverSearch.value.trim().toLowerCase();
  const list = state.servers.filter((s) => [s.name, s.phone, s.address].join(" ").toLowerCase().includes(query));

  totalServers.textContent = String(state.servers.length);
  const current = getCurrentService();
  const stats = getServiceStats(current);
  presentToday.textContent = String(stats.yesCount);
  absentToday.textContent = String(stats.noCount);

  if (!list.length) {
    serverCards.innerHTML = `<article class="server-card"><p class="server-card__details">No hay servidores registrados.</p></article>`;
    return;
  }

  list.forEach((server) => {
    const fragment = serverCardTemplate.content.cloneNode(true);
    fragment.querySelector(".server-card__name").textContent = server.name;
    fragment.querySelector(".server-card__birthday").textContent = formatDate(server.birthday);
    fragment.querySelector(".server-card__phone").textContent = server.phone;
    fragment.querySelector(".server-card__address").textContent = server.address;
    fragment.querySelector(".server-card__delete").addEventListener("click", () => deleteServer(server.id));
    serverCards.appendChild(fragment);
  });
}

function deleteServer(serverId) {
  state.servers = state.servers.filter((s) => s.id !== serverId);
  state.services.forEach((service) => {
    delete service.attendance[serverId];
  });
  saveState();
  renderAll();
}

function renderServiceFormLines() {
  serviceLines.innerHTML = "";
  pendingServiceLines.forEach((line, index) => {
    const row = document.createElement("div");
    row.className = "service-line-row";
    row.innerHTML = `
      <label>
        Linea ${index + 1}
        <input type="text" data-index="${index}" value="${escapeHtml(line)}" />
      </label>
      <button type="button" class="ghost-button" data-remove-index="${index}" ${pendingServiceLines.length <= 1 ? "disabled" : ""}>Quitar</button>
    `;
    serviceLines.appendChild(row);
  });

  serviceLines.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", (event) => {
      const idx = Number(event.target.dataset.index);
      pendingServiceLines[idx] = event.target.value;
    });
  });

  serviceLines.querySelectorAll("button[data-remove-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const idx = Number(button.dataset.removeIndex);
      pendingServiceLines.splice(idx, 1);
      if (!pendingServiceLines.length) pendingServiceLines = ["Servicio 1"];
      renderServiceFormLines();
    });
  });
}

function handleAddServiceLine() {
  pendingServiceLines.push(`Servicio ${pendingServiceLines.length + 1}`);
  renderServiceFormLines();
}

function handleSaveService(event) {
  event.preventDefault();
  const date = serviceDate.value || getTodayIso();
  const lines = pendingServiceLines.map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return;

  const service = {
    id: createId("svc"),
    date,
    lines,
    attendance: {},
    statsSaved: false,
    createdAt: new Date().toISOString(),
  };

  state.services.unshift(service);
  currentServiceId = service.id;
  saveState();
  pendingServiceLines = ["Servicio 1", "Servicio 2"];
  serviceDate.value = getTodayIso();
  renderAll();
}

function getCurrentService() {
  return state.services.find((s) => s.id === currentServiceId) || null;
}

function renderServiceAttendance() {
  attendanceList.innerHTML = "";
  const service = getCurrentService();

  if (!service) {
    activeServiceText.textContent = "No hay servicio activo.";
    attendanceList.innerHTML = `<article class="attendance-row"><div class="attendance-cell">Guarda un servicio para registrar asistencia.</div></article>`;
    return;
  }

  activeServiceText.textContent = `Servicio activo: ${formatDate(service.date)} | ${service.lines.join(" / ")}`;

  if (!state.servers.length) {
    attendanceList.innerHTML = `<article class="attendance-row"><div class="attendance-cell">No hay servidores registrados.</div></article>`;
    return;
  }

  state.servers.forEach((server) => {
    const status = service.attendance[server.id] || "";
    const row = document.createElement("article");
    row.className = "attendance-row attendance-row--2";
    row.innerHTML = `
      <div class="attendance-cell attendance-name">${escapeHtml(server.name)}</div>
      <div class="attendance-cell">
        <select data-server-id="${server.id}">
          <option value="">Seleccionar</option>
          <option value="Si" ${status === "Si" ? "selected" : ""}>Si</option>
          <option value="No" ${status === "No" ? "selected" : ""}>No</option>
        </select>
      </div>
    `;
    attendanceList.appendChild(row);
  });

  attendanceList.querySelectorAll("select[data-server-id]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const serverId = event.target.dataset.serverId;
      const next = event.target.value;
      service.attendance[serverId] = next;
      saveState();
      renderServiceStats();
      renderServers();
    });
  });
}

function getServiceStats(service) {
  if (!service) return { yesCount: 0, noCount: 0, total: state.servers.length, yesPct: 0, noPct: 0 };
  let yesCount = 0;
  let noCount = 0;
  state.servers.forEach((server) => {
    const s = service.attendance[server.id];
    if (s === "Si") yesCount += 1;
    if (s === "No") noCount += 1;
  });
  const total = state.servers.length || 1;
  const yesPct = Math.round((yesCount / total) * 100);
  const noPct = Math.round((noCount / total) * 100);
  return { yesCount, noCount, total: state.servers.length, yesPct, noPct };
}

function renderServiceStats() {
  const service = getCurrentService();
  const stats = getServiceStats(service);

  if (!service) {
    serviceTotalsText.textContent = "Aun sin datos para este servicio.";
    pieChart.style.background = "conic-gradient(#2cae7a 0deg, #2cae7a 0deg, #d97878 0deg, #d97878 360deg)";
    yesPctText.textContent = "Si: 0%";
    noPctText.textContent = "No: 0%";
    return;
  }

  serviceTotalsText.textContent = `Asistieron: ${stats.yesCount} | No asistieron: ${stats.noCount}`;
  const yesDeg = Math.round((stats.yesPct / 100) * 360);
  pieChart.style.background = `conic-gradient(#2cae7a 0deg, #2cae7a ${yesDeg}deg, #d97878 ${yesDeg}deg, #d97878 360deg)`;
  yesPctText.textContent = `Si: ${stats.yesPct}%`;
  noPctText.textContent = `No: ${stats.noPct}%`;
}

function handleSaveServiceStats() {
  const service = getCurrentService();
  if (!service) return;
  service.statsSaved = true;
  saveState();
  renderSummary();
}

function generateConciliation() {
  const list = shuffle(state.servers.map((s) => ({ ...s })));
  const signature = list.map((s) => s.id).join("|");
  if (signature === lastConciliationSignature) list.reverse();
  lastConciliationSignature = list.map((s) => s.id).join("|");

  const groups = [
    { name: "Grupo 1", members: [] },
    { name: "Grupo 2", members: [] },
    { name: "Grupo 3", members: [] },
    { name: "Grupo 4", members: [] },
  ];

  list.forEach((server, idx) => {
    groups[idx % groups.length].members.push(server);
  });

  currentConciliation = groups;
  renderConciliation();
}

function renderConciliation() {
  if (!currentConciliation) {
    conciliationBoard.innerHTML = `<p class="result-empty">Pulsa "Generar grupos".</p>`;
    return;
  }

  conciliationBoard.innerHTML = currentConciliation
    .map((group, idx) => {
      const rows = group.members.map((m) => `<li>${escapeHtml(m.name)} - ${escapeHtml(m.phone)}</li>`).join("");
      return `
        <article class="conciliation-card">
          <div class="conciliation-card__head">
            <h4>${group.name}</h4>
            <div class="service-actions">
              <button class="primary-button conciliation-img-btn" data-index="${idx}">Imagen</button>
              <button class="primary-button conciliation-share-btn" data-index="${idx}">Compartir</button>
            </div>
          </div>
          <ol>${rows}</ol>
        </article>
      `;
    })
    .join("");
}

function handleConciliationActions(event) {
  const imgBtn = event.target.closest(".conciliation-img-btn");
  const shareBtn = event.target.closest(".conciliation-share-btn");
  if (imgBtn) {
    const group = currentConciliation?.[Number(imgBtn.dataset.index)];
    if (group) openJpegPreview(group.name, group.members.map((m, i) => `${i + 1}. ${m.name} - ${m.phone}`), true);
  }
  if (shareBtn) {
    const group = currentConciliation?.[Number(shareBtn.dataset.index)];
    if (group) shareText(`${group.name}\n${group.members.map((m, i) => `${i + 1}. ${m.name} - ${m.phone}`).join("\n")}`);
  }
}

function renderSummary() {
  const from = summaryDateFrom.value;
  const to = summaryDateTo.value;
  const records = state.services
    .filter((s) => s.statsSaved)
    .filter((s) => (!from || s.date >= from) && (!to || s.date <= to))
    .sort((a, b) => b.date.localeCompare(a.date));

  summaryButtons.innerHTML = "";
  if (!records.length) {
    summaryButtons.innerHTML = `<p class="result-empty">No hay estadisticas guardadas en este rango.</p>`;
    summaryPreview.innerHTML = "";
    return;
  }

  records.forEach((service) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab-button summary-service-btn";
    btn.dataset.serviceId = service.id;
    btn.textContent = `${formatDate(service.date)} | ${service.lines.join(" / ")}`;
    summaryButtons.appendChild(btn);
  });

  const chosenId = summaryPreview.dataset.serviceId && records.some((r) => r.id === summaryPreview.dataset.serviceId)
    ? summaryPreview.dataset.serviceId
    : records[0].id;
  renderSummaryPreview(chosenId);
}

function handleSummaryButtonClick(event) {
  const btn = event.target.closest(".summary-service-btn");
  if (!btn) return;
  renderSummaryPreview(btn.dataset.serviceId);
}

function renderSummaryPreview(serviceId) {
  const service = state.services.find((s) => s.id === serviceId);
  if (!service) {
    summaryPreview.innerHTML = "";
    return;
  }
  summaryPreview.dataset.serviceId = service.id;
  const stats = getServiceStats(service);
  const yesDeg = Math.round((stats.yesPct / 100) * 360);

  summaryPreview.innerHTML = `
    <div class="panel__header">
      <h3>${formatDate(service.date)} | ${escapeHtml(service.lines.join(" / "))}</h3>
      <p>Asistieron: ${stats.yesCount} | No asistieron: ${stats.noCount}</p>
    </div>
    <div class="summary-preview-row">
      <div class="pie-chart" style="background: conic-gradient(#2cae7a 0deg, #2cae7a ${yesDeg}deg, #d97878 ${yesDeg}deg, #d97878 360deg)"></div>
      <div class="chart-legend">
        <span>Si: ${stats.yesPct}%</span>
        <span>No: ${stats.noPct}%</span>
      </div>
    </div>
  `;
}

function shareSummaryRange() {
  const from = summaryDateFrom.value || "(sin inicio)";
  const to = summaryDateTo.value || "(sin fin)";
  const records = state.services
    .filter((s) => s.statsSaved)
    .filter((s) => (!summaryDateFrom.value || s.date >= summaryDateFrom.value) && (!summaryDateTo.value || s.date <= summaryDateTo.value));

  const lines = [`Resumen por rango: ${from} a ${to}`];
  records.forEach((s) => {
    const st = getServiceStats(s);
    lines.push(`${s.date} | ${s.lines.join(" / ")} | Si ${st.yesCount} | No ${st.noCount}`);
  });

  openJpegPreview("Resumen", lines, true);
  shareText(lines.join("\n"));
}

function renderAlfolis() {
  renderAlfolisGroup("male", maleAlfolisList, "Servidor");
  renderAlfolisGroup("female", femaleAlfolisList, "Servidora");
}

function renderAlfolisGroup(type, container, label) {
  container.innerHTML = "";
  state.alfolis[type].forEach((row, idx) => {
    const el = document.createElement("div");
    el.className = "alfolis-row";
    el.innerHTML = `
      <label>${label} nombre
        <input type="text" data-type="${type}" data-field="name" data-id="${row.id}" value="${escapeHtml(row.name)}" />
      </label>
      <label>Posicion
        <input type="text" data-type="${type}" data-field="position" data-id="${row.id}" value="${escapeHtml(row.position)}" />
      </label>
      <button type="button" class="ghost-button alfolis-remove" data-type="${type}" data-id="${row.id}" ${state.alfolis[type].length <= 1 ? "disabled" : ""}>Quitar</button>
      <span class="alfolis-index">Linea ${idx + 1}</span>
    `;
    container.appendChild(el);
  });

  container.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", (event) => {
      const typeKey = event.target.dataset.type;
      const field = event.target.dataset.field;
      const id = event.target.dataset.id;
      const item = state.alfolis[typeKey].find((x) => x.id === id);
      if (!item) return;
      item[field] = event.target.value;
      saveState();
    });
  });

  container.querySelectorAll(".alfolis-remove").forEach((button) => {
    button.addEventListener("click", () => {
      const typeKey = button.dataset.type;
      const id = button.dataset.id;
      state.alfolis[typeKey] = state.alfolis[typeKey].filter((x) => x.id !== id);
      if (!state.alfolis[typeKey].length) state.alfolis[typeKey] = [{ id: createId(typeKey), name: "", position: "" }];
      saveState();
      renderAlfolis();
    });
  });
}

function addAlfoliLine(type) {
  state.alfolis[type].push({ id: createId(type), name: "", position: "" });
  saveState();
  renderAlfolis();
}

function shareAlfolis() {
  const lines = ["Alfolis", "", "Servidores:"];
  state.alfolis.male.forEach((r, i) => lines.push(`${i + 1}. ${r.name || "-"} | Posicion ${r.position || "-"}`));
  lines.push("", "Servidoras:");
  state.alfolis.female.forEach((r, i) => lines.push(`${i + 1}. ${r.name || "-"} | Posicion ${r.position || "-"}`));
  openJpegPreview("Alfolis", lines, true);
  shareText(lines.join("\n"));
}

function openJpegPreview(title, lines, includeShareHint = false) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = 1400;
  const lineHeight = 44;
  const topPad = 120;
  const bottomPad = 90;
  const sidePad = 70;
  const bodyLines = lines.flatMap((line) => wrapText(line, 60));
  const height = topPad + bodyLines.length * lineHeight + bottomPad;
  canvas.width = width;
  canvas.height = Math.max(height, 700);

  ctx.fillStyle = "#f5f8ff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#1b2940";
  ctx.font = "700 56px Arial";
  ctx.fillText(title, sidePad, 86);

  ctx.font = "400 34px Arial";
  let y = topPad;
  bodyLines.forEach((line) => {
    ctx.fillText(line, sidePad, y);
    y += lineHeight;
  });

  const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.9);
  const fileName = `${slugify(title)}-${new Date().toISOString().slice(0, 10)}.jpg`;
  const hint = includeShareHint ? "<p>Formato JPG listo para compartir por WhatsApp.</p>" : "";
  const win = window.open("", "_blank", "width=980,height=860");
  if (!win) return;
  win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>body{font-family:Arial,sans-serif;padding:16px;color:#1b2940}img{width:100%;max-width:880px;border:1px solid #d9e3f5;border-radius:12px;display:block}a{display:inline-block;margin-top:12px;padding:10px 14px;background:#2e5fc1;color:#fff;text-decoration:none;border-radius:999px}p{color:#66758c}</style></head><body><img src="${jpegDataUrl}" alt="${escapeHtml(title)}" /><a href="${jpegDataUrl}" download="${escapeHtml(fileName)}">Descargar JPG</a>${hint}</body></html>`);
  win.document.close();
}

function wrapText(text, maxChars) {
  const words = String(text).split(" ");
  const lines = [];
  let current = "";
  words.forEach((word) => {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = test;
    }
  });
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function shareText(text) {
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return;
    } catch {
      // fallback below
    }
  }
  window.alert("Compartir no disponible en este navegador. Puedes copiar el contenido desde la vista generada.");
}

function createId(prefix = "id") {
  if (crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function getTodayIso() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(value) {
  if (!value) return "--";
  return new Intl.DateTimeFormat("es-GT", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
