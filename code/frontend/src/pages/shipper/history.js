import Sidebar from "../../components/sidebar/shipperSideBar.js";
import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Stack,
  Input,
  Card,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  Badge,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import EaseOut from "../../components/responsiveness/easeOut.js";
import UserHeader from "../../components/header/userHeader.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";

export default function History() {
  Protector("/api/history");
  const { data } = useData();
  const firstName = data ? data.firstName : "";
  const lastName = data ? data.lastName : "";
  const backend = process.env.REACT_APP_BACKEND_PORT;

  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [filteredLoads, setFilteredLoads] = useState([]);
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    if (Array.isArray(data.loads)) {
      setLoads(data.loads);
    }
  }, [data]);

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
        load?.status?.toLowerCase() === "delivered"
    );
    setFilteredLoads(filtered);
  }, [fromSearchTerm, toSearchTerm, statusSearchTerm, loads]);

  return (
    <>
      <Sidebar activePage="history" />
      <EaseOut>
        <UserHeader title="Load History" userInfo={{ firstName, lastName }} />
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
                    >
                      <Box flex="1">
                        <Text
                          textAlign={"center"}
                          fontSize={"18"}
                          fontWeight="bold"
                          pb={"10px"}
                        >
                          Load Information
                        </Text>
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

                        {load.additionalInformation ? (
                          <Text fontSize="md" mb="2">
                            <strong>Additional Information:</strong>{" "}
                            {load.additionalInformation}
                          </Text>
                        ) : (
                          <></>
                        )}
                        {load.additionalDocument ? (
                          <Text fontSize="md" mb="2">
                            <strong>Additional Document:</strong>{" "}
                            <a
                              href={`http://${backend}${load.additionalDocument}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "blue" }}
                            >
                              View Document
                            </a>
                          </Text>
                        ) : (
                          <></>
                        )}
                      </Box>

                      <Box flex="1" ml="4">
                        <Text
                          textAlign={"center"}
                          fontSize={"18"}
                          fontWeight="bold"
                          pb={"10px"}
                        >
                          Delivery Information
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Carrier Name:</strong>{" "}
                          {load.carrierFirstName}{" "}{load.carrierLastName}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Carrier Phone Number:</strong>{" "}
                          {load.carrierPhoneNumber}
                        </Text>
                        <Text fontSize="md" mb="2">
                          <strong>Driver Name:</strong>{" "}
                          {load.driverFirstName}{" "}{load.driverLastName}
                        </Text>
                      </Box>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </Flex>
      </EaseOut>
    </>
  );
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "delivered":
      return "green";
    default:
      return "gray";
  }
}
