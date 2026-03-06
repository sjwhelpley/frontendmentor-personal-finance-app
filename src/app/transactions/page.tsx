"use client";

import Image from "next/image";

import Table from "@/components/Table";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { Transaction as TransactionType } from "@/types/finance";

function Transaction({
  transaction,
  lastItem,
}: {
  transaction: TransactionType;
  lastItem: boolean;
}) {
  const { avatar, name, category, date, amount } = transaction;

  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formattedAmount = `${isNegative ? "-" : "+"}${absoluteAmount}`;
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <tr
      className={`flex md:table-row items-center justify-between ${!lastItem ? "border-b border-grey-100" : ""}`}
    >
      <td className="py-[16px] md:py-[20px] flex-1 min-w-0">
        <div className="flex flex-row items-center gap-[12px] md:gap-[16px]">
          <Image
            src={avatar}
            alt="Avatar"
            width="40"
            height="40"
            className="rounded-full shrink-0"
          />
          <p className="text-preset-4-bold truncate">{name}</p>
        </div>
      </td>

      <td className="hidden md:table-cell py-[20px] text-preset-5 text-grey-500">
        {category}
      </td>

      <td className="hidden md:table-cell py-[20px] text-preset-5 text-grey-500">
        {formattedDate}
      </td>

      <td className="py-[16px] md:py-[20px] text-right shrink-0">
        <p
          className={`text-preset-4-bold whitespace-nowrap ${
            isNegative ? "text-grey-900" : "text-secondary-green"
          }`}
        >
          {formattedAmount}
        </p>
        <p className="md:hidden text-preset-5 text-grey-500 whitespace-nowrap">
          {formattedDate}
        </p>
      </td>
    </tr>
  );
}

export default function Transactions() {
  const transactions = useAppSelector(
    (state: RootState) => state.finance.transactions,
  );

  return (
    <>
      <h1 className="text-[32px] font-bold">Transactions</h1>

      <div className="mt-[32px] col-span-full bg-white text-black w-full rounded-[12px] p-[20px] md:p-[24px] overflow-hidden">
        {/* Table search & filters TODO */}

        <Table
          columns={[
            {
              name: "Recipient / Sender",
              width: "w-[40%]",
              className: "text-left",
            },
            { name: "Category", className: "hidden md:table-cell text-left" },
            {
              name: "Transaction Date",
              className: "hidden md:table-cell text-left",
            },
            { name: "Amount", width: "w-[15%]", className: "text-right" },
          ]}
          data={transactions}
          getRow={(t: TransactionType, index: number, numPerPage: number) => (
            <Transaction
              key={t.date}
              transaction={t}
              lastItem={index === numPerPage - 1}
            />
          )}
          showPagination
        />
      </div>
    </>
  );
}
