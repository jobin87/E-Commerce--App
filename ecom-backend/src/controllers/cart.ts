import { Request, Response } from "express";
import ProductModel from "../models/Product";
import CartModel from "../models/Cart";

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  const { objectID } = req.body;

  if (!objectID) {
    res.status(400).json({ message: "objectID is required" });
    return;
  }

  try {
    const product = await ProductModel.findOne({ objectID }).lean();
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const existingCartItem = await CartModel.findOne({ objectID });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();

      res.status(200).json({
        message: "Duplicate product — quantity increased in cart",
        status: "duplicate_success",
        item: existingCartItem,
      });
      return; // ✅ THIS return is required to stop further execution
    }

    const newCartItem = await CartModel.create({
      objectID: product.objectID,
      name: product.name,
      image: product.image,
      salePrice: product.salePrice,
      quantity: 1,
      categories: product.categories,
    });

    res.status(201).json({
      message: "Product added to cart successfully",
      status: "new_success",
      item: newCartItem,
    });
    return; // ✅ to fulfill void
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
    return; // ✅ for void
  }
};

// backend route (e.g., GET /api/cart)
export const getCart = async (req: Request, res: Response) => {
  try {
    const cartItems = await CartModel.find();
    res.status(200).json({ data: cartItems });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err });
  }
};


export const updateCartItemQuantities = async (req: Request, res: Response): Promise<void> => {
  const { updates } = req.body;

  // Validate
  if (!Array.isArray(updates) || updates.length === 0) {
     res.status(400).json({ message: 'Updates array is required' });
     return;
  }

  try {
    const updatedItems = [];

    for (const { objectID, quantity } of updates) {
      if (!objectID || typeof quantity !== 'number' || quantity <= 0) {
        continue; // skip invalid entries
      }

      const item = await CartModel.findOne({ objectID });

      if (item) {
        item.quantity = quantity;
        await item.save();
        updatedItems.push({ objectID, quantity });
      }
    }

     res.status(200).json({
      message: 'Cart quantities updated successfully',
      updatedItems,
    });
    return;
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
     return
  }
};


