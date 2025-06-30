"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartItemQuantities = exports.getCart = exports.addToCart = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Cart_1 = __importDefault(require("../models/Cart"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { objectID } = req.body;
    if (!objectID) {
        res.status(400).json({ message: "objectID is required" });
        return;
    }
    try {
        const product = yield Product_1.default.findOne({ objectID }).lean();
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        const existingCartItem = yield Cart_1.default.findOne({ objectID });
        if (existingCartItem) {
            existingCartItem.quantity += 1;
            yield existingCartItem.save();
            res.status(200).json({
                message: "Duplicate product — quantity increased in cart",
                status: "duplicate_success",
                item: existingCartItem,
            });
            return; // ✅ THIS return is required to stop further execution
        }
        const newCartItem = yield Cart_1.default.create({
            objectID: product.objectID,
            name: product.name,
            image: product.image,
            salePrice: product.salePrice,
            quantity: 1,
            categories: product.categories,
        });
        res.status(201).json({
            message: "Product added to cart successfully",
            status: "new_success",
            item: newCartItem,
        });
        return; // ✅ to fulfill void
    }
    catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : error,
        });
        return; // ✅ for void
    }
});
exports.addToCart = addToCart;
// backend route (e.g., GET /api/cart)
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield Cart_1.default.find();
        res.status(200).json({ data: cartItems });
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err });
    }
});
exports.getCart = getCart;
const updateCartItemQuantities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { updates } = req.body;
    // Validate
    if (!Array.isArray(updates) || updates.length === 0) {
        res.status(400).json({ message: 'Updates array is required' });
        return;
    }
    try {
        const updatedItems = [];
        for (const { objectID, quantity } of updates) {
            if (!objectID || typeof quantity !== 'number' || quantity <= 0) {
                continue; // skip invalid entries
            }
            const item = yield Cart_1.default.findOne({ objectID });
            if (item) {
                item.quantity = quantity;
                yield item.save();
                updatedItems.push({ objectID, quantity });
            }
        }
        res.status(200).json({
            message: 'Cart quantities updated successfully',
            updatedItems,
        });
        return;
    }
    catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Server error' });
        return;
    }
});
exports.updateCartItemQuantities = updateCartItemQuantities;
