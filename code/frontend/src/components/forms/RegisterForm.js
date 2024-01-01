import React from "react";
import { useState } from "react";
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
import Terms from "../laws/TermsConditions";
import Privacy from "../laws/PrivacyPolicy";
import {useNavigate} from "react-router-dom";

export default function RegisterForm() {
  // To handle the registration
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isTermsOpen, setTermsOpen] = useState(false);
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const onOpenTerms = () => setTermsOpen(true);
  const onCloseTerms = () => setTermsOpen(false);
  const onOpenPrivacy = () => setPrivacyOpen(true);
  const onClosePrivacy = () => setPrivacyOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Box p="4" w={{ base: "full", md: "50%" }}>
        <Card p="20px" maxWidth={{ base: "auto", md: "400px" }} mx="auto">
          <form onSubmit={handleSubmit}>
            <FormControl mt="6" id="username" isRequired>
              <Input
                type="text"
                name="username"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <FormControl mt="6" id="confirmPassword" isRequired>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <GreenButton w="full" mt={6} type="submit">
              Create an account
            </GreenButton>

            <Flex justify="center" mt={"1"}>
              <Text as="b" fontSize={"10"}>
                By registering, you agree to our
                <Button
                  ml="1"
                  mr="1"
                  variant="link"
                  color="#0866FF"
                  fontSize="11px"
                  onClick={onOpenTerms}
                >
                  Terms of Service
                </Button>
                and
                <Button
                  ml="1"
                  mr="1"
                  variant="link"
                  color="#0866FF"
                  fontSize="11px"
                  onClick={onOpenPrivacy}
                >
                  Privacy Policy
                </Button>
              </Text>
            </Flex>
            <Flex justify="center" mt="4">
              <Text as="b" mr={"2"} fontSize={"13"}>
                Already have an Account?
              </Text>
              <Button variant="link" color="#0866FF" fontSize="14px" onClick={() => navigate('/login')}>
                Log In
              </Button>
            </Flex>
          </form>
        </Card>
      </Box>

      <Terms isTermsOpen={isTermsOpen} onCloseTerms={onCloseTerms} />
      <Privacy isPrivacyOpen={isPrivacyOpen} onClosePrivacy={onClosePrivacy} />
    </>
  );
}
