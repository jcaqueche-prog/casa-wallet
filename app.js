const STORAGE_KEY = "iglesia-servidores-app";
const DATABASE_SOURCE_VERSION = "v5-replanteado-2026-04-30";
const USERS = [{ username: "Juan Carlos Aqueche Estrada", password: "jcae" }];
const ENCOURAGEMENT_VERSES = [
  { text: "Este es el dia que hizo Jehova; nos gozaremos y alegraremos en el.", ref: "Salmos 118:24" },
  { text: "El gozo de Jehova es vuestra fuerza.", ref: "Nehemias 8:10" },
  { text: "Los que esperan a Jehova tendran nuevas fuerzas.", ref: "Isaias 40:31" },
  { text: "Echando toda vuestra ansiedad sobre el, porque el tiene cuidado de vosotros.", ref: "1 Pedro 5:7" },
  { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" },
  { text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.", ref: "Isaias 41:10" },
];

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
  summarySnapshots: [],
  alfolis: {
    male: [{ id: "m-1", name: "", position: "1", anexo: "Anexo A" }],
    female: [{ id: "f-1", name: "", position: "1", anexo: "Anexo A" }],
  },
  branding: {
    headerImage: "",
    logoImage: "",
  },
};

const state = loadState();
window.state = state;

const loginView = document.getElementById("loginView");
const loginForm = document.getElementById("loginForm");
const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");

const serverForm = document.getElementById("serverForm");
const serverBirthday = document.getElementById("serverBirthday");
const serverPhoto = document.getElementById("serverPhoto");
const serviceForm = document.getElementById("serviceForm");
const serviceDate = document.getElementById("serviceDate");
const serviceType = document.getElementById("serviceType");
const serviceButtonsList = document.getElementById("serviceButtonsList");
const attendanceList = document.getElementById("attendanceList");
const activeServiceText = document.getElementById("activeServiceText");
const serviceTotalsText = document.getElementById("serviceTotalsText");
const pieChart = document.getElementById("pieChart");
const yesPctText = document.getElementById("yesPctText");
const noPctText = document.getElementById("noPctText");
const exportServicePdfButton = document.getElementById("exportServicePdfButton");
const printServicePdfButton = document.getElementById("printServicePdfButton");
const saveServiceButton = document.getElementById("saveServiceButton");
const generateConciliationButton = document.getElementById("generateConciliationButton");
const conciliationGroupCount = document.getElementById("conciliationGroupCount");
const conciliationLeaders = document.getElementById("conciliationLeaders");
const conciliationBoard = document.getElementById("conciliationBoard");
const summaryDateFrom = document.getElementById("summaryDateFrom");
const summaryDateTo = document.getElementById("summaryDateTo");
const summaryServiceSelect = document.getElementById("summaryServiceSelect");
const summaryMonth = document.getElementById("summaryMonth");
const summaryModeGeneralBtn = document.getElementById("summaryModeGeneralBtn");
const summaryModeServerBtn = document.getElementById("summaryModeServerBtn");
const summaryGeneralSection = document.getElementById("summaryGeneralSection");
const summaryServerSection = document.getElementById("summaryServerSection");
const summaryServerSelect = document.getElementById("summaryServerSelect");
const summaryServerMonth = document.getElementById("summaryServerMonth");
const summaryServerYear = document.getElementById("summaryServerYear");
const summaryServerMonthButtons = document.getElementById("summaryServerMonthButtons");
const summaryServerPdfBtn = document.getElementById("summaryServerPdfBtn");
const summaryServerPie = document.getElementById("summaryServerPie");
const summaryServerPct = document.getElementById("summaryServerPct");
const summaryServerTotals = document.getElementById("summaryServerTotals");
const summaryServerList = document.getElementById("summaryServerList");
const summarySaveGeneralButton = document.getElementById("summarySaveGeneralButton");
const summaryCards = document.getElementById("summaryCards");
const summaryGeneralCards = document.getElementById("summaryGeneralCards");
const alfolisPdfButton = document.getElementById("alfolisPdfButton");
const addMaleLineButton = document.getElementById("addMaleLineButton");
const addFemaleLineButton = document.getElementById("addFemaleLineButton");
const maleAlfolisList = document.getElementById("maleAlfolisList");
const femaleAlfolisList = document.getElementById("femaleAlfolisList");
const homeVerseText = document.getElementById("homeVerseText");
const homeVerseRef = document.getElementById("homeVerseRef");
const generalSaveButton = document.getElementById("generalSaveButton");
const heroBannerImage = document.getElementById("heroBannerImage");
const appLogoImage = document.getElementById("appLogoImage");
const headerImageInput = document.getElementById("headerImageInput");
const logoImageInput = document.getElementById("logoImageInput");

const serverSearch = document.getElementById("serverSearch");
const todayLabel = document.getElementById("todayLabel");
const totalServers = document.getElementById("totalServers");
const presentToday = document.getElementById("presentToday");
const absentToday = document.getElementById("absentToday");
const serverCards = document.getElementById("serverCards");
const serverCardTemplate = document.getElementById("serverCardTemplate");
const serverDetailModal = document.getElementById("serverDetailModal");
const serverDetailName = document.getElementById("serverDetailName");
const serverDetailClose = document.getElementById("serverDetailClose");
const serverDetailFrom = document.getElementById("serverDetailFrom");
const serverDetailTo = document.getElementById("serverDetailTo");
const serverDetailMonth = document.getElementById("serverDetailMonth");
const serverDetailPhone = document.getElementById("serverDetailPhone");
const serverDetailBirthday = document.getElementById("serverDetailBirthday");
const serverDetailPie = document.getElementById("serverDetailPie");
const serverDetailPct = document.getElementById("serverDetailPct");
const serverDetailTotals = document.getElementById("serverDetailTotals");
const serverDetailReportBtn = document.getElementById("serverDetailReportBtn");
const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const views = Array.from(document.querySelectorAll(".view"));

let currentServiceId = state.services[0]?.id || "";
let currentConciliation = null;
let lastConciliationSignature = "";
let conciliationLeaderByGroup = {};
let expandedSummaryServiceId = "";
let selectedServerDetailId = "";
let summaryMode = "general";

serverForm.addEventListener("submit", handleCreateServer);
loginForm.addEventListener("submit", handleLogin);
serviceForm.addEventListener("submit", handleSaveService);
exportServicePdfButton.addEventListener("click", exportCurrentServicePdf);
printServicePdfButton.addEventListener("click", exportCurrentServicePdf);
saveServiceButton.addEventListener("click", saveCurrentServiceToSummary);
generateConciliationButton.addEventListener("click", generateConciliation);
conciliationGroupCount.addEventListener("change", () => {
  normalizeConciliationLeaders();
  renderConciliationLeaderSelectors();
});
conciliationBoard.addEventListener("click", handleConciliationActions);
summaryDateFrom.addEventListener("change", () => {
  renderSummary();
  renderServers();
});
summaryDateTo.addEventListener("change", () => {
  renderSummary();
  renderServers();
});
summaryServiceSelect.addEventListener("change", renderSummary);
summaryModeGeneralBtn.addEventListener("click", () => {
  summaryMode = "general";
  renderSummary();
});
summaryModeServerBtn.addEventListener("click", () => {
  summaryMode = "server";
  renderSummary();
});
summaryServerSelect.addEventListener("change", renderSummaryServerView);
summaryServerMonth.addEventListener("change", () => {
  renderSummaryServerMonthButtons();
  renderSummaryServerView();
});
summaryServerYear.addEventListener("input", () => {
  renderSummaryServerMonthButtons();
  renderSummaryServerView();
});
summaryServerPdfBtn.addEventListener("click", exportSummaryServerPdf);
summaryMonth.addEventListener("change", () => {
  if (summaryMonth.value) {
    summaryDateFrom.value = `${summaryMonth.value}-01`;
    const [y, m] = summaryMonth.value.split("-").map(Number);
    summaryDateTo.value = new Date(y, m, 0).toISOString().slice(0, 10);
  }
  renderSummary();
  renderServers();
});
if (summarySaveGeneralButton) summarySaveGeneralButton.addEventListener("click", saveGeneralSummarySnapshot);
summaryCards.addEventListener("click", handleSummaryCardClick);
summaryGeneralCards.addEventListener("click", handleSummarySnapshotClick);
addMaleLineButton.addEventListener("click", () => addAlfoliLine("male"));
addFemaleLineButton.addEventListener("click", () => addAlfoliLine("female"));
alfolisPdfButton.addEventListener("click", exportAlfolisPdf);
generalSaveButton.addEventListener("click", handleGeneralSave);
headerImageInput.addEventListener("change", handleHeaderImageUpload);
logoImageInput.addEventListener("change", handleLogoImageUpload);
serverSearch.addEventListener("input", renderServers);
serverDetailClose.addEventListener("click", () => {
  serverDetailModal.style.display = "none";
  selectedServerDetailId = "";
});
serverDetailFrom.addEventListener("change", renderServerDetailChart);
serverDetailTo.addEventListener("change", renderServerDetailChart);
serverDetailMonth.addEventListener("change", () => {
  if (serverDetailMonth.value) {
    const [y, m] = serverDetailMonth.value.split("-").map(Number);
    serverDetailFrom.value = `${serverDetailMonth.value}-01`;
    serverDetailTo.value = new Date(y, m, 0).toISOString().slice(0, 10);
  }
  renderServerDetailChart();
});
serverDetailReportBtn.addEventListener("click", exportServerRangeReportPdf);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.viewTarget));
});

