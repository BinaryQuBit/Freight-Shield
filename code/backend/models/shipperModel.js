// Model for Shippers which includes authentication and hashing
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    role: {
      type: String,
      required: false,
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
  },
  {
    timestamps: true,
  }
);

shipperSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

shipperSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Shipper = mongoose.model("Shipper", shipperSchema);

export default Shipper;