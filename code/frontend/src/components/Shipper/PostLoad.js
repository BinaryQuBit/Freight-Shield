import { Flex, Text } from '@chakra-ui/react'
import Sidebar from '../Sidebar/ShipperSideBar'

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
