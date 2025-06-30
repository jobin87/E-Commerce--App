import fs from "fs";
import path from "path";

// Change this to match your actual file path
const filePath = path.join(__dirname, "../kartjson/cartlist.json");

try {
  const raw = fs.readFileSync(filePath, "utf-8");
  const originalArray = JSON.parse(raw);

  // Keep only elements from index 101 to 199
  const cleaned = originalArray.slice(101, 200);

  fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2), "utf-8");

  console.log("File cleaned successfully.");
} catch (error) {
  console.error("Error cleaning file:", error);
}
