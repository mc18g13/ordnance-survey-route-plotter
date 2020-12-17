import Map from "./Map"
import RouteControl from "./RouteControl"
import RouteInfo from "./RouteInfo"
import {Component} from "react";
import createGpx from 'gps-to-gpx';
import { haversineDistance } from "./MathFunctions"
require('dotenv').config()

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeSegments: [],
            segmentDistances: [],
            autoRouting: true
        };
    }

    addRouteMarkerOnClick = (location) => {

        if (this.state.routeSegments.length > 0) {
            const lastRouteSegment = this.state.routeSegments[this.state.routeSegments.length - 1];
            const lastRoutePoint = lastRouteSegment[lastRouteSegment.length - 1];
            if (this.state.autoRouting) {
                const url = "https://routing.openstreetmap.de/routed-foot/route/v1/driving/"+lastRoutePoint[1] +","+lastRoutePoint[0] + ";" +location.longitude +","+location.latitude+"?overview=false&steps=true&geometries=geojson";
                fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    if (json.routes) {
                        const distance = json.routes[0].legs[0].distance;
                        const routePoints = json.routes[0].legs[0].steps.map(step => {
                            return step.geometry.coordinates.map( coord => {
                                return [coord[1], coord[0]];
                            })
                        })
                        this.setState((prevState) => {
                            return {
                                routeSegments: [...prevState.routeSegments, [...routePoints.flat()]],
                                segmentDistances: [...prevState.segmentDistances, distance]
                            };
                        })
                    } else {
                        throw Error("invalid routing request");
                    }
                })
                .catch(err => {
                    console.error(err)
                })
            } else {
                const distance = haversineDistance(lastRoutePoint[0], lastRoutePoint[1], location.latitude, location.longitude);
                const routeMarkerLocation = [location.latitude, location.longitude];
                this.setState((prevState) => {
                    return {
                        routeSegments: [...prevState.routeSegments, [routeMarkerLocation]],
                        segmentDistances: [...prevState.segmentDistances, distance]
                    };
                })
            }
            
        } else {
            const routeMarkerLocation = [location.latitude, location.longitude]
            this.setState({routeSegments: [[routeMarkerLocation]], segmentDistances: [0]})
        }
    }

    clearCallback = () => {
        this.setState({
            routeSegments: [],
            segmentDistances: []
        })
    }

    undoCallback = () => {
        this.setState((prevState) => ({
            routeSegments: prevState.routeSegments.filter((_, i) => i !== prevState.routeSegments.length - 1),
            segmentDistances: prevState.segmentDistances.filter((_, i) => i !== prevState.routeSegments.length - 1),
        }));
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
        if (this.state.routeSegments.length > 0) {
            const route = this.state.routeSegments.flat().map(location => {
                return {
                    latitude: location[0],
                    longitude: location[1]
                }
            })
            const gpx = createGpx(route, {});
    
            this.download("route.gpx", gpx);
        }
    }

    getRouteLength() {
        if (this.state.segmentDistances.length > 0) {
            const routeLength = this.state.segmentDistances.reduce((value, total) => {
                return total + value;
            });
            return routeLength;
        } else {
            return 0.0;
        }
    }

    toggleAutoRouting = () => {
        this.setState(prevState => ({autoRouting: !prevState.autoRouting}));
    }

    render() {
        const routeLengthKilometers = (this.getRouteLength() / 1000).toFixed(2);
        return (
            <div>
                <Map 
                    clickToAddLocation={this.addRouteMarkerOnClick}
                    routeMarkers={this.state.routeSegments.flat()}
                    routeSegments={this.state.routeSegments}/>
                <RouteControl                         
                    clearCallback={this.clearCallback}
                    undoCallback={this.undoCallback}
                    exportCallback={this.exportCallback}
                    toggleAutoRouting={this.toggleAutoRouting}/>
                <RouteInfo routeLength={routeLengthKilometers}/>
            </div>
        );
    }
}

export default App;
