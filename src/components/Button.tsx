"use client";

import { ReactNode } from "react";

export default function Button({
  label,
  children,
  onClick,
  variant = "filled",
  disabled = false,
  size = "default",
  active = false,
  className = "",
}: {
  label?: string;
  children?: ReactNode;
  onClick: () => void;
  variant: "filled" | "outlined";
  disabled?: boolean;
  size?: "default" | "small";
  active?: boolean;
  className?: string;
}) {
  const variantClasses = {
    filled: "bg-grey-900 hover:bg-grey-500 text-white",
    outlined: active
      ? "border border-grey-900 bg-grey-900 text-white"
      : "border border-grey-300 text-grey-900 hover:bg-grey-100",
  };

  const sizeClasses = {
    default: "py-[8px] px-[16px] text-preset-4",
    small: "w-[40px] h-[40px] text-preset-4",
  };

  return (
    <button
      className={`cursor-pointer rounded-md ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children || label}
    </button>
  );
}
