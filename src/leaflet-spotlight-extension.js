L.Map.include({

    _spotlightRegistry: {},

    addSpotlight: function(spotlight) {
        this._spotlightRegistry[spotlight.id] = spotlight.options;
    },

    removeSpotlight: function(spotlight) {
        this.removeLayer(this._spotlightRegistry[spotlight.id].spotlightLayer);
        this.removeLayer(this._spotlightRegistry[spotlight.id].spotlightHighlightLayer);
        delete this._spotlightRegistry[spotlight.id];
    },

    hasSpotlight: function(spotlight) {
    console.log(spotlight);
        if (this._spotlightRegistry[spotlight.id] == spotlight.options) {
            return true
        } else {
            return false
        }
    }

});

L.SpotlightHandler = L.Handler.extend({

    addHooks: function() {
        this._map.addEventListener('mousemove', this._refreshSpotlights);
    },

    _refreshSpotlights: function(ev) {

        // Create a mousemove event listener for this spotlight
        for (var spotlightId in this._spotlightRegistry) {

            var _map = this;
            var currentSpotlight = this._spotlightRegistry[spotlightId];

            // On each mouse movement, remove the spotlight & highlighted features layer for this._map spotlightId
            if (this.hasLayer(currentSpotlight.spotlightHighlightLayer)) {
                this.removeLayer(currentSpotlight.spotlightHighlightLayer);
            }
            if (this.hasLayer(currentSpotlight.spotlightLayer)) {
                this.removeLayer(currentSpotlight.spotlightLayer);
            }

            // Find which points are highlighted by seeing if they are within the spotlight
            var highlightedPoints = turf.pointsWithinPolygon(
                this._spotlightRegistry[spotlightId].targetLayer.toGeoJSON(),
                currentSpotlight.spotlightShape([ev.latlng.lng, ev.latlng.lat])
            );

            if (currentSpotlight.spotlightType == 'circleMarker') {

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

            } else if (currentSpotlight.spotlightType == 'marker') {

                // Add the highlighted features to the map as a layer
                if (typeof currentSpotlight.markerOptions !== "function") {
                    currentSpotlight.spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                        pointToLayer: function (feature, latlng) {
                            return L.marker(latlng, currentSpotlight.markerOptions)
                        }
                    }).addTo(this);
                } else {
                currentSpotlight.spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                        pointToLayer: function (feature, latlng) {
                            return L.marker(latlng, currentSpotlight.markerOptions(feature))
                        }
                    }).addTo(this);
                }

            } else if (currentSpotlight.spotlightType == 'popup') {

                currentSpotlight.spotlightHighlightLayer = L.geoJSON(highlightedPoints, {

                    pointToLayer: function (feature, latlng) {

                        var marker = L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: L.Icon.Default
                            })
                        });

                        marker.bindPopup(currentSpotlight.popupContent(feature));

                        return marker

                    }

                })

                currentSpotlight.spotlightHighlightLayer.on("add", function (event) {
                    event.target.openPopup();
                }).addTo(this);

            }

            // Add the spotlight to the map as a layer
            currentSpotlight.spotlightLayer = L.geoJSON(currentSpotlight.spotlightShape([ev.latlng.lng, ev.latlng.lat]), {
                style: currentSpotlight.spotlightStyle
            }).addTo(this);

        }

    }

});

L.Map.addInitHook('addHandler', 'spotlight', L.SpotlightHandler);

L.Spotlight = L.Class.extend({

    options: {
        spotlightType: 1,
        highlightStyle: 1,
        spotlightShape: 1,
        spotlightStyle: 1,
        markerOptions: 1,
        targetLayer: 1
    },

    initialize: function(options) {
        this.id = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
          );
        L.setOptions(this, options);
    },

    addTo: function(map) {
        map.addSpotlight(this);
    }

});

L.spotlight = function(id, options) {
    return new L.Spotlight(id, options);
};