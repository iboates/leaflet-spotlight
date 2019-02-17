var map;
var spotlightShape;
var sidebar;
var pointLayer;

$(document).ready(function() {

    // Initialize map & layers
    map = L.map('map').setView([50.1109, 8.6821], 15);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    pointLayer = L.geoJSON(pointData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, pointStyle);
        }
    }).addTo(map);

     // Add sidebar
    sidebar = L.control.sidebar('sidebar').addTo(map);

     // Set the initial spotlight shape
    spotlightShape = $("#shape-selector").val();
    // Attach a change listener to the shape selector box
    $("#shape-selector").on("change", function() {
        spotlightShape = $("#shape-selector").val();
    });

});