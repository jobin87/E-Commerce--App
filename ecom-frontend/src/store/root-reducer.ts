import { combineReducers } from '@reduxjs/toolkit';
import  productReducer  from './product/productReducer';
import  cartReducer  from './cart/cartReducer';
export const rootReducer = combineReducers({
  product:productReducer,
  cart:cartReducer
});
