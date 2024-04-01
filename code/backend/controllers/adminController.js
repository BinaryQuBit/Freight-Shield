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
    status: req.user.status,
  };

  const admin = await Admin.findOne({ email: user.email });
  user.notification = admin.notification;

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const adminList = await Admin.find({}, {
    password: 0,
  });

  const status = {
    adminStatus: admin.adminStatus,
  };

  res.status(200).json({
    user,
    administrators: adminList,
    status,
  });
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
    status: req.user.status,
  };
  const admin = await Admin.findOne({ email: user.email });
  user.notification = admin.notification;

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
    status: req.user.status,
  };
  const admin = await Admin.findOne({ email: user.email });
  user.notification = admin.notification;
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
    status: req.user.status,
  };
  const admin = await Admin.findOne({ email: user.email });
  user.notification = admin.notification;
  if (!admin) {
return res.status(404).json({ message: "Admin not found" }); 
}
const response = {
firstName: admin.firstName,
lastName: admin.lastName,
phoneNumber: admin.phoneNumber,
email: admin.email,
status: admin.status,
statusReasonChange: admin.statusReasonChange,
};
res.status(200).json({ user, response }); 
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

// @desc    Changing Status of admin
// route    PUT /api/administrators/:adminId
// @access  Private
export const updateAdminStatus = asyncHandler(async (req, res) => {
  const adminId = req.params.adminId;
  const { status, statusReasonChange } = req.body;
  const validStatuses = ['Active', 'Inactive', 'Delete'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  if (status === 'Delete') {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    return res.json({ message: 'Admin deleted successfully' });
  }
  const admin = await Admin.findByIdAndUpdate(
    adminId,
    { $set: { status, statusReasonChange } },
    { new: true }
  );
  if (!admin) {
    return res.status(404).json({ message: 'Admin not found' });
  }
  res.json(admin);
});

// @desc    Updating Settings for Admin
// route    PUT /api/editadmin
// @access  Private
export const updateAdminSettings = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    const { email, firstName, lastName, phoneNumber } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      _id,
      { $set: { email, firstName, lastName, phoneNumber } },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error("Update Admin Settings Error:", error);
    res.status(500).json({ message: error.message });
  }
});

