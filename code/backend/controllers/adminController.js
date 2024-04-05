// Async Handler Import
import asyncHandler from "express-async-handler";

// Model Imports
import Carrier from "../models/carrierModel.js";
import Shipper from "../models/shipperModel.js";
import Driver from "../models/driverModel.js";
import Admin from "../models/adminModel.js";

////////////////////////////// GETTERS //////////////////////////////

// @desc    Getting Administrators
// route    GET /api/administrators
// @access  Private
export const administrators = asyncHandler(async (req, res) => {
  // Getting User Information from Cookie
  const user = {
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    status: req.user.status,
  };

  // Getting in Session User Information
  const admin = await Admin.findOne({ email: user.email });
  const notification = admin.notification;
  const status = {
    adminStatus: admin.adminStatus,
  };

  // Getting All admins except restrictions listed below
  const adminList = await Admin.find(
    {},
    {
      password: 0,
      createdAt: 0,
      notification: 0,
      updatedAt: 0,
      statusReasonChange: 0,
      __v: 0,
    }
  );

  // Response
  res.status(200).json({
    user,
    administrators: adminList,
    status,
    notification,
    email: user.email,
  });
});

// @desc    Getting Shippers
// route    GET /api/shippers
// @access  Private
export const shippers = asyncHandler(async (req, res) => {
  // Getting User Information from Cookie
  const user = {
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    status: req.user.status,
  };

  // Getting in Session User Information
  const admin = await Admin.findOne({ email: user.email });
  const notification = admin.notification;

  // Getting All Shippers except restrictions listed below
  const shipperList = await Shipper.find(
    {},
    {
      password: 0,
      areContactDetailsComplete: 0,
      areBusinessDetailsComplete: 0,
      isFormComplete: 0,
      events: 0,
      notification: 0,
      createdAt: 0,
      statusReasonChange: 0,
      updatedAt: 0,
      __v: 0,
    }
  );

  // Response
  res.status(200).json({
    user,
    shippers: shipperList,
    notification,
    email: user.email,
  });
});

// @desc    Getting Carriers
// route    GET /api/carriers
// @access  Private

export const carriers = asyncHandler(async (req, res) => {
  // Getting User Information from Cookie
  const user = {
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    status: req.user.status,
  };

  // Getting in Session User Information
  const admin = await Admin.findOne({ email: user.email });
  const notification = admin.notification;

  // Getting All Shippers except restrictions listed below
  const carriers = await Carrier.find(
    {},
    {
      password: 0,
      areContactDetailsComplete: 0,
      areBusinessDetailsComplete: 0,
      isFormComplete: 0,
      events: 0,
      notification: 0,
      statusReasonChange: 0,
      updatedAt: 0,
      createdAt: 0,
      __v: 0,
    }
  );

  // Getting All Carriers except restrictions listed below
  const carrierList = await Promise.all(
    carriers.map(async (carrier) => {
      // Getting Drivers
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
      // Mapping Drivers and converting to JS objects
      const driverObjects = drivers.map((driver) => driver.toObject());
      return {
        ...carrier.toObject(),
        drivers: driverObjects,
      };
    })
  );

  // Response
  res.status(200).json({
    user,
    carriers: carrierList,
    notification,
    email: user.email,
  });
});

// @desc    Getting Admin Settings
// route    GET /api/adminsettings
// @access  Private
export const adminsettings = asyncHandler(async (req, res) => {
  // Getting User Information from Cookie
  const user = {
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    status: req.user.status,
  };

  // Getting in Session User Information
  const admin = await Admin.findOne({ email: user.email });
  const notification = admin.notification;

  // Response Construct into Object
  const response = {
    firstName: admin.firstName,
    lastName: admin.lastName,
    phoneNumber: admin.phoneNumber,
    email: admin.email,
    status: admin.status,
    statusReasonChange: admin.statusReasonChange,
  };

  // Response
  res.status(200).json({ user, response, notification, email: user.email });
});

