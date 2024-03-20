// Mongoose Import
import mongoose from "mongoose";

// Custom Imports
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

// Defination and Declaration of the Super User Schema
const superUserSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

// Pre Method to Hash Password
superUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

// Comparing Passwords
superUserSchema.methods.matchPassword = function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);
};

// Preparing to Export Super User Schema
const SuperUser = mongoose.model("SuperUser", superUserSchema);

// Exporting Super User Schema
export default SuperUser;
