// Express Import
import express from "express";

// Middleware Imports
import upload from "../middleware/upload.js";
import { protect, carrierOnly, status } from "../middleware/authMiddleware.js";

// Custom Imports
import {
  getMarketplace,
  getMyLoads,
  getDriverProfiles,
  getUnitProfiles,
  getCarrierSettings,
  getCarrierContactDetails,
  getCarrierBusinessDetails,
  getCarrierSubmission,
  postUnit,
  updateAssignUnit, 
  updateCarrierContactDetails,
  updateCarrierBusinessDetails,
  updateCarrierSubmissionDetails,
  updateCarrierStatus,
  updateDriverStatus,
  updateDriverStatusLoad,
  carrierDasboard,
  postCarrierEvents,
  deleteUnit,
  updateUnit,
  // getUnitDriver,
} from "../controllers/carrierController.js"; 

// CONST to use Router
const router = express.Router();

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get("/marketplace", protect, carrierOnly, status, getMarketplace);
router.get("/myloads", protect, carrierOnly, status, getMyLoads);
router.get("/driverprofiles", protect, carrierOnly, status, getDriverProfiles);
router.get("/unitprofiles", protect, carrierOnly, status, getUnitProfiles);
router.get("/carriersettings", protect, carrierOnly, getCarrierSettings);
router.get("/carriercontactdetails", protect, carrierOnly, getCarrierContactDetails);
router.get("/carrierbusinessdetails", protect, carrierOnly, getCarrierBusinessDetails);
router.get("/carriersubmission", protect, carrierOnly, getCarrierSubmission);
router.get("/carrierdashboard", protect, carrierOnly, carrierDasboard);
// router.get("/getunitdriver", protect, carrierOnly, getUnitDriver);

/////////////////////////////////////////////////////// POSTERS ///////////////////////////////////////////////////////
router.post("/postunit", upload.fields([{ name: "unitRegistration", maxCount: 1 }, { name: "unitInsurance", maxCount: 1 }, { name: "unitSafety", maxCount: 1 }]), protect, carrierOnly, status, postUnit);
router.post("/carrierevents", protect, carrierOnly, status, postCarrierEvents);

/////////////////////////////////////////////////////// PUTTERS ///////////////////////////////////////////////////////
router.put("/marketplace/:id", protect, carrierOnly, status, updateAssignUnit);
router.put("/carriercontactdetails", protect, carrierOnly, updateCarrierContactDetails);
router.put("/carrierbusinessdetails", protect, carrierOnly, upload.fields([{ name: "carrierProfile", maxCount: 1 }, { name: "safetyFitnessCertificate", maxCount: 1 }]), updateCarrierBusinessDetails);
router.put("/carriersubmissiondetails", protect, carrierOnly, upload.fields([{ name: "carrierProfile", maxCount: 1 }, { name: "safetyFitnessCertificate", maxCount: 1 }]), updateCarrierSubmissionDetails);
router.put("/carrierstatus", protect, carrierOnly, updateCarrierStatus);
router.put("/updatedriverstatus/:driverId", protect, carrierOnly, status, updateDriverStatus); 
router.put("/updatedriverstatusload", protect, carrierOnly, status, updateDriverStatusLoad);
router.put("/updateunit/:unitNum", upload.fields([{ name: "unitRegistration", maxCount: 1 }, { name: "unitSafety", maxCount: 1 }, { name: "unitInsurance", maxCount: 1 }]), protect, carrierOnly, status, updateUnit);

/////////////////////////////////////////////////////// DELETERS ///////////////////////////////////////////////////////
router.delete("/units/:unitNumber", protect, carrierOnly, status, deleteUnit);

export default router;
