"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

import OverviewCard from "./OverviewCard";

export default function OverviewSection() {
  const balance = useAppSelector((state: RootState) => state.finance.balance);

  return (
    <div className="col-span-12">
      <h1 className="text-preset-1">Overview</h1>

      <div className="col-span-8 lg:col-span-12 flex flex-col md:flex-row gap-4 my-[32px]">
        <OverviewCard label="Current Balance" amount={balance.current} isDark />
        <OverviewCard label="Income" amount={balance.income} isDark={false} />
        <OverviewCard
          label="Expenses"
          amount={balance.expenses}
          isDark={false}
        />
      </div>
    </div>
  );
}
