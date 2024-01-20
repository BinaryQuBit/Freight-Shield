import React, { useState, useContext } from "react";
import {
  Flex,
  FormControl,
  Input,
  Button,
  SimpleGrid,
  Radio,
  Checkbox,
  Stack,
  Select,
  Textarea,
  Box,
  Card,
} from "@chakra-ui/react";
import Sidebar from "../../components/sidebar/ShipperSideBar";
import UserHeader from "../../components/header/UserHeader";
import AutoCompletePlaces from "../../components/google/AutoCompletePlaces";
import { SidebarContext } from "../../components/responsiveness/Context";

const PostLoad = () => {
  const { navSize } = useContext(SidebarContext);
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");

  const handlePickUpAddressSelect = (place) => {
    setPickUpLocation(place.formatted_address);
  };

  const handleDropOffAddressSelect = (place) => {
    setDropOffLocation(place.formatted_address);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      "Form submitted with pick-up location: " +
        pickUpLocation +
        " and drop-off location: " +
        dropOffLocation
    );
  };

  return (
    <>
      <Sidebar activePage="postLoad" />
      <Flex
        ml={navSize === "small" ? "50px" : "200px"}
        transition="margin 0.3s ease-in-out"
        justifyContent="center"
        direction={"column"}
      >
        <UserHeader title="Post Load" />
        <Box w="100%" p={5}>
          <Card p={5}>
            <FormControl as="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
              <Flex>
      <AutoCompletePlaces id="pickup-location" mr="2" placeholder="Pick Up Location" />
      <AutoCompletePlaces id="dropoff-location" ml="2" placeholder="Drop Off Location" />
    </Flex>

                <Flex>
                  <Input type="date" placeholder="Pick Up Date" mr={"2"} />
                  <Input
                    type="time"
                    placeholder="Pick Up Time"
                    ml={"2"}
                    mr={"2"}
                  />
                  <Input
                    type="date"
                    placeholder="Drop Off Date"
                    ml={"2"}
                    mr={"2"}
                  />
                  <Input type="time" placeholder="Drop Off Time" ml={"2"} />
                </Flex>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                  <Radio colorScheme="green" value="Dry Van">
                    Dry Van
                  </Radio>
                  <Radio colorScheme="green" value="Flat Bed">
                    Flat Bed
                  </Radio>
                  <Radio colorScheme="green" value="Reefer">
                    Reefer
                  </Radio>
                  <Radio colorScheme="green" value="Low Boy">
                    Low Boy
                  </Radio>
                  <Radio colorScheme="green" value="Step Deck">
                    Step Deck
                  </Radio>
                  <Radio colorScheme="green" value="Tank">
                    Tank
                  </Radio>
                  <Radio colorScheme="green" value="Conestega">
                    Conestega
                  </Radio>
                  <Radio colorScheme="green" value="Double Drop">
                    Double Drop
                  </Radio>
                  <Radio colorScheme="green" value="Car Carriers">
                    Car Carriers
                  </Radio>
                  <Radio colorScheme="green" value="Side kit">
                    Side kit
                  </Radio>
                  <Radio colorScheme="green" value="Dump">
                    Dump
                  </Radio>
                  <Radio colorScheme="green" value="Live Floor">
                    Live Floor
                  </Radio>
                  <Radio colorScheme="green" value="End Dump">
                    End Dump
                  </Radio>
                  <Radio colorScheme="green" value="Side Dump">
                    Side Dump
                  </Radio>
                  <Radio colorScheme="green" value="OverLoad">
                    OverLoad
                  </Radio>
                  <Radio colorScheme="green" value="Rocky Mountain">
                    Rocky Mountain
                  </Radio>
                  <Radio colorScheme="green" value="Twinpike">
                    Twinpike
                  </Radio>
                  <Radio colorScheme="green" value="LHV">
                    LHV
                  </Radio>
                  <Radio colorScheme="green" value="Super V">
                    Super V
                  </Radio>
                </SimpleGrid>
                <Stack spacing={5} direction="row">
                  <Checkbox value="LTL">LTL</Checkbox>
                  <Checkbox value="fullLoad">Full Load</Checkbox>
                </Stack>
                <Select placeholder="Size of Load (Ft)">
                  <option value="47">47</option>
                </Select>
                <Textarea placeholder="Additional Information" />
                <Flex>
                  <Button as="label" htmlFor="file-upload" variant="outline">
                    Choose File
                    <Input
                      id="file-upload"
                      type="file"
                      hidden
                      onChange={(e) => console.log(e.target.files)}
                    />
                  </Button>
                  <Button
                    colorScheme="green"
                    onClick={() => alert("Implement file upload logic here.")}
                  >
                    Upload File
                  </Button>
                </Flex>
                <Flex justifyContent="space-between">
                  <Button
                    variant="outline"
                    onClick={() => alert("Implement reset logic here.")}
                  >
                    Reset
                  </Button>
                  <Button colorScheme="blue" type="submit">
                    Post
                  </Button>
                </Flex>
              </Stack>
            </FormControl>
          </Card>
        </Box>
      </Flex>
    </>
  );
};

