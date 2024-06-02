import getLocation from "./getLocation";
import fetchData from "./fetchData";
import { showLoader, hideLoader } from "./showhideLoader";
import searchCity from "./searchForm.js";
import displayData from "./displayData.js";
import createNotification from "./createNotification.js";

export default function initWeatherApp() {
	getLocation().then((coords) => {
		let lat = coords.lat;
		let lon = coords.lon;
		let apiURL;
		const apiKey = "62853d9a45c1413b89f201737240106";

		if (lat === 0 && lon === 0) {
			// default location, if user disables location
			apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=London&days=7`;
			const message = "Location is Disabled. Retrieving weather data for London";
			createNotification(message);
		} else {
			// location based on lat lon got from navigator
			apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7`;
		}

		// show a loader before starting to fetch data
		showLoader();
		fetchData(apiURL)
			.then((data) => {
				// console.log(data);
				// hide the loader when data was fetched
				hideLoader();

				// display data on DOM
				displayData(data);
			})
			.catch((err) => {
				console.error("Error fetching data: ", err);
			});
	});

	searchCity();
}
