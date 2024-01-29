import React from 'react';
import Header from "../../../components/header/Header.js";
import { RegistrationProgress } from '../../../components/progressBar/RegistrationProgess.js';
import ShipperSubmissionDetails from '../../../components/forms/ShipperSubmissionDetails.js';

function ShipperSubmission() {
  return (
    <>
    <Header />
    <RegistrationProgress currentStep={2} />
    <ShipperSubmissionDetails />
  </>
  )
}

export default ShipperSubmission