export default PostLoad;

// import { useState, useContext } from "react";
// import { Flex, Radio, RadioGroup, Text } from "@chakra-ui/react";
// import Sidebar from "../../components/sidebar/ShipperSideBar";
// import {
//   Card,
//   Input,
//   Stack,
//   HStack,
//   Spacer,
//   VStack,
//   SimpleGrid,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   NumberIncrementStepper,
//   NumberDecrementStepper,
// } from "@chakra-ui/react";
// import GreenButton from "../../components/buttons/GreenButton";
// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { SidebarContext } from "../../components/responsiveness/Context";

// export default function PostLoad() {
//   const { navSize } = useContext(SidebarContext);
//   const [pickUpLocation, setPickUpLocation] = useState();
//   const [pickUpDate, setPickUpDate] = useState();
//   const [pickUpTime, setPickUpTime] = useState();
//   const [dropOffDate, setDropOffDate] = useState();
//   const [dropOffTime, setDropOffTime] = useState();
//   const [dropOffLocation, setDropOffLocation] = useState();
//   const [unitRequested, setUnitRequested] = useState("Dry Van");
//   const [typeLoad, setTypeLoad] = useState("LTL");
//   const [sizeLoad, setSizeLoad] = useState("47");
//   const [additionalInformation, setAdditionalInformation] = useState("");
//   const [additionalDocument, setAdditionalDocument] = useState(null);
//   const navigate = useNavigate();

//   const handleAdditionalInfoChange = (event) => {
//     setAdditionalInformation(event.target.value);
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setAdditionalDocument(selectedFile);
//   };

//   const handleSizeLoadChange = (value) => setSizeLoad(value);

//   const handleLoadPost = async (event) => {
//     event.preventDefault();
//     try {
//       const postData = {
//         pickUpLocation,
//         pickUpDate,
//         pickUpTime,
//         dropOffDate,
//         dropOffTime,
//         dropOffLocation,
//         unitRequested,
//         typeLoad,
//         sizeLoad,
//         additionalInformation,
//         additionalDocument,
//       };

//       const response = await axios.post("/postload", postData);

//         navigate("/activeloads");

//     } catch (error) {
//       console.error("Error posting load:", error);
//     }
//   };

//   return (
//     <>
//             <Flex
//       >
//         <Sidebar activePage="postLoad" />
//         <Flex flex={1} justifyContent="center">
//           <VStack mt={10}>
//             <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}>
//               Post a Load
//             </Text>
//             <Card
//               width="100%"
//               mb={20}
//               alignItems={"center"}
//               maxWidth={1500}
//               justifyContent={"center"}
//               p={10}
//             >
//               <form onSubmit={handleLoadPost}>
//                 <Stack spacing={4}>
//                   <Stack>
//                     <Text fontFamily="Lora" fontWeight={"500"}>
//                       Pick Up Location
//                     </Text>
//                     <Input
//                       type="text"
//                       onChange={(event) =>
//                         setPickUpLocation(event.target.value)
//                       }
//                     />
//                   </Stack>

//                   <HStack spacing={5}>
//                     <Stack>
//                       <Text fontFamily="Lora" fontWeight={"500"}>
//                         Pick Up Date
//                       </Text>
//                       <Input
//                         placeholder="Select Date and Time"
//                         size="md"
//                         type="date"
//                         onChange={(event) => setPickUpDate(event.target.value)}
//                       />
//                     </Stack>

//                     <Stack>
//                       <Text fontFamily="Lora" fontWeight={"500"}>
//                         Pick Up Time
//                       </Text>
//                       <Input
//                         placeholder="Select Date and Time"
//                         size="md"
//                         type="time"
//                         onChange={(event) => setPickUpTime(event.target.value)}
//                       />
//                     </Stack>

//                     <Stack>
//                       <Text fontFamily="Lora" fontWeight={"500"}>
//                         Drop Off Date
//                       </Text>
//                       <Input
//                         placeholder="Select Date and Time"
//                         size="md"
//                         type="date"
//                         onChange={(event) => setDropOffDate(event.target.value)}
//                       />
//                     </Stack>

//                     <Stack>
//                       <Text fontFamily="Lora" fontWeight={"500"}>
//                         Drop Off Time
//                       </Text>
//                       <Input
//                         placeholder="Select Time"
//                         size="md"
//                         type="time"
//                         onChange={(event) => setDropOffTime(event.target.value)}
//                       />
//                     </Stack>
//                   </HStack>

//                   <Stack>
//                     <Text fontFamily="Lora" fontWeight={"500"}>
//                       Drop Off Location
//                     </Text>
//                     <Input
//                       type="text"
//                       onChange={(event) =>
//                         setDropOffLocation(event.target.value)
//                       }
//                     />
//                   </Stack>

