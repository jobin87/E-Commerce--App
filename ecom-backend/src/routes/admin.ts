import express from 'express';
import { createProduct } from '../controllers/admin';



const adminRoutes = express.Router();

  // ✅ Route for updating profile (with image & role update)
adminRoutes.post('/addproduct',createProduct);


export default adminRoutes;