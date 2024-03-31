// React Imports 
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

// Chakra UI Imports
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Box,
  Flex,
  useTheme,
} from "@chakra-ui/react";

// Custom Imports
import CustomButton from "../buttons/customButton";
import CustomLink from "../buttons/customLink";

export default function MoreDetails({ isOpen, onClose, shipper }) {
  const theme = useTheme();
  const customBlue = theme && theme.colors && theme.colors.customBlue || "#0000FF";
  const backendUrl = process.env.REACT_APP_BACKEND_PORT;

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{base: "md", md: "lg", lg: "3xl", xl: "3xl"}} isClosable={true}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader textAlign={"center"}>Details</ModalHeader>
        <ModalBody>
          <Text fontSize={18} textAlign={"center"}>
            Contact Details
          </Text>
          <Box border={"1px"} borderColor={"blue.200"} p={5} m={1}>
            <Text>
              <strong>First Name:</strong> {shipper.firstName}
            </Text>
            <Text mt={2}>
              <strong>Last Name:</strong> {shipper.lastName}
            </Text>
            <Text mt={2}>
              <strong>Phone Number:</strong> {shipper.companyPhoneNumber}
            </Text>
            <Text mt={2}>
              <strong>Address:</strong> {shipper.streetAddress},{" "}
              {shipper.apptNumber ? shipper.apptNumber + ", " : ""}
              {shipper.city}, {shipper.province}, {shipper.postalCode},{" "}
              {shipper.country}
            </Text>

            {shipper.mailingApptNumber && (
              <Text mt={2}>
                <strong>Mailing Apartment Number:</strong>{" "}
                {shipper.mailingApptNumber}
              </Text>
            )}
            {shipper.mailingStreetAddress && (
              <Text mt={2}>
                <strong>Mailing Address:</strong> {shipper.mailingStreetAddress}
                , {shipper.mailingCity}, {shipper.mailingProvince},{" "}
                {shipper.mailingPostalCode}, {shipper.mailingCountry}
              </Text>
            )}
          </Box>

          <Text fontSize={18} mt={8} textAlign={"center"}>
            Business Details
          </Text>

          <Box border={"1px"} borderColor={"blue.200"} p={5} m={1}>
            <Flex justifyContent={"space-between"} align={"center"} direction={{ base: "column", md: "row" }}>
              <Box>
                <Text>
                  <strong>Business Name:</strong> {shipper.businessName}
                </Text>
                {shipper.doingBusinessAs && (
                  <Text mt={2}>
                    <strong>Doing Business As:</strong>{" "}
                    {shipper.doingBusinessAs}
                  </Text>
                )}
                <Text mt={2}>
                  <strong>Business Number:</strong> {shipper.businessNumber}
                </Text>
                {shipper.website && (
                  <Text mt={2}>
                    <strong>Website:</strong> {shipper.website}
                  </Text>
                )}
              </Box>

              <Box>
                {shipper.proofBusiness && (
                  <Text mt={2}>
                    <CustomLink
                      href={`http://${backendUrl}${shipper.proofBusiness}`}
                      children="View Proof of Business"
                    />
                  </Text>
                )}
                {shipper.proofInsurance && (
                  <Text mt={2}>
                    <CustomLink
                      href={`http://${backendUrl}${shipper.proofInsurance}`}
                      children="View Proof of Insurance"
                    />
                  </Text>
                )}
              </Box>
            </Flex>
          </Box>
          <CustomButton
            color={customBlue}
            icon={<IoMdCloseCircle />}
            mt="8"
            w="90px"
            children="Close"
            variant="blueBackwardButton"
            onClick={handleCloseClick}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}