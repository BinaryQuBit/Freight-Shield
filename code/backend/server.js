// Test to update name
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import AdminRoutes from "./routes/adminRoutes.js";
import CarrierRoutes from "./routes/carrierRoutes.js";
// import DriverRoutes from "./routes/driverRoutes.js";
import NewUserRoutes from "./routes/newUserRoutes.js";
import ShipperRoutes from "./routes/shipperRoutes.js";
// import SuperUserRoutes from "./routes/superUserRoutes.js.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", AdminRoutes);
app.use("/api/users", CarrierRoutes);
// app.use("/api/users", DriverRoutes);
app.use("/api/users", NewUserRoutes);
app.use("/api/users", ShipperRoutes);
// app.use("/api/users", SuperUserRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

connectDB();

app.get("/", (req, res) => res.send("Server is ready"));
