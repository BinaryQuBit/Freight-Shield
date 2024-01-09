import Sidebar from "../../components/sidebar/ShipperSideBar.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ActiveLoads() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get("http://localhost:8080/activeloads", { withCredentials: true })
    .then((response) => {
      setLoads(response.data);
    })
    .catch((error) => {
      console.error("Error fetching loads:", error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    });
  
  }, []);

  return (
        <Sidebar activePage="activeLoads" />
  );
}