const STORAGE_KEY = "hogar-expenses-app";
const AUTH_STORAGE_KEY = "hogar-expenses-auth";
const AUTH_USER_STORAGE_KEY = "hogar-expenses-auth-user";
const AUTH_VERSION_KEY = "hogar-expenses-auth-version";
const AUTH_VERSION = "2";
const PAYMENT_OPTIONS = ["Efectivo", "Tarjeta"];
const AUTH_USERS = {
  JCAE: "jcae2026",
  CLFE: "clfe2026",
};

const defaultCategoryDefinitions = [
  { name: "Oficina", subcategories: ["General"] },
  { name: "Casa", subcategories: ["General"] },
  { name: "Gastos Externos", subcategories: ["General"] },
];

const defaultState = {
  monthlyBudget: 0,
  expenses: [],
  categoryDefinitions: defaultCategoryDefinitions,
};

const state = loadState();
let importedExpenses = [];

const currencyFormatter = new Intl.NumberFormat("es-GT", {
  style: "currency",
  currency: "GTQ",
  minimumFractionDigits: 2,
});

const expenseForm = document.getElementById("expenseForm");
const incomeForm = document.getElementById("incomeForm");
const budgetForm = document.getElementById("budgetForm");
const expenseList = document.getElementById("expenseList");
const emptyState = document.getElementById("emptyState");
const historyTableHeader = document.getElementById("historyTableHeader");
const categorySummary = document.getElementById("categorySummary");
const categoryManagerList = document.getElementById("categoryManagerList");
const expenseItemTemplate = document.getElementById("expenseItemTemplate");
const summaryRangeLabel = document.getElementById("summaryRangeLabel");
const cardStartDate = document.getElementById("cardStartDate");
const cardEndDate = document.getElementById("cardEndDate");
const cashStartDate = document.getElementById("cashStartDate");
const cashEndDate = document.getElementById("cashEndDate");
const cardCategoryList = document.getElementById("cardCategoryList");
const cashCategoryList = document.getElementById("cashCategoryList");
const cardSummary = document.getElementById("cardSummary");
const cashSummary = document.getElementById("cashSummary");
const cardMethodTotal = document.getElementById("cardMethodTotal");
const cashMethodTotal = document.getElementById("cashMethodTotal");
const filterCategory = document.getElementById("filterCategory");
const filterStartDate = document.getElementById("filterStartDate");
const filterEndDate = document.getElementById("filterEndDate");
const searchInput = document.getElementById("searchInput");
const statementFile = document.getElementById("statementFile");
const importAllButton = document.getElementById("importAllButton");
const importPreview = document.getElementById("importPreview");
const importPreviewShell = document.getElementById("importPreviewShell");
const importMessage = document.getElementById("importMessage");
const expenseCategorySelect = document.getElementById("expenseCategory");
const incomeCategorySelect = document.getElementById("incomeCategory");
const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const views = Array.from(document.querySelectorAll(".view"));

const monthlyBudgetValue = document.getElementById("monthlyBudgetValue");
const availableBudgetValue = document.getElementById("availableBudgetValue");
const budgetAlerts = document.getElementById("budgetAlerts");
const totalSpent = document.getElementById("totalSpent");
const totalIncome = document.getElementById("totalIncome");
const expenseCount = document.getElementById("expenseCount");
const netBalance = document.getElementById("netBalance");
const monthlyBudgetInput = document.getElementById("monthlyBudgetInput");
const expenseDateInput = document.getElementById("expenseDate");
const incomeDateInput = document.getElementById("incomeDate");
const authScreen = document.getElementById("authScreen");
const appShell = document.getElementById("appShell");
const loginForm = document.getElementById("loginForm");
const loginUsername = document.getElementById("loginUsername");
const logoutButton = document.getElementById("logoutButton");
const loginError = document.getElementById("loginError");

expenseDateInput.value = new Date().toISOString().split("T")[0];
incomeDateInput.value = new Date().toISOString().split("T")[0];

