import Sidebar from "../../components/sidebar/CarrierSideBar";
import React, { useState, useEffect } from "react";
import { Flex, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EaseOut from "../../components/responsiveness/EaseOut";

export default function MyLoads() {
  const navigate = useNavigate();
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    axios
      .get("/marketplace", { withCredentials: true })
      .then((response) => {
        console.log("My Loads Fetched Successfully", response.data.loads);
        setLoads(response.data.loads); // Update state with fetched loads
      })
      .catch((error) => {
        console.error("Error Fetching My Loads: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  // Assuming carrierId is the property that should match
const myCarrierId = "carrier@carrier.com"; // Replace with your actual carrierId

// Filter loads to include only those with matching carrierId
const filteredLoads = loads.filter((load) => load.carrierEmail === myCarrierId);



  return (
    <>
      <Sidebar activePage="myLoads" />
      <EaseOut>
        <Flex direction="column" alignItems="center" padding="10">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>From</Th>
                <Th>To</Th>
                <Th>Status</Th>
                {/* Add more headers based on your load object */}
              </Tr>
            </Thead>
            <Tbody>
            {filteredLoads.map((load) => (
  <Tr key={load._id}>
    <Td>{load.pickUpCity}</Td>
    <Td>{load.dropOffCity}</Td>
    <Td>{load.status}</Td>
    {/* Add more cells based on your load object */}
  </Tr>
))}
            </Tbody>
          </Table>
        </Flex>
      </EaseOut>
    </>
  );
}
