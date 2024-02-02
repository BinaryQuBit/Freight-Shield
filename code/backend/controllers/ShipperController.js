import asyncHandler from "express-async-handler";
import Shipper from "../models/shipperModel.js";
import Marketplace from "../models/marketplaceModel.js";
import mongoose from "mongoose";

// @desc    Update Shipper Contact Details
// route    PUT /api/users/shippercontactdetails
// @access  Private
const updateShipperContactDetails = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const shipperExist = await Shipper.findOne({ email });

  let {
    firstName,
    lastName,
    companyPhoneNumber,
    streetAddress,
    apptNumber,
    city,
    province,
    postalCode,
    country,
    mailingStreetAddress,
    mailingApptNumber,
    mailingCity,
    mailingProvince,
    mailingPostalCode,
    mailingCountry,
    sameAsMailing,
  } = req.body;

  if (sameAsMailing == "yes") {
    mailingStreetAddress = streetAddress;
    mailingApptNumber = apptNumber;
    mailingCity = city;
    mailingProvince = province;
    mailingPostalCode = postalCode;
    mailingCountry = country;
  }

  if (
    !firstName ||
    !lastName ||
    !companyPhoneNumber ||
    !streetAddress ||
    !city ||
    !province ||
    !postalCode ||
    !country ||
    !mailingStreetAddress ||
    !mailingCity ||
    !mailingProvince ||
    !mailingPostalCode ||
    !mailingCountry
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled" });
  }

  if (shipperExist) {
    const updatedShipper = await Shipper.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        companyPhoneNumber,
        streetAddress,
        apptNumber,
        city,
        province,
        postalCode,
        country,
        mailingStreetAddress,
        mailingApptNumber,
        mailingCity,
        mailingProvince,
        mailingPostalCode,
        mailingCountry,
      },
      { new: true }
    );

    if (updatedShipper) {
      res.status(200).json({ shipper: updatedShipper });
    } else {
      res.status(404).json({ message: "Shipper not found" });
    }
  } else {
    res.status(404).json({ message: "Shipper not found" });
  }
});

