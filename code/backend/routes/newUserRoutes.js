import express from "express";

import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  verifyOTP,
} from "../controllers/newUserController.js";

const router = express.Router();

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get("/logout", logoutUser);

/////////////////////////////////////////////////////// POSTERS ///////////////////////////////////////////////////////
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgotpassword", forgotPassword);
router.post("/verifyOTP", verifyOTP);

export default router;
