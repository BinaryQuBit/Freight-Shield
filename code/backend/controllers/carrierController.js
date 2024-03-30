// Async Handler Import
import asyncHandler from "express-async-handler";

// Model Imports
import Carrier from "../models/carrierModel.js";
import Marketplace from "../models/marketplaceModel.js";
import Driver from "../models/driverModel.js";

// Delete Middleware Import
import {deleteFiles} from "../middleware/delete.js";

////////////////////////////// Getters //////////////////////////////

// @desc    Getting Dashboard
// route    GET /api/carrierdashboard 
// @access  Private
export const carrierDasboard = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const carrier = await Carrier.findOne({ email: userEmail });
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" }); 
    }
    const response = {
      firstName: carrier.firstName,
      lastName: carrier.lastName,
      events: carrier.events,
    };

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
    const pendingLoads = await Marketplace.find({ status: "Pending" });
    const userEmail = req.user.email;
    const carrier = await Carrier.findOne({ email: userEmail });
    const user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
    let units = [];
    let driverData = [];

    if (carrier) {
      units = carrier.units
        .filter(
          (unit) =>
            unit.unitStatus !== "maintenance" && unit.unitStatus !== "In Use"
        )
        .map((unit) => ({
          unitNumber: unit.unitNumber,
        }));

      const canadianCarrierCode = carrier.canadianCarrierCode;
      const drivers = await Driver.find({
        canadianCarrierCode: canadianCarrierCode,
      });
      const filteredDrivers = drivers.filter(
        (driver) =>
          driver.driverStatus !== "Declined" &&
          driver.driverStatus !== "Pending" &&
          driver.driverLoadStatus !== "Assigned" &&
          driver.driverLoadStatus !== "Not Available"
      );
      driverData = filteredDrivers.map((driver) => ({
        driverId: driver._id,
        firstName: driver.firstName,
        lastName: driver.lastName,
      }));
    }

    const responseData = {
      loads: pendingLoads,
      units,
      driverData,
      user,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// @desc    Getting My Loads
// route    GET /api/myloads
// @access  Private
export const getMyLoads = asyncHandler(async (req, res) => {
  const carrierEmail = req.user.email;
  console.log("Carrier Email", carrierEmail);

  const myLoads = await Marketplace.find({ carrierEmail: carrierEmail });
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };
  if (myLoads.length > 0) {
    res.status(200).json({ myLoads: myLoads, user: user });
  } else {
    res.status(500).json({ message: "No loads found for this carrier" });
  }
});

// @desc    Getting Driver Profiles
// route    GET /api/driverprofiles
// @access  Private
export const getDriverProfiles = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const carrier = await Carrier.findOne({ email: userEmail });
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }
    const canadianCarrierCode = carrier.canadianCarrierCode;
    const drivers = await Driver.find({
      canadianCarrierCode: canadianCarrierCode,
    });
    const filteredDrivers = drivers.filter(
      (driver) => driver.driverStatus !== "declined"
    );
    const user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      canadianCarrierCode: canadianCarrierCode,
    };
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
    res.status(200).json({ driverData, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// @desc    Getting Unit Profiles
// route    GET /api/unitprofiles
// @access  Private
export const getUnitProfiles = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const carrier = await Carrier.findOne({ email: userEmail });
    const user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }
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

    res.status(200).json({ units, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Carrier Settings
// route    GET /api/carriersettings
// @access  Private
export const getCarrierSettings = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };
  const carrier = await Carrier.findOne({ email: user.email });
    if (!carrier) {
  return res.status(404).json({ message: "carrier not found" }); 
}
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
};
  res.status(200).json({ user, response });
});

