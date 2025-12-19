"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

export default function SummaryCard() {
  const bills = useAppSelector((state: RootState) => state.finance.bills);

  return (
    <div className="h-fit bg-white p-[20px] rounded-[12px] w-full md:w-1/2 lg:w-full">
      <h1 className="text-preset-2 text-grey-900">Summary</h1>

      {bills.map((bill) => (
        <div key={bill.name}>
          <p>{bill.name}</p>
        </div>
      ))}
    </div>
  );
}
