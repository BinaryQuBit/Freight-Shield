// Shipper Submission Detail

import React, { useState, useEffect } from "react";
import { useTheme } from "@chakra-ui/react";
import axios from "axios";
import CustomButton from "../buttons/customButton";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import {
  Card,
  Box,
  Flex,
  FormControl,
  Input,
  FormLabel,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";

export default function ShipperSubmissionDetails() {
  //  Navigation
  const navigate = useNavigate();
  // Using Theme
  const theme = useTheme();
  const customBlue = theme.colors.customBlue[500];

  const [shipperData, setShipperData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    companyPhoneNumber: "",
    streetAddress: "",
    apptNumber: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    mailingStreetAddress: "",
    mailingApptNumber: "",
    mailingCity: "",
    mailingProvince: "",
    mailingPostalCode: "",
    mailingCountry: "",
    businessName: "",
    businessNumber: "",
    website: "",
    proofBusiness: "",
    proofInsurance: "",
  });
  const [proofBusinessFileName, setProofBusinessFileName] = useState("");
  const [proofInsuranceFileName, setProofInsuranceFileName] = useState("");

  useEffect(() => {
    const fetchShipperData = async () => {
      try {
        const response = await axios.get("/login", {
          withCredentials: true,
        });
        console.log(response.data);
        const data = response.data[0];
        setShipperData(data);

        const proofBusinessFilename = data.proofBusiness;
        const proofBusinessUrl = `http://localhost:8080/uploads/${proofBusinessFilename}`;
        setProofBusinessFileName(proofBusinessUrl);

        const proofInsuranceFilename = data.proofInsurance;
        const proofInsuranceUrl = `http://localhost:8080/uploads/${proofInsuranceFilename}`;
        setProofInsuranceFileName(proofInsuranceUrl);
      } catch (error) {
        console.error("Error fetching shipper data", error);
      }
    };

    fetchShipperData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/activeloads")
  };

  return (
    <Box mb={20}>
      <form onSubmit={handleSubmit}>
        <Card
          p="40px"
          m={"20px"}
          maxWidth={{ base: "auto", md: "700px" }}
          mx="auto"
          pb={"85px"}
        >
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter
              bg="white"
              px="4"
              fontWeight={"bold"}
              fontSize={"17"}
            >
              Confirm Contact Details
            </AbsoluteCenter>
          </Box>
          <FormControl variant="floating" id="email" isRequired>
            <Input
              type="text"
              name="email"
              placeholder=" "
              value={shipperData.email}
              isReadOnly
            />
            <FormLabel>Email</FormLabel>
          </FormControl>

          <Flex>
            <FormControl
              variant="floating"
              mr={"1.5"}
              mt={"10"}
              id="firstName"
              isRequired
            >
              <Input
                type="text"
                name="firstName"
                placeholder=" "
                value={shipperData.firstName}
                isReadOnly
              />
              <FormLabel>First Name</FormLabel>
            </FormControl>
            <FormControl
              variant="floating"
              ml={"1.5"}
              mt={"10"}
              id="lastName"
              isRequired
            >
              <Input
                type="text"
                name="lastName"
                placeholder=" "
                value={shipperData.lastName}
                isReadOnly
              />
              <FormLabel>Last Name</FormLabel>
            </FormControl>
          </Flex>
          <FormControl
            variant="floating"
            mt={"10"}
            id="companyPhoneNumber"
            isRequired
          >
            <Input
              type="text"
              name="companyPhoneNumber"
              placeholder=" "
              value={shipperData.companyPhoneNumber}
              isReadOnly
            />
            <FormLabel>Phone Number</FormLabel>
          </FormControl>
          <FormControl
            variant="floating"
            mt={"10"}
            id="streetAddress"
            isRequired
          >
            <Input
              type="text"
              name="streetAddress"
              placeholder=" "
              value={shipperData.streetAddress}
              isReadOnly
            />
            <FormLabel>Street Address</FormLabel>
          </FormControl>
          <Flex>
            <FormControl
              variant="floating"
              mt={"10"}
              mr={"1.5"}
              id="apptNumber"
            >
              <Input
                type="text"
                name="apptNumber"
                placeholder=" "
                value={shipperData.apptNumber}
                isReadOnly
              />
              <FormLabel>Apartment Number</FormLabel>
            </FormControl>
            <FormControl
              variant="floating"
              mt={"10"}
              ml={"1.5"}
              id="city"
              isRequired
            >
              <Input
                type="text"
                name="city"
                placeholder=" "
                value={shipperData.city}
                isReadOnly
              />
              <FormLabel>City</FormLabel>
            </FormControl>
          </Flex>
          <Flex mb={5}>
            <FormControl
              variant="floating"
              mt={"10"}
              mr={"1.5"}
              id="province"
              isRequired
            >
              <Input
                type="text"
                name="province"
                placeholder=" "
                value={shipperData.province}
                isReadOnly
              />
              <FormLabel>Province</FormLabel>
            </FormControl>
            <FormControl
              variant="floating"
              mt={"10"}
              ml={"1.5"}
              id="postalCode"
              isRequired
            >
              <Input
                type="text"
                name="postalCode"
                placeholder=" "
                value={shipperData.postalCode}
                isReadOnly
              />
              <FormLabel>Postal Code</FormLabel>
            </FormControl>
          </Flex>
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter
              bg="white"
              px="4"
              fontWeight={"bold"}
              fontSize={"17"}
            >
              Confirm Mailing Details
            </AbsoluteCenter>
          </Box>
          <FormControl variant="floating" id="mailingStreetAddress" isRequired>
            <Input
              type="text"
              name="mailingStreetAddress"
              placeholder=" "
              value={shipperData.mailingStreetAddress}
              isReadOnly
            />
            <FormLabel>Street Address</FormLabel>
          </FormControl>
          <Flex>
            <FormControl
              variant="floating"
              mt={"10"}
              mr={"1.5"}
              id="mailingApptNumber"
            >
              <Input
                type="text"
                name="mailingApptNumber"
                placeholder=" "
                value={shipperData.mailingApptNumber}
                isReadOnly
              />
              <FormLabel>Apartment Number</FormLabel>
            </FormControl>
            <FormControl
              variant="floating"
              mt={"10"}
              ml={"1.5"}
              id="mailingCity"
              isRequired
            >
              <Input
                type="text"
                name="mailingCity"
                placeholder=" "
                value={shipperData.mailingCity}
                isReadOnly
              />
              <FormLabel>City</FormLabel>
            </FormControl>
          </Flex>
          <Flex mb={5}>
            <FormControl
              variant="floating"
              mt={"10"}
              mr={"1.5"}
              id="mailingProvince"
              isRequired
            >
              <Input
                type="text"
                name="mailingProvince"
                placeholder=" "
                value={shipperData.mailingProvince}
                isReadOnly
              />
              <FormLabel>Province</FormLabel>
            </FormControl>
            <FormControl
              variant="floating"
              mt={"10"}
              ml={"1.5"}
              id="mailingPostalCode"
              isRequired
            >
              <Input
                type="text"
                name="mailingPostalCode"
                placeholder=" "
                value={shipperData.mailingPostalCode}
                isReadOnly
              />
              <FormLabel>Postal Code</FormLabel>
            </FormControl>
          </Flex>
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter
              bg="white"
              px="4"
              fontWeight={"bold"}
              fontSize={"17"}
            >
              Confirm Business Details
            </AbsoluteCenter>
          </Box>
          <FormControl variant="floating" id="businessName" isRequired>
            <Input
              type="text"
              name="businessName"
              placeholder=" "
              value={shipperData.businessName}
              isReadOnly
            />
            <FormLabel>Business Name</FormLabel>
          </FormControl>
          <FormControl
            variant="floating"
            id="businessNumber"
            mt={"10"}
            isRequired
          >
            <Input
              type="text"
              name="businessNumber"
              placeholder=" "
              value={shipperData.businessNumber}
              isReadOnly
            />
            <FormLabel>Business Number</FormLabel>
          </FormControl>
          <FormControl variant="floating" id="website" mt={"10"}>
            <Input
              type="text"
              name="website"
              placeholder=" "
              value={shipperData.website}
              isReadOnly
            />
            <FormLabel>Website</FormLabel>
          </FormControl>
          <FormControl mr={"1.5"} id="proofInsurance" isRequired>
            <FormLabel fontSize={"13.5px"} ml={"15px"} mt={"10"}>
              Proof of Business
            </FormLabel>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              border="1px solid lightgrey"
              padding="8px"
              borderRadius="4px"
              position="relative"
            >
              <a
                href={proofBusinessFileName}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "auto", color: customBlue }}
              >
                View Proof of Business
              </a>
            </Box>
          </FormControl>
          <FormControl mr={"1.5"} id="proofInsurance" isRequired>
            <FormLabel fontSize={"13.5px"} ml={"15px"} mt={"10"}>
              Proof of Insurance
            </FormLabel>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              border="1px solid lightgrey"
              padding="8px"
              borderRadius="4px"
              position="relative"
            >
              <a
                href={proofInsuranceFileName}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "auto", color: customBlue }}
              >
                View Proof of Insurance
              </a>
            </Box>
          </FormControl>
          <Flex justifyContent={"space-between"} mt={"7"}>
            {/* This is Back Button */}
            <CustomButton
              backgroundColor="#0866FF"
              icon={<FiTruck />}
              mt="4"
              w="90px"
              children="Back"
              variant="blueBackwardButton"
              onClick={() => navigate("/shipperbusinessdetails")}
            />

            {/* This is Next Button */}
            <CustomButton
              backgroundColor="#0866FF"
              icon={<FiTruck />}
              mt="4"
              w="90px"
              type="submit"
              children="Submit"
              variant="blueForwardButton"
            />
          </Flex>
        </Card>
      </form>
    </Box>
  );
}
