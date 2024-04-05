// React Import
import React from "react";

// Custom Imports
import Header from "../../../components/header/header.js";
import { RegistrationProgress } from "../../../components/progressBar/registrationProgess.js";
import ShipperSubmissionDetails from "../../../components/forms/shipperSubmissionDetails.js";
import Protector from "../../../components/utils/methods/getters/protector.js";

// Start of the Build
export default function ShipperSubmission() {
  Protector("/api/shippersubmission");

  return (
    <>
      <Header />
      <RegistrationProgress currentStep={2} />
      <ShipperSubmissionDetails />
    </>
  );
}
