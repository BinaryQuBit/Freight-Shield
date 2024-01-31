import React, { useContext } from "react";
import { Flex, Text } from '@chakra-ui/react';
import { SidebarContext } from "../../components/responsiveness/Context.js";

const EaseOut = ({ children }) => {
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
  )
}

export default EaseOut;


