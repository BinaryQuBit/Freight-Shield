import Sidebar from "../../components/sidebar/AdminSideBar";
import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Carriers() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/carriers", { withCredentials: true })
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
  
  //return <Sidebar activePage="carriers" />;

  return (
    <Flex>
      <Sidebar activePage="carriers" />
      <Flex flex="1" justifyContent="center">
        <Text>Carriers</Text>
      </Flex>
    </Flex>

  );
}
