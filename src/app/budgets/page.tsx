import AddNewBudget from "@/components/Budgets/AddNewBudget";
import BudgetChart from "@/components/Budgets/BudgetChart";
import BudgetList from "@/components/Budgets/BudgetList";

export default function Budget() {
  return (
    <div className="col-span-12 flex h-fit w-full min-w-0 flex-col">
      <div className="flex w-full min-w-0 flex-row flex-wrap items-center justify-between gap-4">
        <h1 className="text-[32px] font-bold">Budgets</h1>
        <AddNewBudget />
      </div>

      <div className="mt-8 flex w-full min-w-0 flex-col gap-6 lg:mt-10 lg:flex-row lg:items-start lg:gap-8">
        <aside className="w-full min-w-0 shrink-0 lg:basis-[420px] lg:max-w-[420px]">
          <BudgetChart />
        </aside>
        <section className="w-full min-w-0 flex-1">
          <BudgetList />
        </section>
      </div>
    </div>
  );
}
