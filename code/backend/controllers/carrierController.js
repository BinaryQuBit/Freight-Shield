// Async Handler Import
import asyncHandler from "express-async-handler";

// Model Imports
import Carrier from "../models/carrierModel.js";
import Marketplace from "../models/marketplaceModel.js";
import Driver from "../models/driverModel.js";

// Delete Middleware Import
import { deleteFiles } from "../middleware/delete.js";

////////////////////////////// GETTERS //////////////////////////////

// @desc    Getting Dashboard
// route    GET /api/carrierdashboard
// @access  Private
export const carrierDasboard = asyncHandler(async (req, res) => {
  try {
    // Requesting user email from the cookie
    const userEmail = req.user.email;

    // Finding Carrier based on the email
    const carrier = await Carrier.findOne({ email: userEmail });

    // If there is no carrier, throw error
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    // Making an object based on the information that needs to be sent
    const response = {
      firstName: carrier.firstName,
      lastName: carrier.lastName,
      events: carrier.events,
      status: carrier.status,
      notification: carrier.notification,
      email: userEmail,
    };

    // When status is OK, responed with the constructed response
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Marketplace
// route    GET /api/marketplace
// @access  Private
export const getMarketplace = asyncHandler(async (req, res) => {
  try {
    // Requesting email from the cookie
    const userEmail = req.user.email;

    // Creating empty units and driverData
    let units = [];
    let driverData = [];

    // Any load that is Pending
    const pendingLoads = await Marketplace.find({ status: "Pending" });

    // Find Carrier information from the database
    const carrier = await Carrier.findOne({ email: userEmail });

    // Constructing user object based on the cookie and founded carrier
    const user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      status: req.user.status,
    };

    const notification = carrier.notification;
    const email = user.email;

    // If there is Carrier, map the units profiles
    if (carrier) {
      units = carrier.units
        .filter(
          (unit) =>
            unit.unitStatus !== "maintenance" && unit.unitStatus !== "In Use"
        )
        .map((unit) => ({
          unitNumber: unit.unitNumber,
        }));

      // Extracting CCC from the carrier
      const canadianCarrierCode = carrier.canadianCarrierCode;

      // Finding Drivers based on the carrier
      const drivers = await Driver.find({
        canadianCarrierCode: canadianCarrierCode,
      });

      // Filtering Drivers based on the driver statuses
      const filteredDrivers = drivers.filter(
        (driver) =>
          driver.driverStatus !== "Declined" &&
          driver.driverStatus !== "Pending" &&
          driver.driverLoadStatus !== "Assigned" &&
          driver.driverLoadStatus !== "Not Available"
      );

      // Mapping drivers information into an array of objects to be included into the response
      driverData = filteredDrivers.map((driver) => ({
        driverId: driver._id,
        firstName: driver.firstName,
        lastName: driver.lastName,
      }));
    }

    // Constructing Response Data
    const responseData = {
      loads: pendingLoads,
      units,
      driverData,
      user,
      notification,
      email,
    };

    // If Response is ok, send the data in json format
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting My Loads
// route    GET /api/myloads
// @access  Private
export const getMyLoads = asyncHandler(async (req, res) => {
  // Requesting Email from the cookie
  const carrierEmail = req.user.email;

  // Accssing Data from Models Marketplace abd Carrier
  const myLoads = await Marketplace.find({ carrierEmail: carrierEmail });
  const carrier = await Carrier.findOne({ email: carrierEmail });

  // If there is no Carrier, send response with error message
  if (!carrier) {
    return res.status(404).json({ message: "Carrier not found" });
  }

  // Requesting user in session information
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    status: req.user.status,
  };

  // Accessing Notification from the carrier
  const notification = carrier.notification;

  // If there is load send send json format response
  if (myLoads.length > 0) {
    res
      .status(200)
      .json({
        myLoads: myLoads,
        user: user,
        notification,
        email: carrierEmail,
      });

    // else make the loads empty and send rest of the information
  } else {
    res
      .status(200)
      .json({
        myLoads: [],
        user: user,
        notification,
        email: carrierEmail,
        message: "No loads found for this carrier",
      });
  }
});

// @desc    Getting Driver Profiles
// route    GET /api/driverprofiles
// @access  Private
export const getDriverProfiles = asyncHandler(async (req, res) => {
  try {
    // Requesting email from the cookie
    const userEmail = req.user.email;

    // Finding information of the Carrier using email
    const carrier = await Carrier.findOne({ email: userEmail });

    // if there is no carrier, send the error message
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    // notification and cc code extracting from carrier
    const notification = carrier.notification;
    const canadianCarrierCode = carrier.canadianCarrierCode;

    // Look for the drivers that match the cc code
    const drivers = await Driver.find({
      canadianCarrierCode: canadianCarrierCode,
    });

    // filter the drivers that are not declined
    const filteredDrivers = drivers.filter(
      (driver) => driver.driverStatus !== "declined"
    );

    // User information from the cookie
    const user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      canadianCarrierCode: canadianCarrierCode,
      status: req.user.status,
    };

    // Map the drivers into an array of objects
    const driverData = filteredDrivers.map((driver) => ({
      driver_id: driver._id,
      driverAbstract: driver.driverAbstract,
      driverLicenceFront: driver.driverLicenceFront,
      driverLicenceBack: driver.driverLicenceBack,
      email: driver.email,
      firstName: driver.firstName,
      lastName: driver.lastName,
      phoneNumber: driver.phoneNumber,
      driverStatus: driver.driverStatus,
      driverCanadianCarrierCode: driver.canadianCarrierCode,
    }));

    // Send the response in json format
    res.status(200).json({ driverData, user, email: userEmail, notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Unit Profiles
// route    GET /api/unitprofiles
// @access  Private
export const getUnitProfiles = asyncHandler(async (req, res) => {
  try {
    // Extract email from cookie
    const userEmail = req.user.email;

    // Get carrier information using the email
    const carrier = await Carrier.findOne({ email: userEmail });

    // extract rest of the information using cookie
    const user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      status: req.user.status,
    };

    // extract notification from the carrier
    const notification = carrier.notification;

    // if there is no carrier, send the error message
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    // map the units associcated to the carrier
    const units = carrier.units.map((unit) => {
      return {
        unitNumber: unit.unitNumber,
        unitType: unit.unitType,
        trailerType: unit.trailerType,
        unitMake: unit.unitMake,
        unitModel: unit.unitModel,
        unitYear: unit.unitYear,
        unitVIN: unit.unitVIN,
        unitLicencePlate: unit.unitLicencePlate,
        unitStatus: unit.unitStatus,
        unitRegistration: unit.unitRegistration,
        unitInsurance: unit.unitInsurance,
        unitSafety: unit.unitSafety,
      };
    });

    // Response sent in the JSON format
    res.status(200).json({ units, user, notification, email: userEmail });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Carrier Settings
// route    GET /api/carriersettings
// @access  Private
export const getCarrierSettings = asyncHandler(async (req, res) => {
  // Extract user information from the cookie
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    status: req.user.status,
  };

  // Find the Carrier using the information
  const carrier = await Carrier.findOne({ email: user.email });
  if (!carrier) {
    return res.status(404).json({ message: "carrier not found" });
  }

  // Construct the object with the data from the the Carrier
  const response = {
    firstName: carrier.firstName,
    lastName: carrier.lastName,
    companyPhoneNumber: carrier.companyPhoneNumber,
    streetAddress: carrier.streetAddress,
    apptNumber: carrier.apptNumber,
    city: carrier.city,
    province: carrier.province,
    postalCode: carrier.postalCode,
    country: carrier.country,
    mailingStreetAddress: carrier.mailingStreetAddress,
    mailingApptNumber: carrier.mailingApptNumber,
    mailingCity: carrier.mailingCity,
    mailingProvince: carrier.mailingProvince,
    mailingPostalCode: carrier.mailingPostalCode,
    mailingCountry: carrier.mailingCountry,
    businessName: carrier.businessName,
    doingBusinessAs: carrier.doingBusinessAs,
    businessNumber: carrier.businessNumber,
    carrierProfile: carrier.carrierProfile,
    safetyFitnessCertificate: carrier.safetyFitnessCertificate,
    canadianCarrierCode: carrier.canadianCarrierCode,
    nationalSafetyCode: carrier.nationalSafetyCode,
    wcb: carrier.wcb,
    website: carrier.website,
    statusReasonChange: carrier.statusReasonChange,
  };

  // Get the Notification from the carrier
  const notification = carrier.notification;

  // Send the Response in JSON format
  res.status(200).json({ user, response, email: user.email, notification });
});

// @desc    Getting Carrier Company Details
// route    GET /api/carriercontactdetails
// @access  Private
export const getCarrierContactDetails = asyncHandler(async (req, res) => {
  try {
    // Extract email from the cookie
    const userEmail = req.user.email;

    // Find the carrier using the email
    const carrier = await Carrier.findOne({ email: userEmail });

    // if there is no carrier, send the error message
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    // Get the status out of the carrier
    const status = {
      areContactDetailsComplete: carrier.areContactDetailsComplete,
    };

    // Response in JSON format
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Carrier Business Details
// route    GET /api/carrierbusinessdetails
// @access  Private
export const getCarrierBusinessDetails = asyncHandler(async (req, res) => {
  try {
    //  Extract the email from the cookie
    const userEmail = req.user.email;

    // get the carrier information using the email
    const carrier = await Carrier.findOne({ email: userEmail });

    // if there is no carrier, send the response in error message
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    // Get the status of the carrier
    const status = {
      areBusinessDetailsComplete: carrier.areBusinessDetailsComplete,
    };

    // send the status of the carrier in JSON format
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Carrier Submission
// route    GET /api/carriersubmission
// @access  Private
export const getCarrierSubmission = asyncHandler(async (req, res) => {
  try {
    // Extract the email from the cookie
    const userEmail = req.user.email;

    // Get the carrier information using the cookie's email
    const carrier = await Carrier.findOne({ email: userEmail });

    // If there is no carrier, response it with the error message
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    // construct the response with carrier information
    const response = {
      firstName: carrier.firstName,
      lastName: carrier.lastName,
      companyPhoneNumber: carrier.companyPhoneNumber,
      streetAddress: carrier.streetAddress,
      apptNumber: carrier.apptNumber,
      city: carrier.city,
      province: carrier.province,
      postalCode: carrier.postalCode,
      country: carrier.country,
      mailingStreetAddress: carrier.mailingStreetAddress,
      mailingApptNumber: carrier.mailingApptNumber,
      mailingCity: carrier.mailingCity,
      mailingProvince: carrier.mailingProvince,
      mailingPostalCode: carrier.mailingPostalCode,
      mailingCountry: carrier.mailingCountry,
      businessName: carrier.businessName,
      businessNumber: carrier.businessNumber,
      carrierProfile: carrier.carrierProfile,
      safetyFitnessCertificate: carrier.safetyFitnessCertificate,
      canadianCarrierCode: carrier.canadianCarrierCode,
      nationalSafetyCode: carrier.nationalSafetyCode,
      wcb: carrier.wcb,
      website: carrier.website,
      isFormComplete: carrier.isFormComplete,
    };

    // send the response in JSON format
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Drivers and Units
// route    GET /api/getunitdriver
// @access  Private
export const getUnitDriver = asyncHandler(async (req, res) => {
  try {
    // Extract the email from the cookie
    const userEmail = req.user.email;

    // find the carrier using the email
    const carrier = await Carrier.findOne({ email: userEmail });

    // if there is no carrier, response it with the error message
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    // Map the unit numbers
    const units = carrier.units.map((unit) => ({
      unitNumber: unit.unitNumber,
    }));

    // Extract the carrier code from the model
    const canadianCarrierCode = carrier.canadianCarrierCode;

    // using the carrier code find drivers
    const drivers = await Driver.find({
      canadianCarrierCode: canadianCarrierCode,
    });

    // filtered the drivers that are in not declined and not pending
    const filteredDrivers = drivers.filter(
      (driver) =>
        driver.driverStatus !== "declined" && driver.driverStatus !== "pending"
    );

    // map the drivers with the following information
    const driverData = filteredDrivers.map((driver) => ({
      firstName: driver.firstName,
      lastName: driver.lastName,
    }));

    // send the response of the data in JSON format
    res.status(200).json({ units, driverData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

////////////////////////////// POSTERS //////////////////////////////

// @desc    Adding Unit Profiles
// route    POST /api/postunit
// @access  Private
export const postUnit = asyncHandler(async (req, res) => {
  // Extract the email from the cookie
  const carrierEmail = req.user.email;

  // Extract the carrier information using the email from the model
  const carrier = await Carrier.findOne({ email: carrierEmail });

  // If there is no carrier, send the error message
  if (!carrier) {
    return res.status(404).json({ message: "Carrier not found" });
  }

  // Request information from the form
  const {
    unitNumber,
    unitType,
    trailerType,
    unitMake,
    unitModel,
    unitYear,
    unitVIN,
    unitLicencePlate,
    unitStatus,
  } = req.body;

  // Construct the object of the unit with the following unit information
  const unitData = {
    unitNumber,
    unitType,
    trailerType,
    unitMake,
    unitModel,
    unitYear,
    unitVIN,
    unitLicencePlate,
    unitStatus,
  };

  // If there is a unitRegistration, extract the path
  if (
    req.files &&
    req.files.unitRegistration &&
    req.files.unitRegistration.length > 0
  ) {
    unitData.unitRegistration = req.files.unitRegistration[0].path;
  }

  // If there is unitInsurance, extract the path
  if (
    req.files &&
    req.files.unitInsurance &&
    req.files.unitInsurance.length > 0
  ) {
    unitData.unitInsurance = req.files.unitInsurance[0].path;
  }
  if (req.files && req.files.unitSafety && req.files.unitSafety.length > 0) {
    unitData.unitSafety = req.files.unitSafety[0].path;
  }

  try {
    // Add the unit data
    await carrier.addUnit(unitData);

    // If response is 200, send the success message
    res
      .status(200)
      .json({ message: "Unit added successfully", unit: unitData });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
});

// @desc    Update Driver Status on load
// route    PUT /api/updatedriverstatusload
// @access  Private
export const postCarrierEvents = async (req, res) => {
  try {
    // Extract the email from the cookie
    const carrierEmail = req.user.email;

    // Find the carrier using the email from the model
    const carrier = await Carrier.findOne({ email: carrierEmail });

    // IF there is no carrier, send the error message
    if (!carrier) {
      return res.status(400).json({ message: "Carrier not found" });
    }

    // Extract information from the form
    const { title, description, date, location } = req.body;

    // Construct new event information
    const newEvent = { title, description, date, location };

    // Push the new event data
    carrier.events.push(newEvent);

    // Save the information
    await carrier.save();

    // If response status is 201, send the success message
    res
      .status(201)
      .json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

////////////////////////////// PUTTERS //////////////////////////////

// @desc    Assigning Unit
// route    PUT /api/marketplace/:id
// @access  Private
export const updateAssignUnit = asyncHandler(async (req, res) => {
  // Extract the loadId from the url
  const loadId = req.params.id;

  // Extract the email from the cookie
  const carrierEmail = req.user.email;

  // request the information from the form
  const { status, assignedUnit } = req.body;

  // Find the load in the marketplace using the loadID
  const updatedLoad = await Marketplace.findByIdAndUpdate(
    loadId,
    {
      // update the information
      $set: {
        status: status,
        assignedUnit: assignedUnit,
        carrierEmail: carrierEmail,
      },
    },
    { new: true, runValidators: true }
  );

  // If no load found, send the error message
  if (!updatedLoad) {
    return res.status(404).json({ message: "Load not found." });
  }

  // If the status is 200, send the success message
  res
    .status(200)
    .json({ message: "Load updated successfully", load: updatedLoad });
});

// @desc    Update Carrier Contact Details
// route    PUT /api/carriercontactdetails
// @access  Private
export const updateCarrierContactDetails = asyncHandler(async (req, res) => {
  // Extract email from the cookie
  const email = req.user.email;

  // Extract Carrier information using email
  const carrierExist = await Carrier.findOne({ email });

  // Requesting Data from the form
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

  // If the data includes "sameAsMailing"
  if (sameAsMailing == "yes") {
    mailingStreetAddress = streetAddress;
    mailingApptNumber = apptNumber;
    mailingCity = city;
    mailingProvince = province;
    mailingPostalCode = postalCode;
    mailingCountry = country;
  } else {
    // Error Checks
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

  // If the carrier does exist then update by finding email
  if (carrierExist) {
    const updatedCarrier = await Carrier.findOneAndUpdate(
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

    // If Carrier is updated, send 200 OK status
    if (updatedCarrier) {
      res.status(200).json({ carrier: updatedCarrier });
    } else {
      res.status(404).json({ message: "Carrier not found" });
    }
  } else {
    res.status(404).json({ message: "Carrier not found" });
  }
});

// @desc    Update Carrier Business Details
// route    PUT /api/carrierbusinessdetails
// @access  Private
export const updateCarrierBusinessDetails = asyncHandler(async (req, res) => {
  // Extract email from the cookie
  const email = req.user.email;

  // Extract Carrier information using email from the model
  const carrierExist = await Carrier.findOne({ email });

  // If there is no carrier, send the response that Carrier doesnt exist
  if (!carrierExist) {
    return res.status(404).json({ message: "Carrier not found" });
  }

  // Request information from the form
  const {
    businessName,
    doingBusinessAs,
    businessNumber,
    canadianCarrierCode,
    nationalSafetyCode,
    wcb,
    website,
  } = req.body;

  // Construct the data to be pushed
  const updateData = {
    businessName,
    doingBusinessAs,
    businessNumber,
    canadianCarrierCode,
    nationalSafetyCode,
    wcb,
    website,
    areBusinessDetailsComplete: true,
  };

  // If there is carrier profile push it to the constructed data
  if (
    req.files &&
    req.files.carrierProfile &&
    req.files.carrierProfile.length > 0
  ) {
    updateData.carrierProfile = req.files.carrierProfile[0].path;
  }

  // if there is safety fitness certificate push it to the constructed data
  if (
    req.files &&
    req.files.safetyFitnessCertificate &&
    req.files.safetyFitnessCertificate.length > 0
  ) {
    updateData.safetyFitnessCertificate =
      req.files.safetyFitnessCertificate[0].path;
  }

  // Now find carrier using the email and update it
  try {
    const updatedCarrier = await Carrier.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    // If carrier gets updated, then send status 200 with the updated information
    if (updatedCarrier) {
      res.status(200).json({ carrier: updatedCarrier });
    } else {
      res.status(404).json({ message: "Unable to update carrier details" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Update Carrier Details
// route    PUT /api/carriersubmissiondetails
// @access  Private
export const updateCarrierSubmissionDetails = asyncHandler(async (req, res) => {
  // Extract email from the cookie
  const email = req.user.email;

  // find the carrier using the email
  const carrierExist = await Carrier.findOne({ email });

  // if there is no carrier, send response error
  if (!carrierExist) {
    return res.status(404).json({ message: "Carrier not found" });
  }

  // get information from the form
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
    doingBusinessAs,
    businessNumber,
    canadianCarrierCode,
    nationalSafetyCode,
    wcb,
    website,
  } = req.body;

  // Construct the data that is being updated
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
    doingBusinessAs,
    businessNumber,
    canadianCarrierCode,
    nationalSafetyCode,
    wcb,
    website,
  };

  // initiate empty array
  const filesToDelete = [];

  // if there is a carrierProfile, push it to the constructed data object
  if (
    req.files &&
    req.files.carrierProfile &&
    req.files.carrierProfile.length > 0
  ) {
    if (carrierExist.carrierProfile) {
      filesToDelete.push(carrierExist.carrierProfile);
    }
    updateData.carrierProfile = req.files.carrierProfile[0].path;
  }

  // if there is safetyFitnessCertificate, push it to the constructed data object
  if (
    req.files &&
    req.files.safetyFitnessCertificate &&
    req.files.safetyFitnessCertificate.length > 0
  ) {
    if (carrierExist.safetyFitnessCertificate) {
      filesToDelete.push(carrierExist.safetyFitnessCertificate);
    }
    updateData.safetyFitnessCertificate =
      req.files.safetyFitnessCertificate[0].path;
  }

  // find the carrier and push the updated data
  try {
    const updatedCarrier = await Carrier.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    // Now delete the old files
    if (filesToDelete.length > 0) {
      deleteFiles(filesToDelete);
    }

    // If the update does push through, send the success response
    if (updatedCarrier) {
      res.status(200).json({ carrier: updatedCarrier });
    } else {
      res.status(404).json({ message: "Unable to update carrier details" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Update Carrier Status
// route    PUT /api/updatecarrierstatus
// @access  Private
export const updateCarrierStatus = asyncHandler(async (req, res) => {
  // Get email from the cookie
  const email = req.user.email;

  // Find the carrier using the email from the model
  const carrierExist = await Carrier.findOne({ email });

  // If there is no carrier, send a error message
  if (!carrierExist) {
    return res.status(404).json({ message: "Carrier not found" });
  }

  // Construct the update data
  const updateData = {
    isFormComplete: true,
  };

  // Find the carrier and push the data
  try {
    const updatedCarrier = await Carrier.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    // If data update is success, then send a 200 response
    if (updatedCarrier) {
      res.status(200).json({ carrier: updatedCarrier });
    } else {
      res.status(404).json({ message: "Unable to update carrier details" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Update Driver Status
// route    PUT /api/updatedriverstatus
// @access  Private
export const updateDriverStatus = asyncHandler(async (req, res) => {
  // Get the driver Id from the url
  const driverId = req.params.driverId;

  // get the status and reason from the form
  const newStatus = req.body.status;
  const reason = req.body.reason;

  // If the status dont match the following, send error message
  if (!["Decline", "Approved"].includes(newStatus)) {
    return res.status(400).json({ message: "Invalid status update" });
  }

  // construct the status data and has to match the following
  const statusToUpdate = newStatus === "Decline" ? "Declined" : "Approved";

  // update status by finding the driver and setting the required fields
  try {
    const result = await Driver.updateOne(
      { _id: driverId },
      { $set: { driverStatus: statusToUpdate, declineReason: reason } }
    );

    // If the result.modified count is 1, then send success message
    if (result.modifiedCount === 1) {
      res.json({ message: "Driver status updated successfully." });
    } else {
      res.status(404).json({ message: "Driver not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating driver status", error: error });
  }
});

// @desc    Update Driver Status on load
// route    PUT /api/updatedriverstatusload
// @access  Private
export const updateDriverStatusLoad = asyncHandler(async (req, res) => {
  // Request data from the form
  const { unitNumber, driverId, loadId } = req.body;

  // Extract email from the cookie
  const userEmail = req.user.email;

  try {
    // Extract carrier using the email from the model
    const carrier = await Carrier.findOne({ email: userEmail });

    // If carrier doesnt exists, send an error message
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    // Find the required unit
    const unitProfile = carrier.units.find((u) => u.unitNumber === unitNumber);
    const unitID = unitProfile._id;

    // If there is no unit, send the error message
    if (!unitProfile) {
      return res
        .status(404)
        .json({ message: "Unit not found within the carrier's fleet" });
    }

    // Find the load by the loadid
    const load = await Marketplace.findById(loadId);

    // if there is no load, send error message
    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }

    // find the driver by driverid
    const driver = await Driver.findById(driverId);

    // if there is no driver, send error message
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // construct the load information
    load.status = "Assigned";
    load.carrierFirstName = carrier.firstName;
    load.carrierLastName = carrier.lastName;
    (load.carrierEmail = carrier.email),
      (load.carrierPhoneNumber = carrier.companyPhoneNumber);
    load.carrierBusinessName = carrier.businessName;
    load.carrierDoingBusinessAs = carrier.doingBusinessAs;
    load.driverFirstName = driver.firstName;
    load.driverLastName = driver.lastName;
    load.driverPhoneNumber = driver.phoneNumber;
    load.driverEmail = driver.email;

    // save the load
    await load.save();

    // construct the driver information
    driver.driverLoadStatus = "Assigned";
    driver.currentLoad = loadId;
    driver.unitID = unitID;

    // save the driver information
    await driver.save();

    // construct the unit information
    unitProfile.unitStatus = "In Use";

    // save the unit information
    await carrier.save();

    // If the status is 200 ok, then send the success message
    res.status(200).json({
      message: "Load, driver, and unit status updated successfully",
      load: load,
      driver: driver,
      unit: unitProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update Unit
// route    PUT /api/updateunit/:unitNumber
// @access  Private
export const updateUnit = asyncHandler(async (req, res) => {
  // extract the unit number from the url
  const { unitNum } = req.params;

  // request the email from the cookie
  const carrierEmail = req.user.email;

  // find the carrier using the email from the model
  const carrier = await Carrier.findOne({ email: carrierEmail });

  // if there is no carrier, then send the error message
  if (!carrier) {
    return res.status(404).json({ message: "Carrier not found" });
  }

  try {
    // update the unit
    await carrier.updateUnit(unitNum, req.body);

    // if the unit is updated, send the success message
    res.status(200).json({ message: "Unit updated successfully" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
  }
});

////////////////////////////// DELETERS //////////////////////////////
// @desc    Delete Units
// route    DELETE /api/units/:unitNumber
// @access  Private
export const deleteUnit = asyncHandler(async (req, res) => {
  // Extract the unit number from the url
  const unitNumber = req.params.unitNumber;

  // extract the email from the cookie
  const carrierId = req.user._id;

  // find the carrier using the email from the model
  const carrier = await Carrier.findById(carrierId);

  // If there is no carrier, send error message
  if (!carrier) {
    res.status(404);
    throw new Error("Carrier not found");
  }

  // Find the unit
  const unitIndex = carrier.units.findIndex(
    (unit) => unit.unitNumber === unitNumber
  );

  // If there is no unit, send an error message
  if (unitIndex === -1) {
    res.status(404);
    throw new Error("Unit not found");
  }

  // splice the units from unitIndex to next index
  carrier.units.splice(unitIndex, 1);

  // save the unit
  await carrier.save();

  // just send status 204
  res.status(204).json();
});
