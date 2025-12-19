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
      className="cursor-pointer text-white text-preset-4-bold bg-grey-900 hover:bg-grey-500 rounded-md p-[16px]"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
