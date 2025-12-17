import OverviewCard from "@/components/Dashboard/OverviewCard";
import PotsCard from "@/components/Dashboard/PotsCard";
import CardTemplate from "@/components/Dashboard/CardTemplate";
import TransactionsCard from "@/components/Dashboard/TransactionsCard";

import data from "../data.json";

export default function Home() {
  return (
    <>
      <h1 className="text-preset-1">Overview</h1>

      <div className="col-span-8 lg:col-span-12 flex flex-col md:flex-row gap-4 my-[32px]">
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

      <div className="col-span-8 lg:col-span-7">
        <PotsCard />
        <div className="mt-[24px]">
          <TransactionsCard />
        </div>
      </div>

      <div className="col-span-8 lg:col-span-5 h-fit">
        <CardTemplate
          titleLabel="Budgets"
          buttonLabel="See Details"
          buttonClickPath="/budgets"
        />
        <div className="mt-[24px]">
          <CardTemplate
            titleLabel="Recurring Bills"
            buttonLabel="See Details"
            buttonClickPath="/bills"
          />
        </div>
      </div>
    </>
  );
}
