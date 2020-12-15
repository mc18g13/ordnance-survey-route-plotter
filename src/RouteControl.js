import {
    Box,
    Heading,
    Button,
    Stack
} from '@chakra-ui/react';

const RouteControl = (props) => {
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
            <Heading colorScheme="teal" margin="1em" >Edit Route</Heading>
            <Box textAlign="left">
                <Stack variant="outline" spacing="6" margin="1em">
                    <Button colorScheme="teal" mt={3} onClick={props.clearCallback}>
                        Clear
                    </Button>
                    <Button colorScheme="teal" mt={3} onClick={props.undoCallback}>
                        Undo
                    </Button>
                    <Button colorScheme="teal" mt={3} onClick={props.exportCallback}>
                        Export
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default RouteControl;