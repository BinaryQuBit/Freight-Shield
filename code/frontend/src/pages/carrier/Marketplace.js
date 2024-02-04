import Sidebar from "../../components/sidebar/CarrierSideBar";
import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EaseOut from "../../components/responsiveness/EaseOut"
import UserHeader from "../../components/header/UserHeader";

export default function Marketplace() {
  const navigate = useNavigate(); 
  
  useEffect(() => {
    axios
      .get("/marketplace", { withCredentials: true })
      .then((response) => {
        console.log("Marketplace Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Marketplace: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <>
      <Sidebar activePage="marketplace" />
      <EaseOut>
        <UserHeader title="Marketplace" />
      </EaseOut>
    </>
  );
}
