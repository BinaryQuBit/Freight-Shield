// React Import
import React from "react";

// Custom Imports
import Header from "../../../components/header/header.js";
import CarrierCompanyDetailsForm from "../../../components/forms/carrierContactDetailsForm.js"
import { RegistrationProgress } from "../../../components/progressBar/registrationProgess.js";
import Protector from "../../../components/utils/methods/getters/protector.js";

// Start of the Build
export default function CarrierContactDetails() {
  Protector("/api/carriercontactdetails");
  return (
    <>
    <Header />
      <RegistrationProgress currentStep={0} />
      <CarrierCompanyDetailsForm />
    </>
  )
}
