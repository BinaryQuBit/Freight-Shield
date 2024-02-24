// My Loads Page

import Sidebar from "../../components/sidebar/carrierSideBar.js";
import React, { useState, useEffect } from "react";
import { Flex, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import EaseOut from "../../components/responsiveness/easeOut.js";
import Protector from "../../components/utils/methods/getters/protector.js"

export default function MyLoads() {
  Protector("/myloads");

  const navigate = useNavigate();
  const [loads, setLoads] = useState([]);
  const [loginEmail, setLoginEmail] = useState(null);

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

