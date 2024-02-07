import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/HashPassword.js";

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

superUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

superUserSchema.methods.matchPassword = function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);
};

const SuperUser = mongoose.model("SuperUser", superUserSchema);

export default SuperUser;