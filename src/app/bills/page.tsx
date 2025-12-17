"use client";

import Image from "next/image";

export default function Bills() {
  return (
    <>
      <div className="col-span-full">
        <h1 className="text-preset-1">Recurring Bills</h1>
      </div>

      <div className="col-span-8 lg:col-span-4 h-fit flex flex-col md:flex-row lg:flex-col gap-4 mt-[32px]">
        <div className="bg-black text-white w-full md:w-1/2 lg:w-full p-[24px] rounded-[12px] flex flex-col gap-[32px]">
          <Image
            src="/images/icon-recurring-bills.svg"
            alt="Bill icon"
            width="40"
            height="40"
          />

          <div className="w-full">
            <p className="text-preset-4">Total Bills</p>
            <p className="text-preset-1">$384.98</p>
          </div>
        </div>

        <div className="h-fit bg-white w-full md:w-1/2 lg:w-full">
          <p>summary</p>
        </div>
      </div>

      <div className="col-span-8 lg:col-span-8 h-fit bg-white mt-[32px]">
        <p>table</p>
      </div>
    </>
  );
}
