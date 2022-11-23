import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: { carts: [] },
  reducers: {
    add_to_cart: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
        // return { ...state, carts: [...state.carts] }
      }
      else {
        const temp = { ...action.payload, qnty: 1 };
        state.carts.push(temp);
        // return { ...state, carts: [...state.carts, temp] }
      }
    },

    remove_to_cart: (state, action) => {
      const data = state.carts.filter((item) => item.id !== action.payload);
      state.carts = data;
      // return { ...state, carts: data }
    },

    item_qnty_decrement: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
      if (state.carts[itemIndex].qnty > 1) {
        state.carts[itemIndex].qnty -= 1;
      } else if (state.carts[itemIndex].qnty === 1) {
        const nextCartsItems = state.carts.filter((cart) => cart.id !== action.payload.id);
        state.carts = nextCartsItems;
      }
    }
  }
});

export const { add_to_cart, remove_to_cart, item_qnty_decrement } = cartSlice.actions;
export default cartSlice.reducer;