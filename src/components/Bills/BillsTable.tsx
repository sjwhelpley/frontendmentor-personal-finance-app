"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

import Table from "../Table";

export default function BillsTable() {
  const bills = useAppSelector((state: RootState) => state.finance.bills);
  console.log(bills);
  return (
    <div className="col-span-12 lg:col-span-8 h-fit mt-[24px] bg-white p-[32px] rounded-[12px]">
      <Table
        columns={[
          { name: "Bill Title", className: "text-left" },
          { name: "Due Date", className: "text-left" },
          { name: "Amount", className: "text-right" },
        ]}
        data={bills}
        getRow={() => null}
      />
    </div>
  );
}
