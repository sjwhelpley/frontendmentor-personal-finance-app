import Image from "next/image";

import type { Transaction as TransactionType } from "@/types/finance";

export default function Transaction({
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
