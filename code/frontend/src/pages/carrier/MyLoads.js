import Sidebar from "../../components/sidebar/CarrierSideBar";
import React, { useState, useEffect } from "react";
import { Flex, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EaseOut from "../../components/responsiveness/EaseOut";

export default function MyLoads() {
  const navigate = useNavigate();
  const [loads, setLoads] = useState([]);
  const [loginEmail, setLoginEmail] = useState(null);

  useEffect(() => {
    axios.get("/marketplace", { withCredentials: true })
      .then((response) => {
        setLoads(response.data.loads);
      })
      .catch((error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate("/login");
        }
      });
  }, [navigate]);

  useEffect(() => {
    const fetchShipperLoginDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/login", { withCredentials: true });
        if (response.data.email) {
          setLoginEmail(response.data.email);
        }
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate("/login");
        }
      }
    };

    fetchShipperLoginDetails();
  }, [navigate]);

  const filteredLoads = loads.filter((load) => load.carrierEmail === loginEmail);

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
              </Tr>
            </Thead>
            <Tbody>
              {filteredLoads.map((load) => (
                <Tr key={load._id}>
                  <Td>{load.pickUpCity}</Td>
                  <Td>{load.dropOffCity}</Td>
                  <Td>{load.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </EaseOut>
    </>
  );
}

