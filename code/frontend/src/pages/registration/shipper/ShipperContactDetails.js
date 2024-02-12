import React from "react";
import Header from "../../../components/header/Header.js";
import ShipperCompanyDetailsForm from "../../../components/forms/ShipperContactDetailsForm.js";
import { RegistrationProgress } from "../../../components/progressBar/RegistrationProgess.js";
import Protector from "../../../components/utils/methods/getters/Protector.js";

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

