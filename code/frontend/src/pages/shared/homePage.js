import React, { useState } from "react";
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
  HStack,
  VStack,
} from "@chakra-ui/react";
import Logo from "../../components/logo/logo.svg";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./background-image.jpg";
import shipperImage from "./shipper.jpg";
import carrierImage from "./carrier.jpg";
import About from "./about.jpg"

export default function Homepage() {
  const navigate = useNavigate();
  const [showHomeCards, setShowHomeCards] = useState(true);
  const [showShipperCards, setShowShipperCards] = useState(false);
  const [showCarrierCards, setShowCarrierCards] = useState(false);
  const [showAboutCards, setShowAboutCards] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(backgroundImage);
  const [activeTab, setActiveTab] = useState("Home");

  const handleTabClick = (tabName, image) => {
    setActiveTab(tabName);
    setShowHomeCards(tabName === "Home");
    setShowShipperCards(tabName === "Shippers");
    setShowCarrierCards(tabName === "Carriers");
    setShowAboutCards(tabName === "About Us");
    setBackgroundImg(image);
  };

  return (
    <>
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
            <Link
              mr={{ base: 4, md: 4 }}
              color={activeTab === "Home" ? "blue.500" : "black"}
              onClick={() => handleTabClick("Home", backgroundImage)}
            >
              Home
            </Link>
            <Link
              mr={{ base: 4, md: 4 }}
              color={activeTab === "Shippers" ? "blue.500" : "black"}
              onClick={() => handleTabClick("Shippers", shipperImage)}
            >
              Shippers
            </Link>
            <Link
              mr={{ base: 4, md: 4 }}
              color={activeTab === "Carriers" ? "blue.500" : "black"}
              onClick={() => handleTabClick("Carriers", carrierImage)}
            >
              Carriers
            </Link>
            <Link
              mr={{ base: 4, md: 4 }}
              color={activeTab === "About Us" ? "blue.500" : "black"}
              onClick={() => handleTabClick("About Us", About)}
            >
              About Us
            </Link>
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
        <HStack>
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
            bgImage={`url(${backgroundImg})`}
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
          </Flex>

          {/* Home Section */}
          {showHomeCards && (
            <Box
              bg="gray.200"
              py="12"
              mb={{ base: 10, md: 10 }}
              borderRadius="xl"
              mt="10"
              ml="5"
            >
              <Container maxW="container.lg">
                <Center>
                  <Heading as="h2" size="lg" mb="6">
                    Home
                  </Heading>
                </Center>
                <VStack
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing="6"
                  alignItems="stretch"
                >
                  <PromotionCard
  title="Shippers"
  description="Find the perfect transportation solution for your goods. Explore a wide range of shipping options tailored to meet your specific needs and preferences."
  gradientColors={["#7F7FD5", "#86A8E7", "#91EAE4"]}
/>
<PromotionCard
  title="Carriers"
  description="Join our network of reliable carriers and expand your business opportunities. Access a diverse range of shipping jobs."
  gradientColors={["#7F7FD5", "#86A8E7", "#91EAE4"]}
/>
<PromotionCard
  title="Drivers"
  description="Become a part of our dedicated team of drivers and help deliver goods safely and efficiently. Enjoy flexible working hours and competitive compensation."
  gradientColors={["#7F7FD5", "#86A8E7", "#91EAE4"]}
/>

                </VStack>
              </Container>
            </Box>
          )}

          {/* Shippers Section */}
          {showShipperCards && (
            <Box
              bg="gray.200"
              py="12"
              mb={{ base: 10, md: 10 }}
              borderRadius="xl"
              mt="10"
              ml="5"
            >
              <Container maxW="container.lg">
                <Center>
                  <Heading as="h2" size="lg" mb="6">
                    For Shippers
                  </Heading>
                </Center>
                <VStack
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing="6"
                  alignItems="stretch"
                >
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
                    title="Cost Estimates"
                    description="Our platform suggests optimal rates based on factors such as distance and cargo type, providing valuable guidance to help you make informed shipping decisions."
                    gradientColors={["cyan.400", "blue.500"]}
                  />
                </VStack>
              </Container>
            </Box>
          )}

          {/* Carriers Section */}
          {showCarrierCards && (
            <Box
              bg="gray.200"
              py="12"
              mb={{ base: 10, md: 10 }}
              borderRadius="xl"
              mt="10"
              ml="5"
            >
              <Container maxW="container.lg">
                <Center>
                  <Heading as="h2" size="lg" mb="6">
                    For Carriers
                  </Heading>
                </Center>
                <VStack
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing="6"
                  alignItems="stretch"
                >
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
                    title="Instant Booking and Confirmation"
                    description="Our platform offers a seamless booking experience for carriers, enabling them to swiftly book shipments with just a few clicks and receive instant confirmation."
                    gradientColors={["#4CAF50", "#8BC34A"]}
                  />
                </VStack>
              </Container>
            </Box>
          )}

          {/* About Section */}
          {showAboutCards && (
            <Box
              bg="gray.200"
              py="12"
              mb={{ base: 10, md: 10 }}
              borderRadius="xl"
              mt="10"
              ml="5"
            >
              <Container maxW="container.lg">
                <Center>
                  <Heading as="h2" size="lg" mb="6">
                    About Us
                  </Heading>
                </Center>
                <VStack
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing="6"
                  alignItems="stretch"
                >
                  <PromotionCard
                    title="Our Mission"
                    description="To revolutionize the freight industry by providing excellent and innovative solutions that prioritize safety, efficiency, and sustainability."
                    gradientColors={["#38B2AC", "#319795"]}
                  />
                  <PromotionCard
                    title="Our Values"
                    description="Transparency, reliability, and customer satisfaction are at the core of everything we do. We believe in fostering strong partnerships and delivering exceptional service."
                    gradientColors={["#38B2AC", "#319795"]}
                  />
                  <PromotionCard
                    title="For inquiries."
                    description={
                      <>
                        Email: freightshield@gmail.com <br />
                        Customer Service: 1-888-123-4567 <br /><br />
                          
                      </>
                    }
                    gradientColors={["#38B2AC", "#319795"]}
                  />
                </VStack>
              </Container>
            </Box>
          )}
        </HStack>
      </Container>
      <Box
        bg="black"
        color="white"
        py="4"
        px="6"
        mt="8"
        width="100%"
        left="0"
        right="0"
        m="1"
      >
        <Text textAlign="center">
          © 2024 Freight-Shield. All rights reserved.
        </Text>
      </Box>
    </>
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
