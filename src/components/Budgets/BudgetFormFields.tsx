"use client";

import type { ComponentProps } from "react";

import type { SelectOption } from "@/design-system/Select";
import FieldGroup from "@/design-system/FieldGroup";
import Input from "@/design-system/Input";
import Select from "@/design-system/Select";

/**
 * Controlled budget form fields for add / edit modals.
 * Options are built by the parent (e.g. with `buildBudgetCategoryOptions` / `buildBudgetThemeOptions`).
 */
export default function BudgetFormFields({
  category,
  onCategoryChange,
  maximumSpend,
  onMaximumSpendChange,
  theme,
  onThemeChange,
  categoryOptions,
  themeOptions,
  maximumPlaceholder = "e.g. 2000",
  inputMode,
  className = "",
}: {
  category: string;
  onCategoryChange: (value: string) => void;
  maximumSpend: string;
  onMaximumSpendChange: (value: string) => void;
  theme: string;
  onThemeChange: (value: string) => void;
  categoryOptions: SelectOption[];
  themeOptions: SelectOption[];
  maximumPlaceholder?: string;
  inputMode?: ComponentProps<typeof Input>["inputMode"];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <FieldGroup label="Budget Category">
        <Select
          value={category}
          options={categoryOptions}
          onChange={onCategoryChange}
          width="w-full"
          className="w-full"
          ariaLabel="Budget category"
        />
      </FieldGroup>

      <FieldGroup label="Maximum Spend">
        <Input
          value={maximumSpend}
          onChange={onMaximumSpendChange}
          type="text"
          inputMode={inputMode}
          placeholder={maximumPlaceholder}
          prefix="$"
          className="max-w-none"
        />
      </FieldGroup>

      <FieldGroup label="Theme">
        <Select
          value={theme}
          options={themeOptions}
          onChange={onThemeChange}
          width="w-full"
          className="w-full"
          ariaLabel="Budget theme color"
        />
      </FieldGroup>
    </div>
  );
}
