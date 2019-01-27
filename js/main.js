/**
 * Created by isaac on 18/07/17.
 */

$(document).ready(function() {

    var pointStyle = {
        radius: 8,
        fillColor: "#4444ff",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.5
    };

    var spotlightStyle = {
        radius: 10,
        fillColor: "#ffff00",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };

    // Initialize map & layers
    var map = L.map('map').setView([50.1109, 8.6821], 15);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var pointLayer = L.geoJSON(pointData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, pointStyle);
        }
     }).addTo(map);

    var spotlightLayer;
    var mousePosition = L.latLng(0, 0);
    var mouseCircle;
    map.addEventListener('mousemove', function(ev) {

        if (map.hasLayer(spotlightLayer)) {
            map.removeLayer(spotlightLayer)
        }

        mouseCircle = turf.circle([ev.latlng.lng, ev.latlng.lat], 0.05, {"steps": 16, "units": "kilometers"});
        var spotlightPoints = turf.pointsWithinPolygon(pointLayer.toGeoJSON(), mouseCircle);
        spotlightLayer = L.geoJSON(spotlightPoints, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, spotlightStyle);
            }
        }).addTo(map);

    });

});