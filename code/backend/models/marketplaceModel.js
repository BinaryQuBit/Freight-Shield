// Mongoose Import
import mongoose from "mongoose";

// Defination and Declaration of the Marketplace Schema
const marketplaceSchema = mongoose.Schema(
  {
    pickUpLocation: {
      type: String,
      required: true,
    },
    pickUpDate: {
      type: String,
      required: true,
    },
    pickUpTime: {
      type: String,
      required: true,
    },
    dropOffDate: {
      type: String,
      required: true,
    },
    dropOffTime: {
      type: String,
      required: true,
    },
    dropOffLocation: {
      type: String,
      required: true,
    },
    unitRequested: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: false,
    },
    typeLoad: {
      type: String,
      required: true,
    },
    sizeLoad: {
      type: String,
    },
    additionalInformation: {
      type: String,
    },
    additionalDocument: {
      type: String,
    },
    pickUpCity: {
      type: String,
    },
    dropOffCity: {
      type: String,
    },
    pickUpLAT: {
      type: String,
    },
    pickUpLNG: {
      type: String,
    },
    dropOffLAT: {
      type: String,
    },
    dropOffLNG: {
      type: String,
    },
    status: {
      type: String,
    },
    shipperFirstName: {
      type: String,
    },
    shipperLastName: {
      type: String,
    },
    shipperPhoneNumber: {
      type: String,
    },
    shipperCompanyName: {
      type: String,
    },
    shipperEmail: {
      type: String,
    },
    shipperBusinessName: {
      type: String,
    },
    carrierFirstName: {
      type: String,
    },
    carrierLastName: {
      type: String,
    },
    carrierEmail: {
      type: String,
    },
    carrierPhoneNumber: {
      type: String,
    },
    carrierBusinessName: {
      type: String,
    },
    carrierDoingBusinessAs: {
      type: String,
    },
    driverFirstName: {
      type: String,
    },
    driverLastName: {
      type: String,
    },
    driverPhoneNumber: {
      type: String,
    },
    driverEmail: {
      type: String,
    },
    driverLAT: {
      type: String,
    },
    driverLNG: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Preparing to Export Marketplace Schema
const Marketplace = mongoose.model("Marketplace", marketplaceSchema);

// Exporting Marketplace Schema
export default Marketplace;
