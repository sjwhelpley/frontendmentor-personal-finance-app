"use client";

import { useState } from "react";
import Image from "next/image";

import data from "../../data.json";

function Transaction({
  transaction,
  lastItem,
}: {
  transaction: {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
  };
  lastItem: boolean;
}) {
  const { avatar, name, category, date, amount } = transaction;

  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-[32px]">
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
            className="text-preset-4-bold"
            style={{ color: amount < 0 ? "#201F24" : "#277C78" }}
          >
            {amount < 0
              ? `-${Math.abs(amount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}`
              : `+${amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}`}
          </p>
          <p className="md:hidden text-preset-5 text-[#696868]">
            {new Date(date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {!lastItem && (
        <div className="w-full border-b-1 border-[#F2F2F2] my-[20px]"></div>
      )}
    </div>
  );
}

export default function Transactions() {
  const { transactions } = data;
  const page = 1;
  // const [page, setPage] = useState(1);
  // const [shownTransactions, setShownTransactions] = useState(1);

  const numPerPage = 10;

  return (
    <>
      <h1 className="text-[32px] font-bold">Transactions</h1>

      <div className="mt-[32px] col-span-8 lg:col-span-12 bg-white text-black w-full rounded-[12px] p-[24px]">
        {/* Table search & filters TODO */}

        {/* Table column names */}
        <div className="hidden md:block">
          <div className="w-full flex flex-row gap-[32px]">
            <p className="flex-2 text-preset-5">Recipient / Sender</p>
            <p className="w-[80px] lg:w-[120px] text-preset-5">Category</p>
            <p className="w-[80px] lg:w-[120px] text-preset-5">
              Transaction Date
            </p>
            <p className="text-preset-5 flex-1 flex flex-row justify-end">
              Amount
            </p>
          </div>
          <div className="w-full border-b-1 border-[#F2F2F2] my-[20px]"></div>
        </div>
        {transactions
          .slice((page - 1) * numPerPage, page * numPerPage)
          .map((t, index) => (
            <Transaction
              key={t.date}
              transaction={t}
              lastItem={index === numPerPage - 1}
            />
          ))}
      </div>
    </>
  );
}
