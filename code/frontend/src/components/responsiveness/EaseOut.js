import React, { useContext } from "react";
import { Flex, Text } from '@chakra-ui/react'
import { SidebarContext } from "../../components/responsiveness/Context.js"

export const EaseOut = ({ title }) => {
  const { navSize } = useContext(SidebarContext);

  return (
    <Flex
      flex={1}
      justifyContent="center"
      alignItems="center"
      marginLeft={navSize === 'small' ? '75px' : '200px'}
      transition="margin 0.3s ease-in-out"
    >
      <Text fontSize="xl">{title}</Text>
    </Flex>
  )
}

