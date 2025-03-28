import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeResponseOrder } from "../../types/types";

interface OrderState {
  orders: TypeResponseOrder[];
}

const initialState: OrderState = {
    orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TypeResponseOrder>) => {
      state.orders = [action.payload, ...state.orders];
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
