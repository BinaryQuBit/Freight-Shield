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

export default function MoreDetails({ isOpen, onClose, carrier }) {
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;
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
              <strong>First Name:</strong> {carrier.firstName}
            </Text>
            <Text mt={2}>
              <strong>Last Name:</strong> {carrier.lastName}
            </Text>
            <Text mt={2}>
              <strong>Phone Number:</strong> {carrier.companyPhoneNumber}
            </Text>
            <Text mt={2}>
              <strong>Address:</strong> {carrier.streetAddress},{" "}
              {carrier.apptNumber ? carrier.apptNumber + ", " : ""}
              {carrier.city}, {carrier.province}, {carrier.postalCode},{" "}
              {carrier.country}
            </Text>

            {carrier.mailingApptNumber && (
              <Text mt={2}>
                <strong>Mailing Apartment Number:</strong>{" "}
                {carrier.mailingApptNumber}
              </Text>
            )}
            {carrier.mailingStreetAddress && (
              <Text mt={2}>
                <strong>Mailing Address:</strong> {carrier.mailingStreetAddress}
                , {carrier.mailingCity}, {carrier.mailingProvince},{" "}
                {carrier.mailingPostalCode}, {carrier.mailingCountry}
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
                  <strong>Business Name:</strong> {carrier.businessName}
                </Text>
                {carrier.doingBusinessAs && (
                  <Text mt={2}>
                    <strong>Doing Business As:</strong>{" "}
                    {carrier.doingBusinessAs}
                  </Text>
                )}
                <Text mt={2}>
                  <strong>Business Number:</strong> {carrier.businessNumber}
                </Text>
                <Text mt={2}>
                  <strong>Canadian Carrier Code:</strong>{" "}
                  {carrier.canadianCarrierCode}
                </Text>
                <Text mt={2}>
                  <strong>National Safety Code:</strong>{" "}
                  {carrier.nationalSafetyCode}
                </Text>
                <Text mt={2}>
                  <strong>WCB:</strong> {carrier.wcb}
                </Text>
                {carrier.website && (
                  <Text mt={2}>
                    <strong>Website:</strong> {carrier.website}
                  </Text>
                )}
              </Box>

              <Box>
                {carrier.carrierProfile && (
                  <Text mt={2}>
                    <CustomLink
                      href={`http://${backendUrl}${carrier.carrierProfile}`}
                      children="View Carrier Profile"
                    />
                  </Text>
                )}
                {carrier.safetyFitnessCertificate && (
                  <Text mt={2}>
                    <CustomLink
                      href={`http://${backendUrl}${carrier.safetyFitnessCertificate}`}
                      children="View Safety Fitness Certificate"
                    />
                  </Text>
                )}
              </Box>
            </Flex>
          </Box>

          <Text fontSize={18} mt={8} textAlign={"center"}>
            Unit Details
          </Text>

          {carrier.units &&
            carrier.units.map((unit, index) => (
              <Box
                key={index}
                border={"1px"}
                borderColor={"blue.200"}
                p={5}
                m={1}
              >
                <Flex justifyContent={"space-between"} align={"center"} direction={{ base: "column", md: "row" }}>
                  <Box>
                    {unit.unitNumber && (
                      <Text>
                        <strong>Unit Number:</strong> {unit.unitNumber}
                      </Text>
                    )}
                    {unit.unitType && (
                      <Text mt={2}>
                        <strong>Unit Type:</strong> {unit.unitType}
                      </Text>
                    )}
                    {unit.unitMake && (
                      <Text mt={2}>
                        <strong>Unit Make:</strong> {unit.unitMake}
                      </Text>
                    )}
                    {unit.unitModel && (
                      <Text mt={2}>
                        <strong>Unit Model:</strong> {unit.unitModel}
                      </Text>
                    )}
                    {unit.unitYear && (
                      <Text mt={2}>
                        <strong>Unit Year:</strong> {unit.unitYear}
                      </Text>
                    )}
                    {unit.unitLicencePlate && (
                      <Text mt={2}>
                        <strong>Unit Licence Plate:</strong>{" "}
                        {unit.unitLicencePlate}
                      </Text>
                    )}
                    {unit.unitVIN && (
                      <Text mt={2}>
                        <strong>Unit VIN:</strong> {unit.unitVIN}
                      </Text>
                    )}
                    {unit.unitStatus && (
                      <Text mt={2}>
                        <strong>Unit Status:</strong> {unit.unitStatus}
                      </Text>
                    )}
                  </Box>
                  <Box>
                    {unit.unitRegistration && (
                      <Text mt={2}>
                        <CustomLink
                          href={`http://${backendUrl}${unit.unitRegistration}`}
                          children="View Unit Registration"
                        />
                      </Text>
                    )}
                    {unit.unitInsurance && (
                      <Text mt={2}>
                        <CustomLink
                          href={`http://${backendUrl}${unit.unitInsurance}`}
                          children="View Unit Insurance"
                        />
                      </Text>
                    )}
                    {unit.unitSafety && (
                      <Text mt={2}>
                        <CustomLink
                          href={`http://${backendUrl}${unit.unitSafety}`}
                          children="View Unit Safety"
                        />
                      </Text>
                    )}
                  </Box>
                </Flex>
              </Box>
            ))}
          <Text fontSize={18} mt={8} textAlign={"center"}>
            Driver Details
          </Text>

          {carrier.drivers &&
            carrier.drivers.map((driver, index) => (
              <Box
                key={index}
                border={"1px"}
                borderColor={"blue.200"}
                p={5}
                m={1}
              >
                <Flex justifyContent={"space-between"} align={"center"} direction={{ base: "column", md: "row" }}>
                  <Box>
                    {driver.firstName && (
                      <Text>
                        <strong>First Name:</strong> {driver.firstName}
                      </Text>
                    )}
                    {driver.lastName && (
                      <Text mt={2}>
                        <strong>Last Name:</strong> {driver.lastName}
                      </Text>
                    )}
                    {driver.email && (
                      <Text mt={2}>
                        <strong>Email:</strong> {driver.email}
                      </Text>
                    )}
                    {driver.phoneNumber && (
                      <Text mt={2}>
                        <strong>Phone Number:</strong> {driver.phoneNumber}
                      </Text>
                    )}
                    {driver.driverStatus && (
                      <Text mt={2}>
                        <strong>Status:</strong> {driver.driverStatus}
                      </Text>
                    )}
                  </Box>
                  <Box>
                    {driver.driverLicenceFront && (
                      <Text mt={2}>
                        <CustomLink
                          href={`http://${backendUrl}${driver.driverLicenceFront}`}
                          children="View Driver Licence (Front)"
                        />
                      </Text>
                    )}
                    {driver.driverLicenceBack && (
                      <Text mt={2}>
                        <CustomLink
                          href={`http://${backendUrl}${driver.driverLicenceBack}`}
                          children="View Driver Licence (Back)"
                        />
                      </Text>
                    )}
                    {driver.driverAbstract && (
                      <Text mt={2}>
                        <CustomLink
                          href={`http://${backendUrl}${driver.driverAbstract}`}
                          children="View Driver Abstract"
                        />
                      </Text>
                    )}
                  </Box>
                </Flex>
              </Box>
            ))}
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
