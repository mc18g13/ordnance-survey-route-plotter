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
    Switch,
} from '@chakra-ui/react';

import gpxParser from "gpxparser"

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

    getRouteFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = () => {
                let gpx = new gpxParser();
                gpx.parse(fr.result)
                if (gpx.tracks[0] && gpx.tracks[0].points) {
                    const routeArray = gpx.tracks[0].points.map(point => {
                        return [point.lat, point.lon];
                    })
    
                    const totalDistance = gpx.tracks[0].distance.total;
    
                    this.props.uploadCallback(routeArray, totalDistance);
                }
            };
            fr.readAsText(e.target.files[0]);
        } else {
            console.error("File is null");
        }
    }

    openRouteFileToLoad = () => {
        var input = document.createElement("input");
        input.setAttribute('type', 'file');
        input.setAttribute("accept", ".gpx")
        input.style.display = 'none';
        document.body.appendChild(input);
        input.click()
        document.body.removeChild(input);
        input.addEventListener("change", this.getRouteFile);
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
                            <MenuItem onClick={this.props.exportCallback}>Export GPX</MenuItem>
                            <MenuItem onClick={this.openRouteFileToLoad}>
                                Import GPX
                            </MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>

  
            </div>
        );
    }

}

export default RouteControl;