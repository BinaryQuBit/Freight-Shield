// Carrier Contact Details Page

import React from "react";
import Header from "../../../components/header/header.js";
import CarrierCompanyDetailsForm from "../../../components/forms/carrierContactDetailsForm.js"
import { RegistrationProgress } from "../../../components/progressBar/registrationProgess.js";
import Protector from "../../../components/utils/methods/getters/protector.js";

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
