import React, { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Box,
  Image,
  Text,
  Button,
  Link,
  Heading,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import Logo from "../../components/logo/logo.svg";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./background-image.jpg";

export default function Homepage() {
  const navigate = useNavigate();
  const [showShipperCards, setShowShipperCards] = useState(false);
  const [showCarrierCards, setShowCarrierCards] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight * 0.6
      ) {
        setShowShipperCards(true);
        setShowCarrierCards(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container maxW="container.xl">
      {/* Top Bar */}
      <Flex
        justify="space-between"
        align="center"
        p="4"
        borderBottom="1px"
        borderColor="gray.200"
        flexDirection={{ base: "column", md: "row" }} 
      >
        <Image src={Logo} alt="Freight-Shield Logo" w="120px" h="auto" />
        <Flex mt={{ base: 4, md: 0 }}> 
          <Link mr={{ base: 4, md: 4 }}>Carriers</Link>
          <Link mr={{ base: 4, md: 4 }}>Products</Link>
          <Link mr={{ base: 4, md: 4 }}>About Us</Link>
        </Flex>
        <Box mt={{ base: 4, md: 0 }}> 
          <Button
            bg={"#0866FF"}
            _hover={{ bg: "#42B72A" }}
            color="white"
            size="sm"
            onClick={() => navigate("/login")}
            mr="2"
          >
            Log In
          </Button>
          <Button
            bg={"#0866FF"}
            _hover={{ bg: "#42B72A" }}
            color="white"
            size="sm"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </Box>
      </Flex>

      {/* Main Content */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        h={{ base: "50vh", md: "70vh" }} 
        w="full"
        bg="#0866FF"
        color="white"
        px="8"
        mb="8"
        bgImage={`url(${backgroundImage})`}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
      >
        <Heading
          as="h1"
          size="xl"
          mb="4"
          bgGradient="linear(to-r, #FFD700, #FFA500, #FF6347)"
          bgClip="text"
          textAlign="center"
        >
          Your Freight Management Solution
        </Heading>
        <Button colorScheme="whiteAlpha" size="lg">
          Get Started
        </Button>
      </Flex>

      {/* Shippers Section */}
      <Box
        bg="gray.200"
        py="12"
        style={{
          transition: "opacity 3s, transform 3s",
          opacity: showShipperCards ? 1 : 0,
          transform: `translateY(${showShipperCards ? 0 : -50}px)`,
        }}
        mb={{ base: 10, md: 10 }} 
        borderRadius="xl" 
      >
        <Container maxW="container.lg">
          <Center>
            <Heading
              as="h2"
              size="lg"
              mb="6"
              style={{
                transition: "transform 2s ease-in-out",
                transformOrigin: "left",
                transform: showShipperCards
                  ? "translateX(0)"
                  : "translateX(-100%)",
              }}
            >
              For Shippers
            </Heading>
          </Center>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
            <PromotionCard
              title="Wide Range of Options"
              description="Explore a vast selection of available trucks and carriers on our freight loadboard. With numerous options to choose from, you can find the perfect match for your shipping needs."
              gradientColors={["cyan.400", "blue.500"]}
            />
            <PromotionCard
              title="Real-time Updates"
              description="Stay informed with real-time updates on your shipments. Our freight loadboard provides live tracking and notifications, allowing you to monitor your cargo's progress every step of the way."
              gradientColors={["cyan.400", "blue.500"]}
            />
            <PromotionCard
              title="Competitive Rates"
              description="Save on shipping costs with competitive rates offered by our freight loadboard. Compare prices from different carriers and secure the best deal for your freight shipments."
              gradientColors={["cyan.400", "blue.500"]}
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Carriers Section */}
      <Box
        bg="gray.200"
        py="12"
        style={{
          transition: "opacity 3s, transform 3s",
          opacity: showCarrierCards ? 1 : 0,
          transform: `translateY(${showCarrierCards ? 0 : 50}px)`,
        }}
        borderRadius="xl"
      >
        <Container maxW="container.lg">
          <Center>
            <Heading
              as="h2"
              size="lg"
              mb="6"
              style={{
                transition: "transform 1s ease-in-out",
                transformOrigin: "right",
                transform: showShipperCards
                  ? "translateX(0)"
                  : "translateX(100%)",
              }}
            >
              For Carriers
            </Heading>
          </Center>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
            <PromotionCard
              title="Increased Business Opportunities"
              description="Expand your business with our freight loadboard. Access a wide range of shipping opportunities and connect with shippers looking for reliable carriers like you."
              gradientColors={["#4CAF50", "#8BC34A"]}
            />
            <PromotionCard
              title="Efficient Route Planning"
              description="Optimize your routes and maximize efficiency with our advanced route planning tools. Find the most efficient paths for your deliveries and minimize travel time and fuel costs."
              gradientColors={["#4CAF50", "#8BC34A"]}
            />
            <PromotionCard
              title="Prompt Payments"
              description="Get paid faster with our streamlined payment process. Receive prompt payments for your services, ensuring financial stability and peace of mind for your business."
              gradientColors={["#4CAF50", "#8BC34A"]}
            />
          </SimpleGrid>
        </Container>
      </Box>
    </Container>
  );
}

function PromotionCard({ title, description, gradientColors }) {
  return (
    <Box
      bgGradient={`linear(to-r, ${gradientColors[0]}, ${gradientColors[1]})`}
      p="6"
      boxShadow="lg"
      borderRadius="xl"
      transition="transform 0.3s ease-in-out"
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <Heading as="h3" size="md" mb="4" color="white">
        {title}
      </Heading>
      <Text fontSize="md" color="white">
        {description}
      </Text>
    </Box>
  );
}