// @desc    Getting Carrier Company Details
// route    GET /api/carriercontactdetails
// @access  Private
export const getCarrierContactDetails = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const carrier = await Carrier.findOne({ email: userEmail });

    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    const status = {
      areContactDetailsComplete: carrier.areContactDetailsComplete,
    };

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
    const userEmail = req.user.email;
    const carrier = await Carrier.findOne({ email: userEmail });

    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    const status = {
      areBusinessDetailsComplete: carrier.areBusinessDetailsComplete,
    };

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
    const userEmail = req.user.email;
    const carrier = await Carrier.findOne({ email: userEmail });

    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

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
    const userEmail = req.user.email;
    const carrier = await Carrier.findOne({ email: userEmail });

    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    const units = carrier.units.map((unit) => ({
      unitNumber: unit.unitNumber,
    }));

    const canadianCarrierCode = carrier.canadianCarrierCode;
    const drivers = await Driver.find({
      canadianCarrierCode: canadianCarrierCode,
    });
    const filteredDrivers = drivers.filter(
      (driver) =>
        driver.driverStatus !== "declined" && driver.driverStatus !== "pending"
    );
    const driverData = filteredDrivers.map((driver) => ({
      firstName: driver.firstName,
      lastName: driver.lastName,
    }));

    res.status(200).json({ units, driverData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

////////////////////////////// Posters //////////////////////////////

// @desc    Adding Unit Profiles
// route    POST /api/postunit
// @access  Private
export const postUnit = asyncHandler(async (req, res) => {
  const carrierEmail = req.user.email;
  const carrier = await Carrier.findOne({ email: carrierEmail });

  if (!carrier) {
    return res.status(404).json({ message: "Carrier not found" });
  }

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

  if (
    req.files &&
    req.files.unitRegistration &&
    req.files.unitRegistration.length > 0
  ) {
    unitData.unitRegistration = req.files.unitRegistration[0].path;
  }
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
    await carrier.addUnit(unitData);
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
    const carrierEmail = req.user.email;
    console.log("Carrier Id", carrierEmail);

    const carrier = await Carrier.findOne({email: carrierEmail});
    if (!carrier) {
      return res.status(400).json({ message: "Carrier not found" });
    }
    const { title, description, date, location } = req.body;
    const newEvent = { title, description, date, location };

    carrier.events.push(newEvent);
    await carrier.save();

    res.status(201).json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

////////////////////////////// Putters //////////////////////////////

// @desc    Assigning Unit
// route    PUT /api/marketplace/:id
// @access  Private
export const updateAssignUnit = asyncHandler(async (req, res) => {
  const loadId = req.params.id;
  const carrierEmail = req.user.email;
  const { status, assignedUnit } = req.body;

  const updatedLoad = await Marketplace.findByIdAndUpdate(
    loadId,
    {
      $set: {
        status: status,
        assignedUnit: assignedUnit,
        carrierEmail: carrierEmail,
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedLoad) {
    return res.status(404).json({ message: "Load not found." });
  }

  res
    .status(200)
    .json({ message: "Load updated successfully", load: updatedLoad });
});

// @desc    Update Carrier Contact Details
// route    PUT /api/carriercontactdetails
// @access  Private
export const updateCarrierContactDetails = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const carrierExist = await Carrier.findOne({ email });

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
  const email = req.user.email;
  const carrierExist = await Carrier.findOne({ email });

  if (!carrierExist) {
    return res.status(404).json({ message: "Carrier not found" });
  }

  const {
    businessName,
    doingBusinessAs,
    businessNumber,
    canadianCarrierCode,
    nationalSafetyCode,
    wcb,
    website,
  } = req.body;

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

  if (
    req.files &&
    req.files.carrierProfile &&
    req.files.carrierProfile.length > 0
  ) {
    updateData.carrierProfile = req.files.carrierProfile[0].path;
  }
  if (
    req.files &&
    req.files.safetyFitnessCertificate &&
    req.files.safetyFitnessCertificate.length > 0
  ) {
    updateData.safetyFitnessCertificate =
      req.files.safetyFitnessCertificate[0].path;
  }


  try {
    const updatedCarrier = await Carrier.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

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
  const email = req.user.email;
  const carrierExist = await Carrier.findOne({ email });

  if (!carrierExist) {
    return res.status(404).json({ message: "Carrier not found" });
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
    doingBusinessAs,
    businessNumber,
    canadianCarrierCode,
    nationalSafetyCode,
    wcb,
    website,
  } = req.body;

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

  const filesToDelete = [];

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

  try {
    const updatedCarrier = await Carrier.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (filesToDelete.length > 0) {
      deleteFiles(filesToDelete);
    }

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
  const email = req.user.email;
  const carrierExist = await Carrier.findOne({ email });

  if (!carrierExist) {
    return res.status(404).json({ message: "Carrier not found" });
  }

  const updateData = {
    isFormComplete: true,
  };
  try {
    const updatedCarrier = await Carrier.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

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
  const driverId = req.params.driverId;
  const newStatus = req.body.status;
  const reason = req.body.reason;
  console.log("Driver Id", driverId);
  console.log("New Status", newStatus);
  console.log("Reason", reason);

  // Validation check for new status
  if (!["Decline", "Approved"].includes(newStatus)) {
    return res.status(400).json({ message: "Invalid status update" });
  }

  const statusToUpdate = newStatus === "Decline" ? "Declined" : "Approved";

  try {
    const result = await Driver.updateOne(
      { _id: driverId },
      { $set: { driverStatus: statusToUpdate, declineReason: reason } }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: "Driver status updated successfully." });
    } else {
      res.status(404).json({ message: "Driver not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating driver status", error: error });
  }
});

// @desc    Update Driver Status on load
// route    PUT /api/updatedriverstatusload
// @access  Private
export const updateDriverStatusLoad = asyncHandler(async (req, res) => {
  const { unitNumber, driverId, loadId } = req.body;
  const userEmail = req.user.email;

  try {
    const carrier = await Carrier.findOne({ email: userEmail });
    if (!carrier) {
      return res.status(404).json({ message: "Carrier not found" });
    }

    const unitProfile = carrier.units.find((u) => u.unitNumber === unitNumber);
    if (!unitProfile) {
      return res
        .status(404)
        .json({ message: "Unit not found within the carrier's fleet" });
    }

    const load = await Marketplace.findById(loadId);
    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
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
    await load.save();

    driver.driverLoadStatus = "Assigned";
    driver.currentLoad = loadId;
    await driver.save();

    unitProfile.unitStatus = "In Use";
    await carrier.save();

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
  const { unitNum } = req.params;
  const carrierEmail = req.user.email;

  const carrier = await Carrier.findOne({ email: carrierEmail });
  if (!carrier) {
    return res.status(404).json({ message: "Carrier not found" });
  }

  try {
    await carrier.updateUnit(unitNum, req.body);
    res.status(200).json({ message: "Unit updated successfully" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
  }
});



////////////////////////////// Deleters //////////////////////////////
// @desc    Delete Units
// route    DELETE /api/units/:unitNumber
// @access  Private
export const deleteUnit = asyncHandler(async (req, res) => {
  const unitNumber = req.params.unitNumber;
  const carrierId = req.user._id;

  const carrier = await Carrier.findById(carrierId);

  if (!carrier) {
    res.status(404);
    throw new Error('Carrier not found');
  }

  const unitIndex = carrier.units.findIndex(unit => unit.unitNumber === unitNumber);

  if (unitIndex === -1) {
    res.status(404);
    throw new Error('Unit not found');
  }

  carrier.units.splice(unitIndex, 1);

  await carrier.save();

  res.status(204).json();
});