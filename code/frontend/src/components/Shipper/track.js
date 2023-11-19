import { Flex, Text } from '@chakra-ui/react'
import Sidebar from '../Sidebar/ShipperSideBar'

export default function ShipperSideBar() {
    return(
        <>
            <Flex>
                <Sidebar/>
                <Flex flex="1" justifyContent="center">
                    <Text>Hello World</Text>
                </Flex>
            </Flex>
        </>
    )
}