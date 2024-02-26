// Driver Routes

import express from "express";
import upload from "../middleware/upload.js";

import { protect } from "../middleware/authMiddleware.js";
import {updateCompanyDetailsRegister} from "../controllers/driverController.js"
const router = express.Router();

/////////////////////////////////////////////////////// PUTTERS ///////////////////////////////////////////////////////
router.put("/companydetailsregister", protect, upload.fields([{ name: "driverLicence", maxCount: 1 }, { name: "driverAbstract", maxCount: 1 }]), updateCompanyDetailsRegister);

export default router;