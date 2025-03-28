import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    orders: orderReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
