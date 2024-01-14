import { Flex, Radio, RadioGroup, Text } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar/ShipperSideBar";
import {
  Card,
  Input,
  Stack,
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
import GreenButton from "../../components/buttons/GreenButton";
import BlueButton from "../../components/buttons/BlueButton";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EaseOut } from "../../components/responsiveness/EaseOut";

export default function PostLoad() {
  const [pickUpLocation, setPickUpLocation] = useState();
  const [pickUpDate, setPickUpDate] = useState();
  const [pickUpTime, setPickUpTime] = useState();
  const [dropOffDate, setDropOffDate] = useState();
  const [dropOffTime, setDropOffTime] = useState();
  const [dropOffLocation, setDropOffLocation] = useState();
  const navigate = useNavigate();
  const [ltlValue, ltlSetValue] = useState("LTL");
  const [unitRequested, setUnitRequested] = useState("Dry Van");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:8080/postLoad", {
        pickUpLocation,
        pickUpDate,
        pickUpTime,
        dropOffLocation,
      });

      console.log(result);

      if (result.data === "Already registered") {
        alert("Load is already posted");
      } else {
        alert("Posted Successfully");
      }

      navigate("/myLoads");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .post("/postload", { withCredentials: true })
      .then((response) => {
        console.log("Posted Load Successfully");
      })
      .catch((error) => {
        console.error("Error Posting Load: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <>
      <Flex>
        <Sidebar activePage="postLoad"/>
        <Spacer></Spacer>
        <Flex flex={1} justifyContent="center">
          <VStack mt={10}>
            <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}>
              Post a Load
            </Text> 
            <Card
              width="100%"
              mb={20}
              alignItems={"center"}
              maxWidth={1500}
              justifyContent={"center"}
              p={10}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <Stack>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Pick Up Location
                    </Text>
                    <Input
                      type="text"
                      onChange={(event) =>
                        setPickUpLocation(event.target.value)
                      }
                    />
                  </Stack>

                  <HStack spacing={5}>
                    <Stack>
                      <Text fontFamily="Lora" fontWeight={"500"}>
                        Pick Up Date
                      </Text>
                      <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="date"
                        onChange={(event) => setPickUpDate(event.target.value)}
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
                        onChange={(event) => setPickUpTime(event.target.value)}
                      />
                    </Stack>
                  
                    <Stack>
                      <Text fontFamily="Lora" fontWeight={"500"}>
                        Drop Off Date
                      </Text>
                      <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="date"
                        onChange={(event) => setDropOffDate(event.target.value)}
                      />
                    </Stack>

                    <Stack>
                      <Text fontFamily="Lora" fontWeight={"500"}>
                        Drop Off Time
                      </Text>
                      <Input
                        placeholder="Select Time"
                        size="md"
                        type="time"
                        onChange={(event) => setDropOffTime(event.target.value)}
                      />
                    </Stack>
                  </HStack>

                  <Stack>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Drop Off Location
                    </Text>
                    <Input
                      type="text"
                      onChange={(event) =>
                        setDropOffLocation(event.target.value)
                      }
                    />
                  </Stack>

                  <Stack>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Unit Requested
                    </Text>
                    <RadioGroup onChange={setUnitRequested} value={unitRequested}>
                      <SimpleGrid columns={4} spacing={4}>
                        <Radio colorScheme="green" value="Dry Van">Dry Van</Radio>
                        <Radio colorScheme="green" value="Flat Bed">Flat Bed</Radio>
                        <Radio colorScheme="green" value="Reefer">Reefer</Radio>
                        <Radio colorScheme="green" value="Low Boy">Low Boy</Radio>
                        <Radio colorScheme="green" value="Step Deck">Step Deck</Radio>
                        <Radio colorScheme="green" value="Tank">Tank</Radio>
                        <Radio colorScheme="green" value="Conestega">Conestega</Radio>
                        <Radio colorScheme="green" value="Double Drop">Double Drop</Radio>
                        <Radio colorScheme="green" value="Car Carriers">Car Carriers</Radio>
                        <Radio colorScheme="green" value="Side kit">Side kit</Radio>
                        <Radio colorScheme="green" value="Dump">Dump</Radio>
                        <Radio colorScheme="green" value="Live Floor">Live Floor</Radio>
                        <Radio colorScheme="green" value="End Dump">End Dump</Radio>
                        <Radio colorScheme="green" value="Side Dump">Side Dump</Radio>
                        <Radio colorScheme="green" value="OverLoad">OverLoad</Radio>
                        <Radio colorScheme="green" value="Rocky Mountain">Rocky Mountain</Radio>
                        <Radio colorScheme="green" value="Twinpike">Twinpike</Radio>
                        <Radio colorScheme="green" value="LHV">LHV</Radio>
                        <Radio colorScheme="green" value="Super V">Super V</Radio>
                      </SimpleGrid>
                    </RadioGroup>
                    
                  </Stack>

                  <Stack>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Type of Load
                    </Text>
                    <RadioGroup onChange={ltlSetValue} value={ltlValue}>
                      <SimpleGrid columns={4} spacing={0}>
                        <Radio colorScheme="green" value="LTL">LTL</Radio>
                        <Radio colorScheme="green" value="Full Load">Full Load</Radio>
                      </SimpleGrid>
                    </RadioGroup>

                    {ltlValue === "LTL" && (
                      <Stack>
                        <SimpleGrid columns={4} spacing={0}>
                          <Text fontFamily="Lora" fontWeight={"500"}>
                            Size of Load (Ft)
                          </Text>

                          <NumberInput
                            size="lg"
                            maxW={32}
                            defaultValue={47}
                            min={10}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </SimpleGrid>
                      </Stack>
                    )}
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
                      <GreenButton colorScheme="teal" size="md">
                        Upload File
                      </GreenButton>
                    </SimpleGrid>
                  </Stack>

                  <HStack mt={4}>
                    <GreenButton>Reset</GreenButton>
                    <Spacer />
                    <GreenButton type="submit">Post</GreenButton>
                  </HStack>
                </Stack>
              </form>
            </Card>
          </VStack>
        
        </Flex>
      </Flex>
    </>
  );
}
