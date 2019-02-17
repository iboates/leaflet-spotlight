var spotlights = {
	"circle": turf.circle([ev.latlng.lng, ev.latlng.lat], 50, {"steps": 128, "units": "meters"})
	"rectangle": turf.envelope(turf.featureCollection([
                    turf.circle([ev.latlng.lng, ev.latlng.lat], 50, {"steps": 128, "units": "meters"})
                 ]))
}