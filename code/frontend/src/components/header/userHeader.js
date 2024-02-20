// Test to update name
import React from 'react';
import { Flex, Text, useColorMode } from '@chakra-ui/react';

function UserHeader({ title }) {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? '#343541' : '#E4E9F7';

  return (
    <Flex
      width="100%"
      bg={bgColor}
      p={15}
      align="center"
      justify="center"
    >
      <Text fontSize="25px" fontWeight="bold">
        {title}
      </Text>
    </Flex>
  );
}

export default UserHeader;
