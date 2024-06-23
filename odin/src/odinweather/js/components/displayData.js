import { getLocationData, getCurrentData, getForecastData } from "../api/weatherData";
import { populateLocation, populateCurrent, populateForecast } from "./populateDom";

/**
 * Displays the weather data on the webpage.
 *
 * @param {Object} data - The weather data object containing location, current, and forecast information.
 * @param {Object} data.location - The location data object.
 * @param {Object} data.current - The current weather data object.
 * @param {Object} data.forecast - The forecast weather data object.
 *
 * @returns {void}
 */
function displayData(data) {
	const formatedLocation = getLocationData(data.location);
	const formatedCurrent = getCurrentData(data.current);
	const formatedForecast = getForecastData(data.forecast, data.location, data.current);

	populateLocation(formatedLocation);
	populateCurrent(formatedCurrent);
	populateForecast(formatedForecast);

}

export { displayData };
