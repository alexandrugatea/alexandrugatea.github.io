async function getLocation() {
	return await new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(data) => {
				const coords = {
					lat: data.coords.latitude,
					lon: data.coords.longitude,
					default: false
				};
				console.info("Success: Location retrieved from browser. Lat = %s, Lon = %s", coords.lat, coords.lon)
				resolve(coords);
			},
			(err) => {
				console.warn("Warning: %s. Defaulting to London.", err.message);
				const coords = {
					lat: 51.52,
					lon: -0.11,
					default: true
				};
				resolve(coords);
			}
		);
	})
}

async function fetchUserLocation() {
    const location = await getLocation();
    return location;
}

export  { fetchUserLocation }