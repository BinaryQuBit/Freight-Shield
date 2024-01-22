import Sidebar from "../../components/sidebar/ShipperSideBar.js";
import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function History() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/history", { withCredentials: true })
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
  
  return (
    <Flex>
      <Sidebar activePage="history" />
      <Flex flex="1" justifyContent="center">
        <Text>History</Text>
      </Flex>
    </Flex>
  )
}
