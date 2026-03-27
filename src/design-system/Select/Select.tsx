"use client";

import IconCaretDown from "@/assets/images/icon-caret-down.svg";
import { ReactNode, useRef, useState, useEffect } from "react";

export type SelectOption = {
  value: string;
  label: string;
  /** Optional Tailwind class (e.g. "bg-secondary-green") for the color tag. */
  colorClassName?: string;
  /** Optional CSS color value (e.g. "#277C78"). */
  color?: string;
  /** Prevents selection when true. */
  disabled?: boolean;
  /** Optional label for disabled state (default: "Already used"). */
  disabledLabel?: string;
};

export default function Select({
  label,
  value,
  options,
  onChange,
  width = "w-[150px]",
  className = "",
  customTrigger,
  ariaLabel,
}: {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  width?: string;
  className?: string;
  /** When provided (e.g. mobile icon), used as the trigger instead of the default button. */
  customTrigger?: ReactNode;
  /** Optional aria-label when using customTrigger (e.g. "Sort by", "Category filter"). */
  ariaLabel?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const selectedLabel = selectedOption?.label ?? value;
  const effectiveAriaLabel =
    ariaLabel ?? (label ? `${label}: ${selectedLabel}` : selectedLabel);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const triggerClick = () => setIsOpen((prev) => !prev);
  const hasColorTagOptions = options.some(
    (opt) => opt.colorClassName != null || opt.color != null,
  );

  return (
    <div ref={containerRef} className={`flex items-center gap-2 ${className}`}>
      {label != null && (
        <span
          className={`text-preset-4 text-grey-500 whitespace-nowrap shrink-0 ${
            customTrigger != null ? "hidden md:inline" : ""
          }`}
        >
          {label}
        </span>
      )}
      <div className="relative shrink-0">
        {customTrigger != null ? (
          <>
            <button
              type="button"
              onClick={triggerClick}
              className={`hidden md:flex items-center gap-4 bg-white border rounded-[8px] px-5 py-3 ${width} text-left cursor-pointer ${isOpen ? "border-grey-900" : "border-beige-500"}`}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-label={effectiveAriaLabel}
            >
              {hasColorTagOptions && (
                <span
                  className={`w-4 h-4 rounded-full shrink-0 ${selectedOption?.colorClassName ?? ""}`}
                  style={
                    selectedOption?.color
                      ? { backgroundColor: selectedOption.color }
                      : undefined
                  }
                  aria-hidden="true"
                />
              )}
              <span className="flex-1 min-w-0 text-preset-4 text-grey-900 truncate">
                {selectedLabel}
              </span>
              <IconCaretDown
                className={`w-3 h-[6px] shrink-0 text-grey-900 transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <button
              type="button"
              onClick={triggerClick}
              className="flex md:hidden items-center justify-center cursor-pointer p-2 bg-white hover:bg-grey-100 shrink-0"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-label={effectiveAriaLabel}
            >
              {customTrigger}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={triggerClick}
            className={`flex items-center gap-4 bg-white border rounded-[8px] px-5 py-3 ${width} text-left cursor-pointer ${isOpen ? "border-grey-900" : "border-beige-500"}`}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={effectiveAriaLabel}
          >
            {hasColorTagOptions && (
              <span
                className={`w-4 h-4 rounded-full shrink-0 ${selectedOption?.colorClassName ?? ""}`}
                style={
                  selectedOption?.color
                    ? { backgroundColor: selectedOption.color }
                    : undefined
                }
                aria-hidden="true"
              />
            )}
            <span className="flex-1 min-w-0 text-preset-4 text-grey-900 truncate">
              {selectedLabel}
            </span>
            <IconCaretDown
              className={`w-3 h-[6px] shrink-0 text-grey-900 transition-transform ${isOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        )}

        {isOpen && (
          <div
            className={`absolute left-0 top-full mt-1 z-50 bg-white rounded-[8px] px-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] border border-grey-100 max-h-[280px] overflow-y-auto ${width}`}
            role="listbox"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              const isDisabled = !!opt.disabled && !isSelected;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  disabled={isDisabled}
                  onClick={() => {
                    if (isDisabled) return;
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full py-3 border-b border-grey-100 last:border-b-0 text-preset-4 flex items-center justify-between gap-4 ${
                    isDisabled
                      ? "text-grey-500 cursor-not-allowed"
                      : "text-grey-900 cursor-pointer"
                  } ${isSelected ? "text-preset-4-bold" : ""}`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    {(opt.colorClassName || opt.color) && (
                      <span
                        className={`w-4 h-4 rounded-full shrink-0 ${opt.colorClassName ?? ""}`}
                        style={
                          opt.color ? { backgroundColor: opt.color } : undefined
                        }
                        aria-hidden="true"
                      />
                    )}
                    <span className="truncate">{opt.label}</span>
                  </span>
                  {(opt.colorClassName || opt.color) && (
                    <>
                      {isSelected ? (
                        <span
                          className="w-5 h-5 rounded-full bg-secondary-green shrink-0"
                          aria-hidden="true"
                        />
                      ) : isDisabled ? (
                        <span className="text-preset-4 text-grey-500 shrink-0">
                          {opt.disabledLabel ?? "Already used"}
                        </span>
                      ) : null}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
