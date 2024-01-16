import React from 'react';
import { Text, Flex } from '@chakra-ui/react';

function UserHeader({ title }) {
  return (
    <Flex
      width="100%"
      bg="#E4E9F7"
      p={15}
      align="center"
      justify="center"
    >
      <Text 
        fontSize="25px"
        fontWeight="bold"
      >
        {title}
      </Text>
    </Flex>
  );
}

export default UserHeader;


