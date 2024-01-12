import Sidebar from "../../components/sidebar/ShipperSideBar";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShipperSettings() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/shippersettings", { withCredentials: true })
      .then((response) => {
        console.log("Shipper Settings Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Shipper Settings: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return <Sidebar activePage="shipperSettings" />;
}
