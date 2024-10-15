import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import recordSlice from "./record/record.slice";
import authSlice from "./auth/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    record: recordSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
