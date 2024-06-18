import { populateDOMElement } from "../utils/populateDomElement";
import { getFlag } from "../utils/countryFlags";
import { generateDualValueFields } from "../utils/generateDualValueFields";
import { sunriseIcon, sunsetIcon } from "../utils/sunrisesunseticons";
import { updateTimeContainer } from "../utils/currentTimeTimer";
import { setDayNightClassesOnBody } from "../utils/bodyDayNightClasses";


function populateLocation(data) {
	populateDOMElement("#locationCity", `${data.city}`);
	populateDOMElement("#locationRegion", `Region: ${data.region} `);
	populateDOMElement("#locationCountry", `${getFlag(data)} ${data.country}`);
	populateDOMElement("#locationCoords", `${data.lat}, ${data.lon}`);
	updateTimeContainer(data);
}



function populateCurrent(data) {
	setDayNightClassesOnBody(data);

	const currentTempContainer = document.querySelector(".weather-current-temp");

	generateDualValueFields(currentTempContainer, "temp", "&deg", "&deg", data);


	const currentIconContainer = document.querySelector("#currentIcon");
	currentIconContainer.src = generateIconUrl(data);

	const currentTextContainer = document.querySelector("#currentText");
	currentTextContainer.innerHTML = data.text;


	const currentHumidityContainer = document.querySelector("#currentHumidity");
	currentHumidityContainer.innerHTML = `${data.humidity}<span class="unit">%<span>`;

	const currentWindContainer = document.querySelector(".weather-current-wind-values");
	generateDualValueFields(currentWindContainer, "wind", " kph", " mph", data);

	const currentPrecipContainer = document.querySelector(".weather-current-precipitation-values");
	generateDualValueFields(currentPrecipContainer, "precipitation", " mm", " in", data);

	const currentCloudsContainer = document.querySelector("#weatherCurrentClouds");
	currentCloudsContainer.innerHTML = `${data.clouds}<span class="unit">%<span>`;

	const currentWindDirContainer = document.querySelector("#weatherCurrentWindDir");
	currentWindDirContainer.innerHTML = `${data.windDir}`;

	const currentUVContainer = document.querySelector("#weatherCurrentUV");
	currentUVContainer.innerHTML = `${data.uv}`;

}



