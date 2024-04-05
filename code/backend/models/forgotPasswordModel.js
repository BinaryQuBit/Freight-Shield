// Mongoose Import
import mongoose from "mongoose";

// Defination and Declaration of OTP Schema
const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(+new Date() + 10 * 60 * 1000),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Method to Expire
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Preparing to export OTP Schema
const Otp = mongoose.model("Otp", otpSchema);

// Exporting OTP Schema
export default Otp;
