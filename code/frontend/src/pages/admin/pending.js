// Pending Page

import Sidebar from "../../components/sidebar/adminSideBar";
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { VStack, Card, HStack } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/react";
import Protector from "../../components/utils/methods/getters/protector";

export default function Pending() {
  Protector("/pending");

  return (
    <Flex>
      <Sidebar activePage="pending" />
      <Flex flex={1} justifyContent="center">
        <VStack mt={10}>
          <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}>
            Pending Users (basic layout)
          </Text>

          <Card
            width="100%"
            mb={200}
            alignItems={"center"}
            justifyContent={"center"}
            p={10}
          >
            <Text fontFamily="Lora" fontSize={20} fontWeight={"1000"} mt={2}>
              Carriers
            </Text>
            <HStack spacing={4} p={4}>
              <Text fontFamily="Lora" fontWeight={"500"}>
                Company 1
              </Text>

              <IconButton
                colorScheme="green"
                aria-label="Approve"
                icon={<FiCheckCircle />}
              />
              <IconButton
                colorScheme="red"
                aria-label="Deny"
                icon={<FiXCircle />}
              />
            </HStack>

            <Text fontFamily="Lora" fontSize={20} fontWeight={"1000"} mt={2}>
              Shippers
            </Text>

            <HStack spacing={4} p={4}>
              <Text fontFamily="Lora" fontWeight={"500"}>
                Shipper 1
              </Text>

              <IconButton
                colorScheme="green"
                aria-label="Approve"
                icon={<FiCheckCircle />}
              />
              <IconButton
                colorScheme="red"
                aria-label="Deny"
                icon={<FiXCircle />}
              />
            </HStack>

            <Text fontFamily="Lora" fontSize={20} fontWeight={"1000"} mt={2}>
              Drivers
            </Text>

            <HStack spacing={4} p={4}>
              <Text fontFamily="Lora" fontWeight={"500"}>
                Driver 1
              </Text>

              <IconButton
                colorScheme="green"
                aria-label="Approve"
                icon={<FiCheckCircle />}
              />
              <IconButton
                colorScheme="red"
                aria-label="Deny"
                icon={<FiXCircle />}
              />
            </HStack>
          </Card>
        </VStack>
      </Flex>
    </Flex>
  );
}
