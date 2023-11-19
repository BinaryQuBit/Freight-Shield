import { Flex, Text } from "@chakra-ui/react";
import ShipperSideBar from "../Sidebar/ShipperSideBar";
import {
  Card,
  Input,
  Stack,
  Center,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import GreenButton from "../buttons/greenButton";

export default function PostLoad() {
    return(
        <>
            <Flex>
                <Sidebar activePage="postLoad"/>
                <Flex flex="1" alignItems="center" justifyContent="center">
                    <Text>Hello World</Text>
                </Flex>
            </Flex>
        </>
    )
}
