import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    FormControl,
    FormLabel,
    Switch
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons'

import { Component } from "react";

class RouteControl extends Component {
    constructor(props) {
        super(props);
        this.state = {renderButtons: false};
    }

    onClick = () => {
        this.setState(prevState => ({renderButtons: !prevState.renderButtons}))
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
                     onClick={this.onClick}
                     rightIcon={<ChevronDownIcon />}>
                        Route Options
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title="Settings">
                            <FormControl display="flex" alignItems="center">
                                <FormLabel marginLeft="3" marginRight="10" htmlFor="auto-route">
                                    Auto Route
                                </FormLabel>
                                <Switch id="auto-route" defaultIsChecked colorScheme="teal" onChange={this.props.toggleAutoRouting}/>
                            </FormControl>
                        </MenuGroup>
                        <MenuDivider />
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