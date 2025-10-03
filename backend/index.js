import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
dotenv.config();

import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import addressRouter from "./routes/address.routes.js";
import orderRouter from "./routes/order.routes.js";

import path from "path";

const app = express();
connectDB();

// middlewares
app.use(express.json());
app.use(cors({
  origin: "https://ecommerce-91p6.onrender.com",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(cookieParser());

// test route
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// static uploads
app.use("/uploads", express.static("uploads"));

// api routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// frontend build
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "frontend", "dist")));
app.use((req, res) => {
  res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
