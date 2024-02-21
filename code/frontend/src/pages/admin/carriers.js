// Carriers Page

import Sidebar from "../../components/sidebar/adminSideBar.js";
import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Protector from "../../components/utils/methods/getters/protector.js"

export default function Carriers() {
  Protector("/carriers");

  return (
    <Flex>
      <Sidebar activePage="carriers" />
      <Flex flex="1" justifyContent="center">
        <Text>Carriers</Text>
      </Flex>
    </Flex>

  );
}
