import mongoose, { Document, Schema, Model } from "mongoose";

// Updated Interface
export interface IProduct extends Document {
  objectID: string;
  name: string;
  image: string;
  thumbnailImage: string;
  description?: string;
  shortDescription?: string;
  manufacturer?: string;
  price?: number;
  salePrice: number;
  salePrice_range?: string;
  categories?: string[];
  bestSellingRank?: number;
  customerReviewCount?: number;
  shipping?: string;
  url?: string;
  type?: string;
}

// Updated Schema
const productSchema: Schema<IProduct> = new Schema(
  {
    objectID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    thumbnailImage: { type: String },
    description: { type: String },
    shortDescription: { type: String },
    manufacturer: { type: String },
    price: { type: Number },
    salePrice: { type: Number, required: true },
    salePrice_range: { type: String },
    categories: { type: [String] },
    bestSellingRank: { type: Number },
    customerReviewCount: { type: Number },
    shipping: { type: String },
    url: { type: String },
    type: { type: String },
  },
  { timestamps: true }
);

// Model
const ProductModel: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
