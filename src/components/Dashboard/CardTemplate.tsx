"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/design-system/Button";

export default function CardTemplate({
  titleLabel,
  buttonLabel,
  buttonClickPath,
  children,
}: {
  titleLabel: string;
  buttonLabel: string;
  buttonClickPath: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="bg-white text-black w-full rounded-[12px] p-[24px]">
      <div className="flex flex-row justify-between items-center h-fit">
        <h2 className="text-preset-2 text-grey-900">{titleLabel}</h2>
        <Button
          variant="tertiary"
          label={buttonLabel}
          onClick={() => router.push(buttonClickPath)}
        />
      </div>

      {children}
    </div>
  );
}
