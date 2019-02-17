/**
 * Created by isaac on 18/07/17.
 */

$(document).ready(function() {

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
            mouseShape = turf.circle(
                [ev.latlng.lng, ev.latlng.lat],
                $("#circle-radius-input").val(),
                {"steps": 128, "units": "meters"}
            );
        } else if (spotlightShape == "rectangle") {
            mouseShape = turf.envelope(turf.featureCollection([
                turf.circle(
                    [ev.latlng.lng, ev.latlng.lat],
                    $("#rectangle-width-input").val(),
                    {"steps": 128, "units": "meters"})
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
                return L.circleMarker(latlng, spotlightStyle(feature))
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