import Sidebar from "../../components/sidebar/adminSideBar";
import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Protector from "../../components/utils/methods/getters/protector";

export default function Approved() {
  Protector("/api/approved")

  return (
    <Flex>
      <Sidebar activePage="Approved" />
      <Flex flex="1" justifyContent="center">
        <Text>Approved</Text>
      </Flex>
    </Flex>

  );
}
