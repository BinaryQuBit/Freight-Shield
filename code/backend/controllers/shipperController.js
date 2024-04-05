// Async Handler Import
import asyncHandler from "express-async-handler";

// Model Imports
import Shipper from "../models/shipperModel.js";
import Marketplace from "../models/marketplaceModel.js";

// Delete Middleware Import
import { deleteFiles } from "../middleware/delete.js";

////////////////////////////// GETTERS //////////////////////////////

// @desc    Getting Dashboard
// route    GET /api/shipperdashboard
// @access  Private
export const shipperDasboard = asyncHandler(async (req, res) => {
  try {
    // Extract email from the Cookie
    const userEmail = req.user.email;

    // Find the Shipper from the extracted email in the model
    const shipper = await Shipper.findOne({ email: userEmail });

    // If there is no shipper, throw an error
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }

    // Construct the response
    const response = {
      firstName: shipper.firstName,
      lastName: shipper.lastName,
      events: shipper.events,
      status: shipper.status,
      notification: shipper.notification,
      email: req.user.email,
    };

    // Send the response with status 200 and JSON format
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
    // Extract data from the cookie
    const { email, firstName, lastName, status } = req.user;

    // find shipper using the email extracted from the cookie
    const shipper = await Shipper.findOne({ email: email });

    // find loads using the same email
    const loads = await Marketplace.find({ shipperEmail: email });

    // get notification from the shipper
    const notification = shipper.notification;

    // Send the data and status 200
    res
      .status(200)
      .json({ loads, firstName, lastName, email, status, notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting History
// route    GET /api/postload
// @access  Private
export const getPostLoad = asyncHandler(async (req, res) => {
  // Get the user info from the cookie
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    status: req.user.status,
  };

  // Assign the email to the email extracted from the cookie
  const email = user.email;

  // find shipper using the extracted email
  const shipper = await Shipper.findOne({ email: user.email });

  // Get the notification from the shipper
  const notification = shipper.notification;

  // send the data with status 200
  res.status(200).json({ user, notification, email });
});

// @desc    Getting History
// route    GET /api/history
// @access  Private
export const getHistory = asyncHandler(async (req, res) => {
  try {
    // Extract the information from the cookie
    const { email, firstName, lastName, status } = req.user;

    // extract the loads using the extracted email and status "Delivered"
    const loads = await Marketplace.find({
      shipperEmail: email,
      status: "Delivered",
    });

    // extract shipper information using the email
    const shipper = await Shipper.findOne({ email: email });

    // extract notification from the shipper
    const notification = shipper.notification;

    // send the data over
    res
      .status(200)
      .json({ loads, firstName, lastName, email, status, notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Shipper Settings
// route    GET /api/shippersettings
// @access  Private
export const getShipperSettings = asyncHandler(async (req, res) => {
  // extract the information from the cookie
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    status: req.user.status,
  };

  // assign email to the cookie
  const email = user.email;

  // find the shipper based on the email
  const shipper = await Shipper.findOne({ email: user.email });

  // if shipper doesnt exist, throw an error
  if (!shipper) {
    return res.status(404).json({ message: "Shipper not found" });
  }

  // construct response
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
    statusReasonChange: shipper.statusReasonChange,
  };
  // construct notification from the shipper
  const notification = shipper.notification;

  // send the response
  res.status(200).json({ user, response, email, notification });
});

// @desc    Getting Shipper Contact Details
// route    GET /api/shippercontactdetails
// @access  Private
export const getShipperContactDetails = asyncHandler(async (req, res) => {
  try {
    // get the email from the cookie
    const userEmail = req.user.email;

    // find the shipper using the email
    const shipper = await Shipper.findOne({ email: userEmail });

    // if shipper doesnt exist, send error
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }

    // extract status
    const status = {
      areContactDetailsComplete: shipper.areContactDetailsComplete,
    };

    // send the status
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
    // extract the email from the cookie
    const userEmail = req.user.email;

    // find shipper based on the extracted email
    const shipper = await Shipper.findOne({ email: userEmail });

    // if there is no email, send error message
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }

    // extract status
    const status = {
      areBusinessDetailsComplete: shipper.areBusinessDetailsComplete,
    };

    // send status
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
    // extract email from the cookie
    const userEmail = req.user.email;

    // find shipper based on the email
    const shipper = await Shipper.findOne({ email: userEmail });

    // if there is no email, throw an error
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }

    // construct response
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

    // send response
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
  // extract email from the cookie
  const shipperEmail = req.user.email;

  // find shipper based on the email
  const shipperExist = await Shipper.findOne({ email: shipperEmail });

  // if there is no shipper, throw an error
  if (!shipperExist) {
    return res.status(404).json({ message: "Shipper not found" });
  }

  // assign data
  const shipperFirstName = shipperExist.firstName;
  const shipperLastName = shipperExist.lastName;
  const shipperPhoneNumber = shipperExist.companyPhoneNumber;
  const shipperCompanyName = shipperExist.businessName;

  // extract from the form
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

  // assign data
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
    carrierPhoneNumber: "",
    carrierBusinessName: "",
    carrierDoingBusinessAs: "",
    driverFirstName: "",
    driverLastName: "",
    driverPhoneNumber: "",
    driverEmail: "",
  };

  // if there is file, assign the file path
  if (req.file) {
    postLoad.additionalDocument = req.file.path;
  } else {
  }

  // now create the postload in marketplace
  try {
    const newLoad = await Marketplace.create(postLoad);

    // if the new load is created, send success message
    if (newLoad) {
      res
        .status(200)
        .json({ message: "Load posted successfully", load: newLoad });
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
    // extract email from the cookie
    const shipperEmail = req.user.email;
    // find shipper using email
    const shipper = await Shipper.findOne({ email: shipperEmail });

    // if there is no email, throw an error
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }

    // get the information from the form
    const { title, description, date, location } = req.body;

    // construct the data to be saved
    const newEvent = { title, description, date, location };

    // now push the data in the database and save
    shipper.events.push(newEvent);
    await shipper.save();

    // if success, send message
    res
      .status(201)
      .json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

////////////////////////////// PUTTERS //////////////////////////////

// @desc    Updating Load
// route    PUT /api/postload:id
// @access  Private
export const updateLoad = asyncHandler(async (req, res) => {
  // Get the id from the URL
  const { id } = req.params;

  // Get the data from the body
  let updateData = { ...req.body };
  try {
    // find the load from the marketplace using id
    const load = await Marketplace.findById(id);

    // if there is no load, throw an error
    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }
    // if there is file save the path and delete the other file
    if (req.file) {
      updateData.additionalDocument = req.file.path;
      if (load.additionalDocument) {
        deleteFiles(load.additionalDocument);
      }
      // if there is no file, just delete the file and send the path to be ""
    } else if (!req.body.additionalDocument && load.additionalDocument) {
      deleteFiles(load.additionalDocument);
      updateData.additionalDocument = "";
    }

    // update the load, by finding with id
    const updatedLoad = await Marketplace.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    res.json(updatedLoad);
  } catch (error) {
    console.error("Error in updateLoad:", error);
    res
      .status(400)
      .json({ message: "Error updating load", error: error.message });
  }
});

// @desc    Update Shipper Contact Details
// route    PUT /api/shippercontactdetails
// @access  Private
export const updateShipperContactDetails = asyncHandler(async (req, res) => {
  // Get the email from the cookie
  const email = req.user.email;

  // find the shipper using the email
  const shipperExist = await Shipper.findOne({ email });

  // get the data from the form
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

  // handle the case when sameAsMailig is "yes"
  if (sameAsMailing == "yes") {
    mailingStreetAddress = streetAddress;
    mailingApptNumber = apptNumber;
    mailingCity = city;
    mailingProvince = province;
    mailingPostalCode = postalCode;
    mailingCountry = country;
  }

  // Throw error, if cant find the data
  else {
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

  // Now if shipper is there, find the shipper using id and update
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

    // if shipper is updated, throw success message
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
  // Extract email from the cookie
  const email = req.user.email;

  // find the shipper based on the email
  const shipperExist = await Shipper.findOne({ email });

  // if there is no shipper, throw an error
  if (!shipperExist) {
    return res.status(404).json({ message: "Shipper not found" });
  }

  // get the data from the form
  const { businessName, businessNumber, website } = req.body;

  // if there is no data, throw an error
  if (!businessName || !businessNumber) {
    return res
      .status(400)
      .json({ message: "Business name and number are required" });
  }

  // construct the data to be updated
  const updateData = {
    businessName,
    businessNumber,
    website,
    areBusinessDetailsComplete: true,
  };

  // if there is proof of business, push it to the constructed data
  if (
    req.files &&
    req.files.proofBusiness &&
    req.files.proofBusiness.length > 0
  ) {
    updateData.proofBusiness = req.files.proofBusiness[0].path;
  }

  // if there is proof of insurance, push it to the constructed data
  if (
    req.files &&
    req.files.proofInsurance &&
    req.files.proofInsurance.length > 0
  ) {
    updateData.proofInsurance = req.files.proofInsurance[0].path;
  }

  // Update the data by finding using email
  try {
    const updatedShipper = await Shipper.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    // if data is updated, send success message
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
  // Extract email from the cookie
  const email = req.user.email;

  // find shipper using email
  const shipperExist = await Shipper.findOne({ email });

  // if there is no shipper throw an error
  if (!shipperExist) {
    return res.status(404).json({ message: "Shipper not found" });
  }

  // get data from the form
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

  // If there is data missing, throw an error
  if (!businessName || !businessNumber) {
    return res
      .status(400)
      .json({ message: "Business name and number are required" });
  }

  // construct data to be saved
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

  // if there is proof of business
  if (
    req.files &&
    req.files.proofBusiness &&
    req.files.proofBusiness.length > 0
  ) {
    // if there is proof of business, push to delete
    if (shipperExist.proofBusiness) {
      filesToDelete.push(shipperExist.proofBusiness);
    }
    // push the path to the constructed data
    updateData.proofBusiness = req.files.proofBusiness[0].path;
  }

  // if there is proof of insurance
  if (
    req.files &&
    req.files.proofInsurance &&
    req.files.proofInsurance.length > 0
  ) {
    // if there is proof of insurance, push to delete
    if (shipperExist.proofInsurance) {
      filesToDelete.push(shipperExist.proofInsurance);
    }
    // push the path to the constructed data
    updateData.proofInsurance = req.files.proofInsurance[0].path;
  }

  // update data by finding email
  try {
    const updatedShipper = await Shipper.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );
    // Now delete the files
    if (filesToDelete.length > 0) {
      deleteFiles(filesToDelete);
    }
    // send the 200 status
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
  // extract email from the cookie
  const email = req.user.email;

  // find shipper using email
  const shipperExist = await Shipper.findOne({ email });

  // if there is no shipper, send status 404
  if (!shipperExist) {
    return res.status(404).json({ message: "Shipper not found" });
  }

  // construct the updated data
  const updateData = {
    isFormComplete: true,
  };

  // find the shipper using email and update data
  try {
    const updatedShipper = await Shipper.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    // if shipper updated, send status 200
    if (updatedShipper) {
      res.status(200).json({ shipper: updatedShipper });
    } else {
      res.status(404).json({ message: "Unable to update shipper details" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

////////////////////////////// DELETERS //////////////////////////////

// @desc    Delete Load
// route    DELETE /api/users/activeloads/${loadId}
// @access  Private
export const deleteLoad = asyncHandler(async (req, res) => {
  // get the id from the url
  const { id } = req.params;

  // find the load in the Marketplace using id
  try {
    const load = await Marketplace.findById(id);

    // if there is no load, send status 404
    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }

    // if there is file, delete it
    if (load.additionalDocument) {
      deleteFiles(load.additionalDocument);
    }

    // find the load using id and delete it
    await Marketplace.findByIdAndDelete(id);

    // if the load is deleted send status 200
    res.status(200).json({ message: "Load deleted successfully" });
  } catch (error) {
    console.error("Error deleting load:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
