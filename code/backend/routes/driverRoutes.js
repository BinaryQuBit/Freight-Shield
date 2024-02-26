// Driver Routes

import express from "express";
import upload from "../middleware/upload.js";

import { protect } from "../middleware/authMiddleware.js";
import {updateCompanyDetailsRegister, getLogBooks, createLogBook, getFirstName, acceptLoad } from "../controllers/driverController.js"
const router = express.Router();

/////////////////////////////////////////////////////// PUTTERS ///////////////////////////////////////////////////////
router.put("/companydetailsregister", protect, upload.fields([{ name: "driverLicence", maxCount: 1 }, { name: "driverAbstract", maxCount: 1 }]), updateCompanyDetailsRegister);

router.post('/createlogbook',protect ,createLogBook);
router.get('/getlogbook', protect, getLogBooks);
router.get("/getFirstName", protect, getFirstName);
router.put("/acceptload", protect, acceptLoad);

export default router;