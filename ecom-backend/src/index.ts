import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import cors from "cors";
import http from "http"; // ✅ Import HTTP module
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import cartRoutes from "./routes/cart";
import productRoutes from "./routes/product";

dotenv.config({ path: ".env.development" });

const app = express();

// ✅ CORS Configuration (Ensure WebSocket connection works)
const allowedOrigins = [
  "http://localhost:5174", // Your frontend URL
  "https://hosman-beta.netlify.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Explicitly handle CORS preflight requests
app.options("*", cors()); 
app.use(cookieParser());

// ✅ Create HTTP Server
const server = http.createServer(app);

// ✅ Initialize WebSocket Server (Socket.IO)
const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // ✅ Corrected frontend origin
    methods: ["GET", "POST"],
  },
});

// ✅ Attach WebSocket instance to `app.locals` for controllers
app.locals.io = io;

// ✅ Middleware
app.use(express.json());
connectDb();
app.use("/api/cart/v1/", cartRoutes);
app.use("/api/product/v1/", productRoutes);



// ✅ Start the server (IMPORTANT: Use `server.listen`)
const PORT = process.env.PORT || 5001; // ✅ Make sure this matches your frontend WebSocket connection
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
