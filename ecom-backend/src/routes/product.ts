import express from 'express';
import { getAllProducts } from '../controllers/productlist';

const productRoutes = express.Router();

  // ✅ Route for updating profile (with image & role update)
productRoutes.get('/getproduct',getAllProducts);
console.log("Sending product data:", getAllProducts);



// productRoutes.post('/checkemail', checkEmailExist);
// productRoutes.post('/logout',logout)

export default productRoutes;