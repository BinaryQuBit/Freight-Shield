// React Imports
import React, { useState } from "react";

// Icon Imports
import { IoMdCloseCircle, IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

// Chakra UI Imports
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Card,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
  Flex,
  useBreakpointValue,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Badge,
  Text,
  Select,
  Input,
} from "@chakra-ui/react";

// Axios Import
import axios from "axios";

// Custom Imports
import AdminSidebar from "../../components/sidebar/adminSideBar.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import EaseOut from "../../components/responsiveness/easeOut.js";
import UserHeader from "../../components/header/userHeader.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";
import CustomSelectMultiple from "../../components/buttons/customSelectMultiple.js";
import CustomInput from "../../components/utils/forms/customInput.js";
import CustomButton from "../../components/buttons/customButton.js";
import { EmptyValidation } from "../../components/utils/validation/emptyValidation.js";
import AddAdmin from "../../components/addButton/addAdmin.js";

// Start of the Build
export default function Administrators() {
  Protector("/api/administrators");

  // Data Extraction
  const { data } = useData();
  const { firstName, lastName, status } = data.user || {};
  const notification = data.notification;
  const administrators = data.administrators || [];
  const { adminStatus } = data.status || {};

  // Modal
  const moreDetailsDisclosure = useDisclosure();
  const actionModalDisclosure = useDisclosure();

  // Break Points
  const isLargeScreen = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  });

  // Hooks
  const [selectedAdministrator, setSelectedAdministrator] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [actionReason, setActionReason] = useState("");
  const [selectedSearchOption, setSelectedSearchOption] = useState("email");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionReasonError, setActionReasonError] = useState("");
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);

  // Constants
  const action = [
    { value: "Active", children: "Activate" },
    { value: "Inactive", children: "Deactivate" },
    { value: "Delete", children: "Delete" },
  ];

  // Functions
  const openAddAdminModal = () => setIsAddAdminModalOpen(true);
  const closeAddAdminModal = () => setIsAddAdminModalOpen(false);

  function getStatusColor(status) {
    switch (status.toLowerCase()) {
      case "inactive":
        return "red";
      case "active":
        return "green";
      default:
        return "gray";
    }
  }

  // Handle Change
  const handleActionChange = (action, administrator) => {
    if (action === "" || action === "Select Action") {
      return;
    }
    setSelectedAdministrator(administrator);
    setSelectedAction(action);
    actionModalDisclosure.onOpen();
  };

  const closeModal = () => {
    moreDetailsDisclosure.onClose();
    actionModalDisclosure.onClose();
    setSelectedAdministrator(null);
    setSelectedAction(null);
    setActionReason("");
    setActionReasonError("");
  };

  // Handle Submission
  const handleSubmitAction = async (event) => {
    event.preventDefault();
    // Error Check
    if (!selectedAdministrator || !selectedAdministrator._id) {
      console.error("No administrator selected");
      return;
    }

    // Setting Error
    setActionReasonError("");

    // Validation Check
    const actionReasonError = EmptyValidation("Reason", actionReason);
    setActionReasonError(actionReasonError);

    // Error Check
    if (actionReasonError) {
      return;
    }

    // Construction of the Data to be sent
    const payload = {
      status: selectedAction,
      statusReasonChange: actionReason,
    };

    // Start of the PUT Request
    try {
      await axios.put(
        `/api/administrators/${selectedAdministrator._id}`,
        payload
      );
      setActionReason("");
      setSelectedAction(null);
      setSelectedAdministrator(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating administrator status:", error);
    }
  };

  const filteredAdministrators = administrators.filter((administrator) => {
    const searchLower = searchQuery.toLowerCase();
    switch (selectedSearchOption) {
      case "email":
        return administrator.email.toLowerCase().includes(searchLower);
      case "name":
        return `${administrator.firstName} ${administrator.lastName}`
          .toLowerCase()
          .includes(searchLower);
      case "phoneNumber":
        return (
          administrator.companyPhoneNumber &&
          administrator.companyPhoneNumber.toLowerCase().includes(searchLower)
        );
      case "status":
        return administrator.status.toLowerCase().startsWith(searchLower);
      default:
        return true;
    }
  });

  return (
    <>
      <AddAdmin isOpen={isAddAdminModalOpen} onClose={closeAddAdminModal} />
      <AdminSidebar activePage={"administrators"} Status={status} />
      <EaseOut>
        <UserHeader
          title="Administrators"
          userInfo={{ firstName, lastName, notification }}
          Status={status}
        />
        {adminStatus === "Super User" ? (
          <CustomButton
            backgroundColor="#0866FF"
            w="90px"
            children="Add"
            variant="blueForwardButton"
            icon={<IoMdAddCircle />}
            floatSide={"right"}
            m={"5"}
            onClick={openAddAdminModal}
          />
        ) : (
          <></>
        )}
        <Card
          flex={1}
          p={{ base: "1", md: "2" }}
          mr={{ base: "3", md: "5" }}
          ml={{ base: "3", md: "5" }}
          mt={{ base: "3", md: "5" }}
          rounded={"none"}
        >
          <Flex mb={4}>
            <Select
              value={selectedSearchOption}
              onChange={(e) => setSelectedSearchOption(e.target.value)}
              placeholder="Select option"
              width="200px"
              mr={2}
              border={"1px"}
              borderColor={"blue.300"}
              rounded={"no"}
            >
              <option value="email">Email</option>
              <option value="name">Name</option>
              <option value="phoneNumber">Phone Number</option>
              <option value="status">Status</option>
            </Select>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              border={"1px"}
              borderColor={"blue.300"}
              rounded={"no"}
            />
          </Flex>

          {isLargeScreen ? (
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <TableCaption>List of Administrators</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Phone Number</Th>
                    <Th>Status</Th>
                    {adminStatus !== "Admin" && <Th>Action</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredAdministrators.map((administrator, index) => (
                    <Tr key={index}>
                      <Td>
                        {`${administrator.firstName || ""} ${
                          administrator.lastName || ""
                        }`.trim()}
                      </Td>
                      <Td>{administrator.email}</Td>
                      <Td>{administrator.phoneNumber}</Td>
                      <Td>{administrator.status || "Inactive"}</Td>
                      {adminStatus !== "Admin" && (
                        <Td>
                          {administrator.adminStatus !== "Super User" ? (
                            <CustomSelectMultiple
                              id={`action-${index}`}
                              isRequired={true}
                              placeholder={"Select Action"}
                              options={action}
                              onChange={(e) =>
                                handleActionChange(
                                  e.target.value,
                                  administrator
                                )
                              }
                            />
                          ) : (
                            <Text>No actions available</Text>
                          )}
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            filteredAdministrators.map((administrator, index) => (
              <Accordion allowToggle key={index}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {administrator.firstName} {administrator.lastName}
                      </Box>
                      <Badge
                        colorScheme={getStatusColor(administrator.status)}
                        p="1"
                        float="right"
                      >
                        {administrator.status}
                      </Badge>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text>
                      Name: {administrator.firstName} {administrator.lastName}
                    </Text>
                    <Text mt={2}>Email: {administrator.email}</Text>
                    <Text mt={2}>
                      Phone Number: {administrator.phoneNumber}
                    </Text>
                    {adminStatus !== "Admin" ? (
                      administrator.adminStatus !== "Super User" ? (
                        <CustomSelectMultiple
                          id={`action-${index}`}
                          mt={6}
                          isRequired={true}
                          placeholder={"Select Action"}
                          options={action}
                          onChange={(e) =>
                            handleActionChange(e.target.value, administrator)
                          }
                        />
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))
          )}
        </Card>
        <Modal
          isOpen={actionModalDisclosure.isOpen}
          onClose={closeModal}
          size={{ base: "md", md: "lg", lg: "3xl", xl: "3xl" }}
        >
          <ModalOverlay />
          <ModalContent>
            {selectedAction === "Active" && (
              <>
                <ModalHeader textAlign={"center"}>
                  Are you sure you want to activate this Administrator?
                </ModalHeader>
                <ModalBody>
                  <CustomInput
                    mb={{ base: 4, md: 4, lg: 4 }}
                    mr={{ lg: 2 }}
                    mt={"8"}
                    customComponent={Textarea}
                    label={"Specify Reason"}
                    isRequired={true}
                    onChange={(event) => {
                      setActionReason(event.target.value);
                      setActionReasonError("");
                    }}
                    isError={!!actionReasonError}
                    errorMessage={actionReasonError}
                  />
                  <Flex justify={"space-between"}>
                    <CustomButton
                      icon={<IoMdCloseCircle />}
                      mt="8"
                      w="90px"
                      children="Close"
                      variant="blueBackwardButton"
                      onClick={closeModal}
                    />
                    <CustomButton
                      icon={<FaThumbsUp />}
                      mt="8"
                      w="100px"
                      children="Activate"
                      variant="blueForwardButton"
                      onClick={handleSubmitAction}
                    />
                  </Flex>
                </ModalBody>
              </>
            )}
            {selectedAction === "Inactive" && (
              <>
                <ModalHeader textAlign={"center"}>
                  Are you sure you want to deactivate this Administrator?
                </ModalHeader>
                <ModalBody>
                  <CustomInput
                    mb={{ base: 4, md: 4, lg: 4 }}
                    mr={{ lg: 2 }}
                    mt={"8"}
                    customComponent={Textarea}
                    label={"Specify Reason"}
                    isRequired={true}
                    onChange={(event) => {
                      setActionReason(event.target.value);
                      setActionReasonError("");
                    }}
                    isError={!!actionReasonError}
                    errorMessage={actionReasonError}
                  />
                  <Flex justify={"space-between"}>
                    <CustomButton
                      icon={<IoMdCloseCircle />}
                      mt="8"
                      w="90px"
                      children="Close"
                      variant="blueBackwardButton"
                      onClick={closeModal}
                    />
                    <CustomButton
                      icon={<FaThumbsDown />}
                      mt="8"
                      w="120px"
                      children="Deactivate"
                      variant="blueForwardButton"
                      onClick={handleSubmitAction}
                    />
                  </Flex>
                </ModalBody>
              </>
            )}
            {selectedAction === "Delete" && (
              <>
                <ModalHeader textAlign={"center"}>
                  Are you sure you want to delete this Administrator?
                </ModalHeader>
                <ModalBody>
                  <CustomInput
                    mb={{ base: 4, md: 4, lg: 4 }}
                    mr={{ lg: 2 }}
                    mt={"8"}
                    customComponent={Textarea}
                    label={"Specify Reason"}
                    isRequired={true}
                    onChange={(event) => {
                      setActionReason(event.target.value);
                      setActionReasonError("");
                    }}
                    isError={!!actionReasonError}
                    errorMessage={actionReasonError}
                  />
                  <Flex justify={"space-between"}>
                    <CustomButton
                      icon={<IoMdCloseCircle />}
                      mt="8"
                      w="90px"
                      children="Close"
                      variant="blueBackwardButton"
                      onClick={closeModal}
                    />
                    <CustomButton
                      icon={<MdDelete />}
                      mt="8"
                      w="90px"
                      children="Delete"
                      variant="blueForwardButton"
                      onClick={handleSubmitAction}
                    />
                  </Flex>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </EaseOut>
    </>
  );
}
