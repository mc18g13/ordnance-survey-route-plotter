import Map from "./Map"
import RouteControl from "./RouteControl"
import {Component} from "react";
import createGpx from 'gps-to-gpx';
require('dotenv').config()

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {routeMarkers: []};
    }

    addRouteMarkerOnClick = (location) => {

        if (this.state.routeMarkers.length > 0) {
            const lastRouteSegment = this.state.routeMarkers[this.state.routeMarkers.length - 1];
            const lastRoutePoint = lastRouteSegment[lastRouteSegment.length - 1];
            const url = "https://routing.openstreetmap.de/routed-foot/route/v1/driving/"+lastRoutePoint[1] +","+lastRoutePoint[0] + ";" +location.longitude +","+location.latitude+"?overview=false&steps=true&geometries=geojson";
            fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.routes) {
                    const routePoints = json.routes[0].legs[0].steps.map(step => {
                        return step.geometry.coordinates.map( coord => {
                            return [coord[1], coord[0]];
                        })
                    })
                    // console.log(...routePoints.flat())
                    this.setState((prevState) => {
                        return {routeMarkers: [...prevState.routeMarkers, [...routePoints.flat()]]};
                    })
                } else {
                    console.error("invalid routing request");
                }

            })
        } else {
            const routeMarkerLocation = [location.latitude, location.longitude]
            this.setState({routeMarkers: [[routeMarkerLocation]]})
        }
    }

    clearCallback = () => {
        this.setState({
            routeMarkers: []
        })
    }

    undoCallback = () => {
        var array = this.state.routeMarkers;
        array.pop()
        this.setState({routeMarkers: array});
    }

    download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

    exportCallback = () => {
        if (this.state.routeMarkers.length > 0) {
            const route = this.state.routeMarkers.flat().map(location => {
                return {
                    latitude: location[0],
                    longitude: location[1]
                }
            })
            const gpx = createGpx(route, {});
    
            this.download("route.gpx", gpx);
        }
    }

    render() {
        return (
            <div>
                <Map 
                    clickToAddLocation={this.addRouteMarkerOnClick}
                    routeMarkers={this.state.routeMarkers.flat()}
                    routeSegments={this.state.routeMarkers}/>
                <RouteControl                         
                    clearCallback={this.clearCallback}
                    undoCallback={this.undoCallback}
                    exportCallback={this.exportCallback}/>
            </div>
        );
    }
}

export default App;
