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

  return (
    <div
      className={`flex flex-row items-center justify-between gap-[32px] py-[20px] ${
        !lastItem && "border-b-1 border-grey-100"
      }`}
    >
      <div className="flex-2 flex flex-row items-center gap-[16px]">
        <Image
          src={avatar}
          alt="Avatar"
          width="40"
          height="40"
          className="rounded-[50%]"
        />
        <p className="text-preset-4-bold">{name}</p>
      </div>

      <p className="hidden md:block w-[80px] lg:w-[120px] text-preset-5">
        {category}
      </p>
      <p className="hidden md:block w-[80px] lg:w-[120px] text-preset-5">
        {new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      <div className="flex-1 flex flex-col items-end">
        <p
          className={`text-preset-4-bold ${
            isNegative ? "text-grey-900" : "text-secondary-green"
          }`}
        >
          {formattedAmount}
        </p>
        <p className="md:hidden text-preset-5 text-grey-500">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

export default function Transactions() {
  const transactions = useAppSelector(
    (state: RootState) => state.finance.transactions
  );

  return (
    <>
      <h1 className="text-[32px] font-bold">Transactions</h1>

      <div className="mt-[32px] col-span-8 lg:col-span-12 bg-white text-black w-full rounded-[12px] p-[24px]">
        {/* Table search & filters TODO */}

        <Table
          columns={[
            "Recipent / Sender",
            "Category",
            "Transaction Date",
            "Amount",
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
