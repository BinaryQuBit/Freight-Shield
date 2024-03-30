import React, { useState } from "react";
import AdminSidebar from "../../components/sidebar/adminSideBar.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import EaseOut from "../../components/responsiveness/easeOut.js";
import UserHeader from "../../components/header/userHeader.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";
import CustomSelectMultiple from "../../components/buttons/customSelectMultiple.js";
import CustomLink from "../../components/buttons/customLink.js";
import MoreDetails from "../../components/viewButton/moreDetailsShippers.js";
import CustomInput from "../../components/utils/forms/customInput.js";
import CustomButton from "../../components/buttons/customButton.js";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { EmptyValidation } from "../../components/utils/validation/emptyValidation.js";
import axios from "axios";
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

export default function Shippers() {
  Protector("/api/shippers");
  const { data } = useData();
  const { firstName, lastName } = data.user || {};
  const shippers = data.shippers || [];
  const moreDetailsDisclosure = useDisclosure();
  const actionModalDisclosure = useDisclosure();
  const isLargeScreen = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  });

  const [selectedShipper, setSelectedShipper] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [actionReason, setActionReason] = useState("");
  const [selectedSearchOption, setSelectedSearchOption] = useState("email");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionReasonError, setActionReasonError] = useState("");

  const action = [
    { value: "Active", children: "Activate" },
    { value: "Inactive", children: "Deactivate" },
    { value: "Delete", children: "Delete" },
  ];

  const handleMoreDetailsClick = (shipper) => {
    setSelectedShipper(shipper);
    moreDetailsDisclosure.onOpen();
  };

  const handleActionChange = (action, shipper) => {
    if (action === "" || action === "Select Action") {
      return;
    }
    setSelectedShipper(shipper);
    setSelectedAction(action);
    actionModalDisclosure.onOpen();
  };

  const closeModal = () => {
    moreDetailsDisclosure.onClose();
    actionModalDisclosure.onClose();
    setSelectedShipper(null);
    setSelectedAction(null);
    setActionReason("");
    setActionReasonError("");
  };

  const handleSubmitAction = async (event) => {
    event.preventDefault();
    if (!selectedShipper || !selectedShipper._id) {
      console.error("No shipper selected");
      return;
    }

    setActionReasonError("");
    const actionReasonError = EmptyValidation("Reason", actionReason);
    setActionReasonError(actionReasonError);
    if (actionReasonError) {
      return;
    }

    const payload = {
      status: selectedAction,
      statusReasonChange: actionReason,
    };

    try {
      await axios.put(`/api/shippers/${selectedShipper._id}`, payload);
      setActionReason("");
      setSelectedAction(null);
      setSelectedShipper(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating shipper status:", error);
    }
  };

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

  const filteredShippers = shippers.filter((shipper) => {
    const searchLower = searchQuery.toLowerCase();
    switch (selectedSearchOption) {
      case "email":
        return shipper.email.toLowerCase().includes(searchLower);
      case "name":
        return `${shipper.firstName} ${shipper.lastName}`
          .toLowerCase()
          .includes(searchLower);
      case "phoneNumber":
        return (
          shipper.companyPhoneNumber &&
          shipper.companyPhoneNumber.toLowerCase().includes(searchLower)
        );
      case "businessName":
        return shipper.businessName.toLowerCase().includes(searchLower);
      case "status":
        return shipper.status.toLowerCase().startsWith(searchLower);
      default:
        return true;
    }
  });

  return (
    <>
      <AdminSidebar activePage={"shippers"} />
      <EaseOut>
        <UserHeader title="Shippers" userInfo={{ firstName, lastName }} />
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
                <TableCaption>List of Shippers</TableCaption>
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
                  {filteredShippers.map((shipper, index) => (
                    <Tr key={index}>
                      <Td>{shipper.businessName}</Td>
                      <Td>
                        {`${shipper.firstName || ""} ${
                          shipper.lastName || ""
                        }`.trim()}
                      </Td>
                      <Td>{shipper.email}</Td>
                      <Td>
                        <CustomLink
                          onClick={() => handleMoreDetailsClick(shipper)}
                          children={"More Details"}
                        />
                      </Td>
                      <Td>{shipper.status || "Inactive"}</Td>
                      <Td>
                        <CustomSelectMultiple
                          id={`action-${index}`}
                          isRequired={true}
                          placeholder={"Select Action"}
                          options={action}
                          onChange={(e) =>
                            handleActionChange(e.target.value, shipper)
                          }
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            filteredShippers.map((shipper, index) => (
              <Accordion allowToggle key={index}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {shipper.businessName}
                      </Box>
                      <Badge
                        colorScheme={getStatusColor(shipper.status)}
                        p="1"
                        float="right"
                      >
                        {shipper.status}
                      </Badge>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text>
                      Name: {shipper.firstName} {shipper.lastName}
                    </Text>
                    <Text mt={2}>Email: {shipper.email}</Text>
                    <CustomLink
                      onClick={() => handleMoreDetailsClick(shipper)}
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
                        handleActionChange(e.target.value, shipper)
                      }
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))
          )}
        </Card>
        {selectedShipper && (
          <MoreDetails
            shipper={selectedShipper}
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
                  Are you sure you want to activate this Shipper?
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
                  Are you sure you want to deactivate this Shipper?
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
                  Are you sure you want to delete this Shipper?
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
