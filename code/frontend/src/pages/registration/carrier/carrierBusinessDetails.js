// React Import
import React from "react";

// Custom Import
import Header from "../../../components/header/header.js";
import CarrierBusinessDetailsForm from "../../../components/forms/carrierBusinessDetailsForm.js";
import { RegistrationProgress } from "../../../components/progressBar/registrationProgess.js";
import Protector from "../../../components/utils/methods/getters/protector.js";

// Start of the Build
export default function CarrierBusinessDetails() {
  Protector("/api/carrierbusinessdetails");
  return (
    <>
      <Header />
      <RegistrationProgress currentStep={1} />
      <CarrierBusinessDetailsForm />
    </>
  );
}
