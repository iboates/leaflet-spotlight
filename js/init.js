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

    spptlightShapeOptions = {
        "circleRadius": 25,
        "rectangleWidth": 25,
        "rectangleHeight": 50,
        "rectangleRotation": 15
    }

    function dynamicCenterCircle(center) {
        return turf.circle(
                    center,
                    50,
                    {"steps": 128, "units": "meters"}
                );
    }

    function dynamicCenterRectangle(center) {
        return turf.transformRotate(
            turf.envelope(
                turf.featureCollection([
                    turf.destination(center, 25, 0, {"units": "meters"}),
                    turf.destination(center, 15, 90, {"units": "meters"}),
                    turf.destination(center, 25, 180, {"units": "meters"}),
                    turf.destination(center, 15, -90, {"units": "meters"})
                ])
            ),
            15
        );
    }

//    $(map).spotlight(pointLayer, dynamicCenterCircle, spotlightStyle, highlightStyle);
    $(map).spotlight(pointLayer, dynamicCenterRectangle, spotlightStyle, highlightStyle);


//     // Add sidebar
//    sidebar = L.control.sidebar('sidebar').addTo(map);

//     // Set the initial spotlight shape
//    $("#shape-selector").val("circle");
//    spotlightShape = $("#shape-selector").val();
//
//    // Attach a change listener to the shape selector box
//    $("#shape-selector").on("change", function() {
//
//        var spotlightValue = $("#shape-selector").val();
//
//        spotlightShape = spotlightValue;
//
//        $(".shape-params").hide();
//        $("#"+spotlightValue+"-params").show();
//
//    });

});