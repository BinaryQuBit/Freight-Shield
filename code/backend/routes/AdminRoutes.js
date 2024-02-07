import express from "express";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

import {
  administrators,
  pending,
  approved,
  shippers,
  carriers,
  adminsettings,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/administrators", protect, adminOnly, administrators);
router.get("/pending", protect, adminOnly, pending);
router.get("/approved", protect, adminOnly, approved);
router.get("/shippers", protect, adminOnly, shippers);
router.get("/carriers", protect, adminOnly, carriers);
router.get("/adminsettings", protect, adminOnly, adminsettings);

export default router;
