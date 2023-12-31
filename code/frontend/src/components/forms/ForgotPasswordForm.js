import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Card,
  Text,
} from "@chakra-ui/react";
import GreenButton from "../buttons/GreenButton";

export default function ForgotPasswordForm() {
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
          <FormControl mt="6" id="confirmPassword" isRequired>
            <Input
              type="password"
              name="password"
              placeholder="Confirm Password"
            />
          </FormControl>

          <GreenButton mt="4" w="full">
            Reset Password
          </GreenButton>
          <Flex justify="center" mt="4">
            <Text as="b" mr={"2"} fontSize={"13"}>
              Already have an Account?
            </Text>
            <Button variant="link" color="#0866FF" fontSize="14px">
              Log In
            </Button>
          </Flex>
        </form>
      </Card>
    </Box>
  );
}