function populateForecast(data) {
	const astroContainer = document.querySelector(".astro");
	astroContainer.innerHTML = `
    <span>${sunriseIcon} ${data.forecastDays[0].astro.sunrise}</span>
    <span>${sunsetIcon} ${data.forecastDays[0].astro.sunset}</span>`;

	const nextDaysContainer = document.querySelector("#weatherNextDays");
	nextDaysContainer.innerHTML = "";

	data.forecastDays.forEach((day) => {
		const dayCard = document.createElement("div");
		dayCard.className = "weather-day-card";

		const dayDate = document.createElement("div");
		dayDate.className = "weather-card-date";
		dayDate.innerHTML = day.date;

		const dayIcon = document.createElement("img");
		// dayIcon.setAttribute("src", day.conditionIcon);
		dayIcon.setAttribute("src", generateIconUrl(day));
		dayIcon.setAttribute("alt", day.condition);

		const dayCondition = document.createElement("h3");
		dayCondition.classList.add("weather-condition");
		dayCondition.innerHTML = day.condition;

		const dayDetailsContainer = document.createElement("div");
		dayDetailsContainer.className = "weather-card-details";

		const tempContainerMin = document.createElement("div");
		tempContainerMin.classList.add("weather-card-temp-min");

		const tempContainerMinIcon = document.createElement("span");
		tempContainerMinIcon.classList.add("temp-icon");
		tempContainerMinIcon.textContent = "lo";

		const tempContainerMinDual = document.createElement("div");
		tempContainerMinDual.classList.add("weather-day-duals");
		generateDualValueFields(tempContainerMinDual, "temp.min", "&deg;", "&deg;", day);

		tempContainerMin.appendChild(tempContainerMinIcon);
		tempContainerMin.appendChild(tempContainerMinDual);

		const divider = document.createElement("div");
		divider.classList.add("weather-card-divider");
		divider.innerHTML = " | ";

		const tempContainerMax = document.createElement("div");
		tempContainerMax.classList.add("weather-card-temp-max");

		const tempContainerMaxIcon = document.createElement("span");
		tempContainerMaxIcon.classList.add("temp-icon");
		tempContainerMaxIcon.textContent = "hi";

		const tempContainerMaxDual = document.createElement("div");
		tempContainerMaxDual.classList.add("weather-day-duals");
		generateDualValueFields(tempContainerMaxDual, "temp.max", "&deg;", "&deg;", day);

		tempContainerMax.appendChild(tempContainerMaxIcon);
		tempContainerMax.appendChild(tempContainerMaxDual);

		const dayPrecip = document.createElement("div");
		dayPrecip.classList.add("weather-day-precip");

		const dayPrecipIcon = document.createElement("span");
		dayPrecipIcon.classList.add("icon");
		dayPrecipIcon.textContent = "rainy";

		const dayPrecipValues = document.createElement("div");
		generateDualValueFields(dayPrecipValues, "precip", " mm", " in", day);

		dayPrecip.appendChild(dayPrecipIcon);
		dayPrecip.appendChild(dayPrecipValues);

		dayDetailsContainer.appendChild(tempContainerMin);
		dayDetailsContainer.appendChild(divider);
		dayDetailsContainer.appendChild(tempContainerMax);
		dayDetailsContainer.appendChild(dayPrecip);

		//Construct the Weather Day Card
		dayCard.appendChild(dayDate);
		dayCard.appendChild(dayIcon);
		dayCard.appendChild(dayCondition);
		dayCard.appendChild(dayDetailsContainer);

		nextDaysContainer.appendChild(dayCard);
	});

	const weatherHoursContainer = document.querySelector("#weatherHoursContainer");
	weatherHoursContainer.innerHTML = "";
	weatherHoursContainer.setAttribute("draggable", "false");

	data.currentDayHours.forEach((hour, index) => {
		const hourCard = document.createElement("div");
		hourCard.className = "weather-hour-card";
		hourCard.setAttribute("draggable", "false");

		// time
		const hourDate = document.createElement("div");
		hourDate.classList.add("weather-hour-value");
		hourDate.innerHTML = hour.date;

		// time
		const hourValue = document.createElement("div");
		hourValue.classList.add("weather-hour-value");
		
		if (index === 0) {
			hourValue.innerHTML = `<span class="weather-hour-value-now">now</span>`;
		} else {
			hourValue.innerHTML = hour.time;
		}

		// condition icon
		const hourIcon = document.createElement("img");
		// hourIcon.setAttribute("src", hour.conditionIcon);
		hourIcon.setAttribute("src", generateIconUrl(hour));
		hourIcon.setAttribute("alt", hour.condition);
		hourIcon.setAttribute("draggable", "false");

		// condution text
		const hourCondition = document.createElement("h3");
		hourCondition.classList.add("weather-hour-condition");
		hourCondition.innerHTML = hour.condition;

		// temp
		const hourTemp = document.createElement("div");
		hourTemp.classList.add("weather-hour-temp");

		const hourTempIcon = document.createElement("span");
		hourTempIcon.classList.add("icon");

		const hourTempValues = document.createElement("div");
		generateDualValueFields(hourTempValues, "temp", "&deg;", "&deg;", hour);
		hourTemp.appendChild(hourTempIcon);
		hourTemp.appendChild(hourTempValues);



		// precip
		const hourPrecip = document.createElement("div");
		hourPrecip.classList.add("weather-hour-precip");

		const hourPrecipIcon = document.createElement("span");
		hourPrecipIcon.classList.add("icon");

		const hourPrecipValues = document.createElement("div");
		generateDualValueFields(hourPrecipValues, "precip", " mm", " in", hour);
		
		const hourRainSnowChance = document.createElement("div");
		hourRainSnowChance.classList.add("weather-rain-snow-chance");

		const rainChance = parseInt(hour.chanceOfRain);
		const snowChance = parseInt(hour.chanceOfSnow);

		if (rainChance >= snowChance)  {
			hourRainSnowChance.textContent = `${rainChance}%`
			hourPrecipIcon.textContent = "rainy";
		} else {
			hourRainSnowChance.textContent = `${snowChance}%`
			hourPrecipIcon.textContent = "ac_unit";
		}
		
		hourPrecip.appendChild(hourPrecipIcon);
		hourPrecip.appendChild(hourRainSnowChance);

		// wind
		const hourWind = document.createElement("div");
		hourWind.classList.add("weather-hour-wind");

		const hourWindIcon = document.createElement("span");
		hourWindIcon.classList.add("icon");
		hourWindIcon.textContent = "air";

		const hourWindValues = document.createElement("div");
		generateDualValueFields(hourWindValues, "wind", " kph", " mph", hour);
		hourWind.appendChild(hourWindIcon);
		hourWind.appendChild(hourWindValues);

		// construct card
		hourCard.appendChild(hourDate);
		hourCard.appendChild(hourValue);
		hourCard.appendChild(hourIcon);
		hourCard.appendChild(hourCondition);
		hourCard.appendChild(hourTemp);
		hourCard.appendChild(hourPrecip);
		hourCard.appendChild(hourWind);

		// append card to container
		weatherHoursContainer.appendChild(hourCard);
	});
}



function generateIconUrl(data) {
	const dn = data.iconCode.dayOrNight;
	const code = data.iconCode.code;
	return `images/icons/${code}-${dn}.svg`;
}

export { populateLocation, populateCurrent, populateForecast };
