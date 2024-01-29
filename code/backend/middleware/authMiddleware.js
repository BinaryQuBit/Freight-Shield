// authMiddleware.js

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import Carrier from "../models/carrierModel.js";
import Shipper from "../models/shipperModel.js";
import SuperUser from "../models/superUser.js";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT: ", decoded);

    let user;
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
      default:
        throw new Error("Role not recognized");
    }

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    req.role = decoded.role;
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

const adminOnly = (req, res, next) => {
  if (req.role == "admin") {
    return next();
  }
  res.status(403);
  throw new Error("Access denied");
};

const carrierOnly = (req, res, next) => {
  if (req.role == "carrier") {
    return next();
  }
  res.status(403);
  throw new Error("Access denied");
};

const shipperOnly = (req, res, next) => {
  if (req.role == "shipper") {
    return next();
  }
  res.status(403);
  throw new Error("Access denied");
};

const shipperDetailsComplete = asyncHandler(async (req, res, next) => {
  if (req.role != "shipper") {
    return;
  }

  const {
    businessName,
    streetAddress,
    city,
    province,
    postalCode,
    country,
    mailingStreetAddress,
    mailingCity,
    mailingProvince,
    mailingPostalCode,
    mailingCountry,
    firstName,
    lastName,
    companyPhoneNumber,
  } = req.user;

  if (
    !businessName ||
    !streetAddress ||
    !city ||
    !province ||
    !postalCode ||
    !country ||
    !mailingStreetAddress ||
    !mailingCity ||
    !mailingProvince ||
    !mailingPostalCode ||
    !mailingCountry ||
    !firstName ||
    !lastName ||
    !companyPhoneNumber
  ) {
    res.status(403);
    throw new Error("Access denied. Need Shipper Company Details");
  }
  next();
});


export { protect, adminOnly, carrierOnly, shipperOnly, shipperDetailsComplete };
