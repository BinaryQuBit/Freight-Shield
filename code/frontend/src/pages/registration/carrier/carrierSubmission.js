// Carrier Submission Page

import React from "react";
import Header from "../../../components/header/header.js";
import CarrierSubmissionDetails from "../../../components/forms/carrierSubmissionDetails.js"
import { RegistrationProgress } from "../../../components/progressBar/registrationProgess.js";
import Protector from "../../../components/utils/methods/getters/protector.js";

export default function CarrierSubmission() {
  Protector("/api/carriersubmission");
  return (
    <>
    <Header />
      <RegistrationProgress currentStep={2} />
      <CarrierSubmissionDetails />
    </>
  )
}

