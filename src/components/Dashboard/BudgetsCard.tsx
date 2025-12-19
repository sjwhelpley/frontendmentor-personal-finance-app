"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { formatCurrency } from "@/utils/utils";

import CardTemplate from "./CardTemplate";
import DonutChart from "./DonutChart";

export default function BudgetsCard() {
  const budgets = useAppSelector((state: RootState) => state.finance.budgets);

  const budgetData = budgets.map((budget) => {
    return {
      category: budget.category,
      spent: budget.spent,
      limit: budget.maximum,
      color: budget.theme,
    };
  });

  function BudgetSection({
    section,
  }: {
    section: {
      category: string;
      spent: number;
      maximum: number;
      theme: string;
    };
  }) {
    const { category, maximum, theme } = section;

    return (
      <div className="flex flex-row gap-[16px]">
        <div
          className={`w-[4px] h-fill rounded-[8px]`}
          style={{ backgroundColor: theme }}
        />
        <div>
          <p className="text-grey-500 text-preset-5">{category}</p>
          <p className="text-preset-4-bold">{formatCurrency(maximum)}</p>
        </div>
      </div>
    );
  }

  return (
    <CardTemplate
      titleLabel="Budgets"
      buttonLabel="See Details"
      buttonClickPath="/budgets"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-[24px] my-[24px]">
        <div className="flex flex-1 justify-center min-w-0 max-w-full">
          <DonutChart data={budgetData} size={200} strokeWidth={28} />
        </div>
        <div className="flex-shrink-0 grid grid-cols-2 sm:flex sm:flex-col gap-[16px]">
          {budgets.map((budget) => (
            <BudgetSection key={budget.category} section={budget} />
          ))}
        </div>
      </div>
    </CardTemplate>
  );
}
