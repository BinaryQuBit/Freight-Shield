import React, { useEffect, useState } from "react";
import { SidebarContext } from "../responsiveness/context.js";
import {
  Flex,
  IconButton,
  Divider,
  useColorMode,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiSettings,
  FiTruck,
  FiBook,
  FiLogOut,
  FiHome,
} from "react-icons/fi";
import { GrInProgress } from "react-icons/gr";
import NavItem from "./navItem.js";
import Logo from "../logo/logo.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

export default function ShipperSideBar({ activePage }) {
  const { navSize, setNavSize } = useContext(SidebarContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();
  const { setColorMode } = useColorMode();
  const logout = () => {
    axios
      .get("/logout", { withCredentials: true })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const [menuOpen, setMenuOpen] = useState(false);

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

          <NavItem
            navSize={navSize}
            icon={FiHome}
            title="Dashboard"
            active={activePage === "dashboard"}
            onClick={() => navigate("/shipperDashboard")}
            menuOpen={menuOpen}
          />
          <NavItem
            navSize={navSize}
            icon={GrInProgress}
            title="Active Loads"
            active={activePage === "activeLoads"}
            onClick={() => navigate("/activeloads")}
            menuOpen={menuOpen}
          />
          <NavItem
            navSize={navSize}
            icon={FiTruck}
            title="Post a Load"
            active={activePage === "postLoad"}
            onClick={() => navigate("/postload")}
            menuOpen={menuOpen}
          />
          <NavItem
            navSize={navSize}
            icon={FiBook}
            title="History"
            active={activePage === "history"}
            onClick={() => navigate("/history")}
            menuOpen={menuOpen}
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
              active={activePage === "shipperSettings"}
              onClick={() => navigate("/shipperSettings")}
              menuOpen={menuOpen} 
            />
            <NavItem
              navSize={navSize}
              icon={FiLogOut}
              title="Sign Out"
              onClick={() => logout(navigate, setColorMode)}
              menuOpen={menuOpen}
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
} 