expenseForm.addEventListener("submit", handleCreateEntry);
incomeForm.addEventListener("submit", handleCreateEntry);
budgetForm.addEventListener("submit", handleUpdateBudget);
filterCategory.addEventListener("change", renderApp);
cardStartDate.addEventListener("change", renderApp);
cardEndDate.addEventListener("change", renderApp);
cashStartDate.addEventListener("change", renderApp);
cashEndDate.addEventListener("change", renderApp);
cardCategoryList.addEventListener("change", handleMethodChecklistChange);
cashCategoryList.addEventListener("change", handleMethodChecklistChange);
filterStartDate.addEventListener("change", renderApp);
filterEndDate.addEventListener("change", renderApp);
searchInput.addEventListener("input", renderApp);
statementFile.addEventListener("change", handleImportFile);
importAllButton.addEventListener("click", handleSaveImportedExpenses);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.viewTarget));
});
loginForm.addEventListener("submit", handleLogin);
logoutButton.addEventListener("click", handleLogout);

renderApp();
setActiveView("resumen");
initializeAuth();

function initializeAuth() {
  const storedVersion = localStorage.getItem(AUTH_VERSION_KEY);
  if (storedVersion !== AUTH_VERSION) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    localStorage.setItem(AUTH_VERSION_KEY, AUTH_VERSION);
  }

  const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  const savedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY) || "";
  loginUsername.value = AUTH_USERS[savedUser] ? savedUser : "";
  authScreen.classList.toggle("hidden", isAuthenticated);
  appShell.classList.toggle("hidden", !isAuthenticated);
}

function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  const success = Boolean(username) && AUTH_USERS[username] === password;
  loginError.classList.toggle("hidden", success);

  if (!success) {
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, "true");
  localStorage.setItem(AUTH_USER_STORAGE_KEY, username);
  localStorage.setItem(AUTH_VERSION_KEY, AUTH_VERSION);
  initializeAuth();
}

function handleLogout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  initializeAuth();
}

function loadState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) {
      return structuredClone(defaultState);
    }

    const parsed = JSON.parse(savedState);
    return {
      monthlyBudget: Number(parsed.monthlyBudget) || 0,
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses.map(normalizeStoredExpense) : [],
      categoryDefinitions: normalizeCategoryDefinitions(parsed.categoryDefinitions),
    };
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function normalizeCategoryDefinitions(value) {
  return structuredClone(defaultCategoryDefinitions);
}

function normalizeStoredExpense(expense) {
  const safeCategory = hasCategory(expense?.category) ? expense.category : "Casa";
  const safeMethod = PAYMENT_OPTIONS.includes(expense?.paymentMethod)
    ? expense.paymentMethod
    : "Efectivo";

  return {
    ...expense,
    category: safeCategory,
    subcategory: "General",
    paymentMethod: safeMethod,
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function handleCreateEntry(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const description = String(formData.get("description") || "").trim();
  const amount = Number(formData.get("amount"));
  const date = String(formData.get("date") || "");
  const entryType = String(formData.get("entryType") || "gasto");
  const category = String(formData.get("category") || "Casa");
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
    entryType,
    category,
    subcategory: "General",
    paymentMethod,
    notes,
  });

  saveState();
  form.reset();
  const dateInput = form.querySelector('input[name="date"]');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }
  renderCategoryControls();
  renderApp();
}

function handleUpdateBudget(event) {
  event.preventDefault();
  const nextBudget = Number(monthlyBudgetInput.value);
  state.monthlyBudget = Number.isNaN(nextBudget) || nextBudget < 0 ? 0 : nextBudget;
  saveState();
  renderApp();
}

function handleRenameCategory(previousName, nextName) {
  return;
}

function handleDeleteCategory(categoryName) {
  return;
}

