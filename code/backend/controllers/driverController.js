// Driver Controller

import asyncHandler from "express-async-handler";
import Driver from "../models/driverModel.js"
import LogBook from "../models/logbookModel.js"
import Marketplace from "../models/marketplaceModel.js"

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
    canadianCarrierCode,
    currentLoad: "",
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


const getLogBooks = async (req, res) => {
  const driverId = req.user._id;
  try {
      
      let query = {};
      if (driverId) {
          query.driverId = driverId;
      }

      const logBooks = await LogBook.find(query);
      res.status(200).send(logBooks);
  } catch (error) {
      console.error("Error fetching logbooks:", error);
      res.status(500).send(error);
  }
}


const createLogBook = async (req, res) => {
  const driverId = req.user._id;
  console.log(driverId);
  const logBookData = { ...req.body, driverId: driverId };
  const logBook = new LogBook(logBookData);
  try {
      await logBook.save();
      res.status(201).send(logBook);
  } catch (error) {
      res.status(400).send(error);
  }
};



const getFirstName = async (req, res) => {
  try {
    const driverId = req.user._id;
    const driverInfo = await Driver.findById(driverId);
    if (!driverInfo) {
      return res.status(404).send({ message: 'Driver not found' });
    }
    const driverEmail = driverInfo.email;
    const loads = await Marketplace.find({ driverEmail: driverEmail });
    console.log("Load",loads);
    if (loads.length === 0) {
      return res.status(404).send({ message: 'No loads found for this driver' });
    }
    const firstName = driverInfo.firstName;
    res.status(200).send({ firstName: firstName, loads: loads });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

const acceptLoad = async (req, res) => {
  const driverEmail = req.user.email;
  try {
    console.log("Hello")
    const updatedLoad = await Marketplace.findOneAndUpdate(
      { driverEmail: driverEmail },
      { $set: { status: 'In Transit' } },
      { new: true }
    );

    if (updatedLoad) {
      res.json({ message: 'Load status updated to In Transit successfully', updatedLoad });
    } else {
      res.status(404).json({ message: 'Load not found' });
    }
  } catch (error) {
    console.error('Error updating load status:', error);
    res.status(500).json({ message: 'Error updating load status' });
  }
};







export {
  updateCompanyDetailsRegister,
  createLogBook,
  getLogBooks,
  getFirstName,
  acceptLoad,
}