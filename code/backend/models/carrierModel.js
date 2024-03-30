// Mongoose Import
import mongoose from "mongoose";

// Custom Imports
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

// Event Schema Declaration and Defination
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

// Unit Schema Declaration and Defination
const unitSchema = new mongoose.Schema(
  {
    unitNumber: {
      type: String,
    },

    unitType: { type: String },
    trailerType: { type: String },
    unitMake: { type: String },
    unitModel: { type: String },
    unitYear: { type: Number },
    unitVIN: { type: String },
    unitLicencePlate: { type: String },
    unitStatus: { type: String },
    unitRegistration: { type: String },
    unitInsurance: { type: String },
    unitSafety: { type: String },
  },
  { _id: false, timestamps: true }
);

const notificationDescriptionSchema = new mongoose.Schema(
  {
    des: { type: String },
  }
)

const notificationSchema = new mongoose.Schema(
  {
    counter: { type: Number },
    description: [notificationDescriptionSchema]
  }
)

// Carrier Schema Defination and Declaration
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
    status: {
      type: String,
      default: "Pending",
    },
    statusReasonChange: {
      type: String,
      default: "",
    },
    units: [unitSchema],
    events: [eventSchema],
    notification : [notificationSchema]
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

// Matching Password
carrierSchema.methods.matchPassword = function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);
};

// Unique addition of the Unit Number
carrierSchema.methods.addUnit = async function (unitData) {
  const unitExists = this.units.some(
    (unit) => unit.unitNumber === unitData.unitNumber
  );
  if (unitExists) {
    const error = new Error("Unit number must be unique within the carrier.");
    error.statusCode = 405;
    throw error;
  }
  this.units.push(unitData);
  await this.save();
};

carrierSchema.methods.updateUnit = async function (unitNum, updatedUnitData) {
  const unitIndex = this.units.findIndex(unit => unit.unitNumber === unitNum);
  if (unitIndex === -1) {
    const error = new Error("Unit not found.");
    error.statusCode = 405;
    throw error;
  }

  if (updatedUnitData.unitNumber) {
    const isUnique = !this.units.some((unit, index) => index !== unitIndex && unit.unitNumber === updatedUnitData.unitNumber);
    if (!isUnique) {
      const error = new Error("Unit number must be unique within the carrier.");
      error.statusCode = 405;
      throw error;
    }
  }

  this.units[unitIndex] = { ...this.units[unitIndex], ...updatedUnitData };
  await this.save();
};

// Preparing Schema to Export
const Carrier = mongoose.model("Carrier", carrierSchema);

// Exporting Schema Carrier
export default Carrier;
