import Sidebar from "../../components/sidebar/ShipperSideBar.js";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function History() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/history", { withCredentials: true })
      .then((response) => {
        console.log("History Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching History: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);
  return <Sidebar activePage="history" />;
}
