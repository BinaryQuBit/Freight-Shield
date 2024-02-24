// Admin Settings Page

import Sidebar from "../../components/sidebar/adminSideBar.js";
import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Protector from "../../components/utils/methods/getters/protector.js"

export default function AdminSettings() {
  Protector("/adminsettings");

  return (
    <Flex>
      <Sidebar activePage="administrators" />
      <Flex flex="1" justifyContent="center">
        <Text>Admin Settings</Text>
      </Flex>
    </Flex>
  );
}
