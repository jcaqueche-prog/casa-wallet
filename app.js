const STORAGE_KEY = "hogar-expenses-app";

const defaultState = {
  monthlyBudget: 0,
  expenses: [],
};

const state = loadState();

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
