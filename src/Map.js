import {React, Component} from "react";
import { ReactBingmaps } from 'react-bingmaps';

class Map extends Component {

    render(){

        const segmentStartPoints = this.props.routeSegments.map(segment => {
            return {
                "location": segment.slice(-1)[0],
                "option":{ color: 'blue' }
            }
        })
        return (
            <ReactBingmaps
                bingmapKey = {process.env.REACT_APP_BING_API_KEY}
                polyline= {{
                    "location": this.props.routeMarkers,
                    "option": {strokeColor: "blue", strokeThickness: 3, strokeDashArray: [2]}
                }}
                center={[51.5074, 0.1278]}
                mapTypeId = {"ordnanceSurvey"}
                getLocation = {
                    {addHandler: "click", callback: this.props.clickToAddLocation}
                }
                pushPins = {
                    segmentStartPoints
                } >
            </ReactBingmaps>
        );
    }

}

export default Map;