// Backend Endpoints

import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/adminModel.js";
import Carrier from "../models/carrierModel.js";
import Shipper from "../models/shipperModel.js";
import SuperUser from "../models/superUser.js";
import Marketplace from "../models/marketplaceModel.js";

// @desc    Login and Authentication
// route    POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  const carrier = await Carrier.findOne({ email });
  const shipper = await Shipper.findOne({ email });
  const superUser = await SuperUser.findOne({ email });

  if (admin && await admin.matchPassword(password)) {
    generateToken(res, admin._id, "admin");
    return res.status(201).json({
      _id: admin._id,
      email: admin.email,
      role: "admin"
    });
  }

  if (carrier && await carrier.matchPassword(password)) {
    generateToken(res, carrier._id, "carrier");
    return res.status(201).json({
      _id: carrier._id,
      email: carrier.email,
      role: "carrier"
    });
  }

  if (shipper && await shipper.matchPassword(password)) {
    generateToken(res, shipper._id, "shipper");
    return res.status(201).json({
      _id: shipper._id,
      email: shipper.email,
      role: "shipper"
    });
  }

  if (superUser && await superUser.matchPassword(password)) {
    generateToken(res, superUser._id, "superUser");
    return res.status(201).json({
      _id: superUser._id,
      email: superUser.email,
      role: "superUser"
    });
  }

  res.status(400);
  throw new Error("Invalid email or password");
});

// @desc    Register a new user
// route    POST /api/users/register
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { role, email, password, confirmPassword } = req.body;

  const shipperExist = await Shipper.findOne({ email });
  const carrierExist = await Carrier.findOne({ email });

  if (shipperExist) {
    res.status(400);
    throw new Error("Shipper already exists");
  }

  if (carrierExist) {
    res.status(400);
    throw new Error("Carrier already exists");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Password dont match");
  }

  if (role == "shipper") {
    const shipper = await Shipper.create({
      email,
      password,
    });
    if (shipper) {
      generateToken(res, shipper._id);
      res.status(201).json({
        _id: shipper._id,
        email: shipper.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Shipper Data");
    }
  }

  if (role == "carrier") {
    const carrier = await Carrier.create({
      email,
      password,
    });
    if (carrier) {
      generateToken(res, carrier._id);
      res.status(201).json({
        _id: carrier._id,
        email: carrier.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Carrier Data");
    }
  }

  res.status(200).json({ message: "Register User" });
});

// @desc    Logout user and destroying cookie
// route    GET /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc    Forget Password
// route    POST /api/users/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User logged out" });
});

// @desc    Getting Administrators
// route    GET /api/users/administartors
// @access  Private
const administrators = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Admin Settings
// route    GET /api/users/adminSettings
// @access  Private
const adminSettings = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Update Admin Settings
// route    PUT /api/users/adminsettings
// @access  Private
const updateAdminSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

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
    throw new Error("User not found");
  }
  res.status(200).json({ message: "Admin Settings Updated" });
});

// @desc    Customers Approved
// route    GET /api/users/approved
// @access  Private
const approved = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Carriers List
// route    GET /api/users/carrier
// @access  Private
const carriers = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Pending List
// route    GET /api/users/pending
// @access  Private
const pending = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Either Accepting or Rejecting File
// route    PUT /api/users/updatepending
// @access  Private
const updatePending = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

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
    throw new Error("File Not Found");
  }
  res.status(200).json({ message: "Status Change" });
});

// @desc    Shippers List
// route    GET /api/users/shippers
// @access  Private
const shippers = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

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
  const user = await User.findById(req.user._id);

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
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
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

// @desc    Getting Active Loads
// route    Get /api/users/activeloads
// @access  Private
const activeLoads = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const loads = await Marketplace.find({ email: userEmail });

    res.status(200).json(loads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// @desc    Getting History
// route    GET /api/users/history
// @access  Private
const history = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Posting Load
// route    POST /api/users/postload
// @access  Private
const postLoad = asyncHandler(async (req, res) => {
  const {
    pickUpLocation,
    pickUpDate,
    pickUpTime,
    dropOffDate,
    dropOffTime,
    dropOffLocation,
    unitRequested,
    typeLoad,
    sizeLoad,
    additionalInformation,
    additionalDocument
  } = req.body;

  const postLoad = await Marketplace.create({
    email: req.user.email,
    pickUpLocation,
    pickUpDate,
    pickUpTime,
    dropOffDate,
    dropOffTime,
    dropOffLocation,
    unitRequested,
    typeLoad,
    sizeLoad,
    additionalInformation,
    additionalDocument,
  });

  res.status(200).json({ postLoad });
});


// @desc    Shipper Settings
// route    GET /api/users/shippersettings
// @access  Private
const shipperSettings = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Updating Shipper Settings
// route    PUT /api/users/shippersettings
// @access  Private
const updateShipperSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

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
  res.status(200).json({ message: "Shipper Settings Updated" });
});

// @desc    Track Load
// route    GET /api/users/trackload
// @access  Private
const trackLoad = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});



export {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  administrators,
  adminSettings,
  updateAdminSettings,
  approved,
  carriers,
  pending,
  updatePending,
  shippers,
  carrierSettings,
  updateCarrierSettings,
  driverProfile,
  marketplace,
  myLoads,
  unitProfile,
  activeLoads,
  history,
  postLoad,
  shipperSettings,
  updateShipperSettings,
  trackLoad,
};
