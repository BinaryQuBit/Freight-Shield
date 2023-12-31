import React, { useState } from "react";
import {
  Flex,
  IconButton,
  Divider,
  useColorMode,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import { FiTruck, FiMenu, FiLogOut, FiSettings } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { FaHardHat, FaUserLock } from "react-icons/fa";
import NavItem from "./NavItem.js";
import Logo from "../logo/Logo.js";

export default function AdminSideBar({ activePage }) {
  const [navSize, changeNavSize] = useState("large");
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

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
          icon={MdOutlinePendingActions}
          title="Pending"
          active={activePage === "pending"}
        />
        <NavItem
          navSize={navSize}
          icon={GrCertificate}
          title="Approved"
          active={activePage === "approved"}
        />
        <NavItem
          navSize={navSize}
          icon={FaUserLock}
          title="Administrators"
          active={activePage === "administrators"}
        />
        <NavItem
          navSize={navSize}
          icon={FaHardHat}
          title="Shippers"
          active={activePage === "shippers"}
        />
        <NavItem
          navSize={navSize}
          icon={FiTruck}
          title="Carriers"
          active={activePage === "carriers"}
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
            active={activePage === "adminSettings"}
          />
          <NavItem navSize={navSize} icon={FiLogOut} title="Sign Out" />
        </Flex>
      </Flex>
    </Flex>
  );
}
