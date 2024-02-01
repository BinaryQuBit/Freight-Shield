import asyncHandler from "express-async-handler";
import Carrier from "../models/carrierModel.js";
import Marketplace from "../models/marketplaceModel.js";

// @desc    Carrier Settings
// route    GET /api/users/shippers
// @access  Private
const carrierSettings = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Updating Carrier Settings
// route    PUT /api/users/carriersettings
// @access  Private
const updateCarrierSettings = asyncHandler(async (req, res) => {
  const user = await Carrier.findById(req.user._id);

  if (user) {
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
  res.status(200).json({ message: "Carrier Settings Updated" });
});

// @desc    Getting Driver Profiles
// route    GET /api/users/driverprofile
// @access  Private
const driverProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Marketplace
// route    GET /api/users/marketplace
// @access  Private
const marketplace = asyncHandler(async (req, res) => {
  const allLoads = await Marketplace.find();

  const response = {
    _id: req.user._id,
    email: req.user.email,
    loads: allLoads,
  };

  res.status(200).json(response);
});

// @desc    Getting myloads
// route    GET /api/users/myloads
// @access  Private
const myLoads = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Unit Profiles
// route    GET /api/users/unitprofiles
// @access  Private
const unitProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

export {
  carrierSettings,
  updateCarrierSettings,
  driverProfile,
  marketplace,
  myLoads,
  unitProfile,
};
