// React Imports
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import { Box, Flex, Text, Card } from "@chakra-ui/react";

// Custom Imports
import CustomButton from "../buttons/CustomButton";
import CustomFormControl from "../utils/forms/CustomInput";
import CustomLink from "../buttons/CustomLink";

// Start of the Build
export default function LoginForm() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error Hooks
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Login Handle
  const handleLogin = async (event) => {
    event.preventDefault();

    // Validation
    setEmailError("");
    setPasswordError("");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = password.length >= 8;
    if (!isEmailValid) {
      setEmailError("Email is Invalid");
      return;
    }
    if (!isPasswordValid) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    // Start of Post Method and Routing based on information
    try {
      const loginResponse = await axios.post("/login", { email, password });

      if (![201, 200].includes(loginResponse.status)) {
        throw new Error("Login failed");
      }

      const role = loginResponse.data;

      if (role === "carrier") {
        navigate("/marketplace");
      } else if (role === "shipper") {
          navigate("/activeloads");
      } else if (role === "admin") {
        navigate("/pending");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Start of the UI 
  return (
    <Box p="4" w={{ base: "full", md: "50%" }}>
      <Card
        p="20px"
        maxWidth={{ base: "auto", md: "400px" }}
        mx="auto"
        rounded={"no"}
      >
        <form onSubmit={handleLogin} noValidate>
          <CustomFormControl
            id={"email"}
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isError={!!emailError}
            errorMessage={emailError}
            isRequired={true}
            mt={2}
          />
          <CustomFormControl
            id={"password"}
            label={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isError={!!passwordError}
            errorMessage={passwordError}
            isRequired={true}
            mt={8}
          />
          <CustomButton
            backgroundColor="#0866FF"
            icon={<FiTruck />}
            mt="8"
            w="full"
            type="submit"
            children="Log In"
            variant="blueForwardButton"
          />
          <Flex justify="center" mt="2">
            <CustomLink 
              onClick={() => navigate("/forgotpassword")}
              children={"Forgot Password"}
            />
          </Flex>
          <CustomButton
            backgroundColor="#42B72A"
            icon={<FiTruck />}
            mt="8"
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