function handleRenameSubcategory(categoryName, previousName, nextName) {
  const cleanName = String(nextName || "").trim();
  if (!cleanName) {
    return;
  }

  const categoryDefinition = findCategoryDefinition(categoryName);
  if (!categoryDefinition || categoryDefinition.subcategories.includes(cleanName)) {
    if (cleanName !== previousName) {
      return;
    }
  }

  categoryDefinition.subcategories = categoryDefinition.subcategories.map((subcategory) =>
    subcategory === previousName ? cleanName : subcategory
  );
  state.expenses = state.expenses.map((expense) =>
    expense.category === categoryName && expense.subcategory === previousName
      ? { ...expense, subcategory: cleanName }
      : expense
  );
  importedExpenses = importedExpenses.map((expense) =>
    expense.category === categoryName && expense.subcategory === previousName
      ? { ...expense, subcategory: cleanName }
      : expense
  );
  saveState();
  renderApp();
}

function handleDeleteSubcategory(categoryName, subcategoryName) {
  const categoryDefinition = findCategoryDefinition(categoryName);
  if (!categoryDefinition || categoryDefinition.subcategories.length <= 1) {
    return;
  }

  const fallbackSubcategory = categoryDefinition.subcategories.find(
    (subcategory) => subcategory !== subcategoryName
  );
  categoryDefinition.subcategories = categoryDefinition.subcategories.filter(
    (subcategory) => subcategory !== subcategoryName
  );

  state.expenses = state.expenses.map((expense) =>
    expense.category === categoryName && expense.subcategory === subcategoryName
      ? { ...expense, subcategory: fallbackSubcategory || "General" }
      : expense
  );
  importedExpenses = importedExpenses.map((expense) =>
    expense.category === categoryName && expense.subcategory === subcategoryName
      ? { ...expense, subcategory: fallbackSubcategory || "General" }
      : expense
  );
  saveState();
  renderApp();
}

function handleDeleteExpense(id) {
  state.expenses = state.expenses.filter((expense) => expense.id !== id);
  saveState();
  renderApp();
}

function handleUpdateExpense(id, updates) {
  state.expenses = state.expenses.map((expense) =>
    expense.id === id
      ? {
          ...expense,
          ...updates,
          amount: Number(updates.amount ?? expense.amount),
        }
      : expense
  );
  saveState();
  renderApp();
}

function getFilteredExpenses() {
  const selectedCategory = filterCategory.value;
  const startDate = filterStartDate.value;
  const endDate = filterEndDate.value;
  const query = searchInput.value.trim().toLowerCase();

  return state.expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === "Todas" || expense.category === selectedCategory;
    const matchesStartDate = !startDate || expense.date >= startDate;
    const matchesEndDate = !endDate || expense.date <= endDate;

    const searchableText = [
      expense.description,
      expense.category,
      expense.subcategory,
      expense.paymentMethod,
      expense.notes,
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchableText.includes(query);
    return matchesCategory && matchesStartDate && matchesEndDate && matchesQuery;
  });
}

function renderApp() {
  const filteredExpenses = getFilteredExpenses();
  renderCategoryControls();
  const cardSummaryExpenses = getMethodSummaryExpenses("Tarjeta");
  const cashSummaryExpenses = getMethodSummaryExpenses("Efectivo");
  const combinedSummaryExpenses = [...cardSummaryExpenses, ...cashSummaryExpenses];
  const totalCardExpenses = cardSummaryExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const totalCashExpenses = cashSummaryExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const count = combinedSummaryExpenses.length;
  const combinedTotal = totalCardExpenses + totalCashExpenses;
  const overallIncomes = state.expenses
    .filter((expense) => expense.entryType === "ingreso")
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
  const overallExpenses = state.expenses
    .filter((expense) => expense.entryType !== "ingreso")
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
  const available = state.monthlyBudget + overallIncomes - overallExpenses;

  monthlyBudgetValue.textContent = formatCurrency(state.monthlyBudget);
  availableBudgetValue.textContent = formatCurrency(available);
  totalSpent.textContent = formatCurrency(totalCardExpenses);
  totalIncome.textContent = formatCurrency(totalCashExpenses);
  expenseCount.textContent = String(count);
  netBalance.textContent = formatCurrency(combinedTotal);
  monthlyBudgetInput.value = state.monthlyBudget ? String(state.monthlyBudget) : "";
  renderSummaryRangeLabel();
  renderBudgetAlerts(combinedTotal);
  renderExpenseList(filteredExpenses);
  renderMethodSummary(cardSummaryExpenses, cardSummary, cardMethodTotal, "Tarjeta");
  renderMethodSummary(cashSummaryExpenses, cashSummary, cashMethodTotal, "Efectivo");
  renderCombinedPaymentSummary(cardSummaryExpenses, cashSummaryExpenses);
  renderImportedExpenses();
  renderCategoryManager();
}

