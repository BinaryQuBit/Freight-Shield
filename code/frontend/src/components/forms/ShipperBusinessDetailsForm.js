import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  Card,
  Checkbox,
} from "@chakra-ui/react";
import GreenButton from "../buttons/GreenButton";

function ShipperCompanyDetailsForm() {
  return (
    <Box mb={20} >
      <Card p="20px" maxWidth={{ base: "auto", md: "400px" }} mx="auto">
        <FormControl id="businessName" isRequired>
          <Input type="text" name="businessName" placeholder="Business Name" />
        </FormControl>
        <Text as={"b"} mt="3" mb={"1"} fontSize={"12"}>
          Physical Address
        </Text>
        <FormControl id="streetAddress" isRequired>
          <Input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
          />
        </FormControl>
        <FormControl mt={"3"} id="apptNumber" isRequired>
          <Input
            type="text"
            name="apptNumber"
            placeholder="Apartment, suite, etc."
          />
        </FormControl>
        <Flex>
          <FormControl mt={"3"} mr={"1.5"} id="city" isRequired>
            <Input type="text" name="city" placeholder="City" />
          </FormControl>
          <FormControl mt={"3"} ml={"1.5"} id="province" isRequired>
            <Input type="text" name="province" placeholder="Province" />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl mt={"3"} mr={"1.5"} id="postalCode" isRequired>
            <Input type="text" name="postalCode" placeholder="Postal Code" />
          </FormControl>
          <FormControl mt={"3"} ml={"1.5"} id="country" isRequired>
            <Input type="text" name="country" placeholder="Country" />
          </FormControl>
        </Flex>
        <Flex alignItems="center" mt="3">
          <Text as={"b"} mb={"1"} mr={"2"} fontSize={"12"}>
            Same as Mailing Address:
          </Text>
          <Flex alignItems="center" mr={"4"}>
            <Text mb={"1"} mr={"1"} fontSize={"12"}>
              Yes
            </Text>
            <Checkbox />
          </Flex>
          <Flex alignItems="center">
            <Text mb={"1"} mr={"1"} fontSize={"12"}>
              No
            </Text>
            <Checkbox />
          </Flex>
        </Flex>
        <FormControl mt={"3"} id="companyPhoneNumber" isRequired>
          <Input
            type="text"
            name="companyPhoneNumber"
            placeholder="Company Phone Number"
          />
        </FormControl>
        <FormControl mt={"3"} id="companyEmailAddress" isRequired>
          <Input
            type="text"
            name="companyEmailAddress"
            placeholder="Company Email Address"
          />
        </FormControl>
        <FormControl mt={"3"} id="website" >
          <Input
            type="text"
            name="website"
            placeholder="Website"
          />
        </FormControl>
        <Flex justifyContent={"space-between"} mt={"3"} >
          <GreenButton children = "Back"></GreenButton>
          <GreenButton children = "Next" ></GreenButton>
        </Flex>
      </Card>
    </Box>
  );
}

export default ShipperCompanyDetailsForm;