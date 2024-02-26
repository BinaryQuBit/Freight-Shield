// Driver Routes

import express from "express";
import upload from "../middleware/upload.js";

import { protect } from "../middleware/authMiddleware.js";
import {updateCompanyDetailsRegister, getLogBooks, createLogBook } from "../controllers/driverController.js"
const router = express.Router();

/////////////////////////////////////////////////////// PUTTERS ///////////////////////////////////////////////////////
router.put("/companydetailsregister", protect, upload.fields([{ name: "driverLicence", maxCount: 1 }, { name: "driverAbstract", maxCount: 1 }]), updateCompanyDetailsRegister);

router.post('/createlogbook',protect ,createLogBook);
router.get('/getlogbook', getLogBooks);


export default router;