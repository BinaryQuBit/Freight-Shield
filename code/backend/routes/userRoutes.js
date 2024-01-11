import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  activeLoads,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/logout", logoutUser);
router.get("/activeloads", protect, activeLoads);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
