const STORAGE_KEY = "hogar-expenses-app";
const CATEGORY_OPTIONS = [
  "Alimentacion",
  "Servicios",
  "Limpieza",
  "Transporte",
  "Salud",
  "Educacion",
  "Otros",
];
const PAYMENT_OPTIONS = ["Efectivo", "Tarjeta", "Transferencia"];

const defaultState = {
  monthlyBudget: 0,
  expenses: [],
};

const state = loadState();
let importedExpenses = [];

const currencyFormatter = new Intl.NumberFormat("es-GT", {
  style: "currency",
  currency: "GTQ",
  minimumFractionDigits: 2,
});

const expenseForm = document.getElementById("expenseForm");
const budgetForm = document.getElementById("budgetForm");
const expenseList = document.getElementById("expenseList");
const emptyState = document.getElementById("emptyState");
const categorySummary = document.getElementById("categorySummary");
const expenseItemTemplate = document.getElementById("expenseItemTemplate");
const filterCategory = document.getElementById("filterCategory");
const searchInput = document.getElementById("searchInput");
const statementFile = document.getElementById("statementFile");
const importAllButton = document.getElementById("importAllButton");
const importPreview = document.getElementById("importPreview");
const importMessage = document.getElementById("importMessage");

const monthlyBudgetValue = document.getElementById("monthlyBudgetValue");
const availableBudgetValue = document.getElementById("availableBudgetValue");
const totalSpent = document.getElementById("totalSpent");
const expenseCount = document.getElementById("expenseCount");
const averageExpense = document.getElementById("averageExpense");
const monthlyBudgetInput = document.getElementById("monthlyBudgetInput");

document.getElementById("date").value = new Date().toISOString().split("T")[0];

expenseForm.addEventListener("submit", handleCreateExpense);
budgetForm.addEventListener("submit", handleUpdateBudget);
filterCategory.addEventListener("change", renderApp);
searchInput.addEventListener("input", renderApp);
statementFile.addEventListener("change", handleImportFile);
importAllButton.addEventListener("click", handleSaveImportedExpenses);

renderApp();

function loadState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) {
      return structuredClone(defaultState);
    }

    const parsed = JSON.parse(savedState);
    return {
      monthlyBudget: Number(parsed.monthlyBudget) || 0,
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
    };
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function handleCreateExpense(event) {
  event.preventDefault();

  const formData = new FormData(expenseForm);
  const description = String(formData.get("description") || "").trim();
  const amount = Number(formData.get("amount"));
  const date = String(formData.get("date") || "");
  const category = String(formData.get("category") || "Otros");
  const paymentMethod = String(formData.get("paymentMethod") || "Efectivo");
  const notes = String(formData.get("notes") || "").trim();

  if (!description || !date || Number.isNaN(amount) || amount <= 0) {
    return;
  }

  state.expenses.unshift({
    id: crypto.randomUUID(),
    description,
    amount,
    date,
    category,
    paymentMethod,
    notes,
  });

  saveState();
  expenseForm.reset();
  document.getElementById("date").value = new Date().toISOString().split("T")[0];
  renderApp();
}

function handleUpdateBudget(event) {
  event.preventDefault();
  const nextBudget = Number(monthlyBudgetInput.value);

  state.monthlyBudget = Number.isNaN(nextBudget) || nextBudget < 0 ? 0 : nextBudget;
  saveState();
  renderApp();
}

function handleDeleteExpense(id) {
  state.expenses = state.expenses.filter((expense) => expense.id !== id);
  saveState();
  renderApp();
}

function getFilteredExpenses() {
  const selectedCategory = filterCategory.value;
  const query = searchInput.value.trim().toLowerCase();

  return state.expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === "Todas" || expense.category === selectedCategory;

    const searchableText = [
      expense.description,
      expense.category,
      expense.paymentMethod,
      expense.notes,
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchableText.includes(query);
    return matchesCategory && matchesQuery;
  });
}

function renderApp() {
  const filteredExpenses = getFilteredExpenses();
  const total = state.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const count = state.expenses.length;
  const average = count ? total / count : 0;
  const available = state.monthlyBudget - total;

  monthlyBudgetValue.textContent = formatCurrency(state.monthlyBudget);
  availableBudgetValue.textContent = formatCurrency(available);
  totalSpent.textContent = formatCurrency(total);
  expenseCount.textContent = String(count);
  averageExpense.textContent = formatCurrency(average);
  monthlyBudgetInput.value = state.monthlyBudget ? String(state.monthlyBudget) : "";

  renderExpenseList(filteredExpenses);
  renderCategorySummary();
  renderImportedExpenses();
}

