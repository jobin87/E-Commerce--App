import { Request, Response } from "express";
import ProductModel, { IProduct } from "../models/Product";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all products from the database
    const products: IProduct[] = await ProductModel.find().lean();

    // Group products by first category
    const groupedProducts: { [category: string]: IProduct[] } = {};

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
  } catch (err) {
    console.error("Error in getAllProducts:", err);
    res.status(500).json({
      message: "Internal server error while fetching product data",
      error: err instanceof Error ? err.message : err,
    });
  }
};
