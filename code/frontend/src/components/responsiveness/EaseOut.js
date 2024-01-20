import React, { useContext } from "react";
import { Flex, Text } from '@chakra-ui/react';
import { SidebarContext } from "../../components/responsiveness/Context.js";

export const EaseOut = ({ children }) => {
  const { navSize } = useContext(SidebarContext);

  return (
    <Flex
      marginLeft={navSize === 'small' ? '75px' : '200px'}
      transition="margin 0.3s ease-in-out"
    >
      {children}
    </Flex>
  )
}


