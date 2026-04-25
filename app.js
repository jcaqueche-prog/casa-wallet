const STORAGE_KEY = "hogar-expenses-app";
const AUTH_STORAGE_KEY = "hogar-expenses-auth";
const AUTH_USER_STORAGE_KEY = "hogar-expenses-auth-user";
const PAYMENT_OPTIONS = ["Efectivo", "Tarjeta", "Transferencia"];
const AUTH_USERS = {
  JCAE: "jcae2026",
  CLFE: "clfe2026",
};

const defaultCategoryDefinitions = [
  { name: "Alimentacion", subcategories: ["Supermercado", "Restaurante", "Despensa"] },
  { name: "Servicios", subcategories: ["Agua", "Luz", "Internet"] },
  { name: "Limpieza", subcategories: ["Higiene", "Articulos de limpieza"] },
  { name: "Transporte", subcategories: ["Gasolina", "Parqueo", "Transporte publico"] },
  { name: "Salud", subcategories: ["Farmacia", "Consulta", "Emergencias"] },
  { name: "Educacion", subcategories: ["Colegiatura", "Utiles", "Cursos"] },
  { name: "Otros", subcategories: ["General"] },
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
const categoryForm = document.getElementById("categoryForm");
const subcategoryForm = document.getElementById("subcategoryForm");
const expenseList = document.getElementById("expenseList");
const emptyState = document.getElementById("emptyState");
const categorySummary = document.getElementById("categorySummary");
const categoryManagerList = document.getElementById("categoryManagerList");
const expenseItemTemplate = document.getElementById("expenseItemTemplate");
const summaryStartDate = document.getElementById("summaryStartDate");
const summaryEndDate = document.getElementById("summaryEndDate");
const summaryRangeLabel = document.getElementById("summaryRangeLabel");
const filterCategory = document.getElementById("filterCategory");
const filterSubcategory = document.getElementById("filterSubcategory");
const filterStartDate = document.getElementById("filterStartDate");
const filterEndDate = document.getElementById("filterEndDate");
const searchInput = document.getElementById("searchInput");
const statementFile = document.getElementById("statementFile");
const importAllButton = document.getElementById("importAllButton");
const importPreview = document.getElementById("importPreview");
const importPreviewShell = document.getElementById("importPreviewShell");
const importMessage = document.getElementById("importMessage");
const expenseCategorySelect = document.getElementById("expenseCategory");
const expenseSubcategorySelect = document.getElementById("expenseSubcategory");
const incomeCategorySelect = document.getElementById("incomeCategory");
const incomeSubcategorySelect = document.getElementById("incomeSubcategory");
const expenseAddCategoryButton = document.getElementById("expenseAddCategoryButton");
const expenseAddSubcategoryButton = document.getElementById("expenseAddSubcategoryButton");
const incomeAddCategoryButton = document.getElementById("incomeAddCategoryButton");
const incomeAddSubcategoryButton = document.getElementById("incomeAddSubcategoryButton");
const parentCategory = document.getElementById("parentCategory");
const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const views = Array.from(document.querySelectorAll(".view"));

const monthlyBudgetValue = document.getElementById("monthlyBudgetValue");
const availableBudgetValue = document.getElementById("availableBudgetValue");
const budgetAlerts = document.getElementById("budgetAlerts");
const totalSpent = document.getElementById("totalSpent");
const totalIncome = document.getElementById("totalIncome");
const expenseCount = document.getElementById("expenseCount");
const netBalance = document.getElementById("netBalance");
const averageExpense = document.getElementById("averageExpense");
const monthlyBudgetInput = document.getElementById("monthlyBudgetInput");
const expenseDateInput = document.getElementById("expenseDate");
const incomeDateInput = document.getElementById("incomeDate");
const authScreen = document.getElementById("authScreen");
const appShell = document.getElementById("appShell");
const loginForm = document.getElementById("loginForm");
const loginUsername = document.getElementById("loginUsername");
const loginError = document.getElementById("loginError");

expenseDateInput.value = new Date().toISOString().split("T")[0];
incomeDateInput.value = new Date().toISOString().split("T")[0];

expenseForm.addEventListener("submit", handleCreateEntry);
incomeForm.addEventListener("submit", handleCreateEntry);
budgetForm.addEventListener("submit", handleUpdateBudget);
categoryForm.addEventListener("submit", handleCreateCategory);
subcategoryForm.addEventListener("submit", handleCreateSubcategory);
expenseCategorySelect.addEventListener("change", () => {
  renderSubcategoryOptions(expenseCategorySelect.value, expenseSubcategorySelect);
});
incomeCategorySelect.addEventListener("change", () => {
  renderSubcategoryOptions(incomeCategorySelect.value, incomeSubcategorySelect);
});
expenseAddCategoryButton.addEventListener("click", () =>
  handleQuickCreateCategory(expenseCategorySelect, expenseSubcategorySelect)
);
incomeAddCategoryButton.addEventListener("click", () =>
  handleQuickCreateCategory(incomeCategorySelect, incomeSubcategorySelect)
);
expenseAddSubcategoryButton.addEventListener("click", () =>
  handleQuickCreateSubcategory(expenseCategorySelect, expenseSubcategorySelect)
);
incomeAddSubcategoryButton.addEventListener("click", () =>
  handleQuickCreateSubcategory(incomeCategorySelect, incomeSubcategorySelect)
);
filterCategory.addEventListener("change", () => {
  renderFilterSubcategories(filterCategory.value);
  renderApp();
});
filterSubcategory.addEventListener("change", renderApp);
summaryStartDate.addEventListener("change", renderApp);
summaryEndDate.addEventListener("change", renderApp);
filterStartDate.addEventListener("change", renderApp);
filterEndDate.addEventListener("change", renderApp);
searchInput.addEventListener("input", renderApp);
statementFile.addEventListener("change", handleImportFile);
importAllButton.addEventListener("click", handleSaveImportedExpenses);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.viewTarget));
});
loginForm.addEventListener("submit", handleLogin);

