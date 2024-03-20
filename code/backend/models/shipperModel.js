// Mongoose Import
import mongoose from "mongoose";

// Custom Imports
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

// Defination and Declaration of the Event Schema
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Declaration and Defination of Shipper Schema
const shipperSchema = mongoose.Schema(
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
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    companyPhoneNumber: {
      type: String,
      required: false,
    },
    streetAddress: {
      type: String,
      required: false,
    },
    apptNumber: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    province: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    mailingStreetAddress: {
      type: String,
      required: false,
    },
    mailingApptNumber: {
      type: String,
      required: false,
    },
    mailingCity: {
      type: String,
      required: false,
    },
    mailingProvince: {
      type: String,
      required: false,
    },
    mailingPostalCode: {
      type: String,
      required: false,
    },
    mailingCountry: {
      type: String,
      required: false,
    },
    businessName: {
      type: String,
      required: false,
    },
    businessNumber: {
      type: String,
      required: false,
    },
    proofBusiness: {
      type: String,
      required: false,
    },
    proofInsurance: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    areContactDetailsComplete: {
      type: Boolean,
      required: false,
    },
    areBusinessDetailsComplete: {
      type: Boolean,
      required: false,
    },
    isFormComplete: {
      type: Boolean,
      required: false,
    },
    events: [eventSchema],
  },
  {
    timestamps: true,
  }
);

// Pre Method to Hash Password
shipperSchema.pre("save", async function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

// Compare Password
shipperSchema.methods.matchPassword = function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);
};

// Prepare to Export Shipper Schema
const Shipper = mongoose.model("Shipper", shipperSchema);

// Exporting Shipper Schema
export default Shipper;
