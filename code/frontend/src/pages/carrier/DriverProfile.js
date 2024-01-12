import Sidebar from "../../components/sidebar/CarrierSideBar";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function DriverProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/driverprofile", { withCredentials: true })
      .then((response) => {
        console.log("Driver Profile Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Driver Profile: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return <Sidebar activePage="driverProfile" />;
}