renderApp();
setActiveView("resumen");
initializeAuth();

function initializeAuth() {
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
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
      categoryDefinitions: normalizeCategoryDefinitions(parsed.categoryDefinitions),
    };
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function normalizeCategoryDefinitions(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return structuredClone(defaultCategoryDefinitions);
  }

  const cleaned = value
    .map((item) => ({
      name: String(item?.name || "").trim(),
      subcategories: Array.isArray(item?.subcategories)
        ? item.subcategories.map((sub) => String(sub).trim()).filter(Boolean)
        : [],
    }))
    .filter((item) => item.name);

  if (cleaned.length === 0) {
    return structuredClone(defaultCategoryDefinitions);
  }

  return cleaned.map((item) => ({
    ...item,
    subcategories: item.subcategories.length ? item.subcategories : ["General"],
  }));
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
  const category = String(formData.get("category") || "Otros");
  const subcategory = String(formData.get("subcategory") || "General");
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
    subcategory,
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

function handleCreateCategory(event) {
  event.preventDefault();
  const formData = new FormData(categoryForm);
  const name = String(formData.get("newCategoryName") || "").trim();
  if (!name || findCategoryDefinition(name)) {
    return;
  }

  state.categoryDefinitions.push({
    name,
    subcategories: ["General"],
  });

  saveState();
  categoryForm.reset();
  renderCategoryControls();
  renderApp();
}

function handleCreateSubcategory(event) {
  event.preventDefault();
  const formData = new FormData(subcategoryForm);
  const categoryName = String(formData.get("parentCategory") || "").trim();
  const subcategoryName = String(formData.get("newSubcategoryName") || "").trim();
  const categoryDefinition = findCategoryDefinition(categoryName);

  if (!categoryDefinition || !subcategoryName) {
    return;
  }

  if (!categoryDefinition.subcategories.includes(subcategoryName)) {
    categoryDefinition.subcategories.push(subcategoryName);
    saveState();
  }

  subcategoryForm.reset();
  renderCategoryControls();
  renderApp();
}

function handleQuickCreateCategory(categorySelect, subcategorySelect) {
  const name = window.prompt("Escribe el nombre de la nueva categoria:");
  const cleanName = String(name || "").trim();
  if (!cleanName || findCategoryDefinition(cleanName)) {
    return;
  }

  state.categoryDefinitions.push({
    name: cleanName,
    subcategories: ["General"],
  });

  saveState();
  renderCategoryControls();
  categorySelect.value = cleanName;
  renderSubcategoryOptions(cleanName, subcategorySelect, "General");
  renderApp();
}

function handleQuickCreateSubcategory(categorySelect, subcategorySelect) {
  const categoryName = categorySelect.value;
  const categoryDefinition = findCategoryDefinition(categoryName);
  if (!categoryDefinition) {
    return;
  }

  const name = window.prompt(`Escribe la nueva subcategoria para ${categoryName}:`);
  const cleanName = String(name || "").trim();
  if (!cleanName || categoryDefinition.subcategories.includes(cleanName)) {
    return;
  }

  categoryDefinition.subcategories.push(cleanName);
  saveState();
  renderCategoryControls();
  categorySelect.value = categoryName;
  renderSubcategoryOptions(categoryName, subcategorySelect, cleanName);
  renderApp();
}

