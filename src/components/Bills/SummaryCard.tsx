"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { formatCurrency } from "@/utils/utils";

export default function SummaryCard() {
  const billsSummary = useAppSelector(
    (state: RootState) => state.finance.billsSummary
  );

  return (
    <div className="h-fit bg-white p-[20px] rounded-[12px] w-full md:w-1/2 lg:w-full">
      <h1 className="text-preset-2 text-grey-900">Summary</h1>

      {billsSummary.map((bill, index) => (
        <div
          key={bill.name}
          className={`flex flex-row justify-between py-[16px] ${
            index !== billsSummary.length - 1 && "border-b-1 border-grey-100"
          }`}
        >
          <p className="text-preset-5 text-grey-500">{bill.name}</p>
          <p
            className={`text-preset-5-bold ${
              bill.name === "Due Soon" ? "text-secondary-red" : "text-grey-900"
            }`}
          >
            {bill.numberOfBills} ({formatCurrency(bill.amount)})
          </p>
        </div>
      ))}
    </div>
  );
}
