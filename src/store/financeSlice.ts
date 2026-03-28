import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FinanceState } from "@/types/finance";

import initialData from "../data.json";

const initialState: FinanceState = initialData;

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addBudget: (
      state,
      action: PayloadAction<{ category: string; maximum: number; theme: string }>,
    ) => {
      state.budgets.push({
        category: action.payload.category,
        maximum: action.payload.maximum,
        theme: action.payload.theme,
        spent: 0,
      });
    },
    updateBudget: (
      state,
      action: PayloadAction<{
        originalCategory: string;
        category: string;
        maximum: number;
        theme: string;
      }>,
    ) => {
      const i = state.budgets.findIndex(
        (b) => b.category === action.payload.originalCategory,
      );
      if (i === -1) return;
      const prev = state.budgets[i];
      state.budgets[i] = {
        ...prev,
        category: action.payload.category,
        maximum: action.payload.maximum,
        theme: action.payload.theme,
      };
    },
  },
});

export default financeSlice.reducer;
export const { addBudget, updateBudget } = financeSlice.actions;
