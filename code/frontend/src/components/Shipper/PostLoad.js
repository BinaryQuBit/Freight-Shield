import { Flex, Text } from "@chakra-ui/react";
import ShipperSideBar from "../Sidebar/ShipperSideBar";
import {
  Card,
  Input,
  Stack,
  Center,
  HStack,
  Spacer,
  VStack,
  Checkbox,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import GreenButton from "../buttons/greenButton";
import React from "react";

export default function PostLoad() {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    console.log("Selected file:", selectedFile);
  };
  return (
    <>
      <Flex>
        <ShipperSideBar />
        <Flex flex={1} justifyContent="center">
          {" "}
          {/* Use flex property to fill available space */}
          <VStack mt={10}>
            <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}>
              {" "}
              Post a Load{" "}
            </Text>
            <Card
              width="100%"
              mb={20}
              alignItems={"center"}
              maxWidth={1500}
              justifyContent={"center"}
              p={10}
            >
              <Stack spacing={4}>
                <Stack>
                  <Text fontFamily="Lora" fontWeight={"500"}>
                    Pick Up Location
                  </Text>
                  <Input type="text" />
                </Stack>

                <HStack>
                  <Stack>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Pick Up Date
                    </Text>
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                    />
                  </Stack>

                  <Stack>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Pick Up Time
                    </Text>
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="time"
                    />
                  </Stack>
                </HStack>

                <Stack>
                  <Text fontFamily="Lora" fontWeight={"500"}>
                    Drop Off Location
                  </Text>
                  <Input type="text" />
                </Stack>

                <Stack>
                  <Text fontFamily="Lora" fontWeight={"500"}>
                    Unit Requested
                  </Text>
                  <SimpleGrid columns={4} spacing={4}>
                    <Checkbox colorScheme="green">Dry Van</Checkbox>
                    <Checkbox colorScheme="green">Flat Bed</Checkbox>
                    <Checkbox colorScheme="green">Reefer</Checkbox>
                    <Checkbox colorScheme="green">Low Boy</Checkbox>
                    <Checkbox colorScheme="green">Step Deck</Checkbox>
                    <Checkbox colorScheme="green">Tank</Checkbox>
                    <Checkbox colorScheme="green">Conestega</Checkbox>
                    <Checkbox colorScheme="green">Double Drop</Checkbox>
                    <Checkbox colorScheme="green">Car Carriers</Checkbox>
                    <Checkbox colorScheme="green">Side kit</Checkbox>
                    <Checkbox colorScheme="green">Dump</Checkbox>
                    <Checkbox colorScheme="green">Live Floor</Checkbox>
                    <Checkbox colorScheme="green">End Dump</Checkbox>
                    <Checkbox colorScheme="green">Side Dump</Checkbox>
                    <Checkbox colorScheme="green">OverLoad</Checkbox>
                    <Checkbox colorScheme="green">Rocky Mountain</Checkbox>
                    <Checkbox colorScheme="green">Twinpike</Checkbox>
                    <Checkbox colorScheme="green">LHV</Checkbox>
                    <Checkbox colorScheme="green">Super V</Checkbox>
                  </SimpleGrid>
                </Stack>

                <Stack>
                  <Text fontFamily="Lora" fontWeight={"500"}>
                    Type of Load
                  </Text>
                  <SimpleGrid columns={4} spacing={0}>
                    <Checkbox colorScheme="green">LTL</Checkbox>
                    <Checkbox colorScheme="green">Full Load</Checkbox>
                  </SimpleGrid>
                </Stack>

                <Stack>
                  <SimpleGrid columns={4} spacing={0}>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Size of Load
                    </Text>

                    <NumberInput size="lg" maxW={32} defaultValue={47} min={10}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </SimpleGrid>
                </Stack>

                <Stack>
                  <Text fontFamily="Lora" fontWeight={"500"}>
                    Additional Information
                  </Text>
                  <Input type="text" />
                </Stack>

                <Stack>
                  <Text fontFamily="Lora" fontWeight={"500"}>
                    Additional Documents
                  </Text>
                  <SimpleGrid columns={2} spacing={4}>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .pdf, .png, .gif" 
                    mb={4}
                  />
                  <Button  colorScheme="teal" size="md">
                    Upload File
                  </Button>
                  </SimpleGrid>
                </Stack>

                <HStack mt={4}>
                  <GreenButton>Reset</GreenButton>
                  <Spacer />
                  <GreenButton>Post</GreenButton>
                </HStack>
              </Stack>
            </Card>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}
