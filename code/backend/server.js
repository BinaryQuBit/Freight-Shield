import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import AdminRoutes from "./routes/adminRoutes.js";
import CarrierRoutes from "./routes/carrierRoutes.js";
import DriverRoutes from "./routes/driverRoutes.js";
import NewUserRoutes from "./routes/newUserRoutes.js";
import ShipperRoutes from "./routes/shipperRoutes.js";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(NewUserRoutes);
app.use("/api", AdminRoutes);
app.use("/api", CarrierRoutes);
app.use("/api", DriverRoutes);
app.use("/api", ShipperRoutes);

const frontendPath = path.join(__dirname, "public");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(({ nativeClient }) => {
    const server = http.createServer(app);
    const wss = new WebSocketServer({ server });
    const db = nativeClient.db(process.env.DB_NAME);
    const collectionsToWatch = ["marketplaces", "carriers", "drivers"];
    collectionsToWatch.forEach((colName) => {
      const collection = db.collection(colName);
      const changeStream = collection.watch();
      changeStream.on("change", (change) => {
        console.log(`Database change detected in ${colName}:`, change);
        wss.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({ collection: colName, change }));
          }
        });
      });
    });
    wss.on("connection", (ws) => {
      console.log("Client connected");
      ws.on("message", (message) => {
        console.log("Received message:", message);
      });
      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });
    const frontendPath = path.join(__dirname, "public");
    app.use(express.static(frontendPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
