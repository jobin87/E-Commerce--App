"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../controllers/cart");
const cartRoutes = express_1.default.Router();
// ✅ Route for updating profile (with image & role update)
cartRoutes.post('/addcart', cart_1.addToCart);
cartRoutes.get('/getcart', cart_1.getCart);
cartRoutes.put('/updatecart', cart_1.updateCartItemQuantities);
console.log("Sending product data:", cart_1.updateCartItemQuantities);
exports.default = cartRoutes;
