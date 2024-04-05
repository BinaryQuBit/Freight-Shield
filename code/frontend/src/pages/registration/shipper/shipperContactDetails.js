// React Import
import React from "react";

// Custom Imports
import Header from "../../../components/header/header.js";
import ShipperCompanyDetailsForm from "../../../components/forms/shipperContactDetailsForm.js";
import { RegistrationProgress } from "../../../components/progressBar/registrationProgess.js";
import Protector from "../../../components/utils/methods/getters/protector.js";

// Start of the Build
export default function ShipperContactDetails() {
  Protector("/api/shippercontactdetails");
  return (
    <>
      <Header />
      <RegistrationProgress currentStep={0} />
      <ShipperCompanyDetailsForm />
    </>
  );
}
