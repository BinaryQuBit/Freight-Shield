// Driver Controller

import asyncHandler from "express-async-handler";
import Driver from "../models/driverModel.js"
// import LogBook from "../models/logbookModel.js"

////////////////////////////// Putters //////////////////////////////
// @desc    Update Carrier Contact Details
// route    PUT /api/companydetailsregister
// @access  Private
const updateCompanyDetailsRegister = asyncHandler(async (req, res) => {
  const email = req.user.email;
  console.log(email);
  const driverExist = await Driver.findOne({ email });

  if (!driverExist) {
    return res.status(404).json({ message: "Driver not found" });
  }

  const {
    canadianCarrierCode,
  } = req.body;

  const updateData = {
    canadianCarrierCode
  }
 
  console.log("File", req.files.driverLicence[0]);
  if (
    req.files &&
    req.files.driverLicence &&
    req.files.driverLicence.length > 0 
  ) {
    updateData.driverLicence = req.files.driverLicence[0].path;
  }
  if (
    req.files &&
    req.files.driverAbstract &&
    req.files.driverAbstract.length > 0
  ) {
    updateData.driverAbstract = req.files.driverAbstract[0].path;
  }

  console.log("updated data", updateData);
  try {
    const updatedDriver = await Driver.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (updatedDriver) {
      res.status(200).json({ driver: updatedDriver });
    } else {
      res.status(404).json({ message: "Unable to update driver details" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export {
  updateCompanyDetailsRegister,
  
}