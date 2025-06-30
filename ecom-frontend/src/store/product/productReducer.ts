import { createSlice } from "@reduxjs/toolkit";
import { basicInitialArrayState, basicInitialState, networkCallInitialState } from "../types";
import {
  getProducts,
} from "./productThunk";

const initialState = {
  list: basicInitialState,
};

export const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProductList: (state, action) => {
      state.list = action.payload;
    },

  },
  extraReducers(builder) {
    builder


        // DETAILS
        .addCase(getProducts.fulfilled, (state, action) => {
          state.list.loading = false;
          state.list.data = action.payload;
          if(action.payload){
            const dataasstaffs = action.payload;
            console.log("data:E::",dataasstaffs)
          }
        })
        .addCase(getProducts.pending, (state) => {
          state.list.loading = true;
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.list.loading = false;
          state.list.error = action.error;
        })


      


  },
});

export const { setAllProductList
 
} = productReducer.actions;

export default productReducer.reducer;
