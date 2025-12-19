import BillsCard from "@/components/Dashboard/BillsCard";
import OverviewSection from "@/components/Dashboard/OverviewSection";
import PotsCard from "@/components/Dashboard/PotsCard";
import TransactionsCard from "@/components/Dashboard/TransactionsCard";
import BudgetsCard from "@/components/Dashboard/BudgetsCard";

export default function Home() {
  return (
    <>
      <OverviewSection />

      <div className="col-span-12 lg:col-span-7">
        <PotsCard />
        <div className="mt-[24px]">
          <TransactionsCard />
        </div>
      </div>

      <div className="col-span-12 mt-[24px] lg:mt-0 lg:col-span-5 h-fit">
        <BudgetsCard />
        <div className="mt-[24px]">
          <BillsCard />
        </div>
      </div>
    </>
  );
}
