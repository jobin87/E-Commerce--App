import express from 'express';


import { addToCart, getCart, updateCartItemQuantities } from '../controllers/cart';

const cartRoutes = express.Router();

  // ✅ Route for updating profile (with image & role update)
cartRoutes.post('/addcart',addToCart);
cartRoutes.get('/getcart',getCart);
cartRoutes.put('/updatecart',updateCartItemQuantities);
console.log("Sending product data:", updateCartItemQuantities);


export default cartRoutes;