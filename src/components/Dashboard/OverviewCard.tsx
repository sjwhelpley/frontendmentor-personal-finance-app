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
        isDark ? "bg-black text-white" : "bg-white text-black"
      } w-full md:w-1/3 rounded-[12px] p-[24px]`}
    >
      <h4 className={`${!isDark && "text-[#696868]"} text-[14px]/[1.5]`}>
        {label}
      </h4>
      <p className="text-preset-1 mt-[12px]">
        {amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </p>
    </div>
  );
}
