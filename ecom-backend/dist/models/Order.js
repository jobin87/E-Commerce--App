"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const types_1 = require("../types/types");
Object.defineProperty(exports, "OrderStatus", { enumerable: true, get: function () { return types_1.OrderStatus; } });
const OrderSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },
    cartId: {
        type: String,
        required: true,
        index: true,
        default: null,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
        enum: Object.values(types_1.OrderStatus),
    },
    refundRequested: {
        type: Boolean,
        default: false,
    },
    refunded: {
        type: Boolean,
        default: false,
    },
    cancelRequested: {
        type: Boolean,
        default: false,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(ret) {
            delete ret.__v;
        },
    },
});
OrderSchema.statics.build = (attrs) => {
    return new Order(attrs);
};
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.Order = Order;
