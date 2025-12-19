"use client";

import BillsTable from "@/components/Bills/BillsTable";
import SummaryCard from "@/components/Bills/SummaryCard";
import TotalBillsCard from "@/components/Bills/TotalBillsCard";

export default function Bills() {
  return (
    <>
      <div className="col-span-full">
        <h1 className="text-preset-1">Recurring Bills</h1>
      </div>

      <div className="col-span-12 lg:col-span-4 h-fit flex flex-col md:flex-row lg:flex-col gap-4 mt-[32px]">
        <TotalBillsCard />

        <SummaryCard />
      </div>

      <BillsTable />
    </>
  );
}
