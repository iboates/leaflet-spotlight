function leafletSpotlight(map) {

    // Add an object to act as a registry of layers for various spotlights and highlighted features
    // As spotlights are added, a UUID will be generated for one which serves here as a key to its layers.
    map._leafletSpotlight = {};

    // Create a mousemove event listener for this spotlight
    map.addEventListener('mousemove', function(ev) {

        for (var spotlightId in this._leafletSpotlight) {
        
            var currentSpotlight = this._leafletSpotlight[spotlightId];

            // On each mouse movement, remove the spotlight & highlighted features layer for this spotlightId
            if (this.hasLayer(currentSpotlight.spotlightHighlightLayer)) {
                this.removeLayer(currentSpotlight.spotlightHighlightLayer);
            }
            if (this.hasLayer(currentSpotlight.spotlightLayer)) {
                this.removeLayer(currentSpotlight.spotlightLayer);
            }

            // Find which points are highlighted by seeing if they are within the spotlight
            var highlightedPoints = turf.pointsWithinPolygon(
                this._leafletSpotlight[spotlightId].targetLayer.toGeoJSON(),
                currentSpotlight.spotlightShape([ev.latlng.lng, ev.latlng.lat])
            );

            // Add the highlighted features to the map as a layer
            if (typeof currentSpotlight.highlightStyle !== "function") {
                currentSpotlight.spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, currentSpotlight.highlightStyle)
                    }
                }).addTo(this);
            } else {
                currentSpotlight.spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, currentSpotlight.highlightStyle(feature))
                    }
                }).addTo(this);
            }

            // Add the spotlight to the map as a layer
            currentSpotlight.spotlightLayer = L.geoJSON(currentSpotlight.spotlightShape([ev.latlng.lng, ev.latlng.lat]), {
                style: currentSpotlight.spotlightStyle
            }).addTo(this);

        }

    });

};

function addLeafletSpotlight(map, spotlight, spotlightId) {

    if (typeof spotlightId === "undefined") {
        var spotlightId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    map._leafletSpotlight[spotlightId] = spotlight

    return spotlightId;

}

function removeLeafletSpotlight(map, spotlightId) {

    // Remove the spotlight & highlighted feature layers from the map
    if (map.hasLayer(map._leafletSpotlight[spotlightId].spotlightLayer)) {
        map.removeLayer(map._leafletSpotlight[spotlightId].spotlightHighlightLayer);
    }
    if (map.hasLayer(map._leafletSpotlight[spotlightId].spotlightLayer)) {
        map.removeLayer(map._leafletSpotlight[spotlightId].spotlightLayer);
    }

    delete map._leafletSpotlight[spotlightId];

};