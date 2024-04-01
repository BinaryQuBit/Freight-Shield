// Express Import
import express from "express";

// Middleware Imports
import upload from "../middleware/upload.js";
// import {deleteFile} from "../middleware/delete.js";
import {
  protect,
  shipperOnly,
  status,
  deleteNotificationsBasedOnRole,
  shipperStatus,
} from "../middleware/authMiddleware.js";

// Custom Imports 
import {
  getActiveLoads,
  getPostLoad,
  getHistory,
  getShipperSettings,
  getShipperContactDetails,
  getShipperBusinessDetails,
  getShipperSubmission,
  shipperDasboard,
  postLoad,
  updateLoad,
  updateShipperContactDetails,
  updateShipperBusinessDetails,
  updateShipperSubmissionDetails,
  updateShipperStatus,
  deleteLoad,
  postShipperEvents,
  // deleteNotifications,
} from "../controllers/shipperController.js";

// CONST to use Router
const router = express.Router();

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get("/activeloads", protect, shipperStatus, shipperOnly, status, getActiveLoads);
router.get("/postload", protect, shipperStatus, shipperStatus, shipperOnly, status, getPostLoad);
router.get("/history", protect, shipperStatus, shipperOnly, status, getHistory);
router.get("/shippersettings", protect, shipperOnly, status, getShipperSettings);
router.get("/shippercontactdetails", protect, shipperOnly, getShipperContactDetails);
router.get("/shipperbusinessdetails", protect, shipperOnly, getShipperBusinessDetails);
router.get("/shippersubmission", protect, shipperOnly, getShipperSubmission);
router.get("/shipperdashboard", protect, shipperStatus, shipperOnly, shipperDasboard);

/////////////////////////////////////////////////////// POSTERS ///////////////////////////////////////////////////////
router.post("/postload", protect, shipperOnly, status, upload.single("additionalDocument"), postLoad);
router.post("/shipperevents", protect, shipperOnly, status, postShipperEvents);

/////////////////////////////////////////////////////// PUTTERS ///////////////////////////////////////////////////////
router.put("/postload/:id", protect, shipperOnly, status, upload.single("additionalDocument"), updateLoad);
router.put("/shippercontactdetails", protect, shipperOnly, updateShipperContactDetails);
router.put("/shipperbusinessdetails", protect, shipperOnly, upload.fields([{ name: "proofBusiness", maxCount: 1 }, { name: "proofInsurance", maxCount: 1 }]), updateShipperBusinessDetails);
router.put("/shippersubmissiondetails", protect, shipperOnly, upload.fields([{ name: "proofBusiness", maxCount: 1 }, { name: "proofInsurance", maxCount: 1 }]), updateShipperSubmissionDetails);
router.put("/shipperstatus", protect, shipperOnly, updateShipperStatus);

/////////////////////////////////////////////////////// DELETERS ///////////////////////////////////////////////////////
router.delete("/activeloads/:id/uploads/:filename", protect, shipperOnly, deleteLoad);
router.delete("/notifications/delete", protect, deleteNotificationsBasedOnRole);

export default router;
