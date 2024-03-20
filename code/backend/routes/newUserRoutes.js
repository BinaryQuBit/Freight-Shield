// Express Import
import express from "express";

// Custom Imports
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  verifyOTP,
  news,
} from "../controllers/newUserController.js";

// CONST to use Router
const router = express.Router(); 

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get("/logout", logoutUser);
router.get("/news", news);

/////////////////////////////////////////////////////// POSTERS ///////////////////////////////////////////////////////
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgotpassword", forgotPassword);
router.post("/verifyOTP", verifyOTP);

export default router;
