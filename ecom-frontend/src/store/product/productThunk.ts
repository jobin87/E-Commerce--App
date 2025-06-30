import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_METHODS,
  ENDPOINT_GET_PRODUCT,
  makeNetworkCall,
} from 'src/network';
import { productTypes } from './types';




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



