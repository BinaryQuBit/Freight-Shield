// Async Handler Import
import asyncHandler from "express-async-handler";

////////////////////////////// Getters //////////////////////////////

// @desc    Getting Administrators
// route    GET /api/administrators
// @access  Private
export const administrators = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Pending
// route    GET /api/pending
// @access  Private
export const pending = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Approved
// route    GET /api/approved
// @access  Private
export const approved = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Shippers
// route    GET /api/shippers
// @access  Private
export const shippers = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Carriers
// route    GET /api/carriers
// @access  Private
export const carriers = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Admin Settings
// route    GET /api/adminsettings
// @access  Private
export const adminsettings = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});
