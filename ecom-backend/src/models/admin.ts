import mongoose, { Document, Schema } from "mongoose";

// ✅ Interface with correct typing
export interface IAdminItem extends Document {
  title: string;
  price: number;
  description: string;
  categoryId: string; // Not `number`, since it references another model
  imageUrl: string;
  createdBy?: string;
}

// ✅ Schema definition
const AdminProductSchema = new Schema<IAdminItem>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      ref: "Category", // assumes Category model exists
      required: true,
    },

    createdBy: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Export the model
const AdminModel = mongoose.model<IAdminItem>("Admin", AdminProductSchema);
export default AdminModel;
