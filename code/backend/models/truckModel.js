import mongoose from "mongoose";

const truckSchema = mongoose.Schema(
  {
    unitNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    vin: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    make: {
      type: String,
    },
    mileage: {
      type: Number,
    },
    status: {
      type: String,
      default: "Available",
    },
    additionalDetails: {
      type: String,
    },
    insurance: {
      provider: {
        type: String,
      },
      expirationDate: {
        type: Date,
      },
    },
    maintenanceHistory: [
      {
        date: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Truck = mongoose.model("Truck", truckSchema);

export default Truck;
