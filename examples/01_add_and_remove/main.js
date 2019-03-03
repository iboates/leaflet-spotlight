// Initialize Leaflet map
var map = L.map('map').setView([50.1109, 8.6821], 15);

// Initialize leaflet-spotlight on the map
leafletSpotlight(map);

// Define default style for points
var pointStyle = {
    radius: 2,
    fillColor: "#000000",
    color: "#000000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0
};

// Add the point layer to the map with the default point style
var pointLayer = L.geoJSON(pointData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, pointStyle);
    }
}).addTo(map);

// Define a style for highlighted points within the spotlight
var highlightStyle = {
    radius: 3,
    opacity: 0,
    fillColor: "#ff0000",
    fillOpacity: 1
};

// Define a style for the spotlight itself
var spotlightStyle = {
    color: "#000000",
    fillOpacity: 0
};

// Define a function which will dynamically generate a turf polygon geometry from an input Leaflet latlng
var dynamicCircle = function (center) {
    return turf.circle(
        center,
        50,
        {"steps": 128, "units": "meters"}
    );
};

// Create the spotlight to be added to the map
var spotlight = {
    highlightStyle: highlightStyle,
    spotlightShape: dynamicCircle,
    spotlightStyle: spotlightStyle,
    targetLayer: pointLayer
};

// Set up add/remove controls
var toggleButton = document.getElementById("toggle-button");
var hasSpotlight = false;

// Make the button toggle add & remove of the spotlight
toggleButton.addEventListener("click", function(e) {
    if (!hasSpotlight) {
        // Add the spotlight and save the generated UUID
        spotlightId = addLeafletSpotlight(map, spotlight);
        toggleButton.innerHTML = 'Remove Spotlight';
    } else {
        // Remove the spotlight via its UUID
        removeLeafletSpotlight(map, spotlightId);
        toggleButton.innerHTML = 'Add Spotlight';
    }
    hasSpotlight = !hasSpotlight;
});