import React from "react";
import {
  Container,
  Flex,
  Box,
  Image,
  Text,
  Button,
  Link,
  Heading,
} from "@chakra-ui/react";
import Logo from "../components/logo/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
    const navigate = useNavigate();
  return (
    <Container maxW="container.xl">
      {/* Top Bar */}
      <Flex
        justify="space-between"
        align="center"
        p="4"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Image src={Logo} alt="Freight-Shield Logo" w="120px" h="auto" />
        <Flex>
        <Link mr="4">Brokers</Link>
        <Link mr="4">Carriers</Link>
          <Link mr="4">Products</Link>
          <Link mr="4">Services</Link>
          <Link mr="4">Pricing</Link>
          <Link mr="4">About Us</Link>
        </Flex>
        <Box>
        <Button bg={"#0866FF"} _hover={{ bg: '#42B72A' }} color="white"  size="sm" onClick={() => navigate("/login")} mr="2">
            Log In
          </Button>
          <Button bg={"#0866FF"}  _hover={{ bg: '#42B72A' }} color="white"  size="sm" onClick={() => navigate("/register")}>
            Sign Up
          </Button>
        </Box>
      </Flex>

      {/* Main Content */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="70vh"
        w="full"
        bg="#0866FF"
        color="white"
        px="8"
      >
        <Heading as="h1" size="xl" mb="4">
          Your Freight Management Solution
        </Heading>
        <Text fontSize="lg" textAlign="center" mb="8">
          Connect with ease. Manage with confidence.
        </Text>
        <Button
          colorScheme="whiteAlpha"
          size="lg"
        >
          Get Started
        </Button>
      </Flex>
    </Container>
  );
}