// @desc    Getting Active Loads
// route    Get /api/users/activeloads
// @access  Private
const activeLoads = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const loads = await Marketplace.find({ email: userEmail });

    res.status(200).json(loads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting History
// route    GET /api/users/history
// @access  Private
const history = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Shipper Settings
// route    GET /api/users/shippersettings
// @access  Private
const shipperSettings = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Updating Shipper Settings
// route    PUT /api/users/shippersettings
// @access  Private
const updateShipperSettings = asyncHandler(async (req, res) => {
  const user = await Shipper.findById(req.user._id);

  if (user) {
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
  res.status(200).json({ message: "Shipper Settings Updated" });
});

// @desc    Track Load
// route    GET /api/users/trackload
// @access  Private
const trackLoad = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Update Shipper Business Details
// route    PUT /api/users/shipperbusinessdetails
// @access  Private
const updateShipperBusinessDetails = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const shipperExist = await Shipper.findOne({ email });

  if (!shipperExist) {
    return res.status(404).json({ message: "Shipper not found" });
  }

  const { businessName, businessNumber, website } = req.body;

  if (!businessName || !businessNumber) {
    return res
      .status(400)
      .json({ message: "Business name and number are required" });
  }

  const updateData = { businessName, businessNumber, website };

  try {
    const updatedShipper = await Shipper.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (updatedShipper) {
      res.status(200).json({ shipper: updatedShipper });
    } else {
      res.status(404).json({ message: "Unable to update shipper details" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Upload Proof of Business
// route    PUT /api/users/proofBusiness
// @access  Private
const proofBusiness = asyncHandler(async (req, res) => {
  if (
    !req.files ||
    !req.files.proofBusiness ||
    !req.files.proofBusiness.length
  ) {
    return res
      .status(400)
      .send({ message: "Please upload a proof of business file." });
  }

  const email = req.user.email;
  const shipperExist = await Shipper.findOne({ email });

  if (!shipperExist) {
    return res.status(404).send({ message: "Shipper not found" });
  }

  const filePath = `${req.files.proofBusiness[0].filename}`;

  try {
    await Shipper.findOneAndUpdate(
      { email },
      { proofBusiness: filePath },
      { new: true }
    );

    res.send({
      message: "Proof of Business file uploaded successfully.",
      fileName: req.files.proofBusiness[0].filename,
      filePath: filePath,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// @desc    Remove Proof of Business
// route    DELETE /api/users/proofBusiness
// @access  Private
const removeProofBusiness = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const shipper = await Shipper.findOne({ email });

  if (!shipper) {
    return res.status(404).send({ message: "Shipper not found" });
  }

  if (!shipper.proofBusiness) {
    return res
      .status(400)
      .send({ message: "No proof of business file to delete." });
  }

  try {
    await Shipper.findOneAndUpdate(
      { email },
      { proofBusiness: null },
      { new: true }
    );

    res.send({ message: "Proof of Business file deleted successfully." });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// @desc    Upload Proof of Insurance
// route    PUT /api/users/proofInsurance
// @access  Private
const proofInsurance = asyncHandler(async (req, res) => {
  if (
    !req.files ||
    !req.files.proofInsurance ||
    !req.files.proofInsurance.length
  ) {
    return res
      .status(400)
      .send({ message: "Please upload a proof of insurance file." });
  }

  const email = req.user.email;
  const shipperExist = await Shipper.findOne({ email });

  if (!shipperExist) {
    return res.status(404).send({ message: "Shipper not found" });
  }

  const filePath = `${req.files.proofInsurance[0].filename}`;

  try {
    await Shipper.findOneAndUpdate(
      { email },
      { proofInsurance: filePath },
      { new: true }
    );

    res.send({
      message: "Proof of Insurance file uploaded successfully.",
      fileName: req.files.proofInsurance[0].filename,
      filePath: filePath,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// @desc    Remove Proof of Insurance
// route    DELETE /api/users/proofBusinessinsurance
// @access  Private
const removeProofInsurance = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const shipper = await Shipper.findOne({ email });

  if (!shipper) {
    return res.status(404).send({ message: "Shipper not found" });
  }

  if (!shipper.proofInsurance) {
    return res
      .status(400)
      .send({ message: "No proof of insurance file to delete." });
  }

  try {
    await Shipper.findOneAndUpdate(
      { email },
      { proofInsurance: null },
      { new: true }
    );

    res.send({ message: "Proof of Insurance file deleted successfully." });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});






// @desc    Posting Load
// route    POST /api/users/postload
// @access  Private
const postLoad = asyncHandler(async (req, res) => {
  try {
  const {
    pickUpLocation,
    pickUpDate,
    pickUpTime,
    dropOffDate,
    dropOffTime,
    dropOffLocation,
    unitRequested,
    typeLoad,
    sizeLoad,
    additionalInformation,
    pickUpCity,
    dropOffCity,
    pickUpLAT,
    pickUpLNG,
    dropOffLAT,
    dropOffLNG,
  } = req.body;

  let filename = null;
    if (req.file && req.file.path) {
      filename = req.file.path.split('\\').pop();
    }

  const newLoad = await Marketplace.create({
    email: req.user.email,
    pickUpLocation,
    pickUpDate,
    pickUpTime,
    dropOffDate,
    dropOffTime,
    dropOffLocation,
    unitRequested,
    typeLoad,
    sizeLoad,
    additionalInformation,
    additionalDocument: filename,
    pickUpCity,
    dropOffCity,
    pickUpLAT,
    pickUpLNG,
    dropOffLAT,
    dropOffLNG,
    status: 'Pending',
  });
  res.status(200).json({ message: 'Load posted successfully', newLoad });
} catch (error) {
  console.error("Error in postLoad:", error);
  res.status(500).send({ message: "Server error", error: error.message });
}
});


// @desc    Posting Truck
// route    POST /api/users/posttruck
// @access  Private
const postTruck = asyncHandler(async (req, res) => {
  try {
    const {
      unitNumber,
      vin,
      model,
      year,
      make,
      mileage,
      status,
      additionalDetails,
      insurance,
      maintenanceHistory,
    } = req.body;

    const newTruck = await Truck.create({
      unitNumber,
      vin,
      model,
      year,
      make,
      mileage,
      status,
      additionalDetails,
      insurance,
      maintenanceHistory,
    });

    res.status(200).json({ message: 'Truck posted successfully', newTruck });
  } catch (error) {
    console.error("Error in postTruck:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
});



export {
  activeLoads,
  history,
  postLoad,
  shipperSettings,
  updateShipperSettings,
  trackLoad,
  updateShipperContactDetails,
  updateShipperBusinessDetails,
  proofBusiness,
  proofInsurance,
  removeProofBusiness,
  removeProofInsurance,
  postTruck,
};
