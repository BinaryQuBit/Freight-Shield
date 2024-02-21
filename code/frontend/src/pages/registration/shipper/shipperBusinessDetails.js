// Shipper Business Details Page

import React from 'react';
import Header from "../../../components/header/header.js";
import ShipperBusinessDetailsForm from '../../../components/forms/shipperBusinessDetailsForm.js';
import { RegistrationProgress } from '../../../components/progressBar/registrationProgess.js';
import Protector from "../../../components/utils/methods/getters/protector.js"

function ShipperBusinessDetails() {
  Protector("/shipperbusinessdetails")
  return (
    <>
      <Header />
      <RegistrationProgress currentStep={1} />
      <ShipperBusinessDetailsForm />
    </>
  );
}

export default ShipperBusinessDetails;