initialize();

function initialize() {
  const today = getTodayIso();
  todayLabel.textContent = formatDate(today);
  serverBirthday.value = today;
  serviceDate.value = today;
  serviceType.selectedIndex = 0;
  summaryDateFrom.value = today.slice(0, 8) + "01";
  summaryDateTo.value = today;
  renderHomeVerse();
  renderBranding();
  setActiveView("inicio");
  setLoginState(Boolean(sessionStorage.getItem("iglesia-auth")));
  renderAll();
}

function handleLogin(event) {
  event.preventDefault();
  const user = String(loginUser.value || "").trim();
  const pass = String(loginPass.value || "").trim();
  const ok = USERS.some((u) => u.username === user && u.password === pass);
  if (!ok) {
    window.alert("Usuario o clave incorrecta.");
    return;
  }
  sessionStorage.setItem("iglesia-auth", user);
  setLoginState(true);
}

function setLoginState(isAuth) {
  loginView.style.display = isAuth ? "none" : "grid";
  document.querySelector(".app-shell").classList.toggle("is-locked", !isAuth);
}

function renderHomeVerse() {
  const index = Math.floor(Math.random() * ENCOURAGEMENT_VERSES.length);
  const verse = ENCOURAGEMENT_VERSES[index];
  homeVerseText.textContent = verse.text;
  homeVerseRef.textContent = verse.ref;
}

function handleGeneralSave() {
  saveState();
  window.alert("Cambios guardados correctamente.");
}

async function handleHeaderImageUpload(event) {
  const file = event.target.files?.[0];
  const data = await fileToDataUrl(file);
  if (!data) return;
  state.branding.headerImage = data;
  saveState();
  renderBranding();
}

async function handleLogoImageUpload(event) {
  const file = event.target.files?.[0];
  const data = await fileToDataUrl(file);
  if (!data) return;
  state.branding.logoImage = data;
  saveState();
}

function renderBranding() {
  const headerImage = state.branding?.headerImage || "";
  const logoImage = state.branding?.logoImage || "";
  heroBannerImage.src = headerImage;
  heroBannerImage.style.display = headerImage ? "block" : "none";
  appLogoImage.src = logoImage;
  appLogoImage.style.display = logoImage ? "block" : "none";
}

function getPdfLogoBlock() {
  const logo = state.branding?.logoImage || "";
  if (!logo) return "";
  return `<div class="pdf-brand"><img src="${logo}" alt="Logo" /></div>`;
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
      summarySnapshots: Array.isArray(parsed.summarySnapshots) ? parsed.summarySnapshots : [],
      alfolis: parsed.alfolis && typeof parsed.alfolis === "object"
        ? {
            male: Array.isArray(parsed.alfolis.male) && parsed.alfolis.male.length ? parsed.alfolis.male : [{ id: "m-1", name: "", position: "1", anexo: "Anexo A" }],
            female: Array.isArray(parsed.alfolis.female) && parsed.alfolis.female.length ? parsed.alfolis.female : [{ id: "f-1", name: "", position: "1", anexo: "Anexo A" }],
          }
        : structuredClone(defaultState.alfolis),
      branding: parsed.branding && typeof parsed.branding === "object"
        ? {
            headerImage: typeof parsed.branding.headerImage === "string" ? parsed.branding.headerImage : "",
            logoImage: typeof parsed.branding.logoImage === "string" ? parsed.branding.logoImage : "",
          }
        : structuredClone(defaultState.branding),
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
  renderServiceAttendance();
  renderServiceStats();
  normalizeConciliationLeaders();
  renderConciliationLeaderSelectors();
  renderConciliation();
  renderSummary();
  renderSummaryServiceSelect();
  renderSummaryServerOptions();
  renderAlfolis();
}

function setActiveView(viewName) {
  tabButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.viewTarget === viewName));
  views.forEach((view) => view.classList.toggle("view--active", view.dataset.view === viewName));
}

window.saveServiceAndGoSummary = function saveServiceAndGoSummary(serviceId) {
  const service = state.services.find((s) => s.id === serviceId);
  if (!service) return;
  service.statsSaved = true;
  saveState();
  renderSummary();
  setActiveView("resumen");
};

async function handleCreateServer(event) {
  event.preventDefault();
  const fd = new FormData(serverForm);
  const name = String(fd.get("name") || "").trim();
  const birthday = String(fd.get("birthday") || "");
  const phone = String(fd.get("phone") || "").trim();
  const address = String(fd.get("address") || "").trim();
  const photoFile = fd.get("photo");
  if (!name || !birthday || !phone || !address) return;
  const photo = await fileToDataUrl(photoFile);

  state.servers.unshift({ id: createId("srv"), name, birthday, phone, address, photo });
  saveState();
  serverForm.reset();
  serverBirthday.value = getTodayIso();
  serverPhoto.value = "";
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
    const card = fragment.querySelector(".server-card");
    fragment.querySelector(".server-card__name").textContent = server.name;
    const photoEl = fragment.querySelector(".server-card__photo");
    photoEl.src = server.photo || createAvatarDataUrl(server.name);
    fragment.querySelector(".server-card__delete").addEventListener("click", (event) => {
      event.stopPropagation();
      deleteServer(server.id);
    });
    fragment.querySelector(".server-card__name-btn").addEventListener("click", (event) => {
      event.preventDefault();
      openServerDetail(server.id);
    });
    serverCards.appendChild(fragment);
  });
}

