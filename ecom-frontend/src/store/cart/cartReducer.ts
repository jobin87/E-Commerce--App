import { createSlice } from "@reduxjs/toolkit";
import {
  basicInitialArrayState,
  basicInitialState,
  networkCallInitialState,
} from "../types";
import { addCart, getCart } from "./cartThunk";

const initialState = {
  cartlist: basicInitialState,
  cartUpdation: basicInitialArrayState,
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setcartList: (state, action) => {
      state.cartlist = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      // DETAILS
      .addCase(addCart.fulfilled, (state, action) => {
        state.cartlist.loading = false;
        state.cartlist.data = action.payload;
        if (action.payload) {
          const dataasstaffs = action.payload;
          console.log("data:E::", dataasstaffs);
        }
      })
      .addCase(addCart.pending, (state) => {
        state.cartlist.loading = true;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.cartlist.loading = false;
        state.cartlist.error = action.error;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartUpdation.loading = false;
        state.cartUpdation.data = action.payload;
        if (action.payload) {
          const dataasstaffs = action.payload.data;
          console.log("data:update::", dataasstaffs);
        }
      })
      .addCase(getCart.pending, (state) => {
        state.cartUpdation.loading = true;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.cartUpdation.loading = false;
        state.cartUpdation.error = action.error || "Error fetching staff list";
      });
  },
});

export const { setcartList } = cartReducer.actions;

export default cartReducer.reducer;
