// Backend routes to normal and protected pages
import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  administrators,
  adminSettings,
  updateAdminSettings,
  approved,
  carriers,
  pending,
  updatePending,
  shippers,
  carrierSettings,
  updateCarrierSettings,
  driverProfile,
  marketplace,
  myLoads,
  unitProfile,
  activeLoads,
  history,
  postLoad,
  shipperSettings,
  updateShipperSettings,
  trackLoad,
} from "../controllers/userController.js";
import { protect, adminOnly, carrierOnly, shipperOnly } from '../middleware/authMiddleware.js';
const router = express.Router();

// @access for all
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.post("/forgotpassword", forgotPassword);

// @access only Admins
router.get("/administrators", protect, adminOnly, administrators);
router.get("/adminsettings", protect, adminOnly, adminSettings);
router.put("/adminsettings", protect, adminOnly, updateAdminSettings);
router.get("/approved", protect, adminOnly, approved);
router.get("/carriers", protect, adminOnly, carriers);
router.get("/pending", protect, adminOnly, pending);
router.put("/pending", protect, adminOnly, updatePending);
router.get("/shippers", protect, adminOnly, shippers);

// @access only Carrier
router.get("/carriersettings", protect, carrierOnly, carrierSettings);
router.put("/carriersettings", protect, carrierOnly, updateCarrierSettings);
router.get("/driverprofile", protect, carrierOnly, driverProfile);
router.get("/marketplace", protect, carrierOnly, marketplace);
router.get("/myloads", protect, carrierOnly, myLoads);
router.get("/unitprofile", protect, carrierOnly, unitProfile);

// @access only Shippers
router.get("/activeloads", protect, shipperOnly, activeLoads);
router.get("/history", protect, shipperOnly, history);
router.post("/postload", protect, shipperOnly, postLoad);
router.get("/shippersettings", protect, shipperOnly, shipperSettings);
router.put("/shippersettings", protect, shipperOnly, updateShipperSettings);
router.get("/trackload", protect, shipperOnly, trackLoad);

export default router;
