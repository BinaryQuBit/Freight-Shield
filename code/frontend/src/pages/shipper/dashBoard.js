import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import ShipperSideBar from "../../components/sidebar/shipperSideBar.js";
import UserHeader from "../../components/header/userHeader.js";
import Easeout from "../../components/responsiveness/easeOut.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function ShipperDashboard() {
  Protector("/api/shipperDashboard");

  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "trucking logistics canada ", 
            apiKey: "dc9526adc4224fe0ae31802884d27b12",
          },
        });
        setLatestNews(response.data.articles.slice(0, 3)); 
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchLatestNews();
  }, []);
  // Animation styles
  const slideInLeft = {
    animation: "slide-in-left 0.5s forwards",
  };

  const slideInRight = {
    animation: "slide-in-right 0.5s forwards",
  };

  return (
    <>
      <style>
        {`
            @keyframes slide-in-left {
              from {
                transform: translateX(-100%);
              }
              to {
                transform: translateX(0);
              }
            }
  
            @keyframes slide-in-right {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
          `}
      </style>

      <ShipperSideBar activePage="dashboard" />
      <Easeout>
        <UserHeader title="Dash Board" />
        <Grid templateColumns="1fr 1fr" gap={4} p={4}>
  {/* First Column - Messages */}
  <GridItem colSpan={1} style={slideInLeft}>
    <Grid templateRows="auto 1fr" gap={4}>
      {/* Messages */}
      <GridItem rowSpan={1} bg="gray.100" p={4}  boxShadow="md">
        <Text fontWeight="bold" mb={2}>
          Messages
          <Text> 1</Text>
          <Text> 2</Text>
          <Text> 3</Text>
        </Text>
      </GridItem>

      {/* Calendar */}
      <GridItem rowSpan={1} bg="gray.100" p={4} boxShadow="md">
        <Text fontWeight="bold" mb={2}>
          Calendar
        </Text>
        <Calendar />
      </GridItem>
    </Grid>
  </GridItem>

  {/* Second Column - News */}
  <GridItem colSpan={1} style={slideInRight}>
    {/* Announcement Row Card */}
    <Box bg="gray.100" p={10} boxShadow="md" minHeight="100%" display="flex" flexDirection="column">
      <Text fontWeight="bold" mb={2}>
        Latest News
      </Text>
      {/* Rendering latest news */}
      <Box flex="1" overflowY="auto">
        {latestNews.map((article, index) => (
          <Box
            key={index}
            background="#ADD8E6" 
            padding="1rem"
            marginBottom="1rem"
            borderRadius="0.5rem"
            display="flex" 
            alignItems="center" 
            transition="transform 0.3s ease-in-out" 
            _hover={{ transform: "scale(1.05)" }} 
          >
            <div style={{ maxWidth: "calc(100% - 70px)" }}> {/* Adjust width for content */}
        {/* Title */}
        <h3 style={{ marginBottom: "0.5rem" }}>{article.title}</h3>
    
        {/* Read More Link */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "none", fontWeight: "bold" }}
        >
          Read More
        </a>
      </div>

      {/* Image */}
      <img
        src={article.urlToImage}
        alt={article.title}
        style={{ width: "50px", height: "auto", marginLeft: "1rem" }} // Adjust image styles as needed
      />
          </Box>
        ))}
      </Box>
    </Box>
  </GridItem>
</Grid>


      </Easeout>
    </>
  );
}
