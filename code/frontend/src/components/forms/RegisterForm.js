import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Card,
  Text,
  Select,
} from "@chakra-ui/react";
import GreenButton from "../buttons/GreenButton";
import Terms from "../laws/TermsConditions";
import Privacy from "../laws/PrivacyPolicy";

export default function RegisterForm() {
  const navigate = useNavigate();

  // To handle the registration
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
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
      const response = await axios.post("/register", {
        role,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Box p="4" w={{ base: "full", md: "50%" }}>
        <Card p="20px" maxWidth={{ base: "auto", md: "400px" }} mx="auto">
          <form onSubmit={handleSubmit}>
            <FormControl mt="6" id="role" isRequired>
              <Select
                placeholder="Select role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="shipper">I am a Shipper</option>
                <option value="carrier">I am a Carrier</option>
              </Select>
            </FormControl>
            <FormControl mt="6" id="email" isRequired>
              <Input
                type="text"
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
              <Button
                variant="link"
                color="#0866FF"
                fontSize="14px"
                onClick={() => navigate("/login")}
              >
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
