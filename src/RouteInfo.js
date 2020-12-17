import {
    Stat,
    StatLabel,
    StatNumber,
    StatGroup,
    Flex
} from "@chakra-ui/react"

const RouteInfo = (props) => {
    return (
        <Flex margin="10px" pos="fixed" background="white" top="80%" borderRadius="lg">
            <StatGroup px="2" >
            <Stat>
                <StatLabel>Distance</StatLabel>
                <StatNumber>{props.routeLength}km</StatNumber>
            </Stat>
            </StatGroup>
        </Flex>
    );
}

export default RouteInfo;