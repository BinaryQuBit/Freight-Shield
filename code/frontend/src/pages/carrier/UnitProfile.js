import Sidebar from "../../components/sidebar/CarrierSideBar";
import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function UnitProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/unitprofile", { withCredentials: true })
      .then((response) => {
        console.log("Unit Profile Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Unit Profile: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  //return <Sidebar activePage="unitProfile" />;

  return (
    <Flex>
      <Sidebar activePage="unitProfle" />
      <Flex flex="1" justifyContent="center">
        <Text>Unit Profle</Text>
      </Flex>
    </Flex>

  ) ;
}
