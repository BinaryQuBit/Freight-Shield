// Async Handler Import
import asyncHandler from "express-async-handler";
import Carrier from "../models/carrierModel.js";
import Shipper from "../models/shipperModel.js";
import Driver from "../models/driverModel.js";
import Admin from "../models/adminModel.js";

////////////////////////////// Getters //////////////////////////////

// @desc    Getting Administrators
// route    GET /api/administrators
// @access  Private
export const administrators = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };
  const adminList = await Admin.find({}, {
    password: 0,
  });
  res.status(200).json({
    user,
    administrators: adminList,
  });
});

// @desc    Getting Pending
// route    GET /api/pending
// @access  Private
export const pending = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };
  const adminList = await Admin.find({}, {
    password: 0,
  });
  res.status(200).json({
    user,
    administrators: adminList,
  });
});

// @desc    Getting Approved
// route    GET /api/approved
// @access  Private
export const approved = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
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
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };
  const shipperList = await Shipper.find({}, {
    password: 0,
    areContactDetailsComplete: 0,
    areBusinessDetailsComplete: 0, 
    isFormComplete: 0,
    events: 0,
    notification: 0,
  });
  res.status(200).json({
    user,
    shippers: shipperList,
  });
});

// @desc    Getting Carriers
// route    GET /api/carriers
// @access  Private
export const carriers = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };
  const carriers = await Carrier.find({}, {
    password: 0,
    areContactDetailsComplete: 0,
    areBusinessDetailsComplete: 0, 
    isFormComplete: 0,
    events: 0,
    notification: 0,
  });
  const carrierList = await Promise.all(carriers.map(async (carrier) => {
    const drivers = await Driver.find(
      { canadianCarrierCode: carrier.canadianCarrierCode },
      {
        password: 0,
        driverLoadStatus: 0,
        declineReason: 0,
        _id: 0,
        currentLoad: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );
    const driverObjects = drivers.map(driver => driver.toObject());
    return {
      ...carrier.toObject(),
      drivers: driverObjects,
    };
  }));
  res.status(200).json({
    user,
    carriers: carrierList,
  });
});

// @desc    Getting Admin Settings
// route    GET /api/adminsettings
// @access  Private
export const adminsettings = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };

  res.status(200).json({ user });
});

////////////////////////////// Putters //////////////////////////////
// @desc    Changing Status of carrier
// route    PUT /api/carriers/:carrierId
// @access  Private
export const updateCarrierStatus = asyncHandler(async (req, res) => {
  const carrierId = req.params.carrierId;
  const { status, statusReasonChange } = req.body;
  const validStatuses = ['Active', 'Inactive', 'Delete'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  if (status === 'Delete') {
    const deletedCarrier = await Carrier.findByIdAndDelete(carrierId);
    if (!deletedCarrier) {
      return res.status(404).json({ message: 'Carrier not found' });
    }
    return res.json({ message: 'Carrier deleted successfully' });
  }
  const carrier = await Carrier.findByIdAndUpdate(
    carrierId,
    { $set: { status, statusReasonChange } },
    { new: true }
  );
  if (!carrier) {
    return res.status(404).json({ message: 'Carrier not found' });
  }
  res.json(carrier);
});

// @desc    Changing Status of shipper
// route    PUT /api/shippers/:shipperId
// @access  Private
export const updateShipperStatus = asyncHandler(async (req, res) => {
  const shipperId = req.params.shipperId;
  const { status, statusReasonChange } = req.body;
  const validStatuses = ['Active', 'Inactive', 'Delete'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  if (status === 'Delete') {
    const deletedShipper = await Carrier.findByIdAndDelete(shipperId);
    if (!deletedShipper) {
      return res.status(404).json({ message: 'Shipper not found' });
    }
    return res.json({ message: 'Shipper deleted successfully' });
  }
  const shipper = await Shipper.findByIdAndUpdate(
    shipperId,
    { $set: { status, statusReasonChange } },
    { new: true }
  );
  if (!shipper) {
    return res.status(404).json({ message: 'Shipper not found' });
  }
  res.json(shipper);
});
