(function ( $ ) {

    $.fn.spotlight = function() {

        this[0]._leafletSpotlight = {};

    }

    $.fn.addSpotlight = function(pointLayer, spotlightShape, spotlightStyle, highlightStyle) {

            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

            console.log(uuid);

            this[0]._leafletSpotlight[uuid] = {};

            this[0].addEventListener('mousemove', function(ev) {

                if (this.hasLayer(this._leafletSpotlight[uuid]._spotlightHighlightLayer)) {
                    this.removeLayer(this._leafletSpotlight[uuid]._spotlightHighlightLayer);
                }
                if (this.hasLayer(this._leafletSpotlight[uuid]._spotlightLayer)) {
                    this.removeLayer(this._leafletSpotlight[uuid]._spotlightLayer);
                }

                var mouseShape = spotlightShape([ev.latlng.lng, ev.latlng.lat]);

                var highlightedPoints = turf.pointsWithinPolygon(pointLayer.toGeoJSON(), mouseShape);

                this._leafletSpotlight[uuid]._spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, highlightStyle(feature))
                    }
                }).addTo(this);

                this._leafletSpotlight[uuid]._spotlightLayer = L.geoJSON(mouseShape, {
                    style: spotlightStyle
                }).addTo(this);

            });

            return uuid;

    };

    $.fn.removeSpotlight = function(spotlightUUID) {

        if (this[0].hasLayer(this[0]._leafletSpotlight[spotlightUUID]._spotlightLayer)) {
            this[0].removeLayer(this[0]._leafletSpotlight[spotlightUUID]._spotlightHighlightLayer);
        }
        if (this[0].hasLayer(this[0]._leafletSpotlight[spotlightUUID]._spotlightLayer)) {
            this[0].removeLayer(this[0]._leafletSpotlight[spotlightUUID]._spotlightLayer);
        }

        this[0].off("mousemove");

    }

}( jQuery ));