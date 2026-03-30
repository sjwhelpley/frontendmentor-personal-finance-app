"use client";

import {
  KeyboardEvent,
  ReactNode,
  useRef,
  useState,
  useEffect,
  useId,
} from "react";

import IconCaretDown from "@/assets/images/icon-caret-down.svg";
import IconSelect from "@/assets/images/icon-selected.svg";

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
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = useId();

  const selectedOption = options.find((o) => o.value === value);
  const selectedLabel = selectedOption?.label ?? value;
  const effectiveAriaLabel =
    ariaLabel ?? (label ? `${label}: ${selectedLabel}` : selectedLabel);
  const enabledIndices = options
    .map((opt, index) => (opt.disabled ? -1 : index))
    .filter((index) => index !== -1);

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

  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    optionRefs.current[activeIndex]?.focus();
  }, [isOpen, activeIndex]);

  const getInitialActiveIndex = () => {
    const selectedIndex = options.findIndex((opt) => opt.value === value);
    if (selectedIndex >= 0 && !options[selectedIndex]?.disabled) {
      return selectedIndex;
    }
    return enabledIndices[0] ?? -1;
  };

  const getNextEnabledIndex = (current: number, direction: 1 | -1) => {
    if (enabledIndices.length === 0) return -1;
    if (current < 0)
      return direction === 1 ? enabledIndices[0] : enabledIndices.at(-1)!;
    const pos = enabledIndices.indexOf(current);
    if (pos === -1)
      return direction === 1 ? enabledIndices[0] : enabledIndices.at(-1)!;
    const nextPos =
      (pos + direction + enabledIndices.length) % enabledIndices.length;
    return enabledIndices[nextPos];
  };

  const openListbox = (preferredIndex?: number) => {
    setIsOpen(true);
    if (preferredIndex != null && preferredIndex >= 0) {
      setActiveIndex(preferredIndex);
      return;
    }
    setActiveIndex(getInitialActiveIndex());
  };

  const closeListbox = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const triggerClick = () => {
    if (isOpen) {
      closeListbox();
      return;
    }
    openListbox();
  };

  const selectOptionAtIndex = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    onChange(option.value);
    closeListbox();
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        openListbox(getInitialActiveIndex());
        return;
      }
      setActiveIndex((prev) => getNextEnabledIndex(prev, 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        openListbox(enabledIndices.at(-1) ?? -1);
        return;
      }
      setActiveIndex((prev) => getNextEnabledIndex(prev, -1));
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) {
        openListbox();
      } else if (activeIndex >= 0) {
        selectOptionAtIndex(activeIndex);
      }
      return;
    }
    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      closeListbox();
    }
  };

  const handleOptionKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(getNextEnabledIndex(index, 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(getNextEnabledIndex(index, -1));
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(enabledIndices[0] ?? -1);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(enabledIndices.at(-1) ?? -1);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectOptionAtIndex(index);
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      closeListbox();
      triggerRef.current?.focus();
      return;
    }
    if (e.key === "Tab") {
      closeListbox();
    }
  };

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
      <div
        className={`relative min-w-0 ${width === "w-full" ? "w-full" : "shrink-0"}`}
      >
        {customTrigger != null ? (
          <>
            <button
              ref={triggerRef}
              type="button"
              onClick={triggerClick}
              onKeyDown={handleTriggerKeyDown}
              className={`hidden md:flex items-center gap-4 bg-white border rounded-[8px] px-5 py-3 ${width} text-left cursor-pointer ${isOpen ? "border-grey-900" : "border-beige-500"}`}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls={isOpen ? listboxId : undefined}
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
              onKeyDown={handleTriggerKeyDown}
              className="flex md:hidden items-center justify-center cursor-pointer p-2 bg-white hover:bg-grey-100 shrink-0"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls={isOpen ? listboxId : undefined}
              aria-label={effectiveAriaLabel}
            >
              {customTrigger}
            </button>
          </>
        ) : (
          <button
            ref={triggerRef}
            type="button"
            onClick={triggerClick}
            onKeyDown={handleTriggerKeyDown}
            className={`flex items-center gap-4 bg-white border rounded-[8px] px-5 py-3 ${width} text-left cursor-pointer ${isOpen ? "border-grey-900" : "border-beige-500"}`}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={isOpen ? listboxId : undefined}
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
            id={listboxId}
            className={`absolute left-0 top-full mt-1 z-50 bg-white rounded-[8px] px-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] border border-grey-100 max-h-[280px] overflow-y-auto ${width}`}
            role="listbox"
            aria-label={effectiveAriaLabel}
          >
            {options.map((opt, index) => {
              const isSelected = opt.value === value;
              const isDisabled = !!opt.disabled && !isSelected;
              return (
                <button
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  key={opt.value}
                  type="button"
                  role="option"
                  id={`${listboxId}-option-${index}`}
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  disabled={isDisabled}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => {
                    if (isDisabled) return;
                    onChange(opt.value);
                    closeListbox();
                    triggerRef.current?.focus();
                  }}
                  onKeyDown={(e) => handleOptionKeyDown(e, index)}
                  onMouseEnter={() => {
                    if (!isDisabled) setActiveIndex(index);
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
                        className={`w-4 h-4 rounded-full shrink-0 ${opt.colorClassName ?? ""} ${isDisabled ? "opacity-50" : ""}`}
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
                        <IconSelect aria-hidden="true" />
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
