"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Change this to match your actual file path
const filePath = path_1.default.join(__dirname, "../kartjson/cartlist.json");
try {
    const raw = fs_1.default.readFileSync(filePath, "utf-8");
    const originalArray = JSON.parse(raw);
    // Keep only elements from index 101 to 199
    const cleaned = originalArray.slice(101, 200);
    fs_1.default.writeFileSync(filePath, JSON.stringify(cleaned, null, 2), "utf-8");
    console.log("File cleaned successfully.");
}
catch (error) {
    console.error("Error cleaning file:", error);
}
