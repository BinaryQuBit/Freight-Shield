import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/HashPassword.js";

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
