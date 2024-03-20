// Async Handler Import
import asyncHandler from "express-async-handler";

// Puppeteer Import
import puppeteer from "puppeteer";

// FS Import
import fs from "fs";

// Path Import
import path from "path";

// URL Import
import { fileURLToPath } from "url";

// Models Import
import Driver from "../models/driverModel.js";
import LogBook from "../models/logbookModel.js";
import Marketplace from "../models/marketplaceModel.js";

// Custom Import
import { generateLogbook } from "../utils/generateLogbook.js";

// Functions
async function generatePDF(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  return pdfBuffer;
}

////////////////////////////// Getters //////////////////////////////

// @desc    Getting Logbooks
// route    GET /api//getlogbook
// @access  Private
export const getLogBooks = async (req, res) => {
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
};

// @desc    Getting Home Screen
// route    GET /api/gethomescreen
// @access  Private
export const getHomeScreen = async (req, res) => {
  try {
    const driverId = req.user._id;
    const driverInfo = await Driver.findById(driverId);
    if (!driverInfo) {
      return res.status(404).send({ message: "Driver not found" });
    }
    const driverEmail = driverInfo.email;
    const load = await Marketplace.find({ driverEmail: driverEmail });
    const info = {
      load: load,
      firstName: driverInfo.firstName,
      driverStatus: driverInfo.driverStatus,
      driverLoadStatus: driverInfo.driverLoadStatus,
      currentLoad: driverInfo.currentLoad,
    };
    res.status(200).send({
      info,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

// @desc    Getting Logbooks
// route    GET /api/getlogbook1
// @access  Private
export const getLogBooks1 = async (req, res) => {
  try {
    const driverEmail = req.user.email;
    const logbook = await LogBook.findOne({ email: driverEmail });
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

// @desc    Save PDF
// route    GET /api/savepdf
// @access  Private
export const generateAndSendPDF = async (req, res) => {
  try {
    const htmlContent = generateLogbook();
    const pdfBuffer = await generatePDF(htmlContent);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const savePath = path.join(__dirname, "..", "saved_pdfs", "generated.pdf");
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    fs.writeFileSync(savePath, pdfBuffer);
    res.status(200).json({ message: "PDF generated and saved successfully." });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Getting Working Hours
// route    GET /api/workinghrs
// @access  Private
export const workingHRS = async (req, res) => {
  try {
    const logbook = await LogBook.findOne({ email: req.user.email });
    if (logbook) {
      const logbookEntries = logbook.logbook;
      const statusArrays = logbookEntries.map((entry) => entry.status);
      res.json({ success: true, data: statusArrays });
    } else {
      res.status(404).json({ success: false, message: "Logbook not found" });
    }
  } catch (error) {
    console.error("Error fetching logbook:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

////////////////////////////// Posters //////////////////////////////

// @desc    Create Logbook
// route    POST /api/createlogbook
// @access  Private
export const createLogBook = async (req, res) => {
  const driverId = req.user._id;
  const logBookData = { ...req.body, driverId: driverId };
  const logBook = new LogBook(logBookData);
  try {
    await logBook.save();
    res.status(201).send(logBook);
  } catch (error) {
    res.status(400).send(error);
  }
};

// @desc    Create Logbook
// route    POST /api/postlogbook
// @access  Private
export const postLogBook = async (req, res) => {
  const driverEmail = req.user.email;
};

////////////////////////////// Putters //////////////////////////////

// @desc    Update Carrier Contact Details
// route    PUT /api/register
// @access  Private
export const updateCompanyDetailsRegister = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const driverExist = await Driver.findOne({ email });
  if (!driverExist) {
    return res.status(404).json({ message: "Driver not found" });
  }
  const { phoneNumber, canadianCarrierCode } = req.body;
  const updateData = {
    phoneNumber,
    canadianCarrierCode,
    currentLoad: "",
  };
  if (
    req.files &&
    req.files.driverLicenceFront &&
    req.files.driverLicenceFront.length > 0
  ) {
    updateData.driverLicenceFront = req.files.driverLicenceFront[0].path;
  }
  if (
    req.files &&
    req.files.driverLicenceBack &&
    req.files.driverLicenceBack.length > 0
  ) {
    updateData.driverLicenceBack = req.files.driverLicenceBack[0].path;
  }
  if (
    req.files &&
    req.files.driverAbstract &&
    req.files.driverAbstract.length > 0
  ) {
    updateData.driverAbstract = req.files.driverAbstract[0].path;
  }
  try {
    const updatedDriver = await Driver.findOneAndUpdate({ email }, updateData, {
      new: true,
    });
    if (updatedDriver) {
      res.status(201).json({ driver: updatedDriver });
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
  const driverEmail = req.user.email;
  try {
    const driverStatusonLoad = await Driver.findOneAndUpdate(
      { email: driverEmail },
      { $set: { driverLoadStatus: "Accepted" } },
      { new: true }
    );
    const updatedLoad = await Marketplace.findOneAndUpdate(
      { driverEmail: driverEmail },
      { $set: { status: "In Transit" } },
      { new: true }
    );
    if (updatedLoad) {
      res.json({
        message: "Load status updated to In Transit successfully",
        updatedLoad,
      });
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

// @desc    Update Driver LogBook
// route    PUT /api/editlogbook/:id
// @access  Private
export const editLogBook = async (req, res) => {
  try {
    const newData = req.body;
    const { id } = req.params;
    const result = await LogBook.updateOne(
      { "logbook._id": id },
      {
        $set: {
          "logbook.$.status": newData,
        },
      }
    );
    if (result.nModified === 0) {
      return res
        .status(400)
        .json({ message: "Logbook entry not found or no change in data" });
    }
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
  const id = req.body.load_id;
  const driverLat = req.body.latitude;
  const driverLng = req.body.longitude;
  try {
    const result = await Marketplace.findOneAndUpdate(
      { _id: id },
      { $set: { driverLAT: driverLat, driverLNG: driverLng } },
      { new: true }
    );
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