function handleRenameCategory(previousName, nextName) {
  const cleanName = String(nextName || "").trim();
  if (!cleanName || (cleanName !== previousName && findCategoryDefinition(cleanName))) {
    return;
  }

  const categoryDefinition = findCategoryDefinition(previousName);
  if (!categoryDefinition) {
    return;
  }

  categoryDefinition.name = cleanName;
  state.expenses = state.expenses.map((expense) =>
    expense.category === previousName ? { ...expense, category: cleanName } : expense
  );
  importedExpenses = importedExpenses.map((expense) =>
    expense.category === previousName ? { ...expense, category: cleanName } : expense
  );
  saveState();
  renderApp();
}

function handleDeleteCategory(categoryName) {
  if (state.categoryDefinitions.length <= 1) {
    return;
  }

  const fallbackCategory = state.categoryDefinitions.find((category) => category.name !== categoryName);
  if (!fallbackCategory) {
    return;
  }

  state.categoryDefinitions = state.categoryDefinitions.filter((category) => category.name !== categoryName);
  state.expenses = state.expenses.map((expense) =>
    expense.category === categoryName
      ? { ...expense, category: fallbackCategory.name, subcategory: fallbackCategory.subcategories[0] || "General" }
      : expense
  );
  importedExpenses = importedExpenses.map((expense) =>
    expense.category === categoryName
      ? { ...expense, category: fallbackCategory.name, subcategory: fallbackCategory.subcategories[0] || "General" }
      : expense
  );
  saveState();
  renderApp();
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

function getFilteredExpenses() {
  const selectedCategory = filterCategory.value;
  const selectedSubcategory = filterSubcategory.value;
  const startDate = filterStartDate.value;
  const endDate = filterEndDate.value;
  const query = searchInput.value.trim().toLowerCase();

  return state.expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === "Todas" || expense.category === selectedCategory;
    const matchesSubcategory =
      selectedSubcategory === "Todas" || expense.subcategory === selectedSubcategory;
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
    return matchesCategory && matchesSubcategory && matchesStartDate && matchesEndDate && matchesQuery;
  });
}

function renderApp() {
  const filteredExpenses = getFilteredExpenses();
  const summaryExpenses = getSummaryExpenses();
  const totalExpenses = summaryExpenses
    .filter((expense) => expense.entryType !== "ingreso")
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
  const totalIncomes = summaryExpenses
    .filter((expense) => expense.entryType === "ingreso")
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
  const count = summaryExpenses.length;
  const volume = totalExpenses + totalIncomes;
  const average = count ? volume / count : 0;
  const balance = totalIncomes - totalExpenses;
  const overallIncomes = state.expenses
    .filter((expense) => expense.entryType === "ingreso")
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
  const overallExpenses = state.expenses
    .filter((expense) => expense.entryType !== "ingreso")
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
  const available = state.monthlyBudget + overallIncomes - overallExpenses;

  monthlyBudgetValue.textContent = formatCurrency(state.monthlyBudget);
  availableBudgetValue.textContent = formatCurrency(available);
  totalSpent.textContent = formatCurrency(totalExpenses);
  totalIncome.textContent = formatCurrency(totalIncomes);
  expenseCount.textContent = String(count);
  netBalance.textContent = formatCurrency(balance);
  averageExpense.textContent = formatCurrency(average);
  monthlyBudgetInput.value = state.monthlyBudget ? String(state.monthlyBudget) : "";

  renderCategoryControls();
  renderSummaryRangeLabel();
  renderBudgetAlerts(totalExpenses);
  renderExpenseList(filteredExpenses);
  renderCategorySummary(summaryExpenses);
  renderImportedExpenses();
  renderCategoryManager();
}

function getSummaryExpenses() {
  const startDate = summaryStartDate.value;
  const endDate = summaryEndDate.value;

  return state.expenses.filter((expense) => {
    const matchesStartDate = !startDate || expense.date >= startDate;
    const matchesEndDate = !endDate || expense.date <= endDate;
    return matchesStartDate && matchesEndDate;
  });
}

