// Mongoose Import
import mongoose from "mongoose";

// Declaration and Defination of Start and End Time of the LogBook
const startEndTimeSchema = new mongoose.Schema({
  start: {
    type: String,
  },
  end: {
    type: String,
  },
});

// Declaration and Defination of Driver Status Schema
const driverStatusSchema = new mongoose.Schema({
  OFF: [startEndTimeSchema],
  SB: [startEndTimeSchema],
  D: [startEndTimeSchema],
  ON: [startEndTimeSchema],
});

// Declaration and Defination of Logbook Entry Schema
const logEntrySchema = new mongoose.Schema({
  date: {
    type: String,
  },
  day: {
    type: String,
  },
  status: {
    type: driverStatusSchema,
  },
});

// Defination and Declaration of the Logbook Schema
const logbookSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    logbook: [logEntrySchema],
  },
  {
    timestamps: true,
  }
);

// Preparing Logbook Schema to Export
const Logbook = mongoose.model("Logbook", logbookSchema);

// Exporting Logbook Schema
export default Logbook;
