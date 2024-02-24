// Marketplace Model

import mongoose from "mongoose";

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
    shipperEmail:{
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
  },
  {
    timestamps: true,
  }
);

const Marketplace = mongoose.model("Marketplace", marketplaceSchema);

export default Marketplace;