"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http")); // ✅ Import HTTP module
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const cart_1 = __importDefault(require("./routes/cart"));
const product_1 = __importDefault(require("./routes/product"));
const admin_1 = __importDefault(require("./routes/admin"));
dotenv_1.default.config({ path: ".env.development" });
const app = (0, express_1.default)();
// ✅ CORS Configuration (Ensure WebSocket connection works)
const allowedOrigins = [
    "http://localhost:5173", // Your frontend URL
    "https://hosman-beta.netlify.app"
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// ✅ Explicitly handle CORS preflight requests
app.options("*", (0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// ✅ Create HTTP Server
const server = http_1.default.createServer(app);
// ✅ Initialize WebSocket Server (Socket.IO)
const io = new socket_io_1.Server(server, {
    cors: {
        origin: allowedOrigins, // ✅ Corrected frontend origin
        methods: ["GET", "POST"],
    },
});
// ✅ Attach WebSocket instance to `app.locals` for controllers
app.locals.io = io;
// ✅ Middleware
app.use(express_1.default.json());
(0, db_1.connectDb)();
app.use("/api/cart/v1/", cart_1.default);
app.use("/api/product/v1/", product_1.default);
app.use("/api/admin/v1/", admin_1.default);
// ✅ Start the server (IMPORTANT: Use `server.listen`)
const PORT = process.env.PORT || 5001; // ✅ Make sure this matches your frontend WebSocket connection
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
