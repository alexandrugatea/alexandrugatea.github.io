import { populateDOMElement, clear } from "../utils/populateDomElement";
import { getFlag } from "../utils/countryFlags";
import { metricAndImperial } from "../utils/metricAndImperial";
import { astro } from "../utils/sunrisesunseticons";
import { updateTimeContainer } from "../utils/currentTimeTimer";
import { setDayNightClassesOnBody } from "../utils/bodyDayNightClasses";
import { generateIconUrl } from "../utils/setIconPath";
import { willItRain } from "../utils/willItRain";

const location = {
	city: "#locationCity",
	region: "#locationRegion",
	country: "#locationCountry",
	coords: "#locationCoords",
	time: "#locationTime",
};

const current = {
	temp: ".weather-current-temp",
	condition: "#currentText",
	icon: "#currentIcon",
	wind: ".weather-current-wind-values",
	precipitation: ".weather-current-precipitation-values",
	humidity: "#currentHumidity",
	clouds: "#weatherCurrentClouds",
	windDir: "#weatherCurrentWindDir",
	uv: "#weatherCurrentUV",
};

function populateLocation(data) {
	populateDOMElement(location.city, data.city);
	populateDOMElement(location.region, `Region: ${data.region}`);
	populateDOMElement(location.country, `${getFlag(data)} ${data.country}`);
	populateDOMElement(location.coords, `Coords: ${data.lat}, ${data.lon},`);
	updateTimeContainer(data);
}

function populateCurrent(data) {
	setDayNightClassesOnBody(data);
	populateDOMElement(current.temp, metricAndImperial("temp", "&deg", "&deg", data));
	populateDOMElement(current.wind, metricAndImperial("wind", " kph", " mph", data));
	populateDOMElement(current.condition, data.text);
	populateDOMElement(current.icon, generateIconUrl(data), true);
	populateDOMElement(current.humidity, `${data.humidity}<span class="unit">%<span>`);
	populateDOMElement(current.precipitation, metricAndImperial("precipitation", " mm", " in", data));
	populateDOMElement(current.clouds, `${data.clouds}<span class="unit">%<span>`);
	populateDOMElement(current.windDir, data.windDir);
	populateDOMElement(current.uv, data.uv);
}

function populateForecast(data) {
	// Get HTML containers for Hourly and Daily Forecast
	const nextDaysContainer = document.querySelector("#weatherNextDays");
	const weatherHoursContainer = document.querySelector("#weatherHoursContainer");

	// Clear existing Data
	clear(nextDaysContainer);
	clear(weatherHoursContainer);

	// Add Sunrise and Sunset data
	populateDOMElement(".astro", astro(data));

	// Create HTML elements for each Day that is delivered by the API
	data.forecastDays.forEach((day) => {
		// Create HTML template for DayCard
		const dayCardTemplate = `
			<div  class = "weather-card-date">${day.date}</div>
				<img  src   = ${generateIconUrl(day)}>
				<h3   class = "weather-condition">${day.condition}</h3>
				<div  class = "weather-card-details">
				<div  class = "weather-card-temp-min">
					<span class = "temp-icon">lo</span>
					${metricAndImperial("temp.min", "&deg;", "&deg;", day)}
				</div>
				<div  class = "weather-card-divider"> | </div>
				<div  class = "weather-card-temp-max">
					<span class = "temp-icon">hi</span>
					${metricAndImperial("temp.max", "&deg;", "&deg;", day)}
				</div>
				<div class = "weather-day-precip">${willItRain(day)}</div>
			</div>`;

		const dayCard = document.createElement("div");
		dayCard.className = "weather-day-card";
		dayCard.innerHTML = dayCardTemplate;

		nextDaysContainer.appendChild(dayCard);
	});

	data.currentDayHours.forEach((hour) => {
		// Create HTML template for HourCard
		const hourCardTemplate = `
			<div class = "weather-hour-date">${hour.date}</div>
			<div class = "weather-hour-time">${hour.time}</div>
			<img src   = ${generateIconUrl(hour)}>
			<h3  class = "weather-hour-condition">${hour.condition}</h3>
			<div class = "weather-hour-temp">
				<i>device_thermostat</i>
				${metricAndImperial("temp", "&deg;", "&deg;", hour)}
			</div>
			<div class = "weather-hour-precip">
				${willItRain(hour)}
			</div>
			<div class = "weather-hour-wind">
				<i>air</i>
				${metricAndImperial("wind", " kph", " mph", hour)}
			</div>
		`;

		// Create Hour Card Element
		const hourCard = document.createElement("div");
		hourCard.className = "weather-hour-card";
		hourCard.innerHTML = hourCardTemplate;

		// append card to container
		weatherHoursContainer.appendChild(hourCard);
	});
}

export { populateLocation, populateCurrent, populateForecast };
