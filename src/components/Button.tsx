"use client";

export default function Button({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="cursor-pointer text-white font-bold text-[14px] bg-black hover:bg-[#696868] rounded-md p-[16px]"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
