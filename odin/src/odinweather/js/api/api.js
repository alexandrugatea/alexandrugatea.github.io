// set api's base url and params

const api = {
	location: {
		url: `https://api.locationiq.com/v1/autocomplete.php`,
		params: {
			key: "pk.fa6e80804f9289787659846f822b3ee3",
			q: "",
			limit: 10,
			dedupe: 0,
			normalizecity: 1,
			tag: "place:*",
		},
	},
	weather: {
		url: `https://api.weatherapi.com/v1/forecast.json`,
		params: {
			key: "62853d9a45c1413b89f201737240106",
			days: 7,
		},
	},
};

/**
 * Function to generate the URL for LocationIQ API.
 *
 * @param {string} query - The search query for location.
 * @returns {string} - The URL for LocationIQ API with the provided query.
 * @throws Will throw an error if the query is not provided.
 * @example
 * getLocationApiURL("New York");
 * // returns "https://api.locationiq.com/v1/autocomplete.php?key=pk.fa6e80804f9289787659846f822b3ee3&q=New%20York&limit=5&dedupe=1"
 */
function getLocationApiURL(query) {
	const location = { ...api.location };
	location.params.q = query;
	return populateParams(location.url, location.params);
}

/**
 * Function to generate the URL for Weather API.
 *
 * @param {Object} options - The options for the weather API.
 * @param {string} [options.city] - The city name for the weather forecast.
 * @param {number} [options.lat] - The latitude for the weather forecast.
 * @param {number} [options.lon] - The longitude for the weather forecast.
 * @returns {string} - The URL for Weather API with the provided options.
 * @throws Will throw an error if neither city nor both lat and lon are provided.
 * @example
 * getWeatherApiURL({ city: "New York" });
 * // returns "https://api.weatherapi.com/v1/forecast.json?key=key&days=7&q=New%20York"
 *
 * getWeatherApiURL({ lat: 40.7128, lon: -74.0060 });
 * // returns "https://api.weatherapi.com/v1/forecast.json?key=key&days=7&q=40.7128,-74.0060"
 */
function getWeatherApiURL({ city = null, lat = null, lon = null }) {
	const weather = { ...api.weather };
	const params = { ...weather.params };

	if (city) {
		params.q = encodeURIComponent(city);
	} else if (lat !== null && lon !== null) {
		params.q = `${lat},${lon}`;
	} else {
		throw new Error("Either city or both lat and lon must be provided");
	}

	return populateParams(weather.url, params);
}

/**
 * Function to populate URL parameters.
 *
 * @param {string} baseUrl - The base URL for the API request.
 * @param {Object} params - The parameters to be appended to the base URL.
 * @returns {string} - The URL with the appended parameters.
 */
function populateParams(baseUrl, params) {
	const queryString = Object.keys(params)
		.map((key) => `${key}=${params[key]}`)
		.join("&");
	return `${baseUrl}?${queryString}`;
}

export { api, getLocationApiURL, getWeatherApiURL };
