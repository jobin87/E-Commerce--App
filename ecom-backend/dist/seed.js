"use strict";
// // src/utils/seedProducts.ts
// import fs from "fs";
// import path from "path";
// import ProductModel, { IProduct } from "./models/Product";
// export const seedProducts = async () => {
//   const filepath = path.join(__dirname, "../../ecom-backend/kartjson/cartlist.json");
//   try {
//     const fileData = fs.readFileSync(filepath, "utf-8");
//     const products: IProduct[] = JSON.parse(fileData);
//     // Optional: Avoid duplicates
//     const existing = await ProductModel.find().lean();
//     if (existing.length === 0) {
//       await ProductModel.insertMany(products, { ordered: false });
//       console.log("✅ Products seeded to MongoDB.");
//     } else {
//       console.log("⚠️ Products already exist. Skipping seeding.");
//     }
//   } catch (err) {
//     console.error("❌ Error seeding products:", err);
//   }
// };
