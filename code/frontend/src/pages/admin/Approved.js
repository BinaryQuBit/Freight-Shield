import Sidebar from "../../components/sidebar/AdminSideBar";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Approved() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/approved", { withCredentials: true })
      .then((response) => {
        console.log("Approved Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Approved: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);
  
  return <Sidebar activePage="approved" />;
}
