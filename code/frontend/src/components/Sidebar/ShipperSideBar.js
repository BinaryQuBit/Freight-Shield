import React, { useState } from 'react';
import {
  Flex,
  IconButton,
  Divider,
  useColorMode,
  Switch,
  FormLabel,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiSettings,
  FiTruck,
  FiCompass,
  FiBook,
  FiLogOut,
  FiHome,
} from 'react-icons/fi';
import NavItem from './ShipperNavItem';
import Logo from '../Logo';

export default function ShipperSideBar({activePage}) {
  const [navSize, changeNavSize] = useState("large");
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex
      pos="sticky"
      h="100%"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={navSize === "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="flex-start"
      background={isDark ? "#343541" : "#E4E9F7"}
    >
      <Flex
        align="center"
        justify="center"
        p="5%"
        h="20%"
      >
        <Logo color={isDark ? 'white' : '#0866FF'} />
      </Flex>
      <Flex
        flexDir="column"
        as="nav"
        align="center"
        p="5%"
        flexGrow={1}
      >
        <IconButton
          aria-label="Open Menu"
          size="lg"
          variant="ghost"
          icon={<FiMenu />}
          onClick={() => changeNavSize(navSize === "small" ? "large" : "small")}
          sx={{
            '&:hover': {
              color: 'white', background: '#0866FF'
            },
          }}
        />
        <NavItem navSize={navSize} icon={FiHome} title="My Loads" active={activePage === "myLoads"} />
        <NavItem navSize={navSize} icon={FiTruck} title="Post a Load" active={activePage === "postLoad"} />
        <NavItem navSize={navSize} icon={FiCompass} title="Track a Load" active={activePage === "trackLoad"}/>
        <NavItem navSize={navSize} icon={FiBook} title="History" active={activePage === "history"}/>
        <NavItem navSize={navSize} icon={FiSettings} title="Settings" active={activePage === "settings"}/>
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
      >
        <Divider />
        <Flex align="center" justify="space-between" margin={"3"}>
          <Switch id="dark-mode-switch" isChecked={isDark} onChange={toggleColorMode} />
          {navSize === "large" && (
            <FormLabel htmlFor="dark-mode-switch" mb="0">
              {isDark ? "Dark Mode" : "Light Mode"}
            </FormLabel>
          )}
        </Flex>
        <Flex p="5%">
          <NavItem navSize={navSize} icon={FiLogOut} title="Sign Out" />
        </Flex>
      </Flex>
    </Flex>
  );
}