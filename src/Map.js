import PropTypes from 'prop-types';
import { ReactBingmaps } from 'react-bingmaps';

const getPushPins = (props) => {
    const segmentEndPoints = props.routeSegments.map(segment => {
        const endOfSegment = segment.slice(-1)[0]
        return {
            "location": endOfSegment,
            "option":{ color: 'blue' }
        }
    })

    return segmentEndPoints;
}

const Map = (props) => {
    const pushPins = getPushPins(props);
    return (
        <ReactBingmaps
            bingmapKey = {process.env.REACT_APP_BING_API_KEY}
            polyline= {{
                "location": props.routeMarkers,
                "option": {strokeColor: "blue", strokeThickness: 3, strokeDashArray: [2]},
            }}
            center={props.center}
            mapTypeId = {"ordnanceSurvey"}
            getLocation = {
                {addHandler: "click", callback: props.clickToAddLocation}
            }
            pushPins = {
                pushPins
            } >
        </ReactBingmaps>
    );
    

}

Map.propTypes = {
    routeSegments: PropTypes.array.isRequired,
    clickToAddLocation:  PropTypes.any.isRequired
};

export default Map;