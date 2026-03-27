import AddNewBudget from "@/components/Budgets/AddNewBudget";

export default function Budget() {
  return (
    <div className="col-span-12 flex flex-row justify-between h-fit">
      <h1 className="text-[32px] font-bold">Budgets</h1>
      <AddNewBudget />
    </div>
  );
}
