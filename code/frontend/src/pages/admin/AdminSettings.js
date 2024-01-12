import Sidebar from "../../components/sidebar/AdminSideBar";
import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AdminSettings() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/adminsettings", { withCredentials: true })
      .then((response) => {
        console.log("Admin Settings Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Admin Settings: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  //return <Sidebar activePage="adminSettings" />;

  return (
    <Flex>
      <Sidebar activePage="administrators" />
      <Flex flex="1" justifyContent="center">
        <Text>Admin Settings</Text>
      </Flex>
    </Flex>

  );
}
