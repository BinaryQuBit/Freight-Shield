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
    const collectionsToWatch = ["marketplaces", "carriers", "drivers", "admins", "shippers" ];

    collectionsToWatch.forEach((colName) => {
      const collection = db.collection(colName);
      const changeStream = collection.watch();
    
      changeStream.on("change", async (change) => {
        console.log(`Database change detected in ${colName}:`, change);

        if (colName === "shippers" && change.operationType === "update") {
          try {
            const ShipperInfo = await collection.findOne({ _id: change.documentKey._id });
            const ShipperEmail = ShipperInfo.email;
            change.shipperEmail = ShipperEmail;
          } catch (err) {
            console.error(`Error fetching Shipper Email ${colName}:`, err);
          }
        }

        if (colName === "carriers" && change.operationType === "update") {
          try {
            const CarrierInfo = await collection.findOne({ _id: change.documentKey._id });
            const CarrierEmail = CarrierInfo.email;
            change.carrierEmail = CarrierEmail;
          } catch (err) {
            console.error(`Error fetching Carrier Email ${colName}:`, err);
          }
        }

        if (colName === "admins" && change.operationType === "update") {
          try {
            const AdminInfo = await collection.findOne({ _id: change.documentKey._id });
            const AdminEmail = AdminInfo.email;
            change.adminEmail = AdminEmail;
          } catch (err) {
            console.error(`Error fetching Admin Email ${colName}:`, err);
          }
        }
    
        wss.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({ collection: colName, change }));
          }
        });
    
        // Admin Notification on Shippers
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
              // console.error("Error updating admin notifications", err);
            }
          }
        }

    







    // Admin Notification on Carriers
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
              // console.error("Error updating admin notifications", err);
            }
          }
        }





        // if (change.operationType === "update" && change.documentKey && change.documentKey._id) {
        //   const documentId = change.documentKey._id;
        //   try {
        //     const document = await collection.findOne({ _id: documentId });
    
        //     if (document && document.shipperEmail && document.status && document.pickUpCity && document.dropOffCity) {
        //       const description = `Status Update: ${document.status} (${document.pickUpCity} - ${document.dropOffCity})`;
        //       await Shipper.findOneAndUpdate(
        //         { email: document.shipperEmail },
        //         { $push: { notification: { description } } },
        //         { new: true }
        //       );
    
        //       console.log(`Notification added for shipper with email: ${document.shipperEmail}`);
        //     }
        //   } catch (err) {
        //     console.error("Error processing update for shippers", err);
        //   }
        // }

        // Shipper Notification on change status marketplace
        if (change.operationType === "update" && change.documentKey && change.documentKey._id) {
          const documentId = change.documentKey._id;
          try {
              if (change.updateDescription && change.updateDescription.updatedFields) {
                  // Log the fields that were updated to verify the behavior
                  // console.log('Updated fields:', change.updateDescription.updatedFields);
      
                  if (change.updateDescription.updatedFields.hasOwnProperty('status')) {
                      const document = await collection.findOne({ _id: documentId });
      
                      if (document && document.shipperEmail && document.status && document.pickUpCity && document.dropOffCity) {
                          const description = `Status Update: ${document.status} (${document.pickUpCity} - ${document.dropOffCity})`;
                          await Shipper.findOneAndUpdate(
                              { email: document.shipperEmail },
                              { $push: { notification: { description } } },
                              { new: true }
                          );
      
                          // console.log(`Notification added for shipper with email: ${document.shipperEmail}`);
                      }
                  } else {
                      // console.log('No status change detected, no notification added for shipper.');
                  }
              }
          } catch (err) {
              // console.error("Error processing update for shippers", err);
          }
      }
      
      




// Carrier notification on marketplace status
if (change.operationType === "update" && change.documentKey && change.documentKey._id) {
  const documentId = change.documentKey._id;
  try {
      if (change.updateDescription && change.updateDescription.updatedFields) {
          // Log the fields that were updated to verify the behavior
          // console.log('Updated fields:', change.updateDescription.updatedFields);

          if (change.updateDescription.updatedFields.hasOwnProperty('status')) {
              const document = await collection.findOne({ _id: documentId });

              if (document && document.carrierEmail && document.status && document.pickUpCity && document.dropOffCity) {
                  const description = `Status Update: ${document.status} (${document.pickUpCity} - ${document.dropOffCity})`;
                  await Carrier.findOneAndUpdate(
                      { email: document.carrierEmail },
                      { $push: { notification: { description } } },
                      { new: true }
                  );

                  // console.log(`Notification added for carrier with email: ${document.shipperEmail}`);
              }
          } else {
              // console.log('No status change detected, no notification added for carrier.');
          }
      }
  } catch (err) {
      // console.error("Error processing update for shippers", err);
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