////////////////////////////// PUTTERS //////////////////////////////

// @desc    Changing Status of carrier
// route    PUT /api/carriers/:carrierId
// @access  Private
export const updateCarrierStatus = asyncHandler(async (req, res) => {
  // Getting Carrier Id that needs the Status change
  const carrierId = req.params.carrierId;

  // Requesting New Status and Reason for Status Change
  const { status, statusReasonChange } = req.body;

  // Only these Statuses are allowed
  const validStatuses = ["Active", "Inactive", "Delete"];

  // Invalid Status throw an error
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  // If the Status is Delete then delete document
  if (status === "Delete") {
    // Find the Carrier
    const deletedCarrier = await Carrier.findByIdAndDelete(carrierId);

    // If Carrier is not in the list throw an error
    if (!deletedCarrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    // Else Carrier Deleted successfully
    return res.json({ message: "Carrier deleted successfully" });
  }

  // Other Statuses Handle
  const carrier = await Carrier.findByIdAndUpdate(
    // Find the carrierId
    carrierId,

    // do a PUT method to Status and Status Change Reason
    { $set: { status, statusReasonChange } },
    { new: true }
  );

  // If there is no Carrier through error message
  if (!carrier) {
    return res.status(404).json({ message: "Carrier not found" });
  }
  res.json(carrier);
});

// @desc    Changing Status of shipper
// route    PUT /api/shippers/:shipperId
// @access  Private
export const updateShipperStatus = asyncHandler(async (req, res) => {
  // Getting Shipper Id that needs the Status change
  const shipperId = req.params.shipperId;

  // Requesting New Status and Reason for Status Change
  const { status, statusReasonChange } = req.body;

  // Only these Statuses are allowed
  const validStatuses = ["Active", "Inactive", "Delete"];

  // Invalid Status throw an error
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  // If the Status is Delete then delete document
  if (status === "Delete") {
    const deletedShipper = await Shipper.findByIdAndDelete(shipperId);

    // If there is no Shipper
    if (!deletedShipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }

    // Send a delete message
    return res.json({ message: "Shipper deleted successfully" });
  }

  // Update the Status and the Reason
  const shipper = await Shipper.findByIdAndUpdate(
    shipperId,
    { $set: { status, statusReasonChange } },
    { new: true }
  );

  // If there is no Shipper throw an error
  if (!shipper) {
    return res.status(404).json({ message: "Shipper not found" });
  }

  // Send Response
  res.json(shipper);
});

// @desc    Changing Status of admin
// route    PUT /api/administrators/:adminId
// @access  Private
export const updateAdminStatus = asyncHandler(async (req, res) => {
  // Extract the ID from the params or URL
  const adminId = req.params.adminId;

  // Get the information from the body/form
  const { status, statusReasonChange } = req.body;

  // Valid Statuses
  const validStatuses = ["Active", "Inactive", "Delete"];

  // If the Status is invalid throw an error
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  // If the Status is Delete, delete the shipper
  if (status === "Delete") {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    // if there is no Admin throw an error
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Send Response if success
    return res.json({ message: "Admin deleted successfully" });
  }

  // Handle other Responses
  const admin = await Admin.findByIdAndUpdate(
    adminId,
    { $set: { status, statusReasonChange } },
    { new: true }
  );

  // If there is no Admin, throw an error
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  // Response
  res.json(admin);
});

// @desc    Updating Settings for Admin
// route    PUT /api/editadmin
// @access  Private
export const updateAdminSettings = asyncHandler(async (req, res) => {
  try {
    // Requesting ID from the Cookie
    const { _id } = req.user;

    // Requesting form details from the Body
    const { email, firstName, lastName, phoneNumber } = req.body;

    // Finding Admin based on the ID and update required information
    const admin = await Admin.findByIdAndUpdate(
      _id,
      { $set: { email, firstName, lastName, phoneNumber } },
      { new: true }
    );

    //  If there is no Admin throw an error or response with error
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // If everything is OK status, send the response
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
