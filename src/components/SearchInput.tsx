"use client";

import Image from "next/image";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search transaction",
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-4 bg-white border border-beige-500 rounded-[8px] px-5 py-3 w-full min-w-0 max-w-full md:max-w-[320px] ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 text-preset-4 text-grey-900 placeholder:text-beige-500 bg-transparent border-none outline-none"
      />
      <Image
        src="/images/icon-search.svg"
        alt=""
        width={16}
        height={16}
        className="shrink-0"
      />
    </div>
  );
}
