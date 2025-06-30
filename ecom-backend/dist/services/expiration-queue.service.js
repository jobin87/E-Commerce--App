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
exports.expirationQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const Cart_1 = require("../models/Cart");
const Product_1 = require("../models/Product");
const src_1 = require("../common/src");
const user_1 = require("../models/user");
exports.expirationQueue = new bull_1.default("order:expiration", {
    redis: { port: 6379, host: "127.0.0.1" },
});
exports.expirationQueue.on("completed", (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Job completed", job.data);
}));
exports.expirationQueue.on("waiting", (jobId) => {
    console.log("Job waiting", jobId);
});
exports.expirationQueue.on("failed", (job, err) => {
    console.log("Job failed", job.data);
});
exports.expirationQueue.on("error", (err) => {
    console.log("Job error", err);
});
exports.expirationQueue.on("waiting", (jobId) => {
    console.log("Job waiting", jobId);
});
exports.expirationQueue.on("active", (job) => {
    console.log("Job active", job.data);
});
exports.expirationQueue.on("removed", (job) => {
    console.log("Job removed", job);
});
exports.expirationQueue.process((job) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId } = job.data;
        // set the cart expired to true & add the products quantity that are in the cart.products array back to their respective products
        const cart = yield Cart_1.Cart.findById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }
        cart.set({
            expired: true,
        });
        const products = cart.products;
        const updatedProducts = products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const productToUpdate = yield Product_1.Product.findById(product.productId);
            // if product is not found, throw an error
            if (!productToUpdate) {
                throw new src_1.NotFoundError("Product not found");
            }
            // set the required fields on the product doc
            productToUpdate.set({
                reservedQuantity: productToUpdate.reservedQuantity - product.quantity,
                inStock: productToUpdate.inStock + product.quantity,
            });
            yield productToUpdate.save();
        }));
        const user = yield user_1.User.findByIdAndUpdate(cart.userId, {
            $pull: { cart: cartId },
        }, { new: true });
        yield Promise.all([cart.save(), user.save(), ...updatedProducts]);
    }
    catch (error) {
        console.log(error);
    }
}));
