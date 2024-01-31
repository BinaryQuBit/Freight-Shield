import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
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
import { SidebarContext } from "../../components/responsiveness/Context";
import GreenButton from "../../components/buttons/GreenButton.js";
import EmbeddedMap from "../../components/google/EmbeddedMap.js";
import { useNavigate } from "react-router-dom";

export default function ActiveLoads() {
  const { navSize } = useContext(SidebarContext);
  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [filteredLoads, setFilteredLoads] = useState([]);
  const [loads, setLoads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

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
          load?.status?.toLowerCase() === statusSearchTerm.toLowerCase())
    );
    setFilteredLoads(filtered);
  }, [fromSearchTerm, toSearchTerm, statusSearchTerm, loads]);

  return (
    <>
      <ShipperSideBar activePage="activeLoads" />
      <Flex
        ml={navSize === "small" ? "50px" : "200px"}
        transition="margin 0.3s ease-in-out"
        justifyContent="center"
        direction={"column"}
      >
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
              placeholder="Select Status"
              onChange={(e) => setStatusSearchTerm(e.target.value)}
            >
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
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
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex
                      direction="row"
                      align="center"
                      justify="space-between"
                    >
                      <Box flex="1">
                        {" "}
                        {/* Text Container*/}
                        <Badge p="1" mr="2">
                          {load.status}
                          This is status
                        </Badge>
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
                          <strong>Additional Information:</strong>{" "}
                          {load.additionalInformation}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Additional Documents:</strong>{" "}
                          {load.additionalDocument}
                        </Text>
                        <GreenButton>Edit</GreenButton>
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
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "in transit":
      return "blue";
    case "delivered":
      return "green";
    case "pending":
      return "orange";
    default:
      return "gray";
  }
}
