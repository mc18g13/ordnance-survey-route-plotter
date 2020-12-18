// Converts numeric degrees to radians
const toRad = (degrees) => {
    return degrees * Math.PI / 180;
}

//This function takes in latitude and longitude of two location and returns the distance between them (in m)
export const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const radiusOfEarthMeters = 6371000;
    const dLat = toRad(lat2-lat1);
    const dLon = toRad(lon2-lon1);
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1Rad) * Math.cos(lat2Rad); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = radiusOfEarthMeters * c;
    return d;
}