// Initialize map & layers
var map = L.map('map', {spotlight: true}).setView([50.1109, 8.6821], 15);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var pointLayer = L.geoJSON(pointData, {

    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, pointStyle);
    },
    spotlight: true

});

pointLayer.addTo(map)

dynamicCenterCircle = function (center) {
    return turf.circle(
        center,
        25,
        {"steps": 128, "units": "meters"}
    );
}

var mySpotlightStyle = {
    color: "#ff0000",
    fillOpacity: 0
};

function myHighlightStyle(feature) {

    if (feature.properties.id % 2. == 0) {
        return {
            radius: 3,
            opacity: 0,
            fillColor: "#ff0000",
            fillOpacity: 1
        }
    } else {
        return {
            radius:3,
            opacity: 0,
            fillColor: "#0000ff",
            fillOpacity: 1
        }
    }
};

// Alternate method of enabling spotlight
//map.spotlight.enable();

var mySpotlight = L.spotlight("aaa", {
    highlightStyle: myHighlightStyle,
    spotlightShape: dynamicCenterCircle,
    spotlightStyle: mySpotlightStyle,
    targetLayer: pointLayer
});

//var mySpotlight2 = new L.Spotlight("aaa", {
//    highlightStyle: 1,
//    spotlightShape: 2,
//    spotlightStyle: 3,
//    targetLayer: 4
//});

//map.addSpotlight(mySpotlight);

mySpotlight.addTo(map);

//map.removeSpotlight(mySpotlight);