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

export default function RegisterForm() {
  const [isTermsOpen, setTermsOpen] = useState(false);
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const onOpenTerms = () => setTermsOpen(true);
  const onCloseTerms = () => setTermsOpen(false);
  const onOpenPrivacy = () => setPrivacyOpen(true);
  const onClosePrivacy = () => setPrivacyOpen(false);
  return (
    <>
      <Box p="4" w={{ base: "full", md: "50%" }}>
        <Card p="20px" maxWidth={{ base: "auto", md: "400px" }} mx="auto">
          <form>
            <FormControl mt="6" id="username" isRequired>
              <Input type="text" name="username" placeholder="Email" />
            </FormControl>

            <GreenButton w="full" mt={6}>
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
              <Button variant="link" color="#0866FF" fontSize="14px">
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
