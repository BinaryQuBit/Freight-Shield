// Async Handler Import
import asyncHandler from "express-async-handler";

// Mongoose Import
import mongoose from "mongoose";

// Model Imports
import Driver from "../models/driverModel.js";
import LogBook from "../models/logbookModel.js";
import Marketplace from "../models/marketplaceModel.js";
import Carrier from "../models/carrierModel.js";

// Function to Generate Current Date
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

////////////////////////////// GETTERS //////////////////////////////

// @desc    Getting Logbooks
// route    GET /api/getlogbook
// @access  Private
export const getLogBooks = async (req, res) => {
  try {
    // Extract driver email from the cookie
    const driverEmail = req.user.email;

    // find the logbook using the extracted email
    const logbook = await LogBook.findOne({ email: driverEmail });

    // If there is no logbook, throw an error
    if (!logbook) {
      return res
        .status(404)
        .json({ message: "Logbook not found for this driver." });
    }
    res.json(logbook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Getting Home Screen
// route    GET /api/gethomescreen
// @access  Private
export const getHomeScreen = async (req, res) => {
  try {
    // Extract driver ID from Cookie
    const driverId = req.user._id;

    // Find the driver using the extracted id from the model
    const driverInfo = await Driver.findById({ _id: driverId });

    // If there is no driver, send error message
    if (!driverInfo) {
      return res.status(404).send({ message: "Driver not found" });
    }

    // Get the driver email
    const driverEmail = driverInfo.email;

    let load = null;

    // Check against the mongoose object with the id getting from the driver
    if (mongoose.isValidObjectId(driverInfo.currentLoad)) {
      load = await Marketplace.findById(driverInfo.currentLoad);
    }

    // Get the logbook of the specific driver
    const logbookHRS = await LogBook.findOne({ email: driverEmail });

    // Initialize total hours for today
    const todayHours = {
      OFF: 0,
      SB: 0,
      D: 0,
      ON: 0,
    };

    // Initialize total hours for the week
    const weekHours = {
      OFF: 0,
      SB: 0,
      D: 0,
      ON: 0,
    };

    // Calculate hours for today
    if (logbookHRS.logbook.length > 0) {
      const today = logbookHRS.logbook[14];
      ["OFF", "SB", "D", "ON"].forEach((status) => {
        if (today.status[status]) {
          today.status[status].forEach((period) => {
            const start = parseInt(period.start, 10);
            const end = parseInt(period.end, 10);
            todayHours[status] += (end - start) / 60;
          });
        }
      });
    }

    // Calculate hours for the week
    const weekEntries = logbookHRS.logbook.slice(7, 14);
    weekEntries.forEach((day) => {
      ["OFF", "SB", "D", "ON"].forEach((status) => {
        if (day.status[status]) {
          day.status[status].forEach((period) => {
            const start = parseInt(period.start, 10);
            const end = parseInt(period.end, 10);
            weekHours[status] += (end - start) / 60;
          });
        }
      });
    });

    // Construction of the data to be send as an object
    const info = {
      load: load || null,
      firstName: driverInfo.firstName || null,
      driverStatus: driverInfo.driverStatus || null,
      driverLoadStatus: driverInfo.driverLoadStatus || null,
      currentLoad: driverInfo.currentLoad || null,
      declineReason: driverInfo.declineReason || null,
      todayHours,
      weekHours,
    };

    // Send Data
    res.status(200).send({
      info,
    });
  } catch (error) {
    console.error("Server error", error.message, error.stack);
    res.status(500).send({ message: "Server error" });
  }
};

// @desc    Getting Setting Information
// route    GET /api/driversettings
// @access  Private
export const getDriverSettings = async (req, res) => {
  try {
    // Finding the driver in the model using the email from the cookie
    const DriverInformation = await Driver.findOne({ email: req.user.email });

    // If the driver exist, construct the response to be sent
    if (DriverInformation) {
      const response = {
        firstName: DriverInformation.firstName,
        lastName: DriverInformation.lastName,
        email: DriverInformation.email,
        canadianCarrierCode: DriverInformation.canadianCarrierCode,
        phoneNumber: DriverInformation.phoneNumber,
        driverLicenceFront: DriverInformation.driverLicenceFront,
        driverLicenceBack: DriverInformation.driverLicenceBack,
        driverAbstract: DriverInformation.driverAbstract,
      };

      // send a message success with response
      res.json({ success: true, data: response });
    } else {
      res.status(404).json({ success: false, message: "Driver not found" });
    }
  } catch (error) {
    console.error("Error fetching Settings Page:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

////////////////////////////// POSTERS //////////////////////////////

// @desc    Posting Inspection
// route    POST /api/inspection
// @access  Private
export const postInspection = async (req, res) => {
  try {
    // Get the driver email from the cookie
    const driverEmail = req.user.email;

    // Get the form information from the body
    const { inspectionType, checkedItems, defectDetails } = req.body;

    // Get the date today
    const dateString = getCurrentDate();

    // Find the logbook entry for today and the user
    const logbookEntry = await LogBook.findOne(
      {
        email: driverEmail,
        "logbook.date": dateString,
      },
      { "logbook.$": 1 }
    );

    // If logbookEntry exist, get the sub_id for that logbook
    if (logbookEntry) {
      const logbookId = logbookEntry._id;

      // construct the data to be posted
      const inspectionData = { checkedItems, defectDetails };

      // If the Inspection type is Pre Inspection
      if (inspectionType === "Pre") {
        // Find with the sub_id and date, push it to the Pre array
        await LogBook.updateOne(
          { _id: logbookId, "logbook.date": dateString },
          { $push: { "logbook.$.Pre": inspectionData } }
        );
      }
      // else push it to post
      else {
        await LogBook.updateOne(
          { _id: logbookId, "logbook.date": dateString },
          { $push: { "logbook.$.Post": inspectionData } }
        );
      }

      // send a message out with 200 OK
      res.status(200).send("Inspection updated successfully");
    } else {
      res.status(404).send("Logbook entry not found");
    }
  } catch (error) {
    console.error("Error in postInspection:", error);
    res.status(500).send("An error occurred while posting the inspection.");
  }
};

////////////////////////////// PUTTERS //////////////////////////////

// @desc    Update Driver Registeration
// route    PUT /api/register
// @access  Private
export const updateDriverRegisteration = asyncHandler(async (req, res) => {
  // Extract the email from the cookie
  const email = req.user.email;

  // Find Driver using the email extracted from the model
  const driverExist = await Driver.findOne({ email });

  // If the driver is not in the database, send 404 response
  if (!driverExist) {
    return res.status(404).json({ message: "Driver not found" });
  }

  // Requesting data from the body
  const { phoneNumber, canadianCarrierCode } = req.body;

  // Construct the data to be saved in the database
  const updateData = {
    phoneNumber,
    canadianCarrierCode,
    currentLoad: "",
  };

  // If there is a driver licence front, push to the constructed data
  if (
    req.files &&
    req.files.driverLicenceFront &&
    req.files.driverLicenceFront.length > 0
  ) {
    updateData.driverLicenceFront = req.files.driverLicenceFront[0].path;
  }

  // If there is driver licence back, push to the constructed data
  if (
    req.files &&
    req.files.driverLicenceBack &&
    req.files.driverLicenceBack.length > 0
  ) {
    updateData.driverLicenceBack = req.files.driverLicenceBack[0].path;
  }

  // If there is driver abstract, push to the constructed data
  if (
    req.files &&
    req.files.driverAbstract &&
    req.files.driverAbstract.length > 0
  ) {
    updateData.driverAbstract = req.files.driverAbstract[0].path;
  }

  // Try to update the driver
  try {
    const updatedDriver = await Driver.findOneAndUpdate({ email }, updateData, {
      new: true,
    });

    // If data is updated send 201 response
    if (updatedDriver) {
      res.status(201).json({ driver: updatedDriver });

      // Else throw 404 response
    } else {
      res.status(404).json({ message: "Unable to update driver details" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Update Driver Load Status
// route    PUT /api/acceptload
// @access  Private
export const acceptLoad = async (req, res) => {
  // Extract driver email from the cookie
  const driverEmail = req.user.email;
  try {
    // Find the driver information based on the extracted email
    const driver = await Driver.findOne({ email: driverEmail });

    // Get the current load id from the driver
    const currentLoad = driver.currentLoad;

    // Now update driver status
    const driverStatusonLoad = await Driver.findOneAndUpdate(
      { email: driverEmail },
      { $set: { driverLoadStatus: "Accepted" } },
      { new: true }
    );

    // Update load status
    const updatedLoad = await Marketplace.findOneAndUpdate(
      { _id: currentLoad },
      { $set: { status: "In Transit" } },
      { new: true }
    );

    // If load is updated, send a message and the update load content
    if (updatedLoad) {
      res.json({
        message: "Load status updated to In Transit successfully",
        updatedLoad,
      });

      // Else if driver status is updated, send the reponse with success message
    } else if (driverStatusonLoad) {
      res.json({ message: "Driver Load Status has been updated to Accepted" });
    } else {
      res.status(404).json({ message: "Load not found" });
    }
  } catch (error) {
    console.error("Error updating load status:", error);
    res.status(500).json({ message: "Error updating load status" });
  }
};

// @desc    Update Driver Load Status
// route    PUT /api/deliverload
// @access  Private
export const deliverLoad = async (req, res) => {
  // Extract the driver email from the cookie
  const driverEmail = req.user.email;
  try {
    // Retrieve the driver information based on the extracted email
    const driver = await Driver.findOne({ email: driverEmail });

    // If there is no driver, send 404 response
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Extract the Canadian Carrier Code and current load id
    const ccc = driver.canadianCarrierCode;
    const currentLoad = driver.currentLoad;

    // Update the driver status to "Available"
    await Driver.findOneAndUpdate(
      { email: driverEmail },
      { $set: { driverLoadStatus: "Available" } },
      { new: true }
    );

    // Find and update the carrier by Canadian Carrier Code
    const carrier = await Carrier.findOne({ canadianCarrierCode: ccc });

    // If there is no carrier and units send the status 404
    if (!carrier || !carrier.units || carrier.units.length === 0) {
      return res.status(404).json({ message: "Carrier or units not found" });
    }

    // Get the units from the carrier
    const unitToUpdate = carrier.units[0];

    // Update the unit's status to "Active"
    await Carrier.updateOne(
      { "units._id": unitToUpdate._id },
      { $set: { "units.$.unitStatus": "Active" } }
    );

    // Update the load status to "Delivered"
    const updatedLoad = await Marketplace.findOneAndUpdate(
      { _id: currentLoad },
      { $set: { status: "Delivered" } },
      { new: true }
    );

    // Construct response based on what was updated
    if (updatedLoad) {
      res.json({
        message: "Load status updated to Delivered successfully",
        updatedLoad,
      });
    } else {
      res.status(404).json({ message: "Load not found" });
    }
  } catch (error) {
    console.error("Error updating load status:", error);
    res.status(500).json({ message: "Error updating load status" });
  }
};

// @desc    Update Driver LogBook
// route    PUT /api/editlogbook/:id
// @access  Private
export const editLogBook = async (req, res) => {
  try {
    // Get the Data from the form
    const newData = req.body;

    // Get the id from the URL
    const { id } = req.params;

    // Find the sub id using the id from the URL and update the status
    const result = await LogBook.updateOne(
      { "logbook._id": id },
      {
        $set: {
          "logbook.$.status": newData,
        },
      }
    );

    // If there is no update, send 400 reponse
    if (result.nModified === 0) {
      return res
        .status(400)
        .json({ message: "Logbook entry not found or no change in data" });
    }
    // Else send the success message
    res.json({ message: "Logbook updated successfully" });
  } catch (error) {
    console.error("Editing error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the logbook." });
  }
};

// @desc    Update Driver Location
// route    PUT /api/sendinglocation
// @access  Private
export const sendingLocation = async (req, res) => {
  // Getting the information from the body
  const id = req.body.load_id;
  const driverLat = req.body.latitude;
  const driverLng = req.body.longitude;

  try {
    // Finding using id and update
    const result = await Marketplace.findOneAndUpdate(
      { _id: id },
      { $set: { driverLAT: driverLat, driverLNG: driverLng } },
      { new: true }
    );

    // Send response with status success
    res.json({
      status: "success",
      message: "Location updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// @desc    Update Driver Data
// route    PUT /api/updateDriverData
// @access  Private

export const updateDriverData = async (req, res) => {
  try {
    // Get the information from the form or the body
    let { firstName, lastName, email, canadianCarrierCode, phoneNumber } =
      req.body;

    // Extract the email from the cookie
    const userEmail = req.user.email;

    // If the files are available, assign them else null
    let driverLicenceFrontPath = req.files.driverLicenceFront
      ? req.files.driverLicenceFront[0].path
      : "";
    let driverLicenceBackPath = req.files.driverLicenceBack
      ? req.files.driverLicenceBack[0].path
      : "";
    let driverAbstractPath = req.files.driverAbstract
      ? req.files.driverAbstract[0].path
      : "";

    // Construct the data to be saved
    const updateData = {
      firstName,
      lastName,
      email,
      canadianCarrierCode,
      phoneNumber,
      driverStatus: "Pending",
      // If there are files update them, else no
      ...(driverLicenceFrontPath && {
        driverLicenceFront: driverLicenceFrontPath,
      }),
      ...(driverLicenceBackPath && {
        driverLicenceBack: driverLicenceBackPath,
      }),
      ...(driverAbstractPath && { driverAbstract: driverAbstractPath }),
    };

    // Save the results in the model
    const result = await Driver.updateOne(
      { email: userEmail },
      { $set: updateData }
    );

    // If its not updated, send response 400
    if (result.nModified === 0) {
      return res
        .status(400)
        .json({ message: "Driver entry not found or no change in data" });
    }

    // else send the success message
    res.json({ message: "Driver updated successfully" });
  } catch (error) {
    console.error("Editing error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the Driver." });
  }
};

// @desc    Update Driver Data
// route    PUT /api/posttime
// @access  Private

export const postTime = async (req, res) => {
  try {
    // Extract email from the cookie
    const driverEmail = req.user.email;

    // Get information from the body or form
    const { currentTime, status } = req.body;

    // Generate current date
    const dateString = getCurrentDate();

    // Find logbook entry using email and date of the logbook and update
    const logbookEntry = await LogBook.findOne(
      {
        email: driverEmail,
        "logbook.date": dateString,
      },
      { "logbook.$": 1 }
    );

    // Get the sub id for the logbook
    const logbookId = logbookEntry.logbook[0]._id;

    // If there is logbook entry, find the logbook using the id and update the driving status
    if (logbookEntry) {
      await LogBook.updateOne(
        { "logbook._id": logbookId },
        { $set: { [`logbook.$.drivingStatus`]: status } }
      );
    }

    // Get the status of the driver from the database
    const statusDrivingDB = logbookEntry.logbook[0].drivingStatus;

    // Sets the end time if the status didnt change
    if (logbookEntry) {
      const currentStatusArray = logbookEntry.logbook[0].status[status];

      // This compares the status aka finding the change in status
      if (statusDrivingDB === status) {
        await LogBook.updateOne(
          { "logbook._id": logbookId },
          {
            $set: {
              [`logbook.$.status.${status}.${
                currentStatusArray.length - 1
              }.end`]: currentTime,
            },
          }
        );
      } else {
        let previousEndTime = "0";

        for (const key of ["OFF", "SB", "D", "ON"]) {
          if (
            key !== status &&
            logbookEntry.logbook[0].status[key].length > 0
          ) {
            const lastEntry = logbookEntry.logbook[0].status[key].slice(-1)[0];
            previousEndTime = lastEntry.end;
            break;
          }
        }

        // Creates a new object if the status does change
        await LogBook.updateOne(
          { "logbook._id": logbookId },
          {
            $push: {
              [`logbook.$.status.${status}`]: {
                start: previousEndTime,
                end: currentTime,
              },
            },
          }
        );
      }
    } else {
      res.status(404).send("Logbook entry not found");
    }
  } catch (error) {
    console.error("Error in status:", error);
    res.status(500).send("An error occurred while posting the status.");
  }
};
