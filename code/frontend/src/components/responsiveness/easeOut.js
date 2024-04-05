// React Imports
import React, { useContext } from "react";

// Chakra UI Imports
import { Flex } from "@chakra-ui/react";

// Custom Import
import { SidebarContext } from "./context.js";

// Start of the Build
export default function EaseOut({ children }) {
  const { navSize } = useContext(SidebarContext);

  return (
    <Flex
      ml={navSize === "small" ? "50px" : "200px"}
      transition="margin 0.3s ease-in-out"
      justifyContent="center"
      direction={"column"}
    >
      {children}
    </Flex>
  );
}
