import asyncHandler from "express-async-handler";
import Carrier from "../models/carrierModel.js";
import Marketplace from "../models/marketplaceModel.js";

////////////////////////////// Getters //////////////////////////////

// @desc    Getting Marketplace
// route    GET /marketplace
// @access  Private
const marketplace = asyncHandler(async (req, res) => {
  const pendingLoads = await Marketplace.find({ status: "Pending" });

  const response = {
    loads: pendingLoads,
  };

  res.status(200).json(response);
});

// @desc    Getting Unit Profiles
// route    GET /unitprofiles
// @access  Private
const unitProfile = asyncHandler(async (req, res) => {
  const email = req.user.email;

  const carrier = await Carrier.findOne({ email });

  if (!carrier) {
    res.status(404).json({ message: "Carrier not found." });
    return;
  }

  res.status(200).json({ units: carrier.units });
});

// @desc    Getting My Loads
// route    GET /myloads
// @access  Private
const myLoads = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Driver Profiles
// route    GET /driverprofiles
// @access  Private
const driverProfiles = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Unit Profiles
// route    GET /unitprofiles
// @access  Private
const unitProfiles = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Carrier Settings
// route    GET /carriersettings
// @access  Private
const carrierSettings = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Carrier Business Details
// route    GET /carrierbusinessdetails
// @access  Private
const carrierBusinessDetails = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Carrier Company Details
// route    GET /carriercompanydetails
// @access  Private
const carrierCompanyDetails = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Carrier Submission
// route    GET /carriersubmission
// @access  Private
const carrierSubmission = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

////////////////////////////// Posters //////////////////////////////

// @desc    Adding Unit Profiles
// route    POST /addunit
// @access  Private
const addUnit = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const unitData = req.body;

  if (!email || !unitData) {
    res.status(400).json({ message: "Email and unit data are required." });
    return;
  }

  const carrier = await Carrier.findOne({ email });
  if (!carrier) {
    res.status(404).json({ message: "Carrier not found." });
    return;
  }

  try {
    await carrier.addUnit(unitData);
    res.status(200).json({ message: "Unit added successfully", carrier });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

////////////////////////////// Putters //////////////////////////////

// @desc    Assigning Unit
// route    PUT /marketplace/:id
// @access  Private
const assignUnit = asyncHandler(async (req, res) => {
  const loadId = req.params.id;
  const carrierEmail = req.user.email;
  const { status, assignedUnit } = req.body;

  const updatedLoad = await Marketplace.findByIdAndUpdate(
    loadId,
    {
      $set: {
        status: status,
        assignedUnit: assignedUnit,
        carrierEmail: carrierEmail,
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedLoad) {
    return res.status(404).json({ message: "Load not found." });
  }

  res
    .status(200)
    .json({ message: "Load updated successfully", load: updatedLoad });
});

export {
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
};
