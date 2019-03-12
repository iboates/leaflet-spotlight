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

// Alternate method of enabling spotlight
//map.spotlight.enable();

var mySpotlight = L.spotlight("aaa", {
    highlightStyle: 1,
    spotlightShape: 2,
    spotlightStyle: 3,
    targetLayer: 4
});

//var mySpotlight2 = new L.Spotlight("aaa", {
//    highlightStyle: 1,
//    spotlightShape: 2,
//    spotlightStyle: 3,
//    targetLayer: 4
//});

//map.addSpotlight(mySpotlight);

mySpotlight.addTo(map);

map.removeSpotlight(mySpotlight);