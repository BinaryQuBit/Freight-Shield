import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MdEditSquare, MdDelete } from "react-icons/md";
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
import ShipperSideBar from "../../components/sidebar/ShipperSideBar";
import UserHeader from "../../components/header/UserHeader";
import EmbeddedMap from "../../components/google/EmbeddedMap.js";
import { useNavigate } from "react-router-dom";
import Easeout from "../../components/responsiveness/EaseOut.js";
import BlueButton from "../../components/buttons/BlueButton.js";
import { useTheme } from "@chakra-ui/react";
import PostedLoadEdit from "../../components/editButton/PostedLoadEdit.js"

export default function ActiveLoads() {
  //  Theme
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;

  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [filteredLoads, setFilteredLoads] = useState([]);
  const [loads, setLoads] = useState([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);

  const fetchLoads = () => {
    axios
      .get("/activeloads", { withCredentials: true })
      .then((response) => {
        setLoads(response.data);
        console.log("Active Loads Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Active Loads: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    fetchLoads();
  }, [navigate]);

  const handleLoadUpdate = () => {
    fetchLoads();
  };

  const openModal = (load) => {
    setSelectedLoad(load);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoad(null);
    handleLoadUpdate();
  };

  useEffect(() => {
    const filtered = loads.filter(
      (load) =>
        load?.pickUpLocation
          ?.toLowerCase()
          .includes(fromSearchTerm.toLowerCase()) &&
        load?.dropOffLocation
          ?.toLowerCase()
          .includes(toSearchTerm.toLowerCase()) &&
        (statusSearchTerm === "" ||
          load?.status?.toLowerCase() === statusSearchTerm.toLowerCase()) &&
        load?.status?.toLowerCase() !== "delivered"
    );
    setFilteredLoads(filtered);
  }, [fromSearchTerm, toSearchTerm, statusSearchTerm, loads]);

  const handleDeleteLoad = (loadId, filename) => {
    axios.delete(`/activeloads/${loadId}/${filename}`, { withCredentials: true })
      .then(() => {
        console.log(`Load with id ${loadId} deleted successfully.`);
        setLoads(currentLoads => currentLoads.filter(load => load.id !== loadId));
        fetchLoads();
      })
      .catch(error => {
      });
  };
  

  return (
    <>
      <ShipperSideBar activePage="activeLoads" />
      <Easeout>
        <UserHeader title="Active Loads" />
        <Flex
          pt={"10"}
          direction={"column"}
          alignItems={"center"}
          padding={"10"}
        >
          <Stack spacing={4} direction={"row"} mb="4">
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
          <Card overflowX="auto" width="full" p="4">
            <Accordion allowToggle>
              {filteredLoads.map((load, index) => (
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
                            float={"right"}
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
                        <BlueButton
                          color={customBlue}
                          icon={<MdEditSquare />}
                          mt="4"
                          w="90px"
                          children="Edit"
                          variant="blueBackwardButton"
                          onClick={() => openModal(load)}
                        />
                        <BlueButton
                          color={customBlue}
                          icon={<MdDelete />}
                          mt="4"
                          w="90px"
                          children="Delete"
                          variant="blueForwardButton"
                          onClick={() => handleDeleteLoad(load._id, load.additionalDocument)}
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
          onLoadUpdate={handleLoadUpdate}
        />
      )}
    </>
  );
}

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