function renderSummaryRangeLabel() {
  const startDate = summaryStartDate.value;
  const endDate = summaryEndDate.value;

  if (!startDate && !endDate) {
    summaryRangeLabel.textContent = "Rango actual: todos los movimientos registrados.";
    return;
  }

  if (startDate && endDate) {
    summaryRangeLabel.textContent = `Rango actual: ${formatDate(startDate)} al ${formatDate(endDate)}.`;
    return;
  }

  if (startDate) {
    summaryRangeLabel.textContent = `Rango actual: desde ${formatDate(startDate)}.`;
    return;
  }

  summaryRangeLabel.textContent = `Rango actual: hasta ${formatDate(endDate)}.`;
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
  const previousParentCategory = parentCategory.value;

  expenseCategorySelect.innerHTML = buildCategoryOptions();
  incomeCategorySelect.innerHTML = buildCategoryOptions();
  filterCategory.innerHTML = `<option value="Todas">Todas</option>${buildCategoryOptions()}`;
  parentCategory.innerHTML = buildCategoryOptions();

  expenseCategorySelect.value = hasCategory(previousExpenseCategory)
    ? previousExpenseCategory
    : state.categoryDefinitions[0]?.name || "Otros";
  incomeCategorySelect.value = hasCategory(previousIncomeCategory)
    ? previousIncomeCategory
    : state.categoryDefinitions[0]?.name || "Otros";
  filterCategory.value =
    previousFilterCategory === "Todas" || hasCategory(previousFilterCategory)
      ? previousFilterCategory
      : "Todas";
  parentCategory.value = hasCategory(previousParentCategory)
    ? previousParentCategory
    : state.categoryDefinitions[0]?.name || "Otros";

  renderSubcategoryOptions(
    expenseCategorySelect.value,
    expenseSubcategorySelect,
    expenseSubcategorySelect.value
  );
  renderSubcategoryOptions(
    incomeCategorySelect.value,
    incomeSubcategorySelect,
    incomeSubcategorySelect.value
  );
  renderFilterSubcategories(filterCategory.value, filterSubcategory.value);
}

function renderSubcategoryOptions(categoryName, targetSelect, preferredValue = "") {
  const categoryDefinition = findCategoryDefinition(categoryName);
  const subcategories = categoryDefinition?.subcategories || ["General"];
  targetSelect.innerHTML = subcategories
    .map((sub) => `<option value="${escapeHtml(sub)}">${escapeHtml(sub)}</option>`)
    .join("");
  targetSelect.value = subcategories.includes(preferredValue) ? preferredValue : subcategories[0];
}

function renderFilterSubcategories(categoryName, preferredValue = "") {
  let subcategories = [];
  if (categoryName === "Todas") {
    subcategories = Array.from(
      new Set(state.categoryDefinitions.flatMap((category) => category.subcategories))
    ).sort();
  } else {
    subcategories = findCategoryDefinition(categoryName)?.subcategories || [];
  }

  filterSubcategory.innerHTML = `<option value="Todas">Todas</option>${subcategories
    .map((sub) => `<option value="${escapeHtml(sub)}">${escapeHtml(sub)}</option>`)
    .join("")}`;
  filterSubcategory.value =
    preferredValue === "Todas" || subcategories.includes(preferredValue)
      ? preferredValue
      : "Todas";
}

function renderExpenseList(expenses) {
  expenseList.innerHTML = "";
  emptyState.classList.toggle("hidden", expenses.length > 0);

  expenses.forEach((expense) => {
    const fragment = expenseItemTemplate.content.cloneNode(true);
    fragment
      .querySelector(".expense-item")
      .classList.add(expense.entryType === "ingreso" ? "expense-item--income" : "expense-item--expense");
    fragment.querySelector(".expense-title").textContent = expense.description;
    fragment.querySelector(".expense-amount").textContent = `${
      expense.entryType === "ingreso" ? "+" : "-"
    } ${formatCurrency(expense.amount)}`;
    fragment.querySelector(".expense-meta").textContent =
      `${formatDate(expense.date)} · ${capitalizeEntryType(expense.entryType)} · ${expense.category} · ${expense.subcategory} · ${expense.paymentMethod}`;
    fragment.querySelector(".expense-notes").textContent = expense.notes;
    fragment
      .querySelector(".expense-amount")
      .classList.toggle("expense-amount--income", expense.entryType === "ingreso");
    fragment
      .querySelector(".delete-button")
      .addEventListener("click", () => handleDeleteExpense(expense.id));

    expenseList.appendChild(fragment);
  });
}

