// Active Loads

// React Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdEditSquare, MdDelete } from "react-icons/md";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import { useTheme } from "@chakra-ui/react";
import {
  Flex,
  Input,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Badge,
  Stack,
  Select,
  Card,
} from "@chakra-ui/react";

// Custom Imports
import ShipperSideBar from "../../components/sidebar/shipperSideBar.js";
import UserHeader from "../../components/header/userHeader.js";
import EmbeddedMap from "../../components/google/embeddedMap.js";
import Easeout from "../../components/responsiveness/easeOut.js";
import CustomButton from "../../components/buttons/customButton.js";
import PostedLoadEdit from "../../components/editButton/postedLoadEdit.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";

// Start of the Build
export default function ActiveLoads() {
  axios.defaults.withCredentials = true;
  Protector("/api/activeloads");
  const navigate = useNavigate();
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;
  const { data: loads } = useData();

  // Hooks
  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [filteredLoads, setFilteredLoads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);

  // Functions
  const openModal = (load) => {
    setSelectedLoad(load);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoad(null);
  };

  function getStatusColor(status) {
    switch (status.toLowerCase()) {
      case "pending":
        return "blue";
      case "assigned":
        return "yellow";
      case "in transit":
        return "orange";
      case "delayed":
        return "red";
      default:
        return "gray";
    }
  }

  // Search Handle
  useEffect(() => {
    if (Array.isArray(loads)) {
      const filtered = loads.filter(
        (load) =>
          load.pickUpLocation
            .toLowerCase()
            .includes(fromSearchTerm.toLowerCase()) &&
          load.dropOffLocation
            .toLowerCase()
            .includes(toSearchTerm.toLowerCase()) &&
          (statusSearchTerm === "" ||
            load.status.toLowerCase() === statusSearchTerm.toLowerCase()) &&
          load.status.toLowerCase() !== "delivered"
      );
      setFilteredLoads(filtered);
    } else {
      setFilteredLoads([]);
    }
  }, [fromSearchTerm, toSearchTerm, statusSearchTerm, loads]);

  // Delete Handle
  const handleDeleteLoad = (loadId, filename) => {
    axios
      .delete(`/activeloads/${loadId}/${filename}`, { withCredentials: true })
      .then(() => {
        console.log(`Load with id ${loadId} deleted successfully.`);
        setFilteredLoads((currentLoads) =>
          currentLoads.filter((load) => load.id !== loadId)
        );
      })
      .catch((error) => {
        console.error("Error deleting load:", error);
      });
  };

  return (
    <>
      <ShipperSideBar activePage="activeLoads" />
      <Easeout>
        <UserHeader title="Active Loads" />
        <Flex pt="10" direction="column" alignItems="center" padding="10">
          <Stack spacing={4} direction="row" mb="4">
            <Input
              placeholder="From..."
              onChange={(e) => setFromSearchTerm(e.target.value)}
            />
            <Input
              placeholder="To..."
              onChange={(e) => setToSearchTerm(e.target.value)}
            />
            <Select
              placeholder="View All"
              onChange={(e) => setStatusSearchTerm(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="In Transit">In Transit</option>
              <option value="Delayed">Delayed</option>
            </Select>
          </Stack>
          <Card overflowX="auto" width="full" p="4" rounded={"no"}>
            <Accordion allowToggle>
              {filteredLoads.map((load) => (
                <AccordionItem key={load.id} my="2">
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "gray.100", color: "black" }}
                    >
                      <Box flex="1" textAlign="center">
                        <Text fontSize="lg">
                          <strong>From:</strong> {load.pickUpCity}
                          <Box as="span" ml="4" mr="4"></Box>
                          <strong>To:</strong> {load.dropOffCity}
                          <Badge
                            colorScheme={getStatusColor(load.status)}
                            p="1"
                            float="right"
                          >
                            {load.status}
                          </Badge>
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex
                      direction={{ base: "column", md: "column", lg: "row" }}
                      align={{ lg: "center" }}
                    >
                      <Box flex="1">
                        <Text fontSize="md" mb="2">
                          <strong>Pickup Location:</strong>{" "}
                          {load.pickUpLocation}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Pick Up Date:</strong> {load.pickUpDate}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Pick Up Time:</strong> {load.pickUpTime}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Drop Off Location:</strong>{" "}
                          {load.dropOffLocation}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Drop Off Date:</strong> {load.dropOffDate}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Drop Off Time:</strong> {load.dropOffTime}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Unit Requested:</strong> {load.unitRequested}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Type of Load:</strong> {load.typeLoad}
                        </Text>
                        {load.typeLoad === "LTL" ? (
                          <Text fontSize="md" mb="2">
                            <strong>Size of Load:</strong> {load.sizeLoad} feet
                          </Text>
                        ) : (
                          <Text fontSize="md" mb="2">
                            <strong>Size of Load:</strong> Full Load
                          </Text>
                        )}

                        <Text fontSize="md" mb="2">
                          <strong>Additional Information:</strong>{" "}
                          {load.additionalInformation}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Additional Document:</strong>{" "}
                          {load.additionalDocument ? (
                            <a
                              href={`http://localhost:8080/uploads/${load.additionalDocument}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "blue" }}
                            >
                              View Document
                            </a>
                          ) : (
                            "None"
                          )}
                        </Text>
                      </Box>
                      <Box flex="1" ml="4">
                        <EmbeddedMap
                          pickUpLAT={parseFloat(load.pickUpLAT)}
                          pickUpLNG={parseFloat(load.pickUpLNG)}
                          dropOffLAT={parseFloat(load.dropOffLAT)}
                          dropOffLNG={parseFloat(load.dropOffLNG)}
                        />
                      </Box>
                    </Flex>
                    <Flex
                      direction={{ base: "column", md: "column", lg: "row" }}
                      align={{ lg: "center" }}
                    >
                      {(load.status.toLowerCase() === "assigned" ||
                        load.status.toLowerCase() === "in transit" ||
                        load.status.toLowerCase() === "delayed") && (
                        <Box flex={"1"}>
                          <Text
                            textAlign={"center"}
                            pt={"10"}
                            fontWeight={"bold"}
                            fontSize={"18"}
                          >
                            Carrier Information
                          </Text>
                          <Text fontSize="md" mb="2">
                            <strong>Name:</strong>
                          </Text>
                          <Text fontSize="md" mb="2">
                            <strong>Phone Number:</strong>
                          </Text>
                          <Text fontSize={"md"} mb={"2"}>
                            <strong>Email:</strong>
                          </Text>
                        </Box>
                      )}
                      {(load.status.toLowerCase() === "in transit" ||
                        load.status.toLowerCase() === "delayed") && (
                        <Box flex={"1"}>
                          <Text
                            textAlign={"center"}
                            pt={"10"}
                            fontWeight={"bold"}
                            fontSize={"18"}
                          >
                            Driver Information
                          </Text>
                          <Text fontSize={"md"} mb={"2"}>
                            <strong>Name:</strong>
                          </Text>
                          <Text fontSize={"md"} mb={"2"}>
                            <strong>Phone Number:</strong>
                          </Text>
                          <Text fontSize={"md"} mb={"2"}>
                            <strong>Email:</strong>
                          </Text>
                        </Box>
                      )}
                    </Flex>

                    {load.status.toLowerCase() === "pending" && (
                      <Flex justify={"space-between"}>
                        <CustomButton
                          color={customBlue}
                          icon={<MdEditSquare />}
                          mt="4"
                          w="90px"
                          children="Edit"
                          variant="blueBackwardButton"
                          onClick={() => openModal(load)}
                        />
                        <CustomButton
                          color={customBlue}
                          icon={<MdDelete />}
                          mt="4"
                          w="90px"
                          children="Delete"
                          variant="blueForwardButton"
                          onClick={() =>
                            handleDeleteLoad(load._id, load.additionalDocument)
                          }
                        />
                      </Flex>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </Flex>
      </Easeout>
      {isModalOpen && (
        <PostedLoadEdit
          isOpen={isModalOpen}
          onClose={closeModal}
          load={selectedLoad}
        />
      )}
    </>
  );
}
