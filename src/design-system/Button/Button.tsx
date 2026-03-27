"use client";

import IconCaretRight from "@/assets/images/icon-caret-right.svg";
import { ReactNode } from "react";

export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  size = "default",
  className = "",
}: {
  label: string | ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "destroy" | "pagination";
  disabled?: boolean;
  size?: "default" | "small";
  className?: string;
}) {
  const variantClasses = {
    primary: "bg-grey-900 text-white hover:bg-grey-500 text-preset-4-bold",
    secondary:
      "border border-transparent bg-beige-100 text-grey-900 hover:border-grey-300 hover:bg-white text-preset-4-bold",
    tertiary:
      "bg-transparent text-grey-500 hover:text-grey-900 flex flex-row items-center text-preset-4",
    destroy: "bg-secondary-red text-white hover:opacity-80 text-preset-4-bold",
    pagination:
      "border border-beige-500 text-grey-900 hover:bg-beige-500 hover:text-white",
  };

  const sizeClasses = {
    default: "py-[8px] px-[16px]",
    small: "w-[40px] h-[40px]",
  };

  return (
    <button
      className={`rounded-md transition-colors duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {variant === "tertiary" && (
        <IconCaretRight
          className="ml-[12px] w-[6px] h-[11px] shrink-0"
          aria-hidden
        />
      )}
    </button>
  );
}
