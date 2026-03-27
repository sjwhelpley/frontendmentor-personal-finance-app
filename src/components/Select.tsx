"use client";

import Image from "next/image";
import { ReactNode, useRef, useState, useEffect } from "react";

export type SelectOption = { value: string; label: string };

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

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;
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

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center gap-2 ${className}`}
    >
      {label != null && (
        <span
          className={`text-preset-4 text-grey-500 whitespace-nowrap shrink-0 ${
            customTrigger != null ? "hidden md:inline" : ""
          }`}
        >
          {label}
        </span>
      )}
      {customTrigger != null ? (
        <>
          <button
            type="button"
            onClick={triggerClick}
            className={`hidden md:flex items-center gap-4 bg-white border border-beige-500 rounded-[8px] px-5 py-3 ${width} text-left cursor-pointer`}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={effectiveAriaLabel}
          >
            <span className="flex-1 min-w-0 text-preset-4 text-grey-900 truncate">
              {selectedLabel}
            </span>
            <Image
              src="/images/icon-caret-down.svg"
              alt=""
              width={12}
              height={6}
              className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
          className={`flex items-center gap-4 bg-white border border-beige-500 rounded-[8px] px-5 py-3 ${width} text-left cursor-pointer`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={effectiveAriaLabel}
        >
          <span className="flex-1 min-w-0 text-preset-4 text-grey-900 truncate">
            {selectedLabel}
          </span>
          <Image
            src="/images/icon-caret-down.svg"
            alt=""
            width={12}
            height={6}
            className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1 z-50 min-w-full bg-white rounded-[8px] py-3 px-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] border border-grey-100 max-h-[280px] overflow-y-auto"
          role="listbox"
        >
          {options.map((opt, index) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left py-3 border-b border-grey-100 last:border-b-0 text-preset-4 text-grey-900 hover:bg-grey-100 rounded-[4px] px-1 -mx-1 cursor-pointer ${
                  isSelected ? "text-preset-4-bold" : ""
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
