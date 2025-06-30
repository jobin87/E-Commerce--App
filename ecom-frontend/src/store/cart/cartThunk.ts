import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  API_METHODS,
  ENDPOINT_ADD_CART,
  ENDPOINT_GET_CART,
  ENDPOINT_GET_PRODUCT,
  ENDPOINT_UPDATE_CART,
  makeNetworkCall,
} from "src/network";
import {  CartGetItem, UpdateItem } from "./types";
import toast from "react-hot-toast";

export const addCart = createAsyncThunk(
  "cart/add",
  async (params: { objectID: string }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.POST,
        url: ENDPOINT_ADD_CART,
        data: params,
      });

      console.log("Full API Response:", response);
      const { item, status, message } = response?.data;

      if (status === "duplicate_success" || status === "new_success") {
        toast.success(message);
      }

      return { product: item }; // ✅ just `product`, not array
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
);

export const getCart = createAsyncThunk(
  "product/cartList",
  async (params?: CartGetItem) => {
    console.log("getCart CALLED with:", params);

    try {
      const response = await makeNetworkCall({
        method: API_METHODS.GET,
        url: ENDPOINT_GET_CART,
        data: params,
      });

      console.log("Fuget Response:", response);

      if (!response?.data) {
        throw new Error("No data received from API");
      }

      console.log("getData:", response?.data);
      return response?.data ?? [];
    } catch (error) {
      console.error("Error fetching staff list:", error);
      throw error;
    }
  }
);

export const updateCartQuantities = createAsyncThunk(
  "cart/updateQuantities",
  async (updates: UpdateItem[], { rejectWithValue }) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.PUT,
        url: ENDPOINT_UPDATE_CART, // e.g., '/api/cart/update-quantities'
        data: { updates },
      });

      console.log("Update Cart Response:", response?.data);
      return response?.data; // Contains updatedItems array
    } catch (error: any) {
      console.error("Update cart quantities error:", error);
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);
