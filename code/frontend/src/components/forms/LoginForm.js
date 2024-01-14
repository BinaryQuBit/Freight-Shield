import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });
      if (response.status === 201) {
        // const userRole = response.data.role;
        // if (userRole === "shipper") {
        //   navigate("/activeloads");
        // } else if (userRole === "carrier") {
        //   navigate("/marketplace");
        // } else {
        //   navigate("/pending");
        // }
        navigate("/activeloads");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <Box p="4" w={{ base: "full", md: "50%" }}>
      <Card p="20px" maxWidth={{ base: "auto", md: "400px" }} mx="auto">
        <form onSubmit={handleLogin}>
          <FormControl mt="6" id="email" isRequired>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mt="6" id="password" isRequired>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <BlueButton mt="4" w="full" type="submit">
            Log In
          </BlueButton>
        </form>
        <Flex justify="center" mt="4">
          <Button variant="link" color="#0866FF" fontSize="14px">
            Forgot Password?
          </Button>
        </Flex>
        <Flex justify="center" mt="4">
          <GreenButton w="full">Create new account</GreenButton>
        </Flex>
      </Card>
      <Text textAlign="center" mt="2">
        <strong>Your Ultimate Loadboard Solution!</strong>
      </Text>
    </Box>
  );
}