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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const password_service_1 = require("../services/password.service");
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String,
        index: true,
    },
    resetTokenExpiration: {
        type: Number,
        index: true,
    },
    gender: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    address: {
        street: { type: String },
        houseNumber: { type: Number },
        zipCode: { type: String },
        state: { type: String },
        country: { type: String },
        phoneNumber: { type: String },
        additionalInfo: { type: String },
    },
    cart: [{ type: mongoose_1.default.Schema.Types.ObjectId }],
    orders: [{ type: mongoose_1.default.Schema.Types.ObjectId }],
    wishlist: [{ type: mongoose_1.default.Schema.Types.ObjectId }],
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret, options) {
            delete ret.password;
            delete ret.__v;
        },
    },
});
UserSchema.statics.build = (attrs) => {
    return new User(attrs);
};
UserSchema.pre("save", function (done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            const hashed = password_service_1.Password.genPasswordHash(this.get("password"));
            this.set("password", hashed);
        }
        done();
    });
});
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
