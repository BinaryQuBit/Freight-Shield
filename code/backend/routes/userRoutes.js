// Backend routes to normal and protected pages
import express from "express";
import upload from "../middleware/upload.js";
import deleteFile from "../middleware/delete.js";
import {
  administrators,
  adminSettings,
  updateAdminSettings,
  approved,
  carriers,
  pending,
  updatePending,
  shippers,
} from "../controllers/AdminController.js";

import {
  carrierSettings,
  updateCarrierSettings,
  driverProfile,
  marketplace,
  myLoads,
  unitProfile,
} from "../controllers/CarrierController.js";

import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  passLoginInformation,
} from "../controllers/NewUserController.js";

import {
  activeLoads,
  history,
  postLoad,
  postTruck,
  shipperSettings,
  updateShipperSettings,
  trackLoad,
  updateShipperContactDetails,
  updateShipperBusinessDetails,
  proofBusiness,
  proofInsurance,
  removeProofBusiness,
  removeProofInsurance,
  updateLoad,
  removeAdditionalDocument,
  deleteLoad,
} from "../controllers/ShipperController.js";

import {
  protect,
  adminOnly,
  carrierOnly,
  shipperOnly,
  shipperDetailsComplete,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// @access for all
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.post("/forgotpassword", forgotPassword);

// @access only Admins
router.get("/administrators", protect, adminOnly, administrators);
router.get("/adminsettings", protect, adminOnly, adminSettings);
router.put("/adminsettings", protect, adminOnly, updateAdminSettings);
router.get("/approved", protect, adminOnly, approved);
router.get("/carriers", protect, adminOnly, carriers);
router.get("/pending", protect, adminOnly, pending);
router.put("/pending", protect, adminOnly, updatePending);
router.get("/shippers", protect, adminOnly, shippers);

// @access only Carrier
router.get("/carriersettings", protect, carrierOnly, carrierSettings);
router.put("/carriersettings", protect, carrierOnly, updateCarrierSettings);
router.get("/driverprofile", protect, carrierOnly, driverProfile);
router.get("/marketplace", protect, carrierOnly, marketplace);
router.get("/myloads", protect, carrierOnly, myLoads);
router.get("/unitprofile", protect, carrierOnly, unitProfile);

// @access only Shippers
router.get(
  "/activeloads",
  protect,
  shipperOnly,
  shipperDetailsComplete,
  activeLoads
);

router.get(
  "/history",
  protect,
  shipperOnly,
  shipperDetailsComplete,
  history
);

router.post(
  "/postload",
  upload.single('additionalDocument'),
  protect,
  shipperOnly,
  shipperDetailsComplete,
  postLoad
);

// Correct route definition
router.post("/unitprofile", protect, carrierOnly, postTruck);



router.get(
  "/shippersettings",
  protect,
  shipperOnly,
  shipperDetailsComplete,
  shipperSettings
);

router.put(
  "/shippersettings",
  protect,
  shipperOnly,
  shipperDetailsComplete,
  updateShipperSettings
);

router.get(
  "/trackload",
  protect,
  shipperOnly,
  shipperDetailsComplete,
  trackLoad
);

router.get(
  "/login",
  protect,
  passLoginInformation
);

router.put(
  "/shippercontactdetails",
  protect,
  shipperOnly,
  updateShipperContactDetails
);

router.put(
  "/shipperbusinessdetails",
  protect,
  shipperOnly,
  upload.fields([
    { name: "proofBusiness", maxCount: 1 },
    { name: "proofInsurance", maxCount: 1 },
  ]),
  updateShipperBusinessDetails
);

router.put(
  "/proofBusiness",
  protect,
  shipperOnly,
  upload.fields([{ name: "proofBusiness", maxCount: 1 }]),
  proofBusiness
);

router.delete(
  "/proofBusiness/:filename",
  protect,
  shipperOnly,
  deleteFile,
  removeProofBusiness
);

router.put(
  "/proofInsurance",
  protect,
  shipperOnly,
  upload.fields([{ name: "proofInsurance", maxCount: 1 }]), 
  proofInsurance
);

router.delete(
  "/proofInsurance/:filename",
  protect,
  shipperOnly,
  deleteFile,
  removeProofInsurance
);

router.put(
  "/postload/:id",
  protect,
  shipperOnly,
  upload.fields([{ name: "additionalDocument", maxCount: 1 }]),
  updateLoad,
)

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
