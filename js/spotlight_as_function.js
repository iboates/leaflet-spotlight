(function ( $ ) {

    $.fn.spotlight = function(toggle, pointLayer, spotlightShape, spotlightStyle, highlightStyle) {

        if (toggle == "on") {

            this[0].addEventListener('mousemove', function(ev) {

                if (this.hasLayer(this._leafletSpotlight_spotlightHighlightLayer)) {
                    this.removeLayer(this._leafletSpotlight_spotlightHighlightLayer);
                }
                if (this.hasLayer(this._leafletSpotlight_spotlightLayer)) {
                    this.removeLayer(this._leafletSpotlight_spotlightLayer);
                }

                var  mouseShape = spotlightShape([ev.latlng.lng, ev.latlng.lat]);

                var highlightedPoints = turf.pointsWithinPolygon(pointLayer.toGeoJSON(), mouseShape);

                this._leafletSpotlight_spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, highlightStyle(feature))
                    }
                }).addTo(this);

                this._leafletSpotlight_spotlightLayer = L.geoJSON(mouseShape, {
                    style: spotlightStyle
                }).addTo(this);

            });

        } else if (toggle == "off") {

            if (this[0].hasLayer(this[0]._leafletSpotlight_spotlightLayer)) {
                this[0].removeLayer(this[0]._leafletSpotlight_spotlightHighlightLayer);
            }
            if (this[0].hasLayer(this[0]._leafletSpotlight_spotlightLayer)) {
                this[0].removeLayer(this[0]._leafletSpotlight_spotlightLayer);
            }

            this[0].off("mousemove");

        }

    };

}( jQuery ));