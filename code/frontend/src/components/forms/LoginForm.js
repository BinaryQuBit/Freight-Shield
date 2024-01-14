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
      const response = await axios.post("/login", {
        email,
        password,
      });
  
      if (response.status === 201) {
        const userRole = response.data.role;
        const businessName = response.data.businessName;

        // if (businessName == null) {
        //   navigate("/history")
        //   return;
        // }
        if (userRole === "shipper") {
          navigate("/activeloads");
        } else if (userRole === "carrier") {
          navigate("/marketplace");
        } else if (userRole === "admin") {
          navigate("/pending");
        } else {
          navigate("/");
        }
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
          <Button variant="link" color="#0866FF" fontSize="14px" onClick={() => navigate("/forgotPassword")}>
            Forgot Password?
          </Button>
        </Flex>
        <Flex justify="center" mt="4" onClick={() => navigate("/register")}>
          <GreenButton w="full">Create new account</GreenButton>
        </Flex>
      </Card>
      <Text textAlign="center" mt="2">
        <strong>Your Ultimate Loadboard Solution!</strong>
      </Text>
    </Box>
  );
}