// JWT Import
import jwt from "jsonwebtoken";

// Async Handler Import
import asyncHandler from "express-async-handler";

// Model Imports
import Admin from "../models/adminModel.js";
import Carrier from "../models/carrierModel.js";
import Shipper from "../models/shipperModel.js";
import SuperUser from "../models/superUser.js";
import Driver from "../models/driverModel.js";

// Protect Middleware
export const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;
    let firstName, lastName;
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
      case "superUser":
        user = await SuperUser.findById(decoded.userId).select("-password");
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

    firstName = user.firstName;
    lastName = user.lastName;

    req.user = { ...user._doc, firstName, lastName };
    req.role = decoded.role;
    req.areContactDetailsComplete = user.areContactDetailsComplete;
    req.areBusinessDetailsComplete = user.areBusinessDetailsComplete;
    req.isFormComplete = user.isFormComplete;
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

// Carrier Only Middleware
export const carrierOnly = (req, res, next) => {
  if (req.role == "carrier") {
    return next();
  }
  res.status(403);
  throw new Error("Access denied");
};

// Shipper Only Middleware
export const shipperOnly = (req, res, next) => {
  if (req.role == "shipper") {
    return next();
  }
  res.status(403);
  throw new Error("Access denied");
};

// Status Approval Middleware
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
