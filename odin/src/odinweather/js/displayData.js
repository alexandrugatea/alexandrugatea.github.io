import { getLocationData, getCurrentData, getForecastData } from "./weatherData";
import { populateLocation, populateCurrent, populateForecast } from "./populateDom";

export default function displayData(data) {
	let formatedLocation = getLocationData(data.location);
	let formatedCurrent = getCurrentData(data.current);
	let formatedForecast = getForecastData(data.forecast, data.location);

	console.log(formatedLocation);
	
	populateLocation(formatedLocation);
	populateCurrent(formatedCurrent);
	populateForecast(formatedForecast);
}
