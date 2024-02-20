import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { sendEmail } from "../utils/mailer.js";
import Admin from "../models/adminModel.js";
import Carrier from "../models/carrierModel.js";
import Shipper from "../models/shipperModel.js";
import SuperUser from "../models/superUser.js";
import OTP from "../models/forgotPasswordModel.js";
import { getOtpEmailTemplate } from "../utils/emailTemplates/forgotPasswordTemplate.js"

////////////////////////////// Getters //////////////////////////////

// @desc    Logout user and destroying cookie
// route    GET /logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc    Passing Login Information
// route    GET /login
// @access  Private to all after initial steps
const passLoginInformation = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    let userInfo = await Shipper.findOne({ email: userEmail });

    if (!userInfo) {
      userInfo = await Carrier.findOne({ email: userEmail });
    }

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

////////////////////////////// Posters //////////////////////////////

// @desc    Login and Authentication
// route    POST /login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  const admin = await Admin.findOne({ email });
  const carrier = await Carrier.findOne({ email });
  const shipper = await Shipper.findOne({ email });
  const superUser = await SuperUser.findOne({ email });

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
      firstName: shipper.firstName,
      lastName: shipper.lastName,
      companyPhoneNumber: shipper.companyPhoneNumber,
      streetAddress: shipper.streetAddress,
      apptNumber: shipper.apptNumber,
      city: shipper.city,
      province: shipper.province,
      postalCode: shipper.postalCode,
      country: shipper.country,
      mailingStreetAddress: shipper.mailingStreetAddress,
      mailingApptNumber: shipper.mailingApptNumber,
      mailingCity: shipper.mailingCity,
      mailingProvince: shipper.mailingProvince,
      mailingPostalCode: shipper.mailingPostalCode,
      mailingCountry: shipper.mailingCountry,
      businessName: shipper.businessName,
      businessNumber: shipper.businessNumber,
      proofBusiness: shipper.proofBusiness,
      proofInsurance: shipper.proofInsurance,
      website: shipper.website,
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

  res.status(400);
  throw new Error("Invalid email or password");
});

// @desc    Register a new user
// route    POST /register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  let { role, email, password, confirmPassword } = req.body;
  email = email.toLowerCase();
  const shipperExist = await Shipper.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  const carrierExist = await Carrier.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  if (shipperExist) {
    res.status(400);
    throw new Error("Shipper already exists");
  }

  if (carrierExist) {
    res.status(400);
    throw new Error("Carrier already exists");
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
      firstName: "",
      lastName: "",
      companyPhoneNumber: "",
      streetAddress: "",
      apptNumber: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
      mailingStreetAddress: "",
      mailingApptNumber: "",
      mailingCity: "",
      mailingProvince: "",
      mailingPostalCode: "",
      mailingCountry: "",
      businessName: "",
      businessNumber: "",
      proofBusiness: "",
      proofInsurance: "",
      website: "",
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

// @desc    Forget Password
// route    POST /forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  let { email } = req.body;
  email = email.toLowerCase();

  const shipperExist = await Shipper.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  const carrierExist = await Carrier.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  if (!shipperExist && !carrierExist) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const logoURL = "https://raw.githubusercontent.com/BinaryQuBit/Freight-Shield/main/githubPages/images/banner.jpg"
  const subject = "Password Reset ~ OTP";
  const htmlContent = getOtpEmailTemplate(otp, logoURL);

  try {
    await sendEmail(email, subject, htmlContent);
    const expiresAt = new Date(new Date().getTime() + 10 * 60 * 1000);
    const existingOtp = await OTP.findOne({ email });
    if (existingOtp) {
      existingOtp.otp = otp;
      existingOtp.expiresAt = expiresAt;
      await existingOtp.save();
    } else {
      const newOtp = new OTP({ email, otp, expiresAt });
      await newOtp.save();
    }

    res.status(200).json({ message: "OTP sent successfully to your email." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res
      .status(500)
      .json({ message: "Failed to send OTP.", error: error.message });
  }
});

// @desc    Verify OTP and update password
// route    POST /verify
// @access  Public
const verifyOTP = asyncHandler(async (req, res) => {
  let { email, password, confirmPassword, otpNumber } = req.body;
  email = email.toLowerCase();

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and Confirm Password do not match" });
  }

  const otpRecord = await OTP.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  console.log("This is the user: ", email);

  if (otpRecord) {
    const now = new Date();
    if (otpRecord.otp !== otpNumber) {
      return res.status(400).json({ message: "Invalid OTP" });
    } else if (otpRecord.expiresAt < now) {
      return res.status(400).json({ message: "OTP expired" });
    } else {
      let user = await Shipper.findOne({ email });

      if (!user) {
        user = await Carrier.findOne({ email });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.password = password;
      await user.save();

      await OTP.deleteOne({ email });

      res.json({ message: "Password updated successfully" });
    }
  } else {
    res.status(404).json({ message: "OTP request not found" });
  }
});


export {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  passLoginInformation,
  verifyOTP,
};
