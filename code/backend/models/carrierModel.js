// Carrier Model

import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

const unitSchema = new mongoose.Schema(
  {
    unitNumber: {
      type: String,
    },

    unitType: { type: String },
    trailerType: {type: String},
    unitMake: { type: String },
    unitModel: { type: String },
    unitYear: { type: Number },
    unitVIN: { type: String },
    unitLicencePlate: { type: String },
    unitStatus: { type: String },
    unitRegistration: { type: String },
    unitInsurance: { type: String },
    unitSafety: {type: String }
  },
  { _id: false, timestamps: true }
);

const carrierSchema = new mongoose.Schema(
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
    doingBusinessAs: {
      type: String,
      required: false,
    },
    businessNumber: {
      type: String,
      required: false,
    },
    carrierProfile: {
      type: String,
      required: false,
    },
    safetyFitnessCertificate: {
      type: String,
      required: false,
    },
    canadianCarrierCode: {
      type: String,
      required: false,
    },
    nationalSafetyCode: {
      type: String,
      required: false,
    },
    wcb: {
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
    units: [unitSchema],
  },
  {
    timestamps: true,
  }
);

carrierSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

carrierSchema.methods.matchPassword = function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);
};

carrierSchema.methods.addUnit = async function (unitData) {
  const unitExists = this.units.some(unit => unit.unitNumber === unitData.unitNumber);
  console.log("Existing units:", this.units.map(unit => unit.unitNumber));
  console.log("Trying to add unit number:", unitData.unitNumber);
  if (unitExists) {
    const error = new Error('Unit number must be unique within the carrier.');
    error.statusCode = 405;
    throw error;
  }
  this.units.push(unitData);
  await this.save();
};



const Carrier = mongoose.model("Carrier", carrierSchema);
export default Carrier;
