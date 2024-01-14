import React, { useEffect } from 'react';
import Sidebar from "../../components/sidebar/ShipperSideBar.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ActiveLoads() {
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch active loads if authenticated
    axios.get("http://localhost:8080/api/users/activeloads", { withCredentials: true })
      .then((response) => {
        console.log("Active loads fetched successfully");
        // Handle your response here
      })
      .catch((error) => {
        console.error("Error fetching loads:", error);
        // Redirect if token is invalid or expired
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate('/login');
        }
      });
  }, [navigate]);

  return (
    <Sidebar activePage="activeLoads" />
  );
}

