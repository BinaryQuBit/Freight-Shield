// Express Import
import express from "express";

// Middleware Imports
import { protect, adminOnly, adminStatus, deleteNotificationsBasedOnRole } from "../middleware/authMiddleware.js";

// Custom Imports
import {
  administrators,
  shippers, 
  carriers,
  adminsettings,
  updateCarrierStatus,
  updateShipperStatus,
  updateAdminStatus,
  updateAdminSettings,
} from "../controllers/adminController.js";

// CONST to use Router
const router = express.Router();

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get("/administrators", protect, adminStatus, adminOnly, administrators);
router.get("/shippers", protect, adminStatus, adminOnly, shippers);
router.get("/carriers", protect, adminStatus, adminOnly, carriers);
router.get("/adminsettings", protect, adminOnly, adminsettings);

/////////////////////////////////////////////////////// PUTERS ///////////////////////////////////////////////////////
router.put("/carriers/:carrierId", protect, adminStatus, adminOnly, updateCarrierStatus);
router.put("/shippers/:shipperId", protect, adminStatus, adminOnly, updateShipperStatus);
router.put("/administrators/:adminId", protect, adminStatus, adminOnly, updateAdminStatus);
router.put("/editadmin", protect, adminOnly, adminStatus, updateAdminSettings);

/////////////////////////////////////////////////////// DELETERS ///////////////////////////////////////////////////////
router.delete("/notifications/delete", protect, deleteNotificationsBasedOnRole);

export default router;
