import Sidebar from "../../components/sidebar/ShipperSideBar.js";
import React, { useEffect } from "react";
import axios from "axios";
import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ActiveLoads() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/activeloads", { withCredentials: true })
      .then((response) => {
        console.log("Active Loads Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Loads: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <Flex>
      <Sidebar activePage="activeLoad" />
      <Flex flex="1" justifyContent="center">
        <Text>Active Load</Text>
      </Flex>
    </Flex>

  ) ;
}
