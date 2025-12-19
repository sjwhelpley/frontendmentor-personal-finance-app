import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FinanceState } from "@/types/finance";
import initialData from "../data.json";

const initialState: FinanceState = initialData;

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    // Add reducers here as needed
    // Example:
    // updateBalance: (state, action: PayloadAction<Partial<Balance>>) => {
    //   state.balance = { ...state.balance, ...action.payload };
    // },
  },
});

export default financeSlice.reducer;
export const {} = financeSlice.actions;

