import Sidebar from "../../components/sidebar/CarrierSideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Input,
  Box,
  Text,
  Stack,
  Card,
  AccordionIcon,
  AccordionButton,
  AccordionItem,
  Accordion,
} from "@chakra-ui/react";
import UserHeader from "../../components/header/UserHeader";
import EmbeddedMap from "../../components/google/EmbeddedMap.js";
import { useNavigate } from "react-router-dom";
import Easeout from "../../components/responsiveness/EaseOut.js";

export default function Marketplace() {
  const navigate = useNavigate();
  const [loads, setLoads] = useState([]);
  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [filteredLoads, setFilteredLoads] = useState([]);
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(null);

  useEffect(() => {
    axios
      .get("/marketplace", { withCredentials: true })
      .then((response) => {
        console.log("Marketplace Fetched Successfully", response.data);
        setLoads(response.data.loads);
      })
      .catch((error) => {
        console.error("Error Fetching Marketplace: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/marketplace");
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

  const handleDetailsClick = (index) => {
    setSelectedDetailIndex(index === selectedDetailIndex ? null : index);
  };

  return (
    <>
      <Sidebar activePage="marketplace" />
      <Easeout>
        <UserHeader title="Loads" />
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
            <table>
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoads.map((load, index) => (
                  <React.Fragment key={load.id}>
                    <tr>
                      <td style={{ textAlign: "center" }}>{load.pickUpCity}</td>
                      <td style={{ textAlign: "center" }}>{load.dropOffCity}</td>

                      <td onClick={() => handleDetailsClick(index)} colSpan="2">
                        <Accordion allowToggle>
                          <AccordionItem border={'none'} key={load.id} my="2">
                            <AccordionButton
                              _expanded={{ bg: "gray.100", color: "black" }}
                              
                            >
                              <Box flex={"1"}>
                              <AccordionIcon />
                              </Box>
                              
                            </AccordionButton>{" "}
                          </AccordionItem>
                        </Accordion>
                      </td>
                    </tr>
                    {selectedDetailIndex === index && (
                      <tr>
                        <td colSpan="2">
                          <Card>
                            <Flex
                              direction={{
                                base: "column",
                                md: "column",
                                lg: "row",
                              }}
                              align={{ lg: "center" }}
                            >
                              <Box flex="1">
                                <Text  fontSize="md" mb="2">
                                  <strong>Pickup Location:</strong>{" "}
                                  {load.pickUpLocation}
                                </Text>
                                <Text fontSize="md" mb="2">
                                  <strong>Pick Up Date:</strong>{" "}
                                  {load.pickUpDate}
                                </Text>
                                <Text fontSize="md" mb="2">
                                  <strong>Pick Up Time:</strong>{" "}
                                  {load.pickUpTime}
                                </Text>
                                <Text fontSize="md" mb="2">
                                  <strong>Drop Off Location:</strong>{" "}
                                  {load.dropOffLocation}
                                </Text>
                                <Text fontSize="md" mb="2">
                                  <strong>Drop Off Date:</strong>{" "}
                                  {load.dropOffDate}
                                </Text>
                                <Text fontSize="md" mb="2">
                                  <strong>Drop Off Time:</strong>{" "}
                                  {load.dropOffTime}
                                </Text>
                                <Text fontSize="md" mb="2">
                                  <strong>Unit Requested:</strong>{" "}
                                  {load.unitRequested}
                                </Text>
                                <Text fontSize="md" mb="2">
                                  <strong>Additional Information:</strong>{" "}
                                  {load.additionalInformation}
                                </Text>
                                <Text fontSize="md" mb="2">
                                  <strong>Additional Documents:</strong>{" "}
                                  {load.additionalDocument}
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
                            <Flex justify={"space-between"}></Flex>
                          </Card>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </Card>
        </Flex>
      </Easeout>
    </>
  );
}
