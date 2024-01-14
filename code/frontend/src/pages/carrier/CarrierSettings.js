import Sidebar from "../../components/sidebar/CarrierSideBar";
import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CarrierSettings() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/carriersettings", { withCredentials: true })
      .then((response) => {
        console.log("Carrier Settings Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Carrier Settings: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);
  
  //return <Sidebar activePage="carrierSettings" />;

  
  return (
    <Flex>
      <Sidebar activePage="carrierSettings" />
      <Flex flex="1" justifyContent="center">
        <Text>Active Load</Text>
      </Flex>
    </Flex>

  ) ;
}
