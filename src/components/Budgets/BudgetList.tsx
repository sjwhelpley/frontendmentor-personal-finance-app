"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

import BudgetCard from "./BudgetCard";

export default function BudgetList() {
  const budgets = useAppSelector((state: RootState) => state.finance.budgets);

  return (
    <div className="flex w-full min-w-0 flex-col gap-[24px]">
      {budgets.map((budget) => (
        <BudgetCard key={budget.category} />
      ))}
    </div>
  );
}
