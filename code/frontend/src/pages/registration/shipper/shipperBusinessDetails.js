// React Import
import React from "react";

// Custom Imports
import Header from "../../../components/header/header.js";
import ShipperBusinessDetailsForm from "../../../components/forms/shipperBusinessDetailsForm.js";
import { RegistrationProgress } from "../../../components/progressBar/registrationProgess.js";
import Protector from "../../../components/utils/methods/getters/protector.js";

// Start of the Build
export default function ShipperBusinessDetails() {
  Protector("/api/shipperbusinessdetails");
  return (
    <>
      <Header />
      <RegistrationProgress currentStep={1} />
      <ShipperBusinessDetailsForm />
    </>
  );
}
