import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  Card,
} from "@chakra-ui/react";
function ShipperCompanyDetailsForm() {
  return (
    <Box>
      <Card p="20px" maxWidth={{ base: "auto", md: "400px" }} mx="auto">
        <FormControl id="businessName" isRequired>
          <Input type="text" name="businessName" placeholder="Business Name" />
        </FormControl>
        <Text as={"b"} mt="3" fontSize={"12"}>Physical Address</Text>
        <FormControl id="streetAddress" isRequired>
          <Input type="text" name="streetAddress" placeholder="Street Address" />
        </FormControl>
      </Card>
    </Box>
  );
}

export default ShipperCompanyDetailsForm;
