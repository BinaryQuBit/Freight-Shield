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
import { FiTruck } from "react-icons/fi";

// Start of the Login Form Component
export default function LoginForm() {

  // Include Credentials in the request
  axios.defaults.withCredentials = true;

  // Hooks/states for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  // Helper function to navigate based on user role
  const navigateBasedOnUserRole = (userRole) => {
    const routes = {
      shipper: "/activeloads",
      carrier: "/marketplace",
      admin: "/pending",
    };
  
    navigate(routes[userRole] || "/");
  };
  
  // Start of the Login ~ What happens when the user clicks the login button
  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const loginResponse = await axios.post("/login", { email, password });
  
      if (![201, 200].includes(loginResponse.status)) {
        throw new Error('Login failed');
      }
  
      const userRole = loginResponse.data.role;
  
      const { data } = await axios.get("/login");
      const isContactDetailsIncomplete = [
        'firstName', 'lastName', 'companyPhoneNumber', 'streetAddress', 
        'city', 'province', 'postalCode', 'country', 'mailingStreetAddress',
        'mailingCity', 'mailingProvince', 'mailingPostalCode', 'mailingCountry'
      ].some(field => data[0][field] == null);
  
      const isBusinessDetailsIncomplete = [
        'businessName', 'businessNumber', 'proofBusiness', 'proofInsurance'
      ].some(field => data[0][field] == null);
  
      if (isContactDetailsIncomplete) {
        navigate("/shippercontactdetails");
        return;
      }
  
      if (isBusinessDetailsIncomplete) {
        navigate("/shipperbusinessdetails");
        return;
      }
  
      navigateBasedOnUserRole(userRole);
  
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
          <BlueButton
            backgroundColor="#0866FF"
            icon={<FiTruck />}
            mt="4"
            w="full"
            type="submit"
            children="Log In"
            variant="blueForwardButton"
          />
        </form>
        <Flex justify="center" mt="4">
          <Button
            variant="link"
            color="#0866FF"
            fontSize="14px"
            onClick={() => navigate("/forgotPassword")}
          >
            Forgot Password?
          </Button>
        </Flex>
        <Flex justify="center" mt="4">
          <BlueButton
            backgroundColor="#42B72A"
            icon={<FiTruck />}
            mt="4"
            w="full"
            onClick={() => navigate("/register")}
            children="Create an Account"
            variant="blueForwardButton"
          />
        </Flex>
      </Card>
      <Text textAlign="center" mt="2">
        <strong>Your Ultimate Loadboard Solution!</strong>
      </Text>
    </Box>
  );
}
