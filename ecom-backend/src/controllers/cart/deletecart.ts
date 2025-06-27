import { NextFunction, Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import Session from "../../models/session";
const SECRET_KEY = "112eryt33";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from 'bcryptjs';
import { AuthRequest } from "../../middlewares/authMiddlewares";
import multer from "multer";
import path from "path";
import { Product } from "../../models/Product";
import { BadRequestError, NotFoundError } from "../../common/src";
import { Cart } from "../../models/Cart";
import { User } from "../../models/user";
import { expirationQueue } from "../../services/expiration-queue.service";


export const DeleteItemCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
        const { productId } = req.body;
  
        const cart = await Cart.findOne({ userId: req.currentUser!.id });
  
        if (!cart) {
          throw new NotFoundError("Cart not found");
        }
        const updatedCart = await Cart.findOneAndUpdate(
          { userId: req.currentUser!.id },
          {
            $pull: { products: { productId: productId } },
          },
          { new: true }
        );
        updatedCart?.save();
        res.status(200).json(updatedCart);
      } catch (error) {
        next(error);
      }
    }




