"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { formatCurrency } from "@/utils/utils";

import CardTemplate from "./CardTemplate";

export default function BillsCard() {
  const billsSummary = useAppSelector(
    (state: RootState) => state.finance.billsSummary
  );

  const billTypeColors: Record<string, string> = {
    "Paid Bills": "#277C78",
    "Total Upcoming": "#F2CDAC",
    "Due Soon": "#82C9D7",
  };

  return (
    <CardTemplate
      titleLabel="Recurring Bills"
      buttonLabel="See Details"
      buttonClickPath="/bills"
    >
      <div className="mt-[20px] flex flex-col gap-[20px]">
        {billsSummary.map((bill) => (
          <div
            key={bill.name}
            className="w-full rounded-[8px] bg-background p-[16px] border-l-4 flex flex-row justify-between"
            style={{ borderLeftColor: billTypeColors[bill.name] }}
          >
            <p className="text-grey-500 text-preset-4">{bill.name}</p>
            <p className="text-preset-4-bold">{formatCurrency(bill.amount)}</p>
          </div>
        ))}
      </div>
    </CardTemplate>
  );
}
