L.Map.include({

    _spotlightRegistry: {},

});

L.SpotlightHandler = L.Handler.extend({

    addHooks: function() {
        L.DomEvent.on(document, 'mousemove', this._doSomething, this);
    },

    removeHooks: function() {
        L.DomEvent.off(document, 'mousemove', this._doSomething, this);
    },

    _refreshSpotlights: function(ev) {

        // Create a mousemove event listener for this spotlight
        for (var spotlightId in this._map._spotlightRegistry) {
        
            var currentSpotlight = this._map._spotlightRegistry[spotlightId];

            // On each mouse movement, remove the spotlight & highlighted features layer for this._map spotlightId
            if (this._map.hasLayer(currentSpotlight.spotlightHighlightLayer)) {
                this._map.removeLayer(currentSpotlight.spotlightHighlightLayer);
            }
            if (this._map.hasLayer(currentSpotlight.spotlightLayer)) {
                this._map.removeLayer(currentSpotlight.spotlightLayer);
            }

            // Find which points are highlighted by seeing if they are within the spotlight
            var highlightedPoints = turf.pointsWithinPolygon(
                this._map._spotlightRegistry[spotlightId].targetLayer.toGeoJSON(),
                currentSpotlight.spotlightShape([ev.latlng.lng, ev.latlng.lat])
            );

            // Add the highlighted features to the map as a layer
            if (typeof currentSpotlight.highlightStyle !== "function") {
                currentSpotlight.spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, currentSpotlight.highlightStyle)
                    }
                }).addTo(this._map);
            } else {
                currentSpotlight.spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, currentSpotlight.highlightStyle(feature))
                    }
                }).addTo(this._map);
            }

            // Add the spotlight to the map as a layer
            currentSpotlight.spotlightLayer = L.geoJSON(currentSpotlight.spotlightShape([ev.latlng.lng, ev.latlng.lat]), {
                style: currentSpotlight.spotlightStyle
            }).addTo(this._map);

        }
    
    }

});

L.Map.addInitHook('addHandler', 'spotlight', L.SpotlightHandler);

L.Layer.Spotlight = L.Layer.extend({

})