function renderServiceButtons() {
  if (!serviceButtonsList) return;
  const list = state.services.slice().sort((a, b) => b.date.localeCompare(a.date));
  if (!list.length) {
    serviceButtonsList.innerHTML = `<span class="result-empty">Sin servicios creados.</span>`;
    return;
  }
  serviceButtonsList.innerHTML = list
    .map((service) => `<button type="button" class="primary-button service-open-btn" data-service-id="${service.id}">${escapeHtml(formatDate(service.date))} - ${escapeHtml(service.lines.join(" / "))}</button>`)
    .join("");
  serviceButtonsList.querySelectorAll(".service-open-btn").forEach((button) => {
    button.addEventListener("click", () => {
      currentServiceId = button.dataset.serviceId;
      renderServiceAttendance();
      renderServiceStats();
      attendanceList.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function openServerDetail(serverId) {
  const server = state.servers.find((s) => s.id === serverId);
  if (!server) return;
  selectedServerDetailId = serverId;
  serverDetailName.textContent = server.name;
  serverDetailPhone.textContent = server.phone || "--";
  serverDetailBirthday.textContent = formatDate(server.birthday);
  serverDetailMonth.value = "";
  serverDetailFrom.value = summaryDateFrom?.value || "";
  serverDetailTo.value = summaryDateTo?.value || "";
  renderServerDetailChart();
  serverDetailModal.style.display = "grid";
}

function renderServerDetailChart() {
  if (!selectedServerDetailId) return;
  const from = serverDetailFrom.value || "";
  const to = serverDetailTo.value || "";
  const services = state.services.filter((s) => (!from || s.date >= from) && (!to || s.date <= to));
  const total = services.length;
  let yes = 0;
  services.forEach((service) => {
    if (service.attendance[selectedServerDetailId] === "Si") yes += 1;
  });
  const pct = total ? Math.round((yes / total) * 100) : 0;
  const yesDeg = Math.round((pct / 100) * 360);
  serverDetailPie.style.background = `conic-gradient(#2cae7a 0deg, #2cae7a ${yesDeg}deg, #d97878 ${yesDeg}deg, #d97878 360deg)`;
  serverDetailPct.textContent = `Asistencia: ${pct}%`;
  serverDetailTotals.textContent = `${yes}/${total} servicios`;
}

function exportServerRangeReportPdf() {
  if (!selectedServerDetailId) return;
  const server = state.servers.find((s) => s.id === selectedServerDetailId);
  if (!server) return;
  const from = serverDetailFrom.value || "";
  const to = serverDetailTo.value || "";
  const services = state.services
    .filter((s) => (!from || s.date >= from) && (!to || s.date <= to))
    .sort((a, b) => a.date.localeCompare(b.date));
  const total = services.length;
  let yes = 0;
  const rows = services.map((service) => {
    const status = service.attendance[selectedServerDetailId] || "Pendiente";
    if (status === "Si") yes += 1;
    return `<tr><td>${escapeHtml(formatDate(service.date))}</td><td>${escapeHtml(service.lines.join(" / "))}</td><td>${escapeHtml(status)}</td></tr>`;
  }).join("");
  const pct = total ? Math.round((yes / total) * 100) : 0;
  const yesDeg = Math.round((pct / 100) * 360);
  const printable = window.open("", "_blank", "width=1100,height=860");
  if (!printable) return;
  printable.document.write(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>Reporte de ${escapeHtml(server.name)}</title>
      <style>
        @page { size: A4 portrait; margin: 14mm; }
        body { font-family: "Segoe UI", Arial, sans-serif; color:#1f2b42; margin:0; background:#f4f7fc; }
        .actions { display:flex; gap:10px; margin:0 0 10px; }
        button { padding:10px 14px; border:0; border-radius:999px; background:#2f5ca8; color:#fff; font-weight:700; cursor:pointer; }
        .sheet { background:#fff; border:1px solid #d6e0f0; border-radius:14px; padding:18px; }
        table { width:100%; border-collapse:collapse; font-size:12px; margin-top:8px; }
        th, td { border:1px solid #c5d2e8; padding:7px; text-align:left; }
        th { background:#e8effc; color:#24467f; }
      </style>
    </head>
    <body>
      <div class="actions">
        <button onclick="window.print()">Imprimir PDF</button>
        <button type="button" onclick="window.close()">Regresar a la APP</button>
      </div>
      <div class="sheet">
        <h1>Reporte de Asistencia por Servidor</h1>
        <p><strong>Servidor:</strong> ${escapeHtml(server.name)}</p>
        <p><strong>Rango:</strong> ${escapeHtml(from ? formatDate(from) : "sin inicio")} a ${escapeHtml(to ? formatDate(to) : "sin fin")}</p>
        <p><strong>Asistencia:</strong> ${pct}% (${yes}/${total})</p>
        <div style="width:110px;height:110px;border-radius:50%;border:1px solid #c5d2e8;background:conic-gradient(#2cae7a 0deg,#2cae7a ${yesDeg}deg,#d97878 ${yesDeg}deg,#d97878 360deg);"></div>
        <table>
          <thead><tr><th>Fecha</th><th>Servicio</th><th>Asistencia</th></tr></thead>
          <tbody>${rows || "<tr><td colspan='3'>Sin servicios en el rango.</td></tr>"}</tbody>
        </table>
      </div>
    </body>
    </html>
  `);
  printable.document.close();
}

function getServerRangeAttendance(serverId) {
  const from = summaryDateFrom?.value || "";
  const to = summaryDateTo?.value || "";
  const services = state.services.filter((s) => (!from || s.date >= from) && (!to || s.date <= to));
  const total = services.length;
  if (!total) return { yes: 0, total: 0, pct: 0 };
  let yes = 0;
  services.forEach((service) => {
    if (service.attendance[serverId] === "Si") yes += 1;
  });
  return { yes, total, pct: Math.round((yes / total) * 100) };
}

function deleteServer(serverId) {
  state.servers = state.servers.filter((s) => s.id !== serverId);
  state.services.forEach((service) => {
    delete service.attendance[serverId];
  });
  saveState();
  renderAll();
}

function handleSaveService(event) {
  event.preventDefault();
  const current = getCurrentService();
  if (current && !isServiceAttendanceComplete(current)) {
    window.alert("Asistencia no completada. Marca Si o No para todos antes de agregar otro servicio.");
    return;
  }

  const date = serviceDate.value || getTodayIso();
  const selectedType = String(serviceType.value || "").trim();
  if (!selectedType) return;
  const lines = [selectedType];

  const service = {
    id: createId("svc"),
    date,
    lines,
    attendance: {},
    statsSaved: true,
    createdAt: new Date().toISOString(),
  };

  if (current && isServiceAttendanceComplete(current)) {
    current.statsSaved = true;
  }

  state.services.unshift(service);
  currentServiceId = service.id;
  saveState();
  serviceDate.value = getTodayIso();
  serviceType.selectedIndex = 0;
  renderAll();
}

function getCurrentService() {
  return state.services.find((s) => s.id === currentServiceId) || null;
}

function isServiceAttendanceComplete(service) {
  return state.servers.every((server) => {
    const status = service.attendance[server.id];
    return status === "Si" || status === "No";
  });
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
    row.className = "attendance-row attendance-row--3";
    row.innerHTML = `
      <div class="attendance-cell attendance-name">${escapeHtml(server.name)}</div>
      <div class="attendance-cell">
        <label><input type="checkbox" class="attendance-check-yes" data-server-id="${server.id}" ${status === "Si" ? "checked" : ""} /> Si</label>
      </div>
      <div class="attendance-cell">
        <label><input type="checkbox" class="attendance-check-no" data-server-id="${server.id}" ${status === "No" ? "checked" : ""} /> No</label>
      </div>
    `;
    attendanceList.appendChild(row);
  });

  attendanceList.querySelectorAll(".attendance-check-yes").forEach((input) => {
    input.addEventListener("change", (event) => {
      const serverId = event.target.dataset.serverId;
      const checked = event.target.checked;
      service.attendance[serverId] = checked ? "Si" : "";
      const other = attendanceList.querySelector(`.attendance-check-no[data-server-id="${serverId}"]`);
      if (other && checked) other.checked = false;
      if (isServiceAttendanceComplete(service)) service.statsSaved = true;
      saveState();
      renderServiceStats();
      renderServers();
    });
  });

  attendanceList.querySelectorAll(".attendance-check-no").forEach((input) => {
    input.addEventListener("change", (event) => {
      const serverId = event.target.dataset.serverId;
      const checked = event.target.checked;
      service.attendance[serverId] = checked ? "No" : "";
      const other = attendanceList.querySelector(`.attendance-check-yes[data-server-id="${serverId}"]`);
      if (other && checked) other.checked = false;
      if (isServiceAttendanceComplete(service)) service.statsSaved = true;
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
  exportServicePdfButton.disabled = !service;
  printServicePdfButton.disabled = !service;
  saveServiceButton.disabled = !service;

  if (!service) {
    serviceTotalsText.textContent = "Aun sin datos para este servicio.";
    pieChart.innerHTML = "";
    pieChart.style.background = "conic-gradient(#2cae7a 0deg, #2cae7a 0deg, #d97878 0deg, #d97878 360deg)";
    yesPctText.textContent = "Si: 0%";
    noPctText.textContent = "No: 0%";
    return;
  }

  serviceTotalsText.textContent = `Asistieron: ${stats.yesCount} | No asistieron: ${stats.noCount}`;
  const yesDeg = Math.round((stats.yesPct / 100) * 360);
  pieChart.innerHTML = "";
  pieChart.style.background = `conic-gradient(#2cae7a 0deg, #2cae7a ${yesDeg}deg, #d97878 ${yesDeg}deg, #d97878 360deg)`;
  yesPctText.textContent = `Si: ${stats.yesPct}%`;
  noPctText.textContent = `No: ${stats.noPct}%`;
}

function saveCurrentServiceToSummary() {
  const service = getCurrentService();
  if (!service) return;
  if (!isServiceAttendanceComplete(service)) {
    window.alert("Completa la asistencia (Si/No) para todos antes de guardar servicio.");
    return;
  }
  service.statsSaved = true;
  saveState();
  renderSummary();
  setActiveView("resumen");
}

function exportCurrentServicePdf() {
  const service = getCurrentService();
  if (!service) return;
  const stats = getServiceStats(service);
  const logoBlock = getPdfLogoBlock();
  const yesRows = state.servers
    .filter((server) => service.attendance[server.id] === "Si")
    .map((server) => `<tr><td>${escapeHtml(server.name)}</td></tr>`)
    .join("");
  const noRows = state.servers
    .filter((server) => service.attendance[server.id] === "No")
    .map((server) => `<tr><td>${escapeHtml(server.name)}</td></tr>`)
    .join("");
  const yesDeg = Math.round((stats.yesPct / 100) * 360);
  const pie = `
    <div style="display:grid;justify-items:center;gap:8px;margin:10px 0 14px;">
      <div style="width:130px;height:130px;border-radius:50%;border:1px solid #c8d2e5;background:conic-gradient(#2cae7a 0deg,#2cae7a ${yesDeg}deg,#d97878 ${yesDeg}deg,#d97878 360deg);"></div>
      <p style="margin:0;color:#5d6a80;"><strong>Si:</strong> ${stats.yesPct}% | <strong>No:</strong> ${stats.noPct}%</p>
    </div>
  `;

  const printable = window.open("", "_blank", "width=1100,height=860");
  if (!printable) return;
  printable.document.write(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>Asistencia al servicio ${escapeHtml(service.lines.join(" / "))}</title>
      <style>
        @page { size: A4 portrait; margin: 14mm; }
        body { font-family: Arial, sans-serif; color: #1b2940; margin: 0; background:#f6f9ff; }
        .sheet { background:#fff; border:1px solid #d8e1f1; border-radius:14px; padding:18px; }
        .pdf-brand { display:flex; justify-content:flex-end; margin-bottom:8px; }
        .pdf-brand img { width:56px; height:56px; object-fit:contain; border:1px solid #d8e1f1; border-radius:10px; background:#fff; padding:4px; }
        h1 { margin: 0 0 10px; font-size: 24px; color:#23406d; }
        p { margin: 0 0 8px; font-size: 13px; }
        .meta { display:grid; gap:6px; margin-bottom:10px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; }
        th, td { border: 1px solid #c8d2e5; padding: 6px; text-align: left; }
        th { background: #e9f0ff; color:#23406d; }
        .cols { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .actions { display:flex; gap:10px; margin:0 0 10px; }
        button { padding:10px 14px; border:0; border-radius:999px; background:#2e5fc1; color:#fff; font-weight:700; cursor:pointer; }
      </style>
    </head>
    <body>
      <div class="actions">
        <button onclick="window.print()">Imprimir</button>
        <button id="saveSvcBtn" type="button">Guardar servicio</button>
        <button type="button" onclick="window.close()">Regresar a la APP</button>
      </div>
      <div class="sheet">
        ${logoBlock}
        <h1>Asistencia por Servicio</h1>
        <div class="meta">
          <p><strong>Fecha de servicio:</strong> ${escapeHtml(formatDate(service.date))}</p>
          <p><strong>Tipo de servicio:</strong> ${escapeHtml(service.lines.join(" / "))}</p>
          <p><strong>Asistieron:</strong> ${stats.yesCount} | <strong>No asistieron:</strong> ${stats.noCount}</p>
        </div>
        ${pie}
        <div class="cols">
          <table>
            <thead><tr><th>Asistieron</th></tr></thead>
            <tbody>${yesRows || "<tr><td>-</td></tr>"}</tbody>
          </table>
          <table>
            <thead><tr><th>No asistieron</th></tr></thead>
            <tbody>${noRows || "<tr><td>-</td></tr>"}</tbody>
          </table>
        </div>
      </div>
      <script>
        document.getElementById("saveSvcBtn").addEventListener("click", () => {
          if (window.opener && typeof window.opener.saveServiceAndGoSummary === "function") {
            window.opener.saveServiceAndGoSummary(${JSON.stringify(service.id)});
            window.close();
          } else {
            alert("No se pudo guardar desde esta vista.");
          }
        });
      </script>
    </body>
    </html>
  `);
  printable.document.close();
  printable.focus();
}

function exportCurrentServiceExcel() {
  const service = getCurrentService();
  if (!service) return;
  const headers = ["Fecha de servicio", "Tipo de servicio", "Servidor", "Asistencia"];
  const linesText = service.lines.join(" / ");
  const rows = state.servers.map((server) => {
    const status = service.attendance[server.id] || "Pendiente";
    return [service.date, linesText, server.name, status];
  });

  const csv = [headers, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");

  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `${buildServiceFileBase(service)}.csv`);
}

function shareCurrentServicePdf() {
  const service = getCurrentService();
  if (!service) return;
  const lines = [`Asistencia por servicio`, `Fecha: ${service.date}`, `Tipo: ${service.lines.join(" / ")}`];
  const stats = getServiceStats(service);
  lines.push(`Asistieron: ${stats.yesCount}`, `No asistieron: ${stats.noCount}`);
  shareText(lines.join("\n"));
}

function shareCurrentServiceExcel() {
  const service = getCurrentService();
  if (!service) return;
  const headers = ["Fecha de servicio", "Tipo de servicio", "Servidor", "Asistencia"];
  const linesText = service.lines.join(" / ");
  const rows = state.servers.map((server) => {
    const status = service.attendance[server.id] || "Pendiente";
    return [service.date, linesText, server.name, status];
  });
  const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const fileName = `${buildServiceFileBase(service)}.csv`;
  shareFileBlob(blob, fileName, "text/csv;charset=utf-8;");
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function shareFileBlob(blob, fileName, mimeType) {
  if (!navigator.share || typeof navigator.canShare !== "function") {
    downloadBlob(blob, fileName);
    return;
  }
  try {
    const file = new File([blob], fileName, { type: mimeType });
    const shareData = { files: [file], title: fileName };
    if (!navigator.canShare(shareData)) {
      downloadBlob(blob, fileName);
      return;
    }
    await navigator.share(shareData);
  } catch {
    downloadBlob(blob, fileName);
  }
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
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

  const requested = Number(conciliationGroupCount?.value || 4);
  const groupCount = Math.max(1, Math.min(5, Number.isFinite(requested) ? requested : 4));
  const groups = Array.from({ length: groupCount }, (_, i) => ({
    name: `Grupo ${i + 1}`,
    leaderId: conciliationLeaderByGroup[String(i + 1)] || "",
    leaderName: "",
    members: [],
  }));

  const leaderIds = new Set(
    groups
      .map((group) => group.leaderId)
      .filter(Boolean)
  );
  const memberPool = list.filter((server) => !leaderIds.has(server.id));

  groups.forEach((group) => {
    if (!group.leaderId) return;
    const leader = state.servers.find((server) => server.id === group.leaderId);
    group.leaderName = leader ? leader.name : "";
  });

  memberPool.forEach((server, idx) => {
    groups[idx % groups.length].members.push(server);
  });

  currentConciliation = groups;
  renderConciliation();
}

function normalizeConciliationLeaders() {
  const requested = Number(conciliationGroupCount?.value || 4);
  const groupCount = Math.max(1, Math.min(5, Number.isFinite(requested) ? requested : 4));
  const next = {};
  for (let i = 1; i <= groupCount; i += 1) {
    const key = String(i);
    if (conciliationLeaderByGroup[key]) {
      next[key] = conciliationLeaderByGroup[key];
    }
  }
  conciliationLeaderByGroup = next;
}

function renderConciliationLeaderSelectors() {
  if (!conciliationLeaders) return;
  const requested = Number(conciliationGroupCount?.value || 4);
  const groupCount = Math.max(1, Math.min(5, Number.isFinite(requested) ? requested : 4));
  const selectedSet = new Set(Object.values(conciliationLeaderByGroup).filter(Boolean));

  conciliationLeaders.innerHTML = Array.from({ length: groupCount }, (_, index) => {
    const groupNumber = index + 1;
    const key = String(groupNumber);
    const currentSelected = conciliationLeaderByGroup[key] || "";
    const options = state.servers
      .filter((server) => server.id === currentSelected || !selectedSet.has(server.id))
      .map((server) => `<option value="${server.id}" ${server.id === currentSelected ? "selected" : ""}>${escapeHtml(server.name)}</option>`)
      .join("");

    return `
      <label>
        Encargado Grupo ${groupNumber}
        <select class="conciliation-leader-select" data-group="${groupNumber}">
          <option value="">Sin encargado</option>
          ${options}
        </select>
      </label>
    `;
  }).join("");

  conciliationLeaders.querySelectorAll(".conciliation-leader-select").forEach((select) => {
    select.addEventListener("change", (event) => {
      const group = event.target.dataset.group;
      const nextLeaderId = event.target.value;
      const usedByOtherGroup = Object.entries(conciliationLeaderByGroup).some(
        ([g, leaderId]) => g !== group && leaderId === nextLeaderId && nextLeaderId
      );
      if (usedByOtherGroup) {
        event.target.value = "";
        window.alert("Ese servidor ya esta asignado como encargado en otro grupo.");
        return;
      }
      if (nextLeaderId) {
        conciliationLeaderByGroup[group] = nextLeaderId;
      } else {
        delete conciliationLeaderByGroup[group];
      }
      renderConciliationLeaderSelectors();
    });
  });
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
          <p><strong>Encargado:</strong> ${escapeHtml(group.leaderName || "Sin encargado")}</p>
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
    if (group) {
      const lines = group.members.map((m, i) => `${i + 1}. ${m.name} - ${m.phone}`);
      shareJpeg(`${group.name}`, lines);
    }
  }
}

function renderSummary() {
  summaryGeneralSection.style.display = summaryMode === "general" ? "block" : "none";
  summaryServerSection.style.display = summaryMode === "server" ? "block" : "none";
  if (summaryMode === "server") {
    renderSummaryServerOptions();
    renderSummaryServerView();
    return;
  }
  renderSummaryServiceSelect();
  const from = summaryDateFrom.value;
  const to = summaryDateTo.value;
  const selectedServiceId = summaryServiceSelect.value;
  const records = state.services
    .filter((s) => s.statsSaved)
    .filter((s) => (!from || s.date >= from) && (!to || s.date <= to))
    .filter((s) => !selectedServiceId || s.id === selectedServiceId)
    .sort((a, b) => b.date.localeCompare(a.date));

  summaryCards.innerHTML = "";
  if (!records.length) {
    summaryCards.innerHTML = `<p class="result-empty">No hay estadisticas guardadas en este rango.</p>`;
    renderSummarySnapshots();
    return;
  }

  summaryCards.innerHTML = records
    .map((service) => {
      const stats = getServiceStats(service);
      const expanded = expandedSummaryServiceId === service.id;
      const yesList = state.servers
        .filter((server) => service.attendance[server.id] === "Si")
        .map((server) => `<li>${escapeHtml(server.name)}</li>`)
        .join("");
      const noList = state.servers
        .filter((server) => service.attendance[server.id] === "No")
        .map((server) => `<li>${escapeHtml(server.name)}</li>`)
        .join("");
      return `
        <article class="summary-card">
          <p><strong>fecha de servicio:</strong> ${escapeHtml(formatDate(service.date))}</p>
          <p><strong>asistieron:</strong> ${stats.yesCount}</p>
          <p><strong>no asistieron:</strong> ${stats.noCount}</p>
          <div class="service-actions">
            <button type="button" class="primary-button summary-open-btn" data-service-id="${service.id}">${expanded ? "Ocultar detalle" : "Ver detalle"}</button>
            <button type="button" class="primary-button summary-print-pdf-btn" data-service-id="${service.id}">Imprimir PDF</button>
            <button type="button" class="primary-button summary-edit-btn" data-service-id="${service.id}">Editar</button>
            <button type="button" class="ghost-button summary-delete-btn" data-service-id="${service.id}">Eliminar</button>
          </div>
          <div class="summary-preview-row">
            <div class="pie-chart" style="background: conic-gradient(#2cae7a 0deg, #2cae7a ${Math.round((stats.yesPct / 100) * 360)}deg, #d97878 ${Math.round((stats.yesPct / 100) * 360)}deg, #d97878 360deg)"></div>
            <div class="chart-legend">
              <span>Si: ${stats.yesPct}%</span>
              <span>No: ${stats.noPct}%</span>
            </div>
          </div>
          <div class="summary-detail ${expanded ? "is-open" : ""}">
            <div class="conciliation-board">
              <div class="result-card">
                <h4>Asistieron</h4>
                <ol>${yesList || "<li>-</li>"}</ol>
              </div>
              <div class="result-card">
                <h4>No asistieron</h4>
                <ol>${noList || "<li>-</li>"}</ol>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
  renderSummarySnapshots();
}

function renderSummaryServerOptions() {
  if (!summaryServerSelect) return;
  const prev = summaryServerSelect.value;
  summaryServerSelect.innerHTML = `<option value="">Selecciona servidor</option>${state.servers
    .map((s) => `<option value="${s.id}">${escapeHtml(s.name)}</option>`)
    .join("")}`;
  if (state.servers.some((s) => s.id === prev)) summaryServerSelect.value = prev;
  renderSummaryServerMonthButtons();
}

function renderSummaryServerMonthButtons() {
  if (!summaryServerMonthButtons) return;
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const activeMonth = summaryServerMonth.value;
  const year = String(summaryServerYear.value || new Date().getFullYear());
  summaryServerMonthButtons.innerHTML = monthNames
    .map((name, index) => {
      const month = String(index + 1).padStart(2, "0");
      const value = `${year}-${month}`;
      const activeClass = value === activeMonth ? " is-active" : "";
      return `<button type="button" class="tab-button${activeClass} summary-month-btn" data-month="${value}">${name}</button>`;
    })
    .join("");
  summaryServerMonthButtons.querySelectorAll(".summary-month-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      summaryServerMonth.value = btn.dataset.month;
      renderSummaryServerMonthButtons();
      renderSummaryServerView();
    });
  });
}

function getSummaryServerServices() {
  const serverId = summaryServerSelect.value;
  if (!serverId) return { serverId: "", services: [] };
  const month = summaryServerMonth.value || "";
  const year = String(summaryServerYear.value || "").trim();
  const services = state.services.filter((s) => {
    if (month && !s.date.startsWith(month)) return false;
    if (!month && year && !s.date.startsWith(year)) return false;
    return s.statsSaved;
  });
  return { serverId, services };
}

function renderSummaryServerView() {
  const { serverId, services } = getSummaryServerServices();
  if (!serverId) {
    summaryServerPie.style.background = "conic-gradient(#2cae7a 0deg,#2cae7a 0deg,#d97878 0deg,#d97878 360deg)";
    summaryServerPct.textContent = "Asistencia: 0%";
    summaryServerTotals.textContent = "0/0 servicios";
    summaryServerList.innerHTML = "<p class='result-empty'>Selecciona un servidor.</p>";
    return;
  }
  let yes = 0;
  const yesList = [];
  const noList = [];
  services.forEach((service) => {
    const status = service.attendance[serverId] || "Pendiente";
    const label = `${formatDate(service.date)} - ${service.lines.join(" / ")}`;
    if (status === "Si") {
      yes += 1;
      yesList.push(label);
    } else if (status === "No") {
      noList.push(label);
    }
  });
  const total = services.length;
  const pct = total ? Math.round((yes / total) * 100) : 0;
  const deg = Math.round((pct / 100) * 360);
  summaryServerPie.style.background = `conic-gradient(#2cae7a 0deg,#2cae7a ${deg}deg,#d97878 ${deg}deg,#d97878 360deg)`;
  summaryServerPct.textContent = `Asistencia: ${pct}%`;
  summaryServerTotals.textContent = `${yes}/${total} servicios`;
  summaryServerList.innerHTML = `
    <div class="conciliation-board">
      <div class="result-card"><h4>Asistieron</h4><ol>${yesList.map((x) => `<li>${escapeHtml(x)}</li>`).join("") || "<li>-</li>"}</ol></div>
      <div class="result-card"><h4>No asistieron</h4><ol>${noList.map((x) => `<li>${escapeHtml(x)}</li>`).join("") || "<li>-</li>"}</ol></div>
    </div>
  `;
}

function exportSummaryServerPdf() {
  const { serverId, services } = getSummaryServerServices();
  if (!serverId) return;
  const server = state.servers.find((s) => s.id === serverId);
  if (!server) return;
  const yesRows = [];
  const noRows = [];
  services.forEach((service) => {
    const status = service.attendance[serverId] || "Pendiente";
    const text = `${formatDate(service.date)} - ${service.lines.join(" / ")}`;
    if (status === "Si") yesRows.push(text);
    if (status === "No") noRows.push(text);
  });
  const yes = yesRows.length;
  const total = services.length;
  const pct = total ? Math.round((yes / total) * 100) : 0;
  const deg = Math.round((pct / 100) * 360);
  const printable = window.open("", "_blank", "width=1100,height=860");
  if (!printable) return;
  printable.document.write(`
    <!doctype html><html lang="es"><head><meta charset="utf-8" />
    <title>Resumen por servidor ${escapeHtml(server.name)}</title>
    <style>
      @page { size: A4 portrait; margin: 14mm; }
      body { font-family: "Segoe UI", Arial, sans-serif; color:#1f2b42; margin:0; background:#f4f7fc; }
      .actions { display:flex; gap:10px; margin:0 0 10px; }
      button { padding:10px 14px; border:0; border-radius:999px; background:#2f5ca8; color:#fff; font-weight:700; cursor:pointer; }
      .sheet { background:#fff; border:1px solid #d6e0f0; border-radius:14px; padding:18px; }
      .cols { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      table { width:100%; border-collapse:collapse; font-size:12px; }
      th, td { border:1px solid #c5d2e8; padding:7px; text-align:left; }
      th { background:#e8effc; color:#24467f; }
    </style></head><body>
      <div class="actions"><button onclick="window.print()">Imprimir PDF</button><button type="button" onclick="window.close()">Regresar a la APP</button></div>
      <div class="sheet">
        <h1>Resumen por Servidor</h1>
        <p><strong>Servidor:</strong> ${escapeHtml(server.name)}</p>
        <p><strong>Asistencia:</strong> ${pct}% (${yes}/${total})</p>
        <div style="width:96px;height:96px;border-radius:50%;border:1px solid #c5d2e8;background:conic-gradient(#2cae7a 0deg,#2cae7a ${deg}deg,#d97878 ${deg}deg,#d97878 360deg);"></div>
        <div class="cols">
          <table><thead><tr><th>Asistieron</th></tr></thead><tbody>${yesRows.map((x) => `<tr><td>${escapeHtml(x)}</td></tr>`).join("") || "<tr><td>-</td></tr>"}</tbody></table>
          <table><thead><tr><th>No asistieron</th></tr></thead><tbody>${noRows.map((x) => `<tr><td>${escapeHtml(x)}</td></tr>`).join("") || "<tr><td>-</td></tr>"}</tbody></table>
        </div>
      </div>
    </body></html>
  `);
  printable.document.close();
}

function renderSummaryServiceSelect() {
  if (!summaryServiceSelect) return;
  const previous = summaryServiceSelect.value;
  const records = state.services
    .filter((s) => s.statsSaved)
    .sort((a, b) => b.date.localeCompare(a.date));
  summaryServiceSelect.innerHTML = `<option value="">Todos</option>${records
    .map((s) => `<option value="${s.id}">${escapeHtml(formatDate(s.date))} - ${escapeHtml(s.lines.join(" / "))}</option>`)
    .join("")}`;
  if (records.some((s) => s.id === previous)) summaryServiceSelect.value = previous;
}

function saveGeneralSummarySnapshot() {
  const from = summaryDateFrom.value || "";
  const to = summaryDateTo.value || "";
  const records = state.services
    .filter((s) => s.statsSaved)
    .filter((s) => (!from || s.date >= from) && (!to || s.date <= to));

  if (!records.length) {
    window.alert("No hay datos en ese rango para guardar un resumen general.");
    return;
  }

  let yesCount = 0;
  let noCount = 0;
  records.forEach((service) => {
    const stats = getServiceStats(service);
    yesCount += stats.yesCount;
    noCount += stats.noCount;
  });

  state.summarySnapshots.unshift({
    id: createId("sum"),
    from,
    to,
    servicesCount: records.length,
    yesCount,
    noCount,
    createdAt: new Date().toISOString(),
  });
  saveState();
  renderSummarySnapshots();
  window.alert("Resumen general guardado.");
}

function renderSummarySnapshots() {
  if (!summaryGeneralCards) return;
  const snapshots = Array.isArray(state.summarySnapshots) ? state.summarySnapshots : [];
  if (!snapshots.length) {
    summaryGeneralCards.innerHTML = "";
    return;
  }

  summaryGeneralCards.innerHTML = snapshots
    .map((snap) => `
      <article class="summary-card">
        <p><strong>resumen general:</strong> ${escapeHtml(snap.from || "(sin inicio)")} a ${escapeHtml(snap.to || "(sin fin)")}</p>
        <p><strong>servicios incluidos:</strong> ${snap.servicesCount}</p>
        <p><strong>asistieron:</strong> ${snap.yesCount}</p>
        <p><strong>no asistieron:</strong> ${snap.noCount}</p>
        <div class="service-actions">
          <button type="button" class="ghost-button summary-snapshot-delete-btn" data-snapshot-id="${snap.id}">Eliminar</button>
        </div>
      </article>
    `)
    .join("");
}

function handleSummarySnapshotClick(event) {
  const deleteBtn = event.target.closest(".summary-snapshot-delete-btn");
  if (!deleteBtn) return;
  const snapshotId = deleteBtn.dataset.snapshotId;
  state.summarySnapshots = (state.summarySnapshots || []).filter((item) => item.id !== snapshotId);
  saveState();
  renderSummarySnapshots();
}

function handleSummaryCardClick(event) {
  const deleteBtn = event.target.closest(".summary-delete-btn");
  if (deleteBtn) {
    const serviceId = deleteBtn.dataset.serviceId;
    const service = state.services.find((s) => s.id === serviceId);
    if (!service) return;
    const confirmed = window.confirm(`Eliminar estadistica de ${formatDate(service.date)}?`);
    if (!confirmed) return;
    service.statsSaved = false;
    saveState();
    renderSummary();
    return;
  }

  const editBtn = event.target.closest(".summary-edit-btn");
  if (editBtn) {
    const serviceId = editBtn.dataset.serviceId;
    const service = state.services.find((s) => s.id === serviceId);
    if (!service) return;
    const nextDate = window.prompt("Editar fecha de servicio (YYYY-MM-DD):", service.date);
    if (!nextDate) return;
    const nextLines = window.prompt("Editar lineas de servicio separadas por coma:", service.lines.join(", "));
    if (!nextLines) return;
    service.date = nextDate.trim();
    service.lines = nextLines.split(",").map((line) => line.trim()).filter(Boolean);
    saveState();
    renderSummary();
    return;
  }

  const printPdfBtn = event.target.closest(".summary-print-pdf-btn");
  if (printPdfBtn) {
    const service = state.services.find((s) => s.id === printPdfBtn.dataset.serviceId);
    if (!service) return;
    exportSingleSummaryPdf(service);
    return;
  }

  const openBtn = event.target.closest(".summary-open-btn");
  if (!openBtn) return;
  const targetId = openBtn.dataset.serviceId;
  expandedSummaryServiceId = expandedSummaryServiceId === targetId ? "" : targetId;
  renderSummary();
}

function getSummaryRangeRecords() {
  const from = summaryDateFrom.value;
  const to = summaryDateTo.value;
  return state.services
    .filter((s) => s.statsSaved)
    .filter((s) => (!from || s.date >= from) && (!to || s.date <= to));
}

function shareSummaryRangePdf() {
  const from = summaryDateFrom.value || "(sin inicio)";
  const to = summaryDateTo.value || "(sin fin)";
  const records = getSummaryRangeRecords();
  if (!records.length) {
    window.alert("No hay datos en el rango seleccionado.");
    return;
  }
  const logoBlock = getPdfLogoBlock();

  const rows = records
    .map((s) => {
      const st = getServiceStats(s);
      return `<tr>
        <td>${escapeHtml(formatDate(s.date))}</td>
        <td>${escapeHtml(s.lines.join(" / "))}</td>
        <td>${st.yesCount}</td>
        <td>${st.noCount}</td>
      </tr>`;
    })
    .join("");

  const printable = window.open("", "_blank", "width=1100,height=860");
  if (!printable) return;
  printable.document.write(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>Resumen por rango</title>
      <style>
        @page { size: A4 portrait; margin: 14mm; }
        body { font-family: "Segoe UI", Arial, sans-serif; color: #1e2d46; margin: 0; background: #f4f7fc; }
        .actions { display:flex; gap:10px; margin: 0 0 10px; }
        button { padding:10px 14px; border:0; border-radius:999px; background:#2f5ca8; color:#fff; font-weight:700; cursor:pointer; }
        .sheet { background:#fff; border:1px solid #d6e0f0; border-radius:14px; padding:18px; }
        .pdf-brand { display:flex; justify-content:flex-end; margin-bottom:8px; }
        .pdf-brand img { width:56px; height:56px; object-fit:contain; border:1px solid #d8e1f1; border-radius:10px; background:#fff; padding:4px; }
        h1 { margin:0 0 10px; font-size:24px; color:#1f3f75; }
        p { margin:0 0 8px; font-size:13px; }
        table { width:100%; border-collapse:collapse; margin-top:10px; font-size:12px; }
        th, td { border:1px solid #c5d2e8; padding:7px; text-align:left; }
        th { background:#e8effc; color:#24467f; }
      </style>
    </head>
    <body>
      <div class="actions">
        <button onclick="window.print()">Imprimir PDF</button>
        <button id="shareBtn" type="button">Compartir</button>
        <button type="button" onclick="window.close()">Regresar a la APP</button>
      </div>
      <div class="sheet">
        ${logoBlock}
        <h1>Resumen de Servicios</h1>
        <p><strong>Rango:</strong> ${escapeHtml(from)} a ${escapeHtml(to)}</p>
        <p><strong>Total servicios:</strong> ${records.length}</p>
        <table>
          <thead><tr><th>Fecha</th><th>Servicio</th><th>Asistieron</th><th>No asistieron</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <script>
        document.getElementById("shareBtn").addEventListener("click", async () => {
          if (!navigator.share) {
            alert("Compartir no disponible en este navegador.");
            return;
          }
          try {
            await navigator.share({
              title: "Resumen por rango",
              text: "Rango: ${escapeHtml(from)} a ${escapeHtml(to)}. Servicios: ${records.length}.",
            });
          } catch {}
        });
      </script>
    </body>
    </html>
  `);
  printable.document.close();
  printable.focus();
}

function shareSummaryRangeExcel() {
  const from = summaryDateFrom.value || "";
  const to = summaryDateTo.value || "";
  const records = getSummaryRangeRecords();
  if (!records.length) {
    window.alert("No hay datos en el rango seleccionado.");
    return;
  }

  const headers = ["Fecha", "Servicio", "Asistieron", "No asistieron"];
  const rows = records.map((s) => {
    const st = getServiceStats(s);
    return [formatDate(s.date), s.lines.join(" / "), st.yesCount, st.noCount];
  });
  const fromName = from ? formatDateForFile(from) : "sin inicio";
  const toName = to ? formatDateForFile(to) : "sin fin";
  const fileName = `${sanitizeFileName(`Resumen ${fromName} a ${toName}`)}.xls`;
  const meta = [
    ["Rango", `${fromName} a ${toName}`],
    ["Total de servicios", String(records.length)],
  ];
  exportStyledExcel({
    fileName,
    title: "Resumen de Servicios",
    meta,
    headers,
    rows,
  });
}

function renderAlfolis() {
  renderAlfolisGroup("male", maleAlfolisList, "Servidor");
  renderAlfolisGroup("female", femaleAlfolisList, "Servidora");
}

function renderAlfolisGroup(type, container, label) {
  const anexos = ["Anexo A", "Anexo B", "Anexo C", "Anexo M", "Anexo D", "Anexo E", "Anexo F"];
  const posiciones = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  container.innerHTML = "";
  state.alfolis[type].forEach((row, idx) => {
    const positionOptions = posiciones.map((p) => `<option value="${p}" ${String(row.position || "1") === p ? "selected" : ""}>${p}</option>`).join("");
    const anexoOptions = anexos.map((a) => `<option value="${a}" ${String(row.anexo || "Anexo A") === a ? "selected" : ""}>${a}</option>`).join("");
    const el = document.createElement("div");
    el.className = "alfolis-row";
    el.innerHTML = `
      <label>${label} nombre
        <input type="text" data-type="${type}" data-field="name" data-id="${row.id}" value="${escapeHtml(row.name)}" />
      </label>
      <label>Posicion
        <select data-type="${type}" data-field="position" data-id="${row.id}">${positionOptions}</select>
      </label>
      <label>Anexo
        <select data-type="${type}" data-field="anexo" data-id="${row.id}">${anexoOptions}</select>
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

  container.querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", (event) => {
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
      if (!state.alfolis[typeKey].length) state.alfolis[typeKey] = [{ id: createId(typeKey), name: "", position: "1", anexo: "Anexo A" }];
      saveState();
      renderAlfolis();
    });
  });
}

function addAlfoliLine(type) {
  state.alfolis[type].push({ id: createId(type), name: "", position: "1", anexo: "Anexo A" });
  saveState();
  renderAlfolis();
}

function exportAlfolisPdf() {
  const jpeg = createAlfolisTableJpegData();
  if (!jpeg) return;
  const win = window.open("", "_blank", "width=980,height=860");
  if (!win) return;
  win.document.write(`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Alfolis</title>
      <style>
        body{font-family:Arial,sans-serif;padding:16px;color:#1b2940}
        img{width:100%;max-width:920px;border:1px solid #d9e3f5;border-radius:12px;display:block}
        .actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
        a,button{display:inline-block;padding:10px 14px;background:#2e5fc1;color:#fff;text-decoration:none;border-radius:999px;border:0;cursor:pointer;font:inherit;font-weight:700}
      </style>
    </head>
    <body>
      <img src="${jpeg.dataUrl}" alt="Alfolis tabla" />
      <div class="actions">
        <a href="${jpeg.dataUrl}" download="${escapeHtml(jpeg.fileName)}">Descargar JPG</a>
        <button type="button" onclick="window.close()">Regresar a la APP</button>
      </div>
    </body>
  </html>`);
  win.document.close();
}

function createAlfolisTableJpegData() {
  const maleRows = state.alfolis.male.map((row) => [row.name || "-", row.position || "-", row.anexo || "-"]);
  const femaleRows = state.alfolis.female.map((row) => [row.name || "-", row.position || "-", row.anexo || "-"]);
  const rowHeight = 46;
  const sectionGap = 24;
  const headerHeight = 62;
  const tableHeaderHeight = 42;
  const sidePad = 44;
  const width = 1400;
  const colWidths = [760, 180, 320];
  const maleTableHeight = tableHeaderHeight + maleRows.length * rowHeight;
  const femaleTableHeight = tableHeaderHeight + femaleRows.length * rowHeight;
  const height = 100 + headerHeight + maleTableHeight + sectionGap + headerHeight + femaleTableHeight + 90;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = Math.max(height, 780);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#f4f7fc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#1f3f75";
  ctx.font = "700 56px Arial";
  ctx.fillText("ALFOLIS", sidePad, 72);

  let y = 110;
  y = drawAlfolisSectionTable(ctx, sidePad, y, width - sidePad * 2, "SERVIDORES", maleRows, colWidths, rowHeight, headerHeight, tableHeaderHeight);
  y += sectionGap;
  drawAlfolisSectionTable(ctx, sidePad, y, width - sidePad * 2, "SERVIDORAS", femaleRows, colWidths, rowHeight, headerHeight, tableHeaderHeight);

  return {
    dataUrl: canvas.toDataURL("image/jpeg", 0.92),
    fileName: `alfolis-tabla-${getTodayIso()}.jpg`,
  };
}

function drawAlfolisSectionTable(ctx, x, y, tableWidth, title, rows, colWidths, rowHeight, headerHeight, tableHeaderHeight) {
  ctx.fillStyle = "#e8effc";
  ctx.strokeStyle = "#c5d2e8";
  ctx.lineWidth = 1;
  ctx.fillRect(x, y, tableWidth, headerHeight);
  ctx.strokeRect(x, y, tableWidth, headerHeight);
  ctx.fillStyle = "#24467f";
  ctx.font = "700 30px Arial";
  ctx.fillText(title, x + 14, y + 40);

  let currentY = y + headerHeight;
  const headers = ["Nombre", "Posicion", "Anexo"];
  let colX = x;
  ctx.fillStyle = "#f0f5ff";
  ctx.fillRect(x, currentY, tableWidth, tableHeaderHeight);
  headers.forEach((label, i) => {
    ctx.strokeRect(colX, currentY, colWidths[i], tableHeaderHeight);
    ctx.fillStyle = "#24467f";
    ctx.font = "700 20px Arial";
    ctx.fillText(label, colX + 10, currentY + 28);
    colX += colWidths[i];
  });
  currentY += tableHeaderHeight;

  rows.forEach((row) => {
    let rowX = x;
    row.forEach((cell, i) => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(rowX, currentY, colWidths[i], rowHeight);
      ctx.strokeStyle = "#c5d2e8";
      ctx.strokeRect(rowX, currentY, colWidths[i], rowHeight);
      ctx.fillStyle = "#1f2b42";
      ctx.font = "700 20px Arial";
      const text = String(cell);
      ctx.fillText(text.length > 34 ? `${text.slice(0, 34)}...` : text, rowX + 10, currentY + 30);
      rowX += colWidths[i];
    });
    currentY += rowHeight;
  });

  return currentY;
}

function exportAlfolisExcel() {
  const headers = ["Grupo", "No.", "Nombre", "Posicion"];
  const rows = [];
  state.alfolis.male.forEach((row, i) => rows.push(["Servidores", i + 1, row.name || "-", row.position || "-"]));
  state.alfolis.female.forEach((row, i) => rows.push(["Servidoras", i + 1, row.name || "-", row.position || "-"]));
  const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const fileName = `${sanitizeFileName(`Alfolis - ${formatDateForFile(getTodayIso())}`)}.csv`;
  shareFileBlob(blob, fileName, "text/csv;charset=utf-8;");
}

function exportSingleSummaryPdf(service) {
  const stats = getServiceStats(service);
  const logoBlock = getPdfLogoBlock();
  const yesDeg = Math.round((stats.yesPct / 100) * 360);
  const yesRows = state.servers
    .filter((server) => service.attendance[server.id] === "Si")
    .map((server) => `<tr><td>${escapeHtml(server.name)}</td></tr>`)
    .join("");
  const noRows = state.servers
    .filter((server) => service.attendance[server.id] === "No")
    .map((server) => `<tr><td>${escapeHtml(server.name)}</td></tr>`)
    .join("");
  const printable = window.open("", "_blank", "width=1100,height=860");
  if (!printable) return;

  printable.document.write(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>${escapeHtml(buildServiceFileBase(service))}</title>
      <style>
        @page { size: A4 portrait; margin: 14mm; }
        body { font-family: "Segoe UI", Arial, sans-serif; color:#1f2b42; margin:0; background:#f4f7fc; }
        .actions { display:flex; gap:10px; margin:0 0 10px; }
        button { padding:10px 14px; border:0; border-radius:999px; background:#2f5ca8; color:#fff; font-weight:700; cursor:pointer; }
        .sheet { background:#fff; border:1px solid #d6e0f0; border-radius:14px; padding:18px; }
        .pdf-brand { display:flex; justify-content:flex-end; margin-bottom:8px; }
        .pdf-brand img { width:56px; height:56px; object-fit:contain; border:1px solid #d8e1f1; border-radius:10px; background:#fff; padding:4px; }
        h1 { margin:0 0 8px; color:#1f3f75; }
        p { margin:0 0 8px; font-size:13px; }
        .preview { display:flex; align-items:center; gap:12px; margin:8px 0 12px; }
        .pie { width:74px; height:74px; border-radius:50%; background: conic-gradient(#2cae7a 0deg, #2cae7a ${yesDeg}deg, #d97878 ${yesDeg}deg, #d97878 360deg); border:1px solid #c5d2e8; }
        table { width:100%; border-collapse:collapse; font-size:12px; }
        th, td { border:1px solid #c5d2e8; padding:7px; text-align:left; }
        th { background:#e8effc; color:#24467f; }
        .cols { display:grid; grid-template-columns: 1fr 1fr; gap:10px; }
      </style>
    </head>
    <body>
      <div class="actions">
        <button onclick="window.print()">Imprimir PDF</button>
        <button type="button" onclick="window.close()">Regresar a la APP</button>
      </div>
      <div class="sheet">
        ${logoBlock}
        <h1>Resumen de Servicio</h1>
        <p><strong>Fecha de servicio:</strong> ${escapeHtml(formatDate(service.date))}</p>
        <p><strong>Tipo de servicio:</strong> ${escapeHtml(service.lines.join(" / "))}</p>
        <div class="preview">
          <div class="pie"></div>
          <p><strong>Asistieron:</strong> ${stats.yesCount} | <strong>No asistieron:</strong> ${stats.noCount}</p>
        </div>
        <div class="cols">
          <table>
            <thead><tr><th>Asistieron</th></tr></thead>
            <tbody>${yesRows || "<tr><td>-</td></tr>"}</tbody>
          </table>
          <table>
            <thead><tr><th>No asistieron</th></tr></thead>
            <tbody>${noRows || "<tr><td>-</td></tr>"}</tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `);
  printable.document.close();
  printable.focus();
}

function exportSingleSummaryExcel(service) {
  const stats = getServiceStats(service);
  const headers = ["No.", "Servidor", "Asistencia"];
  const rows = state.servers.map((server, index) => {
    const status = service.attendance[server.id] || "Pendiente";
    return [String(index + 1), server.name, status];
  });
  const fileName = `${buildServiceFileBase(service)}.xls`;
  const meta = [
    ["Fecha de servicio", formatDate(service.date)],
    ["Tipo de servicio", service.lines.join(" / ")],
    ["Asistieron", String(stats.yesCount)],
    ["No asistieron", String(stats.noCount)],
  ];
  exportStyledExcel({
    fileName,
    title: "Resumen de Servicio",
    meta,
    headers,
    rows,
  });
}

function exportStyledExcel({ fileName, title, meta = [], headers = [], rows = [] }) {
  const metaRows = meta
    .map(([label, value]) => `<tr><td class="meta-label">${escapeHtml(label)}</td><td class="meta-value">${escapeHtml(value)}</td></tr>`)
    .join("");
  const headerCells = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("");
  const bodyRows = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
    .join("");

  const html = `<!doctype html>
  <html lang="es">
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: "Segoe UI", Arial, sans-serif; color:#1f2b42; }
      h1 { color:#1f3f75; margin:0 0 10px; }
      table { border-collapse: collapse; width: 100%; margin-bottom: 12px; }
      th, td { border:1px solid #c5d2e8; padding:7px; font-size:12px; }
      th { background:#e8effc; color:#24467f; font-weight:700; }
      .meta-label { background:#f1f5fd; font-weight:700; width: 220px; }
      .meta-value { background:#ffffff; }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(title)}</h1>
    <table>${metaRows}</table>
    <table>
      <thead><tr>${headerCells}</tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>
  </body>
  </html>`;

  const blob = new Blob([`\uFEFF${html}`], { type: "application/vnd.ms-excel;charset=utf-8;" });
  shareFileBlob(blob, fileName, "application/vnd.ms-excel");
}

function openJpegPreview(title, lines, includeShareHint = false) {
  const jpeg = createJpegData(title, lines);
  if (!jpeg) return;
  const hint = includeShareHint ? "<p>Formato JPG listo para compartir por WhatsApp.</p>" : "";
  const win = window.open("", "_blank", "width=980,height=860");
  if (!win) return;
  win.document.write(`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${escapeHtml(title)}</title>
      <style>
        body{font-family:Arial,sans-serif;padding:16px;color:#1b2940}
        img{width:100%;max-width:880px;border:1px solid #d9e3f5;border-radius:12px;display:block}
        .actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
        a,button{display:inline-block;padding:10px 14px;background:#2e5fc1;color:#fff;text-decoration:none;border-radius:999px;border:0;cursor:pointer;font:inherit;font-weight:700}
        p{color:#66758c}
      </style>
    </head>
    <body>
      <img src="${jpeg.dataUrl}" alt="${escapeHtml(title)}" />
      <div class="actions">
        <a href="${jpeg.dataUrl}" download="${escapeHtml(jpeg.fileName)}">Descargar JPG</a>
        <button id="shareJpgBtn" type="button">Compartir JPG</button>
        <button id="backToAppBtn" type="button">Regresar a la APP</button>
      </div>
      ${hint}
      <script>
        (function () {
          const btn = document.getElementById("shareJpgBtn");
          const backBtn = document.getElementById("backToAppBtn");
          const dataUrl = ${JSON.stringify(jpeg.dataUrl)};
          const fileName = ${JSON.stringify(jpeg.fileName)};
          backBtn.addEventListener("click", function () {
            window.close();
          });
          btn.addEventListener("click", async function () {
            if (!navigator.share || typeof navigator.canShare !== "function") {
              alert("Este navegador no permite compartir archivos directamente.");
              return;
            }
            try {
              const response = await fetch(dataUrl);
              const blob = await response.blob();
              const file = new File([blob], fileName, { type: "image/jpeg" });
              const shareData = { files: [file], title: fileName };
              if (!navigator.canShare(shareData)) {
                alert("Tu dispositivo no permite compartir este archivo.");
                return;
              }
              await navigator.share(shareData);
            } catch (error) {
              alert("No se pudo compartir el archivo JPG.");
            }
          });
        })();
      </script>
    </body>
  </html>`);
  win.document.close();
}

async function shareJpeg(title, lines) {
  const jpeg = createJpegData(title, lines);
  if (!jpeg) return;
  if (!navigator.share || typeof navigator.canShare !== "function") {
    return;
  }

  try {
    const file = dataUrlToFile(jpeg.dataUrl, jpeg.fileName);
    if (!file) return;
    const shareData = { files: [file], title, text: title };
    if (!navigator.canShare(shareData)) return;
    await navigator.share(shareData);
  } catch {
    // Si el usuario cancela o el dispositivo falla, se mantiene la vista de descarga.
  }
}

function createJpegData(title, lines) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

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

  return {
    dataUrl: canvas.toDataURL("image/jpeg", 0.9),
    fileName: `${slugify(title)}-${new Date().toISOString().slice(0, 10)}.jpg`,
  };
}

function dataUrlToFile(dataUrl, fileName) {
  const parts = dataUrl.split(",");
  if (parts.length !== 2) return null;
  const header = parts[0];
  const base64 = parts[1];
  const mimeMatch = header.match(/data:(.*);base64/);
  if (!mimeMatch) return null;
  const mime = mimeMatch[1];
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new File([bytes], fileName, { type: mime });
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

function formatDateForFile(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("es-GT", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function buildServiceFileBase(service) {
  const serviceName = service?.lines?.[0] || "servicio";
  const dateLong = formatDateForFile(service?.date || getTodayIso());
  return sanitizeFileName(`${serviceName} - ${dateLong}`);
}

function sanitizeFileName(value) {
  return String(value)
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fileToDataUrl(file) {
  return new Promise((resolve) => {
    if (!(file instanceof File) || !file.size) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function createAvatarDataUrl(name) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 180;
  canvas.height = 180;
  if (!ctx) return "";
  ctx.fillStyle = "#dfeaff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#2e5fc1";
  ctx.beginPath();
  ctx.arc(90, 90, 90, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 68px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const first = (String(name || "").trim()[0] || "?").toUpperCase();
  ctx.fillText(first, 90, 95);
  return canvas.toDataURL("image/png");
}