function getMethodSummaryExpenses(method) {
  const startDate = method === "Tarjeta" ? cardStartDate.value : cashStartDate.value;
  const endDate = method === "Tarjeta" ? cardEndDate.value : cashEndDate.value;
  const selectedCategories = getSelectedMethodCategories(method);

  return state.expenses.filter((expense) => {
    const matchesMethod = expense.entryType !== "ingreso" && expense.paymentMethod === method;
    const matchesStartDate = !startDate || expense.date >= startDate;
    const matchesEndDate = !endDate || expense.date <= endDate;
    const matchesCategory =
      selectedCategories === null || selectedCategories.includes(expense.category);
    return matchesMethod && matchesStartDate && matchesEndDate && matchesCategory;
  });
}

function renderSummaryRangeLabel() {
  const cardLabel = buildRangeText(cardStartDate.value, cardEndDate.value, "tarjeta");
  const cashLabel = buildRangeText(cashStartDate.value, cashEndDate.value, "efectivo");
  summaryRangeLabel.textContent = `${cardLabel} ${cashLabel}`;
}

function renderBudgetAlerts(totalExpenses) {
  const alerts = [];
  if (totalExpenses >= 24000) {
    alerts.push({
      level: "high",
      message: "Alerta critica: tus gastos acumulados ya llegaron a Q24,000 o mas.",
    });
  } else if (totalExpenses >= 20000) {
    alerts.push({
      level: "normal",
      message: "Alerta: tus gastos acumulados ya llegaron a Q20,000 o mas.",
    });
  }

  budgetAlerts.innerHTML = alerts
    .map(
      (alert) =>
        `<div class="budget-alert${alert.level === "high" ? " budget-alert--high" : ""}">${escapeHtml(
          alert.message
        )}</div>`
    )
    .join("");
}

function setActiveView(viewName) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.viewTarget === viewName);
  });

  views.forEach((view) => {
    view.classList.toggle("view--active", view.dataset.view === viewName);
  });
}

function renderCategoryControls() {
  const previousExpenseCategory = expenseCategorySelect.value;
  const previousIncomeCategory = incomeCategorySelect.value;
  const previousFilterCategory = filterCategory.value;

  expenseCategorySelect.innerHTML = buildCategoryOptions();
  incomeCategorySelect.innerHTML = buildCategoryOptions();
  filterCategory.innerHTML = `<option value="Todas">Todas</option>${buildCategoryOptions()}`;

  expenseCategorySelect.value = hasCategory(previousExpenseCategory)
    ? previousExpenseCategory
    : state.categoryDefinitions[0]?.name || "Casa";
  incomeCategorySelect.value = hasCategory(previousIncomeCategory)
    ? previousIncomeCategory
    : state.categoryDefinitions[0]?.name || "Casa";
  filterCategory.value =
    previousFilterCategory === "Todas" || hasCategory(previousFilterCategory)
      ? previousFilterCategory
      : "Todas";
  renderMethodCategoryChecklist(cardCategoryList);
  renderMethodCategoryChecklist(cashCategoryList);
}

