// Admin Controller

import asyncHandler from "express-async-handler";

// @desc    Getting Administrators
// route    GET /administartors
// @access  Private
const administrators = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Pending
// route    GET /pending
// @access  Private
const pending = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
    };
  
    res.status(200).json({ user });
  });

// @desc    Getting Approved
// route    GET /approved
// @access  Private
const approved = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
    };
  
    res.status(200).json({ user });
  });

// @desc    Getting Shippers
// route    GET /shippers
// @access  Private
const shippers = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
    };
  
    res.status(200).json({ user });
  });

// @desc    Getting Carriers
// route    GET /carriers
// @access  Private
const carriers = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
    };
  
    res.status(200).json({ user });
  });

// @desc    Getting Carriers
// route    GET /carriers
// @access  Private
const adminsettings = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
    };
  
    res.status(200).json({ user });
  });

export { administrators, pending, approved, shippers, carriers, adminsettings }
