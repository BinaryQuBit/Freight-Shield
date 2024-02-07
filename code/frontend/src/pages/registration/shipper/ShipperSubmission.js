import React from "react";
import Header from "../../../components/header/Header.js";
import { RegistrationProgress } from '../../../components/progressBar/RegistrationProgess.js';
import ShipperSubmissionDetails from '../../../components/forms/ShipperSubmissionDetails.js';
import Protector from "../../../components/utils/methods/getters/Protector.js";

function ShipperSubmission() {
Protector("/shippersubmission")

  return (
    <>
    <Header />
    <RegistrationProgress currentStep={2} />
    <ShipperSubmissionDetails />
  </>
  )
}

export default ShipperSubmission



