``// models/Cart.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem extends Document {
  objectID: string;
  name: string;
  image: string;
  salePrice: number;
  quantity: number;
  categories?: string[];
}

const cartSchema = new Schema<ICartItem>(
  {
    objectID: { type: String, required: true, unique: false }, // prevent duplicates
    name: { type: String, required: true },
    image: { type: String, required: true },
    salePrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    categories: { type: [String] },
  },
  { timestamps: true }
);

const CartModel = mongoose.model<ICartItem>("Cart", cartSchema);
export default CartModel;
