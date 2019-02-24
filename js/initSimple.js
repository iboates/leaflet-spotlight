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

    $(map).spotlight();


//    sidebar = L.control.sidebar('sidebar').addTo(map);

    var dynamicCenterCircle;
    var dynamicCenterRectangle;
    var spotlightUUID1 = null;
    var spotlightUUID2 = null;

//    // Attach a change listener to the shape selector box
//    $("#shape-selector").on("change", function() {
//
//        console.log
//        if (spotlightUUID !== null) {
//            $(map).removeSpotlight(spotlightUUID);
//        }
//
//        var spotlightValue = $("#shape-selector").val();
//
//        if (spotlightValue == "circle") {
//
            dynamicCenterCircle = function (center) {
                return turf.circle(
                    center,
                    $("#circle-radius-input").val(),
                    {"steps": 128, "units": "meters"}
                );
            }

            dynamicCenterCircle2 = function (center) {
                return turf.circle(
                    center,
                    parseFloat($("#circle-radius-input").val())*2,
                    {"steps": 128, "units": "meters"}
                );
            }

//            spotlightUUID1 = $(map).addSpotlight(pointLayer, dynamicCenterCircle, spotlightStyle, simpleHighlightStyle1);
            spotlightUUID2 = $(map).addSpotlight(pointLayer, dynamicCenterCircle2, spotlightStyle, simpleHighlightStyle2);
            spotlightUUID1 = $(map).addSpotlight(pointLayer, dynamicCenterCircle, spotlightStyle, simpleHighlightStyle1);

//        } else if (spotlightValue == "rectangle") {
//
//            dynamicCenterRectangle = function (center) {
//                return turf.transformRotate(
//                    turf.envelope(
//                        turf.featureCollection([
//                            turf.destination(center, $("#rectangle-height-input").val()/2, 0, {"units": "meters"}),
//                            turf.destination(center, $("#rectangle-width-input").val()/2, 90, {"units": "meters"}),
//                            turf.destination(center, $("#rectangle-height-input").val()/2, 180, {"units": "meters"}),
//                            turf.destination(center, $("#rectangle-width-input").val()/2, -90, {"units": "meters"})
//                        ])
//                    ),
//                    parseFloat($("#rectangle-rotation-input").val())
//                );
//            }
//
//            spotlightUUID =  $(map).spotlight(pointLayer, dynamicCenterRectangle, spotlightStyle, highlightStyle);
//
//        }
//
//        $(".shape-params").hide();
//        $("#"+spotlightValue+"-params").show();

        console.log("UUID 1: " + spotlightUUID1);
        console.log("UUID 2: " + spotlightUUID2);
        console.log(map);

//    });

});