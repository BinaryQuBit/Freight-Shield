// Marketplace

// React Imports
import React, { useState } from "react";

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
} from "@chakra-ui/react";

// Custom Imports
import CarrierSideBar from "../../components/sidebar/carrierSideBar.js";
import UserHeader from "../../components/header/userHeader.js";
import EaseOut from "../../components/responsiveness/easeOut.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import EmbeddedMap from "../../components/google/embeddedMap.js";
import CustomButton from "../../components/buttons/customButton.js";
import { FaUserPlus } from "react-icons/fa";
import Assign from "../../components/addButton/assignUnitDriver.js";

// Start of Build
export default function Marketplace() {
  Protector("/api/marketplace");
  const backend = process.env.REACT_APP_BACKEND_PORT;

  // Hooks
  const { colorMode } = useColorMode();
  const { data } = useData();
  const { firstName, lastName } = data.user || {};
  const [filterOption, setFilterOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const loads = data.loads || [];
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const openAssignModal = (loadId) => {
    setSelectedLoadId(loadId);
    setIsAssignModalOpen(true);
  };
  const closeAssignModal = () => setIsAssignModalOpen(false);
  const units = data.units || [];
  const driverData = data.driverData || [];
  const [selectedLoadId, setSelectedLoadId] = useState(null);
  const [loadTypeFilter, setLoadTypeFilter] = useState("");

  // Filter Handle
  const filteredLoads = loads.filter((load) => {
    const fieldToFilter = load[filterOption]
      ? load[filterOption].toString().toLowerCase()
      : "";
    let matchesTypeLoadFilter = true;
    if (filterOption === "typeLoad" && loadTypeFilter) {
      matchesTypeLoadFilter = load.typeLoad === loadTypeFilter;
    }
    return (
      fieldToFilter.includes(searchTerm.toLowerCase()) && matchesTypeLoadFilter
    );
  });
  console.log("This is Data", data);

  return (
    <>
      <Assign
        isOpen={isAssignModalOpen}
        onClose={closeAssignModal}
        units={units}
        driverData={driverData}
        selectedLoadId={selectedLoadId} 
      />
      <CarrierSideBar activePage={"marketplace"} />
      <EaseOut>
        <UserHeader title="Marketplace" userInfo={{ firstName, lastName }} />
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
            {filterOption === "typeLoad" && (
              <Select
                placeholder="Select Load Type"
                value={loadTypeFilter}
                onChange={(e) => setLoadTypeFilter(e.target.value)}
                mr={2}
              >
                <option value="Full Load">Full</option>
                <option value="LTL">LTL</option>
              </Select>
            )}
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              flexGrow={1}
            />
          </Stack>

          {filteredLoads.length > 0 ? (
            <Card overflowX="auto" width="full" p="4">
              <Accordion allowToggle>
                {filteredLoads.map((load) => (
                  <AccordionItem key={load._id}>
                    <h2>
                      <AccordionButton
                        _expanded={{
                          bg: colorMode === "dark" ? "blue.700" : "blue.100",
                          color: colorMode === "dark" ? "white" : "black",
                        }}
                      >
                        <Box flex="1" textAlign="center">
                          <Badge colorScheme="yellow" p={1} float={"left"}>
                            {load.typeLoad}
                          </Badge>
                          <Text fontSize="lg">
                            {load.pickUpCity} to {load.dropOffCity}
                            <Text p={1} fontSize={15} float={"right"}>
                              $ {load.price}
                            </Text>
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
                            <strong>Unit Requested:</strong>{" "}
                            {load.unitRequested}
                          </Text>
                          <Text fontSize="md" mb="2">
                            <strong>Type of Load:</strong> {load.typeLoad}
                          </Text>
                          {load.typeLoad === "LTL" ? (
                            <Text fontSize="md" mb="2">
                              <strong>Size of Load:</strong> {load.sizeLoad}{" "}
                              feet
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
                                href={`http://${backend}${load.additionalDocument}`}
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
                            {load.shipperFirstName} {load.shipperLastName}
                          </Text>
                          <Text fontSize="md" mb="2">
                            <strong>Contact Phone Number:</strong>{" "}
                            {load.shipperPhoneNumber}
                          </Text>
                          <Text fontSize={"md"} mb={"2"}>
                            <strong>Contact Email:</strong> {load.shipperEmail}
                          </Text>
                        </Box>
                        {(load.status.toLowerCase() === "in transit" ||
                          load.status.toLowerCase() === "delayed") && (
                          <Flex flex={"1"}>
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
                          </Flex>
                        )}
                        <CustomButton
                          backgroundColor="#0866FF"
                          icon={<FaUserPlus />}
                          mt="4"
                          w="100px"
                          children="Assign"
                          variant="blueForwardButton"
                          floatSide={"right"}
                          onClick={() => openAssignModal(load._id)}
                        />
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ) : (
            <Box textAlign="center" mt="5">
              <Text fontSize="xl">Chirp... Chirp... No Loads Available</Text>
            </Box>
          )}
        </Flex>
      </EaseOut>
    </>
  );
}
