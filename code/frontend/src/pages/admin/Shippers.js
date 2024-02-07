import Sidebar from "../../components/sidebar/AdminSideBar";
import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Protector from "../../components/utils/methods/getters/Protector.js"

export default function Shippers() {
  Protector("/shippers");

  return (
    <Flex>
      <Sidebar activePage="Shippers" />
      <Flex flex="1" justifyContent="center">
        <Text>Shippers</Text>
      </Flex>
    </Flex>

  );
}
