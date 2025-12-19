"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import Image from "next/image";

export default function TotalBillsCard() {
  const bills = useAppSelector((state: RootState) => state.finance.bills);
  const paidBills =
    bills.find((bill) => bill.name === "Paid Bills")?.amount ?? 0;
  const totalUpcoming =
    bills.find((bill) => bill.name === "Total Upcoming")?.amount ?? 0;
  const totalBills = paidBills + totalUpcoming;

  return (
    <div className="bg-grey-900 text-white w-full md:w-1/2 lg:w-full p-[24px] rounded-[12px] flex flex-col gap-[32px]">
      <Image
        src="/images/icon-recurring-bills.svg"
        alt="Bill icon"
        width="40"
        height="40"
      />

      <div className="w-full">
        <p className="text-preset-4">Total Bills</p>
        <p className="text-preset-1">${totalBills.toFixed(2)}</p>
      </div>
    </div>
  );
}
