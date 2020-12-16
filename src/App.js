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
            fetch("https://routing.openstreetmap.de/routed-foot/route/v1/driving/"+this.state.routeMarkers.slice(-1)[0][1] +","+this.state.routeMarkers.slice(-1)[0][0] + ";" +location.longitude +","+location.latitude+"?overview=false&steps=true")
            .then(response => {
                return response.json();
            })
            .then(json => {
                const routePoints = json.routes[0].legs[0].steps.map(step => {
                    return [step.maneuver.location[1], step.maneuver.location[0]];
                })
                this.setState((prevState) => {
                    return {routeMarkers: [...prevState.routeMarkers, ...routePoints]}
                })
            })
        } else {
            const routeMarkerLocation = [location.latitude, location.longitude]
            this.setState((prevState) => {
                return {routeMarkers: [...prevState.routeMarkers, routeMarkerLocation]}
            })
        }
    }

    clearCallback = () => {
        this.setState({
            routeMarkers: []
        })
    }

    undoCallback = () => {
        var array = [...this.state.routeMarkers];
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
            const route = this.state.routeMarkers.map(location => {
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
                <Map clickToAddLocation={this.addRouteMarkerOnClick} routeMarkers={this.state.routeMarkers}/>
                <RouteControl                         
                    clearCallback={this.clearCallback}
                    undoCallback={this.undoCallback}
                    exportCallback={this.exportCallback}/>
            </div>
        );
    }
}

export default App;
