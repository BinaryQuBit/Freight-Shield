import LogoHeader from "./header/logoHeader";
import { Card, Input, Stack, Link, Center, HStack, Text, Spacer, VStack } from "@chakra-ui/react";
import GreenButton from "./buttons/greenButton";


function ShipperBusinessDetail(){
    return(
        <>
        <LogoHeader/>
        <Center>
        <VStack>
        <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}> Business Details </Text>
        <Card mb={20} alignItems={"center"} maxWidth={500} justifyContent={"center"} p={10}>
      <Stack spacing={4}>
        <Input type="text" placeholder="Business Number (BN)" />
        <Input type="document" placeholder="Proof of Busines" />
        <Input type="document" placeholder="Proof of Insurance" />

        <Text fontFamily="Lora" fontWeight={"100"} mt={10}> Contact Information</Text>
        <Input type="text" placeholder="Primary Contact Name" />
        <Input type="text" placeholder="Primary Contact Email Address" />
        <Input type="text" placeholder="Primary Contact Phone Number" />
       
        
        <HStack>
        <GreenButton >Back</GreenButton>
        <Spacer/>
        <GreenButton>Next</GreenButton>
        </HStack>
         
        
      </Stack>
    </Card>
    </VStack>
    </Center>
        </>
    )
}

export default ShipperBusinessDetail;

