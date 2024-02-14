// Test to update name
import express from "express";

import { protect, carrierOnly } from "../middleware/authMiddleware.js";

import {
  marketplace,
  unitProfile,
  addUnit,
  assignUnit,
  myLoads,
  driverProfiles,
  unitProfiles,
  carrierSettings,
  carrierBusinessDetails,
  carrierCompanyDetails,
  carrierSubmission,
} from "../controllers/CarrierController.js";

const router = express.Router();

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get("/marketplace", protect, carrierOnly, marketplace);
router.get("/myloads", protect, carrierOnly, myLoads);
router.get("/driverprofiles", protect, carrierOnly, driverProfiles);
router.get("/unitprofiles", protect, carrierOnly, unitProfiles);
router.get("/carriersettings", protect, carrierOnly, carrierSettings);
router.get("/carrierbusinessdetails", protect, carrierOnly, carrierBusinessDetails);
router.get("/carriercontactdetails", protect, carrierOnly, carrierCompanyDetails);
router.get("/carriersubmission", protect, carrierOnly, carrierSubmission);

/////////////////////////////////////////////////////// POSTERS ///////////////////////////////////////////////////////
router.post("/addunit", protect, carrierOnly, addUnit);

/////////////////////////////////////////////////////// PUTTERS ///////////////////////////////////////////////////////
router.put("/marketplace/:id", protect, carrierOnly, assignUnit);

export default router;