function renderCategorySummary(expenses) {
  const totalsByCategory = expenses
    .filter((expense) => expense.entryType !== "ingreso")
    .reduce((accumulator, expense) => {
    accumulator[expense.category] = (accumulator[expense.category] || 0) + Number(expense.amount);
    return accumulator;
    }, {});

  const categoryEntries = Object.entries(totalsByCategory).sort((a, b) => b[1] - a[1]);

  if (categoryEntries.length === 0) {
    categorySummary.innerHTML =
      '<div class="category-card"><span>Sin datos</span><strong>No hay gastos en el rango seleccionado</strong></div>';
    return;
  }

  categorySummary.innerHTML = categoryEntries
    .map(
      ([category, total]) => `
        <article class="category-card">
          <span>${escapeHtml(category)}</span>
          <strong>${formatCurrency(total)}</strong>
        </article>
      `
    )
    .join("");
}

function renderCategoryManager() {
  categoryManagerList.innerHTML = "";

  state.categoryDefinitions.forEach((category) => {
    const card = document.createElement("article");
    card.className = "category-manager-card";

    const header = document.createElement("div");
    header.className = "category-manager-header";

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.value = category.name;

    const saveCategoryButton = document.createElement("button");
    saveCategoryButton.type = "button";
    saveCategoryButton.className = "mini-button";
    saveCategoryButton.textContent = "Guardar";
    saveCategoryButton.addEventListener("click", () =>
      handleRenameCategory(category.name, categoryInput.value)
    );

    const deleteCategoryButton = document.createElement("button");
    deleteCategoryButton.type = "button";
    deleteCategoryButton.className = "ghost-button";
    deleteCategoryButton.textContent = "Eliminar";
    deleteCategoryButton.disabled = state.categoryDefinitions.length <= 1;
    deleteCategoryButton.addEventListener("click", () => handleDeleteCategory(category.name));

    header.append(categoryInput, saveCategoryButton, deleteCategoryButton);

    const actions = document.createElement("div");
    actions.className = "category-actions";
    const actionsLabel = document.createElement("span");
    actionsLabel.textContent = "Subcategorias";
    actionsLabel.className = "manager-note";
    actions.append(actionsLabel);

    const subcategoryList = document.createElement("div");
    subcategoryList.className = "subcategory-chips";

    category.subcategories.forEach((subcategory) => {
      const row = document.createElement("div");
      row.className = "subcategory-row";

      const subcategoryInput = document.createElement("input");
      subcategoryInput.type = "text";
      subcategoryInput.value = subcategory;

      const saveSubcategoryButton = document.createElement("button");
      saveSubcategoryButton.type = "button";
      saveSubcategoryButton.className = "mini-button";
      saveSubcategoryButton.textContent = "Guardar";
      saveSubcategoryButton.addEventListener("click", () =>
        handleRenameSubcategory(category.name, subcategory, subcategoryInput.value)
      );

      const deleteSubcategoryButton = document.createElement("button");
      deleteSubcategoryButton.type = "button";
      deleteSubcategoryButton.className = "ghost-button";
      deleteSubcategoryButton.textContent = "Eliminar";
      deleteSubcategoryButton.disabled = category.subcategories.length <= 1;
      deleteSubcategoryButton.addEventListener("click", () =>
        handleDeleteSubcategory(category.name, subcategory)
      );

      row.append(subcategoryInput, saveSubcategoryButton, deleteSubcategoryButton);
      subcategoryList.appendChild(row);
    });

    card.append(header, actions, subcategoryList);
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
    subcategory: getDefaultSubcategory(category),
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

  if (/(super|market|despensa|walmart|paiz|maxi)/.test(text)) return "Alimentacion";
  if (/(agua|luz|energia|electric|internet|telefono|gas|servicio|tigo)/.test(text)) return "Servicios";
  if (/(farmacia|medic|hospital|clinica|salud)/.test(text)) return "Salud";
  if (/(uber|gasolina|combustible|bus|taxi|peaje|parqueo)/.test(text)) return "Transporte";
  if (/(colegio|escuela|universidad|curso|educa)/.test(text)) return "Educacion";
  if (/(limpieza|detergente|jabon|papel|dollarcity)/.test(text)) return "Limpieza";
  return "Otros";
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
    const subcategoryPicker = document.createElement("select");

    categoryPicker.innerHTML = buildCategoryOptions();
    categoryPicker.value = hasCategory(expense.category) ? expense.category : "Otros";
    renderSubcategoryOptions(categoryPicker.value, subcategoryPicker, expense.subcategory);

    categoryPicker.addEventListener("change", (event) => {
      expense.category = event.target.value;
      expense.subcategory = getDefaultSubcategory(expense.category);
      renderSubcategoryOptions(expense.category, subcategoryPicker, expense.subcategory);
    });

    subcategoryPicker.addEventListener("change", (event) => {
      expense.subcategory = event.target.value;
    });

    categoryField.append(categoryPicker, subcategoryPicker);
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
