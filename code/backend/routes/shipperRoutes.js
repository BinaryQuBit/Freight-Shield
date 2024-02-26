// Shipper Routes

import express from "express";
import upload from "../middleware/upload.js";
import deleteFile from "../middleware/delete.js";

import {
  protect,
  shipperOnly,
  status,
} from "../middleware/authMiddleware.js";

import {
  getActiveLoads,
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
  removeProofBusiness,
  removeProofInsurance,
  removeAdditionalDocument,
  deleteLoad,
} from "../controllers/shipperController.js";

const router = express.Router();

/////////////////////////////////////////////////////// GETTERS ///////////////////////////////////////////////////////
router.get("/activeloads", protect, shipperOnly, status, getActiveLoads);
router.get("/postload", protect, shipperOnly, status);
router.get("/history", protect, shipperOnly, status, getHistory);
router.get("/shippersettings", protect, shipperOnly, status, getShipperSettings);
router.get("/shippercontactdetails", protect, shipperOnly, getShipperContactDetails);
router.get("/shipperbusinessdetails", protect, shipperOnly, getShipperBusinessDetails);
router.get("/shippersubmission", protect, shipperOnly, getShipperSubmission);
router.get("/shipperDashboard", protect, shipperOnly, shipperDasboard);

/////////////////////////////////////////////////////// POSTERS ///////////////////////////////////////////////////////
router.post("/postload", upload.single("additionalDocument"), protect, shipperOnly, status, postLoad);

/////////////////////////////////////////////////////// PUTTERS ///////////////////////////////////////////////////////
router.put("/postload/:id", protect, shipperOnly, status, upload.fields([{ name: "additionalDocument", maxCount: 1 }]), updateLoad);
router.put("/shippercontactdetails", protect, shipperOnly, updateShipperContactDetails);
router.put("/shipperbusinessdetails", protect, shipperOnly, upload.fields([{ name: "proofBusiness", maxCount: 1 }, { name: "proofInsurance", maxCount: 1 }]), updateShipperBusinessDetails);
router.put("/shippersubmissiondetails", protect, shipperOnly, upload.fields([{ name: "proofBusiness", maxCount: 1 }, { name: "proofInsurance", maxCount: 1 }]), updateShipperSubmissionDetails);
router.put("/shipperstatus", protect, shipperOnly, updateShipperStatus);

/////////////////////////////////////////////////////// DELETERS ///////////////////////////////////////////////////////
router.delete("/proofBusiness/:filename", protect, shipperOnly, deleteFile, removeProofBusiness);
router.delete("/proofInsurance/:filename", protect, shipperOnly, deleteFile, removeProofInsurance);
router.delete("/postload/:id/removeAdditionalDocument/:filename", protect, shipperOnly, deleteFile, removeAdditionalDocument);
router.delete("/activeloads/:id/:filename", protect, shipperOnly, deleteFile, deleteLoad);

export default router;
