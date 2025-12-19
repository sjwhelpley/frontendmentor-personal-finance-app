"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

export default function BillsTable() {
  const bills = useAppSelector((state: RootState) => state.finance.bills);

  return (
    <div className="col-span-12 lg:col-span-8 h-fit mt-[24px] bg-white p-[32px] rounded-[12px]"></div>
  );
}
