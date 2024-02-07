import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CarrierContactDetails() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/carriercontactdetails", { withCredentials: true })
      .then((response) => {
        console.log("Carrier Business Details Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Carrier Business Details: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);
  return (
    <div>CarrierCompanyDetails</div>
  )
}