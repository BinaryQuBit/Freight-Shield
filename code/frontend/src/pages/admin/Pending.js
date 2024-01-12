import Sidebar from "../../components/sidebar/AdminSideBar";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Pending() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/pending", { withCredentials: true })
      .then((response) => {
        console.log("Pending Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Pending: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);
  
  return <Sidebar activePage="pending" />;
}