function renderExpenseList(expenses) {
  expenseList.innerHTML = "";
  emptyState.classList.toggle("hidden", expenses.length > 0);
  historyTableHeader.classList.toggle("hidden", expenses.length === 0);

  expenses.forEach((expense) => {
    const fragment = expenseItemTemplate.content.cloneNode(true);
    const item = fragment.querySelector(".expense-item");
    const descriptionInput = fragment.querySelector(".expense-edit-description");
    const amountInput = fragment.querySelector(".expense-edit-amount");
    const dateInput = fragment.querySelector(".expense-edit-date");
    const categorySelect = fragment.querySelector(".expense-edit-category");
    const methodSelect = fragment.querySelector(".expense-edit-method");

    item.classList.add(
      expense.entryType === "ingreso" ? "expense-item--income" : "expense-item--expense"
    );

    descriptionInput.value = expense.description;
    amountInput.value = String(expense.amount);
    dateInput.value = expense.date;
    categorySelect.innerHTML = buildCategoryOptions();
    categorySelect.value = hasCategory(expense.category)
      ? expense.category
      : state.categoryDefinitions[0]?.name || "Casa";
    methodSelect.innerHTML = PAYMENT_OPTIONS.map(
      (option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`
    ).join("");
    methodSelect.value = PAYMENT_OPTIONS.includes(expense.paymentMethod)
      ? expense.paymentMethod
      : "Efectivo";

    fragment.querySelector(".expense-save-button").addEventListener("click", () => {
      const nextAmount = Number(amountInput.value);
      if (!descriptionInput.value.trim() || !dateInput.value || Number.isNaN(nextAmount) || nextAmount <= 0) {
        return;
      }

      const nextCategory = categorySelect.value;
      handleUpdateExpense(expense.id, {
        description: descriptionInput.value.trim(),
        amount: nextAmount,
        date: dateInput.value,
        category: nextCategory,
        subcategory: "General",
        paymentMethod: methodSelect.value,
      });
    });

    fragment.querySelector(".expense-delete-button").addEventListener("click", () => {
      handleDeleteExpense(expense.id);
    });

    expenseList.appendChild(fragment);
  });
}

function renderMethodCategoryChecklist(container) {
  const selectedValues = new Set(
    Array.from(container.querySelectorAll('input[type="checkbox"][data-category]:checked')).map(
      (input) => input.value
    )
  );

  const options = state.categoryDefinitions.map((category) => category.name);
  const allSelected = selectedValues.size === 0 || selectedValues.size === options.length;

  container.innerHTML = `
    <label class="category-checklist__item">
      <input type="checkbox" data-all="true" ${allSelected ? "checked" : ""} />
      <span>Todas</span>
    </label>
    ${options
      .map(
        (category) => `
          <label class="category-checklist__item">
            <input
              type="checkbox"
              data-category="true"
              value="${escapeHtml(category)}"
              ${allSelected || selectedValues.has(category) ? "checked" : ""}
            />
            <span>${escapeHtml(category)}</span>
          </label>
        `
      )
      .join("")}
  `;
}

function handleMethodChecklistChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const container = target.closest(".category-checklist");
  if (!container) {
    renderApp();
    return;
  }

  const allInput = container.querySelector('input[data-all="true"]');
  const categoryInputs = Array.from(container.querySelectorAll('input[data-category="true"]'));

  if (target.dataset.all === "true") {
    categoryInputs.forEach((input) => {
      input.checked = target.checked;
    });
  } else if (allInput instanceof HTMLInputElement) {
    const checkedCount = categoryInputs.filter((input) => input.checked).length;
    allInput.checked = checkedCount === categoryInputs.length;
  }

  renderApp();
}

function getSelectedMethodCategories(method) {
  const container = method === "Tarjeta" ? cardCategoryList : cashCategoryList;
  const allInput = container.querySelector('input[data-all="true"]');
  const categoryInputs = Array.from(container.querySelectorAll('input[data-category="true"]'));

  if (allInput instanceof HTMLInputElement && allInput.checked) {
    return null;
  }

  const selected = categoryInputs.filter((input) => input.checked).map((input) => input.value);
  return selected.length === categoryInputs.length ? null : selected;
}

function buildRangeText(startDate, endDate, label) {
  if (!startDate && !endDate) {
    return `Rango de ${label}: todos los movimientos.`;
  }

  if (startDate && endDate) {
    return `Rango de ${label}: ${formatDate(startDate)} al ${formatDate(endDate)}.`;
  }

  if (startDate) {
    return `Rango de ${label}: desde ${formatDate(startDate)}.`;
  }

  return `Rango de ${label}: hasta ${formatDate(endDate)}.`;
}

function renderMethodSummary(expenses, targetElement, totalElement, methodLabel) {
  const expenseOnly = expenses.filter((expense) => expense.entryType !== "ingreso");
  const methodTotal = expenseOnly.reduce((sum, expense) => sum + Number(expense.amount), 0);
  totalElement.textContent = formatCurrency(methodTotal);

  if (expenseOnly.length === 0) {
    targetElement.innerHTML =
      '<div class="category-card"><span>Sin datos</span><strong>No hay gastos en el rango seleccionado</strong></div>';
    return;
  }

  const grouped = expenseOnly.reduce((accumulator, expense) => {
    if (!accumulator[expense.category]) {
      accumulator[expense.category] = 0;
    }

    accumulator[expense.category] += Number(expense.amount);
    return accumulator;
  }, {});

  const categoryEntries = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  targetElement.innerHTML = `
    <article class="category-summary-total">
      <span>Total ${escapeHtml(methodLabel.toLowerCase())}</span>
      <strong>${formatCurrency(methodTotal)}</strong>
    </article>
    ${categoryEntries
      .map(([category, total]) => {
        return `
          <article class="category-group-card">
            <div class="category-group-card__header">
              <div>
                <span>Categoria</span>
                <h4>${escapeHtml(category)}</h4>
              </div>
              <strong>${formatCurrency(total)}</strong>
            </div>
          </article>
        `;
      })
      .join("")}
  `;
}

function renderCombinedPaymentSummary(cardExpenses, cashExpenses) {
  const totalCard = cardExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const totalCash = cashExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const combinedTotal = totalCard + totalCash;
  const combinedExpenses = [...cardExpenses, ...cashExpenses];
  const totalsByCategory = combinedExpenses.reduce((accumulator, expense) => {
    accumulator[expense.category] = (accumulator[expense.category] || 0) + Number(expense.amount);
    return accumulator;
  }, {});
  const categoryRows = Object.entries(totalsByCategory)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([category, total]) => `
        <div class="payment-total-card__row">
          <span>${escapeHtml(category)}</span>
          <strong>${formatCurrency(total)}</strong>
        </div>
      `
    )
    .join("");
  const splitCategoryRows = Object.entries(totalsByCategory)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([category, total]) => `
        <div class="payment-total-card__row">
          <span>${escapeHtml(category)}</span>
          <strong>${formatCurrency(total / 2)}</strong>
        </div>
      `
    )
    .join("");
  const splitTotal = combinedTotal / 2;

  categorySummary.innerHTML = `
    <article class="payment-total-card">
      <div class="payment-total-card__row">
        <span>Total tarjeta</span>
        <strong>${formatCurrency(totalCard)}</strong>
      </div>
      <div class="payment-total-card__row">
        <span>Total efectivo</span>
        <strong>${formatCurrency(totalCash)}</strong>
      </div>
      <div class="payment-total-card__row payment-total-card__row--grand">
        <span>Total general seleccionado</span>
        <strong>${formatCurrency(combinedTotal)}</strong>
      </div>
      ${categoryRows}
    </article>
    <article class="payment-total-card">
      <div class="payment-total-card__row payment-total-card__row--grand">
        <span>Tabla de pagos JC</span>
        <strong>${formatCurrency(splitTotal)}</strong>
      </div>
      ${splitCategoryRows}
    </article>
    <article class="payment-total-card">
      <div class="payment-total-card__row payment-total-card__row--grand">
        <span>Tabla de pagos</span>
        <strong>${formatCurrency(splitTotal)}</strong>
      </div>
      ${splitCategoryRows}
    </article>
  `;
}

function renderCategoryManager() {
  categoryManagerList.innerHTML = "";

  state.categoryDefinitions.forEach((category) => {
    const card = document.createElement("article");
    card.className = "category-manager-card";
    card.innerHTML = `
      <strong>${escapeHtml(category.name)}</strong>
      <div class="manager-note">Categoria fija activa para registro, historial, importacion y resumen.</div>
    `;
    categoryManagerList.appendChild(card);
  });
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
  const rawRows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: "" });
  const firstRow = rawRows[0] || [];
  const isHeaderlessBankFormat =
    firstRow.length >= 3 &&
    (firstRow[0] instanceof Date || typeof firstRow[0] === "number") &&
    typeof firstRow[1] === "string" &&
    (typeof firstRow[2] === "number" || typeof firstRow[2] === "string");

  if (isHeaderlessBankFormat) {
    return rawRows.map((row) => mapHeaderlessRow(row)).filter(Boolean);
  }

  return XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
}

function mapBankRow(row, index) {
  if (Array.isArray(row)) {
    row = mapHeaderlessRow(row);
  }

  if (!row) {
    return null;
  }

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

  const category = suggestCategory(String(description));
  return {
    id: `import-${index}-${crypto.randomUUID()}`,
    description: String(description).trim(),
    amount: Math.abs(amount),
    date: parsedDate,
    entryType: "gasto",
    category,
    subcategory: "General",
    paymentMethod: "Tarjeta",
    notes: "Importado desde estado de cuenta",
  };
}

function mapHeaderlessRow(row) {
  if (!Array.isArray(row) || row.length < 3) {
    return null;
  }

  const [date, description, amount, extra] = row;
  if (!date && !description && !amount) {
    return null;
  }

  return {
    fecha: date,
    descripcion: description,
    monto: amount,
    nota: extra,
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

  for (const [key, value] of Object.entries(source)) {
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
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(
      value.getDate()
    ).padStart(2, "0")}`;
  }

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

  if (/(office|papeleria|copias|toner|impresion|computadora|software)/.test(text)) return "Oficina";
  if (/(super|market|despensa|walmart|paiz|maxi|agua|luz|energia|electric|internet|telefono|gas|servicio|tigo|limpieza|detergente|jabon|papel)/.test(text)) return "Casa";
  return "Gastos Externos";
}

function renderImportedExpenses() {
  importPreview.innerHTML = "";
  importPreviewShell.classList.toggle("hidden", importedExpenses.length === 0);
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
      (option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`
    ).join("");
    paymentSelect.value = expense.paymentMethod;
    paymentSelect.addEventListener("change", (event) => {
      expense.paymentMethod = event.target.value;
    });

    const categoryField = document.createElement("div");
    const categoryPicker = document.createElement("select");

    categoryPicker.innerHTML = buildCategoryOptions();
    categoryPicker.value = hasCategory(expense.category) ? expense.category : "Casa";

    categoryPicker.addEventListener("change", (event) => {
      expense.category = event.target.value;
      expense.subcategory = "General";
    });

    categoryField.append(categoryPicker);
    categoryField.style.display = "grid";
    categoryField.style.gap = "10px";

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "primary-button import-item__save";
    saveButton.textContent = "Guardar";
    saveButton.addEventListener("click", () => saveSingleImportedExpense(expense.id));

    item.append(descriptionBlock, amountBlock, paymentSelect, categoryField, saveButton);
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

function findCategoryDefinition(categoryName) {
  return state.categoryDefinitions.find((category) => category.name === categoryName) || null;
}

function hasCategory(categoryName) {
  return Boolean(findCategoryDefinition(categoryName));
}

function getDefaultSubcategory(categoryName) {
  return findCategoryDefinition(categoryName)?.subcategories?.[0] || "General";
}

function buildCategoryOptions() {
  return state.categoryDefinitions
    .map((category) => `<option value="${escapeHtml(category.name)}">${escapeHtml(category.name)}</option>`)
    .join("");
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

function capitalizeEntryType(value) {
  return value === "ingreso" ? "Ingreso" : "Gasto";
}
