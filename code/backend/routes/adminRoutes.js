// Express Import
import express from "express";

// Middleware Imports
import { protect, adminOnly } from "../middleware/authMiddleware.js";

// Custom Imports
import {
  administrators,
  pending,
  approved,
  shippers,
  carriers,
  adminsettings,
} from "../controllers/adminController.js";

// CONST to use Router
const router = express.Router();

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get("/administrators", protect, adminOnly, administrators);
router.get("/pending", protect, adminOnly, pending);
router.get("/approved", protect, adminOnly, approved);
router.get("/shippers", protect, adminOnly, shippers);
router.get("/carriers", protect, adminOnly, carriers);
router.get("/adminsettings", protect, adminOnly, adminsettings);

export default router;
