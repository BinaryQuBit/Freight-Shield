import React from 'react';
import Header from "../../../components/header/Header.js";
import ShipperBusinessDetailsForm from '../../../components/forms/ShipperBusinessDetailsForm.js';
import { RegistrationProgress } from '../../../components/progressBar/RegistrationProgess.js';
import Protector from "../../../components/utils/methods/getters/Protector.js"

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

