// React Imports
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Icons Import
import { MdEventAvailable } from "react-icons/md";
import { MdEventBusy } from "react-icons/md";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import {
  Box,
  Text,
  Grid,
  GridItem,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useColorMode,
  Textarea,
} from "@chakra-ui/react";

// Custom Imports
import CarrierSideBar from "../../components/sidebar/carrierSideBar.js";
import UserHeader from "../../components/header/userHeader.js";
import Easeout from "../../components/responsiveness/easeOut.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";
import CustomButton from "../../components/buttons/customButton.js";
import CustomInput from "../../components/utils/forms/customInput.js";

// Start of the Build
export default function ShipperDashboard() {
  Protector("/api/carrierdashboard");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { data: userInfo } = useData();

  // Hooks
  const [latestNews, setLatestNews] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [events, setEvents] = useState([]);

  // Fetching News
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get("/news");
        setLatestNews(response.data.articles.slice(0, 3));
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchLatestNews();
  }, []);

  // Fetching Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (userInfo && userInfo.events) {
          setEvents(userInfo.events);
        }
      } catch (error) {
        console.error("Error fetching Events:", error);
      }
    };

    fetchEvents();
  }, [userInfo]);

  const tileContent = ({ date, view }) => {
    const isEvent = events.some(
      (event) =>
        new Date(event.date).getDate() === date.getDate() &&
        new Date(event.date).getMonth() === date.getMonth() &&
        new Date(event.date).getFullYear() === date.getFullYear()
    );
    return view === "month" && isEvent ? (
      <div
        style={{
          height: "4px",
          width: "4px",
          borderRadius: "50%",
          background: "red",
          margin: "auto",
        }}
      ></div>
    ) : null;
  };

  const handleDayClick = (value) => {
    setSelectedDate(value);
  };

  const addEvent = async () => {
    const newEvent = {
      date: selectedDate,
      title: newEventTitle,
      description: newEventDescription,
    };

    try {
      const response = await axios.post("/api/carrierevents", newEvent);
      setEvents([...events, response.data]);
      setNewEventTitle("");
      setNewEventDescription("");
      window.location.reload();
    } catch (error) {
      console.error("There was an error adding the event:", error);
    }
  };

  return (
    <>
      <style>
        {`
            .react-calendar {
              background-color: ${colorMode === "dark" ? "#2D3748" : "white"};
              color: ${colorMode === "dark" ? "#0866FF" : "black"};
              width: 90%;
              max-width: 500px;
              margin: auto;
            }

            .react-calendar__tile--active, .react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus {
              background-color: ${colorMode === "dark" ? "#4A5568" : "#007bff"};
              color: ${colorMode === "dark" ? "white" : "white"};
            }
        `}
      </style>

      <CarrierSideBar activePage="dashboard" />
      <Easeout>
        <UserHeader title="Dash Board" userInfo={userInfo} />
        <Grid
          templateColumns={{ base: "1fr", md: "1fr", lg: "1fr 1fr" }}
          gap={4}
          p={{ base: 2, md: 4 }}
        >
          <GridItem
            colSpan={{ base: 1, md: 1 }}
            bg={colorMode === "dark" ? "gray.700" : "gray.100"}
            boxShadow="md"
            p={4}
            minH="400px"
          >
            <Text
              fontWeight="bold"
              textAlign="center"
              mb={4}
              color={colorMode === "dark" ? "white" : "black"}
            >
              Calendar
            </Text>
            <Flex justify="center" align="center" direction="column">
              <CustomButton
                children={"Add Event"}
                onClick={onOpen}
                backgroundColor="#0866FF"
                variant="blueForwardButton"
                w="120px"
                icon={<MdEventAvailable />}
                mb={5}
              />

              <Calendar
                onChange={handleDayClick}
                value={selectedDate}
                tileContent={tileContent}
              />
              {selectedDate && (
                <Box mt="4" width={{ base: "90%", md: "90%" }}>
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    color={"blueviolet"}
                  >
                    {selectedDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                  {events
                    .filter(
                      (event) =>
                        new Date(event.date).getDate() ===
                          selectedDate.getDate() &&
                        new Date(event.date).getMonth() ===
                          selectedDate.getMonth() &&
                        new Date(event.date).getFullYear() ===
                          selectedDate.getFullYear()
                    )
                    .map((event, index) => (
                      <Box key={index} textAlign="center" mb={4}>
                        <Text fontWeight="bold">{event.title}</Text>
                        <Text>{event.description}</Text>
                      </Box>
                    ))}
                </Box>
              )}
            </Flex>
          </GridItem>

          <GridItem
            colSpan={{ base: 1, md: 1 }}
            bg={colorMode === "dark" ? "gray.700" : "gray.100"}
            boxShadow="md"
            p={4}
            minH="400px"
          >
            <Text
              fontWeight="bold"
              mb={4}
              color={colorMode === "dark" ? "white" : "black"}
              textAlign="center"
            >
              Latest News
            </Text>
            <Box overflowY="auto">
              {latestNews.map((article, index) => (
                <Flex
                  key={index}
                  background={colorMode === "dark" ? "grey" : "#ADD8E6"}
                  m="10px"
                  p="15px"
                  align="center"
                  transition="transform 0.3s ease-in-out"
                  _hover={{ transform: "scale(1.01)", m: "5px" }}
                >
                  <Box flex="1">
                    <Text fontSize="lg" fontWeight="bold" mb="0.5rem">
                      {article.title}
                    </Text>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "blue",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Read More
                    </a>
                  </Box>
                  {article.urlToImage && (
                    <Image
                      src={article.urlToImage}
                      alt={article.title}
                      boxSize="50px"
                      objectFit="cover"
                    />
                  )}
                </Flex>
              ))}
            </Box>
          </GridItem>
        </Grid>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"}>Add New Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <CustomInput
                id={"newEventTitle"}
                label={"Event Title"}
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                mt={8}
              />
              <CustomInput
                id={"newEventDescription"}
                label={"Event Description"}
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                mt={8}
                customComponent={Textarea}
              />
            </ModalBody>
            <ModalFooter justifyContent={"space-between"}>
              <CustomButton
                backgroundColor="#0866FF"
                icon={<MdEventBusy />}
                w="100px"
                type="submit"
                children="Cancel"
                variant="blueBackwardButton"
                onClick={onClose}
              />
              <CustomButton
                icon={<MdEventAvailable />}
                w="120px"
                onClick={addEvent}
                children="Add Event"
                variant="blueForwardButton"
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Easeout>
    </>
  );
}