function renderExpenseList(expenses) {
  expenseList.innerHTML = "";
  emptyState.classList.toggle("hidden", expenses.length > 0);

  expenses.forEach((expense) => {
    const fragment = expenseItemTemplate.content.cloneNode(true);
    fragment.querySelector(".expense-title").textContent = expense.description;
    fragment.querySelector(".expense-amount").textContent = formatCurrency(expense.amount);
    fragment.querySelector(".expense-meta").textContent =
      `${formatDate(expense.date)} · ${expense.category} · ${expense.paymentMethod}`;
    fragment.querySelector(".expense-notes").textContent = expense.notes;
    fragment
      .querySelector(".delete-button")
      .addEventListener("click", () => handleDeleteExpense(expense.id));

    expenseList.appendChild(fragment);
  });
}

function renderCategorySummary() {
  const totalsByCategory = state.expenses.reduce((accumulator, expense) => {
    accumulator[expense.category] = (accumulator[expense.category] || 0) + Number(expense.amount);
    return accumulator;
  }, {});

  const categoryEntries = Object.entries(totalsByCategory).sort((a, b) => b[1] - a[1]);

  if (categoryEntries.length === 0) {
    categorySummary.innerHTML =
      '<div class="category-card"><span>Sin datos</span><strong>Agrega tu primer gasto</strong></div>';
    return;
  }

  categorySummary.innerHTML = categoryEntries
    .map(
      ([category, total]) => `
        <article class="category-card">
          <span>${category}</span>
          <strong>${formatCurrency(total)}</strong>
        </article>
      `
    )
    .join("");
}

async function handleImportFile(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  hideImportMessage();

  try {
    const rows = await readStatementRows(file);
    importedExpenses = rows.map((row, index) => mapBankRow(row, index)).filter(Boolean);

    if (!importedExpenses.length) {
      showImportMessage(
        "No encontre filas con fecha, descripcion y monto. Prueba con otro archivo o revisa los encabezados."
      );
    } else {
      showImportMessage(
        `Se detectaron ${importedExpenses.length} movimientos. Ajusta categorias y guarda.`
      );
    }
  } catch (error) {
    importedExpenses = [];
    showImportMessage(
      "No pude leer ese archivo. Prueba con Excel o CSV exportado directamente desde tu banco."
    );
  }

  renderApp();
}

async function readStatementRows(file) {
  if (file.name.toLowerCase().endsWith(".csv")) {
    const text = await file.text();
    const workbook = XLSX.read(text, { type: "string" });
    return readFirstSheet(workbook);
  }

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  return readFirstSheet(workbook);
}

function readFirstSheet(workbook) {
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
}

function mapBankRow(row, index) {
  const normalizedEntries = Object.entries(row).reduce((accumulator, [key, value]) => {
    accumulator[normalizeHeader(key)] = value;
    return accumulator;
  }, {});

  const description =
    pickValue(normalizedEntries, [
      "descripcion",
      "detalle",
      "concepto",
      "glosa",
      "referencia",
      "comercio",
      "nombre",
      "movimiento",
    ]) || "";

  const dateValue = pickValue(normalizedEntries, [
    "fecha",
    "fechacontable",
    "fechamovimiento",
    "posteddate",
    "transactiondate",
  ]);

  const directAmount = pickValue(normalizedEntries, [
    "monto",
    "valor",
    "importe",
    "cargo",
    "debito",
  ]);
  const creditAmount = pickValue(normalizedEntries, ["credito", "abono"]);
  const amount = parseAmount(directAmount ?? creditAmount);
  const parsedDate = parseImportedDate(dateValue);

  if (!description || !amount || !parsedDate) {
    return null;
  }

  return {
    id: `import-${index}-${crypto.randomUUID()}`,
    description: String(description).trim(),
    amount: Math.abs(amount),
    date: parsedDate,
    category: suggestCategory(String(description)),
    paymentMethod: "Tarjeta",
    notes: "Importado desde estado de cuenta",
  };
}

