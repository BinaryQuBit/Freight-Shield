// React Imports
import React, { useState } from "react";

// Icon Imports
import { IoMdCloseCircle } from "react-icons/io";
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
import CustomLink from "../../components/buttons/customLink.js";
import MoreDetails from "../../components/viewButton/moreDetailsCarriers.js";
import CustomInput from "../../components/utils/forms/customInput.js";
import CustomButton from "../../components/buttons/customButton.js";
import { EmptyValidation } from "../../components/utils/validation/emptyValidation.js";

// Start of the Build
export default function Carriers() {
  Protector("/api/carriers");

  // Data Extraction
  const { data } = useData();
  const { firstName, lastName, status } = data.user || {};
  const notification = data.notification;
  const carriers = data.carriers || [];

  // Modal
  const moreDetailsDisclosure = useDisclosure();
  const actionModalDisclosure = useDisclosure();

  // Break Point
  const isLargeScreen = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  });

  // Hooks
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [actionReason, setActionReason] = useState("");
  const [selectedSearchOption, setSelectedSearchOption] = useState("email");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionReasonError, setActionReasonError] = useState("");

  // Constants
  const action = [
    { value: "Active", children: "Activate" },
    { value: "Inactive", children: "Deactivate" },
    { value: "Delete", children: "Delete" },
  ];

  // Handle More Details
  const handleMoreDetailsClick = (carrier) => {
    setSelectedCarrier(carrier);
    moreDetailsDisclosure.onOpen();
  };

  // Handle Action
  const handleActionChange = (action, carrier) => {
    if (action === "" || action === "Select Action") {
      return;
    }
    setSelectedCarrier(carrier);
    setSelectedAction(action);
    actionModalDisclosure.onOpen();
  };

  // Close Modal Handle
  const closeModal = () => {
    moreDetailsDisclosure.onClose();
    actionModalDisclosure.onClose();
    setSelectedCarrier(null);
    setSelectedAction(null);
    setActionReason("");
    setActionReasonError("");
  };

  // Handle Submitting of the Action
  const handleSubmitAction = async (event) => {
    event.preventDefault();

    // If No Value, throw error
    if (!selectedCarrier || !selectedCarrier._id) {
      console.error("No carrier selected");
      return;
    }

    // Set the error to null
    setActionReasonError("");

    // Validation Check
    const actionReasonError = EmptyValidation("Reason", actionReason);

    // Setting Error
    setActionReasonError(actionReasonError);

    // If there is error, return
    if (actionReasonError) {
      return;
    }

    // Cunstructing the data to be sent
    const payload = {
      status: selectedAction,
      statusReasonChange: actionReason,
    };

    // Sart of PUT Method
    try {
      await axios.put(`/api/carriers/${selectedCarrier._id}`, payload);
      setActionReason("");
      setSelectedAction(null);
      setSelectedCarrier(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating carrier status:", error);
    }
  };

  // Switch case for different Badge
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

  // Filter
  const filteredCarriers = carriers.filter((carrier) => {
    const searchLower = searchQuery.toLowerCase();
    switch (selectedSearchOption) {
      case "email":
        return carrier.email.toLowerCase().includes(searchLower);
      case "name":
        return `${carrier.firstName} ${carrier.lastName}`
          .toLowerCase()
          .includes(searchLower);
      case "phoneNumber":
        return (
          carrier.companyPhoneNumber &&
          carrier.companyPhoneNumber.toLowerCase().includes(searchLower)
        );
      case "businessName":
        return carrier.businessName.toLowerCase().includes(searchLower);
      case "status":
        return carrier.status.toLowerCase().startsWith(searchLower);
      default:
        return true;
    }
  });

  return (
    <>
      <AdminSidebar activePage={"carriers"} Status={status} />
      <EaseOut>
        <UserHeader
          title="Carriers"
          userInfo={{ firstName, lastName, notification }}
          Status={status}
        />
        <Card
          flex={1}
          p={{ base: "1", md: "2" }}
          m={{ base: "3", md: "5" }}
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
              <option value="businessName">Business Name</option>
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
                <TableCaption>List of Carriers</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Business</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Details</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredCarriers.map((carrier, index) => (
                    <Tr key={index}>
                      <Td>{carrier.businessName}</Td>
                      <Td>
                        {`${carrier.firstName || ""} ${
                          carrier.lastName || ""
                        }`.trim()}
                      </Td>
                      <Td>{carrier.email}</Td>
                      <Td>
                        <CustomLink
                          onClick={() => handleMoreDetailsClick(carrier)}
                          children={"More Details"}
                        />
                      </Td>
                      <Td>{carrier.status || "Inactive"}</Td>
                      <Td>
                        <CustomSelectMultiple
                          id={`action-${index}`}
                          isRequired={true}
                          placeholder={"Select Action"}
                          options={action}
                          onChange={(e) =>
                            handleActionChange(e.target.value, carrier)
                          }
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            filteredCarriers.map((carrier, index) => (
              <Accordion allowToggle key={index}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {carrier.businessName}
                      </Box>
                      <Badge
                        colorScheme={getStatusColor(carrier.status)}
                        p="1"
                        float="right"
                      >
                        {carrier.status}
                      </Badge>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text>
                      Name: {carrier.firstName} {carrier.lastName}
                    </Text>
                    <Text mt={2}>Email: {carrier.email}</Text>
                    <CustomLink
                      onClick={() => handleMoreDetailsClick(carrier)}
                      children={"More Details"}
                      mt={2}
                    />
                    <CustomSelectMultiple
                      id={`action-${index}`}
                      mt={6}
                      isRequired={true}
                      placeholder={"Select Action"}
                      options={action}
                      onChange={(e) =>
                        handleActionChange(e.target.value, carrier)
                      }
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))
          )}
        </Card>
        {selectedCarrier && (
          <MoreDetails
            carrier={selectedCarrier}
            isOpen={moreDetailsDisclosure.isOpen}
            onClose={closeModal}
          />
        )}
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
                  Are you sure you want to activate this Carrier?
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
                  Are you sure you want to deactivate this Carrier?
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
                  Are you sure you want to delete this Carrier?
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
