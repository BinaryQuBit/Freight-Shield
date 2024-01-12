// Backend routes to normal and protected pages
import express from "express";
const router = express.Router();
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
import { protect } from "../middleware/authMiddleware.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.post("/forgotpassword", forgotPassword);
router.get("/administrators", protect, administrators);
router.get("/adminsettings", protect, adminSettings);
router.put("/adminsettings", protect, updateAdminSettings);
router.get("/approved", protect, approved);
router.get("/carriers", protect, carriers);

router.get("/pending", protect, pending);
router.put("/pending", protect, updatePending);
router.get("/shippers", protect, shippers);
router.get("/carriersettings", protect, carrierSettings);
router.put("/carriersettings", protect, updateCarrierSettings);
router.get("/driverprofile", protect, driverProfile);
router.get("/marketplace", protect, marketplace);
router.get("/myloads", protect, myLoads);
router.get("/unitprofile", protect, unitProfile);
router.get("/activeloads", protect, activeLoads);
router.get("/history", protect, history);
router.post("/postload", protect, postLoad);
router.get("/shippersettings", protect, shipperSettings);
router.put("/shippersettings", protect, updateShipperSettings);
router.get("/trackload", protect, trackLoad);

export default router;
