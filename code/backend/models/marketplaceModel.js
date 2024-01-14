// Model for Marketplace which details of loads posted
import mongoose from "mongoose";

const loadSchema = mongoose.Schema(
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

const Load = mongoose.model("Load", loadSchema);

export default Load;