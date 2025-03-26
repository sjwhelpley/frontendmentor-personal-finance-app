import LargeCard from "@/components/OverviewLargeCard";
import Image from "next/image";

import iconPots from "../../public/images/icon-pot.svg";

import data from "../data.json";

function OverviewCard({
  label,
  amount,
  isDark,
}: {
  label: string;
  amount: number;
  isDark: boolean;
}) {
  return (
    <div
      className={`${
        isDark ? "bg-black text-white" : "bg-white text-black"
      } w-full md:w-1/3 rounded-[12px] p-[24px]`}
    >
      <h4 className={`${!isDark && "text-[#696868]"} text-[14px]/[1.5]`}>
        {label}
      </h4>
      <p className="text-[32px]/[1.2] font-bold mt-[12px]">
        ${amount.toFixed(2)}
      </p>
    </div>
  );
}

function PotsCard() {
  const { pots } = data;
  const totalSaved = pots.reduce((prev, curr) => prev + curr.total, 0);

  function PotSection({
    section,
  }: {
    section: { name: string; target: number; total: number; theme: string };
  }) {
    const { name, total, theme } = section;

    return (
      <div className="flex flex-row gap-[16px]">
        <div
          className={`w-[4px] h-fill rounded-[8px]`}
          style={{ backgroundColor: theme }}
        />
        <div>
          <p className="text-[#696868] text-[12px]/[1.5]">{name}</p>
          <p>${total}</p>
        </div>
      </div>
    );
  }

  return (
    <LargeCard
      titleLabel="Pots"
      buttonLabel="See Details"
      children={
        <div className="mt-[20px] flex flex-row gap-[20px]">
          <div className="w-1/2 rounded-[12px] bg-[#F8F4F0] p-[16px] flex flex-row gap-[16px]">
            <Image src={iconPots} alt="Money jar" />
            <div>
              <p className="text-[#696868] text-[14px]/[1.5]">Total Saved</p>
              <p className="text-[32px]/[1.2] font-bold mt-[12px]">
                ${totalSaved}
              </p>
            </div>
          </div>

          <div className="w-1/2 grid grid-rows-2 grid-flow-col gap-[16px]">
            {pots.slice(0, 4).map((s) => (
              <PotSection key={s.name} section={s} />
            ))}
          </div>
        </div>
      }
    />
  );
}

function TransactionsCard() {
  const { transactions } = data;

  function Transaction({
    transaction,
  }: {
    transaction: { avatar: string; name: string; date: string; amount: number };
  }) {
    const { avatar, name, date, amount } = transaction;

    return (
      <div className="flex flex-row gap-[16px]">
        <Image src={avatar} alt="Avatar" width="40" height="40" />
        <p>{name}</p>

        <div>
          <p>{amount}</p>
        </div>
      </div>
    );
  }

  return (
    <LargeCard
      titleLabel="Transactions"
      buttonLabel="View All"
      children={
        <div className="mt-[20px]">
          <div className="w-full">
            {transactions.slice(0, 5).map((t) => (
              <Transaction key={t.date} transaction={t} />
            ))}
          </div>
        </div>
      }
    />
  );
}

export default function Home() {
  return (
    <>
      <div className="col-span-full h-fit">
        <h1 className="text-[32px] font-bold">Overview</h1>
      </div>

      <div className="col-span-8 lg:col-span-12 h-fit flex flex-col md:flex-row gap-4 my-[32px]">
        <OverviewCard
          label="Current Balance"
          amount={data.balance.current}
          isDark
        />
        <OverviewCard
          label="Income"
          amount={data.balance.income}
          isDark={false}
        />
        <OverviewCard
          label="Expenses"
          amount={data.balance.expenses}
          isDark={false}
        />
      </div>

      <div className="col-span-8 lg:col-span-7 h-fit">
        <PotsCard />
        <div className="mt-[24px]">
          <TransactionsCard />
        </div>
      </div>

      <div className="col-span-8 lg:col-span-5 h-fit">
        <LargeCard
          titleLabel="Budgets"
          buttonLabel="See Details"
          children={<></>}
        />
        <div className="mt-[24px]">
          <LargeCard
            titleLabel="Recurring Bills"
            buttonLabel="See Details"
            children={<></>}
          />
        </div>
      </div>
    </>
  );
}
