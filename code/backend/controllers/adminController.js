// Test to update name
import asyncHandler from "express-async-handler";

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

// @desc    Getting Pending
// route    GET /api/users/pending
// @access  Private
const pending = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
    };
  
    res.status(200).json({ user });
  });

// @desc    Getting Approved
// route    GET /api/users/approved
// @access  Private
const approved = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
    };
  
    res.status(200).json({ user });
  });

// @desc    Getting Shippers
// route    GET /api/users/shippers
// @access  Private
const shippers = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
    };
  
    res.status(200).json({ user });
  });

// @desc    Getting Carriers
// route    GET /api/users/carriers
// @access  Private
const carriers = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
    };
  
    res.status(200).json({ user });
  });

// @desc    Getting Carriers
// route    GET /api/users/carriers
// @access  Private
const adminsettings = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
    };
  
    res.status(200).json({ user });
  });

export { administrators, pending, approved, shippers, carriers, adminsettings }
