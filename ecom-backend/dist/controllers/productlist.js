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
exports.getAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all products from the database
        const products = yield Product_1.default.find().lean();
        // Group products by first category
        const groupedProducts = {};
        products.forEach((product) => {
            let category = "Uncategorized";
            if (Array.isArray(product.categories) && product.categories.length > 0) {
                const firstCategory = product.categories[0];
                if (typeof firstCategory === "string") {
                    category = firstCategory.trim();
                }
            }
            if (!groupedProducts[category]) {
                groupedProducts[category] = [];
            }
            groupedProducts[category].push(product);
        });
        // Convert grouped object to array format
        const result = Object.entries(groupedProducts).map(([category, items]) => ({
            category,
            items,
        }));
        // Send the response
        res.status(200).json({
            message: "Product data grouped by category from MongoDB",
            data: result,
        });
    }
    catch (err) {
        console.error("Error in getAllProducts:", err);
        res.status(500).json({
            message: "Internal server error while fetching product data",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getAllProducts = getAllProducts;
