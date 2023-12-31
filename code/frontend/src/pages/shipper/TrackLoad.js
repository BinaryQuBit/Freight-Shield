import { Flex, Text } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar/ShipperSideBar";

export default function TrackLoad() {
  return (
    <>
      <Flex>
        <Sidebar activePage="trackLoad" />
        <Flex flex="1" justifyContent="center">
          <Text>Hello World</Text>
        </Flex>
      </Flex>
    </>
  );
}
