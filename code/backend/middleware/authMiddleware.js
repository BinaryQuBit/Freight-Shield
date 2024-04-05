// JWT Import
import jwt from "jsonwebtoken";

// Async Handler Import
import asyncHandler from "express-async-handler";

// Model Imports
import Admin from "../models/adminModel.js";
import Carrier from "../models/carrierModel.js";
import Shipper from "../models/shipperModel.js";
import Driver from "../models/driverModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  // request the token
  let token = req.cookies.jwt;

  // if there is no token send status 401
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    // decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;
    let firstName, lastName;

    // based on the role in token do switch
    switch (decoded.role) {
      case "admin":
        user = await Admin.findById(decoded.userId).select("-password");
        break;
      case "carrier":
        user = await Carrier.findById(decoded.userId).select("-password");
        break;
      case "shipper":
        user = await Shipper.findById(decoded.userId).select("-password");
        break;
      case "driver":
        user = await Driver.findById(decoded.userId).select("-password");
        break;
      default:
        throw new Error("Role not recognized");
    }
    if (!user) {
      throw new Error("User not found");
    }

    // Get the following information
    firstName = user.firstName;
    lastName = user.lastName;

    req.user = { ...user._doc, firstName, lastName };
    req.role = decoded.role;
    req.areContactDetailsComplete = user.areContactDetailsComplete;
    req.areBusinessDetailsComplete = user.areBusinessDetailsComplete;
    req.isFormComplete = user.isFormComplete;
    req.status = user.status;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401);
      throw new Error("Invalid token");
    } else if (error.name === "TokenExpiredError") {
      res.status(401);
      throw new Error("Token expired");
    } else {
      res.status(500);
      throw new Error("Server error in token verification");
    }
  }
});

// Driver Only Moddleware
export const driverOnly = (req, res, next) => {
  if (req.role == "driver") {
    return next();
  }
  res.status(403);
  throw new Error("Access denied");
};

// Admin Only Middleware
export const adminOnly = (req, res, next) => {
  if (req.role == "admin") {
    return next();
  }
  res.status(403);
  throw new Error("Access denied");
};

// Status Middleware for admin
export const adminStatus = (req, res, next) => {
  if (req.status == "Active") {
    return next();
  }
  res.status(604);
  throw new Error("Status Inactive");
};

// Carrier Only Middleware
export const carrierOnly = (req, res, next) => {
  if (req.role == "carrier") {
    return next();
  }
  res.status(403);
  throw new Error("Access denied");
};

// Status middleware for Carrier
export const carrierStatus = (req, res, next) => {
  if (req.status == "Active") {
    return next();
  }
  res.status(605);
  throw new Error("Status Inactive");
};

// Shipper Only Middleware
export const shipperOnly = (req, res, next) => {
  if (req.role == "shipper") {
    return next();
  }
  res.status(403);
  throw new Error("Access denied");
};

// Status Middleware for Shipper
export const shipperStatus = (req, res, next) => {
  if (req.status == "Active") {
    return next();
  }
  res.status(606);
  throw new Error("Status Inactive");
};

// Status Approval Middleware for the Initial documents
export const status = (req, res, next) => {
  if (
    req.areContactDetailsComplete === true &&
    req.areBusinessDetailsComplete === true &&
    req.isFormComplete === true
  ) {
    return next();
  } else {
    res.status(403);
    throw new Error("Access denied. Need details filled");
  }
};

// Delete Notification Middleware based on the role
export const deleteNotificationsBasedOnRole = (req, res, next) => {
  if (req.role === "admin") {
    deleteNotificationsAdmin(req, res, next);
  } else if (req.role === "shipper") {
    deleteNotificationsShipper(req, res, next);
  } else if (req.role === "carrier") {
    deleteNotificationsCarrier(req, res, next);
  } else {
    const error = new Error("Unauthorized or invalid role");
    error.status = 401;
    next(error);
  }
};

// Delete Notification for Admin
export const deleteNotificationsAdmin = async (req, res) => {
  try {
    const adminId = req.user._id;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: { notification: [] } },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Notifications deleted successfully" });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete Notification for Shipper
export const deleteNotificationsShipper = async (req, res) => {
  try {
    const shipperId = req.user._id;
    const updatedShipper = await Shipper.findByIdAndUpdate(
      shipperId,
      { $set: { notification: [] } },
      { new: true }
    );

    if (!updatedShipper) {
      return res
        .status(404)
        .json({ success: false, error: "Shipper not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Notifications deleted successfully" });
  } catch (error) {
    console.error("Error deleting notifications for shipper:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete Notification for Carrier
export const deleteNotificationsCarrier = async (req, res) => {
  try {
    const carrierId = req.user._id;

    const updatedCarrier = await Carrier.findByIdAndUpdate(
      carrierId,
      { $set: { notification: [] } },
      { new: true }
    );

    if (!updatedCarrier) {
      return res
        .status(404)
        .json({ success: false, error: "Carrier not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Notifications deleted successfully" });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