function normalizeHeader(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

function pickValue(source, candidates) {
  const exactMatch = candidates.find((candidate) => source[candidate] !== undefined && source[candidate] !== "");
  if (exactMatch) {
    return source[exactMatch];
  }

  const entries = Object.entries(source);
  for (const [key, value] of entries) {
    if (value === "") {
      continue;
    }

    if (candidates.some((candidate) => key.includes(candidate))) {
      return value;
    }
  }

  return null;
}

function parseAmount(value) {
  if (typeof value === "number") {
    return value;
  }

  const cleaned = String(value || "")
    .replace(/[Q$,]/g, "")
    .replace(/\s+/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(",", ".");

  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function parseImportedDate(value) {
  if (typeof value === "number") {
    const dateCode = XLSX.SSF.parse_date_code(value);
    if (!dateCode) {
      return null;
    }

    return `${dateCode.y}-${String(dateCode.m).padStart(2, "0")}-${String(dateCode.d).padStart(
      2,
      "0"
    )}`;
  }

  const raw = String(value || "").trim();
  if (!raw) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }

  const slashMatch = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (slashMatch) {
    const [, day, month, year] = slashMatch;
    const normalizedYear = year.length === 2 ? `20${year}` : year;
    return `${normalizedYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(
    parsed.getDate()
  ).padStart(2, "0")}`;
}

function suggestCategory(description) {
  const text = description.toLowerCase();

  if (/(super|market|despensa|walmart|paiz|maxi)/.test(text)) {
    return "Alimentacion";
  }
  if (/(agua|luz|energia|electric|internet|telefono|gas|servicio)/.test(text)) {
    return "Servicios";
  }
  if (/(farmacia|medic|hospital|clinica|salud)/.test(text)) {
    return "Salud";
  }
  if (/(uber|gasolina|combustible|bus|taxi|peaje)/.test(text)) {
    return "Transporte";
  }
  if (/(colegio|escuela|universidad|curso|educa)/.test(text)) {
    return "Educacion";
  }
  if (/(limpieza|detergente|jabon|papel)/.test(text)) {
    return "Limpieza";
  }

  return "Otros";
}

function renderImportedExpenses() {
  importPreview.innerHTML = "";
  importPreview.classList.toggle("hidden", importedExpenses.length === 0);
  importAllButton.disabled = importedExpenses.length === 0;

  importedExpenses.forEach((expense) => {
    const item = document.createElement("article");
    item.className = "import-item";

    const descriptionBlock = document.createElement("div");
    descriptionBlock.className = "import-item__desc";
    descriptionBlock.innerHTML = `
      <strong>${escapeHtml(expense.description)}</strong>
      <div class="import-item__meta">${formatDate(expense.date)} · ${escapeHtml(
        expense.notes
      )}</div>
    `;

    const amountBlock = document.createElement("div");
    amountBlock.className = "import-item__amount";
    amountBlock.textContent = formatCurrency(expense.amount);

    const paymentSelect = document.createElement("select");
    paymentSelect.innerHTML = PAYMENT_OPTIONS.map(
      (option) => `<option value="${option}">${option}</option>`
    ).join("");
    paymentSelect.value = expense.paymentMethod;
    paymentSelect.addEventListener("change", (event) => {
      expense.paymentMethod = event.target.value;
    });

    const categorySelect = document.createElement("select");
    categorySelect.innerHTML = CATEGORY_OPTIONS.map(
      (option) => `<option value="${option}">${option}</option>`
    ).join("");
    categorySelect.value = expense.category;
    categorySelect.addEventListener("change", (event) => {
      expense.category = event.target.value;
    });

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "primary-button import-item__save";
    saveButton.textContent = "Guardar";
    saveButton.addEventListener("click", () => saveSingleImportedExpense(expense.id));

    item.append(descriptionBlock, amountBlock, paymentSelect, categorySelect, saveButton);
    importPreview.appendChild(item);
  });
}

function saveSingleImportedExpense(id) {
  const expense = importedExpenses.find((item) => item.id === id);
  if (!expense) {
    return;
  }

  state.expenses.unshift({
    ...expense,
    id: crypto.randomUUID(),
  });

  importedExpenses = importedExpenses.filter((item) => item.id !== id);
  saveState();
  renderApp();
}

function handleSaveImportedExpenses() {
  if (!importedExpenses.length) {
    return;
  }

  const nextExpenses = importedExpenses.map((expense) => ({
    ...expense,
    id: crypto.randomUUID(),
  }));

  state.expenses = [...nextExpenses.reverse(), ...state.expenses];
  importedExpenses = [];
  saveState();
  renderApp();
  showImportMessage("Los movimientos importados ya fueron agregados al historial.");
}

function showImportMessage(message) {
  importMessage.textContent = message;
  importMessage.classList.remove("hidden");
}

function hideImportMessage() {
  importMessage.textContent = "";
  importMessage.classList.add("hidden");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-GT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}
