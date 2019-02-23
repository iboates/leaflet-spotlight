var styleData = {
    "min0": null,
    "max0": null,
    "min1": null,
    "max1": null,
    "min2": null,
    "max2": null,
    "min3": null
};

var pointStyle = {
    radius: 2,
    fillColor: "#000000",
    color: "#000000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0
};

var spotlightStyle = {
    color: "#ff0000",
    fillOpacity: 0
};

function highlightStyle(feature) {

    if (feature.properties.id % 2. == 0) {
        return {
            radius: 3,
            opacity: 0,
            fillColor: "#ff0000",
            fillOpacity: 1
        }
    } else {
        return {
            radius:3,
            opacity: 0,
            fillColor: "#0000ff",
            fillOpacity: 1
        }
    }
}