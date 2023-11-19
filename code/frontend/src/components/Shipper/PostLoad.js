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
} from "@chakra-ui/react";
import GreenButton from "../buttons/greenButton";

export default function PostLoad() {
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
                    
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                  />
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="time"
                  />
                </HStack>

                <Stack>
                  <Text fontFamily="Lora" fontWeight={"500"}>
                    Drop Off Location
                  </Text>
                  <Input type="text" />
                </Stack>

                <Text fontFamily="Lora" fontWeight={"100"} mt={4}>
                  {" "}
                  Contact Information
                </Text>

                <Stack>
                  <Text fontFamily="Lora" fontWeight={"500"}>
                    Primary Contact Name
                  </Text>
                  <Input type="text" placeholder="Enter Primary Contact Name" />
                </Stack>

                <Stack>
                  <Text fontFamily="Lora" fontWeight={"500"}>
                    Primary Contact Email Address
                  </Text>
                  <Input
                    type="text"
                    placeholder="Enter Primary Contact Email Address"
                  />
                </Stack>

                <Stack>
                  <Text fontFamily="Lora" fontWeight={"500"}>
                    Primary Contact Phone Number
                  </Text>
                  <Input
                    type="text"
                    placeholder="Enter Primary Contact Phone Number"
                  />
                </Stack>

                <HStack mt={4}>
                  <GreenButton>Reset</GreenButton>
                  <Spacer />
                  <GreenButton>Book</GreenButton>
                </HStack>
              </Stack>
            </Card>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}
