"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const adminRoutes = express_1.default.Router();
// ✅ Route for updating profile (with image & role update)
adminRoutes.post('/addproduct', admin_1.createProduct);
exports.default = adminRoutes;
