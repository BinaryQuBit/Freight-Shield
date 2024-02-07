import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/header/Header.js";
import { RegistrationProgress } from '../../../components/progressBar/RegistrationProgess.js';
import ShipperSubmissionDetails from '../../../components/forms/ShipperSubmissionDetails.js';

function ShipperSubmission() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/shippersubmission", { withCredentials: true })
      .then((response) => {
        console.log("Shipper Submission Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Shipper Submission: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);
  return (
    <>
    <Header />
    <RegistrationProgress currentStep={2} />
    <ShipperSubmissionDetails />
  </>
  )
}

export default ShipperSubmission



