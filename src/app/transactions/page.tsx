"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import IconFilterMobile from "@/assets/images/icon-filter-mobile.svg";
import IconSortMobile from "@/assets/images/icon-sort-mobile.svg";
import SearchInput from "@/components/SearchInput";
import Select, { SelectOption } from "@/components/Select";
import Table from "@/components/Table";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { Transaction as TransactionType } from "@/types/finance";

const SORT_OPTIONS: SelectOption[] = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "amount-desc", label: "Amount (high to low)" },
  { value: "amount-asc", label: "Amount (low to high)" },
];

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

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categoryOptions: SelectOption[] = useMemo(() => {
    const categories = Array.from(
      new Set(transactions.map((t) => t.category)),
    ).sort();
    return [
      { value: "all", label: "All Transactions" },
      ...categories.map((c) => ({ value: c, label: c })),
    ];
  }, [transactions]);

  const filteredAndSortedTransactions = useMemo(() => {
    let list = transactions;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }

    if (categoryFilter !== "all") {
      list = list.filter((t) => t.category === categoryFilter);
    }

    const sorted = [...list];
    switch (sortBy) {
      case "oldest":
        sorted.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case "amount-desc":
        sorted.sort((a, b) => b.amount - a.amount);
        break;
      case "amount-asc":
        sorted.sort((a, b) => a.amount - b.amount);
        break;
      default:
        // latest
        sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    }
    return sorted;
  }, [transactions, searchQuery, categoryFilter, sortBy]);

  return (
    <>
      <h1 className="text-[32px] font-bold">Transactions</h1>

      <div className="mt-[32px] col-span-full bg-white text-black w-full rounded-[12px] p-[20px] md:p-[24px] overflow-hidden">
        <div className="flex flex-row flex-nowrap items-center gap-3 sm:gap-4 mb-6">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search transaction"
            className="flex-1 min-w-0"
          />
          <div className="flex flex-nowrap items-center gap-3 md:gap-6 shrink-0">
            <Select
              label="Sort by"
              value={sortBy}
              options={SORT_OPTIONS}
              onChange={setSortBy}
              width="w-[113px]"
              customTrigger={<IconSortMobile className="w-4 h-[15px]" aria-hidden />}
              ariaLabel="Sort by"
            />
            <Select
              label="Category"
              value={categoryFilter}
              options={categoryOptions}
              onChange={setCategoryFilter}
              width="min-w-[177px]"
              customTrigger={<IconFilterMobile className="w-[18px] h-4" aria-hidden />}
              ariaLabel="Category filter"
            />
          </div>
        </div>

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
          data={filteredAndSortedTransactions}
          getRow={(t: TransactionType, index: number, numPerPage: number) => (
            <Transaction
              key={`${t.date}-${t.name}-${t.amount}`}
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
