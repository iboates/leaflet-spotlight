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
            radius: 8,
            color: "#000000",
            opacity: 1,
            fillColor: "#ff0000",
            fillOpacity: 1
        }
    } else {
        return {
            radius: 8,
            color: "#000000",
            opacity: 1,
            fillColor: "#0000ff",
            fillOpacity: 1
        }
    }
}

//function highlightStyle(feature) {
//    return feature.properties.id == styleData.max0 ? {
//        radius: 8,
//        fillColor: "#880000",
//        color: "#000000",
//        weight: 1,
//        opacity: 1,
//        fillOpacity: 1
//    } : feature.properties.id == styleData.max1 ? {
//        radius: 8,
//        fillColor: "#008800",
//        color: "#000000",
//        weight: 1,
//        opacity: 1,
//        fillOpacity: 1
//    } : feature.properties.id == styleData.max2 ? {
//        radius: 8,
//        fillColor: "#000088",
//        color: "#000000",
//        weight: 1,
//        opacity: 0,
//        fillOpacity: 1
//    } : feature.properties.id == styleData.min0 ? {
//        radius: 8,
//        fillColor: "#ffaaaa",
//        color: "#000000",
//        weight: 1,
//        opacity: 1,
//        fillOpacity: 1
//    } : feature.properties.id == styleData.min1 ? {
//        radius: 8,
//        fillColor: "#aaffaa",
//        color: "#000000",
//        weight: 1,
//        opacity: 1,
//        fillOpacity: 1
//    } : feature.properties.id == styleData.min2 ? {
//        radius: 8,
//        fillColor: "#aaaaff",
//        color: "#000000",
//        weight: 1,
//        opacity: 1,
//        fillOpacity: 1
//    } : {
//        opacity: 0,
//        fillOpacity: 0
//    }
//};