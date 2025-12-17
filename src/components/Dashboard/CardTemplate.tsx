"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CardTemplate({
  titleLabel,
  buttonLabel,
  buttonClickPath,
  children,
}: {
  titleLabel: string;
  buttonLabel: string;
  buttonClickPath: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-black w-full rounded-[12px] p-[24px]">
      <div className="flex flex-row justify-between items-center h-fit">
        <h1 className="text-preset-2 text-[#201F24]">{titleLabel}</h1>
        <Link
          href={buttonClickPath}
          className="text-preset-4 text-[#696868] flex flex-row items-center"
        >
          {buttonLabel}{" "}
          <Image
            src="/images/icon-caret-right.svg"
            alt="Right caret"
            width="6"
            height="4"
            className="ml-[12px]"
          />
        </Link>
      </div>

      {children}
    </div>
  );
}
