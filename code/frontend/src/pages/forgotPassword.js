// React Import
import React from "react";
import { useNavigate } from "react-router-dom";

// Chakra UI Import
import { Container, Flex, Box, Image, Text } from "@chakra-ui/react";

// Custom Imports
import Logo from "../components/logo/logo.svg";
import ForgetPasswordForm from "../components/forms/forgotPasswordForm";
import CustomLink from "../components/buttons/customLink";

// Start of the Build
export default function ForgetPassword() {
  const navigate = useNavigate();
  return (
    <>
      <CustomLink
        onClick={() => navigate("/")}
        children={"< Home"}
        ml={"30px"}
        mt={"30px"}
      />
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
    </>
  );
}
