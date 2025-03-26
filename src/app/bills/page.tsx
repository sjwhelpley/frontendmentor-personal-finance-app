"use client";

export default function Bills() {
  return (
    <>
      <div className="col-span-full h-fit">
        <h1 className="text-[32px] font-bold">Bills</h1>
      </div>

      <div className="col-span-8 lg:col-span-4 h-fit flex flex-col md:flex-row lg:flex-col gap-4">
        <div className="bg-black text-white w-full md:w-1/2 lg:w-full">
          <p>Total bills</p>
        </div>

        <div className="h-fit bg-white w-full md:w-1/2 lg:w-full">
          <p>summary</p>
        </div>
      </div>

      <div className="col-span-8 lg:col-span-8 h-fit bg-white">
        <p>table</p>
      </div>
    </>
  );
}
