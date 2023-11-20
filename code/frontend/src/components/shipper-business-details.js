import LogoHeader from "./header/logoHeader";
import { Card, Input, Stack, Center, HStack, Text, Spacer, VStack } from "@chakra-ui/react";
import GreenButton from "./buttons/greenButton";
import BlueButton from "./buttons/blueButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ShipperBusinessDetail(){

  const [businessNumber, setBusinessNumber] = useState();
  const [proofOfBusiness, setProofOfBusiness] = useState();
  const [proofOfInsurance, setProofOfInsurance] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    

    axios
      .post("http://localhost:8080/shipperBusinessDetail", {
        businessNumber,
        proofOfBusiness,
        proofOfInsurance,
        name,
        email,
        phoneNumber,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("Business already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          alert("Registered Part 1");
          navigate("/shipperCompanyDetail");
        }
      })
      .catch((err) => console.log(err));
  };

    return(
        <>
        <LogoHeader/>
        <Center>
        <VStack>
        <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}> Business Details </Text>
        <Card mb={20} alignItems={"center"} maxWidth={500} justifyContent={"center"} p={10}>
        <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Input type="text" placeholder="Business Number (BN)" onChange={(event) => setBusinessNumber(event.target.value)} />
        <Input type="document" placeholder="Proof of Busines" onChange={(event) => setProofOfBusiness(event.target.value)}/>
        <Input type="document" placeholder="Proof of Insurance" onChange={(event) => setProofOfInsurance(event.target.value)}/>

        <Text fontFamily="Lora" fontWeight={"100"} mt={10}> Contact Information</Text>
        <Input type="text" placeholder="Primary Contact Name" onChange={(event) => setName(event.target.value)}/>
        <Input type="text" placeholder="Primary Contact Email Address" onChange={(event) => setEmail(event.target.value)}/>
        <Input type="text" placeholder="Primary Contact Phone Number" onChange={(event) => setPhoneNumber(event.target.value)}/>
        <Input type="password" placeholder="Passward" onChange={(event) => setPassword(event.target.value)}/>
       
        
        <HStack>
        <GreenButton >Back</GreenButton>
        <Spacer/>
        <BlueButton type="submit">Next</BlueButton>
        </HStack>
         
        
      </Stack>
      </form>
    </Card>
    </VStack>
   
    </Center>
        </>
    )
}

export default ShipperBusinessDetail;

