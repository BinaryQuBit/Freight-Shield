// Express Import
import express from "express";

// Middleware Import
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

// Custom Imports
import {
    updateCompanyDetailsRegister,
    getLogBooks,
    createLogBook,
    getHomeScreen,
    acceptLoad,
    getLogBooks1,
    generateAndSendPDF,
    editLogBook,
    sendingLocation,
    workingHRS,
    getDriverSettings,
    // postLogBook,
} from "../controllers/driverController.js"

// CONST to use Router
const router = express.Router();

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get('/getlogbook', protect, getLogBooks);
router.get("/gethomescreen", protect, getHomeScreen);
router.get("/getlogbook1", protect, getLogBooks1);
router.get("/savepdf", protect, generateAndSendPDF);
router.get("/workinghrs", protect, workingHRS);
router.get("/driversettings", protect, getDriverSettings);

/////////////////////////////////////////////////////// POSTERS ///////////////////////////////////////////////////////
router.post('/createlogbook', protect, createLogBook);
// router.post("/postlogbook", protect, postLogBook);

/////////////////////////////////////////////////////// PUTTERS ///////////////////////////////////////////////////////
router.put("/register", protect, upload.fields([{ name: "driverLicenceFront", maxCount: 1 }, { name: "driverLicenceBack", maxCount: 1 }, { name: "driverAbstract", maxCount: 1 }]), updateCompanyDetailsRegister);
router.put("/acceptload", protect, acceptLoad);
router.put("/editlogbook/:id", protect, editLogBook);
router.put("/sendinglocation", protect, sendingLocation);

export default router;