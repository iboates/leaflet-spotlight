(function ( $ ) {

    $.fn.spotlight = function() {

        // Add an object to act as a registry of layers for various spotlights and highlighted features
        // As spotlights are added, a UUID will be generated for one which serves here as a key to its layers.
        this[0]._leafletSpotlight = {};

        // Create a mousemove event listener for this spotlight
        this[0].addEventListener('mousemove', function(ev) {

            for (var uuid in this._leafletSpotlight) {
            
                var currentSpotlight = this._leafletSpotlight[uuid];

                // On each mouse movement, remove the spotlight & highlighted features layer for this UUID
                if (this.hasLayer(currentSpotlight._spotlightHighlightLayer)) {
                    this.removeLayer(currentSpotlight._spotlightHighlightLayer);
                }
                if (this.hasLayer(currentSpotlight._spotlightLayer)) {
                    this.removeLayer(currentSpotlight._spotlightLayer);
                }

                // Find which points are highlighted by seeing if they are within the spotlight
                var highlightedPoints = turf.pointsWithinPolygon(
                    pointLayer.toGeoJSON(),
                    currentSpotlight._spotlightShape([ev.latlng.lng, ev.latlng.lat])
                );

                // Add the highlighted features to the map as a layer
                currentSpotlight._spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, currentSpotlight._highlightStyle(feature))
                    }
                }).addTo(this);

                // Add the spotlight to the map as a layer
                currentSpotlight._spotlightLayer = L.geoJSON(currentSpotlight._spotlightShape([ev.latlng.lng, ev.latlng.lat]), {
                    style: currentSpotlight._spotlightStyle
                }).addTo(this);

            }

        });

    }

    $.fn.addSpotlight = function(pointLayer, spotlightShape, spotlightStyle, highlightStyle) {

            // Generate a UUID for this spotlight and add it to the spotlight registry
            // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            this[0]._leafletSpotlight[uuid] = {
                "_targetLayer": pointLayer,
                "_spotlightShape": spotlightShape,
                "_spotlightStyle": spotlightStyle,
                "_highlightStyle": highlightStyle
            };

            // Returns this UUID so it can be used to remove the spotlight later if necessary.
            return uuid;

    };

    $.fn.removeSpotlight = function(spotlightUUID) {

        // Remove the spotlight & highlighted feature layers from the map
        if (this[0].hasLayer(this[0]._leafletSpotlight[spotlightUUID]._spotlightLayer)) {
            this[0].removeLayer(this[0]._leafletSpotlight[spotlightUUID]._spotlightHighlightLayer);
        }
        if (this[0].hasLayer(this[0]._leafletSpotlight[spotlightUUID]._spotlightLayer)) {
            this[0].removeLayer(this[0]._leafletSpotlight[spotlightUUID]._spotlightLayer);
        }

        delete this[0]._leafletSpotlight[spotlightUUID];

    }

}( jQuery ));