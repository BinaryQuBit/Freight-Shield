// Async Handler Import
import asyncHandler from "express-async-handler";

// Model Imports
import Shipper from "../models/shipperModel.js";
import Marketplace from "../models/marketplaceModel.js";

// Delete Middleware Import
import {deleteFiles} from "../middleware/delete.js";

////////////////////////////// Getters //////////////////////////////

// @desc    Getting Dashboard
// route    GET /api/shipperdashboard 
// @access  Private
export const shipperDasboard = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const shipper = await Shipper.findOne({ email: userEmail });
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" }); 
    }
    const response = {
      firstName: shipper.firstName,
      lastName: shipper.lastName,
      events: shipper.events,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Active Loads
// route    GET /api/activeloads
// @access  Private
export const getActiveLoads = asyncHandler(async (req, res) => {
  try {
    const { email, firstName, lastName } = req.user;
    const loads = await Marketplace.find({ shipperEmail: email });
    res.status(200).json({ loads, firstName, lastName, email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// @desc    Getting History
// route    GET /api/postload
// @access  Private
export const getPostLoad = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };

  res.status(200).json({ user });
});

// @desc    Getting History
// route    GET /api/history
// @access  Private
export const getHistory = asyncHandler(async (req, res) => {
  try {
    const { email, firstName, lastName } = req.user;
    const loads = await Marketplace.find({ shipperEmail: email, status: "Delivered" });
    res.status(200).json({ loads, firstName, lastName, email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Shipper Settings
// route    GET /api/shippersettings
// @access  Private
export const getShipperSettings = asyncHandler(async (req, res) => {
    const user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
    const shipper = await Shipper.findOne({ email: user.email });
      if (!shipper) {
    return res.status(404).json({ message: "Shipper not found" }); 
  }
    const response = {
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
  };
    res.status(200).json({ user, response });
});

// @desc    Getting Shipper Contact Details
// route    GET /api/shippercontactdetails
// @access  Private
export const getShipperContactDetails = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const shipper = await Shipper.findOne({ email: userEmail });
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }
    const status = {
      areContactDetailsComplete: shipper.areContactDetailsComplete,
    };
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Shipper Business Details
// route    GET /api/shipperbusinessdetails
// @access  Private
export const getShipperBusinessDetails = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const shipper = await Shipper.findOne({ email: userEmail });
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }
    const status = {
      areBusinessDetailsComplete: shipper.areBusinessDetailsComplete,
    };
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Shipper Submission
// route    GET /api/shippersubmission
// @access  Private
export const getShipperSubmission = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const shipper = await Shipper.findOne({ email: userEmail });
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" }); 
    }
    const response = {
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
      isFormComplete: shipper.isFormComplete,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

////////////////////////////// Posters //////////////////////////////

// @desc    Posting Load
// route    POST /api/postload
// @access  Private
export const postLoad = asyncHandler(async (req, res) => {
  const shipperEmail = req.user.email;
  const shipperExist = await Shipper.findOne({ email: shipperEmail });
  if (!shipperExist) {
    return res.status(404).json({ message: "Shipper not found" });
  }
  const shipperFirstName = shipperExist.firstName;
  const shipperLastName = shipperExist.lastName;
  const shipperPhoneNumber = shipperExist.companyPhoneNumber;
  const shipperCompanyName = shipperExist.businessName;
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
    price,
  } = req.body;
  const postLoad = {
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
    status: "Pending",
    driverLNG: "",
    driverLAT: "",
    shipperFirstName,
    shipperLastName,
    shipperPhoneNumber,
    shipperCompanyName,
    shipperEmail,
    price,
    carrierFirstName: "",
    carrierLastName: "",
    carrierEmail: "",
    carrierPhoneNumber:"",
    carrierBusinessName: "",
    carrierDoingBusinessAs: "",
    driverFirstName: "",
    driverLastName: "",
    driverPhoneNumber: "",
    driverEmail: "",
  };
    if (req.file) { 
      postLoad.additionalDocument = req.file.path;
  } else {
  }
  try {
    const newLoad = await Marketplace.create(postLoad);
    if (newLoad) {
      res.status(200).json({ message: "Load posted successfully", load: newLoad });
    } else {
      res.status(400).json({ message: "Unable to post load" });
    }
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Posting Events
// route    POST /api/shipperevents
// @access  Private
export const postShipperEvents = async (req, res) => {
  try {
    const shipperEmail = req.user.email;
    const shipper = await Shipper.findOne({ email: shipperEmail });
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }
    const { title, description, date, location } = req.body;
    const newEvent = { title, description, date, location };
    shipper.events.push(newEvent);
    await shipper.save();
    res.status(201).json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

////////////////////////////// Putters //////////////////////////////

// @desc    Updating Load
// route    PUT /api/postload:id
// @access  Private
export const updateLoad = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let updateData = { ...req.body };
  try {
    const load = await Marketplace.findById(id);
    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }
    if (req.file) {
      updateData.additionalDocument = req.file.path;
      if (load.additionalDocument) {
        deleteFiles(load.additionalDocument);
      }
    } else if (!req.body.additionalDocument && load.additionalDocument) {
      deleteFiles(load.additionalDocument);
      updateData.additionalDocument = "";
    }
    const updatedLoad = await Marketplace.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    res.json(updatedLoad);
  } catch (error) {
    console.error("Error in updateLoad:", error);
    res.status(400).json({ message: "Error updating load", error: error.message });
  }
});

// @desc    Update Shipper Contact Details
// route    PUT /api/shippercontactdetails
// @access  Private
export const updateShipperContactDetails = asyncHandler(async (req, res) => {
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
  } else {
    if (!mailingStreetAddress) {
      return res
        .status(400)
        .json({ message: "Mailing Street Address must be filled" });
    }
    if (!mailingCity) {
      return res.status(400).json({ message: "Mailing City must be filled" });
    }
    if (!mailingProvince) {
      return res
        .status(400)
        .json({ message: "Mailing Province must be filled" });
    }
    if (!mailingPostalCode) {
      return res
        .status(400)
        .json({ message: "Mailing Postal Code must be filled" });
    }
    if (!mailingCountry) {
      return res
        .status(400)
        .json({ message: "Mailing Country must be filled" });
    }
  }
  if (!firstName) {
    return res.status(400).json({ message: "First Name must be filled" });
  }
  if (!lastName) {
    return res.status(400).json({ message: "Last Name must be filled" });
  }
  if (!companyPhoneNumber) {
    return res
      .status(400)
      .json({ message: "Company Phone Number must be filled" });
  }
  if (!streetAddress) {
    return res.status(400).json({ message: "Street Address must be filled" });
  }
  if (!city) {
    return res.status(400).json({ message: "City must be filled" });
  }
  if (!province) {
    return res.status(400).json({ message: "Province must be filled" });
  }
  if (!postalCode) {
    return res.status(400).json({ message: "Postal Code must be filled" });
  }
  if (!country) {
    return res.status(400).json({ message: "Country must be filled" });
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
        areContactDetailsComplete: true,
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

// @desc    Update Shipper Business Details
// route    PUT /api/shipperbusinessdetails
// @access  Private
export const updateShipperBusinessDetails = asyncHandler(async (req, res) => {
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
  const updateData = {
    businessName,
    businessNumber,
    website,
    areBusinessDetailsComplete: true,
  };
  if (
    req.files &&
    req.files.proofBusiness &&
    req.files.proofBusiness.length > 0
  ) {
    updateData.proofBusiness = req.files.proofBusiness[0].path;
  }
  if (
    req.files &&
    req.files.proofInsurance &&
    req.files.proofInsurance.length > 0
  ) {
    updateData.proofInsurance = req.files.proofInsurance[0].path;
  }
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

// @desc    Update Shipper Details
// route    PUT /api/shippersubmissiondetails
// @access  Private
export const updateShipperSubmissionDetails = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const shipperExist = await Shipper.findOne({ email });
  if (!shipperExist) {
      return res.status(404).json({ message: "Shipper not found" });
  }
  const {
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
      firstName,
      lastName,
      companyPhoneNumber,
      businessName,
      businessNumber,
      website,
  } = req.body;
  if (!businessName || !businessNumber) {
      return res.status(400).json({ message: "Business name and number are required" });
  }
  const updateData = {
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
      firstName,
      lastName,
      companyPhoneNumber,
      businessName,
      businessNumber,
      website,
  };
  const filesToDelete = [];
  if (req.files && req.files.proofBusiness && req.files.proofBusiness.length > 0) {
      if (shipperExist.proofBusiness) {
          filesToDelete.push(shipperExist.proofBusiness);
      }
      updateData.proofBusiness = req.files.proofBusiness[0].path;
  }
  if (req.files && req.files.proofInsurance && req.files.proofInsurance.length > 0) {
      if (shipperExist.proofInsurance) {
          filesToDelete.push(shipperExist.proofInsurance);
      }
      updateData.proofInsurance = req.files.proofInsurance[0].path;
  }
  try {
      const updatedShipper = await Shipper.findOneAndUpdate(
          { email },
          updateData,
          { new: true }
      );
      if (filesToDelete.length > 0) {
          deleteFiles(filesToDelete);
      }
      if (updatedShipper) {
          res.status(200).json({ shipper: updatedShipper });
      } else {
          res.status(404).json({ message: "Unable to update shipper details" });
      }
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Update Shipper Status
// route    PUT /api/updateshipperstatus
// @access  Private
export const updateShipperStatus = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const shipperExist = await Shipper.findOne({ email });
  if (!shipperExist) {
    return res.status(404).json({ message: "Shipper not found" });
  }
  const updateData = {
    isFormComplete: true,
  };
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

////////////////////////////// Deleters //////////////////////////////

// @desc    Delete Load
// route    DELETE /api/users/activeloads/${loadId}
// @access  Private
export const deleteLoad = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const load = await Marketplace.findById(id);
    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }
    if (load.additionalDocument) {
      deleteFiles(load.additionalDocument);
    }
    await Marketplace.findByIdAndDelete(id);
    res.status(200).json({ message: "Load deleted successfully" });
  } catch (error) {
    console.error("Error deleting load:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
