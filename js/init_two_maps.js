
var spotlightShape;
var sidebar;
var pointLayer;

$(document).ready(function() {

    // Initialize map & layers
    var mapLeft = L.map('map-left').setView([50.1109, 8.6821], 15);
    var mapRight = L.map('map-right').setView([50.1109, 8.6821], 15);

    $(mapLeft).spotlight();
    $(mapRight).spotlight();

    pointLayer = L.geoJSON(pointData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, pointStyle);
        }
    })

    pointLayer.addTo(mapLeft);
    pointLayer.addTo(mapRight);

    var dynamicCenterCircle;
    var dynamicCenterRectangle;
    var spotlightUUID = null;

    // Attach a change listener to the shape selector box
    $("#shape-selector").on("change", function() {

        console.log
        if (spotlightUUID !== null) {
            $(map).removeSpotlight(spotlightUUID);
        }

        var spotlightValue = $("#shape-selector").val();

        if (spotlightValue == "circle") {

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

            spotlightUUID = $(map).addSpotlight(pointLayer, dynamicCenterCircle, spotlightStyle, highlightStyle);

        } else if (spotlightValue == "rectangle") {

            dynamicCenterRectangle = function (center) {
                return turf.transformRotate(
                    turf.envelope(
                        turf.featureCollection([
                            turf.destination(center, $("#rectangle-height-input").val()/2, 0, {"units": "meters"}),
                            turf.destination(center, $("#rectangle-width-input").val()/2, 90, {"units": "meters"}),
                            turf.destination(center, $("#rectangle-height-input").val()/2, 180, {"units": "meters"}),
                            turf.destination(center, $("#rectangle-width-input").val()/2, -90, {"units": "meters"})
                        ])
                    ),
                    parseFloat($("#rectangle-rotation-input").val())
                );
            }

            spotlightUUID =  $(map).addSpotlight(pointLayer, dynamicCenterRectangle, spotlightStyle, highlightStyle);

        }

        $(".shape-params").hide();
        $("#"+spotlightValue+"-params").show();

        console.log(spotlightUUID);
        console.log(map);

    });

});