// React Import
import React from "react";

// Icon Import
import { CiEdit } from "react-icons/ci";

// Chakra UI Import
import {
  Card,
  VStack,
  Flex,
  Heading,
  Tooltip,
  useDisclosure,
  Divider,
  Text,
  Box,
} from "@chakra-ui/react";

// Custom Imports
import AdminSidebar from "../../components/sidebar/adminSideBar.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import EaseOut from "../../components/responsiveness/easeOut.js";
import UserHeader from "../../components/header/userHeader.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";
import EditAdminDetails from "../../components/editButton/editAdminDetails.js";

// Start of the Build
export default function AdminSettings() {
  Protector("/api/adminsettings");

  // Extraction of the Data
  const { data } = useData();
  const { firstName, lastName } = data.user || {};
  const notification = data.notification;
  const details = data && data.response ? data.response : "";
  const status = details.status;

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <AdminSidebar activePage={"adminSettings"} Status={status} />
      <EaseOut>
        <UserHeader
          title="Admin Settings"
          userInfo={{ firstName, lastName, notification }}
          Status={status}
        />
        <Box w="100%" p={5}>
          <Card p={5} rounded="none" mb={5}>
            <Text>
              <strong>Status:</strong> {details.status}
            </Text>
            <Text mt={5}>
              <strong>Reason:</strong> {details.statusReasonChange}
            </Text>
          </Card>
          <Card p={5} rounded="none">
            <VStack spacing={5} align="stretch">
              <Flex justify={"space-between"}>
                <Heading as="h3" size="md" textAlign="center">
                  Admin Details
                </Heading>
                {status === "Active" ? (
                  <Tooltip
                    label="Edit Details"
                    aria-label="Edit Details Tooltip"
                  >
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
                <strong>Phone Number:</strong> {details.phoneNumber}
              </Text>
              <Text>
                <strong>Email:</strong> {details.email}
              </Text>
            </VStack>
            <EditAdminDetails
              isOpen={isOpen}
              onClose={onClose}
              data={data.response}
            />
          </Card>
        </Box>
      </EaseOut>
    </>
  );
}
