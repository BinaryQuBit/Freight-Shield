// Carrier Submission Detail

import React from "react";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import {
  Box,
  Text,
  Card,
  Flex,
  VStack,
  Heading,
  Divider,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import logout from "../methods/logout";
import { useData } from "../utils/methods/getters/dataContext.js";
import CustomLink from "../buttons/customLink.js";
import CustomButton from "../buttons/customButton";
import EditCarrierDetails from "../editButton/editCarrierDetails.js";

export default function CarrierSubmissionDetails() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { data } = useData();
  const backendUrl = process.env.REACT_APP_BACKEND_PORT; 

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Start of PUT Method
    try {
      const carrierStatusResponse = await axios.put("/api/carrierstatus", {
        withCredentials: true,
      });

      if (carrierStatusResponse.status === 200) {
        navigate("/marketplace");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error: ", error.response.data.message);
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <Box mb={20}>
      <Card
        p="20px"
        m="20px"
        maxWidth={{ base: "90%", md: "70%" }}
        mx="auto"
        rounded="none"
        shadow="md"
      >
        <VStack spacing={5} align="stretch">
          <Flex justify={"space-between"}>
            <Heading as="h3" size="md" textAlign="center">
              Confirm Details
            </Heading>
            <Tooltip label="Edit Details" aria-label="Edit Details Tooltip">
              <span>
                <CiEdit
                  onClick={onOpen}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    color: "0866FF",
                  }}
                />
              </span>
            </Tooltip>
          </Flex>
          <Divider />
          <Text>
            <strong>First Name:</strong> {data.firstName}
          </Text>
          <Text>
            <strong>Last Name:</strong> {data.lastName}
          </Text>
          <Text>
            <strong>Company Phone Number:</strong> {data.companyPhoneNumber}
          </Text>
          <Text>
            <strong>Address:</strong> {data.streetAddress},{" "}
            {data.apptNumber ? data.apptNumber + ", " : ""}
            {data.city}, {data.province}, {data.postalCode}, {data.country}
          </Text>

          {data.mailingApptNumber && (
            <Text>
              <strong>Mailing Apartment Number:</strong>{" "}
              {data.mailingApptNumber}
            </Text>
          )}
          {data.mailingStreetAddress && (
            <Text>
              <strong>Mailing Address:</strong> {data.mailingStreetAddress},{" "}
              {data.mailingCity}, {data.mailingProvince},{" "}
              {data.mailingPostalCode}, {data.mailingCountry}
            </Text>
          )}
          <Text>
            <strong>Business Name:</strong> {data.businessName}
          </Text>
          {data.doingBusinessAs && (
            <Text>
              <strong>Doing Business As:</strong> {data.doingBusinessAs}
            </Text>
          )}
          <Text>
            <strong>Business Number:</strong> {data.businessNumber}
          </Text>
          <Text>
            <strong>Canadian Carrier Code:</strong> {data.canadianCarrierCode}
          </Text>
          <Text>
            <strong>National Safety Code:</strong> {data.nationalSafetyCode}
          </Text>
          <Text>
            <strong>WCB:</strong> {data.wcb}
          </Text>
          {data.website && (
            <Text>
              <strong>Website:</strong> {data.website}
            </Text>
          )}

          {data.carrierProfile && (
            <CustomLink
              href={`http://${backendUrl}${data.carrierProfile}`}
              children="View Carrier Profile"
            />
          )}
          {data.safetyFitnessCertificate && (
            <CustomLink
              href={`http://${backendUrl}${data.safetyFitnessCertificate}`}
              children="View Safety Fitness Certificate"
            />
          )}

          <Flex justifyContent="space-between" mt="4">
            <CustomButton
              backgroundColor="#0866FF"
              icon={<FiTruck />}
              mt="4"
              w="100px"
              children="Logout"
              onClick={() => logout(navigate)}
              variant="blueBackwardButton"
            />
            <CustomButton
              backgroundColor="#0866FF"
              icon={<FiTruck />}
              mt="4"
              w="100px"
              onClick={handleSubmit}
              children="Submit"
              variant="blueForwardButton"
            />
          </Flex>
        </VStack>
        <EditCarrierDetails isOpen={isOpen} onClose={onClose} data={data} />
      </Card>
    </Box>
  );
}