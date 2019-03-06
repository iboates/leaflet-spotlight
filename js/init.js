var map;
var spotlightShape;
var sidebar;
var pointLayer;

$(document).ready(function() {

    // Initialize map & layers
    map = L.map('map', {spotlight: true}).setView([50.1109, 8.6821], 15);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    pointLayer = L.geoJSON(pointData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, pointStyle);
        }
    }).addTo(map);

    // Alternate method of enabling spotlight
//    map.spotlight.enable();

});