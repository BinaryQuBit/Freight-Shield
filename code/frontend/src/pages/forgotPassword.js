// Forgot Password Page

import React from "react";
import { Container, Flex, Box, Image, Text } from "@chakra-ui/react";
import Logo from "../components/logo/logo.svg";
import ForgetPasswordForm from "../components/forms/forgotPasswordForm";

export default function ForgetPassword() {
  return (
    <Container maxW="container.xl" centerContent>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        minH="100vh"
        w="full"
      >
        <Box p="4" mb={{ base: "4", md: "0" }} textAlign="center">
          <Image src={Logo} alt="Logo" mx="auto" p={"10px"} />
          <Text>Connecting Shippers and Truckers Seamlessly</Text>
        </Box>
        <ForgetPasswordForm />
      </Flex>
    </Container>
  );
}
