"use client";

import { useEffect, useMemo, useState } from "react";

import BudgetFormFields from "@/components/Budgets/BudgetFormFields";
import {
  BUDGET_THEME_PRESETS,
  buildBudgetCategoryOptions,
  buildBudgetThemeOptions,
} from "@/components/Budgets/budgetFormOptions";
import { Button, Modal } from "@/design-system";
import { addBudget } from "@/store/financeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

function parseMaximumSpend(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "").trim();
  if (cleaned === "") return null;
  const n = Number.parseFloat(cleaned);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export default function AddNewBudget() {
  const dispatch = useAppDispatch();
  const budgets = useAppSelector((state: RootState) => state.finance.budgets);

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [maximumSpend, setMaximumSpend] = useState("");
  const [theme, setTheme] = useState(BUDGET_THEME_PRESETS[0].value);

  const categoryOptions = useMemo(
    () => buildBudgetCategoryOptions(budgets),
    [budgets],
  );
  const themeOptions = useMemo(
    () => buildBudgetThemeOptions(budgets),
    [budgets],
  );

  useEffect(() => {
    if (!isOpen) return;
    const firstCat =
      categoryOptions.find((o) => !o.disabled)?.value ??
      categoryOptions[0]?.value ??
      "";
    const firstTheme =
      themeOptions.find((o) => !o.disabled)?.value ??
      BUDGET_THEME_PRESETS[0].value;
    setCategory(firstCat);
    setMaximumSpend("");
    setTheme(firstTheme);
  }, [isOpen, categoryOptions, themeOptions]);

  const maximum = parseMaximumSpend(maximumSpend);
  const canSubmit =
    category !== "" &&
    maximum != null &&
    themeOptions.some((o) => o.value === theme && !o.disabled);

  const handleSubmit = () => {
    if (!canSubmit || maximum == null) return;
    dispatch(
      addBudget({
        category,
        maximum,
        theme,
      }),
    );
    setIsOpen(false);
  };

  return (
    <>
      <Button
        label="Add New Budget"
        onClick={() => setIsOpen(true)}
        variant="primary"
      />
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Budget"
        description="Choose a category to set a spending budget. These categories can help you monitor spending."
        footer="primary"
        primaryLabel="Add Budget"
        onPrimaryAction={handleSubmit}
        primaryDisabled={!canSubmit}
      >
        <BudgetFormFields
          category={category}
          onCategoryChange={setCategory}
          maximumSpend={maximumSpend}
          onMaximumSpendChange={setMaximumSpend}
          theme={theme}
          onThemeChange={setTheme}
          categoryOptions={categoryOptions}
          themeOptions={themeOptions}
          inputMode="decimal"
        />
      </Modal>
    </>
  );
}
