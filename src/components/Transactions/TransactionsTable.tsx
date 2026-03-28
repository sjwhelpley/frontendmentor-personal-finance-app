"use client";

import { useMemo, useState } from "react";

import IconFilterMobile from "@/assets/images/icon-filter-mobile.svg";
import IconSortMobile from "@/assets/images/icon-sort-mobile.svg";
import Table from "@/components/Table";
import { Input, Select } from "@/design-system";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { Transaction as TransactionType } from "@/types/finance";

import Transaction from "./Transaction";
import { CATEGORY_OPTIONS, SORT_OPTIONS } from "./transactionTableOptions";

export default function TransactionsTable() {
  const transactions = useAppSelector(
    (state: RootState) => state.finance.transactions,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("all");

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
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
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
    <div className="mt-[32px] col-span-full bg-white text-black w-full rounded-[12px] p-[20px] md:p-[24px] overflow-hidden">
      <div className="flex flex-row flex-nowrap justify-between items-center gap-3 sm:gap-4 mb-6">
        <Input
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search transaction"
          className="flex-1 min-w-0 max-w-[320px]"
          trailingIcon="search"
        />
        <div className="flex flex-nowrap items-center gap-3 md:gap-6 shrink-0">
          <Select
            label="Sort by"
            value={sortBy}
            options={SORT_OPTIONS}
            onChange={setSortBy}
            width="w-[115px]"
            customTrigger={
              <IconSortMobile className="w-4 h-[15px]" aria-hidden />
            }
            ariaLabel="Sort by"
          />
          <Select
            label="Category"
            value={categoryFilter}
            options={CATEGORY_OPTIONS}
            onChange={setCategoryFilter}
            width="min-w-[175px]"
            customTrigger={
              <IconFilterMobile className="w-[18px] h-4" aria-hidden />
            }
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
  );
}
