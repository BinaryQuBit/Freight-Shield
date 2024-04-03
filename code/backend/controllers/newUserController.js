// Async Handler Import
import asyncHandler from "express-async-handler";

// Axios Import
import axios from "axios";

// Custom Imports
import generateToken from "../utils/generateToken.js";
import { sendEmail } from "../utils/mailer.js";
import { getOtpEmailTemplate } from "../utils/emailTemplates/forgotPasswordTemplate.js";
import { pastLogBookGenerator } from "../utils/pastLogBookGenerator.js";

// Model Imports
import Admin from "../models/adminModel.js";
import Carrier from "../models/carrierModel.js";
import Shipper from "../models/shipperModel.js";
import SuperUser from "../models/superUser.js";
import Driver from "../models/driverModel.js";
import Logbook from "../models/logbookModel.js";
import OTP from "../models/forgotPasswordModel.js";

// API Key for the news
const apiKey = process.env.REACT_APP_NEWS_API;

////////////////////////////// Getters //////////////////////////////

// @desc    Logout user and destroying cookie
// route    GET /logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {

  // Cookie destruction
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

////////////////////////////// Posters //////////////////////////////

// @desc    Login and Authentication
// route    POST /login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  // Requesting email and password from the form
  let { email, password } = req.body;

  // change the email to lower case
  email = email.toLowerCase();

  // Check all collections with the email
  const admin = await Admin.findOne({ email });
  const carrier = await Carrier.findOne({ email });
  const shipper = await Shipper.findOne({ email });
  const superUser = await SuperUser.findOne({ email });
  const driver = await Driver.findOne({ email });

  // if its admin and the password does match
  if (admin && (await admin.matchPassword(password))) {

    // Get the status of the admin
    const status = admin.status;

    // Generate token
    generateToken(res, admin._id, "admin", status);

    // response
    return res.status(201).json({
      _id: admin._id,
      email: admin.email,
      role: "admin",
      status: admin.status,
    });
  }

  // if its driver and password does match
  if (driver && (await driver.matchPassword(password))) {

    // generate token
    generateToken(res, driver._id, "driver");

    // send response in json format
    return res.status(201).json({
      _id: driver._id,
      email: driver.email,
      role: "driver",
    });
  }

  // if its carrier and password does match
  if (carrier && (await carrier.matchPassword(password))) {

    // extract information and pass it to token/cookie
    const areContactDetailsComplete = carrier.areContactDetailsComplete;
    const areBusinessDetailsComplete = carrier.areBusinessDetailsComplete;
    const isFormComplete = carrier.isFormComplete;
    const status = carrier.status;

    // generate token
    generateToken(
      res,
      carrier._id,
      "carrier",
      areContactDetailsComplete,
      areBusinessDetailsComplete,
      isFormComplete,
      status,
    );

    // response 
    return res.status(201).json({
      _id: carrier._id,
      email: carrier.email,
      role: "carrier",
      areContactDetailsComplete: carrier.areContactDetailsComplete,
      areBusinessDetailsComplete: carrier.areBusinessDetailsComplete,
      isFormComplete: carrier.isFormComplete,
      status: carrier.status,
    });
  }

  // If it is shipper and password does match
  if (shipper && (await shipper.matchPassword(password))) {

    // extract information and pass it to token/cookie
    const areContactDetailsComplete = shipper.areContactDetailsComplete;
    const areBusinessDetailsComplete = shipper.areBusinessDetailsComplete;
    const isFormComplete = shipper.isFormComplete;
    const status = shipper.status;

    // generate token
    generateToken(
      res,
      shipper._id,
      "shipper",
      areContactDetailsComplete,
      areBusinessDetailsComplete,
      isFormComplete,
      status,
    );

    // response
    return res.status(201).json({
      _id: shipper._id,
      email: shipper.email,
      role: "shipper",
      areContactDetailsComplete: shipper.areContactDetailsComplete,
      areBusinessDetailsComplete: shipper.areBusinessDetailsComplete,
      isFormComplete: shipper.isFormComplete,
      status: shipper.status
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
export const registerUser = asyncHandler(async (req, res) => {
  let {
    role,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    phoneNumber,
  } = req.body;
  email = email.toLowerCase();
  const adminExist = await Admin.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (adminExist) {
    res.status(400);
    throw new Error("Admin already exists");
  }
  const shipperExist = await Shipper.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (shipperExist) {
    res.status(400);
    throw new Error("Shipper already exists");
  }
  const carrierExist = await Carrier.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (carrierExist) {
    res.status(400);
    throw new Error("Carrier already exists");
  }
  const driverExist = await Driver.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
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

  if (role == "admin") {
    const admin = await Admin.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });
    if (admin) {
      res.status(201).json({
        _id: admin._id,
        email: admin.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Admin Data");
    }
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
      areContactDetailsComplete: false,
      areBusinessDetailsComplete: false,
      isFormComplete: false,
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
      doingBusinessAs: "",
      businessNumber: "",
      carrierProfile: "",
      safetyFitnessCertificate: "",
      canadianCarrierCode: "",
      nationalSafetyCode: "",
      wcb: "",
      website: "",
      areContactDetailsComplete: false,
      areBusinessDetailsComplete: false,
      isFormComplete: false,
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
      firstName,
      lastName,
      email,
      password,
      phoneNumber: "",
      canadianCarrierCode: "",
      driverLicenceFront: "",
      driverLicenceBack: "",
      driverAbstract: "",
    });
    if (driver) {
      const pastDates = pastLogBookGenerator(15);
      const logbookEntries = pastDates.map(({ date, day }) => ({
        date,
        day,
        status: {
          OFF: [{ start: "0", end: "1440" }],
          SB: [],
          D: [],
          ON: [],
        },
      }));
      const logbook = await Logbook.create({
        email,
        logbook: logbookEntries,
      });
      generateToken(res, driver._id, "driver");
      res.status(201).json({
        _id: driver._id,
        email: driver.email,
        logbookId: logbook._id,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Driver Data");
    }
  }
});

// @desc    Forget Password
// route    POST /forgotpassword
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
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
  const logoURL =
    "https://raw.githubusercontent.com/BinaryQuBit/Freight-Shield/main/githubPages/images/banner.jpg";
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
    // console.error("Forgot Password Error:", error);
    res
      .status(500)
      .json({ message: "Failed to send OTP.", error: error.message });
  }
});

// @desc    Verify OTP and update password
// route    POST /verify
// @access  Public
export const verifyOTP = asyncHandler(async (req, res) => {
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

// @desc    News Fetch
// route    GET /news
// @access  Public
export const news = asyncHandler(async (req, res) => {
  const params = new URLSearchParams({
    q: "trucking logistics canada",
    apiKey: apiKey,
  });
  try {
    const newsResponse = await axios.get(
      `https://newsapi.org/v2/everything?${params}`
    );
    res.json(newsResponse.data);
  } catch (error) {
    // console.error("Error fetching news:", error);
    res.status(500).send("Error fetching news");
  }
});


