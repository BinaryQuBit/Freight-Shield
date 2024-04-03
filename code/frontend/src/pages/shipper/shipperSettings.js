// React Import
import React from "react"; 

// Icon Imports
import { CiEdit } from "react-icons/ci";

// Chakra UI Imports
import {
  Card,
  VStack,
  Flex,
  Heading,
  Tooltip,
  useDisclosure,
  Divider,
  Text,
  Box
} from "@chakra-ui/react";

// Custom Imports
import Sidebar from "../../components/sidebar/shipperSideBar.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import EaseOut from "../../components/responsiveness/easeOut.js";
import UserHeader from "../../components/header/userHeader.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";
import CustomLink from "../../components/buttons/customLink.js";
import EditShipperDetails from "../../components/editButton/editShipperDetails.js";

// Start of the Build
export default function ShipperSettings() {
  Protector("/api/shippersettings");
  const { data } = useData();
  const firstName = data && data.user ? data.user.firstName : "";
  const lastName = data && data.user ? data.user.lastName : "";
  const status = data && data.user ? data.user.status : "";
  const details = data && data.response ? data.response : "";
  const notification = data ? data.notification : "";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const backendUrl = process.env.REACT_APP_BACKEND_PORT;

  return (
    <>
      <Sidebar activePage="shipperSettings" Status = { status }/>
      <EaseOut>
        <UserHeader
          title="Shipper Settings"
          userInfo={{ firstName, lastName, notification }}
          Status={status}
        />
                <Box w="100%" p={5}>
                <Card p={5} rounded="none" mb={5}>
            <Text>
              <strong>Status:</strong> {status}
            </Text>
            <Text mt={5}>
              <strong>Reason:</strong> {details.statusReasonChange}
            </Text>
          </Card>
        <Card
          p={5}
          rounded="none"
        >
          <VStack spacing={5} align="stretch">
            <Flex justify={"space-between"}>
              <Heading as="h3" size="md" textAlign="center">
                Company Details
              </Heading>
              {status === "Active" ? (
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
               ) : (
                <></>
              )}
            </Flex>
            <Divider />
            <Text>
              <strong>First Name:</strong> {details.firstName}
            </Text>
            <Text>
              <strong>Last Name:</strong> {details.lastName}
            </Text>
            <Text>
              <strong>Company Phone Number:</strong> {details.companyPhoneNumber}
            </Text>
            <Text>
              <strong>Address:</strong> {details.streetAddress},{" "}
              {details.apptNumber ? details.apptNumber + ", " : ""}
              {details.city}, {details.province}, {details.postalCode}, {details.country}
            </Text>

            {details.mailingApptNumber && (
              <Text>
                <strong>Mailing Apartment Number:</strong>{" "}
                {details.mailingApptNumber}
              </Text>
            )}
            {details.mailingStreetAddress && (
              <Text>
                <strong>Mailing Address:</strong> {details.mailingStreetAddress},{" "}
                {details.mailingCity}, {details.mailingProvince},{" "}
                {details.mailingPostalCode}, {details.mailingCountry}
              </Text>
            )}
            <Text>
              <strong>Business Name:</strong> {details.businessName}
            </Text>
            <Text>
              <strong>Business Number:</strong> {details.businessNumber}
            </Text>
            {details.website && (
              <Text>
                <strong>Website:</strong> {details.website}
              </Text>
            )}

            {details.proofBusiness && (
              <CustomLink
                href={`http://${backendUrl}${details.proofBusiness}`}
                children="View Proof of Business"
              />
            )}
            {details.proofInsurance && (
              <CustomLink
                href={`http://${backendUrl}${details.proofInsurance}`}
                children="View Proof of Insurance"
              />
            )}
          </VStack>
          <EditShipperDetails isOpen={isOpen} onClose={onClose} data={data.response} />
        </Card>
        </Box>
      </EaseOut>
    </>
  );
}
