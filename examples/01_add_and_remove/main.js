// Initialize Leaflet map
var map = L.map('map').setView([50.1109, 8.6821], 15);

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

// Initialize leaflet-spotlight on the map
leafletSpotlight(map);

// Set up add/remove controls
var toggleButton = document.getElementById("toggle-button");
var hasSpotlight = false;
var spotlightUUID;

// Make the button toggle add & remove of the spotlight
toggleButton.addEventListener("click", function(e) {
    if (!hasSpotlight) {
        // Add the spotlight and save the generated UUID
        spotlightUUID = addLeafletSpotlight(map, pointLayer, dynamicCircle, spotlightStyle, highlightStyle);
        toggleButton.innerHTML = 'Remove Spotlight';
    } else {
        // Remove the spotlight via its UUID
        removeLeafletSpotlight(map, spotlightUUID);
        toggleButton.innerHTML = 'Add Spotlight';
    }
    hasSpotlight = !hasSpotlight;
});