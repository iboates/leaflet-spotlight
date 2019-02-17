/**
 * Created by isaac on 18/07/17.
 */

$(document).ready(function() {

    // Set the initial spotlight shape to a circle and bind an event listener to it to change shape
    var spotlightShape = $("#shape-selector").val();
    $("#shape-selector").on("change", function() {
        spotlightShape = $("#shape-selector").val();
    });

    var styleData = {
        "min0": null,
        "max0": null,
        "min1": null,
        "max1": null,
        "min2": null,
        "max2": null,
        "min3": null
    };

    function getExtreme(gj, prop, minOrMax) {

        var featureId = -1;

        if (minOrMax == "max") {
            var max = -999999;
            for (var i=0; i<gj.features.length; i++) {
                if (gj.features[i].properties[prop] > max) {
                    max = gj.features[i].properties[prop];
                    featureId = gj.features[i].properties.id;
                }
            }
        } else if (minOrMax == "min") {
            var min = 999999;
            for (var i=0; i<gj.features.length; i++) {
                if (gj.features[i].properties[prop] < min) {
                    min = gj.features[i].properties[prop];
                    featureId = gj.features[i].properties.id;
                }
            }
        }

        return featureId

    };

    var pointStyle = {
        radius: 2,
        fillColor: "#000000",
        color: "#000000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0
    };

    function spotlightStyle2(feature) {
        return feature.properties.id == styleData.max0 ? {
            radius: 8,
            fillColor: "#880000",
            color: "#000000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        } : feature.properties.id == styleData.max1 ? {
            radius: 8,
            fillColor: "#008800",
            color: "#000000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        } : feature.properties.id == styleData.max2 ? {
            radius: 8,
            fillColor: "#000088",
            color: "#000000",
            weight: 1,
            opacity: 0,
            fillOpacity: 1
        } : feature.properties.id == styleData.min0 ? {
            radius: 8,
            fillColor: "#ffaaaa",
            color: "#000000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        } : feature.properties.id == styleData.min1 ? {
            radius: 8,
            fillColor: "#aaffaa",
            color: "#000000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        } : feature.properties.id == styleData.min2 ? {
            radius: 8,
            fillColor: "#aaaaff",
            color: "#000000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        } : {
            opacity: 0,
            fillOpacity: 0
        }
    };

    // Initialize map & layers
    var map = L.map('map').setView([50.1109, 8.6821], 15);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var pointLayer = L.geoJSON(pointData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, pointStyle);
        }
     }).addTo(map);

    var sidebar = L.control.sidebar('sidebar').addTo(map);

    var spotlightHighlightLayer;
    var spotlightLayer;
    var mousePosition = L.latLng(0, 0);
    var mouseShape;
    map.addEventListener('mousemove', function(ev) {

        if (map.hasLayer(spotlightHighlightLayer)) {
            map.removeLayer(spotlightHighlightLayer);
        }

        if (map.hasLayer(spotlightLayer)) {
            map.removeLayer(spotlightLayer)
        }

        if (spotlightShape == "circle") {
            mouseShape = turf.circle([ev.latlng.lng, ev.latlng.lat], 50, {"steps": 128, "units": "meters"});
        } else if (spotlightShape == "rectangle") {
            mouseShape = turf.envelope(turf.featureCollection([
                turf.circle([ev.latlng.lng, ev.latlng.lat], 50, {"steps": 128, "units": "meters"})
            ]));
        }
        var spotlightPoints = turf.pointsWithinPolygon(pointLayer.toGeoJSON(), mouseShape);

        styleData.max0 = getExtreme(spotlightPoints, "attr0", "max");
        styleData.max1 = getExtreme(spotlightPoints, "attr1", "max");
        styleData.max2 = getExtreme(spotlightPoints, "attr2", "max");
        styleData.min0 = getExtreme(spotlightPoints, "attr0", "min");
        styleData.min1 = getExtreme(spotlightPoints, "attr1", "min");
        styleData.min2 = getExtreme(spotlightPoints, "attr2", "min");

        spotlightHighlightLayer = L.geoJSON(spotlightPoints, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, spotlightStyle2(feature))
            }
        }).addTo(map);

        spotlightLayer = L.geoJSON(mouseShape, {
            style: {
                color: "#000000",
                fillOpacity: 0
            }
        }).addTo(map);

    });

});