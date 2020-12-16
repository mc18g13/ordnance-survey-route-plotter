import {
    Box,
    Heading,
    Button,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
} from '@chakra-ui/react';

import { Component } from "react";

class RouteControl extends Component {
    constructor(props) {
        super(props);
        this.state = {renderButtons: false};
    }

    onClick = () => {
        this.setState(prevState => { return {renderButtons: !prevState.renderButtons}})
    }

    render() {

        return (
            <div>
                <Menu isOpen={this.state.renderButtons}>
                    <MenuButton
                     marginTop="3"
                     marginLeft="3"
                     as={Button}
                     colorScheme="teal"
                     onClick={this.onClick}>
                        Route Options
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title="Edit Route">
                            <MenuItem onClick={this.props.clearCallback}>Clear</MenuItem>
                            <MenuItem onClick={this.props.undoCallback}>Undo</MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Data">
                            <MenuItem onClick={this.props.exportCallback}>Export</MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </div>
        );
    }

}

export default RouteControl;