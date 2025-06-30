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
exports.createProduct = void 0;
const admin_1 = __importDefault(require("../models/admin"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, description, categoryId } = req.body;
        if (!title || !price || !description || !categoryId) {
            res.status(400).json({ message: "All fields are required, including image" });
            return;
        }
        const newProduct = yield admin_1.default.create({
            title,
            price,
            description,
            categoryId,
        });
        res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        });
        return;
    }
    catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.createProduct = createProduct;
