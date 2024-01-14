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
    businessName: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    apptNumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    sameAddress: {
      type: Boolean,
      required: true,
    },
    mailingAddress: {
      type: String,
    },
    mailingApptNumber: {
      type: String,
    },
    mailingCity: {
      type: String,
    },
    mailingProvince: {
      type: String,
    },
    mailingPostalCode: {
      type: String,
    },
    mailingCountry: {
      type: String,
    },
    companyPhoneNumber: {
      type: String,
      required: true,
    },
    companyEmailAddress: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
    },
    businessNumber: {
      type: String,
      required: true,
    },
    proofBusiness: {
      type: Buffer,
      required: true,
    },
    proofInsurance: {
      type: Buffer,
      required: true,
    },
    primaryContactName: {
      type: String,
      required: true,
    },
    primaryContactEmailAddress: {
      type: String,
      required: true,
    },
    primaryContactPhoneNumber: {
      type: String,
      required: true,
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