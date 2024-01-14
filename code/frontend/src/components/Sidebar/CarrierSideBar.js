import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//!!!!
import axios from "axios";


import {
  Flex,
  IconButton,
  Divider,
  useColorMode,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import { FiMenu, FiLogOut, FiSettings, FiHome } from "react-icons/fi";
import {
  FaPlaceOfWorship,
  FaTrailer,
  FaUserPlus,
  FaTruck,
} from "react-icons/fa";
import NavItem from "./NavItem";
import Logo from "../logo/Logo.js";

export default function CarrierSideBar({ activePage }) {
  const [navSize, changeNavSize] = useState("large");
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();


  // !!!
  const logout = () => {
    axios.get('http://localhost:8080/api/users/logout', { withCredentials: true })
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <Flex
      paddingTop={10}
      pos="fixed"
      top="0"
      zIndex="10"
      pt={10}
      h="100vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={navSize === "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="flex-start"
      background={isDark ? "#343541" : "#E4E9F7"}
    >
      <Flex align="center" justify="center" p="5%" h="20%">
        <Logo color={isDark ? "white" : "#0866FF"} />
      </Flex>
      <Flex flexDir="column" as="nav" align="center" p="5%" flexGrow={1}>
        <IconButton
          aria-label="Open Menu"
          size="lg"
          variant="ghost"
          icon={<FiMenu />}
          onClick={() => changeNavSize(navSize === "small" ? "large" : "small")}
          sx={{
            "&:hover": {
              color: "white",
              background: "#0866FF",
            },
          }}
        />

        <NavItem
          navSize={navSize}
          icon={FiHome}
          title="Logged in as Carrier"
        />  

        <NavItem
          navSize={navSize}
          icon={FaPlaceOfWorship}
          title="Marketplace"
          active={activePage === "marketplace"}
          onClick={() => navigate("/marketplace")}
        />
        <NavItem
          navSize={navSize}
          icon={FaTrailer}
          title="My Loads"
          active={activePage === "myLoads"}
          onClick={() => navigate("/myloads")}
        />
        <NavItem
          navSize={navSize}
          icon={FaUserPlus}
          title="Driver Profile"
          active={activePage === "driverProfile"}
          onClick={() => navigate("/driverprofile")}
        />
        <NavItem
          navSize={navSize}
          icon={FaTruck}
          title="Unit Profile"
          active={activePage === "unitProfile"}
          onClick={() => navigate("/unitprofile")}
        />
      </Flex>
      <Flex p="5%" flexDir="column" w="100%">
        <Divider />
        <Flex
          align="center"
          justify={navSize === "small" ? "center" : "flex-start"}
          my={3}
          ml={navSize === "small" ? "0" : "1"}
        >
          <Switch
            id="dark-mode-switch"
            isChecked={isDark}
            onChange={toggleColorMode}
            size="md"
          />
          {navSize === "large" && (
            <FormLabel htmlFor="dark-mode-switch" mb="0" ml={3}>
              {isDark ? "Dark Mode" : "Light Mode"}
            </FormLabel>
          )}
        </Flex>
        <Flex
          flexDir="column"
          align={navSize === "small" ? "center" : "flex-start"}
        >
          <NavItem
            navSize={navSize}
            icon={FiSettings}
            title="Settings"
            active={activePage === "carrierSettings"}
            onClick={() => navigate("/carriersettings")}
          />
          
          <NavItem navSize={navSize} icon={FiLogOut} title="Sign Out" onClick={logout}  />
        </Flex>
      </Flex>
    </Flex>
  );
}