//                   <Stack>
//                     <Text fontFamily="Lora" fontWeight={"500"}>
//                       Unit Requested
//                     </Text>
//                     <RadioGroup
//                       onChange={setUnitRequested}
//                       value={unitRequested}
//                     >
//                       <SimpleGrid columns={4} spacing={4}>
//                         <Radio colorScheme="green" value="Dry Van">
//                           Dry Van
//                         </Radio>
//                         <Radio colorScheme="green" value="Flat Bed">
//                           Flat Bed
//                         </Radio>
//                         <Radio colorScheme="green" value="Reefer">
//                           Reefer
//                         </Radio>
//                         <Radio colorScheme="green" value="Low Boy">
//                           Low Boy
//                         </Radio>
//                         <Radio colorScheme="green" value="Step Deck">
//                           Step Deck
//                         </Radio>
//                         <Radio colorScheme="green" value="Tank">
//                           Tank
//                         </Radio>
//                         <Radio colorScheme="green" value="Conestega">
//                           Conestega
//                         </Radio>
//                         <Radio colorScheme="green" value="Double Drop">
//                           Double Drop
//                         </Radio>
//                         <Radio colorScheme="green" value="Car Carriers">
//                           Car Carriers
//                         </Radio>
//                         <Radio colorScheme="green" value="Side kit">
//                           Side kit
//                         </Radio>
//                         <Radio colorScheme="green" value="Dump">
//                           Dump
//                         </Radio>
//                         <Radio colorScheme="green" value="Live Floor">
//                           Live Floor
//                         </Radio>
//                         <Radio colorScheme="green" value="End Dump">
//                           End Dump
//                         </Radio>
//                         <Radio colorScheme="green" value="Side Dump">
//                           Side Dump
//                         </Radio>
//                         <Radio colorScheme="green" value="OverLoad">
//                           OverLoad
//                         </Radio>
//                         <Radio colorScheme="green" value="Rocky Mountain">
//                           Rocky Mountain
//                         </Radio>
//                         <Radio colorScheme="green" value="Twinpike">
//                           Twinpike
//                         </Radio>
//                         <Radio colorScheme="green" value="LHV">
//                           LHV
//                         </Radio>
//                         <Radio colorScheme="green" value="Super V">
//                           Super V
//                         </Radio>
//                       </SimpleGrid>
//                     </RadioGroup>
//                   </Stack>

//                   <Stack>
//                     <Text fontFamily="Lora" fontWeight={"500"}>
//                       Type of Load
//                     </Text>
//                     <RadioGroup onChange={setTypeLoad} value={typeLoad}>
//                       <SimpleGrid columns={4} spacing={0}>
//                         <Radio colorScheme="green" value="LTL">
//                           LTL
//                         </Radio>
//                         <Radio colorScheme="green" value="Full Load">
//                           Full Load
//                         </Radio>
//                       </SimpleGrid>
//                     </RadioGroup>

//                     {typeLoad === "LTL" && (
//                       <Stack>
//                         <SimpleGrid columns={4} spacing={0}>
//                           <Text fontFamily="Lora" fontWeight={"500"}>
//                             Size of Load (Ft)
//                           </Text>

//                           <NumberInput
//                             size="lg"
//                             maxW={32}
//                             defaultValue={47}
//                             min={10}
//                             onChange={handleSizeLoadChange}
//                           >
//                             <NumberInputField />
//                             <NumberInputStepper>
//                               <NumberIncrementStepper />
//                               <NumberDecrementStepper />
//                             </NumberInputStepper>
//                           </NumberInput>
//                         </SimpleGrid>
//                       </Stack>
//                     )}
//                   </Stack>

//                   <Stack>
//                     <Text fontFamily="Lora" fontWeight={"500"}>
//                       Additional Information
//                     </Text>
//                     <Input
//                       type="text"
//                       value={additionalInformation}
//                       onChange={handleAdditionalInfoChange}
//                     />
//                   </Stack>

//                   <Stack>
//                     <Text fontFamily="Lora" fontWeight={"500"}>
//                       Additional Documents
//                     </Text>
//                     <SimpleGrid columns={2} spacing={4}>
//                       <Input
//                         type="file"
//                         onChange={handleFileChange}
//                         accept=".jpg, .jpeg, .pdf, .png, .gif"
//                         mb={4}
//                       />
//                       <GreenButton colorScheme="teal" size="md">
//                         Upload File
//                       </GreenButton>
//                     </SimpleGrid>
//                   </Stack>

//                   <HStack mt={4}>
//                     <GreenButton>Reset</GreenButton>
//                     <Spacer />
//                     <GreenButton type="submit">Post</GreenButton>
//                   </HStack>
//                 </Stack>
//               </form>
//             </Card>
//           </VStack>
//         </Flex>
//       </Flex>
//     </>
//   );
// }
