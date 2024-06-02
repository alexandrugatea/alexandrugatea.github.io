let intervalId;

function populateLocation(data) {
	const cityNameContainer = document.querySelector("#locationCity");
	const cityRegionContainer = document.querySelector("#locationRegion");
	const cityRegionCountry = document.querySelector("#locationCountry");
	const coordsContainer = document.querySelector("#locationCoords");
	const timeContainer = document.querySelector("#locationTime");

	cityNameContainer.innerHTML = `${data.city}`;
	cityRegionContainer.innerHTML = `Region: ${data.region}, `;
	cityRegionCountry.innerHTML = `Country: ${data.country}.`;
	coordsContainer.innerHTML = `Lat: ${data.lat}, Lon: ${data.lon}`;
	// timeContainer.innerHTML = `${data.localtime.date}, ${data.localtime.time}`;

	if (intervalId) {
        clearInterval(intervalId);
    }

	// Function to update time
    const updateTime = () => {
        const [hours] = data.localtime.time.split(":");
        const now = new Date();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        timeContainer.innerHTML = `${data.localtime.date}, ${formattedTime}`;
    };

    // Initialize the time
    updateTime();

    // Update the time every second
    intervalId = setInterval(updateTime, 1000);
	
}

function populateCurrent(data) {
	const body = document.body;
	body.setAttribute("data-code", data.code);

	const currentTempContainer = document.querySelector(".weather-current-temp");

	generateDualValueFields(currentTempContainer, "temp", "&deg", "&deg", data);

	const currentIconContainer = document.querySelector("#currentIcon");
	currentIconContainer.src = data.icon;

	const currentTextContainer = document.querySelector("#currentText");
	currentTextContainer.innerHTML = data.text;

	// const currentFeelsContainer = document.querySelector('.weather-current-feels');
	// generateDualValueFields(currentFeelsContainer, 'feelsLike', '&deg', '&deg', data);

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

	const weatherNowContainer = document.querySelector("#weatherNow");

	if (data.isDay === 1) {
		body.classList.remove("night");
		body.classList.add("day");

		weatherNowContainer.classList.remove("night");
		weatherNowContainer.classList.add("day");
	} else {
		body.classList.remove("day");
		body.classList.add("night");

		weatherNowContainer.classList.remove("day");
		weatherNowContainer.classList.add("night");
	}
}

function populateForecast(data) {
	const astroContainer = document.querySelector(".astro");
	astroContainer.innerHTML = `
    Sunrise: ${data.forecastDays[0].astro.sunrise} ,
    Sunset: ${data.forecastDays[0].astro.sunset}`;

	const nextDaysContainer = document.querySelector("#weatherNextDays");
	nextDaysContainer.innerHTML = "";

	data.forecastDays.forEach((day) => {
		const dayCard = document.createElement("div");
		dayCard.className = "weather-day-card";

		const dayDate = document.createElement("div");
		dayDate.className = "weather-card-date";
		dayDate.innerHTML = day.date;

		const dayIcon = document.createElement("img");
		dayIcon.setAttribute("src", day.conditionIcon);
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

	data.currentDayHours.forEach((hour) => {
		const hourCard = document.createElement("div");
		hourCard.className = "weather-hour-card";

		// time
		const hourDate = document.createElement("div");
		hourDate.classList.add("weather-hour-value");
		hourDate.innerHTML = hour.date;

		// time
		const hourValue = document.createElement("div");
		hourValue.classList.add("weather-hour-value");
		hourValue.innerHTML = hour.time;

		// condition icon
		const hourIcon = document.createElement("img");
		hourIcon.setAttribute("src", hour.conditionIcon);
		hourIcon.setAttribute("alt", hour.condition);

		// condution text
		const hourCondition = document.createElement("h3");
		hourCondition.classList.add("weather-hour-condition");
		hourCondition.innerHTML = hour.condition;

		// temp
		const hourTemp = document.createElement("div");
		hourTemp.classList.add("weather-hour-temp");

		const hourTempIcon = document.createElement("span");
		hourTempIcon.classList.add("icon");
		hourTempIcon.textContent = "thermometer";

		const hourTempValues = document.createElement("div");
		generateDualValueFields(hourTempValues, "temp", "&deg;", "&deg;", hour);
		hourTemp.appendChild(hourTempIcon);
		hourTemp.appendChild(hourTempValues);

		// precip
		const hourPrecip = document.createElement("div");
		hourPrecip.classList.add("weather-hour-precip");

		const hourPrecipIcon = document.createElement("span");
		hourPrecipIcon.classList.add("icon");
		hourPrecipIcon.textContent = "rainy";

		const hourPrecipValues = document.createElement("div");
		generateDualValueFields(hourPrecipValues, "precip", " mm", " in", hour);
		hourPrecip.appendChild(hourPrecipIcon);
		hourPrecip.appendChild(hourPrecipValues);

		// wind
		const hourWind = document.createElement("div");
		hourWind.classList.add("weather-hour-wind");

		const hourWindIcon = document.createElement("span");
		hourWindIcon.classList.add("icon");
		hourWindIcon.textContent = "air";

		const hourWindValues = document.createElement("div");
		generateDualValueFields(hourWindValues, "wind", " mm", " in", hour);
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

function generateDualValueFields(container, valuePath, unitM, unitI, data) {
	const value = resolveValuePath(data, valuePath);
	const metricContainer = document.createElement("span");
	const imperialContainer = document.createElement("span");

	metricContainer.classList.add("metric");
	imperialContainer.classList.add("imperial");

	metricContainer.innerHTML = `${value.metric}<span class="unit">${unitM}</span>`;
	imperialContainer.innerHTML = `${value.imperial}<span class="unit">${unitI}</span>`;

	container.innerHTML = "";
	container.classList.add("dual-value");
	container.appendChild(metricContainer);
	container.appendChild(imperialContainer);
}

function resolveValuePath(obj, path) {
	return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export { populateLocation, populateCurrent, populateForecast };
