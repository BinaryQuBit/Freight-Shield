// Mongoose Import
import mongoose from "mongoose";

// Custom Imports
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

// Schema for description
const notificationSchema = new mongoose.Schema({
  description: { type: String },
});

// Admin Schema Declaration and Defination
const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    status: {
      type: String,
      default: "Inactive",
    },
    adminStatus: {
      type: String,
      default: "Admin",
    },
    statusReasonChange: {
      type: String,
      default: "Account under Review",
    },
    notification: [notificationSchema],
  },
  {
    timestamps: true,
  }
);

// Pre-Save Method to Hash Password
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

// Matching Password
adminSchema.methods.matchPassword = function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);
};

// Preparing Schema to Export
const Admin = mongoose.model("Admin", adminSchema);

// Exporting Schema Admin
export default Admin;
