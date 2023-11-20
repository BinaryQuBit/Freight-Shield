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
import BlueButton from "./buttons/blueButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function ShipperCompanyDetail() {

  const [businessName, setBusinessName] = useState();
  const [streetNumber, setStreetNumber] = useState();
  const [apartment, setApartment] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const [province, setProvince] = useState();
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState();
  const [companyEmail, setCompanyEmail] = useState();
  const [website, setwebsite] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    

    axios
      .post("http://localhost:8080/shipperCompanyDetail", {
        businessName,
    streetNumber,
    apartment,
    postalCode,
    country,
    province,
    companyPhoneNumber,
    companyEmail,
    website,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("Business already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          alert("Registered Part 2");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

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
             <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Input type="text" placeholder="Business Name" onChange={(event) => setBusinessName(event.target.value)}/>
              <Text fontFamily="Lora" fontWeight={"100"}>
                {" "}
                Physical Address
              </Text>
              <Input type="text" placeholder="Street Address" onChange={(event) => setStreetNumber(event.target.value)}/>
              <Input type="text" placeholder="Apartment, Suite, etc." onChange={(event) => setApartment(event.target.value)}/>
              <HStack>
                <Input type="text" placeholder="City" onChange={(event) => setCity(event.target.value)}/>
                <Input type="text" placeholder="Province" onChange={(event) => setProvince(event.target.value)}/>
              </HStack>
              <HStack>
                <Input type="text" placeholder="Postal Code" onChange={(event) => setPostalCode(event.target.value)}/>
                <Input type="text" placeholder="Country" onChange={(event) => setCountry(event.target.value)}/>
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

              <Input type="text" placeholder="Company Phone Number" onChange={(event) => setCompanyPhoneNumber(event.target.value)}/>
              <Input type="text" placeholder="Company Email Address" onChange={(event) => setCompanyEmail(event.target.value)}/>
              <Input type="text" placeholder="Website" onChange={(event) => setwebsite(event.target.value)}/>

              <HStack>
                <GreenButton>Back</GreenButton>
                <Spacer />
                <BlueButton type="submit">Next</BlueButton>
              </HStack>
            </Stack>
            </form>
          </Card>
        </VStack>
      </Center>
    </>
  );
}

export default ShipperCompanyDetail;
