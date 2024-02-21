// Shipper Contact Details Page

import React from "react";
import Header from "../../../components/header/header.js";
import ShipperCompanyDetailsForm from "../../../components/forms/shipperContactDetailsForm.js";
import { RegistrationProgress } from "../../../components/progressBar/registrationProgess.js";
import Protector from "../../../components/utils/methods/getters/protector.js";

function ShipperContactDetails() {
  Protector("/shippercontactdetails")
  return (
    <>
      <Header />
      <RegistrationProgress currentStep={0} />
      <ShipperCompanyDetailsForm />
    </>
  );
}

export default ShipperContactDetails;

