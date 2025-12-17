"use client";

import React from "react";

export default function LargeCard({
  titleLabel,
  buttonLabel,
  children,
}: {
  titleLabel: string;
  buttonLabel: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`bg-white text-black w-full rounded-[12px] p-[24px]`}>
      <div className="flex flex-row justify-between items-center h-fit">
        <h1 className="text-[20px]/[1.2] font-bold text-[#201F24]">
          {titleLabel}
        </h1>
        <button className="text-[14px]/[1.5] text-[#696868]">
          {buttonLabel}
        </button>
      </div>

      {children}
    </div>
  );
}
