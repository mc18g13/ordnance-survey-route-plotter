import {React, Component} from "react";
import { ReactBingmaps } from 'react-bingmaps';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {pinLocations: []};
    }


    AddPushPinOnClick = (location) => {
        const routeMarkerLocation = [location.latitude, location.longitude]
        this.setState((prevState) => {
            return {pinLocations: [...prevState.pinLocations, routeMarkerLocation]}
        })
    }

    render(){
        const routeMarkers = this.state.pinLocations.map(location => { 
            const circle = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle cx="5" cy="5" r="3" fill="CornflowerBlue"/></svg>'
            return {
                "location": location,
                "option":{ color: 'blue',"icon" : circle }
            }
        })

        return (
            <ReactBingmaps 
                bingmapKey = "AqTBoR7ee9aqB1014xgKQ-3EXp-kv8r3InQ2OcxxxuU81xMHybJkxfsih687H2KC"
                center={[51.5074, 0.1278]}
                mapTypeId = {"ordnanceSurvey"}
                getLocation = {
                    {addHandler: "click", callback: this.AddPushPinOnClick}
                }
                pushPins = {
                    routeMarkers
                }
                >
            </ReactBingmaps>
        );
    }

}
 

function App() {
    return <Map/>;
}

export default App;
