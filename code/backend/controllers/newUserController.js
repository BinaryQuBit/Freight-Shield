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
import Driver from "../models/driverModel.js";
import Logbook from "../models/logbookModel.js";
import OTP from "../models/forgotPasswordModel.js";

// API Key for the News
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

////////////////////////////// POSTERS //////////////////////////////

// @desc    Login and Authentication
// route    POST /login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  // Requesting email and password from the form
  let { email, password } = req.body;

  // Change the email to lower case
  email = email.toLowerCase();

  // Check all collections with the email
  const admin = await Admin.findOne({ email });
  const carrier = await Carrier.findOne({ email });
  const shipper = await Shipper.findOne({ email });
  const driver = await Driver.findOne({ email });

  // If its admin and the password does match
  if (admin && (await admin.matchPassword(password))) {
    // Get the status of the admin
    const status = admin.status;

    // Generate token
    generateToken(res, admin._id, "admin", status);

    // Response
    return res.status(201).json({
      _id: admin._id,
      email: admin.email,
      role: "admin",
      status: admin.status,
    });
  }

  // If its driver and password does match
  if (driver && (await driver.matchPassword(password))) {
    // Generate token
    generateToken(res, driver._id, "driver");

    // Send response in json format
    return res.status(201).json({
      _id: driver._id,
      email: driver.email,
      role: "driver",
    });
  }

  // If its carrier and password does match
  if (carrier && (await carrier.matchPassword(password))) {
    // Extract information and pass it to token/cookie
    const areContactDetailsComplete = carrier.areContactDetailsComplete;
    const areBusinessDetailsComplete = carrier.areBusinessDetailsComplete;
    const isFormComplete = carrier.isFormComplete;
    const status = carrier.status;

    // Generate token
    generateToken(
      res,
      carrier._id,
      "carrier",
      areContactDetailsComplete,
      areBusinessDetailsComplete,
      isFormComplete,
      status
    );

    // Response
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
    // Extract information and pass it to token/cookie
    const areContactDetailsComplete = shipper.areContactDetailsComplete;
    const areBusinessDetailsComplete = shipper.areBusinessDetailsComplete;
    const isFormComplete = shipper.isFormComplete;
    const status = shipper.status;

    // Generate token
    generateToken(
      res,
      shipper._id,
      "shipper",
      areContactDetailsComplete,
      areBusinessDetailsComplete,
      isFormComplete,
      status
    );

    // Response
    return res.status(201).json({
      _id: shipper._id,
      email: shipper.email,
      role: "shipper",
      areContactDetailsComplete: shipper.areContactDetailsComplete,
      areBusinessDetailsComplete: shipper.areBusinessDetailsComplete,
      isFormComplete: shipper.isFormComplete,
      status: shipper.status,
    });
  }

  // If driver and driver password does match
  if (driver && (await driver.matchPassword(password))) {
    // Generate token
    generateToken(res, driver._id, "driver");

    // Send status 201
    return res.status(201).json({
      _id: driver._id,
      email: driver.email,
      role: "driver",
    });
  }

  // else send status 400
  res.status(400);
  throw new Error("Invalid email or password");
});

