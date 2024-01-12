import Sidebar from "../../components/sidebar/AdminSideBar";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Carriers() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/carriers", { withCredentials: true })
      .then((response) => {
        console.log("Carriers Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Carriers: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);
  
  return <Sidebar activePage="carriers" />;
}
