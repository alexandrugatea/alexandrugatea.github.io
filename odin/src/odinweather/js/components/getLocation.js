/**
 * Retrieves the user's geolocation using the browser's geolocation API.
 * If the user's location is successfully retrieved,
 * it returns an object with latitude, longitude, and a flag indicating that the location is not default.
 *
 * If the user's location retrieval fails,
 * it logs a warning message and returns an object with default London coordinates and a flag indicating that the location is default.
 *
 * @returns {Promise<Object>} A Promise that resolves to an object containing
 * the user's latitude, longitude, and a flag indicating whether the location is default.
 */
async function getLocation() {
	return await new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(data) => {
				const coords = {
					lat: data.coords.latitude,
					lon: data.coords.longitude,
					default: false,
				};
				console.info("Success: Location retrieved from browser. Lat = %s, Lon = %s", coords.lat, coords.lon);
				resolve(coords);
			},
			(err) => {
				console.warn("Warning: %s. Defaulting to London.", err.message);
				const coords = {
					lat: 51.52,
					lon: -0.11,
					default: true,
				};
				resolve(coords);
			}
		);
	});
}

/**
 * Fetches the user's geolocation by calling the getLocation function.
 *
 * @returns {Promise<Object>} A Promise that resolves to an object containing
 * the user's latitude, longitude, and a flag indicating whether the location is default.
 *
 * @example
 * fetchUserLocation().then((location) => {
 *     console.log(`User's location: Lat = ${location.lat}, Lon = ${location.lon}, Default = ${location.default}`);
 * });
 */
async function fetchUserLocation() {
	const location = await getLocation();
	return location;
}

export { fetchUserLocation };
