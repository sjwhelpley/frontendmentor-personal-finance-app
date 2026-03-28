"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { formatCurrency } from "@/utils/utils";

import DonutChart from "../Dashboard/DonutChart";

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
  const { category, maximum, spent, theme } = section;

  return (
    <div className="flex w-full min-w-0 flex-row items-stretch justify-between gap-[16px]">
      <div className="flex min-w-0 flex-1 flex-row items-stretch gap-[16px]">
        <div
          className="w-[4px] shrink-0 self-stretch rounded-[8px]"
          style={{ backgroundColor: theme }}
        />
        <p className="text-grey-500 text-preset-5">{category}</p>
      </div>
      <p className="shrink-0 flex align-center gap-[4px]">
        <span className="text-preset-4-bold">{formatCurrency(spent)}</span>{" "}
        <span className="text-grey-500 text-preset-5">
          of {formatCurrency(maximum)}
        </span>
      </p>
    </div>
  );
}

export default function BudgetChart() {
  const budgets = useAppSelector((state: RootState) => state.finance.budgets);
  const budgetData = budgets.map((budget) => {
    return {
      category: budget.category,
      spent: budget.spent,
      limit: budget.maximum,
      color: budget.theme,
    };
  });

  return (
    <div className="bg-white rounded-[12px] p-[24px] w-full min-w-0">
      <div className="my-[24px] flex w-full min-w-0 flex-col gap-[24px]">
        <div className="flex w-full min-w-0 justify-center">
          <DonutChart data={budgetData} size={200} strokeWidth={28} />
        </div>
        <div className="flex w-full min-w-0 flex-col gap-[16px]">
          <p className="text-preset-2 text-grey-900">Spending Summary</p>
          {budgets.map((budget) => (
            <BudgetSection key={budget.category} section={budget} />
          ))}
        </div>
      </div>
    </div>
  );
}
