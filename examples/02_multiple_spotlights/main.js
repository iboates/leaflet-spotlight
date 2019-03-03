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

// Define styles for highlighted points within the spotlights
var highlightStyleRed = {
    radius: 3,
    opacity: 0,
    fillColor: "#ff0000",
    fillOpacity: 0.5
};
var highlightStyleGreen = {
    radius: 3,
    opacity: 0,
    fillColor: "#00ff00",
    fillOpacity: 0.5
};
var highlightStyleBlue = {
    radius: 3,
    opacity: 0,
    fillColor: "#0000ff",
    fillOpacity: 0.5
};

// Define a style for the spotlight itself
var spotlightStyle = {
    color: "#000000",
    fillOpacity: 0
};

// Define functions which will dynamically generate a turf polygon geometry from an input Leaflet latlng
var dynamicCircleRed = function (center) {
    return turf.circle(
        turf.destination(center, 10, 0, {"units": "meters"}),
        25,
        {"steps": 128, "units": "meters"}
    );
};
var dynamicCircleGreen = function (center) {
    return turf.circle(
        turf.destination(center, 10, -90, {"units": "meters"}),
        25,
        {"steps": 128, "units": "meters"}
    );
};
var dynamicCircleBlue = function (center) {
    return turf.circle(
        turf.destination(center, 10, 90, {"units": "meters"}),
        25,
        {"steps": 128, "units": "meters"}
    );
};

// Initialize leaflet-spotlight on the map
leafletSpotlight(map);

// Set up add/remove controls
var toggleButtonRed = document.getElementById("toggle-button-red");
var toggleButtonGreen = document.getElementById("toggle-button-green");
var toggleButtonBlue = document.getElementById("toggle-button-blue");
var hasRedSpotlight = false;
var hasGreenSpotlight = false;
var hasBlueSpotlight = false;
var redSpotlightUUID;
var greenSpotlightUUID;
var blueSpotlightUUID;

// Make the button toggle add & remove of the spotlight
toggleButtonRed.addEventListener("click", function(e) {
    if (!hasRedSpotlight) {
        // Add the spotlight and save the generated UUID
        redSpotlightUUID = addLeafletSpotlight(map, pointLayer, dynamicCircleRed, spotlightStyle, highlightStyleRed);
        toggleButtonRed.innerHTML = 'Remove Red Spotlight';
    } else {
        // Remove the spotlight via its UUID
        removeLeafletSpotlight(map, redSpotlightUUID);
        toggleButtonRed.innerHTML = 'Add Red Spotlight';
    }
    hasRedSpotlight = !hasRedSpotlight;
});

// Make the button toggle add & remove of the spotlight
toggleButtonGreen.addEventListener("click", function(e) {
    if (!hasGreenSpotlight) {
        // Add the spotlight and save the generated UUID
        greenSpotlightUUID = addLeafletSpotlight(map, pointLayer, dynamicCircleGreen, spotlightStyle, highlightStyleGreen);
        toggleButtonGreen.innerHTML = 'Remove Green Spotlight';
    } else {
        // Remove the spotlight via its UUID
        removeLeafletSpotlight(map, greenSpotlightUUID);
        toggleButtonGreen.innerHTML = 'Add Green Spotlight';
    }
    hasGreenSpotlight = !hasGreenSpotlight;
});

// Make the button toggle add & remove of the spotlight
toggleButtonBlue.addEventListener("click", function(e) {
    if (!hasBlueSpotlight) {
        // Add the spotlight and save the generated UUID
        blueSpotlightUUID = addLeafletSpotlight(map, pointLayer, dynamicCircleBlue, spotlightStyle, highlightStyleBlue);
        toggleButtonBlue.innerHTML = 'Remove Blue Spotlight';
    } else {
        // Remove the spotlight via its UUID
        removeLeafletSpotlight(map, blueSpotlightUUID);
        toggleButtonBlue.innerHTML = 'Add Blue Spotlight';
    }
    hasBlueSpotlight = !hasBlueSpotlight;
});