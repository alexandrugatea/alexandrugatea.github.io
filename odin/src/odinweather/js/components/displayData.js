import { getLocationData, getCurrentData, getForecastData } from "../api/weatherData";
import { populateLocation, populateCurrent, populateForecast } from "./populateDom";

function displayData(data) {
    const formatedLocation = getLocationData(data.location);
    const formatedCurrent = getCurrentData(data.current);
    const formatedForecast = getForecastData(data.forecast, data.location);

    populateLocation(formatedLocation);
    populateCurrent(formatedCurrent);
    populateForecast(formatedForecast);
}

export { displayData }