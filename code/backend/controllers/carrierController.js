// Carrier Controller 

import asyncHandler from "express-async-handler";
import path from "path";
import Carrier from "../models/carrierModel.js";
import Marketplace from "../models/marketplaceModel.js";
import deleteFiles from "../middleware/delete.js";

////////////////////////////// Getters //////////////////////////////

// @desc    Getting Marketplace
// route    GET /api/marketplace
// @access  Private
const getMarketplace = asyncHandler(async (req, res) => {
  const pendingLoads = await Marketplace.find({ status: "Pending" });

  const response = {
    loads: pendingLoads,
  };

  res.status(200).json(response);
});

// @desc    Getting My Loads
// route    GET /api/myloads
// @access  Private
const getMyLoads = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Driver Profiles
// route    GET /api/driverprofiles
// @access  Private
const getDriverProfiles = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Unit Profiles
// route    GET /api/unitprofiles
// @access  Private
const getUnitProfiles = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Carrier Settings
// route    GET /api/carriersettings
// @access  Private
const getCarrierSettings = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Carrier Company Details
// route    GET /api/carriercontactdetails
// @access  Private
const getCarrierContactDetails = asyncHandler(async (req, res) => {
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
const getCarrierBusinessDetails = asyncHandler(async (req, res) => {
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
const getCarrierSubmission = asyncHandler(async (req, res) => {
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

////////////////////////////// Posters //////////////////////////////

// @desc    Adding Unit Profiles
// route    POST /api/addunit
// @access  Private
const postUnit = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const unitData = req.body;

  if (!email || !unitData) {
    res.status(400).json({ message: "Email and unit data are required." });
    return;
  }

  const carrier = await Carrier.findOne({ email });
  if (!carrier) {
    res.status(404).json({ message: "Carrier not found." });
    return;
  }

  try {
    await carrier.addUnit(unitData);
    res.status(200).json({ message: "Unit added successfully", carrier });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

////////////////////////////// Putters //////////////////////////////

// @desc    Assigning Unit
// route    PUT /api/marketplace/:id
// @access  Private
const updateAssignUnit = asyncHandler(async (req, res) => {
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
const updateCarrierContactDetails = asyncHandler(async (req, res) => {
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
const updateCarrierBusinessDetails = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const carrierExist = await Carrier.findOne({ email });

  if (!carrierExist) {
    return res.status(404).json({ message: "Carrier not found" });
  }

  const { businessName, doingBusinessAs, businessNumber, canadianCarrierCode, nationalSafetyCode, wcb, website } = req.body;

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
    updateData.safetyFitnessCertificate = req.files.safetyFitnessCertificate[0].path;
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
const updateCarrierSubmissionDetails = asyncHandler(async (req, res) => {
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

  if (req.files && req.files.carrierProfile && req.files.carrierProfile.length > 0) {
      if (carrierExist.carrierProfile) {
          filesToDelete.push(carrierExist.carrierProfile);
      }
      updateData.carrierProfile = req.files.carrierProfile[0].path;
  }
  if (req.files && req.files.safetyFitnessCertificate && req.files.safetyFitnessCertificate.length > 0) {
      if (carrierExist.safetyFitnessCertificate) {
          filesToDelete.push(carrierExist.safetyFitnessCertificate);
      }
      updateData.safetyFitnessCertificate = req.files.safetyFitnessCertificate[0].path;
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
const updateCarrierStatus = asyncHandler(async (req, res) => {
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

export {
  getMarketplace,
  getMyLoads,
  getDriverProfiles,
  getUnitProfiles,
  getCarrierSettings,
  getCarrierContactDetails,
  getCarrierBusinessDetails,
  getCarrierSubmission,
  postUnit,
  updateAssignUnit,
  updateCarrierContactDetails,
  updateCarrierBusinessDetails,
  updateCarrierSubmissionDetails,
  updateCarrierStatus,
};
