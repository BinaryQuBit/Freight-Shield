// Marketplace

// React Imports
import React, { useState } from 'react';

// Chakra UI Imports
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  Box,
  Text,
  Input,
  Select,
  Flex,
  Badge,
  Stack,
  useColorMode,
} from '@chakra-ui/react';

// Custom Imports
import CarrierSideBar from "../../components/sidebar/carrierSideBar.js";
import UserHeader from '../../components/header/userHeader.js';
import EaseOut from '../../components/responsiveness/easeOut.js';
import { useData } from '../../components/utils/methods/getters/dataContext.js';
import Protector from '../../components/utils/methods/getters/protector.js';
import EmbeddedMap from '../../components/google/embeddedMap.js';

// Start of Build
export default function Marketplace() {
  Protector("/api/marketplace");

  // Hooks
  const { colorMode } = useColorMode();
  const { data } = useData();
  const [filterOption, setFilterOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const loads = data.loads || [];

  // Filter Handle
  const filteredLoads = loads.filter(load => {
    const fieldToFilter = load[filterOption] ? load[filterOption].toString().toLowerCase() : '';
    return fieldToFilter.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <CarrierSideBar activePage={"marketplace"}/>
      <EaseOut>
        <UserHeader title={"Marketplace"}/>
        <Flex pt="10" direction="column" alignItems="center" padding="10">
          <Stack spacing={4} direction="row" mb="4">
            <Select
              placeholder="Select Filter"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              mr={2}
            >
              <option value="pickUpCity">Pick Up City</option>
              <option value="dropOffCity">Drop Off City</option>
              <option value="shipperCompanyName">Company Name</option>
              <option value="typeLoad">Type of Load</option>
              <option value="unitRequested">Unit Requested</option>
            </Select>
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              flexGrow={1}
            />
          </Stack>
          <Card overflowX="auto" width="full" p="4">
            <Accordion allowToggle>
              {filteredLoads.map((load) => (
                <AccordionItem key={load._id}>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: colorMode === 'dark' ? 'blue.700' : 'blue.100', color: colorMode === 'dark' ? 'white' : 'black' }}
                    >
                      <Box flex="1" textAlign="center">
                        <Text fontSize="lg">
                          {load.pickUpCity} to {load.dropOffCity}
                          <Badge colorScheme="yellow" p={1} float={"right"}>{load.typeLoad}</Badge>
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
                        <Box flex={"1"}>
                          <Text
                            textAlign={"center"}
                            pt={"10"}
                            fontWeight={"bold"}
                            fontSize={"18"}
                          >
                            Shipper Information
                          </Text>
                          <Text fontSize="md" mb="2">
                            <strong>Company Name:</strong>{" "}
                            {load.shipperCompanyName}
                          </Text>
                          <Text fontSize="md" mb="2">
                            <strong>Contact Name:</strong>{" "}
                            {load.shipperFirstName}{" "}
                            {load.shipperLastName}
                          </Text>
                          <Text fontSize="md" mb="2">
                            <strong>Contact Phone Number:</strong>{" "}
                            {load.shipperPhoneNumber}
                          </Text>
                          <Text fontSize={"md"} mb={"2"}>
                            <strong>Contact Email:</strong>{" "}
                            {load.shipperEmail}
                          </Text>
                        </Box>
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
