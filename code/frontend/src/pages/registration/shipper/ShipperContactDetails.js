import React from "react";
import Header from "../../../components/header/Header.js";
import ShipperCompanyDetailsForm from "../../../components/forms/ShipperContactDetailsForm.js";
import { RegistrationProgress } from "../../../components/progressBar/RegistrationProgess.js";

function ShipperContactDetails() {
  return (
    <>
      <Header />
      <RegistrationProgress currentStep={0} />
      <ShipperCompanyDetailsForm />
    </>
  );
}

export default ShipperContactDetails;

