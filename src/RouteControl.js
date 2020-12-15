import {
    Box,
    Heading,
    Button,
    Stack
} from '@chakra-ui/react';

import {React, Component} from "react";
import { ReactBingmaps } from 'react-bingmaps';


class RouteControl extends Component {
    constructor(props) {
        super(props);
        this.state = {renderButtons: false};
    }

    onClick = () => {
        this.setState(prevState => { return {renderButtons: !prevState.renderButtons}})
    }

    render() {
        let Buttons = () =>  {return <div/>}
        if (this.state.renderButtons) {
            Buttons = () => {
                return (
                    <div>
                    <Box textAlign="left">
                        <Stack variant="outline" spacing="6" margin="1em">
                            <Button colorScheme="teal" mt={3} onClick={this.props.clearCallback}>
                                Clear
                            </Button>
                            <Button colorScheme="teal" mt={3} onClick={this.props.undoCallback}>
                                Undo
                            </Button>
                            <Button colorScheme="teal" mt={3} onClick={this.props.exportCallback}>
                                Export
                            </Button>
                        </Stack>
                    </Box>
                    </div>
                )
            }
        }
    
        return (
            <Box
                style={{position: "absolute"}} 
                p={1} width={200}  
                background="white" 
                borderWidth={1} 
                borderColor="black" 
                borderRadius={8} 
                boxShadow="lg"
                marginTop="3"
                marginLeft="3">
                <Button onClick={this.onClick} style={{float:"right"}} >_</Button>
                <Heading colorScheme="teal" margin="1em" >Edit Route</Heading>
                <Buttons/>
            </Box>
        );
    }

}

export default RouteControl;