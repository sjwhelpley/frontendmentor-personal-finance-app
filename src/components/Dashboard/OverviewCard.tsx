import { formatCurrency } from "@/utils/utils";

export default function OverviewCard({
  label,
  amount,
  isDark,
}: {
  label: string;
  amount: number;
  isDark: boolean;
}) {
  return (
    <div
      className={`${
        isDark ? "bg-grey-900 text-white" : "bg-white text-grey-900"
      } w-full md:w-1/3 rounded-[12px] p-[24px]`}
    >
      <h4 className={`${!isDark && "text-grey-500"} text-preset-4`}>{label}</h4>
      <p className="text-preset-1 mt-[12px]">{formatCurrency(amount)}</p>
    </div>
  );
}
