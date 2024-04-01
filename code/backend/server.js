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
import Carrier from './models/carrierModel.js';
import Shipper from "./models/shipperModel.js"
import Admin from "./models/adminModel.js"

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
    const collectionsToWatch = ["marketplaces", "carriers", "drivers", "admins", "shippers"];

    collectionsToWatch.forEach((colName) => {
      const collection = db.collection(colName);
      const changeStream = collection.watch();
    
      changeStream.on("change", async (change) => {
        console.log(`Database change detected in ${colName}:`, change);
    
        wss.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({ collection: colName, change }));
          }
        });
    
        if (colName === "shippers" && change.operationType === "insert") {
          const { email } = change.fullDocument;
    
          if (email) {
            const description = `New Shipper: ${email}`;
    
            try {
              const admins = await Admin.find({});
              const notificationPromises = admins.map(async (admin) => {
                await Admin.findByIdAndUpdate(
                  admin._id,
                  { $push: { notification: { description } } },
                  { new: true }
                );
              });
              await Promise.all(notificationPromises);
            } catch (err) {
              console.error("Error updating admin notifications", err);
            }
          }
        }

    







    
        // If the change is in the carriers collection and involves an update
        if (colName === "carriers" && change.operationType === "insert") {
          const { email } = change.fullDocument;
    
          // Check if isFormComplete was updated and construct notification description
          if (email) {
            const description = `New Carrier: ${email}`;
    
            // Push the notification to all admin documents
            try {
              const admins = await Admin.find({});
              const notificationPromises = admins.map(async (admin) => {
                await Admin.findByIdAndUpdate(
                  admin._id,
                  { $push: { notification: { description } } },
                  { new: true }
                );
              });
              await Promise.all(notificationPromises);
            } catch (err) {
              console.error("Error updating admin notifications", err);
            }
          }
        }





        if (change.operationType === "update" && change.documentKey && change.documentKey._id) {
          const documentId = change.documentKey._id;
          try {
            const document = await collection.findOne({ _id: documentId });
    
            if (document && document.shipperEmail && document.status && document.pickUpCity && document.dropOffCity) {
              const description = `Status Update: ${document.status} (${document.pickUpCity} - ${document.dropOffCity})`;
              await Shipper.findOneAndUpdate(
                { email: document.shipperEmail },
                { $push: { notification: { description } } },
                { new: true }
              );
    
              console.log(`Notification added for shipper with email: ${document.shipperEmail}`);
            }
          } catch (err) {
            console.error("Error processing update for shippers", err);
          }
        }





        if (change.operationType === "update" && change.documentKey && change.documentKey._id) {
          const documentId = change.documentKey._id;
          try {
            const document = await collection.findOne({ _id: documentId });
    
            if (document && document.carrierEmail && document.status && document.pickUpCity && document.dropOffCity) {
              const description = `Status Update: ${document.status} (${document.pickUpCity} - ${document.dropOffCity})`;
              await Carrier.findOneAndUpdate(
                { email: document.carrierEmail },
                { $push: { notification: { description } } },
                { new: true }
              );
    
              console.log(`Notification added for carrier with email: ${document.carrierEmail}`);
            }
          } catch (err) {
            console.error("Error processing update for carrier", err);
          }
        }







      });
    });







    // WebSocket server event handling
    wss.on("connection", (ws) => {
      console.log("Client connected");
      ws.on("message", (message) => {
        console.log("Received message:", message);
      });
      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });

    // Serve the frontend application
    const frontendPath = path.join(__dirname, "public");
    app.use(express.static(frontendPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });

    // Start the server
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });