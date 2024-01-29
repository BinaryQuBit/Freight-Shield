import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

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
  const user = await Admin.findById(req.user._id);

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
  const user = await Admin.findById(req.user._id);

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

export {
  administrators,
  adminSettings,
  updateAdminSettings,
  approved,
  carriers,
  pending,
  updatePending,
  shippers,
};
