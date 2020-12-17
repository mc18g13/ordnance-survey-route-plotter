import {
    Stat,
    StatLabel,
    StatNumber,
    StatGroup,
    Flex
} from "@chakra-ui/react"

import { Component } from "react";

class RouteInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Flex margin="10px" pos="fixed" background="white" w="96%" zIndex={2} top="80%" borderRadius="lg">
                    <StatGroup px="2" >
                    <Stat>
                        <StatLabel>Distance</StatLabel>
                        <StatNumber>{this.props.routeLength}km</StatNumber>
                    </Stat>
                    </StatGroup>
                </Flex>
            </div>
        );
    }

}

export default RouteInfo;