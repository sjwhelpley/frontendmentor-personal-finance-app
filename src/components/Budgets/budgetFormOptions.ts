import type { SelectOption } from "@/design-system/Select";
import type { Budget } from "@/types/finance";

/** Categories available when creating or editing a budget (Frontend Mentor set + data). */
export const BUDGET_CATEGORY_CHOICES = [
  "Bills",
  "Dining Out",
  "Education",
  "Entertainment",
  "General",
  "Groceries",
  "Lifestyle",
  "Personal Care",
  "Shopping",
  "Transportation",
] as const;

/**
 * Theme presets (full design-system list). `value` is stored on `Budget.theme` (hex).
 * Hex values align with `src/app/globals.css` tokens where applicable.
 */
export const BUDGET_THEME_PRESETS: { value: string; label: string }[] = [
  { value: "#277C78", label: "Green" },
  { value: "#F2CDAC", label: "Yellow" },
  { value: "#82C9D7", label: "Cyan" },
  { value: "#626070", label: "Navy" },
  { value: "#C94736", label: "Red" },
  { value: "#826CB0", label: "Purple" },
  { value: "#597C7C", label: "Turquoise" },
  { value: "#93674F", label: "Brown" },
  { value: "#934F6F", label: "Magenta" },
  { value: "#3F82B2", label: "Blue" },
  { value: "#97A0AC", label: "Navy Grey" },
  { value: "#7F9161", label: "Army Green" },
  { value: "#AF81BA", label: "Pink" },
  { value: "#CAB361", label: "Gold" },
  { value: "#BE6C49", label: "Orange" },
];

export type BudgetFormEditContext = {
  /** When editing, this category stays selectable even if a budget exists for it. */
  editingCategory?: string;
  /** When editing, this theme stays selectable even if another budget uses it. */
  editingTheme?: string;
};

export function buildBudgetCategoryOptions(
  budgets: Budget[],
  ctx?: BudgetFormEditContext,
): SelectOption[] {
  const taken = new Set(
    budgets.map((b) => b.category).filter((c) => c !== ctx?.editingCategory),
  );
  return BUDGET_CATEGORY_CHOICES.map((cat) => ({
    value: cat,
    label: cat,
    disabled: taken.has(cat),
  }));
}

export function buildBudgetThemeOptions(
  budgets: Budget[],
  ctx?: BudgetFormEditContext,
): SelectOption[] {
  const taken = new Set(
    budgets.filter((b) => b.theme !== ctx?.editingTheme).map((b) => b.theme),
  );
  return BUDGET_THEME_PRESETS.map(({ value, label }) => ({
    value,
    label,
    color: value,
    disabled: taken.has(value),
    disabledLabel: "Already used",
  }));
}
