import Sidebar from "../../components/sidebar/AdminSideBar";
import React from "react";
import { Button } from "@chakra-ui/react";
import { Flex, Text, VStack, Card, Stack } from "@chakra-ui/react";
import Protector from "../../components/utils/methods/getters/Protector.js"

export default function Administrators() {
  Protector("/administrators")

  return (
    <Flex>
      <Sidebar activePage="administrators" />
      <Flex flex={1} justifyContent="center">
        <VStack mt={10}>
          <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}>
            Sorry, I first put this on the wrong page. ~ Alok
          </Text>

          <Card
            width="100%"
            mb={200}
            alignItems={"center"}
            justifyContent={"center"}
            p={10}
          >
            <Stack spacing={4}>
              <Text fontFamily="Lora" fontWeight={"500"}>
                Pick Up Location
              </Text>

              <Button colorScheme="green">Approve</Button>
              <Button colorScheme="red">Deny</Button>
            </Stack>
          </Card>
        </VStack>
      </Flex>
    </Flex>
  );
}
