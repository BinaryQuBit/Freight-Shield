import { Flex, Text } from "@chakra-ui/react";
import Sidebar from "../Sidebar/ShipperSideBar";
import {
  Card,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  VStack
} from "@chakra-ui/react";
import GreenButton from "../buttons/greenButton";
import BlueButton from "../buttons/blueButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyLoad() {
  const [loads, setLoads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch loads data from the server
    axios.get("http://localhost:8080/myLoads")  // Update the endpoint to your actual API endpoint
      .then((response) => {
        setLoads(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loads:", error);
      });
  }, []);

  return (
    <>
      <Flex>
        <Sidebar activePage="myLoads" />
        <Flex flex={1} justifyContent="center">
        <VStack mt={10}>
        <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}>
              {" "}
              My Loads{" "}
            </Text>
          <Card alignItems={"center"} maxWidth={1500} p={10}>
            <Table variant="simple" spacing={6}>
              <Thead>
                <Tr>
                  <Th>Pickup Address</Th>
                  <Th>PickUp Date</Th>
                  <Th>Pickup Time</Th>
                  <Th>Drop off Address</Th>
                  <Th>More Info</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loads.map((load) => (
                  <Tr key={load._id}>
                    <Td>{load.pickUpLocation}</Td>
                    <Td>{load.pickUpDate}</Td>
                    <Td>{load.pickUpTime}</Td>
                    <Td>{load.dropOffLocation}</Td>
                    <Td>
                      <GreenButton onClick={() => navigate(`/loadDetails/${load._id}`)}>
                        More Info
                      </GreenButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}
