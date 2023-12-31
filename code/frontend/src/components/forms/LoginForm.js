import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  Card,
} from "@chakra-ui/react";
import BlueButton from "../buttons/BlueButton";
import GreenButton from "../buttons/GreenButton";

export default function LoginForm() {
  return (
    <Box p="4" w={{ base: "full", md: "50%" }}>
      <Card p="20px" maxWidth={{ base: "auto", md: "400px" }} mx="auto">
        <form>
          <FormControl mt="6" id="username" isRequired>
            <Input type="text" name="username" placeholder="Email" />
          </FormControl>
          <FormControl mt="6" id="password" isRequired>
            <Input type="password" name="password" placeholder="Password" />
          </FormControl>

          <BlueButton mt="4" w="full">
            Log In
          </BlueButton>
          <Flex justify="center" mt="4">
            <Button variant="link" color="#0866FF" fontSize="14px">
              Forgot Password?
            </Button>
          </Flex>
          <Flex justify="center" mt="4">
            <GreenButton w="full">Create new account</GreenButton>
          </Flex>
        </form>
      </Card>
      <Text textAlign="center" mt="2">
        <strong>Your Ultimate Loadboard Solution!</strong>
      </Text>
    </Box>
  );
}