// @desc    Register a new user
// route    POST /register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  // Request data from the body
  let {
    role,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    phoneNumber,
  } = req.body;

  // Change email to lower case
  email = email.toLowerCase();

  // If Admin exist compare case insensitive
  const adminExist = await Admin.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  // If admin exists send the response
  if (adminExist) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  // If Shipper exist compare case insensitive
  const shipperExist = await Shipper.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  // If shipper exist, send message
  if (shipperExist) {
    res.status(400);
    throw new Error("Shipper already exists");
  }

  // If Carrier exist compare case insensitive
  const carrierExist = await Carrier.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  // If carrier exist, send message
  if (carrierExist) {
    res.status(400);
    throw new Error("Carrier already exists");
  }

  // If Driver exist compare case exist
  const driverExist = await Driver.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  // If driver exist, send message
  if (driverExist) {
    res.status(400);
    throw new Error("Driver already exists");
  }

  // If password dont match, send error
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Password dont match");
  }

  // If the fields are empty, send error
  if (!email || !password || !confirmPassword || !role) {
    throw new Error("Email, Password, Confirm Password, role cant be empty");
  }

  // If role is admin, creat in schema Admin
  if (role == "admin") {
    const admin = await Admin.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });

    // if admin creates, send 201 status with data
    if (admin) {
      res.status(201).json({
        _id: admin._id,
        email: admin.email,
      });

      // else throw an error
    } else {
      res.status(400);
      throw new Error("Invalid Admin Data");
    }
  }

  // if role is shipper, create shipper
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

    // if shipper creates, send 201 message with data in JSON format
    if (shipper) {
      // Generate Token
      generateToken(res, shipper._id);
      res.status(201).json({
        _id: shipper._id,
        email: shipper.email,
      });

      // else throw an error
    } else {
      res.status(400);
      throw new Error("Invalid Shipper Data");
    }
  }

  // if role is carrier, create carrier in carrier model
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

    // if carrier creates, send data and 201 status in JSON format
    if (carrier) {
      // Generate Token
      generateToken(res, carrier._id);
      res.status(201).json({
        _id: carrier._id,
        email: carrier.email,
      });

      // else throw an error
    } else {
      res.status(400);
      throw new Error("Invalid Carrier Data");
    }
  }

  // if role is driver, create driver in the model Driver
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

    // if driver creates
    if (driver) {
      // Generate logbook
      const pastDates = pastLogBookGenerator(15);

      // get todays date
      const todayDate = new Date();

      // format date
      const centralTimeTodayDate = new Date(
        todayDate.getTime() - 6 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 10);

      // Create logbook for today
      const logbookEntries = pastDates.map(({ date, day }) => ({
        date,
        day,
        status:
          date === centralTimeTodayDate
            ? {
                OFF: [{ start: "0", end: "0" }],
                SB: [],
                D: [],
                ON: [],
                // or create logbook with the data
              }
            : {
                OFF: [{ start: "0", end: "1440" }],
                SB: [],
                D: [],
                ON: [],
              },
      }));

      // Create logbooks
      const logbook = await Logbook.create({
        email,
        logbook: logbookEntries,
      });

      // Generate Token
      generateToken(res, driver._id, "driver");

      // response 201 with data
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
  // Get the email
  let { email } = req.body;

  // Make the email lower case
  email = email.toLowerCase();

  // Find shipper with case insensitive
  const shipperExist = await Shipper.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  // Find carrier with case insensitive
  const carrierExist = await Carrier.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  // Find admin with case insensitive
  const adminExist = await Admin.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  // throw an error if none exists
  if (!shipperExist && !carrierExist && !adminExist) {
    return res.status(400).json({ message: "User does not exist" });
  }

  // create an otp
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Data to be sent over the email
  const logoURL =
    "https://raw.githubusercontent.com/BinaryQuBit/Freight-Shield/main/githubPages/images/banner.jpg";
  const subject = "Password Reset ~ OTP";
  const htmlContent = getOtpEmailTemplate(otp, logoURL);
  try {
    // send email
    await sendEmail(email, subject, htmlContent);
    const expiresAt = new Date(new Date().getTime() + 10 * 60 * 1000);
    const existingOtp = await OTP.findOne({ email });

    // save the generated otp in the database
    if (existingOtp) {
      existingOtp.otp = otp;
      existingOtp.expiresAt = expiresAt;
      await existingOtp.save();
    } else {
      const newOtp = new OTP({ email, otp, expiresAt });
      await newOtp.save();
    }

    // Send 200 status with message
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
export const verifyOTP = asyncHandler(async (req, res) => {
  // Get the information from the body
  let { email, password, confirmPassword, otpNumber } = req.body;

  // make the email lower case
  email = email.toLowerCase();

  // if password and confirm password dont match, send error
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and Confirm Password do not match" });
  }

  // find email, case insensitve
  const otpRecord = await OTP.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  // if there is otp
  if (otpRecord) {
    // create date
    const now = new Date();

    // Check the otp number with the saved otp in database
    if (otpRecord.otp !== otpNumber) {
      return res.status(400).json({ message: "Invalid OTP" });

      // if the otp expires
    } else if (otpRecord.expiresAt < now) {
      return res.status(400).json({ message: "OTP expired" });
    } else {
      // find in Shipper
      let user = await Shipper.findOne({ email });

      // if not found, find in Carrier
      if (!user) {
        user = await Carrier.findOne({ email });
      }

      // if not found, find in Admin
      if (!user) {
        user = await Admin.findOne({ email });
      }

      // if no user, throw an error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      //  store the password
      user.password = password;

      // save the user
      await user.save();

      // delete OTP
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
    console.error("Error fetching news:", error);
    res.status(500).send("Error fetching news");
  }
});
