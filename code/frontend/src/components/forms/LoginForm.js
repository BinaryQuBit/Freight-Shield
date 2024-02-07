import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import axios from "axios";
import CustomButton from "../buttons/CustomButton";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  Card,
} from "@chakra-ui/react";

export default function LoginForm() {

  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const navigateBasedOnUserRole = (userRole) => {
    const routes = {
      shipper: "/activeloads",
      carrier: "/marketplace",
      admin: "/pending",
    };
  
    navigate(routes[userRole] || "/");
  };
  
  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const loginResponse = await axios.post("/login", { email, password });

      if (![201, 200].includes(loginResponse.status)) {
        throw new Error('Login failed');
      }
  
      const userRole = loginResponse.data.role;
  
      if (userRole === 'carrier') {
        navigate("/marketplace");
        return;
      }
  
      if (userRole === 'shipper') {
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
          <CustomButton
            backgroundColor="#0866FF"
            icon={<FiTruck />}
            mt="4"
            w="full"
            type="submit"
            children="Log In"
            variant="blueForwardButton"
          />
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
          <CustomButton
            backgroundColor="#42B72A"
            icon={<FiTruck />}
            mt="4"
            w="full"
            onClick={() => navigate("/register")}
            children="Create an Account"
            variant="blueForwardButton"
          />
        </form>
      </Card>
      <Text textAlign="center" mt="2">
        <strong>Your Ultimate Loadboard Solution!</strong>
      </Text>
    </Box>
  );
}
