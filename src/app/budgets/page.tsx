"use client";

import Button from "@/components/Button";

export default function Budget() {
  return (
    <div className="col-span-12 flex flex-row justify-between h-fit">
      <h1 className="text-[32px] font-bold">Budgets</h1>
      <Button label="Add New Budget" onClick={() => {}} />
    </div>
  );
}
