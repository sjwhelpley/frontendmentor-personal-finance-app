import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./financeSlice";
import initialData from "../data.json";

export const store = configureStore({
  reducer: {
    finance: financeReducer,
  },
  preloadedState: {
    finance: initialData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

