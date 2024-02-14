// Test to update name
// Model for Marketplace which details of loads posted
import mongoose from "mongoose";

const marketplaceSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    loadNumber: {
      type: String,
    },
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
    dropOffCity:{
      type: String,
    },
    pickUpLAT: {
      type: String,
    },
    pickUpLNG: {
      type: String,
    },
    dropOffLAT:{
      type: String,
    },
    dropOffLNG: {
      type: String,
    },
    status:{
      type: String,
    },
    carrierEmail:{
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Marketplace = mongoose.model("Marketplace", marketplaceSchema);

export default Marketplace;