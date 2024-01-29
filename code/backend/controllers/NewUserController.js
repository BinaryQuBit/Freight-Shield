import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/adminModel.js";
import Carrier from "../models/carrierModel.js";
import Shipper from "../models/shipperModel.js";
import SuperUser from "../models/superUser.js";
import Driver from "../models/driverModel.js";

// @desc    Login and Authentication
// route    POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  const carrier = await Carrier.findOne({ email });
  const shipper = await Shipper.findOne({ email });
  const superUser = await SuperUser.findOne({ email });
  const driver = await Driver.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id, "admin");
    return res.status(201).json({
      _id: admin._id,
      email: admin.email,
      role: "admin",
    });
  }

  if (carrier && (await carrier.matchPassword(password))) {
    generateToken(res, carrier._id, "carrier");
    return res.status(201).json({
      _id: carrier._id,
      email: carrier.email,
      role: "carrier",
    });
  }

  if (shipper && (await shipper.matchPassword(password))) {
    generateToken(res, shipper._id, "shipper");
    return res.status(201).json({
      _id: shipper._id,
      email: shipper.email,
      role: "shipper",
    });
  }

  if (superUser && (await superUser.matchPassword(password))) {
    generateToken(res, superUser._id, "superUser");
    return res.status(201).json({
      _id: superUser._id,
      email: superUser.email,
      role: "superUser",
    });
  }

  if (driver && (await driver.matchPassword(password))) {
    generateToken(res, driver._id, "driver");
    return res.status(201).json({
      _id: driver._id,
      email: driver.email,
      role: "driver",
    });
  }

  res.status(400);
  throw new Error("Invalid email or password");
});

// @desc    Register a new user
// route    POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { role, email, password, confirmPassword } = req.body;

  const shipperExist = await Shipper.findOne({ email });
  const carrierExist = await Carrier.findOne({ email });
  const driverExist = await Driver.findOne({ email });

  if (shipperExist) {
    res.status(400);
    throw new Error("Shipper already exists");
  }

  if (carrierExist) {
    res.status(400);
    throw new Error("Carrier already exists");
  }

  if (driverExist) {
    res.status(400);
    throw new Error("Driver already exists");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Password dont match");
  }

  if (!email || !password || !confirmPassword || !role) {
    throw new Error("Email, Password, Confirm Password, role cant be empty");
  }

  if (role == "shipper") {
    const shipper = await Shipper.create({
      email,
      password,
    });
    if (shipper) {
      generateToken(res, shipper._id);
      res.status(201).json({
        _id: shipper._id,
        email: shipper.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Shipper Data");
    }
  }

  if (role == "carrier") {
    const carrier = await Carrier.create({
      email,
      password,
    });
    if (carrier) {
      generateToken(res, carrier._id);
      res.status(201).json({
        _id: carrier._id,
        email: carrier.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Carrier Data");
    }
  }

  if (role == "driver") {
    const driver = await Driver.create({
      email,
      password,
    });
    if (driver) {
      generateToken(res, driver._id);
      res.status(201).json({
        _id: driver._id,
        email: driver.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Driver Data");
    }
  }

  res.status(200).json({ message: "Register User" });
});

// @desc    Logout user and destroying cookie
// route    GET /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc    Forget Password
// route    POST /api/users/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Password Updated" });
});

// @desc    Passing Login Information
// route    GET /api/users/login
// @access  Private to all after initial steps
const passLoginInformation = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const loginShipperinformation = await Shipper.find({ email: userEmail });

    res.status(200).json(loginShipperinformation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  passLoginInformation,
};
