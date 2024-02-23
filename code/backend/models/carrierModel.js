// Carrier Model 

import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

const unitSchema = new mongoose.Schema({
  unitNumber: {
    type: String,
    unique: true
  },

  unitType: { type: String },
  unitMake: { type: String },
  unitModel: { type: String },
  unitYear: { type: Number },
  unitVIN: { type: String },
  unitLicensePlate: { type: String },
  unitStatus: { type: String, enum: ['active', 'inactive', 'maintenance'] },
}, { _id: false, timestamps: true });

const carrierSchema = new mongoose.Schema({
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
    required: false
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
}, {
  timestamps: true,
});

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
  if (unitExists) {
    throw new Error('Unit number must be unique within the carrier.');
  }
  this.units.push(unitData);
  await this.save();
};

const Carrier = mongoose.model('Carrier', carrierSchema);
export default Carrier;
