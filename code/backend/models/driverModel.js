// Driver Model

import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

const driverSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        canadianCarrierCode: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

driverSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

driverSchema.methods.matchPassword = function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);
};

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;