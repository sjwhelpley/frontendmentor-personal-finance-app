import Image from "next/image";
import data from "../../data.json";
import CardTemplate from "./CardTemplate";

export default function PotsCard() {
  const { pots } = data;
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
          <p className="text-[#696868] text-preset-5">{name}</p>
          <p className="text-preset-4-bold">${total}</p>
        </div>
      </div>
    );
  }

  return (
    <CardTemplate
      titleLabel="Pots"
      buttonLabel="See Details"
      buttonClickPath="/pots"
      children={
        <div className="mt-[20px] flex flex-row gap-[20px]">
          <div className="w-1/2 rounded-[12px] bg-[#F8F4F0] p-[16px] flex flex-row gap-[16px]">
            <Image
              src="/images/icon-pot.svg"
              alt="Money jar"
              width="40"
              height="40"
            />
            <div>
              <p className="text-[#696868] text-preset-4">Total Saved</p>
              <p className="text-preset-1 mt-[12px]">${totalSaved}</p>
            </div>
          </div>

          <div className="w-1/2 grid grid-rows-2 grid-flow-col gap-[16px]">
            {pots.slice(0, 4).map((s) => (
              <PotSection key={s.name} section={s} />
            ))}
          </div>
        </div>
      }
    />
  );
}
