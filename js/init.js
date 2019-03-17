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

dynamicCenterCircle1 = function (center) {
    return turf.circle(
        center,
        25,
        {"steps": 128, "units": "meters"}
    );
}

dynamicCenterCircle2 = function (center) {
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

function myHighlightStyle1(feature) {

    if (feature.properties.id % 2. == 0) {
        return {
            radius: 3,
            opacity: 0,
            fillColor: "#ff0000",
            fillOpacity: 1
        }
    } else {
        return {
            opacity: 0,
            fillOpacity: 0
        }
    }
};

function myHighlightStyle2(feature) {

    if (feature.properties.id % 2. != 0) {
        return {
            radius: 3,
            opacity: 0,
            fillColor: "#0000ff",
            fillOpacity: 1
        }
    } else {
        return {
            opacity: 0,
            fillOpacity: 0
        }
    }
};

// Alternate method of enabling spotlight
//map.spotlight.enable();

var mySpotlight1 = L.spotlight("aaa", {
    highlightStyle: myHighlightStyle1,
    spotlightShape: dynamicCenterCircle1,
    spotlightStyle: mySpotlightStyle,
    targetLayer: pointLayer
});

var mySpotlight2 = L.spotlight("bbb", {
    highlightStyle: myHighlightStyle2,
    spotlightShape: dynamicCenterCircle2,
    spotlightStyle: mySpotlightStyle,
    targetLayer: pointLayer
});

var toggleButton1 = document.getElementById("toggle-spotlight1-button");
toggleButton1.addEventListener("click", function(e) {
    if (!map.hasSpotlight(mySpotlight1)) {
        mySpotlight1.addTo(map);
    } else {
        map.removeSpotlight(mySpotlight1)
    }
});

var toggleButton2 = document.getElementById("toggle-spotlight2-button");
toggleButton2.addEventListener("click", function(e) {
    if (!map.hasSpotlight(mySpotlight2)) {
        mySpotlight2.addTo(map);
    } else {
        map.removeSpotlight(mySpotlight2)
    }
});