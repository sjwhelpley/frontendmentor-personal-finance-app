"use client";

import IconCaretDown from "@/assets/images/icon-caret-down.svg";
import IconSearch from "@/assets/images/icon-search.svg";
import { ReactNode } from "react";

type FieldState = "default" | "focused" | "error";

export default function Input({
  value,
  onChange,
  type = "text",
  name,
  label,
  placeholder = "Placeholder",
  helperText,
  prefix,
  colorTagClassName,
  trailingIcon,
  state = "default",
  disabled = false,
  readOnly = false,
  autoComplete,
  className = "",
  inputClassName = "",
}: {
  value: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "password" | "number" | "search";
  name?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  prefix?: ReactNode;
  colorTagClassName?: string;
  trailingIcon?: "search" | "caret" | ReactNode;
  state?: FieldState;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  className?: string;
  inputClassName?: string;
}) {
  const stateClass =
    state === "error"
      ? "border-secondary-red"
      : state === "focused"
        ? "border-grey-900"
        : "border-beige-500 hover:border-grey-900 focus-within:border-grey-900";

  const renderTrailingIcon = () => {
    if (!trailingIcon) return null;
    if (typeof trailingIcon !== "string") return trailingIcon;

    if (trailingIcon === "search") {
      return (
        <IconSearch
          className="w-4 h-4 shrink-0 text-grey-900"
          aria-hidden
        />
      );
    }

    return (
      <IconCaretDown
        className="w-3 h-[6px] shrink-0 text-grey-900"
        aria-hidden
      />
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <p className="text-preset-4-bold text-grey-900 mb-1">{label}</p>}
      <div
        className={`flex items-center gap-4 bg-white border rounded-[8px] px-5 py-3 w-full transition-colors ${stateClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {colorTagClassName && (
          <span
            className={`w-4 h-4 rounded-full shrink-0 ${colorTagClassName}`}
            aria-hidden="true"
          />
        )}
        {prefix && (
          <span className="text-preset-4 text-beige-500 shrink-0">{prefix}</span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          className={`flex-1 min-w-0 text-preset-4 text-grey-900 placeholder:text-beige-500 bg-transparent border-none outline-none ${inputClassName}`}
        />
        {renderTrailingIcon()}
      </div>
      {helperText && (
        <p className="mt-1 text-preset-5 text-grey-500 text-right">{helperText}</p>
      )}
    </div>
  );
}
