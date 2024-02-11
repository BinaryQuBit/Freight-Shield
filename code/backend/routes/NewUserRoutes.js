import express from "express";

import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
} from "../controllers/NewUserController.js";

const router = express.Router();

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get("/logout", logoutUser);

/////////////////////////////////////////////////////// POSTERS ///////////////////////////////////////////////////////
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgotpassword", forgotPassword);

export default router;
