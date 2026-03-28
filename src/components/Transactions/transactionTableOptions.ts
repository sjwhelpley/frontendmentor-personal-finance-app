import type { SelectOption } from "@/design-system/Select";

export const SORT_OPTIONS: SelectOption[] = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "name-asc", label: "A to Z" },
  { value: "name-desc", label: "Z to A" },
  { value: "amount-desc", label: "Highest" },
  { value: "amount-asc", label: "Lowest" },
];

export const CATEGORY_OPTIONS: SelectOption[] = [
  {
    value: "all",
    label: "All Transactions",
  },
  {
    value: "Bills",
    label: "Bills",
  },
  {
    value: "Dining Out",
    label: "Dining Out",
  },
  {
    value: "Education",
    label: "Education",
  },
  {
    value: "Entertainment",
    label: "Entertainment",
  },
  {
    value: "General",
    label: "General",
  },
  {
    value: "Groceries",
    label: "Groceries",
  },
  {
    value: "Lifestyle",
    label: "Lifestyle",
  },
  {
    value: "Personal Care",
    label: "Personal Care",
  },
  {
    value: "Shopping",
    label: "Shopping",
  },
  {
    value: "Transportation",
    label: "Transportation",
  },
];
