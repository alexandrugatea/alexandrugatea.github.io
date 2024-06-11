import "./scss/style.scss";
import { fetchUserLocation } from "./js/components/getLocation.js";
import { getWeatherApiURL } from "./js/api/api.js";
import { initWeatherApp } from "./js/init";

document.addEventListener("DOMContentLoaded", async function () {
    
	// getting user's location from the browser
	// this function returns real coordinates, if user allows location services
	// or defaults to London, in which case it will return London's lat and lon.
	const userLocation = await fetchUserLocation();
    
	// construct a weather api url, based on user location
	const weatherApiURL = getWeatherApiURL({ lat: userLocation.lat, lon: userLocation.lon });
	
	// init weather app on DOM load
	initWeatherApp(weatherApiURL);
});
