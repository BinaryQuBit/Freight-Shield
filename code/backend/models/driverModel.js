// Mongoose Import
import mongoose from "mongoose";

// Custom Imports
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

// Defination and Declaration of Driver Schema
const driverSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    canadianCarrierCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    driverLicenceFront: {
      type: String,
    },
    driverLicenceBack: {
      type: String,
    },
    driverAbstract: {
      type: String,
    },
    driverStatus: {
      type: String,
      default: "Pending",
    },
    driverLoadStatus: {
      type: String,
      default: "Available",
    },
    currentLoad: {
      type: String,
    },
    declineReason: {
      type: String,
      default: "None",
    },
    unitID: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Pre method to save password in Hash
driverSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

// Comparing Passwords
driverSchema.methods.matchPassword = function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);
};

// Preparing to Export
const Driver = mongoose.model("Driver", driverSchema);

// Exporting Driver Schema
export default Driver;
