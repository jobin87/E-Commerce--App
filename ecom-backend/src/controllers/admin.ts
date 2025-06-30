import { Request, Response } from "express";
import ProductModel from "../models/Product";
import AdminModel from "../models/admin";

interface CustomRequest extends Request {
  file?: Express.Multer.File;
}

export const createProduct = async (req: CustomRequest, res: Response):Promise<void> => {
  try {
    const { title, price, description, categoryId } = req.body;

    if (!title || !price || !description || !categoryId ) {
      res.status(400).json({ message: "All fields are required, including image" });
      return;
    }


    const newProduct = await AdminModel.create({
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
  } catch (error) {
    console.error("Create product error:", error);
     res.status(500).json({ message: "Internal server error" });
     return;
  }
};
