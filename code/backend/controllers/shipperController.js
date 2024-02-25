// Shipper Controller

import asyncHandler from "express-async-handler";
import Shipper from "../models/shipperModel.js";
import Marketplace from "../models/marketplaceModel.js";
import deleteFiles from "../middleware/delete.js";

////////////////////////////// Getters //////////////////////////////

// @desc    Getting Dashboard
// route    GET /api/users/activeloads
// @access  Private
const shipperDasboard = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const loads = await Marketplace.find({ email: userEmail });

    res.status(200).json(loads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting Active Loads
// route    GET /api/activeloads
// @access  Private
const getActiveLoads = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.user.email;
    const loads = await Marketplace.find({ shipperEmail: userEmail });
    console.log("This is my Email", userEmail)
    res.status(200).json(loads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Getting PostLoad
// route    GET /api/postload
// @access  Private
const getPostLoad = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting History
// route    GET /api/history
// @access  Private
const getHistory = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Shipper Settings
// route    GET /api/shippersettings
// @access  Private
const getShipperSettings = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc    Getting Shipper Contact Details
// route    GET /api/shippercontactdetails
// @access  Private
const getShipperContactDetails = asyncHandler(async (req, res) => {
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
const getShipperBusinessDetails = asyncHandler(async (req, res) => {
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
const getShipperSubmission = asyncHandler(async (req, res) => {
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
const postLoad = asyncHandler(async (req, res) => {
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
    shipperFirstName,
    shipperLastName,
    shipperPhoneNumber,
    shipperCompanyName,
    shipperEmail
  };

  console.log("Data", postLoad);

  if (req.files && req.files.additionalDocument && req.files.additionalDocument.length > 0) {
    postLoad.additionalDocument = req.files.additionalDocument[0].path;
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



////////////////////////////// Putters //////////////////////////////

// @desc    Updating Load
// route    PUT /api/postload:id
// @access  Private
const updateLoad = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let updateData = { ...req.body };

  if (
    req.files &&
    req.files["additionalDocument"] &&
    req.files["additionalDocument"].length
  ) {
    const filename = req.files["additionalDocument"][0].filename;
    updateData.additionalDocument = filename;
  } else {
    console.log("No additionalDocument file uploaded");
  }
  try {
    const updatedLoad = await Marketplace.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedLoad) {
      return res.status(404).json({ message: "Load not found" });
    }
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
const updateShipperSubmissionDetails = asyncHandler(async (req, res) => {
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
const updateShipperStatus = asyncHandler(async (req, res) => {
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

// @desc    Remove Addtional document
// route    DELETE /api/users/postload
// @access  Private
const removeAdditionalDocument = asyncHandler(async (req, res) => {
  const { id, filename } = req.params;
  const load = await Marketplace.findById(id);
  if (!load) {
    return res.status(404).send({ message: "Load not found" });
  }
  if (!load.additionalDocument) {
    return res
      .status(400)
      .send({ message: "No additional document file to delete." });
  }
  const storedFilename = load.additionalDocument.split("/").pop();
  if (filename !== storedFilename) {
    return res.status(400).send({ message: "Filename does not match." });
  }
  await Marketplace.findByIdAndUpdate(
    id,
    { $set: { additionalDocument: "" } },
    { new: true }
  );

  const updatedLoad = await Marketplace.findById(id);
  console.log("Updated Load:", updatedLoad);

  if (updatedLoad.additionalDocument === null) {
    res.send({ message: "Additional document deleted successfully." });
  } else {
    res
      .status(500)
      .send({ message: "Failed to delete the additional document." });
  }
});

// @desc    Delete Load
// route    DELETE /api/users/activeloads/${loadId}
// @access  Private
const deleteLoad = async (req, res) => {
  try {
    const loadId = req.params.id;

    const load = await Marketplace.findByIdAndDelete(loadId);

    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }

    res.status(200).json({ message: "Load deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getActiveLoads,
  getPostLoad,
  getHistory,
  getShipperSettings,
  getShipperContactDetails,
  getShipperBusinessDetails,
  getShipperSubmission,
  shipperDasboard,
  postLoad,
  updateLoad,
  updateShipperContactDetails,
  updateShipperBusinessDetails,
  updateShipperSubmissionDetails,
  updateShipperStatus,
  removeProofBusiness,
  removeProofInsurance,
  removeAdditionalDocument,
  deleteLoad,
};
