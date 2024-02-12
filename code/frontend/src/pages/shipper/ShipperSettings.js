import Sidebar from "../../components/sidebar/ShipperSideBar";
import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Protector from "../../components/utils/methods/getters/Protector.js"

export default function ShipperSettings() {
  Protector("/shippersettings")

  return (
    <Flex>
      <Sidebar activePage="shipperSettings" />
      <Flex flex="1" justifyContent="center">
        <Text>Shipper Settings</Text>
      </Flex>
    </Flex>

  );
}
