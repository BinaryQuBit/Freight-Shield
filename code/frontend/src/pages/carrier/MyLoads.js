import Sidebar from "../../components/sidebar/CarrierSideBar";
import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function MyLoads() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/myloads", { withCredentials: true })
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

  //return <Sidebar activePage="myLoads" />;

  return (
    <Flex>
      <Sidebar activePage="myLoads" />
      <Flex flex="1" justifyContent="center">
        <Text>My Loads</Text>
      </Flex>
    </Flex>

  ) ;
}
