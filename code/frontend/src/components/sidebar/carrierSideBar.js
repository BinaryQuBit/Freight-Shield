// React Imports
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Chakra UI Imports
import {
  Flex,
  IconButton,
  Divider,
  useColorMode,
  Switch,
  FormLabel,
  Text,
} from "@chakra-ui/react";

// Icon Imports
import { FiMenu, FiLogOut, FiSettings, FiHome } from "react-icons/fi";
import {
  FaPlaceOfWorship,
  FaTrailer,
  FaUserPlus,
  FaTruck,
} from "react-icons/fa";

// Custom Imports
import NavItem from "./navItem.js";
import Logo from "../logo/logo.js";
import logout from "../methods/logout.js";
import { SidebarContext } from "../responsiveness/context.js";

// Start of the Build
export default function CarrierSideBar({ activePage, Status }) {
  const { navSize, setNavSize } = useContext(SidebarContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();

  // Hook
  const [menuOpen, setMenuOpen] = useState(false);

  // Resize Listen
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setNavSize("small");
      } else {
        setNavSize("large");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setNavSize]);

  // Toggle menu for base screens
  const toggleMenu = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(!menuOpen);
    } else {
      setNavSize(navSize === "small" ? "large" : "small");
    }
  };

  return (
    <div style={{ width: navSize === "small" ? "50px" : "200px" }}>
      <Flex
        pos="fixed"
        top="0"
        zIndex="10"
        h="100vh"
        overflowY="auto"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        flexDir="column"
        justifyContent="flex-start"
        background={isDark ? "#343541" : "#E4E9F7"}
        w={menuOpen ? "100%" : navSize === "small" ? "50px" : "200px"}
        transition="width 0.3s ease-in-out"
      >
        <Flex flexDir="column" as="nav" align="center" p="5%" flexGrow={1}>
          <Flex
            align="center"
            justify="center"
            h={menuOpen ? "50%" : "30%"}
            w={"100%"}
          >
            <Logo color={isDark ? "white" : "#0866FF"} />
          </Flex>
          <IconButton
            aria-label="Open Menu"
            size="md"
            variant="ghost"
            icon={<FiMenu />}
            onClick={
              navSize === "small"
                ? toggleMenu
                : () => setNavSize(navSize === "small" ? "large" : "small")
            }
            sx={{
              "&:hover": {
                color: "white",
                background: "#0866FF",
              },
            }}
          />
          {Status === "Active" ? (
            <>
              <NavItem
                navSize={navSize}
                icon={FiHome}
                title="Dashboard"
                active={activePage === "dashboard"}
                onClick={() => navigate("/carrierDashboard")}
                menuOpen={menuOpen}
              />
              <NavItem
                navSize={navSize}
                icon={FaPlaceOfWorship}
                title="Marketplace"
                active={activePage === "marketplace"}
                onClick={() => navigate("/marketplace")}
                menuOpen={menuOpen}
              />
              <NavItem
                navSize={navSize}
                icon={FaTrailer}
                title="My Loads"
                active={activePage === "myLoads"}
                onClick={() => navigate("/myloads")}
                menuOpen={menuOpen}
              />
              <NavItem
                navSize={navSize}
                icon={FaUserPlus}
                title="Driver Profiles"
                active={activePage === "driverProfile"}
                onClick={() => navigate("/driverprofiles")}
                menuOpen={menuOpen}
              />
              <NavItem
                navSize={navSize}
                icon={FaTruck}
                title="Unit Profiles"
                active={activePage === "unitProfile"}
                onClick={() => navigate("/unitprofiles")}
                menuOpen={menuOpen}
              />
            </>
          ) : (
            <Text m={20}></Text>
          )}
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
            {(navSize === "large" || menuOpen) && (
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
              menuOpen={menuOpen}
            />
            <NavItem
              navSize={navSize}
              icon={FiLogOut}
              title="Sign Out"
              onClick={logout}
              menuOpen={menuOpen}
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
