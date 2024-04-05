// Express Import
import express from "express";

// Middleware Import
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

// Custom Imports
import {
    updateDriverRegisteration,
    getLogBooks,
    getHomeScreen,
    acceptLoad,
    editLogBook,
    sendingLocation,
    getDriverSettings,
    updateDriverData,
    postInspection,
    postTime,
    deliverLoad,
} from "../controllers/driverController.js"

// CONST to use Router
const router = express.Router();

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get('/getlogbook', protect, getLogBooks);
router.get("/gethomescreen", protect, getHomeScreen);
router.get("/driversettings", protect, getDriverSettings);

/////////////////////////////////////////////////////// POSTERS ///////////////////////////////////////////////////////
router.post("/inspection", protect, postInspection);
router.put("/posttime", protect, postTime);

/////////////////////////////////////////////////////// PUTTERS ///////////////////////////////////////////////////////
router.put("/register", protect, upload.fields([{ name: "driverLicenceFront", maxCount: 1 }, { name: "driverLicenceBack", maxCount: 1 }, { name: "driverAbstract", maxCount: 1 }]), updateDriverRegisteration);
router.put("/acceptload", protect, acceptLoad);
router.put("/editlogbook/:id", protect, editLogBook);
router.put("/sendinglocation", protect, sendingLocation);
router.put("/updateDriverData", protect, upload.fields([{ name: "driverLicenceFront", maxCount: 1 }, { name: "driverLicenceBack", maxCount: 1 }, { name: "driverAbstract", maxCount: 1 }]), updateDriverData)
router.put("/deliverload", protect, deliverLoad);

export default router;