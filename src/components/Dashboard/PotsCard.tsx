"use client";

import IconPot from "@/assets/images/icon-pot.svg";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hooks";

import CardTemplate from "./CardTemplate";

export default function PotsCard() {
  const pots = useAppSelector((state: RootState) => state.finance.pots);
  const totalSaved = pots.reduce((prev, curr) => prev + curr.total, 0);

  function PotSection({
    section,
  }: {
    section: { name: string; target: number; total: number; theme: string };
  }) {
    const { name, total, theme } = section;

    return (
      <div className="flex flex-row gap-[16px]">
        <div
          className={`w-[4px] h-fill rounded-[8px]`}
          style={{ backgroundColor: theme }}
        />
        <div>
          <p className="text-grey-500 text-preset-5">{name}</p>
          <p className="text-preset-4-bold">${total}</p>
        </div>
      </div>
    );
  }

  const visiblePots = pots.slice(0, 4);

  return (
    <CardTemplate
      titleLabel="Pots"
      buttonLabel="See Details"
      buttonClickPath="/pots"
    >
      <div className="mt-[20px] flex flex-col sm:flex-row gap-[20px]">
        <div className="w-full rounded-[12px] bg-background p-[16px] flex flex-row gap-[16px]">
          <IconPot className="w-10 h-10 shrink-0" aria-hidden />
          <div>
            <p className="text-grey-500 text-preset-4">Total Saved</p>
            <p className="text-preset-1 mt-[12px]">${totalSaved}</p>
          </div>
        </div>

        <div className="w-full grid grid-rows-2 grid-flow-col gap-[16px]">
          {visiblePots.map((s) => (
            <PotSection key={s.name} section={s} />
          ))}
        </div>
      </div>
    </CardTemplate>
  );
}
