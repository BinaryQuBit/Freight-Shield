import Sidebar from "../../components/sidebar/CarrierSideBar";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function MyLoads() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/myloads", { withCredentials: true })
      .then((response) => {
        console.log("My Loads Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching My Loads: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return <Sidebar activePage="myLoads" />;
}
