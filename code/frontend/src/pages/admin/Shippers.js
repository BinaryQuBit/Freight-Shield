import Sidebar from "../../components/sidebar/AdminSideBar";
import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Shippers() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/shippers", { withCredentials: true })
      .then((response) => {
        console.log("Shippers Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Shippers: ", error);
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
      <Sidebar activePage="Shippers" />
      <Flex flex="1" justifyContent="center">
        <Text>Shippers</Text>
      </Flex>
    </Flex>

  );
}
