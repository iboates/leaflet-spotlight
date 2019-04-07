// Initialize map with spotlight enabled
var map = L.map(
    'map', {
        spotlight: true, // This one enables spotlight on the map
        scrollWheelZoom:false,
        zoomControl: false,
        boxZoom: false,
        doubleClickZoom: false,
        dragging: false
     }).setView([50.11703222529853, 8.679703474044802], 18);

// Alternate method of enabling spotlight
//map.spotlight.enable();

// Define default style for points (small black dot)
var pointStyle = {
    radius: 2,
    opacity: 0,
    fillColor: "#000000",
    fillOpacity: 1
}

// Add layer to map
var pointLayer = L.geoJSON(pointData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, pointStyle);
    }
}).addTo(map);

// Define a function which takes a leaflet latlng as input and returns a turf polygon geometry (in this case, a circle)
var dynamicCenterCircle = function (center) {
    return turf.circle(
        center,
        25,
        {"steps": 128, "units": "meters"}
    );
}

// Define a style for the spotlight polygon itself (in this case, a black ring)
var mySpotlightStyle = {
    color: "#000000",
    fillOpacity: 0
};

// Define a style for a leaflet point
var myHighlightStyle = {
        radius: 3,
        opacity: 0,
        fillColor: "#ff0000",
        fillOpacity: 1
};

// Define a spotlight object and add it to the map using the ".addTo()" method
var mySpotlight = L.spotlight({
    spotlightType: "circleMarker",
    highlightStyle: myHighlightStyle, // Style with which highlighted points shall be drawn
    spotlightShape: dynamicCenterCircle, // Function which takes leaflet point and returns a turf polygon
    spotlightStyle: mySpotlightStyle, // Style with which the spotlight itself shall be drawn
    targetLayer: pointLayer // Layer onto which to apply the spotlight
}).addTo(map);

// Alternate method of adding a spotlight to a map
// map.addSpotlight(mySpotlight);