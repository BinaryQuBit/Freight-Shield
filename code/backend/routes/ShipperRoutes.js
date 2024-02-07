import express from "express";
import upload from "../middleware/upload.js";
import deleteFile from "../middleware/delete.js";

import {
  protect,
  shipperOnly,
  shipperDetailsComplete,
} from "../middleware/authMiddleware.js";

import { passLoginInformation } from "../controllers/NewUserController.js";

import {
  activeLoads,
  getPostLoad,
  history,
  postLoad,
  shipperContactDetails,
  shipperBusinessDetails,
  proofBusiness,
  proofInsurance,
  removeProofBusiness,
  removeProofInsurance,
  updateLoad,
  removeAdditionalDocument,
  deleteLoad,
  shipperSettings,
  shipperSubmission,
} from "../controllers/ShipperController.js";

const router = express.Router();

router.get("/postload", protect, shipperOnly, getPostLoad);
router.get("/login", protect, passLoginInformation);
router.get("/history", protect, shipperOnly, history);
router.get("/shippersettings", protect, shipperOnly, shipperSettings);
router.get("/shippersubmission", protect, shipperOnly, shipperSubmission);
router.get(
  "/activeloads",
  protect,
  shipperOnly,
  shipperDetailsComplete,
  activeLoads
);
router.post(
  "/postload",
  upload.single("additionalDocument"),
  protect,
  shipperOnly,
  shipperDetailsComplete,
  postLoad
);
router.put(
  "/shippercontactdetails",
  protect,
  shipperOnly,
  shipperContactDetails
);
router.put(
  "/shipperbusinessdetails",
  protect,
  shipperOnly,
  upload.fields([
    { name: "proofBusiness", maxCount: 1 },
    { name: "proofInsurance", maxCount: 1 },
  ]),
  shipperBusinessDetails
);
router.put(
  "/proofBusiness",
  protect,
  shipperOnly,
  upload.fields([{ name: "proofBusiness", maxCount: 1 }]),
  proofBusiness
);
router.put(
  "/proofInsurance",
  protect,
  shipperOnly,
  upload.fields([{ name: "proofInsurance", maxCount: 1 }]),
  proofInsurance
);
router.put(
  "/postload/:id",
  protect,
  shipperOnly,
  upload.fields([{ name: "additionalDocument", maxCount: 1 }]),
  updateLoad
);
router.delete(
  "/proofBusiness/:filename",
  protect,
  shipperOnly,
  deleteFile,
  removeProofBusiness
);
router.delete(
  "/proofInsurance/:filename",
  protect,
  shipperOnly,
  deleteFile,
  removeProofInsurance
);
router.delete(
  "/postload/:id/removeAdditionalDocument/:filename",
  protect,
  shipperOnly,
  deleteFile,
  removeAdditionalDocument
);
router.delete(
  "/activeloads/:id/:filename",
  protect,
  shipperOnly,
  deleteFile,
  deleteLoad
);

export default router;
