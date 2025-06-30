"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productlist_1 = require("../controllers/productlist");
const productRoutes = express_1.default.Router();
// ✅ Route for updating profile (with image & role update)
productRoutes.get('/getproduct', productlist_1.getAllProducts);
console.log("Sending product data:", productlist_1.getAllProducts);
// productRoutes.post('/checkemail', checkEmailExist);
// productRoutes.post('/logout',logout)
exports.default = productRoutes;
