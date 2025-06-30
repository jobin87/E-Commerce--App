import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_ADD_PRODUCT,
  ENDPOINT_GET_PRODUCT,
  makeNetworkCall,
} from 'src/network';
import { CreateProduct, ProductCreated } from './types';
import toast from 'react-hot-toast';




export const productAdd = createAsyncThunk(
  "prduct/add",
  async (params: CreateProduct ) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.POST,
        url: ENDPOINT_ADD_PRODUCT,
        data: params,
      });

      console.log("Full API Response:", response);
      const { item, status, message } = response?.data;

      if (status === "new_success") {
        toast.success(message);
      }

      return { product: item }; // ✅ just `product`, not array
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/List",
  async () => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.GET,
        url: ENDPOINT_GET_PRODUCT,
        // data: params,
      });

      console.log("Full API Response:", response);

      if (!response?.data) {
        throw new Error("No data received from API");
      }

      console.log("Staff Data:", response?.data);
      return { products: response?.data.data ?? [] };

    } catch (error) {
      console.error("Error fetching staff list:", error);
      throw error;
    }
  }
);



