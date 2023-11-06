import LogoHeader from "./header/logoHeader";
import {
  Card,
  Input,
  Stack,
  Link,
  Center,
  HStack,
  Text,
  Spacer,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import GreenButton from "./buttons/greenButton";

function ShipperCompanyDetail() {
  return (
    <>
      <LogoHeader />
      <Center>
        <VStack>
          <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}>
            {" "}
            Company Details{" "}
          </Text>
          <Card
            mb={20}
            alignItems={"center"}
            maxWidth={500}
            justifyContent={"center"}
            p={10}
          >
            <Stack spacing={4}>
              <Input type="text" placeholder="Business Name" />
              <Text fontFamily="Lora" fontWeight={"100"}>
                {" "}
                Physical Address
              </Text>
              <Input type="text" placeholder="Street Address" />
              <Input type="text" placeholder="Apartment, Suite, etc." />
              <HStack>
                <Input type="text" placeholder="City" />
                <Input type="text" placeholder="Province" />
              </HStack>
              <HStack>
                <Input type="text" placeholder="Postal Code" />
                <Input type="text" placeholder="Country" />
              </HStack>

              
              <Stack spacing={5} direction="row">
              <Text fontFamily="Lora" fontWeight={"100"}>
                {" "}
                Same as mailing Address:
              </Text>
                <Checkbox colorScheme="green" defaultChecked>
                  Yes
                </Checkbox>
                <Checkbox colorScheme="green" defaultChecked>
                  No
                </Checkbox>
              </Stack>

              <Input type="text" placeholder="Company Phone Number" />
              <Input type="text" placeholder="Company Email Address" />
              <Input type="text" placeholder="Website" />

              <HStack>
                <GreenButton>Back</GreenButton>
                <Spacer />
                <GreenButton>Next</GreenButton>
              </HStack>
            </Stack>
          </Card>
        </VStack>
      </Center>
    </>
  );
}

export default ShipperCompanyDetail;
