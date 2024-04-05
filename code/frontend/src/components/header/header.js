// React Import
import React from "react";

// Chakra UI Import
import { Flex, Box, Image, Text } from "@chakra-ui/react";

// Logo Import
import Logo from "../logo/logo.svg";

// Start of the Build
export default function Header() {
  return (
    <Flex align="center" justify="center" w="full">
      <Box p="4" mb={{ base: "4", md: "0" }} textAlign="center">
        <Image src={Logo} alt="Logo" mx="auto" p={"10px"} />
        <Text pb={"5"}>Connecting Shippers and Truckers Seamlessly</Text>
      </Box>
    </Flex>
  );
}
