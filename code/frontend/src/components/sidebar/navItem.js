import React from "react";
import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";

export default function NavItem({ icon, title, active, navSize, onClick, menuOpen }) {
  return (
    <Flex
      mt={1}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active && "#0866FF"}
          onClick={onClick}
          color={active && "white"}
          p={3}
          borderRadius={8}
          _hover={{
            textDecor: "none",
            backgroundColor: "#0866FF",
            color: "white",
          }}
          w={navSize === "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                _hover={{ color: active && "white" }}
              />
              <Text ml={5} display={(navSize === "small" && menuOpen) || navSize === "large" ? "flex" : "none"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
