import { fetchAndDisplayData } from "./api/fetchData";
import { changeUnits } from "./utils/changeUnits";
import { updateTime } from "./utils/localTime";
import { dragHours } from "./utils/drag";
import { searchCity } from "./components/searchCity";
import { fetchUserLocation } from "./components/getLocation";
import { getWeatherApiURL } from "./api/api";

let currentDisplayedLocation = null;

function initWeatherApp(initialWeatherUrl) {
	currentDisplayedLocation = initialWeatherUrl;
	fetchAndDisplayData(initialWeatherUrl);

	const refreshButton = document.getElementById("refresh");
	refreshButton.onclick = function () {
		fetchAndDisplayData(currentDisplayedLocation);
		this.classList.add("rotate");

		setTimeout(() => {
            this.classList.remove("rotate");
        }, 350);
	};

	const locateMeButton = document.getElementById("locateMe");
	locateMeButton.onclick = async function () {
		const userLocation = await fetchUserLocation();
		const userWeatherApiURL = getWeatherApiURL({ lat: userLocation.lat, lon: userLocation.lon });
		currentDisplayedLocation = userWeatherApiURL;
		fetchAndDisplayData(userWeatherApiURL);
	};

	changeUnits();
	setInterval(updateTime, 1000);
	updateTime();
	dragHours();
	searchCity(updateCurrentLocation);
}

function updateCurrentLocation(newLocationUrl) {
	currentDisplayedLocation = newLocationUrl;
}

export { initWeatherApp };
