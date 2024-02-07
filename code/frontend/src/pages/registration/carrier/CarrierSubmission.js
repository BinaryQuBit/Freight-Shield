import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CarrierSubmission() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/carriersubmission", { withCredentials: true })
      .then((response) => {
        console.log("Carrier Submission Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Carrier Submission: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);
  return (
    <div>CarrierSubmission</div>
  )
}

export default CarrierSubmission