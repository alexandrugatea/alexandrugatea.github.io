/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/odinweather/js/api/api.js":
/*!***************************************!*\
  !*** ./src/odinweather/js/api/api.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   api: function() { return /* binding */ api; },
/* harmony export */   getLocationApiURL: function() { return /* binding */ getLocationApiURL; },
/* harmony export */   getWeatherApiURL: function() { return /* binding */ getWeatherApiURL; }
/* harmony export */ });
// set api's base url and params

const api = {
  location: {
    url: `https://api.locationiq.com/v1/autocomplete.php`,
    params: {
      key: "pk.fa6e80804f9289787659846f822b3ee3",
      q: "",
      limit: 7,
      dedupe: 1,
      normalizecity: 1,
      tag: "place:*"
    }
  },
  weather: {
    url: `https://api.weatherapi.com/v1/forecast.json`,
    params: {
      key: "62853d9a45c1413b89f201737240106",
      days: 7
    }
  }
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
  const location = {
    ...api.location
  };
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
function getWeatherApiURL(_ref) {
  let {
    city = null,
    lat = null,
    lon = null
  } = _ref;
  const weather = {
    ...api.weather
  };
  const params = {
    ...weather.params
  };
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
  const queryString = Object.keys(params).map(function (key) {
    return `${key}=${params[key]}`;
  }).join('&');
  return `${baseUrl}?${queryString}`;
}


/***/ }),

/***/ "./src/odinweather/js/api/fetchData.js":
/*!*********************************************!*\
  !*** ./src/odinweather/js/api/fetchData.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAndDisplayData: function() { return /* binding */ fetchAndDisplayData; },
/* harmony export */   fetchData: function() { return /* binding */ fetchData; }
/* harmony export */ });
/* harmony import */ var _components_displayData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/displayData */ "./src/odinweather/js/components/displayData.js");
/* harmony import */ var _utils_createNotification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/createNotification */ "./src/odinweather/js/utils/createNotification.js");
/* harmony import */ var _utils_showhideLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/showhideLoader */ "./src/odinweather/js/utils/showhideLoader.js");




//Fetches data from a given URL using the Fetch API.
async function fetchData(url) {
  const response = await fetch(url, {
    mode: "cors"
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

/**
 * Fetches data from a given URL and displays it.
 *
 * @param {string} url - The URL from which to fetch data.
 * @returns {void}
 * @throws Will throw an error if the network response is not ok.
 */
function fetchAndDisplayData(url) {
  // Show loading indicator
  (0,_utils_showhideLoader__WEBPACK_IMPORTED_MODULE_2__.showLoader)();

  // Fetch data from the provided URL
  fetchData(url).then(function (data) {
    // console.log(data); // Debug

    // Hide loading indicator
    (0,_utils_showhideLoader__WEBPACK_IMPORTED_MODULE_2__.hideLoader)();

    // Display the fetched data
    (0,_components_displayData__WEBPACK_IMPORTED_MODULE_0__.displayData)(data);
  }).catch(function (err) {
    // Log error to console
    console.error("Error fetching data: ", err);

    // Show a notification to the user
    (0,_utils_createNotification__WEBPACK_IMPORTED_MODULE_1__.createNotification)("Location not found", "toast");

    // Hide loading indicator
    (0,_utils_showhideLoader__WEBPACK_IMPORTED_MODULE_2__.hideLoader)();
  });
}


/***/ }),

/***/ "./src/odinweather/js/api/weatherData.js":
/*!***********************************************!*\
  !*** ./src/odinweather/js/api/weatherData.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentData: function() { return /* binding */ getCurrentData; },
/* harmony export */   getForecastData: function() { return /* binding */ getForecastData; },
/* harmony export */   getLocationData: function() { return /* binding */ getLocationData; }
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/format.mjs");

function getLocationData(data) {
  const [date, time] = data.localtime.split(" ");
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);
  return {
    country: data.country,
    city: data.name,
    lat: data.lat,
    lon: data.lon,
    localtime: {
      date: formattedDate,
      time: formattedTime
    },
    tz_id: data.tz_id,
    region: data.region
  };
}
function getCurrentData(data) {
  return {
    clouds: data.cloud,
    code: data.condition.code,
    icon: data.condition.icon,
    iconCode: extractIconCode(data.condition.icon),
    text: data.condition.text,
    humidity: data.humidity,
    uv: data.uv,
    windDir: data.wind_dir,
    feelsLike: {
      metric: data.feelslike_c,
      imperial: data.feelslike_f
    },
    temp: {
      metric: data.temp_c,
      imperial: Math.round(data.temp_f)
    },
    wind: {
      metric: data.wind_kph,
      imperial: data.wind_mph
    },
    precipitation: {
      metric: data.precip_mm,
      imperial: data.precip_in
    },
    isDay: data.is_day
  };
}
function getForecastData(data, location) {
  const forecastDays = data.forecastday.map(function (day) {
    return {
      date: formatDate(day.date),
      astro: {
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset
      },
      condition: day.day.condition.text,
      conditionIcon: day.day.condition.icon,
      iconCode: extractIconCode(day.day.condition.icon),
      chanceOfRain: day.day.daily_chance_of_rain,
      chanceOfSnow: day.day.daily_chance_of_snow,
      temp: {
        max: {
          metric: day.day.maxtemp_c,
          imperial: day.day.maxtemp_f
        },
        min: {
          metric: day.day.mintemp_c,
          imperial: day.day.mintemp_f
        }
      },
      precip: {
        metric: day.day.totalprecip_mm,
        imperial: day.day.totalprecip_in
      }
    };
  });
  const currentDate = new Date(location.localtime);
  const currentHour = currentDate.getHours();
  let next24Hours = [];
  const currentDayHours = data.forecastday[0].hour.slice(currentHour + 1);

  // Get the hours from the next day(s) if needed
  let remainingHours = 24 - currentDayHours.length;
  if (remainingHours > 0) {
    for (let i = 1; i < data.forecastday.length && remainingHours > 0; i++) {
      const nextDayHours = data.forecastday[i].hour.slice(0, remainingHours);
      next24Hours = next24Hours.concat(nextDayHours);
      remainingHours -= nextDayHours.length;
    }
  }
  next24Hours = currentDayHours.concat(next24Hours);
  next24Hours = next24Hours.map(function (hour) {
    const time = hour.time.split(" ")[1];
    const date = hour.time.split(" ")[0];
    return {
      date: formatDayDate(date),
      time: time,
      temp: {
        metric: hour.temp_c,
        imperial: hour.temp_f
      },
      feelsLike: {
        metric: hour.feelslike_c,
        imperial: hour.feelslike_f
      },
      precip: {
        metric: hour.precip_mm,
        imperial: hour.precip_in
      },
      wind: {
        metric: hour.wind_kph,
        imperial: hour.wind_mph
      },
      condition: hour.condition.text,
      conditionIcon: hour.condition.icon,
      iconCode: extractIconCode(hour.condition.icon),
      chanceOfRain: hour.chance_of_rain,
      chanceOfSnow: hour.chance_of_snow
    };
  });
  return {
    forecastDays,
    currentDayHours: next24Hours
  };
}
const formatDate = function (value) {
  const formattedDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.format)(value, "E, MMMM do, yyyy");
  return formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
};
const formatDayDate = function (value) {
  const formattedDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.format)(value, "E, do");
  return formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
};
const formatTime = function (timeString) {
  const [hours] = timeString.split(":");
  const mins = new Date().getMinutes().toString().padStart(2, "0");
  const seconds = new Date().getSeconds().toString().padStart(2, "0");
  const formattedTime = `${hours.padStart(2, "0")}:${mins}:${seconds}`;
  return formattedTime;
};
const extractIconCode = function (data) {
  const [dayOrNight, code] = [data.split('/')[5], data.split('/')[6].split('.')[0]];
  return {
    dayOrNight,
    code
  };
};


/***/ }),

/***/ "./src/odinweather/js/components/displayData.js":
/*!******************************************************!*\
  !*** ./src/odinweather/js/components/displayData.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayData: function() { return /* binding */ displayData; }
/* harmony export */ });
/* harmony import */ var _api_weatherData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/weatherData */ "./src/odinweather/js/api/weatherData.js");
/* harmony import */ var _populateDom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./populateDom */ "./src/odinweather/js/components/populateDom.js");



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
  const formatedLocation = (0,_api_weatherData__WEBPACK_IMPORTED_MODULE_0__.getLocationData)(data.location);
  const formatedCurrent = (0,_api_weatherData__WEBPACK_IMPORTED_MODULE_0__.getCurrentData)(data.current);
  const formatedForecast = (0,_api_weatherData__WEBPACK_IMPORTED_MODULE_0__.getForecastData)(data.forecast, data.location);
  (0,_populateDom__WEBPACK_IMPORTED_MODULE_1__.populateLocation)(formatedLocation);
  (0,_populateDom__WEBPACK_IMPORTED_MODULE_1__.populateCurrent)(formatedCurrent);
  (0,_populateDom__WEBPACK_IMPORTED_MODULE_1__.populateForecast)(formatedForecast);
}


/***/ }),

/***/ "./src/odinweather/js/components/getLocation.js":
/*!******************************************************!*\
  !*** ./src/odinweather/js/components/getLocation.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchUserLocation: function() { return /* binding */ fetchUserLocation; }
/* harmony export */ });
/**
 * Retrieves the user's geolocation using the browser's geolocation API.
 * If the user's location is successfully retrieved,
 * it returns an object with latitude, longitude, and a flag indicating that the location is not default.
 *
 * If the user's location retrieval fails,
 * it logs a warning message and returns an object with default London coordinates and a flag indicating that the location is default.
 *
 * @returns {Promise<Object>} A Promise that resolves to an object containing
 * the user's latitude, longitude, and a flag indicating whether the location is default.
 */
async function getLocation() {
  return await new Promise(function (resolve) {
    navigator.geolocation.getCurrentPosition(function (data) {
      const coords = {
        lat: data.coords.latitude,
        lon: data.coords.longitude,
        default: false
      };
      console.info("Success: Location retrieved from browser. Lat = %s, Lon = %s", coords.lat, coords.lon);
      resolve(coords);
    }, function (err) {
      console.warn("Warning: %s. Defaulting to London.", err.message);
      const coords = {
        lat: 51.52,
        lon: -0.11,
        default: true
      };
      resolve(coords);
    });
  });
}

/**
 * Fetches the user's geolocation by calling the getLocation function.
 *
 * @returns {Promise<Object>} A Promise that resolves to an object containing
 * the user's latitude, longitude, and a flag indicating whether the location is default.
 *
 * @example
 * fetchUserLocation().then((location) => {
 *     console.log(`User's location: Lat = ${location.lat}, Lon = ${location.lon}, Default = ${location.default}`);
 * });
 */
async function fetchUserLocation() {
  const location = await getLocation();
  return location;
}


/***/ }),

/***/ "./src/odinweather/js/components/populateDom.js":
/*!******************************************************!*\
  !*** ./src/odinweather/js/components/populateDom.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateCurrent: function() { return /* binding */ populateCurrent; },
/* harmony export */   populateForecast: function() { return /* binding */ populateForecast; },
/* harmony export */   populateLocation: function() { return /* binding */ populateLocation; }
/* harmony export */ });
/* harmony import */ var _utils_populateDomElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/populateDomElement */ "./src/odinweather/js/utils/populateDomElement.js");
/* harmony import */ var _utils_countryFlags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/countryFlags */ "./src/odinweather/js/utils/countryFlags.js");
/* harmony import */ var _utils_generateDualValueFields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/generateDualValueFields */ "./src/odinweather/js/utils/generateDualValueFields.js");
/* harmony import */ var _utils_sunrisesunseticons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/sunrisesunseticons */ "./src/odinweather/js/utils/sunrisesunseticons.js");
/* harmony import */ var _utils_currentTimeTimer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/currentTimeTimer */ "./src/odinweather/js/utils/currentTimeTimer.js");
/* harmony import */ var _utils_bodyDayNightClasses__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/bodyDayNightClasses */ "./src/odinweather/js/utils/bodyDayNightClasses.js");






function populateLocation(data) {
  (0,_utils_populateDomElement__WEBPACK_IMPORTED_MODULE_0__.populateDOMElement)("#locationCity", `${data.city}`);
  (0,_utils_populateDomElement__WEBPACK_IMPORTED_MODULE_0__.populateDOMElement)("#locationRegion", `Region: ${data.region} `);
  (0,_utils_populateDomElement__WEBPACK_IMPORTED_MODULE_0__.populateDOMElement)("#locationCountry", `${(0,_utils_countryFlags__WEBPACK_IMPORTED_MODULE_1__.getFlag)(data)} ${data.country}`);
  (0,_utils_populateDomElement__WEBPACK_IMPORTED_MODULE_0__.populateDOMElement)("#locationCoords", `${data.lat}, ${data.lon}`);
  (0,_utils_currentTimeTimer__WEBPACK_IMPORTED_MODULE_4__.updateTimeContainer)(data);
}
function populateCurrent(data) {
  (0,_utils_bodyDayNightClasses__WEBPACK_IMPORTED_MODULE_5__.setDayNightClassesOnBody)(data);
  const currentTempContainer = document.querySelector(".weather-current-temp");
  (0,_utils_generateDualValueFields__WEBPACK_IMPORTED_MODULE_2__.generateDualValueFields)(currentTempContainer, "temp", "&deg", "&deg", data);
  const currentIconContainer = document.querySelector("#currentIcon");
  currentIconContainer.src = generateIconUrl(data);
  const currentTextContainer = document.querySelector("#currentText");
  currentTextContainer.innerHTML = data.text;
  const currentHumidityContainer = document.querySelector("#currentHumidity");
  currentHumidityContainer.innerHTML = `${data.humidity}<span class="unit">%<span>`;
  const currentWindContainer = document.querySelector(".weather-current-wind-values");
  (0,_utils_generateDualValueFields__WEBPACK_IMPORTED_MODULE_2__.generateDualValueFields)(currentWindContainer, "wind", " kph", " mph", data);
  const currentPrecipContainer = document.querySelector(".weather-current-precipitation-values");
  (0,_utils_generateDualValueFields__WEBPACK_IMPORTED_MODULE_2__.generateDualValueFields)(currentPrecipContainer, "precipitation", " mm", " in", data);
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
    <span>${_utils_sunrisesunseticons__WEBPACK_IMPORTED_MODULE_3__.sunriseIcon} ${data.forecastDays[0].astro.sunrise}</span>
    <span>${_utils_sunrisesunseticons__WEBPACK_IMPORTED_MODULE_3__.sunsetIcon} ${data.forecastDays[0].astro.sunset}</span>`;
  const nextDaysContainer = document.querySelector("#weatherNextDays");
  nextDaysContainer.innerHTML = "";
  data.forecastDays.forEach(function (day) {
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
    (0,_utils_generateDualValueFields__WEBPACK_IMPORTED_MODULE_2__.generateDualValueFields)(tempContainerMinDual, "temp.min", "&deg;", "&deg;", day);
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
    (0,_utils_generateDualValueFields__WEBPACK_IMPORTED_MODULE_2__.generateDualValueFields)(tempContainerMaxDual, "temp.max", "&deg;", "&deg;", day);
    tempContainerMax.appendChild(tempContainerMaxIcon);
    tempContainerMax.appendChild(tempContainerMaxDual);
    const dayPrecip = document.createElement("div");
    dayPrecip.classList.add("weather-day-precip");
    const dayPrecipIcon = document.createElement("span");
    dayPrecipIcon.classList.add("icon");
    dayPrecipIcon.textContent = "rainy";
    const dayPrecipValues = document.createElement("div");
    (0,_utils_generateDualValueFields__WEBPACK_IMPORTED_MODULE_2__.generateDualValueFields)(dayPrecipValues, "precip", " mm", " in", day);
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
  data.currentDayHours.forEach(function (hour, index) {
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
    (0,_utils_generateDualValueFields__WEBPACK_IMPORTED_MODULE_2__.generateDualValueFields)(hourTempValues, "temp", "&deg;", "&deg;", hour);
    hourTemp.appendChild(hourTempIcon);
    hourTemp.appendChild(hourTempValues);

    // precip
    const hourPrecip = document.createElement("div");
    hourPrecip.classList.add("weather-hour-precip");
    const hourPrecipIcon = document.createElement("span");
    hourPrecipIcon.classList.add("icon");
    const hourPrecipValues = document.createElement("div");
    (0,_utils_generateDualValueFields__WEBPACK_IMPORTED_MODULE_2__.generateDualValueFields)(hourPrecipValues, "precip", " mm", " in", hour);
    const hourRainSnowChance = document.createElement("div");
    hourRainSnowChance.classList.add("weather-rain-snow-chance");
    const rainChance = parseInt(hour.chanceOfRain);
    const snowChance = parseInt(hour.chanceOfSnow);
    if (rainChance >= snowChance) {
      hourRainSnowChance.textContent = `${rainChance}%`;
      hourPrecipIcon.textContent = "rainy";
    } else {
      hourRainSnowChance.textContent = `${snowChance}%`;
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
    (0,_utils_generateDualValueFields__WEBPACK_IMPORTED_MODULE_2__.generateDualValueFields)(hourWindValues, "wind", " kph", " mph", hour);
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


/***/ }),

/***/ "./src/odinweather/js/components/searchCity.js":
/*!*****************************************************!*\
  !*** ./src/odinweather/js/components/searchCity.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   searchCity: function() { return /* binding */ searchCity; }
/* harmony export */ });
/* harmony import */ var _utils_showhideLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/showhideLoader */ "./src/odinweather/js/utils/showhideLoader.js");
/* harmony import */ var _api_fetchData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/fetchData */ "./src/odinweather/js/api/fetchData.js");
/* harmony import */ var _displayData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayData */ "./src/odinweather/js/components/displayData.js");
/* harmony import */ var _utils_createNotification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/createNotification */ "./src/odinweather/js/utils/createNotification.js");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/api */ "./src/odinweather/js/api/api.js");





function searchCity(updateCurrentLocationCallback) {
  const newCityField = document.getElementById("newLocationField");
  const locationForm = document.getElementById("newLocationForm");
  const hiddenField = document.getElementById("valueToFetchWeather");
  const hiddenFieldUI = document.getElementById("valueToDisplyOnUI");
  const searchContainer = document.querySelector(".search-results-container");
  const popularButtons = document.querySelectorAll(".popular-place");
  const dropdown = document.getElementById("searchResults");
  const debounceTimer = 200;
  const mobileSearchTrigger = document.getElementById("mobileSearchTrigger");
  let debounceTimeout;
  let isSubmitted = false;
  mobileSearchTrigger.addEventListener('click', function () {
    locationForm.parentNode.classList.add("mobile-open");
  });
  document.body.addEventListener("click", function (e) {
    const target = document.querySelector('.weather-header');
    if (!target.contains(e.target)) {
      locationForm.parentNode.classList.remove("mobile-open");
      dropdown.innerHTML = "";
      searchContainer.classList.remove("open");
    }
    ;
  });
  newCityField.addEventListener("input", function () {
    hiddenFieldUI.value = newCityField.value;
    clearTimeout(debounceTimeout);
    const query = this.value;
    if (query.length > 2 && !isSubmitted) {
      debounceTimeout = setTimeout(function () {
        const url = (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getLocationApiURL)(query);
        fetch(url).then(function (response) {
          return response.json();
        }).then(function (data) {
          dropdown.innerHTML = "";
          if (!Array.isArray(data) || data.length === 0) {
            throw new Error("No locations found");
          }
          let currentIndex = -1;
          data.forEach(function (location) {
            const option = document.createElement("div");
            option.classList.add("dropdown-item");
            option.innerHTML = `
                                <span class="dropdown-item-content"> 
                                    <span class="dic-name">
                                        <i class="fi fi-${location.address.country_code}"></i>
                                        ${location.display_name}
                                    </span>
                                    <span class="dic-coords">
                                        ${parseFloat(location.lat).toFixed(3)}, 
                                        ${parseFloat(location.lon).toFixed(3)}
                                    </span>
                                </span>
                                `;
            option.setAttribute("data-place", location.display_place);
            option.setAttribute("data-lat-lon", `${location.lat},${location.lon}`);
            option.setAttribute("tabindex", -1);
            dropdown.appendChild(option);
            option.addEventListener("click", function () {
              newCityField.value = option.querySelector('.dic-name').textContent.trim();
              hiddenFieldUI.value = option.getAttribute("data-place");
              hiddenField.value = option.getAttribute("data-lat-lon");
              dropdown.innerHTML = "";
              submitForm(newCityField.value, hiddenField.value);
              locationForm.reset();
              searchContainer.classList.remove("open");
              locationForm.parentNode.classList.remove("mobile-open");
            });
          });
          document.addEventListener("keydown", function (event) {
            const items = dropdown.querySelectorAll(".dropdown-item");
            if (items.length === 0) return;
            if (event.key === "ArrowDown") {
              currentIndex = (currentIndex + 1) % items.length;
              items[currentIndex].focus();
            } else if (event.key === "ArrowUp") {
              currentIndex = (currentIndex - 1 + items.length) % items.length;
              items[currentIndex].focus();
            } else if (event.key === "Enter" && currentIndex >= 0) {
              items[currentIndex].click();
            }
          });
          document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
              dropdown.innerHTML = "";
              locationForm.reset();
            }
          });
        }).catch(function () {
          dropdown.innerHTML = "";
          const userInput = newCityField.value;
          const alert = document.createElement("div");
          alert.classList.add("dropdown-item");
          alert.innerHTML = `No locations found for <strong>"${userInput}"</strong>`;
          dropdown.appendChild(alert);
        });
      }, debounceTimer);
    }
  });
  locationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    dropdown.innerHTML = "";
    if (newCityField.value === "" || newCityField.value.length < 3) {
      (0,_utils_createNotification__WEBPACK_IMPORTED_MODULE_3__.createNotification)("Please type a location", "toast");
      return;
    }
    const newCityName = hiddenFieldUI.value;
    const newCityCoords = hiddenField.value;
    submitForm(newCityName, newCityCoords);
    locationForm.parentNode.classList.remove("mobile-open");
  });
  function submitForm(cityName, cityCoords) {
    let apiURL;
    if (cityCoords) {
      const [lat, lon] = cityCoords.split(',');
      apiURL = (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getWeatherApiURL)({
        lat,
        lon
      });
      console.log("CityCoords %s", apiURL);
    } else if (cityName) {
      apiURL = (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getWeatherApiURL)({
        city: cityName
      });
    } else {
      alert("Please enter a city name");
      return;
    }
    (0,_utils_showhideLoader__WEBPACK_IMPORTED_MODULE_0__.showLoader)();
    (0,_api_fetchData__WEBPACK_IMPORTED_MODULE_1__.fetchData)(apiURL).then(function (data) {
      (0,_utils_showhideLoader__WEBPACK_IMPORTED_MODULE_0__.hideLoader)();
      (0,_displayData__WEBPACK_IMPORTED_MODULE_2__.displayData)(data);
      updateCurrentLocationCallback(apiURL); // Update current displayed location
      locationForm.reset();
      newCityField.blur();
      isSubmitted = false;
    }).catch(function (err) {
      (0,_utils_createNotification__WEBPACK_IMPORTED_MODULE_3__.createNotification)("Location not found", "toast");
      (0,_utils_showhideLoader__WEBPACK_IMPORTED_MODULE_0__.hideLoader)();
    });
  }
  newCityField.addEventListener("click", function () {
    searchContainer.classList.add("open");
  });
  popularButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedCity = button.getAttribute("data-id");
      const apiURL = (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getWeatherApiURL)({
        city: selectedCity
      });
      searchContainer.classList.remove("open");
      (0,_utils_showhideLoader__WEBPACK_IMPORTED_MODULE_0__.showLoader)();
      (0,_api_fetchData__WEBPACK_IMPORTED_MODULE_1__.fetchData)(apiURL).then(function (data) {
        (0,_utils_showhideLoader__WEBPACK_IMPORTED_MODULE_0__.hideLoader)();
        (0,_displayData__WEBPACK_IMPORTED_MODULE_2__.displayData)(data);
        newCityField.blur();
        updateCurrentLocationCallback(apiURL); // Update current displayed location
      }).catch(function (err) {
        (0,_utils_createNotification__WEBPACK_IMPORTED_MODULE_3__.createNotification)("Location not found", "toast");
        (0,_utils_showhideLoader__WEBPACK_IMPORTED_MODULE_0__.hideLoader)();
      });
    });
  });
}
function removeSpecialCharacters(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


/***/ }),

/***/ "./src/odinweather/js/init.js":
/*!************************************!*\
  !*** ./src/odinweather/js/init.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initWeatherApp: function() { return /* binding */ initWeatherApp; }
/* harmony export */ });
/* harmony import */ var _api_fetchData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/fetchData */ "./src/odinweather/js/api/fetchData.js");
/* harmony import */ var _utils_changeUnits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/changeUnits */ "./src/odinweather/js/utils/changeUnits.js");
/* harmony import */ var _utils_localTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/localTime */ "./src/odinweather/js/utils/localTime.js");
/* harmony import */ var _utils_drag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/drag */ "./src/odinweather/js/utils/drag.js");
/* harmony import */ var _components_searchCity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/searchCity */ "./src/odinweather/js/components/searchCity.js");
/* harmony import */ var _components_getLocation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/getLocation */ "./src/odinweather/js/components/getLocation.js");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api/api */ "./src/odinweather/js/api/api.js");







let currentDisplayedLocation = null;
function initWeatherApp(initialWeatherUrl) {
  currentDisplayedLocation = initialWeatherUrl;
  (0,_api_fetchData__WEBPACK_IMPORTED_MODULE_0__.fetchAndDisplayData)(initialWeatherUrl);
  const refreshButton = document.getElementById("refresh");
  refreshButton.onclick = function () {
    (0,_api_fetchData__WEBPACK_IMPORTED_MODULE_0__.fetchAndDisplayData)(currentDisplayedLocation);
  };
  const locateMeButton = document.getElementById("locateMe");
  locateMeButton.onclick = async function () {
    const userLocation = await (0,_components_getLocation__WEBPACK_IMPORTED_MODULE_5__.fetchUserLocation)();
    const userWeatherApiURL = (0,_api_api__WEBPACK_IMPORTED_MODULE_6__.getWeatherApiURL)({
      lat: userLocation.lat,
      lon: userLocation.lon
    });
    currentDisplayedLocation = userWeatherApiURL;
    (0,_api_fetchData__WEBPACK_IMPORTED_MODULE_0__.fetchAndDisplayData)(userWeatherApiURL);
  };
  (0,_utils_changeUnits__WEBPACK_IMPORTED_MODULE_1__.changeUnits)();
  setInterval(_utils_localTime__WEBPACK_IMPORTED_MODULE_2__.updateTime, 1000);
  (0,_utils_localTime__WEBPACK_IMPORTED_MODULE_2__.updateTime)();
  (0,_utils_drag__WEBPACK_IMPORTED_MODULE_3__.dragHours)();
  (0,_components_searchCity__WEBPACK_IMPORTED_MODULE_4__.searchCity)(updateCurrentLocation);
}
function updateCurrentLocation(newLocationUrl) {
  currentDisplayedLocation = newLocationUrl;
}


/***/ }),

/***/ "./src/odinweather/js/utils/bodyDayNightClasses.js":
/*!*********************************************************!*\
  !*** ./src/odinweather/js/utils/bodyDayNightClasses.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setDayNightClassesOnBody: function() { return /* binding */ setDayNightClassesOnBody; }
/* harmony export */ });
function setDayNightClassesOnBody(data) {
  // Get body and Current Weather containers
  const body = document.body;
  const weatherNowContainer = document.querySelector("#weatherNow");

  // add weather code to body for background image change
  body.setAttribute("data-code", data.code);

  // add day or night to containers for background image change
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


/***/ }),

/***/ "./src/odinweather/js/utils/changeUnits.js":
/*!*************************************************!*\
  !*** ./src/odinweather/js/utils/changeUnits.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeUnits: function() { return /* binding */ changeUnits; }
/* harmony export */ });
function changeUnits() {
  const changeUnitsButton = document.getElementById("units");
  let unit = changeUnitsButton.querySelector("#unit");
  const body = document.body;
  let unitSystem = ""; // default value

  const localUnit = localStorage.getItem("unitsSystem", "metric");
  if (localUnit === "metric") {
    unit.innerHTML = "&deg;C";
    body.classList.remove("metric", "imperial");
    body.classList.add(localUnit);
  } else if (localUnit === "imperial") {
    unit.innerHTML = "&deg;F";
    body.classList.remove("metric", "imperial");
    body.classList.add(localUnit);
  }
  changeUnitsButton.addEventListener("click", function () {
    if (unit.textContent.includes("C")) {
      unitSystem = "imperial";
      unit.innerHTML = "&deg;F";
    } else if (unit.textContent.includes("F")) {
      unitSystem = "metric";
      unit.innerHTML = "&deg;C";
    }
    localStorage.setItem("unitsSystem", unitSystem);
    body.classList.remove("metric", "imperial");
    body.classList.add(unitSystem);
  });
}


/***/ }),

/***/ "./src/odinweather/js/utils/countryFlags.js":
/*!**************************************************!*\
  !*** ./src/odinweather/js/utils/countryFlags.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFlag: function() { return /* binding */ getFlag; }
/* harmony export */ });
const countryCodes = {
  "Afghanistan": "AF",
  "Albania": "AL",
  "Algeria": "DZ",
  "American Samoa": "AS",
  "Andorra": "AD",
  "Angola": "AO",
  "Antarctica": "AQ",
  "Antigua and Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Aruba": "AW",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bermuda": "BM",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Bouvet Island": "BV",
  "Brazil": "BR",
  "British Indian Ocean Territory": "IO",
  "Brunei Darussalam": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Cape Verde": "CV",
  "Cayman Islands": "KY",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Christmas Island": "CX",
  "Cocos (Keeling) Islands": "CC",
  "Colombia": "CO",
  "Comoros": "KM",
  "Congo": "CG",
  "Congo, the Democratic Republic of the": "CD",
  "Cook Islands": "CK",
  "Costa Rica": "CR",
  "Cote d'Ivoire": "CI",
  "Côte d'Ivoire": "CI",
  "Croatia": "HR",
  "Cuba": "CU",
  "Cyprus": "CY",
  "Czech Republic": "CZ",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Ethiopia": "ET",
  "Falkland Islands": "FK",
  "Falkland Islands (Malvinas)": "FK",
  "Faroe Islands": "FO",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "French Guiana": "GF",
  "French Polynesia": "PF",
  "French Southern and Antarctic Lands": "FR",
  "French Southern Territories": "TF",
  "Gabon": "GA",
  "Gambia": "GM",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Gibraltar": "GI",
  "Greece": "GR",
  "Greenland": "GL",
  "Grenada": "GD",
  "Guadeloupe": "GP",
  "Guam": "GU",
  "Guatemala": "GT",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Heard Island and McDonald Islands": "HM",
  "Honduras": "HN",
  "Hong Kong": "HK",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Israel": "IL",
  "Italy": "IT",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Korea, Democratic People's Republic of": "KP",
  "North Korea": "KP",
  "Korea, Republic of": "KR",
  "South Korea": "KR",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Lao People's Democratic Republic (Laos)": "LA",
  "Lao People's Democratic Republic": "LA",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Libya, State of": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Macao": "MO",
  "Macedonia": "MK",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Martinique": "MQ",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mayotte": "YT",
  "Mexico": "MX",
  "Micronesia": "FM",
  "Moldova": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Montserrat": "MS",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar": "MM",
  "Namibia": "NA",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "Netherlands Antilles": "AN",
  "New Caledonia": "NC",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "Niue": "NU",
  "Norfolk Island": "NF",
  "Northern Mariana Islands": "MP",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Palestine, State of": "PS",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Pitcairn": "PN",
  "Poland": "PL",
  "Portugal": "PT",
  "Puerto Rico": "PR",
  "Qatar": "QA",
  "Réunion": "RE",
  "Romania": "RO",
  "Russia": "RU",
  "Rwanda": "RW",
  "Saint Helena": "SH",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Pierre and Miquelon": "PM",
  "Saint Vincent and the Grenadines": "VC",
  "Samoa": "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Georgia and the South Sandwich Islands": "GS",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sudan": "SD",
  "Suriname": "SR",
  "Svalbard and Jan Mayen": "SJ",
  "Swaziland": "SZ",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syrian Arab Republic": "SY",
  "Taiwan": "TW",
  "Tajikistan": "TJ",
  "Tanzania": "TZ",
  "Thailand": "TH",
  "Timor-Leste": "TL",
  "Togo": "TG",
  "Tokelau": "TK",
  "Tonga": "TO",
  "Trinidad and Tobago": "TT",
  "Tunisia": "TN",
  "Turkey": "TR",
  "Turkmenistan": "TM",
  "Turks and Caicos Islands": "TC",
  "Tuvalu": "TV",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States of America": "US",
  "United States Minor Outlying Islands": "UM",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Venezuela": "VE",
  "Vietnam": "VN",
  "Virgin Islands, British": "VG",
  "Virgin Islands, U.S.": "VI",
  "Wallis and Futuna": "WF",
  "Western Sahara": "EH",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW"
};
function getCountryCode(countryName) {
  return countryCodes[countryName] || null;
}
function getFlag(data) {
  const countryName = data.country;
  const countryCode = getCountryCode(countryName);
  const flagIcon = countryCode ? `<span class="fi fi-${countryCode.toLowerCase()}"></span>` : "";
  return flagIcon;
}



/***/ }),

/***/ "./src/odinweather/js/utils/createNotification.js":
/*!********************************************************!*\
  !*** ./src/odinweather/js/utils/createNotification.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNotification: function() { return /* binding */ createNotification; }
/* harmony export */ });
function createNotification(text, type) {
  const notification = document.createElement("div");
  notification.classList.add(type);
  const notificationMessage = document.createElement("p");
  notificationMessage.classList.add(`${type}-message`);
  notificationMessage.innerHTML = text;
  notification.appendChild(notificationMessage);
  const removeIcon = document.createElement("span");
  removeIcon.classList.add("icon");
  removeIcon.textContent = "close";
  notification.appendChild(removeIcon);
  document.body.appendChild(notification);
  setTimeout(function () {
    notification.classList.add("open");
  }, 300);
  removeIcon.addEventListener("click", function () {
    notification.classList.remove("open");
    setTimeout(function () {
      notification.remove();
    }, 300);
  });
  const toastTimeOut = 3000;
  if (type === "toast") {
    setTimeout(function () {
      notification.classList.remove("open");
    }, toastTimeOut);
    setTimeout(function () {
      notification.remove();
    }, toastTimeOut * 2);
  }
}


/***/ }),

/***/ "./src/odinweather/js/utils/currentTimeTimer.js":
/*!******************************************************!*\
  !*** ./src/odinweather/js/utils/currentTimeTimer.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateTimeContainer: function() { return /* binding */ updateTimeContainer; }
/* harmony export */ });
/* harmony import */ var _utils_updateTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/updateTime */ "./src/odinweather/js/utils/updateTime.js");

let intervalId;
function updateTimeContainer(data) {
  const timeContainer = document.querySelector("#locationTime");
  if (intervalId) {
    clearInterval(intervalId);
  }
  (0,_utils_updateTime__WEBPACK_IMPORTED_MODULE_0__.updateTime)(data, timeContainer);
  intervalId = setInterval(function () {
    return (0,_utils_updateTime__WEBPACK_IMPORTED_MODULE_0__.updateTime)(data, timeContainer);
  }, 1000);
}


/***/ }),

/***/ "./src/odinweather/js/utils/drag.js":
/*!******************************************!*\
  !*** ./src/odinweather/js/utils/drag.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dragHours: function() { return /* binding */ dragHours; }
/* harmony export */ });
function dragHours() {
  const sliders = [document.querySelector("#weatherHoursContainer"), document.querySelector("#popularPlaces")];
  sliders.forEach(function (slider) {
    let isDown = false; // flag variable to indicate whether the slider is clicked or not
    let startX; // position on page where we first click (inside the scrollable div)
    let scrollLeft; // pixels to scroll

    // Add event listeners for mouse actions
    slider.addEventListener("mousedown", prepareGrab);
    slider.addEventListener("mouseleave", removeGrab);
    document.addEventListener("mouseup", removeGrab); // Change: Listened on the document
    slider.addEventListener("mousemove", function (e) {
      return slideOnDrag(e, 1.5);
    }); // Adjust speed

    function removeGrab() {
      isDown = false;
      slider.classList.remove("active");
    }
    function prepareGrab(e) {
      isDown = true; // When this is true, we will be able to scroll

      slider.classList.add("active");
      // Calculate the position where we clicked taking into account the offset of the element
      startX = e.pageX - slider.offsetLeft;
      // Take into account the current scroll position of the element
      scrollLeft = slider.scrollLeft;
      // Change: Prevent default behavior to avoid text selection and other default actions
      e.preventDefault();
    }
    function slideOnDrag(e, speed) {
      if (!isDown) return; // Only proceed if mouse click while dragging
      e.preventDefault(); // Change: Prevent default behavior to avoid unintended actions
      // Determine the number of pixels the cursor moved, from mousedown event
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk * speed;
    }
  });
}


/***/ }),

/***/ "./src/odinweather/js/utils/generateDualValueFields.js":
/*!*************************************************************!*\
  !*** ./src/odinweather/js/utils/generateDualValueFields.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateDualValueFields: function() { return /* binding */ generateDualValueFields; }
/* harmony export */ });
/* harmony import */ var _resolvePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolvePath */ "./src/odinweather/js/utils/resolvePath.js");

function generateDualValueFields(container, valuePath, unitM, unitI, data) {
  const value = (0,_resolvePath__WEBPACK_IMPORTED_MODULE_0__.resolveValuePath)(data, valuePath);
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


/***/ }),

/***/ "./src/odinweather/js/utils/localTime.js":
/*!***********************************************!*\
  !*** ./src/odinweather/js/utils/localTime.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateTime: function() { return /* binding */ updateTime; }
/* harmony export */ });
function updateTime() {
  const localTimeContainer = document.getElementById("localTime");
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const currentTime = `
        <span class="local-time hours">${hours}</span>
        <span class="local-time divider">:</span>
        <span class="local-time minutes">${minutes}</span>
        <span class="local-time divider">:</span>
        <span class="local-time seconds">${seconds}</span>
    `;
  localTimeContainer.innerHTML = currentTime;
}


/***/ }),

/***/ "./src/odinweather/js/utils/populateDomElement.js":
/*!********************************************************!*\
  !*** ./src/odinweather/js/utils/populateDomElement.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateDOMElement: function() { return /* binding */ populateDOMElement; }
/* harmony export */ });
function populateDOMElement(selector, content) {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = content;
  }
}


/***/ }),

/***/ "./src/odinweather/js/utils/resolvePath.js":
/*!*************************************************!*\
  !*** ./src/odinweather/js/utils/resolvePath.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveValuePath: function() { return /* binding */ resolveValuePath; }
/* harmony export */ });
function resolveValuePath(obj, path) {
  return path.split(".").reduce(function (acc, part) {
    return acc && acc[part];
  }, obj);
}


/***/ }),

/***/ "./src/odinweather/js/utils/showhideLoader.js":
/*!****************************************************!*\
  !*** ./src/odinweather/js/utils/showhideLoader.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideLoader: function() { return /* binding */ hideLoader; },
/* harmony export */   showLoader: function() { return /* binding */ showLoader; }
/* harmony export */ });
function showLoader() {
  document.getElementById("loader").classList.add("open");
}
function hideLoader() {
  document.getElementById("loader").classList.remove("open");
}


/***/ }),

/***/ "./src/odinweather/js/utils/sunrisesunseticons.js":
/*!********************************************************!*\
  !*** ./src/odinweather/js/utils/sunrisesunseticons.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sunriseIcon: function() { return /* binding */ sunriseIcon; },
/* harmony export */   sunsetIcon: function() { return /* binding */ sunsetIcon; }
/* harmony export */ });
const sunriseIcon = `<svg class="sunrise" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 0.292893C11.6834 -0.0976311 12.3166 -0.0976311 12.7071 0.292893L16.7071 4.29289C17.0976 4.68342 17.0976 5.31658 16.7071 5.70711C16.3166 6.09763 15.6834 6.09763 15.2929 5.70711L13 3.41421V8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8V3.41421L8.70711 5.70711C8.31658 6.09763 7.68342 6.09763 7.29289 5.70711C6.90237 5.31658 6.90237 4.68342 7.29289 4.29289L11.2929 0.292893ZM3.51262 8.51262C3.90314 8.1221 4.53631 8.1221 4.92683 8.51262L6.34683 9.93262C6.73736 10.3231 6.73736 10.9563 6.34683 11.3468C5.95631 11.7374 5.32314 11.7374 4.93262 11.3468L3.51262 9.92683C3.1221 9.53631 3.1221 8.90314 3.51262 8.51262ZM20.4875 8.51262C20.878 8.90314 20.878 9.53631 20.4875 9.92683L19.0675 11.3468C18.6769 11.7374 18.0438 11.7374 17.6532 11.3468C17.2627 10.9563 17.2627 10.3231 17.6532 9.93262L19.0732 8.51262C19.4638 8.1221 20.0969 8.1221 20.4875 8.51262ZM7.75736 12.7574C8.88258 11.6321 10.4087 11 12 11C13.5913 11 15.1174 11.6321 16.2426 12.7574C17.3679 13.8826 18 15.4087 18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 15.9391 15.5786 14.9217 14.8284 14.1716C14.0783 13.4214 13.0609 13 12 13C10.9391 13 9.92172 13.4214 9.17157 14.1716C8.42143 14.9217 8 15.9391 8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 15.4087 6.63214 13.8826 7.75736 12.7574ZM0 17C0 16.4477 0.447715 16 1 16H3C3.55228 16 4 16.4477 4 17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17ZM20 17C20 16.4477 20.4477 16 21 16H23C23.5523 16 24 16.4477 24 17C24 17.5523 23.5523 18 23 18H21C20.4477 18 20 17.5523 20 17ZM0 21C0 20.4477 0.447715 20 1 20H23C23.5523 20 24 20.4477 24 21C24 21.5523 23.5523 22 23 22H1C0.447715 22 0 21.5523 0 21Z" fill="black"/>
</svg>`;
const sunsetIcon = `<svg class="sunset" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C12.5523 0 13 0.447715 13 1V5.58579L15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289C17.0976 3.68342 17.0976 4.31658 16.7071 4.70711L12.7071 8.70711C12.3166 9.09763 11.6834 9.09763 11.2929 8.70711L7.29289 4.70711C6.90237 4.31658 6.90237 3.68342 7.29289 3.29289C7.68342 2.90237 8.31658 2.90237 8.70711 3.29289L11 5.58579V1C11 0.447715 11.4477 0 12 0ZM3.51262 8.51262C3.90314 8.1221 4.53631 8.1221 4.92683 8.51262L6.34683 9.93262C6.73736 10.3231 6.73736 10.9563 6.34683 11.3468C5.95631 11.7374 5.32314 11.7374 4.93262 11.3468L3.51262 9.92683C3.1221 9.53631 3.1221 8.90314 3.51262 8.51262ZM20.4875 8.51262C20.878 8.90314 20.878 9.53631 20.4875 9.92683L19.0675 11.3468C18.6769 11.7374 18.0438 11.7374 17.6532 11.3468C17.2627 10.9563 17.2627 10.3231 17.6532 9.93262L19.0732 8.51262C19.4638 8.1221 20.0969 8.1221 20.4875 8.51262ZM7.75736 12.7574C8.88258 11.6321 10.4087 11 12 11C13.5913 11 15.1174 11.6321 16.2426 12.7574C17.3679 13.8826 18 15.4087 18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 15.9391 15.5786 14.9217 14.8284 14.1716C14.0783 13.4214 13.0609 13 12 13C10.9391 13 9.92172 13.4214 9.17157 14.1716C8.42143 14.9217 8 15.9391 8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 15.4087 6.63214 13.8826 7.75736 12.7574ZM0 17C0 16.4477 0.447715 16 1 16H3C3.55228 16 4 16.4477 4 17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17ZM20 17C20 16.4477 20.4477 16 21 16H23C23.5523 16 24 16.4477 24 17C24 17.5523 23.5523 18 23 18H21C20.4477 18 20 17.5523 20 17ZM0 21C0 20.4477 0.447715 20 1 20H23C23.5523 20 24 20.4477 24 21C24 21.5523 23.5523 22 23 22H1C0.447715 22 0 21.5523 0 21Z" fill="black"/>
</svg>`;


/***/ }),

/***/ "./src/odinweather/js/utils/updateTime.js":
/*!************************************************!*\
  !*** ./src/odinweather/js/utils/updateTime.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateTime: function() { return /* binding */ updateTime; }
/* harmony export */ });
function updateTime(data, timeContainer) {
  const [hours] = data.localtime.time.split(":");
  const now = new Date();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  timeContainer.innerHTML = `${data.localtime.date}, ${formattedTime}`;
}


/***/ }),

/***/ "./src/odinweather/scss/style.scss":
/*!*****************************************!*\
  !*** ./src/odinweather/scss/style.scss ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/date-fns/_lib/addLeadingZeros.mjs":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/_lib/addLeadingZeros.mjs ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addLeadingZeros: function() { return /* binding */ addLeadingZeros; }
/* harmony export */ });
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultOptions.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.mjs ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: function() { return /* binding */ getDefaultOptions; },
/* harmony export */   setDefaultOptions: function() { return /* binding */ setDefaultOptions; }
/* harmony export */ });
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/format/formatters.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/formatters.mjs ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatters: function() { return /* binding */ formatters; }
/* harmony export */ });
/* harmony import */ var _getDayOfYear_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../getDayOfYear.mjs */ "./node_modules/date-fns/getDayOfYear.mjs");
/* harmony import */ var _getISOWeek_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../getISOWeek.mjs */ "./node_modules/date-fns/getISOWeek.mjs");
/* harmony import */ var _getISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../getISOWeekYear.mjs */ "./node_modules/date-fns/getISOWeekYear.mjs");
/* harmony import */ var _getWeek_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../getWeek.mjs */ "./node_modules/date-fns/getWeek.mjs");
/* harmony import */ var _getWeekYear_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../getWeekYear.mjs */ "./node_modules/date-fns/getWeekYear.mjs");
/* harmony import */ var _addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../addLeadingZeros.mjs */ "./node_modules/date-fns/_lib/addLeadingZeros.mjs");
/* harmony import */ var _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lightFormatters.mjs */ "./node_modules/date-fns/_lib/format/lightFormatters.mjs");








const dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

const formatters = {
  // Era
  G: function (date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },

  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === "yo") {
      const signedYear = date.getFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.y(date, token);
  },

  // Local week-numbering year
  Y: function (date, token, localize, options) {
    const signedWeekYear = (0,_getWeekYear_mjs__WEBPACK_IMPORTED_MODULE_1__.getWeekYear)(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }

    // Padding
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(weekYear, token.length);
  },

  // ISO week-numbering year
  R: function (date, token) {
    const isoWeekYear = (0,_getISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_3__.getISOWeekYear)(date);

    // Padding
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(isoWeekYear, token.length);
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    const year = date.getFullYear();
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(year, token.length);
  },

  // Quarter
  Q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone quarter
  q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // Month
  M: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting",
        });
      // J, F, ..., D
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },

  // Stand-alone month
  L: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone",
        });
      // J, F, ..., D
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },

  // Local week of year
  w: function (date, token, localize, options) {
    const week = (0,_getWeek_mjs__WEBPACK_IMPORTED_MODULE_4__.getWeek)(date, options);

    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }

    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(week, token.length);
  },

  // ISO week of year
  I: function (date, token, localize) {
    const isoWeek = (0,_getISOWeek_mjs__WEBPACK_IMPORTED_MODULE_5__.getISOWeek)(date);

    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }

    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(isoWeek, token.length);
  },

  // Day of the month
  d: function (date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.d(date, token);
  },

  // Day of year
  D: function (date, token, localize) {
    const dayOfYear = (0,_getDayOfYear_mjs__WEBPACK_IMPORTED_MODULE_6__.getDayOfYear)(date);

    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }

    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(dayOfYear, token.length);
  },

  // Day of week
  E: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Local day of week
  e: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone",
        });
      // T
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone",
        });
      // Tuesday
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // ISO day of week
  i: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM or PM
  a: function (date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "aaa":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }

    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "bbb":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.h(date, token);
  },

  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.H(date, token);
  },

  // Hour [0-11]
  K: function (date, token, localize) {
    const hours = date.getHours() % 12;

    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(hours, token.length);
  },

  // Hour [1-24]
  k: function (date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;

    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(hours, token.length);
  },

  // Minute
  m: function (date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.m(date, token);
  },

  // Second
  s: function (date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.s(date, token);
  },

  // Fraction of second
  S: function (date, token) {
    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.S(date, token);
  },

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return "Z";
    }

    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (GMT)
  O: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (specific non-location)
  z: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Seconds timestamp
  t: function (date, token, _localize) {
    const timestamp = Math.trunc(date.getTime() / 1000);
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(timestamp, token.length);
  },

  // Milliseconds timestamp
  T: function (date, token, _localize) {
    const timestamp = date.getTime();
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(timestamp, token.length);
  },
};

function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}

function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(Math.trunc(absOffset / 60), 2);
  const minutes = (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/format/lightFormatters.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/lightFormatters.mjs ***!
  \***************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lightFormatters: function() { return /* binding */ lightFormatters; }
/* harmony export */ });
/* harmony import */ var _addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../addLeadingZeros.mjs */ "./node_modules/date-fns/_lib/addLeadingZeros.mjs");


/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

const lightFormatters = {
  // Year
  y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    const signedYear = date.getFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(token === "yy" ? year % 100 : year, token.length);
  },

  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(month + 1, 2);
  },

  // Day of the month
  d(date, token) {
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(date.getDate(), token.length);
  },

  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },

  // Hour [1-12]
  h(date, token) {
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(date.getHours() % 12 || 12, token.length);
  },

  // Hour [0-23]
  H(date, token) {
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(date.getHours(), token.length);
  },

  // Minute
  m(date, token) {
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(date.getMinutes(), token.length);
  },

  // Second
  s(date, token) {
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(date.getSeconds(), token.length);
  },

  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3),
    );
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(fractionalSeconds, token.length);
  },
};


/***/ }),

/***/ "./node_modules/date-fns/_lib/format/longFormatters.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/longFormatters.mjs ***!
  \**************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   longFormatters: function() { return /* binding */ longFormatters; }
/* harmony export */ });
const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};

const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};

const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  let dateTimeFormat;

  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }

  return dateTimeFormat
    .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
    .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};

const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter,
};


/***/ }),

/***/ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs ***!
  \************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTimezoneOffsetInMilliseconds: function() { return /* binding */ getTimezoneOffsetInMilliseconds; }
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate.mjs */ "./node_modules/date-fns/toDate.mjs");


/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/protectedTokens.mjs":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/_lib/protectedTokens.mjs ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isProtectedDayOfYearToken: function() { return /* binding */ isProtectedDayOfYearToken; },
/* harmony export */   isProtectedWeekYearToken: function() { return /* binding */ isProtectedWeekYearToken; },
/* harmony export */   warnOrThrowProtectedError: function() { return /* binding */ warnOrThrowProtectedError; }
/* harmony export */ });
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;

const throwTokens = ["D", "DD", "YY", "YYYY"];

function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}

function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}

function warnOrThrowProtectedError(token, format, input) {
  const _message = message(token, format, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}

function message(token, format, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}


/***/ }),

/***/ "./node_modules/date-fns/constants.mjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/constants.mjs ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   daysInWeek: function() { return /* binding */ daysInWeek; },
/* harmony export */   daysInYear: function() { return /* binding */ daysInYear; },
/* harmony export */   maxTime: function() { return /* binding */ maxTime; },
/* harmony export */   millisecondsInDay: function() { return /* binding */ millisecondsInDay; },
/* harmony export */   millisecondsInHour: function() { return /* binding */ millisecondsInHour; },
/* harmony export */   millisecondsInMinute: function() { return /* binding */ millisecondsInMinute; },
/* harmony export */   millisecondsInSecond: function() { return /* binding */ millisecondsInSecond; },
/* harmony export */   millisecondsInWeek: function() { return /* binding */ millisecondsInWeek; },
/* harmony export */   minTime: function() { return /* binding */ minTime; },
/* harmony export */   minutesInDay: function() { return /* binding */ minutesInDay; },
/* harmony export */   minutesInHour: function() { return /* binding */ minutesInHour; },
/* harmony export */   minutesInMonth: function() { return /* binding */ minutesInMonth; },
/* harmony export */   minutesInYear: function() { return /* binding */ minutesInYear; },
/* harmony export */   monthsInQuarter: function() { return /* binding */ monthsInQuarter; },
/* harmony export */   monthsInYear: function() { return /* binding */ monthsInYear; },
/* harmony export */   quartersInYear: function() { return /* binding */ quartersInYear; },
/* harmony export */   secondsInDay: function() { return /* binding */ secondsInDay; },
/* harmony export */   secondsInHour: function() { return /* binding */ secondsInHour; },
/* harmony export */   secondsInMinute: function() { return /* binding */ secondsInMinute; },
/* harmony export */   secondsInMonth: function() { return /* binding */ secondsInMonth; },
/* harmony export */   secondsInQuarter: function() { return /* binding */ secondsInQuarter; },
/* harmony export */   secondsInWeek: function() { return /* binding */ secondsInWeek; },
/* harmony export */   secondsInYear: function() { return /* binding */ secondsInYear; }
/* harmony export */ });
/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;


/***/ }),

/***/ "./node_modules/date-fns/constructFrom.mjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/constructFrom.mjs ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructFrom: function() { return /* binding */ constructFrom; }
/* harmony export */ });
/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from 'date-fns'
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use contrustor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   )
 * }
 */
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (constructFrom);


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarDays.mjs":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarDays.mjs ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   differenceInCalendarDays: function() { return /* binding */ differenceInCalendarDays; }
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.mjs */ "./node_modules/date-fns/constants.mjs");
/* harmony import */ var _startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startOfDay.mjs */ "./node_modules/date-fns/startOfDay.mjs");
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.mjs */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs");




/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateLeft);
  const startOfDayRight = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateRight);

  const timestampLeft =
    +startOfDayLeft - (0,_lib_getTimezoneOffsetInMilliseconds_mjs__WEBPACK_IMPORTED_MODULE_1__.getTimezoneOffsetInMilliseconds)(startOfDayLeft);
  const timestampRight =
    +startOfDayRight - (0,_lib_getTimezoneOffsetInMilliseconds_mjs__WEBPACK_IMPORTED_MODULE_1__.getTimezoneOffsetInMilliseconds)(startOfDayRight);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round((timestampLeft - timestampRight) / _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.millisecondsInDay);
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (differenceInCalendarDays);


/***/ }),

/***/ "./node_modules/date-fns/format.mjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/format.mjs ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   format: function() { return /* binding */ format; },
/* harmony export */   formatDate: function() { return /* binding */ format; },
/* harmony export */   formatters: function() { return /* reexport safe */ _lib_format_formatters_mjs__WEBPACK_IMPORTED_MODULE_0__.formatters; },
/* harmony export */   longFormatters: function() { return /* reexport safe */ _lib_format_longFormatters_mjs__WEBPACK_IMPORTED_MODULE_1__.longFormatters; }
/* harmony export */ });
/* harmony import */ var _lib_defaultLocale_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_lib/defaultLocale.mjs */ "./node_modules/date-fns/locale/en-US.mjs");
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ "./node_modules/date-fns/_lib/defaultOptions.mjs");
/* harmony import */ var _lib_format_formatters_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/format/formatters.mjs */ "./node_modules/date-fns/_lib/format/formatters.mjs");
/* harmony import */ var _lib_format_longFormatters_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/format/longFormatters.mjs */ "./node_modules/date-fns/_lib/format/longFormatters.mjs");
/* harmony import */ var _lib_protectedTokens_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_lib/protectedTokens.mjs */ "./node_modules/date-fns/_lib/protectedTokens.mjs");
/* harmony import */ var _isValid_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isValid.mjs */ "./node_modules/date-fns/isValid.mjs");
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");








// Rexports of internal for libraries to use.
// See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874


// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;



/**
 * The {@link format} function options.
 */

/**
 * @name format
 * @alias formatDate
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
 *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param format - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format(date, formatStr, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_2__.getDefaultOptions)();
  const locale = options?.locale ?? defaultOptions.locale ?? _lib_defaultLocale_mjs__WEBPACK_IMPORTED_MODULE_3__.enUS;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const originalDate = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_4__.toDate)(date);

  if (!(0,_isValid_mjs__WEBPACK_IMPORTED_MODULE_5__.isValid)(originalDate)) {
    throw new RangeError("Invalid time value");
  }

  let parts = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = _lib_format_longFormatters_mjs__WEBPACK_IMPORTED_MODULE_1__.longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp)
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString(substring) };
      }

      if (_lib_format_formatters_mjs__WEBPACK_IMPORTED_MODULE_0__.formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return { isToken: false, value: substring };
    });

  // invoke localize preprocessor (only for french locales at the moment)
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }

  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  return parts
    .map((part) => {
      if (!part.isToken) return part.value;

      const token = part.value;

      if (
        (!options?.useAdditionalWeekYearTokens &&
          (0,_lib_protectedTokens_mjs__WEBPACK_IMPORTED_MODULE_6__.isProtectedWeekYearToken)(token)) ||
        (!options?.useAdditionalDayOfYearTokens &&
          (0,_lib_protectedTokens_mjs__WEBPACK_IMPORTED_MODULE_6__.isProtectedDayOfYearToken)(token))
      ) {
        (0,_lib_protectedTokens_mjs__WEBPACK_IMPORTED_MODULE_6__.warnOrThrowProtectedError)(token, formatStr, String(date));
      }

      const formatter = _lib_format_formatters_mjs__WEBPACK_IMPORTED_MODULE_0__.formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    })
    .join("");
}

function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);

  if (!matched) {
    return input;
  }

  return matched[1].replace(doubleQuoteRegExp, "'");
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (format);


/***/ }),

/***/ "./node_modules/date-fns/getDayOfYear.mjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/getDayOfYear.mjs ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDayOfYear: function() { return /* binding */ getDayOfYear; }
/* harmony export */ });
/* harmony import */ var _differenceInCalendarDays_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./differenceInCalendarDays.mjs */ "./node_modules/date-fns/differenceInCalendarDays.mjs");
/* harmony import */ var _startOfYear_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startOfYear.mjs */ "./node_modules/date-fns/startOfYear.mjs");
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");




/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const diff = (0,_differenceInCalendarDays_mjs__WEBPACK_IMPORTED_MODULE_1__.differenceInCalendarDays)(_date, (0,_startOfYear_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfYear)(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (getDayOfYear);


/***/ }),

/***/ "./node_modules/date-fns/getISOWeek.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/getISOWeek.mjs ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getISOWeek: function() { return /* binding */ getISOWeek; }
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.mjs */ "./node_modules/date-fns/constants.mjs");
/* harmony import */ var _startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./startOfISOWeek.mjs */ "./node_modules/date-fns/startOfISOWeek.mjs");
/* harmony import */ var _startOfISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startOfISOWeekYear.mjs */ "./node_modules/date-fns/startOfISOWeekYear.mjs");
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");





/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const diff = +(0,_startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_1__.startOfISOWeek)(_date) - +(0,_startOfISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfISOWeekYear)(_date);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.millisecondsInWeek) + 1;
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (getISOWeek);


/***/ }),

/***/ "./node_modules/date-fns/getISOWeekYear.mjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/getISOWeekYear.mjs ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getISOWeekYear: function() { return /* binding */ getISOWeekYear; }
/* harmony export */ });
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructFrom.mjs */ "./node_modules/date-fns/constructFrom.mjs");
/* harmony import */ var _startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startOfISOWeek.mjs */ "./node_modules/date-fns/startOfISOWeek.mjs");
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");




/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const year = _date.getFullYear();

  const fourthOfJanuaryOfNextYear = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = (0,_startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfISOWeek)(fourthOfJanuaryOfNextYear);

  const fourthOfJanuaryOfThisYear = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = (0,_startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfISOWeek)(fourthOfJanuaryOfThisYear);

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (getISOWeekYear);


/***/ }),

/***/ "./node_modules/date-fns/getWeek.mjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/getWeek.mjs ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getWeek: function() { return /* binding */ getWeek; }
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.mjs */ "./node_modules/date-fns/constants.mjs");
/* harmony import */ var _startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./startOfWeek.mjs */ "./node_modules/date-fns/startOfWeek.mjs");
/* harmony import */ var _startOfWeekYear_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startOfWeekYear.mjs */ "./node_modules/date-fns/startOfWeekYear.mjs");
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");





/**
 * The {@link getWeek} function options.
 */

/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */

function getWeek(date, options) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const diff = +(0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_1__.startOfWeek)(_date, options) - +(0,_startOfWeekYear_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfWeekYear)(_date, options);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.millisecondsInWeek) + 1;
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (getWeek);


/***/ }),

/***/ "./node_modules/date-fns/getWeekYear.mjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/getWeekYear.mjs ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getWeekYear: function() { return /* binding */ getWeekYear; }
/* harmony export */ });
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constructFrom.mjs */ "./node_modules/date-fns/constructFrom.mjs");
/* harmony import */ var _startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./startOfWeek.mjs */ "./node_modules/date-fns/startOfWeek.mjs");
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ "./node_modules/date-fns/_lib/defaultOptions.mjs");





/**
 * The {@link getWeekYear} function options.
 */

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The local week-numbering year
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(date, options) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const year = _date.getFullYear();

  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const firstWeekOfNextYear = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_2__.constructFrom)(date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_3__.startOfWeek)(firstWeekOfNextYear, options);

  const firstWeekOfThisYear = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_2__.constructFrom)(date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_3__.startOfWeek)(firstWeekOfThisYear, options);

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (getWeekYear);


/***/ }),

/***/ "./node_modules/date-fns/isDate.mjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/isDate.mjs ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isDate: function() { return /* binding */ isDate; }
/* harmony export */ });
/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a date
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (isDate);


/***/ }),

/***/ "./node_modules/date-fns/isValid.mjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isValid.mjs ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isValid: function() { return /* binding */ isValid; }
/* harmony export */ });
/* harmony import */ var _isDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isDate.mjs */ "./node_modules/date-fns/isDate.mjs");
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");



/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(date) {
  if (!(0,_isDate_mjs__WEBPACK_IMPORTED_MODULE_0__.isDate)(date) && typeof date !== "number") {
    return false;
  }
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  return !isNaN(Number(_date));
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (isValid);


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs ***!
  \*****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildFormatLongFn: function() { return /* binding */ buildFormatLongFn; }
/* harmony export */ });
function buildFormatLongFn(args) {
  return (options = {}) => {
    // TODO: Remove String()
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs ***!
  \***************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildLocalizeFn: function() { return /* binding */ buildLocalizeFn; }
/* harmony export */ });
/* eslint-disable no-unused-vars */

/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */

/**
 * The map of localized values for each width.
 */

/**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */

/**
 * Converts the unit value to the tuple of values.
 */

/**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */

/**
 * The tuple of localized quarter values. The first element represents Q1.
 */

/**
 * The tuple of localized day values. The first element represents Sunday.
 */

/**
 * The tuple of localized month values. The first element represents January.
 */

function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";

    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;

      valuesArray =
        args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;

    // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildMatchFn.mjs":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchFn.mjs ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildMatchFn: function() { return /* binding */ buildMatchFn; }
/* harmony export */ });
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString));

    let value;

    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        options.valueCallback(value)
      : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

function findKey(object, predicate) {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key])
    ) {
      return key;
    }
  }
  return undefined;
}

function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildMatchPatternFn: function() { return /* binding */ buildMatchPatternFn; }
/* harmony export */ });
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback
      ? args.valueCallback(parseResult[0])
      : parseResult[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
    value = options.valueCallback ? options.valueCallback(value) : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US.mjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US.mjs ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enUS: function() { return /* binding */ enUS; }
/* harmony export */ });
/* harmony import */ var _en_US_lib_formatDistance_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en-US/_lib/formatDistance.mjs */ "./node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs");
/* harmony import */ var _en_US_lib_formatLong_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./en-US/_lib/formatLong.mjs */ "./node_modules/date-fns/locale/en-US/_lib/formatLong.mjs");
/* harmony import */ var _en_US_lib_formatRelative_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./en-US/_lib/formatRelative.mjs */ "./node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs");
/* harmony import */ var _en_US_lib_localize_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./en-US/_lib/localize.mjs */ "./node_modules/date-fns/locale/en-US/_lib/localize.mjs");
/* harmony import */ var _en_US_lib_match_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./en-US/_lib/match.mjs */ "./node_modules/date-fns/locale/en-US/_lib/match.mjs");






/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = {
  code: "en-US",
  formatDistance: _en_US_lib_formatDistance_mjs__WEBPACK_IMPORTED_MODULE_0__.formatDistance,
  formatLong: _en_US_lib_formatLong_mjs__WEBPACK_IMPORTED_MODULE_1__.formatLong,
  formatRelative: _en_US_lib_formatRelative_mjs__WEBPACK_IMPORTED_MODULE_2__.formatRelative,
  localize: _en_US_lib_localize_mjs__WEBPACK_IMPORTED_MODULE_3__.localize,
  match: _en_US_lib_match_mjs__WEBPACK_IMPORTED_MODULE_4__.match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
};

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (enUS);


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDistance: function() { return /* binding */ formatDistance; }
/* harmony export */ });
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds",
  },

  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds",
  },

  halfAMinute: "half a minute",

  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes",
  },

  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes",
  },

  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours",
  },

  xHours: {
    one: "1 hour",
    other: "{{count}} hours",
  },

  xDays: {
    one: "1 day",
    other: "{{count}} days",
  },

  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks",
  },

  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks",
  },

  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months",
  },

  xMonths: {
    one: "1 month",
    other: "{{count}} months",
  },

  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years",
  },

  xYears: {
    one: "1 year",
    other: "{{count}} years",
  },

  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years",
  },

  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years",
  },
};

const formatDistance = (token, count, options) => {
  let result;

  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
};


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatLong.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatLong.mjs ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatLong: function() { return /* binding */ formatLong; }
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildFormatLongFn.mjs */ "./node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs");


const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy",
};

const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a",
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}",
};

const formatLong = {
  date: (0,_lib_buildFormatLongFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: (0,_lib_buildFormatLongFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: (0,_lib_buildFormatLongFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: dateTimeFormats,
    defaultWidth: "full",
  }),
};


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatRelative: function() { return /* binding */ formatRelative; }
/* harmony export */ });
const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const formatRelative = (token, _date, _baseDate, _options) =>
  formatRelativeLocale[token];


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/localize.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/localize.mjs ***!
  \**************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   localize: function() { return /* binding */ localize; }
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildLocalizeFn.mjs */ "./node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs");


const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
};

const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};

const localize = {
  ordinalNumber,

  era: (0,_lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: (0,_lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: (0,_lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: monthValues,
    defaultWidth: "wide",
  }),

  day: (0,_lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: (0,_lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
};


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/match.mjs":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/match.mjs ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   match: function() { return /* binding */ match; }
/* harmony export */ });
/* harmony import */ var _lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_lib/buildMatchFn.mjs */ "./node_modules/date-fns/locale/_lib/buildMatchFn.mjs");
/* harmony import */ var _lib_buildMatchPatternFn_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildMatchPatternFn.mjs */ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs");



const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i,
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],

  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
};

const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i,
  },
};

const match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildMatchPatternFn)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: (0,_lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__.buildMatchFn)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: (0,_lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__.buildMatchFn)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: (0,_lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__.buildMatchFn)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: (0,_lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__.buildMatchFn)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: (0,_lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__.buildMatchFn)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
};


/***/ }),

/***/ "./node_modules/date-fns/startOfDay.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfDay.mjs ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startOfDay: function() { return /* binding */ startOfDay; }
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (startOfDay);


/***/ }),

/***/ "./node_modules/date-fns/startOfISOWeek.mjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/startOfISOWeek.mjs ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startOfISOWeek: function() { return /* binding */ startOfISOWeek; }
/* harmony export */ });
/* harmony import */ var _startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startOfWeek.mjs */ "./node_modules/date-fns/startOfWeek.mjs");


/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(date) {
  return (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfWeek)(date, { weekStartsOn: 1 });
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (startOfISOWeek);


/***/ }),

/***/ "./node_modules/date-fns/startOfISOWeekYear.mjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/startOfISOWeekYear.mjs ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startOfISOWeekYear: function() { return /* binding */ startOfISOWeekYear; }
/* harmony export */ });
/* harmony import */ var _getISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getISOWeekYear.mjs */ "./node_modules/date-fns/getISOWeekYear.mjs");
/* harmony import */ var _startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startOfISOWeek.mjs */ "./node_modules/date-fns/startOfISOWeek.mjs");
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructFrom.mjs */ "./node_modules/date-fns/constructFrom.mjs");




/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(date) {
  const year = (0,_getISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_0__.getISOWeekYear)(date);
  const fourthOfJanuary = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return (0,_startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfISOWeek)(fourthOfJanuary);
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (startOfISOWeekYear);


/***/ }),

/***/ "./node_modules/date-fns/startOfWeek.mjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.mjs ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startOfWeek: function() { return /* binding */ startOfWeek; }
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ "./node_modules/date-fns/_lib/defaultOptions.mjs");



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (startOfWeek);


/***/ }),

/***/ "./node_modules/date-fns/startOfWeekYear.mjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/startOfWeekYear.mjs ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startOfWeekYear: function() { return /* binding */ startOfWeekYear; }
/* harmony export */ });
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constructFrom.mjs */ "./node_modules/date-fns/constructFrom.mjs");
/* harmony import */ var _getWeekYear_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWeekYear.mjs */ "./node_modules/date-fns/getWeekYear.mjs");
/* harmony import */ var _startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./startOfWeek.mjs */ "./node_modules/date-fns/startOfWeek.mjs");
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ "./node_modules/date-fns/_lib/defaultOptions.mjs");





/**
 * The {@link startOfWeekYear} function options.
 */

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const year = (0,_getWeekYear_mjs__WEBPACK_IMPORTED_MODULE_1__.getWeekYear)(date, options);
  const firstWeek = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_2__.constructFrom)(date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_3__.startOfWeek)(firstWeek, options);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (startOfWeekYear);


/***/ }),

/***/ "./node_modules/date-fns/startOfYear.mjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfYear.mjs ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startOfYear: function() { return /* binding */ startOfYear; }
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructFrom.mjs */ "./node_modules/date-fns/constructFrom.mjs");



/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(date) {
  const cleanDate = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const _date = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(date, 0);
  _date.setFullYear(cleanDate.getFullYear(), 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (startOfYear);


/***/ }),

/***/ "./node_modules/date-fns/toDate.mjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/toDate.mjs ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toDate: function() { return /* binding */ toDate; }
/* harmony export */ });
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === "object" && argStr === "[object Date]")
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new argument.constructor(+argument);
  } else if (
    typeof argument === "number" ||
    argStr === "[object Number]" ||
    typeof argument === "string" ||
    argStr === "[object String]"
  ) {
    // TODO: Can we get rid of as?
    return new Date(argument);
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN);
  }
}

// Fallback for modularized imports:
/* harmony default export */ __webpack_exports__["default"] = (toDate);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************************!*\
  !*** ./src/odinweather/index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.scss */ "./src/odinweather/scss/style.scss");
/* harmony import */ var _js_components_getLocation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/components/getLocation.js */ "./src/odinweather/js/components/getLocation.js");
/* harmony import */ var _js_api_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/api/api.js */ "./src/odinweather/js/api/api.js");
/* harmony import */ var _js_init__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/init */ "./src/odinweather/js/init.js");




document.addEventListener("DOMContentLoaded", async function () {
  // getting user's location from the browser
  // this function returns real coordinates, if user allows location services
  // or defaults to London, in which case it will return London's lat and lon.
  const userLocation = await (0,_js_components_getLocation_js__WEBPACK_IMPORTED_MODULE_1__.fetchUserLocation)();

  // construct a weather api url, based on user location
  const weatherApiURL = (0,_js_api_api_js__WEBPACK_IMPORTED_MODULE_2__.getWeatherApiURL)({
    lat: userLocation.lat,
    lon: userLocation.lon
  });

  // init weather app on DOM load
  (0,_js_init__WEBPACK_IMPORTED_MODULE_3__.initWeatherApp)(weatherApiURL);
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0RBQXdELGFBQWE7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHFFQUFlO0FBQzlCO0FBQ0E7QUFDQSx3REFBd0QsYUFBYTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUVBQWU7QUFDOUI7QUFDQTtBQUNBLHNEQUFzRCxhQUFhO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FB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R0FBK0I7O0FBRXREO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCw2REFBaUI7QUFDeEU7O0FBRUE7QUFDQSwrREFBZSx3QkFBd0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BEaUI7QUFDSztBQUNKO0FBQ1E7QUFLOUI7QUFDSTtBQUNGOztBQUV0QztBQUNBO0FBQ3NDOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVnQzs7QUFFaEM7QUFDQSxRQUFRLGNBQWM7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQOztBQUVBLE9BQU8seUVBQWU7QUFDdEI7QUFDQTtBQUNBLEdBQUc7O0FBRUgsV0FBVyx5RUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILFNBQVMseUVBQWU7QUFDeEI7QUFDQTtBQUNBLEdBQUc7O0FBRUgsT0FBTyx5RUFBZTtBQUN0QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxhQUFhLHlFQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFMMkQ7QUFDYzs7QUFFekU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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O0FDTjJCO0FBQ3dDO0FBQ2hCO0FBQ1I7QUFFM0NtSCxRQUFRLENBQUMwRSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0I7RUFDL0Q7RUFDQTtFQUNBO0VBQ0EsTUFBTW1ELFlBQVksR0FBRyxNQUFNdEksZ0ZBQWlCLENBQUMsQ0FBQzs7RUFFOUM7RUFDQSxNQUFNbU0sYUFBYSxHQUFHblYsZ0VBQWdCLENBQUM7SUFBRUcsR0FBRyxFQUFFbVIsWUFBWSxDQUFDblIsR0FBRztJQUFFQyxHQUFHLEVBQUVrUixZQUFZLENBQUNsUjtFQUFJLENBQUMsQ0FBQzs7RUFFeEY7RUFDQTZRLHdEQUFjLENBQUNrRSxhQUFhLENBQUM7QUFDOUIsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW53ZWF0aGVyL2pzL2FwaS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlud2VhdGhlci9qcy9hcGkvZmV0Y2hEYXRhLmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbndlYXRoZXIvanMvYXBpL3dlYXRoZXJEYXRhLmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbndlYXRoZXIvanMvY29tcG9uZW50cy9kaXNwbGF5RGF0YS5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW53ZWF0aGVyL2pzL2NvbXBvbmVudHMvZ2V0TG9jYXRpb24uanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlud2VhdGhlci9qcy9jb21wb25lbnRzL3BvcHVsYXRlRG9tLmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbndlYXRoZXIvanMvY29tcG9uZW50cy9zZWFyY2hDaXR5LmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbndlYXRoZXIvanMvaW5pdC5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW53ZWF0aGVyL2pzL3V0aWxzL2JvZHlEYXlOaWdodENsYXNzZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlud2VhdGhlci9qcy91dGlscy9jaGFuZ2VVbml0cy5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW53ZWF0aGVyL2pzL3V0aWxzL2NvdW50cnlGbGFncy5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW53ZWF0aGVyL2pzL3V0aWxzL2NyZWF0ZU5vdGlmaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW53ZWF0aGVyL2pzL3V0aWxzL2N1cnJlbnRUaW1lVGltZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlud2VhdGhlci9qcy91dGlscy9kcmFnLmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbndlYXRoZXIvanMvdXRpbHMvZ2VuZXJhdGVEdWFsVmFsdWVGaWVsZHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlud2VhdGhlci9qcy91dGlscy9sb2NhbFRpbWUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlud2VhdGhlci9qcy91dGlscy9wb3B1bGF0ZURvbUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlud2VhdGhlci9qcy91dGlscy9yZXNvbHZlUGF0aC5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW53ZWF0aGVyL2pzL3V0aWxzL3Nob3doaWRlTG9hZGVyLmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbndlYXRoZXIvanMvdXRpbHMvc3VucmlzZXN1bnNldGljb25zLmpzIiwid2VicGFjazovL29kaW4vLi9zcmMvb2RpbndlYXRoZXIvanMvdXRpbHMvdXBkYXRlVGltZS5qcyIsIndlYnBhY2s6Ly9vZGluLy4vc3JjL29kaW53ZWF0aGVyL3Njc3Mvc3R5bGUuc2Nzcz8wN2I1Iiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9hZGRMZWFkaW5nWmVyb3MubWpzIiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9kZWZhdWx0T3B0aW9ucy5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2Zvcm1hdC9mb3JtYXR0ZXJzLm1qcyIsIndlYnBhY2s6Ly9vZGluLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZm9ybWF0L2xpZ2h0Rm9ybWF0dGVycy5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2Zvcm1hdC9sb25nRm9ybWF0dGVycy5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMubWpzIiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9wcm90ZWN0ZWRUb2tlbnMubWpzIiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29uc3RhbnRzLm1qcyIsIndlYnBhY2s6Ly9vZGluLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbnN0cnVjdEZyb20ubWpzIiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzLm1qcyIsIndlYnBhY2s6Ly9vZGluLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2Zvcm1hdC5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXREYXlPZlllYXIubWpzIiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0SVNPV2Vlay5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRJU09XZWVrWWVhci5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRXZWVrLm1qcyIsIndlYnBhY2s6Ly9vZGluLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldFdlZWtZZWFyLm1qcyIsIndlYnBhY2s6Ly9vZGluLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzRGF0ZS5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc1ZhbGlkLm1qcyIsIndlYnBhY2s6Ly9vZGluLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuLm1qcyIsIndlYnBhY2s6Ly9vZGluLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkTG9jYWxpemVGbi5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZE1hdGNoRm4ubWpzIiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMubWpzIiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0RGlzdGFuY2UubWpzIiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0TG9uZy5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRSZWxhdGl2ZS5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9sb2NhbGl6ZS5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9tYXRjaC5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mRGF5Lm1qcyIsIndlYnBhY2s6Ly9vZGluLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZJU09XZWVrLm1qcyIsIndlYnBhY2s6Ly9vZGluLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZJU09XZWVrWWVhci5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mV2Vlay5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mV2Vla1llYXIubWpzIiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZlllYXIubWpzIiwid2VicGFjazovL29kaW4vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvdG9EYXRlLm1qcyIsIndlYnBhY2s6Ly9vZGluL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi8uL3NyYy9vZGlud2VhdGhlci9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXQgYXBpJ3MgYmFzZSB1cmwgYW5kIHBhcmFtc1xuXG5jb25zdCBhcGkgPSB7XG5cdGxvY2F0aW9uOiB7XG5cdFx0dXJsOiBgaHR0cHM6Ly9hcGkubG9jYXRpb25pcS5jb20vdjEvYXV0b2NvbXBsZXRlLnBocGAsXG5cdFx0cGFyYW1zOiB7XG5cdFx0XHRrZXk6IFwicGsuZmE2ZTgwODA0ZjkyODk3ODc2NTk4NDZmODIyYjNlZTNcIixcblx0XHRcdHE6IFwiXCIsXG5cdFx0XHRsaW1pdDogNyxcblx0XHRcdGRlZHVwZTogMSxcbiAgICAgICAgICAgIG5vcm1hbGl6ZWNpdHk6IDEsXG5cdFx0XHR0YWc6IFwicGxhY2U6KlwiXG5cblx0XHR9LFxuXHR9LFxuXHR3ZWF0aGVyOiB7XG5cdFx0dXJsOiBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbmAsXG5cdFx0cGFyYW1zOiB7XG5cdFx0XHRrZXk6IFwiNjI4NTNkOWE0NWMxNDEzYjg5ZjIwMTczNzI0MDEwNlwiLFxuXHRcdFx0ZGF5czogNyxcblx0XHR9LFxuXHR9LFxufTtcblxuLyoqXG4gKiBGdW5jdGlvbiB0byBnZW5lcmF0ZSB0aGUgVVJMIGZvciBMb2NhdGlvbklRIEFQSS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgLSBUaGUgc2VhcmNoIHF1ZXJ5IGZvciBsb2NhdGlvbi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIFVSTCBmb3IgTG9jYXRpb25JUSBBUEkgd2l0aCB0aGUgcHJvdmlkZWQgcXVlcnkuXG4gKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHF1ZXJ5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEBleGFtcGxlXG4gKiBnZXRMb2NhdGlvbkFwaVVSTChcIk5ldyBZb3JrXCIpO1xuICogLy8gcmV0dXJucyBcImh0dHBzOi8vYXBpLmxvY2F0aW9uaXEuY29tL3YxL2F1dG9jb21wbGV0ZS5waHA/a2V5PXBrLmZhNmU4MDgwNGY5Mjg5Nzg3NjU5ODQ2ZjgyMmIzZWUzJnE9TmV3JTIwWW9yayZsaW1pdD01JmRlZHVwZT0xXCJcbiAqL1xuZnVuY3Rpb24gZ2V0TG9jYXRpb25BcGlVUkwocXVlcnkpIHtcblx0Y29uc3QgbG9jYXRpb24gPSB7IC4uLmFwaS5sb2NhdGlvbiB9O1xuXHRsb2NhdGlvbi5wYXJhbXMucSA9IHF1ZXJ5O1xuXHRyZXR1cm4gcG9wdWxhdGVQYXJhbXMobG9jYXRpb24udXJsLCBsb2NhdGlvbi5wYXJhbXMpO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIHRoZSBVUkwgZm9yIFdlYXRoZXIgQVBJLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHRoZSB3ZWF0aGVyIEFQSS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jaXR5XSAtIFRoZSBjaXR5IG5hbWUgZm9yIHRoZSB3ZWF0aGVyIGZvcmVjYXN0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmxhdF0gLSBUaGUgbGF0aXR1ZGUgZm9yIHRoZSB3ZWF0aGVyIGZvcmVjYXN0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmxvbl0gLSBUaGUgbG9uZ2l0dWRlIGZvciB0aGUgd2VhdGhlciBmb3JlY2FzdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIFVSTCBmb3IgV2VhdGhlciBBUEkgd2l0aCB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiBuZWl0aGVyIGNpdHkgbm9yIGJvdGggbGF0IGFuZCBsb24gYXJlIHByb3ZpZGVkLlxuICogQGV4YW1wbGVcbiAqIGdldFdlYXRoZXJBcGlVUkwoeyBjaXR5OiBcIk5ldyBZb3JrXCIgfSk7XG4gKiAvLyByZXR1cm5zIFwiaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9a2V5JmRheXM9NyZxPU5ldyUyMFlvcmtcIlxuICpcbiAqIGdldFdlYXRoZXJBcGlVUkwoeyBsYXQ6IDQwLjcxMjgsIGxvbjogLTc0LjAwNjAgfSk7XG4gKiAvLyByZXR1cm5zIFwiaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9a2V5JmRheXM9NyZxPTQwLjcxMjgsLTc0LjAwNjBcIlxuICovXG5mdW5jdGlvbiBnZXRXZWF0aGVyQXBpVVJMKHsgY2l0eSA9IG51bGwsIGxhdCA9IG51bGwsIGxvbiA9IG51bGwgfSkge1xuXHRjb25zdCB3ZWF0aGVyID0geyAuLi5hcGkud2VhdGhlciB9O1xuXHRjb25zdCBwYXJhbXMgPSB7IC4uLndlYXRoZXIucGFyYW1zIH07XG5cblx0aWYgKGNpdHkpIHtcblx0XHRwYXJhbXMucSA9IGVuY29kZVVSSUNvbXBvbmVudChjaXR5KTtcblx0fSBlbHNlIGlmIChsYXQgIT09IG51bGwgJiYgbG9uICE9PSBudWxsKSB7XG5cdFx0cGFyYW1zLnEgPSBgJHtsYXR9LCR7bG9ufWA7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiRWl0aGVyIGNpdHkgb3IgYm90aCBsYXQgYW5kIGxvbiBtdXN0IGJlIHByb3ZpZGVkXCIpO1xuXHR9XG5cblx0cmV0dXJuIHBvcHVsYXRlUGFyYW1zKHdlYXRoZXIudXJsLCBwYXJhbXMpO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIHBvcHVsYXRlIFVSTCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVXJsIC0gVGhlIGJhc2UgVVJMIGZvciB0aGUgQVBJIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIGJhc2UgVVJMLlxuICogQHJldHVybnMge3N0cmluZ30gLSBUaGUgVVJMIHdpdGggdGhlIGFwcGVuZGVkIHBhcmFtZXRlcnMuXG4gKi9cbmZ1bmN0aW9uIHBvcHVsYXRlUGFyYW1zKGJhc2VVcmwsIHBhcmFtcykge1xuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMocGFyYW1zKVxuICAgICAgICAubWFwKGtleSA9PiBgJHtrZXl9PSR7cGFyYW1zW2tleV19YClcbiAgICAgICAgLmpvaW4oJyYnKTtcbiAgICByZXR1cm4gYCR7YmFzZVVybH0/JHtxdWVyeVN0cmluZ31gO1xufVxuXG5leHBvcnQgeyBhcGksIGdldExvY2F0aW9uQXBpVVJMLCBnZXRXZWF0aGVyQXBpVVJMIH07XG4iLCJpbXBvcnQgeyBkaXNwbGF5RGF0YSB9IGZyb20gXCIuLi9jb21wb25lbnRzL2Rpc3BsYXlEYXRhXCI7XG5pbXBvcnQgeyBjcmVhdGVOb3RpZmljYXRpb24gfSBmcm9tIFwiLi4vdXRpbHMvY3JlYXRlTm90aWZpY2F0aW9uXCI7XG5pbXBvcnQgeyBzaG93TG9hZGVyLCBoaWRlTG9hZGVyIH0gZnJvbSBcIi4uL3V0aWxzL3Nob3doaWRlTG9hZGVyXCI7XG5cbi8vRmV0Y2hlcyBkYXRhIGZyb20gYSBnaXZlbiBVUkwgdXNpbmcgdGhlIEZldGNoIEFQSS5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YSh1cmwpIHtcblx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHsgbW9kZTogXCJjb3JzXCIgfSk7XG5cdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJOZXR3b3JrIHJlc3BvbnNlIHdhcyBub3Qgb2tcIik7XG5cdH1cblx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0cmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogRmV0Y2hlcyBkYXRhIGZyb20gYSBnaXZlbiBVUkwgYW5kIGRpc3BsYXlzIGl0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgVVJMIGZyb20gd2hpY2ggdG8gZmV0Y2ggZGF0YS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBuZXR3b3JrIHJlc3BvbnNlIGlzIG5vdCBvay5cbiAqL1xuZnVuY3Rpb24gZmV0Y2hBbmREaXNwbGF5RGF0YSh1cmwpIHtcblx0Ly8gU2hvdyBsb2FkaW5nIGluZGljYXRvclxuXHRzaG93TG9hZGVyKCk7XG5cblx0Ly8gRmV0Y2ggZGF0YSBmcm9tIHRoZSBwcm92aWRlZCBVUkxcblx0ZmV0Y2hEYXRhKHVybClcblx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coZGF0YSk7IC8vIERlYnVnXG5cblx0XHRcdC8vIEhpZGUgbG9hZGluZyBpbmRpY2F0b3Jcblx0XHRcdGhpZGVMb2FkZXIoKTtcblxuXHRcdFx0Ly8gRGlzcGxheSB0aGUgZmV0Y2hlZCBkYXRhXG5cdFx0XHRkaXNwbGF5RGF0YShkYXRhKTtcblx0XHR9KVxuXHRcdC5jYXRjaCgoZXJyKSA9PiB7XG5cdFx0XHQvLyBMb2cgZXJyb3IgdG8gY29uc29sZVxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGRhdGE6IFwiLCBlcnIpO1xuXG5cdFx0XHQvLyBTaG93IGEgbm90aWZpY2F0aW9uIHRvIHRoZSB1c2VyXG5cdFx0XHRjcmVhdGVOb3RpZmljYXRpb24oXCJMb2NhdGlvbiBub3QgZm91bmRcIiwgXCJ0b2FzdFwiKTtcblxuXHRcdFx0Ly8gSGlkZSBsb2FkaW5nIGluZGljYXRvclxuXHRcdFx0aGlkZUxvYWRlcigpO1xuXHRcdH0pO1xufVxuXG5leHBvcnQgeyBmZXRjaERhdGEsIGZldGNoQW5kRGlzcGxheURhdGEgfTtcbiIsImltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG5mdW5jdGlvbiBnZXRMb2NhdGlvbkRhdGEoZGF0YSkge1xuXHRjb25zdCBbZGF0ZSwgdGltZV0gPSBkYXRhLmxvY2FsdGltZS5zcGxpdChcIiBcIik7XG5cdGNvbnN0IGZvcm1hdHRlZERhdGUgPSBmb3JtYXREYXRlKGRhdGUpO1xuXHRjb25zdCBmb3JtYXR0ZWRUaW1lID0gZm9ybWF0VGltZSh0aW1lKTtcblxuXHRyZXR1cm4ge1xuXHRcdGNvdW50cnk6IGRhdGEuY291bnRyeSxcblx0XHRjaXR5OiBkYXRhLm5hbWUsXG5cdFx0bGF0OiBkYXRhLmxhdCxcblx0XHRsb246IGRhdGEubG9uLFxuXHRcdGxvY2FsdGltZToge1xuXHRcdFx0ZGF0ZTogZm9ybWF0dGVkRGF0ZSxcblx0XHRcdHRpbWU6IGZvcm1hdHRlZFRpbWUsXG5cdFx0fSxcblx0XHR0el9pZDogZGF0YS50el9pZCxcblx0XHRyZWdpb246IGRhdGEucmVnaW9uLFxuXHR9O1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50RGF0YShkYXRhKSB7XG5cdHJldHVybiB7XG5cdFx0Y2xvdWRzOiBkYXRhLmNsb3VkLFxuXHRcdGNvZGU6IGRhdGEuY29uZGl0aW9uLmNvZGUsXG5cdFx0aWNvbjogZGF0YS5jb25kaXRpb24uaWNvbixcblx0XHRpY29uQ29kZTogZXh0cmFjdEljb25Db2RlKGRhdGEuY29uZGl0aW9uLmljb24pLFxuXHRcdHRleHQ6IGRhdGEuY29uZGl0aW9uLnRleHQsXG5cdFx0aHVtaWRpdHk6IGRhdGEuaHVtaWRpdHksXG5cdFx0dXY6IGRhdGEudXYsXG5cdFx0d2luZERpcjogZGF0YS53aW5kX2Rpcixcblx0XHRmZWVsc0xpa2U6IHtcblx0XHRcdG1ldHJpYzogZGF0YS5mZWVsc2xpa2VfYyxcblx0XHRcdGltcGVyaWFsOiBkYXRhLmZlZWxzbGlrZV9mLFxuXHRcdH0sXG5cdFx0dGVtcDoge1xuXHRcdFx0bWV0cmljOiBkYXRhLnRlbXBfYyxcblx0XHRcdGltcGVyaWFsOiBNYXRoLnJvdW5kKGRhdGEudGVtcF9mKSxcblx0XHR9LFxuXHRcdHdpbmQ6IHtcblx0XHRcdG1ldHJpYzogZGF0YS53aW5kX2twaCxcblx0XHRcdGltcGVyaWFsOiBkYXRhLndpbmRfbXBoLFxuXHRcdH0sXG5cdFx0cHJlY2lwaXRhdGlvbjoge1xuXHRcdFx0bWV0cmljOiBkYXRhLnByZWNpcF9tbSxcblx0XHRcdGltcGVyaWFsOiBkYXRhLnByZWNpcF9pbixcblx0XHR9LFxuXHRcdGlzRGF5OiBkYXRhLmlzX2RheSxcblx0fTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9yZWNhc3REYXRhKGRhdGEsIGxvY2F0aW9uKSB7XG5cdGNvbnN0IGZvcmVjYXN0RGF5cyA9IGRhdGEuZm9yZWNhc3RkYXkubWFwKChkYXkpID0+IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGF0ZTogZm9ybWF0RGF0ZShkYXkuZGF0ZSksXG5cdFx0XHRhc3Rybzoge1xuXHRcdFx0XHRzdW5yaXNlOiBkYXkuYXN0cm8uc3VucmlzZSxcblx0XHRcdFx0c3Vuc2V0OiBkYXkuYXN0cm8uc3Vuc2V0LFxuXHRcdFx0fSxcblx0XHRcdGNvbmRpdGlvbjogZGF5LmRheS5jb25kaXRpb24udGV4dCxcblx0XHRcdGNvbmRpdGlvbkljb246IGRheS5kYXkuY29uZGl0aW9uLmljb24sXG5cdFx0XHRpY29uQ29kZTogZXh0cmFjdEljb25Db2RlKGRheS5kYXkuY29uZGl0aW9uLmljb24pLFxuXHRcdFx0Y2hhbmNlT2ZSYWluOiBkYXkuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluLFxuXHRcdFx0Y2hhbmNlT2ZTbm93OiBkYXkuZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93LFxuXHRcdFx0dGVtcDoge1xuXHRcdFx0XHRtYXg6IHtcblx0XHRcdFx0XHRtZXRyaWM6IGRheS5kYXkubWF4dGVtcF9jLFxuXHRcdFx0XHRcdGltcGVyaWFsOiBkYXkuZGF5Lm1heHRlbXBfZixcblx0XHRcdFx0fSxcblx0XHRcdFx0bWluOiB7XG5cdFx0XHRcdFx0bWV0cmljOiBkYXkuZGF5Lm1pbnRlbXBfYyxcblx0XHRcdFx0XHRpbXBlcmlhbDogZGF5LmRheS5taW50ZW1wX2YsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0cHJlY2lwOiB7XG5cdFx0XHRcdG1ldHJpYzogZGF5LmRheS50b3RhbHByZWNpcF9tbSxcblx0XHRcdFx0aW1wZXJpYWw6IGRheS5kYXkudG90YWxwcmVjaXBfaW4sXG5cdFx0XHR9LFxuXHRcdH07XG5cdH0pO1xuXG5cdGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUobG9jYXRpb24ubG9jYWx0aW1lKTtcblx0Y29uc3QgY3VycmVudEhvdXIgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xuXHRsZXQgbmV4dDI0SG91cnMgPSBbXTtcblxuXHRjb25zdCBjdXJyZW50RGF5SG91cnMgPSBkYXRhLmZvcmVjYXN0ZGF5WzBdLmhvdXIuc2xpY2UoY3VycmVudEhvdXIgKyAxKTtcblxuXHQvLyBHZXQgdGhlIGhvdXJzIGZyb20gdGhlIG5leHQgZGF5KHMpIGlmIG5lZWRlZFxuXHRsZXQgcmVtYWluaW5nSG91cnMgPSAyNCAtIGN1cnJlbnREYXlIb3Vycy5sZW5ndGg7XG5cdGlmIChyZW1haW5pbmdIb3VycyA+IDApIHtcblx0XHRmb3IgKGxldCBpID0gMTsgaSA8IGRhdGEuZm9yZWNhc3RkYXkubGVuZ3RoICYmIHJlbWFpbmluZ0hvdXJzID4gMDsgaSsrKSB7XG5cdFx0XHRjb25zdCBuZXh0RGF5SG91cnMgPSBkYXRhLmZvcmVjYXN0ZGF5W2ldLmhvdXIuc2xpY2UoMCwgcmVtYWluaW5nSG91cnMpO1xuXHRcdFx0bmV4dDI0SG91cnMgPSBuZXh0MjRIb3Vycy5jb25jYXQobmV4dERheUhvdXJzKTtcblx0XHRcdHJlbWFpbmluZ0hvdXJzIC09IG5leHREYXlIb3Vycy5sZW5ndGg7XG5cdFx0fVxuXHR9XG5cblx0bmV4dDI0SG91cnMgPSBjdXJyZW50RGF5SG91cnMuY29uY2F0KG5leHQyNEhvdXJzKTtcblxuXHRuZXh0MjRIb3VycyA9IG5leHQyNEhvdXJzLm1hcCgoaG91cikgPT4ge1xuXHRcdGNvbnN0IHRpbWUgPSBob3VyLnRpbWUuc3BsaXQoXCIgXCIpWzFdO1xuXHRcdGNvbnN0IGRhdGUgPSBob3VyLnRpbWUuc3BsaXQoXCIgXCIpWzBdO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGRhdGU6IGZvcm1hdERheURhdGUoZGF0ZSksXG5cdFx0XHR0aW1lOiB0aW1lLFxuXHRcdFx0dGVtcDoge1xuXHRcdFx0XHRtZXRyaWM6IGhvdXIudGVtcF9jLFxuXHRcdFx0XHRpbXBlcmlhbDogaG91ci50ZW1wX2YsXG5cdFx0XHR9LFxuXHRcdFx0ZmVlbHNMaWtlOiB7XG5cdFx0XHRcdG1ldHJpYzogaG91ci5mZWVsc2xpa2VfYyxcblx0XHRcdFx0aW1wZXJpYWw6IGhvdXIuZmVlbHNsaWtlX2YsXG5cdFx0XHR9LFxuXHRcdFx0cHJlY2lwOiB7XG5cdFx0XHRcdG1ldHJpYzogaG91ci5wcmVjaXBfbW0sXG5cdFx0XHRcdGltcGVyaWFsOiBob3VyLnByZWNpcF9pbixcblx0XHRcdH0sXG5cdFx0XHR3aW5kOiB7XG5cdFx0XHRcdG1ldHJpYzogaG91ci53aW5kX2twaCxcblx0XHRcdFx0aW1wZXJpYWw6IGhvdXIud2luZF9tcGgsXG5cdFx0XHR9LFxuXHRcdFx0Y29uZGl0aW9uOiBob3VyLmNvbmRpdGlvbi50ZXh0LFxuXHRcdFx0Y29uZGl0aW9uSWNvbjogaG91ci5jb25kaXRpb24uaWNvbixcblx0XHRcdGljb25Db2RlOiBleHRyYWN0SWNvbkNvZGUoaG91ci5jb25kaXRpb24uaWNvbiksXG5cdFx0XHRjaGFuY2VPZlJhaW46IGhvdXIuY2hhbmNlX29mX3JhaW4sXG5cdFx0XHRjaGFuY2VPZlNub3c6IGhvdXIuY2hhbmNlX29mX3Nub3csXG5cdFx0fTtcblx0fSk7XG5cblx0cmV0dXJuIHtcblx0XHRmb3JlY2FzdERheXMsXG5cdFx0Y3VycmVudERheUhvdXJzOiBuZXh0MjRIb3Vycyxcblx0fTtcbn1cblxuY29uc3QgZm9ybWF0RGF0ZSA9ICh2YWx1ZSkgPT4ge1xuXHRjb25zdCBmb3JtYXR0ZWREYXRlID0gZm9ybWF0KHZhbHVlLCBcIkUsIE1NTU0gZG8sIHl5eXlcIik7XG5cdHJldHVybiBmb3JtYXR0ZWREYXRlLnJlcGxhY2UoLyhcXGQrKShzdHxuZHxyZHx0aCkvLCBcIiQxPHN1cD4kMjwvc3VwPlwiKTtcbn07XG5cbmNvbnN0IGZvcm1hdERheURhdGUgPSAodmFsdWUpID0+IHtcblx0Y29uc3QgZm9ybWF0dGVkRGF0ZSA9IGZvcm1hdCh2YWx1ZSwgXCJFLCBkb1wiKTtcblx0cmV0dXJuIGZvcm1hdHRlZERhdGUucmVwbGFjZSgvKFxcZCspKHN0fG5kfHJkfHRoKS8sIFwiJDE8c3VwPiQyPC9zdXA+XCIpO1xufTtcblxuY29uc3QgZm9ybWF0VGltZSA9ICh0aW1lU3RyaW5nKSA9PiB7XG5cdGNvbnN0IFtob3Vyc10gPSB0aW1lU3RyaW5nLnNwbGl0KFwiOlwiKTtcblx0Y29uc3QgbWlucyA9IG5ldyBEYXRlKCkuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuXHRjb25zdCBzZWNvbmRzID0gbmV3IERhdGUoKS5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cdGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBgJHtob3Vycy5wYWRTdGFydCgyLCBcIjBcIil9OiR7bWluc306JHtzZWNvbmRzfWA7XG5cdHJldHVybiBmb3JtYXR0ZWRUaW1lO1xufTtcblxuY29uc3QgZXh0cmFjdEljb25Db2RlID0gKGRhdGEpID0+IHtcblx0Y29uc3QgW2RheU9yTmlnaHQsIGNvZGVdID0gIFtkYXRhLnNwbGl0KCcvJylbNV0sIGRhdGEuc3BsaXQoJy8nKVs2XS5zcGxpdCgnLicpWzBdXTtcblx0cmV0dXJuIHtkYXlPck5pZ2h0LCBjb2RlfTtcbn1cblxuZXhwb3J0IHsgZ2V0TG9jYXRpb25EYXRhLCBnZXRDdXJyZW50RGF0YSwgZ2V0Rm9yZWNhc3REYXRhIH07XG4iLCJpbXBvcnQgeyBnZXRMb2NhdGlvbkRhdGEsIGdldEN1cnJlbnREYXRhLCBnZXRGb3JlY2FzdERhdGEgfSBmcm9tIFwiLi4vYXBpL3dlYXRoZXJEYXRhXCI7XG5pbXBvcnQgeyBwb3B1bGF0ZUxvY2F0aW9uLCBwb3B1bGF0ZUN1cnJlbnQsIHBvcHVsYXRlRm9yZWNhc3QgfSBmcm9tIFwiLi9wb3B1bGF0ZURvbVwiO1xuXG4vKipcbiAqIERpc3BsYXlzIHRoZSB3ZWF0aGVyIGRhdGEgb24gdGhlIHdlYnBhZ2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgd2VhdGhlciBkYXRhIG9iamVjdCBjb250YWluaW5nIGxvY2F0aW9uLCBjdXJyZW50LCBhbmQgZm9yZWNhc3QgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YS5sb2NhdGlvbiAtIFRoZSBsb2NhdGlvbiBkYXRhIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLmN1cnJlbnQgLSBUaGUgY3VycmVudCB3ZWF0aGVyIGRhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEuZm9yZWNhc3QgLSBUaGUgZm9yZWNhc3Qgd2VhdGhlciBkYXRhIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gZGlzcGxheURhdGEoZGF0YSkge1xuXHRjb25zdCBmb3JtYXRlZExvY2F0aW9uID0gZ2V0TG9jYXRpb25EYXRhKGRhdGEubG9jYXRpb24pO1xuXHRjb25zdCBmb3JtYXRlZEN1cnJlbnQgPSBnZXRDdXJyZW50RGF0YShkYXRhLmN1cnJlbnQpO1xuXHRjb25zdCBmb3JtYXRlZEZvcmVjYXN0ID0gZ2V0Rm9yZWNhc3REYXRhKGRhdGEuZm9yZWNhc3QsIGRhdGEubG9jYXRpb24pO1xuXG5cdHBvcHVsYXRlTG9jYXRpb24oZm9ybWF0ZWRMb2NhdGlvbik7XG5cdHBvcHVsYXRlQ3VycmVudChmb3JtYXRlZEN1cnJlbnQpO1xuXHRwb3B1bGF0ZUZvcmVjYXN0KGZvcm1hdGVkRm9yZWNhc3QpO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5RGF0YSB9O1xuIiwiLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIHVzZXIncyBnZW9sb2NhdGlvbiB1c2luZyB0aGUgYnJvd3NlcidzIGdlb2xvY2F0aW9uIEFQSS5cbiAqIElmIHRoZSB1c2VyJ3MgbG9jYXRpb24gaXMgc3VjY2Vzc2Z1bGx5IHJldHJpZXZlZCxcbiAqIGl0IHJldHVybnMgYW4gb2JqZWN0IHdpdGggbGF0aXR1ZGUsIGxvbmdpdHVkZSwgYW5kIGEgZmxhZyBpbmRpY2F0aW5nIHRoYXQgdGhlIGxvY2F0aW9uIGlzIG5vdCBkZWZhdWx0LlxuICpcbiAqIElmIHRoZSB1c2VyJ3MgbG9jYXRpb24gcmV0cmlldmFsIGZhaWxzLFxuICogaXQgbG9ncyBhIHdhcm5pbmcgbWVzc2FnZSBhbmQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBkZWZhdWx0IExvbmRvbiBjb29yZGluYXRlcyBhbmQgYSBmbGFnIGluZGljYXRpbmcgdGhhdCB0aGUgbG9jYXRpb24gaXMgZGVmYXVsdC5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBvYmplY3QgY29udGFpbmluZ1xuICogdGhlIHVzZXIncyBsYXRpdHVkZSwgbG9uZ2l0dWRlLCBhbmQgYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0aGUgbG9jYXRpb24gaXMgZGVmYXVsdC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb24oKSB7XG5cdHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG5cdFx0XHQoZGF0YSkgPT4ge1xuXHRcdFx0XHRjb25zdCBjb29yZHMgPSB7XG5cdFx0XHRcdFx0bGF0OiBkYXRhLmNvb3Jkcy5sYXRpdHVkZSxcblx0XHRcdFx0XHRsb246IGRhdGEuY29vcmRzLmxvbmdpdHVkZSxcblx0XHRcdFx0XHRkZWZhdWx0OiBmYWxzZSxcblx0XHRcdFx0fTtcblx0XHRcdFx0Y29uc29sZS5pbmZvKFwiU3VjY2VzczogTG9jYXRpb24gcmV0cmlldmVkIGZyb20gYnJvd3Nlci4gTGF0ID0gJXMsIExvbiA9ICVzXCIsIGNvb3Jkcy5sYXQsIGNvb3Jkcy5sb24pO1xuXHRcdFx0XHRyZXNvbHZlKGNvb3Jkcyk7XG5cdFx0XHR9LFxuXHRcdFx0KGVycikgPT4ge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJXYXJuaW5nOiAlcy4gRGVmYXVsdGluZyB0byBMb25kb24uXCIsIGVyci5tZXNzYWdlKTtcblx0XHRcdFx0Y29uc3QgY29vcmRzID0ge1xuXHRcdFx0XHRcdGxhdDogNTEuNTIsXG5cdFx0XHRcdFx0bG9uOiAtMC4xMSxcblx0XHRcdFx0XHRkZWZhdWx0OiB0cnVlLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXNvbHZlKGNvb3Jkcyk7XG5cdFx0XHR9XG5cdFx0KTtcblx0fSk7XG59XG5cbi8qKlxuICogRmV0Y2hlcyB0aGUgdXNlcidzIGdlb2xvY2F0aW9uIGJ5IGNhbGxpbmcgdGhlIGdldExvY2F0aW9uIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIG9iamVjdCBjb250YWluaW5nXG4gKiB0aGUgdXNlcidzIGxhdGl0dWRlLCBsb25naXR1ZGUsIGFuZCBhIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBsb2NhdGlvbiBpcyBkZWZhdWx0LlxuICpcbiAqIEBleGFtcGxlXG4gKiBmZXRjaFVzZXJMb2NhdGlvbigpLnRoZW4oKGxvY2F0aW9uKSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coYFVzZXIncyBsb2NhdGlvbjogTGF0ID0gJHtsb2NhdGlvbi5sYXR9LCBMb24gPSAke2xvY2F0aW9uLmxvbn0sIERlZmF1bHQgPSAke2xvY2F0aW9uLmRlZmF1bHR9YCk7XG4gKiB9KTtcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hVc2VyTG9jYXRpb24oKSB7XG5cdGNvbnN0IGxvY2F0aW9uID0gYXdhaXQgZ2V0TG9jYXRpb24oKTtcblx0cmV0dXJuIGxvY2F0aW9uO1xufVxuXG5leHBvcnQgeyBmZXRjaFVzZXJMb2NhdGlvbiB9O1xuIiwiaW1wb3J0IHsgcG9wdWxhdGVET01FbGVtZW50IH0gZnJvbSBcIi4uL3V0aWxzL3BvcHVsYXRlRG9tRWxlbWVudFwiO1xuaW1wb3J0IHsgZ2V0RmxhZyB9IGZyb20gXCIuLi91dGlscy9jb3VudHJ5RmxhZ3NcIjtcbmltcG9ydCB7IGdlbmVyYXRlRHVhbFZhbHVlRmllbGRzIH0gZnJvbSBcIi4uL3V0aWxzL2dlbmVyYXRlRHVhbFZhbHVlRmllbGRzXCI7XG5pbXBvcnQgeyBzdW5yaXNlSWNvbiwgc3Vuc2V0SWNvbiB9IGZyb20gXCIuLi91dGlscy9zdW5yaXNlc3Vuc2V0aWNvbnNcIjtcbmltcG9ydCB7IHVwZGF0ZVRpbWVDb250YWluZXIgfSBmcm9tIFwiLi4vdXRpbHMvY3VycmVudFRpbWVUaW1lclwiO1xuaW1wb3J0IHsgc2V0RGF5TmlnaHRDbGFzc2VzT25Cb2R5IH0gZnJvbSBcIi4uL3V0aWxzL2JvZHlEYXlOaWdodENsYXNzZXNcIjtcblxuXG5mdW5jdGlvbiBwb3B1bGF0ZUxvY2F0aW9uKGRhdGEpIHtcblx0cG9wdWxhdGVET01FbGVtZW50KFwiI2xvY2F0aW9uQ2l0eVwiLCBgJHtkYXRhLmNpdHl9YCk7XG5cdHBvcHVsYXRlRE9NRWxlbWVudChcIiNsb2NhdGlvblJlZ2lvblwiLCBgUmVnaW9uOiAke2RhdGEucmVnaW9ufSBgKTtcblx0cG9wdWxhdGVET01FbGVtZW50KFwiI2xvY2F0aW9uQ291bnRyeVwiLCBgJHtnZXRGbGFnKGRhdGEpfSAke2RhdGEuY291bnRyeX1gKTtcblx0cG9wdWxhdGVET01FbGVtZW50KFwiI2xvY2F0aW9uQ29vcmRzXCIsIGAke2RhdGEubGF0fSwgJHtkYXRhLmxvbn1gKTtcblx0dXBkYXRlVGltZUNvbnRhaW5lcihkYXRhKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHBvcHVsYXRlQ3VycmVudChkYXRhKSB7XG5cdHNldERheU5pZ2h0Q2xhc3Nlc09uQm9keShkYXRhKTtcblxuXHRjb25zdCBjdXJyZW50VGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1jdXJyZW50LXRlbXBcIik7XG5cblx0Z2VuZXJhdGVEdWFsVmFsdWVGaWVsZHMoY3VycmVudFRlbXBDb250YWluZXIsIFwidGVtcFwiLCBcIiZkZWdcIiwgXCImZGVnXCIsIGRhdGEpO1xuXG5cblx0Y29uc3QgY3VycmVudEljb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnJlbnRJY29uXCIpO1xuXHRjdXJyZW50SWNvbkNvbnRhaW5lci5zcmMgPSBnZW5lcmF0ZUljb25VcmwoZGF0YSk7XG5cblx0Y29uc3QgY3VycmVudFRleHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnJlbnRUZXh0XCIpO1xuXHRjdXJyZW50VGV4dENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLnRleHQ7XG5cblxuXHRjb25zdCBjdXJyZW50SHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnJlbnRIdW1pZGl0eVwiKTtcblx0Y3VycmVudEh1bWlkaXR5Q29udGFpbmVyLmlubmVySFRNTCA9IGAke2RhdGEuaHVtaWRpdHl9PHNwYW4gY2xhc3M9XCJ1bml0XCI+JTxzcGFuPmA7XG5cblx0Y29uc3QgY3VycmVudFdpbmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItY3VycmVudC13aW5kLXZhbHVlc1wiKTtcblx0Z2VuZXJhdGVEdWFsVmFsdWVGaWVsZHMoY3VycmVudFdpbmRDb250YWluZXIsIFwid2luZFwiLCBcIiBrcGhcIiwgXCIgbXBoXCIsIGRhdGEpO1xuXG5cdGNvbnN0IGN1cnJlbnRQcmVjaXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItY3VycmVudC1wcmVjaXBpdGF0aW9uLXZhbHVlc1wiKTtcblx0Z2VuZXJhdGVEdWFsVmFsdWVGaWVsZHMoY3VycmVudFByZWNpcENvbnRhaW5lciwgXCJwcmVjaXBpdGF0aW9uXCIsIFwiIG1tXCIsIFwiIGluXCIsIGRhdGEpO1xuXG5cdGNvbnN0IGN1cnJlbnRDbG91ZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJDdXJyZW50Q2xvdWRzXCIpO1xuXHRjdXJyZW50Q2xvdWRzQ29udGFpbmVyLmlubmVySFRNTCA9IGAke2RhdGEuY2xvdWRzfTxzcGFuIGNsYXNzPVwidW5pdFwiPiU8c3Bhbj5gO1xuXG5cdGNvbnN0IGN1cnJlbnRXaW5kRGlyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyQ3VycmVudFdpbmREaXJcIik7XG5cdGN1cnJlbnRXaW5kRGlyQ29udGFpbmVyLmlubmVySFRNTCA9IGAke2RhdGEud2luZERpcn1gO1xuXG5cdGNvbnN0IGN1cnJlbnRVVkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlckN1cnJlbnRVVlwiKTtcblx0Y3VycmVudFVWQ29udGFpbmVyLmlubmVySFRNTCA9IGAke2RhdGEudXZ9YDtcblxufVxuXG5cblxuZnVuY3Rpb24gcG9wdWxhdGVGb3JlY2FzdChkYXRhKSB7XG5cdGNvbnN0IGFzdHJvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hc3Ryb1wiKTtcblx0YXN0cm9Db250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxzcGFuPiR7c3VucmlzZUljb259ICR7ZGF0YS5mb3JlY2FzdERheXNbMF0uYXN0cm8uc3VucmlzZX08L3NwYW4+XG4gICAgPHNwYW4+JHtzdW5zZXRJY29ufSAke2RhdGEuZm9yZWNhc3REYXlzWzBdLmFzdHJvLnN1bnNldH08L3NwYW4+YDtcblxuXHRjb25zdCBuZXh0RGF5c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlck5leHREYXlzXCIpO1xuXHRuZXh0RGF5c0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG5cdGRhdGEuZm9yZWNhc3REYXlzLmZvckVhY2goKGRheSkgPT4ge1xuXHRcdGNvbnN0IGRheUNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGRheUNhcmQuY2xhc3NOYW1lID0gXCJ3ZWF0aGVyLWRheS1jYXJkXCI7XG5cblx0XHRjb25zdCBkYXlEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRkYXlEYXRlLmNsYXNzTmFtZSA9IFwid2VhdGhlci1jYXJkLWRhdGVcIjtcblx0XHRkYXlEYXRlLmlubmVySFRNTCA9IGRheS5kYXRlO1xuXG5cdFx0Y29uc3QgZGF5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cdFx0Ly8gZGF5SWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZGF5LmNvbmRpdGlvbkljb24pO1xuXHRcdGRheUljb24uc2V0QXR0cmlidXRlKFwic3JjXCIsIGdlbmVyYXRlSWNvblVybChkYXkpKTtcblx0XHRkYXlJY29uLnNldEF0dHJpYnV0ZShcImFsdFwiLCBkYXkuY29uZGl0aW9uKTtcblxuXHRcdGNvbnN0IGRheUNvbmRpdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcblx0XHRkYXlDb25kaXRpb24uY2xhc3NMaXN0LmFkZChcIndlYXRoZXItY29uZGl0aW9uXCIpO1xuXHRcdGRheUNvbmRpdGlvbi5pbm5lckhUTUwgPSBkYXkuY29uZGl0aW9uO1xuXG5cdFx0Y29uc3QgZGF5RGV0YWlsc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0ZGF5RGV0YWlsc0NvbnRhaW5lci5jbGFzc05hbWUgPSBcIndlYXRoZXItY2FyZC1kZXRhaWxzXCI7XG5cblx0XHRjb25zdCB0ZW1wQ29udGFpbmVyTWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0ZW1wQ29udGFpbmVyTWluLmNsYXNzTGlzdC5hZGQoXCJ3ZWF0aGVyLWNhcmQtdGVtcC1taW5cIik7XG5cblx0XHRjb25zdCB0ZW1wQ29udGFpbmVyTWluSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXHRcdHRlbXBDb250YWluZXJNaW5JY29uLmNsYXNzTGlzdC5hZGQoXCJ0ZW1wLWljb25cIik7XG5cdFx0dGVtcENvbnRhaW5lck1pbkljb24udGV4dENvbnRlbnQgPSBcImxvXCI7XG5cblx0XHRjb25zdCB0ZW1wQ29udGFpbmVyTWluRHVhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dGVtcENvbnRhaW5lck1pbkR1YWwuY2xhc3NMaXN0LmFkZChcIndlYXRoZXItZGF5LWR1YWxzXCIpO1xuXHRcdGdlbmVyYXRlRHVhbFZhbHVlRmllbGRzKHRlbXBDb250YWluZXJNaW5EdWFsLCBcInRlbXAubWluXCIsIFwiJmRlZztcIiwgXCImZGVnO1wiLCBkYXkpO1xuXG5cdFx0dGVtcENvbnRhaW5lck1pbi5hcHBlbmRDaGlsZCh0ZW1wQ29udGFpbmVyTWluSWNvbik7XG5cdFx0dGVtcENvbnRhaW5lck1pbi5hcHBlbmRDaGlsZCh0ZW1wQ29udGFpbmVyTWluRHVhbCk7XG5cblx0XHRjb25zdCBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRkaXZpZGVyLmNsYXNzTGlzdC5hZGQoXCJ3ZWF0aGVyLWNhcmQtZGl2aWRlclwiKTtcblx0XHRkaXZpZGVyLmlubmVySFRNTCA9IFwiIHwgXCI7XG5cblx0XHRjb25zdCB0ZW1wQ29udGFpbmVyTWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0ZW1wQ29udGFpbmVyTWF4LmNsYXNzTGlzdC5hZGQoXCJ3ZWF0aGVyLWNhcmQtdGVtcC1tYXhcIik7XG5cblx0XHRjb25zdCB0ZW1wQ29udGFpbmVyTWF4SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXHRcdHRlbXBDb250YWluZXJNYXhJY29uLmNsYXNzTGlzdC5hZGQoXCJ0ZW1wLWljb25cIik7XG5cdFx0dGVtcENvbnRhaW5lck1heEljb24udGV4dENvbnRlbnQgPSBcImhpXCI7XG5cblx0XHRjb25zdCB0ZW1wQ29udGFpbmVyTWF4RHVhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0dGVtcENvbnRhaW5lck1heER1YWwuY2xhc3NMaXN0LmFkZChcIndlYXRoZXItZGF5LWR1YWxzXCIpO1xuXHRcdGdlbmVyYXRlRHVhbFZhbHVlRmllbGRzKHRlbXBDb250YWluZXJNYXhEdWFsLCBcInRlbXAubWF4XCIsIFwiJmRlZztcIiwgXCImZGVnO1wiLCBkYXkpO1xuXG5cdFx0dGVtcENvbnRhaW5lck1heC5hcHBlbmRDaGlsZCh0ZW1wQ29udGFpbmVyTWF4SWNvbik7XG5cdFx0dGVtcENvbnRhaW5lck1heC5hcHBlbmRDaGlsZCh0ZW1wQ29udGFpbmVyTWF4RHVhbCk7XG5cblx0XHRjb25zdCBkYXlQcmVjaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGRheVByZWNpcC5jbGFzc0xpc3QuYWRkKFwid2VhdGhlci1kYXktcHJlY2lwXCIpO1xuXG5cdFx0Y29uc3QgZGF5UHJlY2lwSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXHRcdGRheVByZWNpcEljb24uY2xhc3NMaXN0LmFkZChcImljb25cIik7XG5cdFx0ZGF5UHJlY2lwSWNvbi50ZXh0Q29udGVudCA9IFwicmFpbnlcIjtcblxuXHRcdGNvbnN0IGRheVByZWNpcFZhbHVlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0Z2VuZXJhdGVEdWFsVmFsdWVGaWVsZHMoZGF5UHJlY2lwVmFsdWVzLCBcInByZWNpcFwiLCBcIiBtbVwiLCBcIiBpblwiLCBkYXkpO1xuXG5cdFx0ZGF5UHJlY2lwLmFwcGVuZENoaWxkKGRheVByZWNpcEljb24pO1xuXHRcdGRheVByZWNpcC5hcHBlbmRDaGlsZChkYXlQcmVjaXBWYWx1ZXMpO1xuXG5cdFx0ZGF5RGV0YWlsc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZW1wQ29udGFpbmVyTWluKTtcblx0XHRkYXlEZXRhaWxzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdmlkZXIpO1xuXHRcdGRheURldGFpbHNDb250YWluZXIuYXBwZW5kQ2hpbGQodGVtcENvbnRhaW5lck1heCk7XG5cdFx0ZGF5RGV0YWlsc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlQcmVjaXApO1xuXG5cdFx0Ly9Db25zdHJ1Y3QgdGhlIFdlYXRoZXIgRGF5IENhcmRcblx0XHRkYXlDYXJkLmFwcGVuZENoaWxkKGRheURhdGUpO1xuXHRcdGRheUNhcmQuYXBwZW5kQ2hpbGQoZGF5SWNvbik7XG5cdFx0ZGF5Q2FyZC5hcHBlbmRDaGlsZChkYXlDb25kaXRpb24pO1xuXHRcdGRheUNhcmQuYXBwZW5kQ2hpbGQoZGF5RGV0YWlsc0NvbnRhaW5lcik7XG5cblx0XHRuZXh0RGF5c0NvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlDYXJkKTtcblx0fSk7XG5cblx0Y29uc3Qgd2VhdGhlckhvdXJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVySG91cnNDb250YWluZXJcIik7XG5cdHdlYXRoZXJIb3Vyc0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXHR3ZWF0aGVySG91cnNDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwiZmFsc2VcIik7XG5cblx0ZGF0YS5jdXJyZW50RGF5SG91cnMuZm9yRWFjaCgoaG91ciwgaW5kZXgpID0+IHtcblx0XHRjb25zdCBob3VyQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0aG91ckNhcmQuY2xhc3NOYW1lID0gXCJ3ZWF0aGVyLWhvdXItY2FyZFwiO1xuXHRcdGhvdXJDYXJkLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcImZhbHNlXCIpO1xuXG5cdFx0Ly8gdGltZVxuXHRcdGNvbnN0IGhvdXJEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRob3VyRGF0ZS5jbGFzc0xpc3QuYWRkKFwid2VhdGhlci1ob3VyLXZhbHVlXCIpO1xuXHRcdGhvdXJEYXRlLmlubmVySFRNTCA9IGhvdXIuZGF0ZTtcblxuXHRcdC8vIHRpbWVcblx0XHRjb25zdCBob3VyVmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGhvdXJWYWx1ZS5jbGFzc0xpc3QuYWRkKFwid2VhdGhlci1ob3VyLXZhbHVlXCIpO1xuXHRcdFxuXHRcdGlmIChpbmRleCA9PT0gMCkge1xuXHRcdFx0aG91clZhbHVlLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIndlYXRoZXItaG91ci12YWx1ZS1ub3dcIj5ub3c8L3NwYW4+YDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aG91clZhbHVlLmlubmVySFRNTCA9IGhvdXIudGltZTtcblx0XHR9XG5cblx0XHQvLyBjb25kaXRpb24gaWNvblxuXHRcdGNvbnN0IGhvdXJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblx0XHQvLyBob3VySWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgaG91ci5jb25kaXRpb25JY29uKTtcblx0XHRob3VySWNvbi5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZ2VuZXJhdGVJY29uVXJsKGhvdXIpKTtcblx0XHRob3VySWNvbi5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgaG91ci5jb25kaXRpb24pO1xuXHRcdGhvdXJJY29uLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcImZhbHNlXCIpO1xuXG5cdFx0Ly8gY29uZHV0aW9uIHRleHRcblx0XHRjb25zdCBob3VyQ29uZGl0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuXHRcdGhvdXJDb25kaXRpb24uY2xhc3NMaXN0LmFkZChcIndlYXRoZXItaG91ci1jb25kaXRpb25cIik7XG5cdFx0aG91ckNvbmRpdGlvbi5pbm5lckhUTUwgPSBob3VyLmNvbmRpdGlvbjtcblxuXHRcdC8vIHRlbXBcblx0XHRjb25zdCBob3VyVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0aG91clRlbXAuY2xhc3NMaXN0LmFkZChcIndlYXRoZXItaG91ci10ZW1wXCIpO1xuXG5cdFx0Y29uc3QgaG91clRlbXBJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cdFx0aG91clRlbXBJY29uLmNsYXNzTGlzdC5hZGQoXCJpY29uXCIpO1xuXG5cdFx0Y29uc3QgaG91clRlbXBWYWx1ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGdlbmVyYXRlRHVhbFZhbHVlRmllbGRzKGhvdXJUZW1wVmFsdWVzLCBcInRlbXBcIiwgXCImZGVnO1wiLCBcIiZkZWc7XCIsIGhvdXIpO1xuXHRcdGhvdXJUZW1wLmFwcGVuZENoaWxkKGhvdXJUZW1wSWNvbik7XG5cdFx0aG91clRlbXAuYXBwZW5kQ2hpbGQoaG91clRlbXBWYWx1ZXMpO1xuXG5cblxuXHRcdC8vIHByZWNpcFxuXHRcdGNvbnN0IGhvdXJQcmVjaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGhvdXJQcmVjaXAuY2xhc3NMaXN0LmFkZChcIndlYXRoZXItaG91ci1wcmVjaXBcIik7XG5cblx0XHRjb25zdCBob3VyUHJlY2lwSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXHRcdGhvdXJQcmVjaXBJY29uLmNsYXNzTGlzdC5hZGQoXCJpY29uXCIpO1xuXG5cdFx0Y29uc3QgaG91clByZWNpcFZhbHVlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0Z2VuZXJhdGVEdWFsVmFsdWVGaWVsZHMoaG91clByZWNpcFZhbHVlcywgXCJwcmVjaXBcIiwgXCIgbW1cIiwgXCIgaW5cIiwgaG91cik7XG5cdFx0XG5cdFx0Y29uc3QgaG91clJhaW5Tbm93Q2hhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRob3VyUmFpblNub3dDaGFuY2UuY2xhc3NMaXN0LmFkZChcIndlYXRoZXItcmFpbi1zbm93LWNoYW5jZVwiKTtcblxuXHRcdGNvbnN0IHJhaW5DaGFuY2UgPSBwYXJzZUludChob3VyLmNoYW5jZU9mUmFpbik7XG5cdFx0Y29uc3Qgc25vd0NoYW5jZSA9IHBhcnNlSW50KGhvdXIuY2hhbmNlT2ZTbm93KTtcblxuXHRcdGlmIChyYWluQ2hhbmNlID49IHNub3dDaGFuY2UpICB7XG5cdFx0XHRob3VyUmFpblNub3dDaGFuY2UudGV4dENvbnRlbnQgPSBgJHtyYWluQ2hhbmNlfSVgXG5cdFx0XHRob3VyUHJlY2lwSWNvbi50ZXh0Q29udGVudCA9IFwicmFpbnlcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aG91clJhaW5Tbm93Q2hhbmNlLnRleHRDb250ZW50ID0gYCR7c25vd0NoYW5jZX0lYFxuXHRcdFx0aG91clByZWNpcEljb24udGV4dENvbnRlbnQgPSBcImFjX3VuaXRcIjtcblx0XHR9XG5cdFx0XG5cdFx0aG91clByZWNpcC5hcHBlbmRDaGlsZChob3VyUHJlY2lwSWNvbik7XG5cdFx0aG91clByZWNpcC5hcHBlbmRDaGlsZChob3VyUmFpblNub3dDaGFuY2UpO1xuXG5cdFx0Ly8gd2luZFxuXHRcdGNvbnN0IGhvdXJXaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRob3VyV2luZC5jbGFzc0xpc3QuYWRkKFwid2VhdGhlci1ob3VyLXdpbmRcIik7XG5cblx0XHRjb25zdCBob3VyV2luZEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblx0XHRob3VyV2luZEljb24uY2xhc3NMaXN0LmFkZChcImljb25cIik7XG5cdFx0aG91cldpbmRJY29uLnRleHRDb250ZW50ID0gXCJhaXJcIjtcblxuXHRcdGNvbnN0IGhvdXJXaW5kVmFsdWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRnZW5lcmF0ZUR1YWxWYWx1ZUZpZWxkcyhob3VyV2luZFZhbHVlcywgXCJ3aW5kXCIsIFwiIGtwaFwiLCBcIiBtcGhcIiwgaG91cik7XG5cdFx0aG91cldpbmQuYXBwZW5kQ2hpbGQoaG91cldpbmRJY29uKTtcblx0XHRob3VyV2luZC5hcHBlbmRDaGlsZChob3VyV2luZFZhbHVlcyk7XG5cblx0XHQvLyBjb25zdHJ1Y3QgY2FyZFxuXHRcdGhvdXJDYXJkLmFwcGVuZENoaWxkKGhvdXJEYXRlKTtcblx0XHRob3VyQ2FyZC5hcHBlbmRDaGlsZChob3VyVmFsdWUpO1xuXHRcdGhvdXJDYXJkLmFwcGVuZENoaWxkKGhvdXJJY29uKTtcblx0XHRob3VyQ2FyZC5hcHBlbmRDaGlsZChob3VyQ29uZGl0aW9uKTtcblx0XHRob3VyQ2FyZC5hcHBlbmRDaGlsZChob3VyVGVtcCk7XG5cdFx0aG91ckNhcmQuYXBwZW5kQ2hpbGQoaG91clByZWNpcCk7XG5cdFx0aG91ckNhcmQuYXBwZW5kQ2hpbGQoaG91cldpbmQpO1xuXG5cdFx0Ly8gYXBwZW5kIGNhcmQgdG8gY29udGFpbmVyXG5cdFx0d2VhdGhlckhvdXJzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJDYXJkKTtcblx0fSk7XG59XG5cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUljb25VcmwoZGF0YSkge1xuXHRjb25zdCBkbiA9IGRhdGEuaWNvbkNvZGUuZGF5T3JOaWdodDtcblx0Y29uc3QgY29kZSA9IGRhdGEuaWNvbkNvZGUuY29kZTtcblx0cmV0dXJuIGBpbWFnZXMvaWNvbnMvJHtjb2RlfS0ke2RufS5zdmdgO1xufVxuXG5leHBvcnQgeyBwb3B1bGF0ZUxvY2F0aW9uLCBwb3B1bGF0ZUN1cnJlbnQsIHBvcHVsYXRlRm9yZWNhc3QgfTtcbiIsImltcG9ydCB7IHNob3dMb2FkZXIsIGhpZGVMb2FkZXIgfSBmcm9tIFwiLi4vdXRpbHMvc2hvd2hpZGVMb2FkZXJcIjtcbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gXCIuLi9hcGkvZmV0Y2hEYXRhXCI7XG5pbXBvcnQgeyBkaXNwbGF5RGF0YSB9IGZyb20gXCIuL2Rpc3BsYXlEYXRhXCI7XG5pbXBvcnQgeyBjcmVhdGVOb3RpZmljYXRpb24gfSBmcm9tIFwiLi4vdXRpbHMvY3JlYXRlTm90aWZpY2F0aW9uXCI7XG5pbXBvcnQgeyBnZXRMb2NhdGlvbkFwaVVSTCwgZ2V0V2VhdGhlckFwaVVSTCB9IGZyb20gXCIuLi9hcGkvYXBpXCI7XG5cbmZ1bmN0aW9uIHNlYXJjaENpdHkodXBkYXRlQ3VycmVudExvY2F0aW9uQ2FsbGJhY2spIHtcbiAgICBjb25zdCBuZXdDaXR5RmllbGQgICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXdMb2NhdGlvbkZpZWxkXCIpO1xuICAgIGNvbnN0IGxvY2F0aW9uRm9ybSAgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ld0xvY2F0aW9uRm9ybVwiKTtcbiAgICBjb25zdCBoaWRkZW5GaWVsZCAgICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2YWx1ZVRvRmV0Y2hXZWF0aGVyXCIpO1xuICAgIGNvbnN0IGhpZGRlbkZpZWxkVUkgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZhbHVlVG9EaXNwbHlPblVJXCIpO1xuICAgIGNvbnN0IHNlYXJjaENvbnRhaW5lciAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1yZXN1bHRzLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBwb3B1bGFyQnV0dG9ucyAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1bGFyLXBsYWNlXCIpO1xuICAgIGNvbnN0IGRyb3Bkb3duICAgICAgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFJlc3VsdHNcIik7XG4gICAgY29uc3QgZGVib3VuY2VUaW1lciAgICAgICA9IDIwMDtcbiAgICBjb25zdCBtb2JpbGVTZWFyY2hUcmlnZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2JpbGVTZWFyY2hUcmlnZ2VyXCIpO1xuICAgIGxldCBkZWJvdW5jZVRpbWVvdXQ7XG5cdGxldCBpc1N1Ym1pdHRlZCA9IGZhbHNlO1xuXG5cbiAgICBtb2JpbGVTZWFyY2hUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxvY2F0aW9uRm9ybS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJtb2JpbGUtb3BlblwiKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXItaGVhZGVyJyk7XG4gICAgICAgIGlmICghdGFyZ2V0LmNvbnRhaW5zKGUudGFyZ2V0KSkgIHtcbiAgICAgICAgICAgIGxvY2F0aW9uRm9ybS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJtb2JpbGUtb3BlblwiKTtcbiAgICAgICAgICAgIGRyb3Bkb3duLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBzZWFyY2hDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBuZXdDaXR5RmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGlkZGVuRmllbGRVSS52YWx1ZSA9IG5ld0NpdHlGaWVsZC52YWx1ZTtcblxuICAgICAgICBjbGVhclRpbWVvdXQoZGVib3VuY2VUaW1lb3V0KTtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIGlmIChxdWVyeS5sZW5ndGggPiAyICYmICFpc1N1Ym1pdHRlZCkge1xuICAgICAgICAgICAgZGVib3VuY2VUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZ2V0TG9jYXRpb25BcGlVUkwocXVlcnkpO1xuICAgICAgICAgICAgICAgIGZldGNoKHVybClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bi5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbG9jYXRpb25zIGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWl0ZW1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkcm9wZG93bi1pdGVtLWNvbnRlbnRcIj4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRpYy1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmaSBmaS0ke2xvY2F0aW9uLmFkZHJlc3MuY291bnRyeV9jb2RlfVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2xvY2F0aW9uLmRpc3BsYXlfbmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGljLWNvb3Jkc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cGFyc2VGbG9hdChsb2NhdGlvbi5sYXQpLnRvRml4ZWQoMyl9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3BhcnNlRmxvYXQobG9jYXRpb24ubG9uKS50b0ZpeGVkKDMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcImRhdGEtcGxhY2VcIiwgbG9jYXRpb24uZGlzcGxheV9wbGFjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcImRhdGEtbGF0LWxvblwiLCBgJHtsb2NhdGlvbi5sYXR9LCR7bG9jYXRpb24ubG9ufWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd24uYXBwZW5kQ2hpbGQob3B0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDaXR5RmllbGQudmFsdWUgPSBvcHRpb24ucXVlcnlTZWxlY3RvcignLmRpYy1uYW1lJykudGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW5GaWVsZFVJLnZhbHVlID0gb3B0aW9uLmdldEF0dHJpYnV0ZShcImRhdGEtcGxhY2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbkZpZWxkLnZhbHVlID0gb3B0aW9uLmdldEF0dHJpYnV0ZShcImRhdGEtbGF0LWxvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd24uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0Rm9ybShuZXdDaXR5RmllbGQudmFsdWUsIGhpZGRlbkZpZWxkLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25Gb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25Gb3JtLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZShcIm1vYmlsZS1vcGVuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZHJvcGRvd24ucXVlcnlTZWxlY3RvckFsbChcIi5kcm9wZG93bi1pdGVtXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggPSAoY3VycmVudEluZGV4ICsgMSkgJSBpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zW2N1cnJlbnRJbmRleF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gKGN1cnJlbnRJbmRleCAtIDEgKyBpdGVtcy5sZW5ndGgpICUgaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tjdXJyZW50SW5kZXhdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiAmJiBjdXJyZW50SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tjdXJyZW50SW5kZXhdLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd24uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25Gb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bi5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlcklucHV0ID0gbmV3Q2l0eUZpZWxkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWl0ZW1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydC5pbm5lckhUTUwgPSBgTm8gbG9jYXRpb25zIGZvdW5kIGZvciA8c3Ryb25nPlwiJHt1c2VySW5wdXR9XCI8L3N0cm9uZz5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd24uYXBwZW5kQ2hpbGQoYWxlcnQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGRlYm91bmNlVGltZXIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsb2NhdGlvbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZHJvcGRvd24uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgaWYgKG5ld0NpdHlGaWVsZC52YWx1ZSA9PT0gXCJcIiB8fCBuZXdDaXR5RmllbGQudmFsdWUubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgY3JlYXRlTm90aWZpY2F0aW9uKFwiUGxlYXNlIHR5cGUgYSBsb2NhdGlvblwiLCBcInRvYXN0XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3Q2l0eU5hbWUgPSBoaWRkZW5GaWVsZFVJLnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdDaXR5Q29vcmRzID0gaGlkZGVuRmllbGQudmFsdWU7XG4gICAgICAgIHN1Ym1pdEZvcm0obmV3Q2l0eU5hbWUsIG5ld0NpdHlDb29yZHMpO1xuICAgICAgICBsb2NhdGlvbkZvcm0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwibW9iaWxlLW9wZW5cIik7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzdWJtaXRGb3JtKGNpdHlOYW1lLCBjaXR5Q29vcmRzKSB7XG4gICAgICAgIGxldCBhcGlVUkw7XG5cbiAgICAgICAgaWYgKGNpdHlDb29yZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IFtsYXQsIGxvbl0gPSBjaXR5Q29vcmRzLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBhcGlVUkwgPSBnZXRXZWF0aGVyQXBpVVJMKHsgbGF0LCBsb24gfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNpdHlDb29yZHMgJXNcIiwgYXBpVVJMKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2l0eU5hbWUpIHtcbiAgICAgICAgICAgICAgICBhcGlVUkwgPSBnZXRXZWF0aGVyQXBpVVJMKHsgY2l0eTogY2l0eU5hbWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIGNpdHkgbmFtZVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3dMb2FkZXIoKTtcbiAgICAgICAgZmV0Y2hEYXRhKGFwaVVSTClcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRMb2NhdGlvbkNhbGxiYWNrKGFwaVVSTCk7IC8vIFVwZGF0ZSBjdXJyZW50IGRpc3BsYXllZCBsb2NhdGlvblxuICAgICAgICAgICAgICAgIGxvY2F0aW9uRm9ybS5yZXNldCgpO1xuXHRcdFx0XHRuZXdDaXR5RmllbGQuYmx1cigpO1xuXHRcdFx0XHRpc1N1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlTm90aWZpY2F0aW9uKFwiTG9jYXRpb24gbm90IGZvdW5kXCIsIFwidG9hc3RcIik7XG4gICAgICAgICAgICAgICAgaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmV3Q2l0eUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlYXJjaENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcbiAgICB9KTtcblxuICAgIHBvcHVsYXJCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZENpdHkgPSBidXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGFwaVVSTCA9IGdldFdlYXRoZXJBcGlVUkwoeyBjaXR5OiBzZWxlY3RlZENpdHkgfSk7XG4gICAgICAgICAgICBzZWFyY2hDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XG4gICAgICAgICAgICBzaG93TG9hZGVyKCk7XG4gICAgICAgICAgICBmZXRjaERhdGEoYXBpVVJMKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0NpdHlGaWVsZC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRMb2NhdGlvbkNhbGxiYWNrKGFwaVVSTCk7IC8vIFVwZGF0ZSBjdXJyZW50IGRpc3BsYXllZCBsb2NhdGlvblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTm90aWZpY2F0aW9uKFwiTG9jYXRpb24gbm90IGZvdW5kXCIsIFwidG9hc3RcIik7XG4gICAgICAgICAgICAgICAgICAgIGhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNwZWNpYWxDaGFyYWN0ZXJzKHN0cikge1xuICAgIHJldHVybiBzdHIubm9ybWFsaXplKFwiTkZEXCIpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csIFwiXCIpO1xufVxuXG5leHBvcnQgeyBzZWFyY2hDaXR5IH07XG4iLCJpbXBvcnQgeyBmZXRjaEFuZERpc3BsYXlEYXRhIH0gZnJvbSBcIi4vYXBpL2ZldGNoRGF0YVwiO1xuaW1wb3J0IHsgY2hhbmdlVW5pdHMgfSBmcm9tIFwiLi91dGlscy9jaGFuZ2VVbml0c1wiO1xuaW1wb3J0IHsgdXBkYXRlVGltZSB9IGZyb20gXCIuL3V0aWxzL2xvY2FsVGltZVwiO1xuaW1wb3J0IHsgZHJhZ0hvdXJzIH0gZnJvbSBcIi4vdXRpbHMvZHJhZ1wiO1xuaW1wb3J0IHsgc2VhcmNoQ2l0eSB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoQ2l0eVwiO1xuaW1wb3J0IHsgZmV0Y2hVc2VyTG9jYXRpb24gfSBmcm9tIFwiLi9jb21wb25lbnRzL2dldExvY2F0aW9uXCI7XG5pbXBvcnQgeyBnZXRXZWF0aGVyQXBpVVJMIH0gZnJvbSBcIi4vYXBpL2FwaVwiO1xuXG5sZXQgY3VycmVudERpc3BsYXllZExvY2F0aW9uID0gbnVsbDtcblxuZnVuY3Rpb24gaW5pdFdlYXRoZXJBcHAoaW5pdGlhbFdlYXRoZXJVcmwpIHtcblx0Y3VycmVudERpc3BsYXllZExvY2F0aW9uID0gaW5pdGlhbFdlYXRoZXJVcmw7XG5cdGZldGNoQW5kRGlzcGxheURhdGEoaW5pdGlhbFdlYXRoZXJVcmwpO1xuXG5cdGNvbnN0IHJlZnJlc2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZnJlc2hcIik7XG5cdHJlZnJlc2hCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcblx0XHRmZXRjaEFuZERpc3BsYXlEYXRhKGN1cnJlbnREaXNwbGF5ZWRMb2NhdGlvbik7XG5cdH07XG5cblx0Y29uc3QgbG9jYXRlTWVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0ZU1lXCIpO1xuXHRsb2NhdGVNZUJ1dHRvbi5vbmNsaWNrID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IHVzZXJMb2NhdGlvbiA9IGF3YWl0IGZldGNoVXNlckxvY2F0aW9uKCk7XG5cdFx0Y29uc3QgdXNlcldlYXRoZXJBcGlVUkwgPSBnZXRXZWF0aGVyQXBpVVJMKHsgbGF0OiB1c2VyTG9jYXRpb24ubGF0LCBsb246IHVzZXJMb2NhdGlvbi5sb24gfSk7XG5cdFx0Y3VycmVudERpc3BsYXllZExvY2F0aW9uID0gdXNlcldlYXRoZXJBcGlVUkw7XG5cdFx0ZmV0Y2hBbmREaXNwbGF5RGF0YSh1c2VyV2VhdGhlckFwaVVSTCk7XG5cdH07XG5cblx0Y2hhbmdlVW5pdHMoKTtcblx0c2V0SW50ZXJ2YWwodXBkYXRlVGltZSwgMTAwMCk7XG5cdHVwZGF0ZVRpbWUoKTtcblx0ZHJhZ0hvdXJzKCk7XG5cdHNlYXJjaENpdHkodXBkYXRlQ3VycmVudExvY2F0aW9uKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ3VycmVudExvY2F0aW9uKG5ld0xvY2F0aW9uVXJsKSB7XG5cdGN1cnJlbnREaXNwbGF5ZWRMb2NhdGlvbiA9IG5ld0xvY2F0aW9uVXJsO1xufVxuXG5leHBvcnQgeyBpbml0V2VhdGhlckFwcCB9O1xuIiwiZnVuY3Rpb24gc2V0RGF5TmlnaHRDbGFzc2VzT25Cb2R5KGRhdGEpIHtcclxuICAgIFxyXG4gICAgLy8gR2V0IGJvZHkgYW5kIEN1cnJlbnQgV2VhdGhlciBjb250YWluZXJzXHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuXHRjb25zdCB3ZWF0aGVyTm93Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyTm93XCIpO1xyXG5cclxuICAgIC8vIGFkZCB3ZWF0aGVyIGNvZGUgdG8gYm9keSBmb3IgYmFja2dyb3VuZCBpbWFnZSBjaGFuZ2VcclxuXHRib2R5LnNldEF0dHJpYnV0ZShcImRhdGEtY29kZVwiLCBkYXRhLmNvZGUpO1xyXG5cclxuICAgIC8vIGFkZCBkYXkgb3IgbmlnaHQgdG8gY29udGFpbmVycyBmb3IgYmFja2dyb3VuZCBpbWFnZSBjaGFuZ2VcclxuXHRpZiAoZGF0YS5pc0RheSA9PT0gMSkge1xyXG5cdFx0Ym9keS5jbGFzc0xpc3QucmVtb3ZlKFwibmlnaHRcIik7XHJcblx0XHRib2R5LmNsYXNzTGlzdC5hZGQoXCJkYXlcIik7XHJcblxyXG5cdFx0d2VhdGhlck5vd0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwibmlnaHRcIik7XHJcblx0XHR3ZWF0aGVyTm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJkYXlcIik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImRheVwiKTtcclxuXHRcdGJvZHkuY2xhc3NMaXN0LmFkZChcIm5pZ2h0XCIpO1xyXG5cclxuXHRcdHdlYXRoZXJOb3dDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImRheVwiKTtcclxuXHRcdHdlYXRoZXJOb3dDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm5pZ2h0XCIpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHsgc2V0RGF5TmlnaHRDbGFzc2VzT25Cb2R5IH0iLCJmdW5jdGlvbiBjaGFuZ2VVbml0cygpIHtcblx0Y29uc3QgY2hhbmdlVW5pdHNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVuaXRzXCIpO1xuXHRsZXQgdW5pdCA9IGNoYW5nZVVuaXRzQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoXCIjdW5pdFwiKTtcblx0Y29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cblx0bGV0IHVuaXRTeXN0ZW0gPSBcIlwiOyAvLyBkZWZhdWx0IHZhbHVlXG5cblx0Y29uc3QgbG9jYWxVbml0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1bml0c1N5c3RlbVwiLCBcIm1ldHJpY1wiKTtcblxuXHRpZiAobG9jYWxVbml0ID09PSBcIm1ldHJpY1wiKSB7XG5cdFx0dW5pdC5pbm5lckhUTUwgPSBcIiZkZWc7Q1wiO1xuXHRcdGJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1ldHJpY1wiLCBcImltcGVyaWFsXCIpO1xuXHRcdGJvZHkuY2xhc3NMaXN0LmFkZChsb2NhbFVuaXQpO1xuXHR9IGVsc2UgaWYgKGxvY2FsVW5pdCA9PT0gXCJpbXBlcmlhbFwiKSB7XG5cdFx0dW5pdC5pbm5lckhUTUwgPSBcIiZkZWc7RlwiO1xuXHRcdGJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1ldHJpY1wiLCBcImltcGVyaWFsXCIpO1xuXHRcdGJvZHkuY2xhc3NMaXN0LmFkZChsb2NhbFVuaXQpO1xuXHR9XG5cblx0Y2hhbmdlVW5pdHNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodW5pdC50ZXh0Q29udGVudC5pbmNsdWRlcyhcIkNcIikpIHtcblx0XHRcdHVuaXRTeXN0ZW0gPSBcImltcGVyaWFsXCI7XG5cdFx0XHR1bml0LmlubmVySFRNTCA9IFwiJmRlZztGXCI7XG5cdFx0fSBlbHNlIGlmICh1bml0LnRleHRDb250ZW50LmluY2x1ZGVzKFwiRlwiKSkge1xuXHRcdFx0dW5pdFN5c3RlbSA9IFwibWV0cmljXCI7XG5cdFx0XHR1bml0LmlubmVySFRNTCA9IFwiJmRlZztDXCI7XG5cdFx0fVxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidW5pdHNTeXN0ZW1cIiwgdW5pdFN5c3RlbSk7XG5cblx0XHRib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtZXRyaWNcIiwgXCJpbXBlcmlhbFwiKTtcblx0XHRib2R5LmNsYXNzTGlzdC5hZGQodW5pdFN5c3RlbSk7XG5cdH0pO1xufVxuXG5leHBvcnQgeyBjaGFuZ2VVbml0cyB9O1xuIiwiY29uc3QgY291bnRyeUNvZGVzID0ge1xuXHRcIkFmZ2hhbmlzdGFuXCI6IFwiQUZcIixcblx0XCJBbGJhbmlhXCI6IFwiQUxcIixcblx0XCJBbGdlcmlhXCI6IFwiRFpcIixcblx0XCJBbWVyaWNhbiBTYW1vYVwiOiBcIkFTXCIsXG5cdFwiQW5kb3JyYVwiOiBcIkFEXCIsXG5cdFwiQW5nb2xhXCI6IFwiQU9cIixcblx0XCJBbnRhcmN0aWNhXCI6IFwiQVFcIixcblx0XCJBbnRpZ3VhIGFuZCBCYXJidWRhXCI6IFwiQUdcIixcblx0XCJBcmdlbnRpbmFcIjogXCJBUlwiLFxuXHRcIkFybWVuaWFcIjogXCJBTVwiLFxuXHRcIkFydWJhXCI6IFwiQVdcIixcblx0XCJBdXN0cmFsaWFcIjogXCJBVVwiLFxuXHRcIkF1c3RyaWFcIjogXCJBVFwiLFxuXHRcIkF6ZXJiYWlqYW5cIjogXCJBWlwiLFxuXHRcIkJhaGFtYXNcIjogXCJCU1wiLFxuXHRcIkJhaHJhaW5cIjogXCJCSFwiLFxuXHRcIkJhbmdsYWRlc2hcIjogXCJCRFwiLFxuXHRcIkJhcmJhZG9zXCI6IFwiQkJcIixcblx0XCJCZWxhcnVzXCI6IFwiQllcIixcblx0XCJCZWxnaXVtXCI6IFwiQkVcIixcblx0XCJCZWxpemVcIjogXCJCWlwiLFxuXHRcIkJlbmluXCI6IFwiQkpcIixcblx0XCJCZXJtdWRhXCI6IFwiQk1cIixcblx0XCJCaHV0YW5cIjogXCJCVFwiLFxuXHRcIkJvbGl2aWFcIjogXCJCT1wiLFxuXHRcIkJvc25pYSBhbmQgSGVyemVnb3ZpbmFcIjogXCJCQVwiLFxuXHRcIkJvdHN3YW5hXCI6IFwiQldcIixcblx0XCJCb3V2ZXQgSXNsYW5kXCI6IFwiQlZcIixcblx0XCJCcmF6aWxcIjogXCJCUlwiLFxuXHRcIkJyaXRpc2ggSW5kaWFuIE9jZWFuIFRlcnJpdG9yeVwiOiBcIklPXCIsXG5cdFwiQnJ1bmVpIERhcnVzc2FsYW1cIjogXCJCTlwiLFxuXHRcIkJ1bGdhcmlhXCI6IFwiQkdcIixcblx0XCJCdXJraW5hIEZhc29cIjogXCJCRlwiLFxuXHRcIkJ1cnVuZGlcIjogXCJCSVwiLFxuXHRcIkNhbWJvZGlhXCI6IFwiS0hcIixcblx0XCJDYW1lcm9vblwiOiBcIkNNXCIsXG5cdFwiQ2FuYWRhXCI6IFwiQ0FcIixcblx0XCJDYXBlIFZlcmRlXCI6IFwiQ1ZcIixcblx0XCJDYXltYW4gSXNsYW5kc1wiOiBcIktZXCIsXG5cdFwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCI6IFwiQ0ZcIixcblx0XCJDaGFkXCI6IFwiVERcIixcblx0XCJDaGlsZVwiOiBcIkNMXCIsXG5cdFwiQ2hpbmFcIjogXCJDTlwiLFxuXHRcIkNocmlzdG1hcyBJc2xhbmRcIjogXCJDWFwiLFxuXHRcIkNvY29zIChLZWVsaW5nKSBJc2xhbmRzXCI6IFwiQ0NcIixcblx0XCJDb2xvbWJpYVwiOiBcIkNPXCIsXG5cdFwiQ29tb3Jvc1wiOiBcIktNXCIsXG5cdFwiQ29uZ29cIjogXCJDR1wiLFxuXHRcIkNvbmdvLCB0aGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGVcIjogXCJDRFwiLFxuXHRcIkNvb2sgSXNsYW5kc1wiOiBcIkNLXCIsXG5cdFwiQ29zdGEgUmljYVwiOiBcIkNSXCIsXG5cdFwiQ290ZSBkJ0l2b2lyZVwiOiBcIkNJXCIsXG5cdFwiQ8O0dGUgZCdJdm9pcmVcIjogXCJDSVwiLFxuXHRcIkNyb2F0aWFcIjogXCJIUlwiLFxuXHRcIkN1YmFcIjogXCJDVVwiLFxuXHRcIkN5cHJ1c1wiOiBcIkNZXCIsXG5cdFwiQ3plY2ggUmVwdWJsaWNcIjogXCJDWlwiLFxuXHRcIkRlbm1hcmtcIjogXCJES1wiLFxuXHRcIkRqaWJvdXRpXCI6IFwiREpcIixcblx0XCJEb21pbmljYVwiOiBcIkRNXCIsXG5cdFwiRG9taW5pY2FuIFJlcHVibGljXCI6IFwiRE9cIixcblx0XCJFY3VhZG9yXCI6IFwiRUNcIixcblx0XCJFZ3lwdFwiOiBcIkVHXCIsXG5cdFwiRWwgU2FsdmFkb3JcIjogXCJTVlwiLFxuXHRcIkVxdWF0b3JpYWwgR3VpbmVhXCI6IFwiR1FcIixcblx0XCJFcml0cmVhXCI6IFwiRVJcIixcblx0XCJFc3RvbmlhXCI6IFwiRUVcIixcblx0XCJFdGhpb3BpYVwiOiBcIkVUXCIsXG5cdFwiRmFsa2xhbmQgSXNsYW5kc1wiOiBcIkZLXCIsXG5cdFwiRmFsa2xhbmQgSXNsYW5kcyAoTWFsdmluYXMpXCI6IFwiRktcIixcblx0XCJGYXJvZSBJc2xhbmRzXCI6IFwiRk9cIixcblx0XCJGaWppXCI6IFwiRkpcIixcblx0XCJGaW5sYW5kXCI6IFwiRklcIixcblx0XCJGcmFuY2VcIjogXCJGUlwiLFxuXHRcIkZyZW5jaCBHdWlhbmFcIjogXCJHRlwiLFxuXHRcIkZyZW5jaCBQb2x5bmVzaWFcIjogXCJQRlwiLFxuXHRcIkZyZW5jaCBTb3V0aGVybiBhbmQgQW50YXJjdGljIExhbmRzXCI6IFwiRlJcIixcblx0XCJGcmVuY2ggU291dGhlcm4gVGVycml0b3JpZXNcIjogXCJURlwiLFxuXHRcIkdhYm9uXCI6IFwiR0FcIixcblx0XCJHYW1iaWFcIjogXCJHTVwiLFxuXHRcIkdlb3JnaWFcIjogXCJHRVwiLFxuXHRcIkdlcm1hbnlcIjogXCJERVwiLFxuXHRcIkdoYW5hXCI6IFwiR0hcIixcblx0XCJHaWJyYWx0YXJcIjogXCJHSVwiLFxuXHRcIkdyZWVjZVwiOiBcIkdSXCIsXG5cdFwiR3JlZW5sYW5kXCI6IFwiR0xcIixcblx0XCJHcmVuYWRhXCI6IFwiR0RcIixcblx0XCJHdWFkZWxvdXBlXCI6IFwiR1BcIixcblx0XCJHdWFtXCI6IFwiR1VcIixcblx0XCJHdWF0ZW1hbGFcIjogXCJHVFwiLFxuXHRcIkd1aW5lYVwiOiBcIkdOXCIsXG5cdFwiR3VpbmVhLUJpc3NhdVwiOiBcIkdXXCIsXG5cdFwiR3V5YW5hXCI6IFwiR1lcIixcblx0XCJIYWl0aVwiOiBcIkhUXCIsXG5cdFwiSGVhcmQgSXNsYW5kIGFuZCBNY0RvbmFsZCBJc2xhbmRzXCI6IFwiSE1cIixcblx0XCJIb25kdXJhc1wiOiBcIkhOXCIsXG5cdFwiSG9uZyBLb25nXCI6IFwiSEtcIixcblx0XCJIdW5nYXJ5XCI6IFwiSFVcIixcblx0XCJJY2VsYW5kXCI6IFwiSVNcIixcblx0XCJJbmRpYVwiOiBcIklOXCIsXG5cdFwiSW5kb25lc2lhXCI6IFwiSURcIixcblx0XCJJcmFuXCI6IFwiSVJcIixcblx0XCJJcmFxXCI6IFwiSVFcIixcblx0XCJJcmVsYW5kXCI6IFwiSUVcIixcblx0XCJJc3JhZWxcIjogXCJJTFwiLFxuXHRcIkl0YWx5XCI6IFwiSVRcIixcblx0XCJKYW1haWNhXCI6IFwiSk1cIixcblx0XCJKYXBhblwiOiBcIkpQXCIsXG5cdFwiSm9yZGFuXCI6IFwiSk9cIixcblx0XCJLYXpha2hzdGFuXCI6IFwiS1pcIixcblx0XCJLZW55YVwiOiBcIktFXCIsXG5cdFwiS2lyaWJhdGlcIjogXCJLSVwiLFxuXHRcIktvcmVhLCBEZW1vY3JhdGljIFBlb3BsZSdzIFJlcHVibGljIG9mXCI6IFwiS1BcIixcblx0XCJOb3J0aCBLb3JlYVwiIDogXCJLUFwiLFxuXHRcIktvcmVhLCBSZXB1YmxpYyBvZlwiOiBcIktSXCIsXG5cdFwiU291dGggS29yZWFcIiA6IFwiS1JcIixcblx0XCJLdXdhaXRcIjogXCJLV1wiLFxuXHRcIkt5cmd5enN0YW5cIjogXCJLR1wiLFxuXHRcIkxhbyBQZW9wbGUncyBEZW1vY3JhdGljIFJlcHVibGljIChMYW9zKVwiOiBcIkxBXCIsXG5cdFwiTGFvIFBlb3BsZSdzIERlbW9jcmF0aWMgUmVwdWJsaWNcIjogXCJMQVwiLFxuXHRcIkxhdHZpYVwiOiBcIkxWXCIsXG5cdFwiTGViYW5vblwiOiBcIkxCXCIsXG5cdFwiTGVzb3Rob1wiOiBcIkxTXCIsXG5cdFwiTGliZXJpYVwiOiBcIkxSXCIsXG5cdFwiTGlieWFcIjogXCJMWVwiLFxuXHRcIkxpYnlhLCBTdGF0ZSBvZlwiOiBcIkxZXCIsXG5cdFwiTGllY2h0ZW5zdGVpblwiOiBcIkxJXCIsXG5cdFwiTGl0aHVhbmlhXCI6IFwiTFRcIixcblx0XCJMdXhlbWJvdXJnXCI6IFwiTFVcIixcblx0XCJNYWNhb1wiOiBcIk1PXCIsXG5cdFwiTWFjZWRvbmlhXCI6IFwiTUtcIixcblx0XCJNYWRhZ2FzY2FyXCI6IFwiTUdcIixcblx0XCJNYWxhd2lcIjogXCJNV1wiLFxuXHRcIk1hbGF5c2lhXCI6IFwiTVlcIixcblx0XCJNYWxkaXZlc1wiOiBcIk1WXCIsXG5cdFwiTWFsaVwiOiBcIk1MXCIsXG5cdFwiTWFsdGFcIjogXCJNVFwiLFxuXHRcIk1hcnNoYWxsIElzbGFuZHNcIjogXCJNSFwiLFxuXHRcIk1hcnRpbmlxdWVcIjogXCJNUVwiLFxuXHRcIk1hdXJpdGFuaWFcIjogXCJNUlwiLFxuXHRcIk1hdXJpdGl1c1wiOiBcIk1VXCIsXG5cdFwiTWF5b3R0ZVwiOiBcIllUXCIsXG5cdFwiTWV4aWNvXCI6IFwiTVhcIixcblx0XCJNaWNyb25lc2lhXCI6IFwiRk1cIixcblx0XCJNb2xkb3ZhXCI6IFwiTURcIixcblx0XCJNb25hY29cIjogXCJNQ1wiLFxuXHRcIk1vbmdvbGlhXCI6IFwiTU5cIixcblx0XCJNb250ZW5lZ3JvXCI6IFwiTUVcIixcblx0XCJNb250c2VycmF0XCI6IFwiTVNcIixcblx0XCJNb3JvY2NvXCI6IFwiTUFcIixcblx0XCJNb3phbWJpcXVlXCI6IFwiTVpcIixcblx0XCJNeWFubWFyXCI6IFwiTU1cIixcblx0XCJOYW1pYmlhXCI6IFwiTkFcIixcblx0XCJOYXVydVwiOiBcIk5SXCIsXG5cdFwiTmVwYWxcIjogXCJOUFwiLFxuXHRcIk5ldGhlcmxhbmRzXCI6IFwiTkxcIixcblx0XCJOZXRoZXJsYW5kcyBBbnRpbGxlc1wiOiBcIkFOXCIsXG5cdFwiTmV3IENhbGVkb25pYVwiOiBcIk5DXCIsXG5cdFwiTmV3IFplYWxhbmRcIjogXCJOWlwiLFxuXHRcIk5pY2FyYWd1YVwiOiBcIk5JXCIsXG5cdFwiTmlnZXJcIjogXCJORVwiLFxuXHRcIk5pZ2VyaWFcIjogXCJOR1wiLFxuXHRcIk5pdWVcIjogXCJOVVwiLFxuXHRcIk5vcmZvbGsgSXNsYW5kXCI6IFwiTkZcIixcblx0XCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIjogXCJNUFwiLFxuXHRcIk5vcndheVwiOiBcIk5PXCIsXG5cdFwiT21hblwiOiBcIk9NXCIsXG5cdFwiUGFraXN0YW5cIjogXCJQS1wiLFxuXHRcIlBhbGF1XCI6IFwiUFdcIixcblx0XCJQYWxlc3RpbmUsIFN0YXRlIG9mXCI6IFwiUFNcIixcblx0XCJQYW5hbWFcIjogXCJQQVwiLFxuXHRcIlBhcHVhIE5ldyBHdWluZWFcIjogXCJQR1wiLFxuXHRcIlBhcmFndWF5XCI6IFwiUFlcIixcblx0XCJQZXJ1XCI6IFwiUEVcIixcblx0XCJQaGlsaXBwaW5lc1wiOiBcIlBIXCIsXG5cdFwiUGl0Y2Fpcm5cIjogXCJQTlwiLFxuXHRcIlBvbGFuZFwiOiBcIlBMXCIsXG5cdFwiUG9ydHVnYWxcIjogXCJQVFwiLFxuXHRcIlB1ZXJ0byBSaWNvXCI6IFwiUFJcIixcblx0XCJRYXRhclwiOiBcIlFBXCIsXG5cdFwiUsOpdW5pb25cIjogXCJSRVwiLFxuXHRcIlJvbWFuaWFcIjogXCJST1wiLFxuXHRcIlJ1c3NpYVwiOiBcIlJVXCIsXG5cdFwiUndhbmRhXCI6IFwiUldcIixcblx0XCJTYWludCBIZWxlbmFcIjogXCJTSFwiLFxuXHRcIlNhaW50IEtpdHRzIGFuZCBOZXZpc1wiOiBcIktOXCIsXG5cdFwiU2FpbnQgTHVjaWFcIjogXCJMQ1wiLFxuXHRcIlNhaW50IFBpZXJyZSBhbmQgTWlxdWVsb25cIjogXCJQTVwiLFxuXHRcIlNhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzXCI6IFwiVkNcIixcblx0XCJTYW1vYVwiOiBcIldTXCIsXG5cdFwiU2FuIE1hcmlub1wiOiBcIlNNXCIsXG5cdFwiU2FvIFRvbWUgYW5kIFByaW5jaXBlXCI6IFwiU1RcIixcblx0XCJTYXVkaSBBcmFiaWFcIjogXCJTQVwiLFxuXHRcIlNlbmVnYWxcIjogXCJTTlwiLFxuXHRcIlNlcmJpYVwiOiBcIlJTXCIsXG5cdFwiU2V5Y2hlbGxlc1wiOiBcIlNDXCIsXG5cdFwiU2llcnJhIExlb25lXCI6IFwiU0xcIixcblx0XCJTaW5nYXBvcmVcIjogXCJTR1wiLFxuXHRcIlNsb3Zha2lhXCI6IFwiU0tcIixcblx0XCJTbG92ZW5pYVwiOiBcIlNJXCIsXG5cdFwiU29sb21vbiBJc2xhbmRzXCI6IFwiU0JcIixcblx0XCJTb21hbGlhXCI6IFwiU09cIixcblx0XCJTb3V0aCBBZnJpY2FcIjogXCJaQVwiLFxuXHRcIlNvdXRoIEdlb3JnaWEgYW5kIHRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzXCI6IFwiR1NcIixcblx0XCJTb3V0aCBTdWRhblwiOiBcIlNTXCIsXG5cdFwiU3BhaW5cIjogXCJFU1wiLFxuXHRcIlNyaSBMYW5rYVwiOiBcIkxLXCIsXG5cdFwiU3VkYW5cIjogXCJTRFwiLFxuXHRcIlN1cmluYW1lXCI6IFwiU1JcIixcblx0XCJTdmFsYmFyZCBhbmQgSmFuIE1heWVuXCI6IFwiU0pcIixcblx0XCJTd2F6aWxhbmRcIjogXCJTWlwiLFxuXHRcIlN3ZWRlblwiOiBcIlNFXCIsXG5cdFwiU3dpdHplcmxhbmRcIjogXCJDSFwiLFxuXHRcIlN5cmlhbiBBcmFiIFJlcHVibGljXCI6IFwiU1lcIixcblx0XCJUYWl3YW5cIjogXCJUV1wiLFxuXHRcIlRhamlraXN0YW5cIjogXCJUSlwiLFxuXHRcIlRhbnphbmlhXCI6IFwiVFpcIixcblx0XCJUaGFpbGFuZFwiOiBcIlRIXCIsXG5cdFwiVGltb3ItTGVzdGVcIjogXCJUTFwiLFxuXHRcIlRvZ29cIjogXCJUR1wiLFxuXHRcIlRva2VsYXVcIjogXCJUS1wiLFxuXHRcIlRvbmdhXCI6IFwiVE9cIixcblx0XCJUcmluaWRhZCBhbmQgVG9iYWdvXCI6IFwiVFRcIixcblx0XCJUdW5pc2lhXCI6IFwiVE5cIixcblx0XCJUdXJrZXlcIjogXCJUUlwiLFxuXHRcIlR1cmttZW5pc3RhblwiOiBcIlRNXCIsXG5cdFwiVHVya3MgYW5kIENhaWNvcyBJc2xhbmRzXCI6IFwiVENcIixcblx0XCJUdXZhbHVcIjogXCJUVlwiLFxuXHRcIlVnYW5kYVwiOiBcIlVHXCIsXG5cdFwiVWtyYWluZVwiOiBcIlVBXCIsXG5cdFwiVW5pdGVkIEFyYWIgRW1pcmF0ZXNcIjogXCJBRVwiLFxuXHRcIlVuaXRlZCBLaW5nZG9tXCI6IFwiR0JcIixcblx0XCJVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2FcIjogXCJVU1wiLFxuXHRcIlVuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kc1wiOiBcIlVNXCIsXG5cdFwiVXJ1Z3VheVwiOiBcIlVZXCIsXG5cdFwiVXpiZWtpc3RhblwiOiBcIlVaXCIsXG5cdFwiVmFudWF0dVwiOiBcIlZVXCIsXG5cdFwiVmVuZXp1ZWxhXCI6IFwiVkVcIixcblx0XCJWaWV0bmFtXCI6IFwiVk5cIixcblx0XCJWaXJnaW4gSXNsYW5kcywgQnJpdGlzaFwiOiBcIlZHXCIsXG5cdFwiVmlyZ2luIElzbGFuZHMsIFUuUy5cIjogXCJWSVwiLFxuXHRcIldhbGxpcyBhbmQgRnV0dW5hXCI6IFwiV0ZcIixcblx0XCJXZXN0ZXJuIFNhaGFyYVwiOiBcIkVIXCIsXG5cdFwiWWVtZW5cIjogXCJZRVwiLFxuXHRcIlphbWJpYVwiOiBcIlpNXCIsXG5cdFwiWmltYmFid2VcIjogXCJaV1wiLFxufTtcblxuZnVuY3Rpb24gZ2V0Q291bnRyeUNvZGUoY291bnRyeU5hbWUpIHtcblx0cmV0dXJuIGNvdW50cnlDb2Rlc1tjb3VudHJ5TmFtZV0gfHwgbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RmxhZyhkYXRhKSB7XG5cdGNvbnN0IGNvdW50cnlOYW1lID0gZGF0YS5jb3VudHJ5O1xuXHRjb25zdCBjb3VudHJ5Q29kZSA9IGdldENvdW50cnlDb2RlKGNvdW50cnlOYW1lKTtcblx0Y29uc3QgZmxhZ0ljb24gPSBjb3VudHJ5Q29kZSA/IGA8c3BhbiBjbGFzcz1cImZpIGZpLSR7Y291bnRyeUNvZGUudG9Mb3dlckNhc2UoKX1cIj48L3NwYW4+YCA6IFwiXCI7XG5cdHJldHVybiBmbGFnSWNvbjtcbn1cblxuZXhwb3J0IHsgIH1cblxuZXhwb3J0IHsgZ2V0RmxhZyB9O1xuIiwiZnVuY3Rpb24gY3JlYXRlTm90aWZpY2F0aW9uKHRleHQsIHR5cGUpIHtcblx0Y29uc3Qgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0bm90aWZpY2F0aW9uLmNsYXNzTGlzdC5hZGQodHlwZSk7XG5cblx0Y29uc3Qgbm90aWZpY2F0aW9uTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRub3RpZmljYXRpb25NZXNzYWdlLmNsYXNzTGlzdC5hZGQoYCR7dHlwZX0tbWVzc2FnZWApO1xuXHRub3RpZmljYXRpb25NZXNzYWdlLmlubmVySFRNTCA9IHRleHQ7XG5cdG5vdGlmaWNhdGlvbi5hcHBlbmRDaGlsZChub3RpZmljYXRpb25NZXNzYWdlKTtcblxuXHRjb25zdCByZW1vdmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cdHJlbW92ZUljb24uY2xhc3NMaXN0LmFkZChcImljb25cIik7XG5cdHJlbW92ZUljb24udGV4dENvbnRlbnQgPSBcImNsb3NlXCI7XG5cblx0bm90aWZpY2F0aW9uLmFwcGVuZENoaWxkKHJlbW92ZUljb24pO1xuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbik7XG5cblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0bm90aWZpY2F0aW9uLmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xuXHR9LCAzMDApO1xuXG5cdHJlbW92ZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRub3RpZmljYXRpb24uY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdG5vdGlmaWNhdGlvbi5yZW1vdmUoKTtcblx0XHR9LCAzMDApO1xuXHR9KTtcblxuXHRjb25zdCB0b2FzdFRpbWVPdXQgPSAzMDAwO1xuXG5cdGlmICh0eXBlID09PSBcInRvYXN0XCIpIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdG5vdGlmaWNhdGlvbi5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcblx0XHR9LCB0b2FzdFRpbWVPdXQpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0bm90aWZpY2F0aW9uLnJlbW92ZSgpO1xuXHRcdH0sIHRvYXN0VGltZU91dCAqIDIpO1xuXHR9XG59XG5cbmV4cG9ydCB7IGNyZWF0ZU5vdGlmaWNhdGlvbiB9O1xuIiwiXHJcbmltcG9ydCB7IHVwZGF0ZVRpbWUgfSBmcm9tIFwiLi4vdXRpbHMvdXBkYXRlVGltZVwiO1xyXG5cclxubGV0IGludGVydmFsSWQ7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUaW1lQ29udGFpbmVyKGRhdGEpIHtcclxuICAgIGNvbnN0IHRpbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY2F0aW9uVGltZVwiKTtcclxuICAgIGlmIChpbnRlcnZhbElkKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVRpbWUoZGF0YSwgdGltZUNvbnRhaW5lcik7XHJcbiAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdXBkYXRlVGltZShkYXRhLCB0aW1lQ29udGFpbmVyKSwgMTAwMCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHVwZGF0ZVRpbWVDb250YWluZXIgfSIsImZ1bmN0aW9uIGRyYWdIb3VycygpIHtcblx0Y29uc3Qgc2xpZGVycyA9IFtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJIb3Vyc0NvbnRhaW5lclwiKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwb3B1bGFyUGxhY2VzXCIpXTtcblxuXHRzbGlkZXJzLmZvckVhY2goKHNsaWRlcikgPT4ge1xuXHRcdGxldCBpc0Rvd24gPSBmYWxzZTsgLy8gZmxhZyB2YXJpYWJsZSB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoZSBzbGlkZXIgaXMgY2xpY2tlZCBvciBub3Rcblx0XHRsZXQgc3RhcnRYOyAvLyBwb3NpdGlvbiBvbiBwYWdlIHdoZXJlIHdlIGZpcnN0IGNsaWNrIChpbnNpZGUgdGhlIHNjcm9sbGFibGUgZGl2KVxuXHRcdGxldCBzY3JvbGxMZWZ0OyAvLyBwaXhlbHMgdG8gc2Nyb2xsXG5cblx0XHQvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBtb3VzZSBhY3Rpb25zXG5cdFx0c2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcHJlcGFyZUdyYWIpO1xuXHRcdHNsaWRlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCByZW1vdmVHcmFiKTtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCByZW1vdmVHcmFiKTsgLy8gQ2hhbmdlOiBMaXN0ZW5lZCBvbiB0aGUgZG9jdW1lbnRcblx0XHRzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZSkgPT4gc2xpZGVPbkRyYWcoZSwgMS41KSk7IC8vIEFkanVzdCBzcGVlZFxuXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlR3JhYigpIHtcblx0XHRcdGlzRG93biA9IGZhbHNlO1xuXHRcdFx0c2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcHJlcGFyZUdyYWIoZSkge1xuXHRcdFx0aXNEb3duID0gdHJ1ZTsgLy8gV2hlbiB0aGlzIGlzIHRydWUsIHdlIHdpbGwgYmUgYWJsZSB0byBzY3JvbGxcblxuXHRcdFx0c2xpZGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cdFx0XHQvLyBDYWxjdWxhdGUgdGhlIHBvc2l0aW9uIHdoZXJlIHdlIGNsaWNrZWQgdGFraW5nIGludG8gYWNjb3VudCB0aGUgb2Zmc2V0IG9mIHRoZSBlbGVtZW50XG5cdFx0XHRzdGFydFggPSBlLnBhZ2VYIC0gc2xpZGVyLm9mZnNldExlZnQ7XG5cdFx0XHQvLyBUYWtlIGludG8gYWNjb3VudCB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnRcblx0XHRcdHNjcm9sbExlZnQgPSBzbGlkZXIuc2Nyb2xsTGVmdDtcblx0XHRcdC8vIENoYW5nZTogUHJldmVudCBkZWZhdWx0IGJlaGF2aW9yIHRvIGF2b2lkIHRleHQgc2VsZWN0aW9uIGFuZCBvdGhlciBkZWZhdWx0IGFjdGlvbnNcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdFx0XG5cdFx0ZnVuY3Rpb24gc2xpZGVPbkRyYWcoZSwgc3BlZWQpIHtcblx0XHRcdGlmICghaXNEb3duKSByZXR1cm47IC8vIE9ubHkgcHJvY2VlZCBpZiBtb3VzZSBjbGljayB3aGlsZSBkcmFnZ2luZ1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBDaGFuZ2U6IFByZXZlbnQgZGVmYXVsdCBiZWhhdmlvciB0byBhdm9pZCB1bmludGVuZGVkIGFjdGlvbnNcblx0XHRcdC8vIERldGVybWluZSB0aGUgbnVtYmVyIG9mIHBpeGVscyB0aGUgY3Vyc29yIG1vdmVkLCBmcm9tIG1vdXNlZG93biBldmVudFxuXHRcdFx0Y29uc3QgeCA9IGUucGFnZVggLSBzbGlkZXIub2Zmc2V0TGVmdDtcblx0XHRcdGNvbnN0IHdhbGsgPSB4IC0gc3RhcnRYO1xuXG5cdFx0XHRzbGlkZXIuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQgLSB3YWxrICogc3BlZWQ7XG5cdFx0fVxuXHR9KTtcbn1cblxuZXhwb3J0IHsgZHJhZ0hvdXJzIH07XG4iLCJpbXBvcnQgeyByZXNvbHZlVmFsdWVQYXRoIH0gZnJvbSBcIi4vcmVzb2x2ZVBhdGhcIjtcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlRHVhbFZhbHVlRmllbGRzKGNvbnRhaW5lciwgdmFsdWVQYXRoLCB1bml0TSwgdW5pdEksIGRhdGEpIHtcclxuXHRjb25zdCB2YWx1ZSA9IHJlc29sdmVWYWx1ZVBhdGgoZGF0YSwgdmFsdWVQYXRoKTtcclxuXHRjb25zdCBtZXRyaWNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuXHRjb25zdCBpbXBlcmlhbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG5cclxuXHRtZXRyaWNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1ldHJpY1wiKTtcclxuXHRpbXBlcmlhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaW1wZXJpYWxcIik7XHJcblxyXG5cdG1ldHJpY0NvbnRhaW5lci5pbm5lckhUTUwgPSBgJHt2YWx1ZS5tZXRyaWN9PHNwYW4gY2xhc3M9XCJ1bml0XCI+JHt1bml0TX08L3NwYW4+YDtcclxuXHRpbXBlcmlhbENvbnRhaW5lci5pbm5lckhUTUwgPSBgJHt2YWx1ZS5pbXBlcmlhbH08c3BhbiBjbGFzcz1cInVuaXRcIj4ke3VuaXRJfTwvc3Bhbj5gO1xyXG5cclxuXHRjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImR1YWwtdmFsdWVcIik7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKG1ldHJpY0NvbnRhaW5lcik7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGltcGVyaWFsQ29udGFpbmVyKTtcclxufVxyXG5cclxuZXhwb3J0IHsgZ2VuZXJhdGVEdWFsVmFsdWVGaWVsZHMgfTsiLCJmdW5jdGlvbiB1cGRhdGVUaW1lKCkge1xuXHRjb25zdCBsb2NhbFRpbWVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2FsVGltZVwiKTtcblx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblx0Y29uc3QgaG91cnMgPSBTdHJpbmcobm93LmdldEhvdXJzKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcblx0Y29uc3QgbWludXRlcyA9IFN0cmluZyhub3cuZ2V0TWludXRlcygpKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cdGNvbnN0IHNlY29uZHMgPSBTdHJpbmcobm93LmdldFNlY29uZHMoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuXHRjb25zdCBjdXJyZW50VGltZSA9IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsb2NhbC10aW1lIGhvdXJzXCI+JHtob3Vyc308L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibG9jYWwtdGltZSBkaXZpZGVyXCI+Ojwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsb2NhbC10aW1lIG1pbnV0ZXNcIj4ke21pbnV0ZXN9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImxvY2FsLXRpbWUgZGl2aWRlclwiPjo8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibG9jYWwtdGltZSBzZWNvbmRzXCI+JHtzZWNvbmRzfTwvc3Bhbj5cbiAgICBgO1xuXG5cdGxvY2FsVGltZUNvbnRhaW5lci5pbm5lckhUTUwgPSBjdXJyZW50VGltZTtcbn1cblxuZXhwb3J0IHsgdXBkYXRlVGltZSB9O1xuIiwiZnVuY3Rpb24gcG9wdWxhdGVET01FbGVtZW50KHNlbGVjdG9yLCBjb250ZW50KSB7XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblx0aWYgKGVsZW1lbnQpIHtcblx0XHRlbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cdH1cbn1cblxuZXhwb3J0IHsgcG9wdWxhdGVET01FbGVtZW50IH07XG4iLCJmdW5jdGlvbiByZXNvbHZlVmFsdWVQYXRoKG9iaiwgcGF0aCkge1xuXHRyZXR1cm4gcGF0aC5zcGxpdChcIi5cIikucmVkdWNlKChhY2MsIHBhcnQpID0+IGFjYyAmJiBhY2NbcGFydF0sIG9iaik7XG59XG5cbmV4cG9ydCB7IHJlc29sdmVWYWx1ZVBhdGggfTtcbiIsImZ1bmN0aW9uIHNob3dMb2FkZXIoKSB7XG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xufVxuXG5mdW5jdGlvbiBoaWRlTG9hZGVyKCkge1xuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRlclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcbn1cblxuZXhwb3J0IHsgc2hvd0xvYWRlciwgaGlkZUxvYWRlciB9O1xuIiwiY29uc3Qgc3VucmlzZUljb24gPSBgPHN2ZyBjbGFzcz1cInN1bnJpc2VcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjJcIiB2aWV3Qm94PVwiMCAwIDI0IDIyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMS4yOTI5IDAuMjkyODkzQzExLjY4MzQgLTAuMDk3NjMxMSAxMi4zMTY2IC0wLjA5NzYzMTEgMTIuNzA3MSAwLjI5Mjg5M0wxNi43MDcxIDQuMjkyODlDMTcuMDk3NiA0LjY4MzQyIDE3LjA5NzYgNS4zMTY1OCAxNi43MDcxIDUuNzA3MTFDMTYuMzE2NiA2LjA5NzYzIDE1LjY4MzQgNi4wOTc2MyAxNS4yOTI5IDUuNzA3MTFMMTMgMy40MTQyMVY4QzEzIDguNTUyMjggMTIuNTUyMyA5IDEyIDlDMTEuNDQ3NyA5IDExIDguNTUyMjggMTEgOFYzLjQxNDIxTDguNzA3MTEgNS43MDcxMUM4LjMxNjU4IDYuMDk3NjMgNy42ODM0MiA2LjA5NzYzIDcuMjkyODkgNS43MDcxMUM2LjkwMjM3IDUuMzE2NTggNi45MDIzNyA0LjY4MzQyIDcuMjkyODkgNC4yOTI4OUwxMS4yOTI5IDAuMjkyODkzWk0zLjUxMjYyIDguNTEyNjJDMy45MDMxNCA4LjEyMjEgNC41MzYzMSA4LjEyMjEgNC45MjY4MyA4LjUxMjYyTDYuMzQ2ODMgOS45MzI2MkM2LjczNzM2IDEwLjMyMzEgNi43MzczNiAxMC45NTYzIDYuMzQ2ODMgMTEuMzQ2OEM1Ljk1NjMxIDExLjczNzQgNS4zMjMxNCAxMS43Mzc0IDQuOTMyNjIgMTEuMzQ2OEwzLjUxMjYyIDkuOTI2ODNDMy4xMjIxIDkuNTM2MzEgMy4xMjIxIDguOTAzMTQgMy41MTI2MiA4LjUxMjYyWk0yMC40ODc1IDguNTEyNjJDMjAuODc4IDguOTAzMTQgMjAuODc4IDkuNTM2MzEgMjAuNDg3NSA5LjkyNjgzTDE5LjA2NzUgMTEuMzQ2OEMxOC42NzY5IDExLjczNzQgMTguMDQzOCAxMS43Mzc0IDE3LjY1MzIgMTEuMzQ2OEMxNy4yNjI3IDEwLjk1NjMgMTcuMjYyNyAxMC4zMjMxIDE3LjY1MzIgOS45MzI2MkwxOS4wNzMyIDguNTEyNjJDMTkuNDYzOCA4LjEyMjEgMjAuMDk2OSA4LjEyMjEgMjAuNDg3NSA4LjUxMjYyWk03Ljc1NzM2IDEyLjc1NzRDOC44ODI1OCAxMS42MzIxIDEwLjQwODcgMTEgMTIgMTFDMTMuNTkxMyAxMSAxNS4xMTc0IDExLjYzMjEgMTYuMjQyNiAxMi43NTc0QzE3LjM2NzkgMTMuODgyNiAxOCAxNS40MDg3IDE4IDE3QzE4IDE3LjU1MjMgMTcuNTUyMyAxOCAxNyAxOEMxNi40NDc3IDE4IDE2IDE3LjU1MjMgMTYgMTdDMTYgMTUuOTM5MSAxNS41Nzg2IDE0LjkyMTcgMTQuODI4NCAxNC4xNzE2QzE0LjA3ODMgMTMuNDIxNCAxMy4wNjA5IDEzIDEyIDEzQzEwLjkzOTEgMTMgOS45MjE3MiAxMy40MjE0IDkuMTcxNTcgMTQuMTcxNkM4LjQyMTQzIDE0LjkyMTcgOCAxNS45MzkxIDggMTdDOCAxNy41NTIzIDcuNTUyMjggMTggNyAxOEM2LjQ0NzcyIDE4IDYgMTcuNTUyMyA2IDE3QzYgMTUuNDA4NyA2LjYzMjE0IDEzLjg4MjYgNy43NTczNiAxMi43NTc0Wk0wIDE3QzAgMTYuNDQ3NyAwLjQ0NzcxNSAxNiAxIDE2SDNDMy41NTIyOCAxNiA0IDE2LjQ0NzcgNCAxN0M0IDE3LjU1MjMgMy41NTIyOCAxOCAzIDE4SDFDMC40NDc3MTUgMTggMCAxNy41NTIzIDAgMTdaTTIwIDE3QzIwIDE2LjQ0NzcgMjAuNDQ3NyAxNiAyMSAxNkgyM0MyMy41NTIzIDE2IDI0IDE2LjQ0NzcgMjQgMTdDMjQgMTcuNTUyMyAyMy41NTIzIDE4IDIzIDE4SDIxQzIwLjQ0NzcgMTggMjAgMTcuNTUyMyAyMCAxN1pNMCAyMUMwIDIwLjQ0NzcgMC40NDc3MTUgMjAgMSAyMEgyM0MyMy41NTIzIDIwIDI0IDIwLjQ0NzcgMjQgMjFDMjQgMjEuNTUyMyAyMy41NTIzIDIyIDIzIDIySDFDMC40NDc3MTUgMjIgMCAyMS41NTIzIDAgMjFaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG48L3N2Zz5gO1xyXG5cclxuY29uc3Qgc3Vuc2V0SWNvbiA9IGA8c3ZnIGNsYXNzPVwic3Vuc2V0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjIyXCIgdmlld0JveD1cIjAgMCAyNCAyMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIgMEMxMi41NTIzIDAgMTMgMC40NDc3MTUgMTMgMVY1LjU4NTc5TDE1LjI5MjkgMy4yOTI4OUMxNS42ODM0IDIuOTAyMzcgMTYuMzE2NiAyLjkwMjM3IDE2LjcwNzEgMy4yOTI4OUMxNy4wOTc2IDMuNjgzNDIgMTcuMDk3NiA0LjMxNjU4IDE2LjcwNzEgNC43MDcxMUwxMi43MDcxIDguNzA3MTFDMTIuMzE2NiA5LjA5NzYzIDExLjY4MzQgOS4wOTc2MyAxMS4yOTI5IDguNzA3MTFMNy4yOTI4OSA0LjcwNzExQzYuOTAyMzcgNC4zMTY1OCA2LjkwMjM3IDMuNjgzNDIgNy4yOTI4OSAzLjI5Mjg5QzcuNjgzNDIgMi45MDIzNyA4LjMxNjU4IDIuOTAyMzcgOC43MDcxMSAzLjI5Mjg5TDExIDUuNTg1NzlWMUMxMSAwLjQ0NzcxNSAxMS40NDc3IDAgMTIgMFpNMy41MTI2MiA4LjUxMjYyQzMuOTAzMTQgOC4xMjIxIDQuNTM2MzEgOC4xMjIxIDQuOTI2ODMgOC41MTI2Mkw2LjM0NjgzIDkuOTMyNjJDNi43MzczNiAxMC4zMjMxIDYuNzM3MzYgMTAuOTU2MyA2LjM0NjgzIDExLjM0NjhDNS45NTYzMSAxMS43Mzc0IDUuMzIzMTQgMTEuNzM3NCA0LjkzMjYyIDExLjM0NjhMMy41MTI2MiA5LjkyNjgzQzMuMTIyMSA5LjUzNjMxIDMuMTIyMSA4LjkwMzE0IDMuNTEyNjIgOC41MTI2MlpNMjAuNDg3NSA4LjUxMjYyQzIwLjg3OCA4LjkwMzE0IDIwLjg3OCA5LjUzNjMxIDIwLjQ4NzUgOS45MjY4M0wxOS4wNjc1IDExLjM0NjhDMTguNjc2OSAxMS43Mzc0IDE4LjA0MzggMTEuNzM3NCAxNy42NTMyIDExLjM0NjhDMTcuMjYyNyAxMC45NTYzIDE3LjI2MjcgMTAuMzIzMSAxNy42NTMyIDkuOTMyNjJMMTkuMDczMiA4LjUxMjYyQzE5LjQ2MzggOC4xMjIxIDIwLjA5NjkgOC4xMjIxIDIwLjQ4NzUgOC41MTI2MlpNNy43NTczNiAxMi43NTc0QzguODgyNTggMTEuNjMyMSAxMC40MDg3IDExIDEyIDExQzEzLjU5MTMgMTEgMTUuMTE3NCAxMS42MzIxIDE2LjI0MjYgMTIuNzU3NEMxNy4zNjc5IDEzLjg4MjYgMTggMTUuNDA4NyAxOCAxN0MxOCAxNy41NTIzIDE3LjU1MjMgMTggMTcgMThDMTYuNDQ3NyAxOCAxNiAxNy41NTIzIDE2IDE3QzE2IDE1LjkzOTEgMTUuNTc4NiAxNC45MjE3IDE0LjgyODQgMTQuMTcxNkMxNC4wNzgzIDEzLjQyMTQgMTMuMDYwOSAxMyAxMiAxM0MxMC45MzkxIDEzIDkuOTIxNzIgMTMuNDIxNCA5LjE3MTU3IDE0LjE3MTZDOC40MjE0MyAxNC45MjE3IDggMTUuOTM5MSA4IDE3QzggMTcuNTUyMyA3LjU1MjI4IDE4IDcgMThDNi40NDc3MiAxOCA2IDE3LjU1MjMgNiAxN0M2IDE1LjQwODcgNi42MzIxNCAxMy44ODI2IDcuNzU3MzYgMTIuNzU3NFpNMCAxN0MwIDE2LjQ0NzcgMC40NDc3MTUgMTYgMSAxNkgzQzMuNTUyMjggMTYgNCAxNi40NDc3IDQgMTdDNCAxNy41NTIzIDMuNTUyMjggMTggMyAxOEgxQzAuNDQ3NzE1IDE4IDAgMTcuNTUyMyAwIDE3Wk0yMCAxN0MyMCAxNi40NDc3IDIwLjQ0NzcgMTYgMjEgMTZIMjNDMjMuNTUyMyAxNiAyNCAxNi40NDc3IDI0IDE3QzI0IDE3LjU1MjMgMjMuNTUyMyAxOCAyMyAxOEgyMUMyMC40NDc3IDE4IDIwIDE3LjU1MjMgMjAgMTdaTTAgMjFDMCAyMC40NDc3IDAuNDQ3NzE1IDIwIDEgMjBIMjNDMjMuNTUyMyAyMCAyNCAyMC40NDc3IDI0IDIxQzI0IDIxLjU1MjMgMjMuNTUyMyAyMiAyMyAyMkgxQzAuNDQ3NzE1IDIyIDAgMjEuNTUyMyAwIDIxWlwiIGZpbGw9XCJibGFja1wiLz5cclxuPC9zdmc+YDtcclxuXHJcbmV4cG9ydCB7c3VucmlzZUljb24sIHN1bnNldEljb259IiwiZnVuY3Rpb24gdXBkYXRlVGltZShkYXRhLCB0aW1lQ29udGFpbmVyKSB7XG5cdGNvbnN0IFtob3Vyc10gPSBkYXRhLmxvY2FsdGltZS50aW1lLnNwbGl0KFwiOlwiKTtcblx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblx0Y29uc3QgbWludXRlcyA9IG5vdy5nZXRNaW51dGVzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cdGNvbnN0IHNlY29uZHMgPSBub3cuZ2V0U2Vjb25kcygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuXHRjb25zdCBmb3JtYXR0ZWRUaW1lID0gYCR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfWA7XG5cdHRpbWVDb250YWluZXIuaW5uZXJIVE1MID0gYCR7ZGF0YS5sb2NhbHRpbWUuZGF0ZX0sICR7Zm9ybWF0dGVkVGltZX1gO1xufVxuXG5leHBvcnQgeyB1cGRhdGVUaW1lIH07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgdGFyZ2V0TGVuZ3RoKSB7XG4gIGNvbnN0IHNpZ24gPSBudW1iZXIgPCAwID8gXCItXCIgOiBcIlwiO1xuICBjb25zdCBvdXRwdXQgPSBNYXRoLmFicyhudW1iZXIpLnRvU3RyaW5nKCkucGFkU3RhcnQodGFyZ2V0TGVuZ3RoLCBcIjBcIik7XG4gIHJldHVybiBzaWduICsgb3V0cHV0O1xufVxuIiwibGV0IGRlZmF1bHRPcHRpb25zID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgcmV0dXJuIGRlZmF1bHRPcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdE9wdGlvbnMobmV3T3B0aW9ucykge1xuICBkZWZhdWx0T3B0aW9ucyA9IG5ld09wdGlvbnM7XG59XG4iLCJpbXBvcnQgeyBnZXREYXlPZlllYXIgfSBmcm9tIFwiLi4vLi4vZ2V0RGF5T2ZZZWFyLm1qc1wiO1xuaW1wb3J0IHsgZ2V0SVNPV2VlayB9IGZyb20gXCIuLi8uLi9nZXRJU09XZWVrLm1qc1wiO1xuaW1wb3J0IHsgZ2V0SVNPV2Vla1llYXIgfSBmcm9tIFwiLi4vLi4vZ2V0SVNPV2Vla1llYXIubWpzXCI7XG5pbXBvcnQgeyBnZXRXZWVrIH0gZnJvbSBcIi4uLy4uL2dldFdlZWsubWpzXCI7XG5pbXBvcnQgeyBnZXRXZWVrWWVhciB9IGZyb20gXCIuLi8uLi9nZXRXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IGFkZExlYWRpbmdaZXJvcyB9IGZyb20gXCIuLi9hZGRMZWFkaW5nWmVyb3MubWpzXCI7XG5pbXBvcnQgeyBsaWdodEZvcm1hdHRlcnMgfSBmcm9tIFwiLi9saWdodEZvcm1hdHRlcnMubWpzXCI7XG5cbmNvbnN0IGRheVBlcmlvZEVudW0gPSB7XG4gIGFtOiBcImFtXCIsXG4gIHBtOiBcInBtXCIsXG4gIG1pZG5pZ2h0OiBcIm1pZG5pZ2h0XCIsXG4gIG5vb246IFwibm9vblwiLFxuICBtb3JuaW5nOiBcIm1vcm5pbmdcIixcbiAgYWZ0ZXJub29uOiBcImFmdGVybm9vblwiLFxuICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgbmlnaHQ6IFwibmlnaHRcIixcbn07XG5cbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8IE1pbGxpc2Vjb25kcyBpbiBkYXkgICAgICAgICAgICB8XG4gKiB8ICBiICB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICB8ICBCICB8IEZsZXhpYmxlIGRheSBwZXJpb2QgICAgICAgICAgICB8XG4gKiB8ICBjICB8IFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrICB8ICBDKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8IERheSBvZiB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBlICB8IExvY2FsIGRheSBvZiB3ZWVrICAgICAgICAgICAgICB8ICBFICB8IERheSBvZiB3ZWVrICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBmICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBGKiB8IERheSBvZiB3ZWVrIGluIG1vbnRoICAgICAgICAgICB8XG4gKiB8ICBnKiB8IE1vZGlmaWVkIEp1bGlhbiBkYXkgICAgICAgICAgICB8ICBHICB8IEVyYSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBpISB8IElTTyBkYXkgb2Ygd2VlayAgICAgICAgICAgICAgICB8ICBJISB8IElTTyB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgICB8XG4gKiB8ICBqKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8ICBKKiB8IExvY2FsaXplZCBob3VyIHcvbyBkYXkgcGVyaW9kICB8XG4gKiB8ICBrICB8IEhvdXIgWzEtMjRdICAgICAgICAgICAgICAgICAgICB8ICBLICB8IEhvdXIgWzAtMTFdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBsKiB8IChkZXByZWNhdGVkKSAgICAgICAgICAgICAgICAgICB8ICBMICB8IFN0YW5kLWFsb25lIG1vbnRoICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBuICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBOICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBvISB8IE9yZGluYWwgbnVtYmVyIG1vZGlmaWVyICAgICAgICB8ICBPICB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICB8XG4gKiB8ICBwISB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICB8ICBQISB8IExvbmcgbG9jYWxpemVkIGRhdGUgICAgICAgICAgICB8XG4gKiB8ICBxICB8IFN0YW5kLWFsb25lIHF1YXJ0ZXIgICAgICAgICAgICB8ICBRICB8IFF1YXJ0ZXIgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICByKiB8IFJlbGF0ZWQgR3JlZ29yaWFuIHllYXIgICAgICAgICB8ICBSISB8IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB0ISB8IFNlY29uZHMgdGltZXN0YW1wICAgICAgICAgICAgICB8ICBUISB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICB8XG4gKiB8ICB1ICB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICB8ICBVKiB8IEN5Y2xpYyB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICB2KiB8IFRpbWV6b25lIChnZW5lcmljIG5vbi1sb2NhdC4pICB8ICBWKiB8IFRpbWV6b25lIChsb2NhdGlvbikgICAgICAgICAgICB8XG4gKiB8ICB3ICB8IExvY2FsIHdlZWsgb2YgeWVhciAgICAgICAgICAgICB8ICBXKiB8IFdlZWsgb2YgbW9udGggICAgICAgICAgICAgICAgICB8XG4gKiB8ICB4ICB8IFRpbWV6b25lIChJU08tODYwMSB3L28gWikgICAgICB8ICBYICB8IFRpbWV6b25lIChJU08tODYwMSkgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8IExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICB8XG4gKiB8ICB6ICB8IFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXQuKSB8ICBaKiB8IFRpbWV6b25lIChhbGlhc2VzKSAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICEgYXJlIG5vbi1zdGFuZGFyZCwgYnV0IGltcGxlbWVudGVkIGJ5IGRhdGUtZm5zOlxuICogLSBgb2AgbW9kaWZpZXMgdGhlIHByZXZpb3VzIHRva2VuIHRvIHR1cm4gaXQgaW50byBhbiBvcmRpbmFsIChzZWUgYGZvcm1hdGAgZG9jcylcbiAqIC0gYGlgIGlzIElTTyBkYXkgb2Ygd2Vlay4gRm9yIGBpYCBhbmQgYGlpYCBpcyByZXR1cm5zIG51bWVyaWMgSVNPIHdlZWsgZGF5cyxcbiAqICAgaS5lLiA3IGZvciBTdW5kYXksIDEgZm9yIE1vbmRheSwgZXRjLlxuICogLSBgSWAgaXMgSVNPIHdlZWsgb2YgeWVhciwgYXMgb3Bwb3NlZCB0byBgd2Agd2hpY2ggaXMgbG9jYWwgd2VlayBvZiB5ZWFyLlxuICogLSBgUmAgaXMgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsIGFzIG9wcG9zZWQgdG8gYFlgIHdoaWNoIGlzIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIuXG4gKiAgIGBSYCBpcyBzdXBwb3NlZCB0byBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYElgIGFuZCBgaWBcbiAqICAgZm9yIHVuaXZlcnNhbCBJU08gd2Vlay1udW1iZXJpbmcgZGF0ZSwgd2hlcmVhc1xuICogICBgWWAgaXMgc3VwcG9zZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGB3YCBhbmQgYGVgXG4gKiAgIGZvciB3ZWVrLW51bWJlcmluZyBkYXRlIHNwZWNpZmljIHRvIHRoZSBsb2NhbGUuXG4gKiAtIGBQYCBpcyBsb25nIGxvY2FsaXplZCBkYXRlIGZvcm1hdFxuICogLSBgcGAgaXMgbG9uZyBsb2NhbGl6ZWQgdGltZSBmb3JtYXRcbiAqL1xuXG5leHBvcnQgY29uc3QgZm9ybWF0dGVycyA9IHtcbiAgLy8gRXJhXG4gIEc6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBlcmEgPSBkYXRlLmdldEZ1bGxZZWFyKCkgPiAwID8gMSA6IDA7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gQUQsIEJDXG4gICAgICBjYXNlIFwiR1wiOlxuICAgICAgY2FzZSBcIkdHXCI6XG4gICAgICBjYXNlIFwiR0dHXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7IHdpZHRoOiBcImFiYnJldmlhdGVkXCIgfSk7XG4gICAgICAvLyBBLCBCXG4gICAgICBjYXNlIFwiR0dHR0dcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHsgd2lkdGg6IFwibmFycm93XCIgfSk7XG4gICAgICAvLyBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdFxuICAgICAgY2FzZSBcIkdHR0dcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7IHdpZHRoOiBcIndpZGVcIiB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gWWVhclxuICB5OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgLy8gT3JkaW5hbCBudW1iZXJcbiAgICBpZiAodG9rZW4gPT09IFwieW9cIikge1xuICAgICAgY29uc3Qgc2lnbmVkWWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIC8vIFJldHVybnMgMSBmb3IgMSBCQyAod2hpY2ggaXMgeWVhciAwIGluIEphdmFTY3JpcHQpXG4gICAgICBjb25zdCB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih5ZWFyLCB7IHVuaXQ6IFwieWVhclwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMueShkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhclxuICBZOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgc2lnbmVkV2Vla1llYXIgPSBnZXRXZWVrWWVhcihkYXRlLCBvcHRpb25zKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIGNvbnN0IHdlZWtZZWFyID0gc2lnbmVkV2Vla1llYXIgPiAwID8gc2lnbmVkV2Vla1llYXIgOiAxIC0gc2lnbmVkV2Vla1llYXI7XG5cbiAgICAvLyBUd28gZGlnaXQgeWVhclxuICAgIGlmICh0b2tlbiA9PT0gXCJZWVwiKSB7XG4gICAgICBjb25zdCB0d29EaWdpdFllYXIgPSB3ZWVrWWVhciAlIDEwMDtcbiAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModHdvRGlnaXRZZWFyLCAyKTtcbiAgICB9XG5cbiAgICAvLyBPcmRpbmFsIG51bWJlclxuICAgIGlmICh0b2tlbiA9PT0gXCJZb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih3ZWVrWWVhciwgeyB1bml0OiBcInllYXJcIiB9KTtcbiAgICB9XG5cbiAgICAvLyBQYWRkaW5nXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh3ZWVrWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICBSOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4pIHtcbiAgICBjb25zdCBpc29XZWVrWWVhciA9IGdldElTT1dlZWtZZWFyKGRhdGUpO1xuXG4gICAgLy8gUGFkZGluZ1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvV2Vla1llYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRXh0ZW5kZWQgeWVhci4gVGhpcyBpcyBhIHNpbmdsZSBudW1iZXIgZGVzaWduYXRpbmcgdGhlIHllYXIgb2YgdGhpcyBjYWxlbmRhciBzeXN0ZW0uXG4gIC8vIFRoZSBtYWluIGRpZmZlcmVuY2UgYmV0d2VlbiBgeWAgYW5kIGB1YCBsb2NhbGl6ZXJzIGFyZSBCLkMuIHllYXJzOlxuICAvLyB8IFllYXIgfCBgeWAgfCBgdWAgfFxuICAvLyB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICAvLyB8IEFDIDEgfCAgIDEgfCAgIDEgfFxuICAvLyB8IEJDIDEgfCAgIDEgfCAgIDAgfFxuICAvLyB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICAvLyBBbHNvIGB5eWAgYWx3YXlzIHJldHVybnMgdGhlIGxhc3QgdHdvIGRpZ2l0cyBvZiBhIHllYXIsXG4gIC8vIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZC5cbiAgdTogZnVuY3Rpb24gKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gUXVhcnRlclxuICBROiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgcXVhcnRlciA9IE1hdGguY2VpbCgoZGF0ZS5nZXRNb250aCgpICsgMSkgLyAzKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAzLCA0XG4gICAgICBjYXNlIFwiUVwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKHF1YXJ0ZXIpO1xuICAgICAgLy8gMDEsIDAyLCAwMywgMDRcbiAgICAgIGNhc2UgXCJRUVwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHF1YXJ0ZXIsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIDNyZCwgNHRoXG4gICAgICBjYXNlIFwiUW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIocXVhcnRlciwgeyB1bml0OiBcInF1YXJ0ZXJcIiB9KTtcbiAgICAgIC8vIFExLCBRMiwgUTMsIFE0XG4gICAgICBjYXNlIFwiUVFRXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIDEsIDIsIDMsIDQgKG5hcnJvdyBxdWFydGVyOyBjb3VsZCBiZSBub3QgbnVtZXJpY2FsKVxuICAgICAgY2FzZSBcIlFRUVFRXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLlxuICAgICAgY2FzZSBcIlFRUVFcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBTdGFuZC1hbG9uZSBxdWFydGVyXG4gIHE6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBxdWFydGVyID0gTWF0aC5jZWlsKChkYXRlLmdldE1vbnRoKCkgKyAxKSAvIDMpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIDMsIDRcbiAgICAgIGNhc2UgXCJxXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcocXVhcnRlcik7XG4gICAgICAvLyAwMSwgMDIsIDAzLCAwNFxuICAgICAgY2FzZSBcInFxXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MocXVhcnRlciwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgICAgIGNhc2UgXCJxb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihxdWFydGVyLCB7IHVuaXQ6IFwicXVhcnRlclwiIH0pO1xuICAgICAgLy8gUTEsIFEyLCBRMywgUTRcbiAgICAgIGNhc2UgXCJxcXFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gMSwgMiwgMywgNCAobmFycm93IHF1YXJ0ZXI7IGNvdWxkIGJlIG5vdCBudW1lcmljYWwpXG4gICAgICBjYXNlIFwicXFxcXFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uXG4gICAgICBjYXNlIFwicXFxcVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIE1vbnRoXG4gIE06IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiTVwiOlxuICAgICAgY2FzZSBcIk1NXCI6XG4gICAgICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuTShkYXRlLCB0b2tlbik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlIFwiTW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7IHVuaXQ6IFwibW9udGhcIiB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSBcIk1NTVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSBcIk1NTU1NXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlIFwiTU1NTVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7IHdpZHRoOiBcIndpZGVcIiwgY29udGV4dDogXCJmb3JtYXR0aW5nXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIFN0YW5kLWFsb25lIG1vbnRoXG4gIEw6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAuLi4sIDEyXG4gICAgICBjYXNlIFwiTFwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKG1vbnRoICsgMSk7XG4gICAgICAvLyAwMSwgMDIsIC4uLiwgMTJcbiAgICAgIGNhc2UgXCJMTFwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKG1vbnRoICsgMSwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlIFwiTG9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7IHVuaXQ6IFwibW9udGhcIiB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSBcIkxMTFwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSBcIkxMTExMXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlIFwiTExMTFwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7IHdpZHRoOiBcIndpZGVcIiwgY29udGV4dDogXCJzdGFuZGFsb25lXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIExvY2FsIHdlZWsgb2YgeWVhclxuICB3OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgd2VlayA9IGdldFdlZWsoZGF0ZSwgb3B0aW9ucyk7XG5cbiAgICBpZiAodG9rZW4gPT09IFwid29cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIod2VlaywgeyB1bml0OiBcIndlZWtcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHdlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gSVNPIHdlZWsgb2YgeWVhclxuICBJOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaXNvV2VlayA9IGdldElTT1dlZWsoZGF0ZSk7XG5cbiAgICBpZiAodG9rZW4gPT09IFwiSW9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaXNvV2VlaywgeyB1bml0OiBcIndlZWtcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGlzb1dlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcImRvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0RGF0ZSgpLCB7IHVuaXQ6IFwiZGF0ZVwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuZChkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXJcbiAgRDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGRheU9mWWVhciA9IGdldERheU9mWWVhcihkYXRlKTtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJEb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXlPZlllYXIsIHsgdW5pdDogXCJkYXlPZlllYXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRheU9mWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2Vla1xuICBFOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBUdWVcbiAgICAgIGNhc2UgXCJFXCI6XG4gICAgICBjYXNlIFwiRUVcIjpcbiAgICAgIGNhc2UgXCJFRUVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgXCJFRUVFRVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlIFwiRUVFRUVFXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwic2hvcnRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlIFwiRUVFRVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBMb2NhbCBkYXkgb2Ygd2Vla1xuICBlOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBsb2NhbERheU9mV2VlayA9IChkYXlPZldlZWsgLSBvcHRpb25zLndlZWtTdGFydHNPbiArIDgpICUgNyB8fCA3O1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIE51bWVyaWNhbCB2YWx1ZSAoTnRoIGRheSBvZiB3ZWVrIHdpdGggY3VycmVudCBsb2NhbGUgb3Igd2Vla1N0YXJ0c09uKVxuICAgICAgY2FzZSBcImVcIjpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhsb2NhbERheU9mV2Vlayk7XG4gICAgICAvLyBQYWRkZWQgbnVtZXJpY2FsIHZhbHVlXG4gICAgICBjYXNlIFwiZWVcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhsb2NhbERheU9mV2VlaywgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCA3dGhcbiAgICAgIGNhc2UgXCJlb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2VlaywgeyB1bml0OiBcImRheVwiIH0pO1xuICAgICAgY2FzZSBcImVlZVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImVlZWVlXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJlZWVlZWVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJlZWVlXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrXG4gIGM6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpO1xuICAgIGNvbnN0IGxvY2FsRGF5T2ZXZWVrID0gKGRheU9mV2VlayAtIG9wdGlvbnMud2Vla1N0YXJ0c09uICsgOCkgJSA3IHx8IDc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gTnVtZXJpY2FsIHZhbHVlIChzYW1lIGFzIGluIGBlYClcbiAgICAgIGNhc2UgXCJjXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcobG9jYWxEYXlPZldlZWspO1xuICAgICAgLy8gUGFkZGVkIG51bWVyaWNhbCB2YWx1ZVxuICAgICAgY2FzZSBcImNjXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MobG9jYWxEYXlPZldlZWssIHRva2VuLmxlbmd0aCk7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCA3dGhcbiAgICAgIGNhc2UgXCJjb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2VlaywgeyB1bml0OiBcImRheVwiIH0pO1xuICAgICAgY2FzZSBcImNjY1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImNjY2NjXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJjY2NjY2NcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJjY2NjXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIElTTyBkYXkgb2Ygd2Vla1xuICBpOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBpc29EYXlPZldlZWsgPSBkYXlPZldlZWsgPT09IDAgPyA3IDogZGF5T2ZXZWVrO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDJcbiAgICAgIGNhc2UgXCJpXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcoaXNvRGF5T2ZXZWVrKTtcbiAgICAgIC8vIDAyXG4gICAgICBjYXNlIFwiaWlcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29EYXlPZldlZWssIHRva2VuLmxlbmd0aCk7XG4gICAgICAvLyAybmRcbiAgICAgIGNhc2UgXCJpb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihpc29EYXlPZldlZWssIHsgdW5pdDogXCJkYXlcIiB9KTtcbiAgICAgIC8vIFR1ZVxuICAgICAgY2FzZSBcImlpaVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImlpaWlpXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJpaWlpaWlcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJpaWlpXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFNIG9yIFBNXG4gIGE6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBkYXlQZXJpb2RFbnVtVmFsdWUgPSBob3VycyAvIDEyID49IDEgPyBcInBtXCIgOiBcImFtXCI7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYVwiOlxuICAgICAgY2FzZSBcImFhXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiYWFhXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZVxuICAgICAgICAgIC5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJhYWFhYVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJhYWFhXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFNLCBQTSwgbWlkbmlnaHQsIG5vb25cbiAgYjogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5ub29uO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPT09IDApIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubWlkbmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGhvdXJzIC8gMTIgPj0gMSA/IFwicG1cIiA6IFwiYW1cIjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgY2FzZSBcImJiXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiYmJiXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZVxuICAgICAgICAgIC5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJiYmJiYlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJiYmJiXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIGluIHRoZSBtb3JuaW5nLCBpbiB0aGUgYWZ0ZXJub29uLCBpbiB0aGUgZXZlbmluZywgYXQgbmlnaHRcbiAgQjogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID49IDE3KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLmV2ZW5pbmc7XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5hZnRlcm5vb247XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSA0KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm1vcm5pbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubmlnaHQ7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSBcIkJcIjpcbiAgICAgIGNhc2UgXCJCQlwiOlxuICAgICAgY2FzZSBcIkJCQlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcIkJCQkJCXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcIkJCQkJcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gSG91ciBbMS0xMl1cbiAgaDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJob1wiKSB7XG4gICAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgJSAxMjtcbiAgICAgIGlmIChob3VycyA9PT0gMCkgaG91cnMgPSAxMjtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7IHVuaXQ6IFwiaG91clwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuaChkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gSG91ciBbMC0yM11cbiAgSDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJIb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldEhvdXJzKCksIHsgdW5pdDogXCJob3VyXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5IKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBIb3VyIFswLTExXVxuICBLOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgJSAxMjtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJLb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihob3VycywgeyB1bml0OiBcImhvdXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGhvdXJzLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEhvdXIgWzEtMjRdXG4gIGs6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDI0O1xuXG4gICAgaWYgKHRva2VuID09PSBcImtvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7IHVuaXQ6IFwiaG91clwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaG91cnMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gTWludXRlXG4gIG06IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09IFwibW9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRNaW51dGVzKCksIHsgdW5pdDogXCJtaW51dGVcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLm0oZGF0ZSwgdG9rZW4pO1xuICB9LFxuXG4gIC8vIFNlY29uZFxuICBzOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcInNvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0U2Vjb25kcygpLCB7IHVuaXQ6IFwic2Vjb25kXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5zKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBGcmFjdGlvbiBvZiBzZWNvbmRcbiAgUzogZnVuY3Rpb24gKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5TKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYWx3YXlzIGAnWidgKVxuICBYOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSkge1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgaWYgKHRpbWV6b25lT2Zmc2V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gXCJaXCI7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gSG91cnMgYW5kIG9wdGlvbmFsIG1pbnV0ZXNcbiAgICAgIGNhc2UgXCJYXCI6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXModGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGBYWGBcbiAgICAgIGNhc2UgXCJYWFhYXCI6XG4gICAgICBjYXNlIFwiWFhcIjogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYFhYWGBcbiAgICAgIGNhc2UgXCJYWFhYWFwiOlxuICAgICAgY2FzZSBcIlhYWFwiOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYCcrMDA6MDAnYCBvciBlcXVpdmFsZW50KVxuICB4OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSkge1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gSG91cnMgYW5kIG9wdGlvbmFsIG1pbnV0ZXNcbiAgICAgIGNhc2UgXCJ4XCI6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXModGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGB4eGBcbiAgICAgIGNhc2UgXCJ4eHh4XCI6XG4gICAgICBjYXNlIFwieHhcIjogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYHh4eGBcbiAgICAgIGNhc2UgXCJ4eHh4eFwiOlxuICAgICAgY2FzZSBcInh4eFwiOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBUaW1lem9uZSAoR01UKVxuICBPOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSkge1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgXCJPXCI6XG4gICAgICBjYXNlIFwiT09cIjpcbiAgICAgIGNhc2UgXCJPT09cIjpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZVNob3J0KHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlIFwiT09PT1wiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0aW9uKVxuICB6OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSkge1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgXCJ6XCI6XG4gICAgICBjYXNlIFwienpcIjpcbiAgICAgIGNhc2UgXCJ6enpcIjpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZVNob3J0KHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlIFwienp6elwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcFxuICB0OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSkge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGgudHJ1bmMoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRpbWVzdGFtcCwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBNaWxsaXNlY29uZHMgdGltZXN0YW1wXG4gIFQ6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgX2xvY2FsaXplKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0aW1lc3RhbXAsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG59O1xuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVNob3J0KG9mZnNldCwgZGVsaW1pdGVyID0gXCJcIikge1xuICBjb25zdCBzaWduID0gb2Zmc2V0ID4gMCA/IFwiLVwiIDogXCIrXCI7XG4gIGNvbnN0IGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gIGNvbnN0IGhvdXJzID0gTWF0aC50cnVuYyhhYnNPZmZzZXQgLyA2MCk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MDtcbiAgaWYgKG1pbnV0ZXMgPT09IDApIHtcbiAgICByZXR1cm4gc2lnbiArIFN0cmluZyhob3Vycyk7XG4gIH1cbiAgcmV0dXJuIHNpZ24gKyBTdHJpbmcoaG91cnMpICsgZGVsaW1pdGVyICsgYWRkTGVhZGluZ1plcm9zKG1pbnV0ZXMsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXMob2Zmc2V0LCBkZWxpbWl0ZXIpIHtcbiAgaWYgKG9mZnNldCAlIDYwID09PSAwKSB7XG4gICAgY29uc3Qgc2lnbiA9IG9mZnNldCA+IDAgPyBcIi1cIiA6IFwiK1wiO1xuICAgIHJldHVybiBzaWduICsgYWRkTGVhZGluZ1plcm9zKE1hdGguYWJzKG9mZnNldCkgLyA2MCwgMik7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKG9mZnNldCwgZGVsaW1pdGVyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUob2Zmc2V0LCBkZWxpbWl0ZXIgPSBcIlwiKSB7XG4gIGNvbnN0IHNpZ24gPSBvZmZzZXQgPiAwID8gXCItXCIgOiBcIitcIjtcbiAgY29uc3QgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgY29uc3QgaG91cnMgPSBhZGRMZWFkaW5nWmVyb3MoTWF0aC50cnVuYyhhYnNPZmZzZXQgLyA2MCksIDIpO1xuICBjb25zdCBtaW51dGVzID0gYWRkTGVhZGluZ1plcm9zKGFic09mZnNldCAlIDYwLCAyKTtcbiAgcmV0dXJuIHNpZ24gKyBob3VycyArIGRlbGltaXRlciArIG1pbnV0ZXM7XG59XG4iLCJpbXBvcnQgeyBhZGRMZWFkaW5nWmVyb3MgfSBmcm9tIFwiLi4vYWRkTGVhZGluZ1plcm9zLm1qc1wiO1xuXG4vKlxuICogfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgYSAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgfCAgQSogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgZCAgfCBEYXkgb2YgbW9udGggICAgICAgICAgICAgICAgICAgfCAgRCAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgaCAgfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgfCAgSCAgfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgbSAgfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgfCAgTSAgfCBNb250aCAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgcyAgfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgfCAgUyAgfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgfFxuICogfCAgeSAgfCBZZWFyIChhYnMpICAgICAgICAgICAgICAgICAgICAgfCAgWSAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICogYXJlIG5vdCBpbXBsZW1lbnRlZCBidXQgcmVzZXJ2ZWQgYnkgVW5pY29kZSBzdGFuZGFyZC5cbiAqL1xuXG5leHBvcnQgY29uc3QgbGlnaHRGb3JtYXR0ZXJzID0ge1xuICAvLyBZZWFyXG4gIHkoZGF0ZSwgdG9rZW4pIHtcbiAgICAvLyBGcm9tIGh0dHA6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtMzEvdHIzNS1kYXRlcy5odG1sI0RhdGVfRm9ybWF0X3Rva2Vuc1xuICAgIC8vIHwgWWVhciAgICAgfCAgICAgeSB8IHl5IHwgICB5eXkgfCAgeXl5eSB8IHl5eXl5IHxcbiAgICAvLyB8LS0tLS0tLS0tLXwtLS0tLS0tfC0tLS18LS0tLS0tLXwtLS0tLS0tfC0tLS0tLS18XG4gICAgLy8gfCBBRCAxICAgICB8ICAgICAxIHwgMDEgfCAgIDAwMSB8ICAwMDAxIHwgMDAwMDEgfFxuICAgIC8vIHwgQUQgMTIgICAgfCAgICAxMiB8IDEyIHwgICAwMTIgfCAgMDAxMiB8IDAwMDEyIHxcbiAgICAvLyB8IEFEIDEyMyAgIHwgICAxMjMgfCAyMyB8ICAgMTIzIHwgIDAxMjMgfCAwMDEyMyB8XG4gICAgLy8gfCBBRCAxMjM0ICB8ICAxMjM0IHwgMzQgfCAgMTIzNCB8ICAxMjM0IHwgMDEyMzQgfFxuICAgIC8vIHwgQUQgMTIzNDUgfCAxMjM0NSB8IDQ1IHwgMTIzNDUgfCAxMjM0NSB8IDEyMzQ1IHxcblxuICAgIGNvbnN0IHNpZ25lZFllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgLy8gUmV0dXJucyAxIGZvciAxIEJDICh3aGljaCBpcyB5ZWFyIDAgaW4gSmF2YVNjcmlwdClcbiAgICBjb25zdCB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0b2tlbiA9PT0gXCJ5eVwiID8geWVhciAlIDEwMCA6IHllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gTW9udGhcbiAgTShkYXRlLCB0b2tlbikge1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIHJldHVybiB0b2tlbiA9PT0gXCJNXCIgPyBTdHJpbmcobW9udGggKyAxKSA6IGFkZExlYWRpbmdaZXJvcyhtb250aCArIDEsIDIpO1xuICB9LFxuXG4gIC8vIERheSBvZiB0aGUgbW9udGhcbiAgZChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXREYXRlKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gQU0gb3IgUE1cbiAgYShkYXRlLCB0b2tlbikge1xuICAgIGNvbnN0IGRheVBlcmlvZEVudW1WYWx1ZSA9IGRhdGUuZ2V0SG91cnMoKSAvIDEyID49IDEgPyBcInBtXCIgOiBcImFtXCI7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYVwiOlxuICAgICAgY2FzZSBcImFhXCI6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJhYWFcIjpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZTtcbiAgICAgIGNhc2UgXCJhYWFhYVwiOlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlWzBdO1xuICAgICAgY2FzZSBcImFhYWFcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUgPT09IFwiYW1cIiA/IFwiYS5tLlwiIDogXCJwLm0uXCI7XG4gICAgfVxuICB9LFxuXG4gIC8vIEhvdXIgWzEtMTJdXG4gIGgoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0SG91cnMoKSAlIDEyIHx8IDEyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEhvdXIgWzAtMjNdXG4gIEgoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0SG91cnMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBNaW51dGVcbiAgbShkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNaW51dGVzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gU2Vjb25kXG4gIHMoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0U2Vjb25kcygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEZyYWN0aW9uIG9mIHNlY29uZFxuICBTKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgbnVtYmVyT2ZEaWdpdHMgPSB0b2tlbi5sZW5ndGg7XG4gICAgY29uc3QgbWlsbGlzZWNvbmRzID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICBjb25zdCBmcmFjdGlvbmFsU2Vjb25kcyA9IE1hdGgudHJ1bmMoXG4gICAgICBtaWxsaXNlY29uZHMgKiBNYXRoLnBvdygxMCwgbnVtYmVyT2ZEaWdpdHMgLSAzKSxcbiAgICApO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZnJhY3Rpb25hbFNlY29uZHMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG59O1xuIiwiY29uc3QgZGF0ZUxvbmdGb3JtYXR0ZXIgPSAocGF0dGVybiwgZm9ybWF0TG9uZykgPT4ge1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlIFwiUFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7IHdpZHRoOiBcInNob3J0XCIgfSk7XG4gICAgY2FzZSBcIlBQXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHsgd2lkdGg6IFwibWVkaXVtXCIgfSk7XG4gICAgY2FzZSBcIlBQUFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7IHdpZHRoOiBcImxvbmdcIiB9KTtcbiAgICBjYXNlIFwiUFBQUFwiOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHsgd2lkdGg6IFwiZnVsbFwiIH0pO1xuICB9XG59O1xuXG5jb25zdCB0aW1lTG9uZ0Zvcm1hdHRlciA9IChwYXR0ZXJuLCBmb3JtYXRMb25nKSA9PiB7XG4gIHN3aXRjaCAocGF0dGVybikge1xuICAgIGNhc2UgXCJwXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHsgd2lkdGg6IFwic2hvcnRcIiB9KTtcbiAgICBjYXNlIFwicHBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoeyB3aWR0aDogXCJtZWRpdW1cIiB9KTtcbiAgICBjYXNlIFwicHBwXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHsgd2lkdGg6IFwibG9uZ1wiIH0pO1xuICAgIGNhc2UgXCJwcHBwXCI6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoeyB3aWR0aDogXCJmdWxsXCIgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGRhdGVUaW1lTG9uZ0Zvcm1hdHRlciA9IChwYXR0ZXJuLCBmb3JtYXRMb25nKSA9PiB7XG4gIGNvbnN0IG1hdGNoUmVzdWx0ID0gcGF0dGVybi5tYXRjaCgvKFArKShwKyk/LykgfHwgW107XG4gIGNvbnN0IGRhdGVQYXR0ZXJuID0gbWF0Y2hSZXN1bHRbMV07XG4gIGNvbnN0IHRpbWVQYXR0ZXJuID0gbWF0Y2hSZXN1bHRbMl07XG5cbiAgaWYgKCF0aW1lUGF0dGVybikge1xuICAgIHJldHVybiBkYXRlTG9uZ0Zvcm1hdHRlcihwYXR0ZXJuLCBmb3JtYXRMb25nKTtcbiAgfVxuXG4gIGxldCBkYXRlVGltZUZvcm1hdDtcblxuICBzd2l0Y2ggKGRhdGVQYXR0ZXJuKSB7XG4gICAgY2FzZSBcIlBcIjpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7IHdpZHRoOiBcInNob3J0XCIgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUFBcIjpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7IHdpZHRoOiBcIm1lZGl1bVwiIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlBQUFwiOlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHsgd2lkdGg6IFwibG9uZ1wiIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlBQUFBcIjpcbiAgICBkZWZhdWx0OlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHsgd2lkdGg6IFwiZnVsbFwiIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gZGF0ZVRpbWVGb3JtYXRcbiAgICAucmVwbGFjZShcInt7ZGF0ZX19XCIsIGRhdGVMb25nRm9ybWF0dGVyKGRhdGVQYXR0ZXJuLCBmb3JtYXRMb25nKSlcbiAgICAucmVwbGFjZShcInt7dGltZX19XCIsIHRpbWVMb25nRm9ybWF0dGVyKHRpbWVQYXR0ZXJuLCBmb3JtYXRMb25nKSk7XG59O1xuXG5leHBvcnQgY29uc3QgbG9uZ0Zvcm1hdHRlcnMgPSB7XG4gIHA6IHRpbWVMb25nRm9ybWF0dGVyLFxuICBQOiBkYXRlVGltZUxvbmdGb3JtYXR0ZXIsXG59O1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4uL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCB1dGNEYXRlID0gbmV3IERhdGUoXG4gICAgRGF0ZS5VVEMoXG4gICAgICBfZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgX2RhdGUuZ2V0TW9udGgoKSxcbiAgICAgIF9kYXRlLmdldERhdGUoKSxcbiAgICAgIF9kYXRlLmdldEhvdXJzKCksXG4gICAgICBfZGF0ZS5nZXRNaW51dGVzKCksXG4gICAgICBfZGF0ZS5nZXRTZWNvbmRzKCksXG4gICAgICBfZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSxcbiAgICApLFxuICApO1xuICB1dGNEYXRlLnNldFVUQ0Z1bGxZZWFyKF9kYXRlLmdldEZ1bGxZZWFyKCkpO1xuICByZXR1cm4gK2RhdGUgLSArdXRjRGF0ZTtcbn1cbiIsImNvbnN0IGRheU9mWWVhclRva2VuUkUgPSAvXkQrJC87XG5jb25zdCB3ZWVrWWVhclRva2VuUkUgPSAvXlkrJC87XG5cbmNvbnN0IHRocm93VG9rZW5zID0gW1wiRFwiLCBcIkREXCIsIFwiWVlcIiwgXCJZWVlZXCJdO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbih0b2tlbikge1xuICByZXR1cm4gZGF5T2ZZZWFyVG9rZW5SRS50ZXN0KHRva2VuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbih0b2tlbikge1xuICByZXR1cm4gd2Vla1llYXJUb2tlblJFLnRlc3QodG9rZW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2Fybk9yVGhyb3dQcm90ZWN0ZWRFcnJvcih0b2tlbiwgZm9ybWF0LCBpbnB1dCkge1xuICBjb25zdCBfbWVzc2FnZSA9IG1lc3NhZ2UodG9rZW4sIGZvcm1hdCwgaW5wdXQpO1xuICBjb25zb2xlLndhcm4oX21lc3NhZ2UpO1xuICBpZiAodGhyb3dUb2tlbnMuaW5jbHVkZXModG9rZW4pKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcihfbWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIG1lc3NhZ2UodG9rZW4sIGZvcm1hdCwgaW5wdXQpIHtcbiAgY29uc3Qgc3ViamVjdCA9IHRva2VuWzBdID09PSBcIllcIiA/IFwieWVhcnNcIiA6IFwiZGF5cyBvZiB0aGUgbW9udGhcIjtcbiAgcmV0dXJuIGBVc2UgXFxgJHt0b2tlbi50b0xvd2VyQ2FzZSgpfVxcYCBpbnN0ZWFkIG9mIFxcYCR7dG9rZW59XFxgIChpbiBcXGAke2Zvcm1hdH1cXGApIGZvciBmb3JtYXR0aW5nICR7c3ViamVjdH0gdG8gdGhlIGlucHV0IFxcYCR7aW5wdXR9XFxgOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRgO1xufVxuIiwiLyoqXG4gKiBAbW9kdWxlIGNvbnN0YW50c1xuICogQHN1bW1hcnkgVXNlZnVsIGNvbnN0YW50c1xuICogQGRlc2NyaXB0aW9uXG4gKiBDb2xsZWN0aW9uIG9mIHVzZWZ1bCBkYXRlIGNvbnN0YW50cy5cbiAqXG4gKiBUaGUgY29uc3RhbnRzIGNvdWxkIGJlIGltcG9ydGVkIGZyb20gYGRhdGUtZm5zL2NvbnN0YW50c2A6XG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IG1heFRpbWUsIG1pblRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogZnVuY3Rpb24gaXNBbGxvd2VkVGltZSh0aW1lKSB7XG4gKiAgIHJldHVybiB0aW1lIDw9IG1heFRpbWUgJiYgdGltZSA+PSBtaW5UaW1lO1xuICogfVxuICogYGBgXG4gKi9cblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIGRheXNJbldlZWtcbiAqIEBzdW1tYXJ5IERheXMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3QgZGF5c0luV2VlayA9IDc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBkYXlzSW5ZZWFyXG4gKiBAc3VtbWFyeSBEYXlzIGluIDEgeWVhci5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEhvdyBtYW55IGRheXMgaW4gYSB5ZWFyLlxuICpcbiAqIE9uZSB5ZWFycyBlcXVhbHMgMzY1LjI0MjUgZGF5cyBhY2NvcmRpbmcgdG8gdGhlIGZvcm11bGE6XG4gKlxuICogPiBMZWFwIHllYXIgb2NjdXJlcyBldmVyeSA0IHllYXJzLCBleGNlcHQgZm9yIHllYXJzIHRoYXQgYXJlIGRpdmlzYWJsZSBieSAxMDAgYW5kIG5vdCBkaXZpc2FibGUgYnkgNDAwLlxuICogPiAxIG1lYW4geWVhciA9ICgzNjUrMS80LTEvMTAwKzEvNDAwKSBkYXlzID0gMzY1LjI0MjUgZGF5c1xuICovXG5leHBvcnQgY29uc3QgZGF5c0luWWVhciA9IDM2NS4yNDI1O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWF4VGltZVxuICogQHN1bW1hcnkgTWF4aW11bSBhbGxvd2VkIHRpbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IG1heFRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogY29uc3QgaXNWYWxpZCA9IDg2NDAwMDAwMDAwMDAwMDEgPD0gbWF4VGltZTtcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBuZXcgRGF0ZSg4NjQwMDAwMDAwMDAwMDAxKTtcbiAqIC8vPT4gSW52YWxpZCBEYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtYXhUaW1lID0gTWF0aC5wb3coMTAsIDgpICogMjQgKiA2MCAqIDYwICogMTAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pblRpbWVcbiAqIEBzdW1tYXJ5IE1pbmltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBtaW5UaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGNvbnN0IGlzVmFsaWQgPSAtODY0MDAwMDAwMDAwMDAwMSA+PSBtaW5UaW1lO1xuICogLy89PiBmYWxzZVxuICpcbiAqIG5ldyBEYXRlKC04NjQwMDAwMDAwMDAwMDAxKVxuICogLy89PiBJbnZhbGlkIERhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pblRpbWUgPSAtbWF4VGltZTtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luV2Vla1xuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgd2Vlay5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luV2VlayA9IDYwNDgwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luRGF5XG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBkYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbkRheSA9IDg2NDAwMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5NaW51dGVcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIG1pbnV0ZVxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5NaW51dGUgPSA2MDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luSG91clxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgaG91clxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5Ib3VyID0gMzYwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luU2Vjb25kXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBzZWNvbmRcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luU2Vjb25kID0gMTAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJblllYXJcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSB5ZWFyLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luWWVhciA9IDUyNTYwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbk1vbnRoXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgbW9udGguXG4gKi9cbmV4cG9ydCBjb25zdCBtaW51dGVzSW5Nb250aCA9IDQzMjAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWludXRlc0luRGF5XG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luRGF5ID0gMTQ0MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbkhvdXJcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSBob3VyLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luSG91ciA9IDYwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbW9udGhzSW5RdWFydGVyXG4gKiBAc3VtbWFyeSBNb250aHMgaW4gMSBxdWFydGVyLlxuICovXG5leHBvcnQgY29uc3QgbW9udGhzSW5RdWFydGVyID0gMztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1vbnRoc0luWWVhclxuICogQHN1bW1hcnkgTW9udGhzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vbnRoc0luWWVhciA9IDEyO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgcXVhcnRlcnNJblllYXJcbiAqIEBzdW1tYXJ5IFF1YXJ0ZXJzIGluIDEgeWVhclxuICovXG5leHBvcnQgY29uc3QgcXVhcnRlcnNJblllYXIgPSA0O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luSG91clxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIGhvdXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbk1pbnV0ZVxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIG1pbnV0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbk1pbnV0ZSA9IDYwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luRGF5XG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luRGF5ID0gc2Vjb25kc0luSG91ciAqIDI0O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luV2Vla1xuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIHdlZWsuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5XZWVrID0gc2Vjb25kc0luRGF5ICogNztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJblllYXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSB5ZWFyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luWWVhciA9IHNlY29uZHNJbkRheSAqIGRheXNJblllYXI7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5Nb250aFxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIG1vbnRoXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5Nb250aCA9IHNlY29uZHNJblllYXIgLyAxMjtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJblF1YXJ0ZXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBxdWFydGVyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luUXVhcnRlciA9IHNlY29uZHNJbk1vbnRoICogMztcbiIsIi8qKlxuICogQG5hbWUgY29uc3RydWN0RnJvbVxuICogQGNhdGVnb3J5IEdlbmVyaWMgSGVscGVyc1xuICogQHN1bW1hcnkgQ29uc3RydWN0cyBhIGRhdGUgdXNpbmcgdGhlIHJlZmVyZW5jZSBkYXRlIGFuZCB0aGUgdmFsdWVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBmdW5jdGlvbiBjb25zdHJ1Y3RzIGEgbmV3IGRhdGUgdXNpbmcgdGhlIGNvbnN0cnVjdG9yIGZyb20gdGhlIHJlZmVyZW5jZVxuICogZGF0ZSBhbmQgdGhlIGdpdmVuIHZhbHVlLiBJdCBoZWxwcyB0byBidWlsZCBnZW5lcmljIGZ1bmN0aW9ucyB0aGF0IGFjY2VwdFxuICogZGF0ZSBleHRlbnNpb25zLlxuICpcbiAqIEl0IGRlZmF1bHRzIHRvIGBEYXRlYCBpZiB0aGUgcGFzc2VkIHJlZmVyZW5jZSBkYXRlIGlzIGEgbnVtYmVyIG9yIGEgc3RyaW5nLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIHJlZmVyZW5jZSBkYXRlIHRvIHRha2UgY29uc3RydWN0b3IgZnJvbVxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNyZWF0ZSB0aGUgZGF0ZVxuICpcbiAqIEByZXR1cm5zIERhdGUgaW5pdGlhbGl6ZWQgdXNpbmcgdGhlIGdpdmVuIGRhdGUgYW5kIHZhbHVlXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tICdkYXRlLWZucydcbiAqXG4gKiAvLyBBIGZ1bmN0aW9uIHRoYXQgY2xvbmVzIGEgZGF0ZSBwcmVzZXJ2aW5nIHRoZSBvcmlnaW5hbCB0eXBlXG4gKiBmdW5jdGlvbiBjbG9uZURhdGU8RGF0ZVR5cGUgZXh0ZW5kcyBEYXRlKGRhdGU6IERhdGVUeXBlKTogRGF0ZVR5cGUge1xuICogICByZXR1cm4gY29uc3RydWN0RnJvbShcbiAqICAgICBkYXRlLCAvLyBVc2UgY29udHJ1c3RvciBmcm9tIHRoZSBnaXZlbiBkYXRlXG4gKiAgICAgZGF0ZS5nZXRUaW1lKCkgLy8gVXNlIHRoZSBkYXRlIHZhbHVlIHRvIGNyZWF0ZSBhIG5ldyBkYXRlXG4gKiAgIClcbiAqIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdEZyb20oZGF0ZSwgdmFsdWUpIHtcbiAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBkYXRlLmNvbnN0cnVjdG9yKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgY29uc3RydWN0RnJvbTtcbiIsImltcG9ydCB7IG1pbGxpc2Vjb25kc0luRGF5IH0gZnJvbSBcIi4vY29uc3RhbnRzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCIuL3N0YXJ0T2ZEYXkubWpzXCI7XG5pbXBvcnQgeyBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIH0gZnJvbSBcIi4vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1xuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5cyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy4gVGhpcyBtZWFucyB0aGF0IHRoZSB0aW1lcyBhcmUgcmVtb3ZlZFxuICogZnJvbSB0aGUgZGF0ZXMgYW5kIHRoZW4gdGhlIGRpZmZlcmVuY2UgaW4gZGF5cyBpcyBjYWxjdWxhdGVkLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlTGVmdCAtIFRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0gZGF0ZVJpZ2h0IC0gVGhlIGVhcmxpZXIgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5c1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBjYWxlbmRhciBkYXlzIGFyZSBiZXR3ZWVuXG4gKiAvLyAyIEp1bHkgMjAxMSAyMzowMDowMCBhbmQgMiBKdWx5IDIwMTIgMDA6MDA6MDA/XG4gKiBjb25zdCByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXG4gKiAgIG5ldyBEYXRlKDIwMTIsIDYsIDIsIDAsIDApLFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAyLCAyMywgMClcbiAqIClcbiAqIC8vPT4gMzY2XG4gKiAvLyBIb3cgbWFueSBjYWxlbmRhciBkYXlzIGFyZSBiZXR3ZWVuXG4gKiAvLyAyIEp1bHkgMjAxMSAyMzo1OTowMCBhbmQgMyBKdWx5IDIwMTEgMDA6MDE6MDA/XG4gKiBjb25zdCByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDMsIDAsIDEpLFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAyLCAyMywgNTkpXG4gKiApXG4gKiAvLz0+IDFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSB7XG4gIGNvbnN0IHN0YXJ0T2ZEYXlMZWZ0ID0gc3RhcnRPZkRheShkYXRlTGVmdCk7XG4gIGNvbnN0IHN0YXJ0T2ZEYXlSaWdodCA9IHN0YXJ0T2ZEYXkoZGF0ZVJpZ2h0KTtcblxuICBjb25zdCB0aW1lc3RhbXBMZWZ0ID1cbiAgICArc3RhcnRPZkRheUxlZnQgLSBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKHN0YXJ0T2ZEYXlMZWZ0KTtcbiAgY29uc3QgdGltZXN0YW1wUmlnaHQgPVxuICAgICtzdGFydE9mRGF5UmlnaHQgLSBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKHN0YXJ0T2ZEYXlSaWdodCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXIgYmVjYXVzZSB0aGUgbnVtYmVyIG9mXG4gIC8vIG1pbGxpc2Vjb25kcyBpbiBhIGRheSBpcyBub3QgY29uc3RhbnQgKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2ZcbiAgLy8gdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KS5cbiAgcmV0dXJuIE1hdGgucm91bmQoKHRpbWVzdGFtcExlZnQgLSB0aW1lc3RhbXBSaWdodCkgLyBtaWxsaXNlY29uZHNJbkRheSk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzO1xuIiwiaW1wb3J0IHsgZGVmYXVsdExvY2FsZSB9IGZyb20gXCIuL19saWIvZGVmYXVsdExvY2FsZS5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcbmltcG9ydCB7IGZvcm1hdHRlcnMgfSBmcm9tIFwiLi9fbGliL2Zvcm1hdC9mb3JtYXR0ZXJzLm1qc1wiO1xuaW1wb3J0IHsgbG9uZ0Zvcm1hdHRlcnMgfSBmcm9tIFwiLi9fbGliL2Zvcm1hdC9sb25nRm9ybWF0dGVycy5tanNcIjtcbmltcG9ydCB7XG4gIGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4sXG4gIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbixcbiAgd2Fybk9yVGhyb3dQcm90ZWN0ZWRFcnJvcixcbn0gZnJvbSBcIi4vX2xpYi9wcm90ZWN0ZWRUb2tlbnMubWpzXCI7XG5pbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSBcIi4vaXNWYWxpZC5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLy8gUmV4cG9ydHMgb2YgaW50ZXJuYWwgZm9yIGxpYnJhcmllcyB0byB1c2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzYzOCNpc3N1ZWNvbW1lbnQtMTg3NzA4Mjg3NFxuZXhwb3J0IHsgZm9ybWF0dGVycywgbG9uZ0Zvcm1hdHRlcnMgfTtcblxuLy8gVGhpcyBSZWdFeHAgY29uc2lzdHMgb2YgdGhyZWUgcGFydHMgc2VwYXJhdGVkIGJ5IGB8YDpcbi8vIC0gW3lZUXFNTHdJZERlY2loSEtrbXNdbyBtYXRjaGVzIGFueSBhdmFpbGFibGUgb3JkaW5hbCBudW1iZXIgdG9rZW5cbi8vICAgKG9uZSBvZiB0aGUgY2VydGFpbiBsZXR0ZXJzIGZvbGxvd2VkIGJ5IGBvYClcbi8vIC0gKFxcdylcXDEqIG1hdGNoZXMgYW55IHNlcXVlbmNlcyBvZiB0aGUgc2FtZSBsZXR0ZXJcbi8vIC0gJycgbWF0Y2hlcyB0d28gcXVvdGUgY2hhcmFjdGVycyBpbiBhIHJvd1xuLy8gLSAnKCcnfFteJ10pKygnfCQpIG1hdGNoZXMgYW55dGhpbmcgc3Vycm91bmRlZCBieSB0d28gcXVvdGUgY2hhcmFjdGVycyAoJyksXG4vLyAgIGV4Y2VwdCBhIHNpbmdsZSBxdW90ZSBzeW1ib2wsIHdoaWNoIGVuZHMgdGhlIHNlcXVlbmNlLlxuLy8gICBUd28gcXVvdGUgY2hhcmFjdGVycyBkbyBub3QgZW5kIHRoZSBzZXF1ZW5jZS5cbi8vICAgSWYgdGhlcmUgaXMgbm8gbWF0Y2hpbmcgc2luZ2xlIHF1b3RlXG4vLyAgIHRoZW4gdGhlIHNlcXVlbmNlIHdpbGwgY29udGludWUgdW50aWwgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLlxuLy8gLSAuIG1hdGNoZXMgYW55IHNpbmdsZSBjaGFyYWN0ZXIgdW5tYXRjaGVkIGJ5IHByZXZpb3VzIHBhcnRzIG9mIHRoZSBSZWdFeHBzXG5jb25zdCBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwID1cbiAgL1t5WVFxTUx3SWREZWNpaEhLa21zXW98KFxcdylcXDEqfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG4vLyBUaGlzIFJlZ0V4cCBjYXRjaGVzIHN5bWJvbHMgZXNjYXBlZCBieSBxdW90ZXMsIGFuZCBhbHNvXG4vLyBzZXF1ZW5jZXMgb2Ygc3ltYm9scyBQLCBwLCBhbmQgdGhlIGNvbWJpbmF0aW9ucyBsaWtlIGBQUFBQUFBQcHBwcHBgXG5jb25zdCBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC9QK3ArfFArfHArfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG5jb25zdCBlc2NhcGVkU3RyaW5nUmVnRXhwID0gL14nKFteXSo/KSc/JC87XG5jb25zdCBkb3VibGVRdW90ZVJlZ0V4cCA9IC8nJy9nO1xuY29uc3QgdW5lc2NhcGVkTGF0aW5DaGFyYWN0ZXJSZWdFeHAgPSAvW2EtekEtWl0vO1xuXG5leHBvcnQgeyBmb3JtYXQgYXMgZm9ybWF0RGF0ZSB9O1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZm9ybWF0fSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZm9ybWF0XG4gKiBAYWxpYXMgZm9ybWF0RGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBGb3JtYXQgdGhlIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiB0aGUgZ2l2ZW4gZm9ybWF0LiBUaGUgcmVzdWx0IG1heSB2YXJ5IGJ5IGxvY2FsZS5cbiAqXG4gKiA+IOKaoO+4jyBQbGVhc2Ugbm90ZSB0aGF0IHRoZSBgZm9ybWF0YCB0b2tlbnMgZGlmZmVyIGZyb20gTW9tZW50LmpzIGFuZCBvdGhlciBsaWJyYXJpZXMuXG4gKiA+IFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIFRoZSBjaGFyYWN0ZXJzIHdyYXBwZWQgYmV0d2VlbiB0d28gc2luZ2xlIHF1b3RlcyBjaGFyYWN0ZXJzICgnKSBhcmUgZXNjYXBlZC5cbiAqIFR3byBzaW5nbGUgcXVvdGVzIGluIGEgcm93LCB3aGV0aGVyIGluc2lkZSBvciBvdXRzaWRlIGEgcXVvdGVkIHNlcXVlbmNlLCByZXByZXNlbnQgYSAncmVhbCcgc2luZ2xlIHF1b3RlLlxuICogKHNlZSB0aGUgbGFzdCBleGFtcGxlKVxuICpcbiAqIEZvcm1hdCBvZiB0aGUgc3RyaW5nIGlzIGJhc2VkIG9uIFVuaWNvZGUgVGVjaG5pY2FsIFN0YW5kYXJkICMzNTpcbiAqIGh0dHBzOi8vd3d3LnVuaWNvZGUub3JnL3JlcG9ydHMvdHIzNS90cjM1LWRhdGVzLmh0bWwjRGF0ZV9GaWVsZF9TeW1ib2xfVGFibGVcbiAqIHdpdGggYSBmZXcgYWRkaXRpb25zIChzZWUgbm90ZSA3IGJlbG93IHRoZSB0YWJsZSkuXG4gKlxuICogQWNjZXB0ZWQgcGF0dGVybnM6XG4gKiB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQYXR0ZXJuIHwgUmVzdWx0IGV4YW1wbGVzICAgICAgICAgICAgICAgICAgIHwgTm90ZXMgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLXxcbiAqIHwgRXJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEcuLkdHRyAgfCBBRCwgQkMgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHICAgIHwgQW5ubyBEb21pbmksIEJlZm9yZSBDaHJpc3QgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgR0dHR0cgICB8IEEsIEIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgQ2FsZW5kYXIgeWVhciAgICAgICAgICAgICAgICAgICB8IHkgICAgICAgfCA0NCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5byAgICAgIHwgNDR0aCwgMXN0LCAwdGgsIDE3dGggICAgICAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXkgICAgICB8IDQ0LCAwMSwgMDAsIDE3ICAgICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eSAgICAgfCAwNDQsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXl5ICAgIHwgMDA0NCwgMDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5eXkgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciAgICAgICB8IFkgICAgICAgfCA0NCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZbyAgICAgIHwgNDR0aCwgMXN0LCAxOTAwdGgsIDIwMTd0aCAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVkgICAgICB8IDQ0LCAwMSwgMDAsIDE3ICAgICAgICAgICAgICAgICAgICB8IDUsOCAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWSAgICAgfCAwNDQsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZICAgIHwgMDA0NCwgMDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgIHwgNSw4ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZWVkgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICAgICB8IFIgICAgICAgfCAtNDMsIDAsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUiAgICAgIHwgLTQzLCAwMCwgMDEsIDE5MDAsIDIwMTcgICAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSICAgICB8IC0wNDMsIDAwMCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUlIgICAgfCAtMDA0MywgMDAwMCwgMDAwMSwgMTkwMCwgMjAxNyAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlJSUiAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1LDcgfFxuICogfCBFeHRlbmRlZCB5ZWFyICAgICAgICAgICAgICAgICAgIHwgdSAgICAgICB8IC00MywgMCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1ICAgICAgfCAtNDMsIDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXUgICAgIHwgLTA0MywgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1dSAgICB8IC0wMDQzLCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dXV1ICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUgICB8XG4gKiB8IFF1YXJ0ZXIgKGZvcm1hdHRpbmcpICAgICAgICAgICAgfCBRICAgICAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUW8gICAgICB8IDFzdCwgMm5kLCAzcmQsIDR0aCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRICAgICAgfCAwMSwgMDIsIDAzLCAwNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVEgICAgIHwgUTEsIFEyLCBRMywgUTQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRUSAgICB8IDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUVFRICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCA0ICAgICB8XG4gKiB8IFF1YXJ0ZXIgKHN0YW5kLWFsb25lKSAgICAgICAgICAgfCBxICAgICAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcW8gICAgICB8IDFzdCwgMm5kLCAzcmQsIDR0aCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxICAgICAgfCAwMSwgMDIsIDAzLCAwNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXEgICAgIHwgUTEsIFEyLCBRMywgUTQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxcSAgICB8IDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcXFxICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCA0ICAgICB8XG4gKiB8IE1vbnRoIChmb3JtYXR0aW5nKSAgICAgICAgICAgICAgfCBNICAgICAgIHwgMSwgMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTW8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NICAgICAgfCAwMSwgMDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU0gICAgIHwgSmFuLCBGZWIsIC4uLiwgRGVjICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NTSAgICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTU1NICAgfCBKLCBGLCAuLi4sIEQgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IE1vbnRoIChzdGFuZC1hbG9uZSkgICAgICAgICAgICAgfCBMICAgICAgIHwgMSwgMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMICAgICAgfCAwMSwgMDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTEwgICAgIHwgSmFuLCBGZWIsIC4uLiwgRGVjICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMTCAgICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTExMICAgfCBKLCBGLCAuLi4sIEQgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IExvY2FsIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgfCB3ICAgICAgIHwgMSwgMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgd28gICAgICB8IDFzdCwgMm5kLCAuLi4sIDUzdGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHd3ICAgICAgfCAwMSwgMDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IElTTyB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgICAgfCBJICAgICAgIHwgMSwgMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSW8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDUzdGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IElJICAgICAgfCAwMSwgMDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICAgfCBkICAgICAgIHwgMSwgMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDMxc3QgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGRkICAgICAgfCAwMSwgMDIsIC4uLiwgMzEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IERheSBvZiB5ZWFyICAgICAgICAgICAgICAgICAgICAgfCBEICAgICAgIHwgMSwgMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgICAgIHwgOSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDM2NXRoLCAzNjZ0aCAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEREICAgICAgfCAwMSwgMDIsIC4uLiwgMzY1LCAzNjYgICAgICAgICAgICAgfCA5ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREQgICAgIHwgMDAxLCAwMDIsIC4uLiwgMzY1LCAzNjYgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRERERCAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMgICAgIHxcbiAqIHwgRGF5IG9mIHdlZWsgKGZvcm1hdHRpbmcpICAgICAgICB8IEUuLkVFRSAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRUUgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUVFRSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCAgICAgICB8XG4gKiB8IElTTyBkYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgICAgfCBpICAgICAgIHwgMSwgMiwgMywgLi4uLCA3ICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaW8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDd0aCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpICAgICAgfCAwMSwgMDIsIC4uLiwgMDcgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWkgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWlpICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpaWkgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgNyAgICAgfFxuICogfCBMb2NhbCBkYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgIHwgZSAgICAgICB8IDIsIDMsIDQsIC4uLiwgMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVvICAgICAgfCAybmQsIDNyZCwgLi4uLCAxc3QgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZSAgICAgIHwgMDIsIDAzLCAuLi4sIDAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWUgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlZSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZWVlICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgTG9jYWwgZGF5IG9mIHdlZWsgKHN0YW5kLWFsb25lKSB8IGMgICAgICAgfCAyLCAzLCA0LCAuLi4sIDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjbyAgICAgIHwgMm5kLCAzcmQsIC4uLiwgMXN0ICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2MgICAgICB8IDAyLCAwMywgLi4uLCAwMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjYyAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjY2MgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2NjYyAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCAgICAgICB8XG4gKiB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhLi5hYSAgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhICAgICB8IGFtLCBwbSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYWEgICAgfCBhLm0uLCBwLm0uICAgICAgICAgICAgICAgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWFhYSAgIHwgYSwgcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBBTSwgUE0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgIHwgYi4uYmIgICB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYiAgICAgfCBhbSwgcG0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmJiICAgIHwgYS5tLiwgcC5tLiwgbm9vbiwgbWlkbmlnaHQgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiYmIgICB8IGEsIHAsIG4sIG1pICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRmxleGlibGUgZGF5IHBlcmlvZCAgICAgICAgICAgICB8IEIuLkJCQiAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBCQkJCICAgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgQkJCQkIgICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMS0xMl0gICAgICAgICAgICAgICAgICAgICB8IGggICAgICAgfCAxLCAyLCAuLi4sIDExLCAxMiAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBobyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTF0aCwgMTJ0aCAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaGggICAgICB8IDAxLCAwMiwgLi4uLCAxMSwgMTIgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMC0yM10gICAgICAgICAgICAgICAgICAgICB8IEggICAgICAgfCAwLCAxLCAyLCAuLi4sIDIzICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBIbyAgICAgIHwgMHRoLCAxc3QsIDJuZCwgLi4uLCAyM3JkICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSEggICAgICB8IDAwLCAwMSwgMDIsIC4uLiwgMjMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMC0xMV0gICAgICAgICAgICAgICAgICAgICB8IEsgICAgICAgfCAxLCAyLCAuLi4sIDExLCAwICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBLbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTF0aCwgMHRoICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgS0sgICAgICB8IDAxLCAwMiwgLi4uLCAxMSwgMDAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMS0yNF0gICAgICAgICAgICAgICAgICAgICB8IGsgICAgICAgfCAyNCwgMSwgMiwgLi4uLCAyMyAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBrbyAgICAgIHwgMjR0aCwgMXN0LCAybmQsIC4uLiwgMjNyZCAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwga2sgICAgICB8IDI0LCAwMSwgMDIsIC4uLiwgMjMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTWludXRlICAgICAgICAgICAgICAgICAgICAgICAgICB8IG0gICAgICAgfCAwLCAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbyAgICAgIHwgMHRoLCAxc3QsIC4uLiwgNTl0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbW0gICAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgICAgICAgICB8IHMgICAgICAgfCAwLCAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzbyAgICAgIHwgMHRoLCAxc3QsIC4uLiwgNTl0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgc3MgICAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRnJhY3Rpb24gb2Ygc2Vjb25kICAgICAgICAgICAgICB8IFMgICAgICAgfCAwLCAxLCAuLi4sIDkgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTUyAgICAgIHwgMDAsIDAxLCAuLi4sIDk5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1NTICAgICB8IDAwMCwgMDAxLCAuLi4sIDk5OSAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTU1MgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzICAgICB8XG4gKiB8IFRpbWV6b25lIChJU08tODYwMSB3LyBaKSAgICAgICAgfCBYICAgICAgIHwgLTA4LCArMDUzMCwgWiAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFggICAgICB8IC0wODAwLCArMDUzMCwgWiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWCAgICAgfCAtMDg6MDAsICswNTozMCwgWiAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFhYICAgIHwgLTA4MDAsICswNTMwLCBaLCArMTIzNDU2ICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYWFggICB8IC0wODowMCwgKzA1OjMwLCBaLCArMTI6MzQ6NTYgICAgICB8ICAgICAgIHxcbiAqIHwgVGltZXpvbmUgKElTTy04NjAxIHcvbyBaKSAgICAgICB8IHggICAgICAgfCAtMDgsICswNTMwLCArMDAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eCAgICAgIHwgLTA4MDAsICswNTMwLCArMDAwMCAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4ICAgICB8IC0wODowMCwgKzA1OjMwLCArMDA6MDAgICAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eHggICAgfCAtMDgwMCwgKzA1MzAsICswMDAwLCArMTIzNDU2ICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHh4eCAgIHwgLTA4OjAwLCArMDU6MzAsICswMDowMCwgKzEyOjM0OjU2IHwgICAgICAgfFxuICogfCBUaW1lem9uZSAoR01UKSAgICAgICAgICAgICAgICAgIHwgTy4uLk9PTyB8IEdNVC04LCBHTVQrNTozMCwgR01UKzAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE9PT08gICAgfCBHTVQtMDg6MDAsIEdNVCswNTozMCwgR01UKzAwOjAwICAgfCAyICAgICB8XG4gKiB8IFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXQuKSAgfCB6Li4uenp6IHwgR01ULTgsIEdNVCs1OjMwLCBHTVQrMCAgICAgICAgICAgIHwgNiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgenp6eiAgICB8IEdNVC0wODowMCwgR01UKzA1OjMwLCBHTVQrMDA6MDAgICB8IDIsNiAgIHxcbiAqIHwgU2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgICAgICB8IHQgICAgICAgfCA1MTI5Njk1MjAgICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB0dCAgICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw3ICAgfFxuICogfCBNaWxsaXNlY29uZHMgdGltZXN0YW1wICAgICAgICAgIHwgVCAgICAgICB8IDUxMjk2OTUyMDkwMCAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFRUICAgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDcgICB8XG4gKiB8IExvbmcgbG9jYWxpemVkIGRhdGUgICAgICAgICAgICAgfCBQICAgICAgIHwgMDQvMjkvMTQ1MyAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFAgICAgICB8IEFwciAyOSwgMTQ1MyAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUCAgICAgfCBBcHJpbCAyOXRoLCAxNDUzICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBQICAgIHwgRnJpZGF5LCBBcHJpbCAyOXRoLCAxNDUzICAgICAgICAgIHwgMiw3ICAgfFxuICogfCBMb25nIGxvY2FsaXplZCB0aW1lICAgICAgICAgICAgIHwgcCAgICAgICB8IDEyOjAwIEFNICAgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwICAgICAgfCAxMjowMDowMCBBTSAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcHAgICAgIHwgMTI6MDA6MDAgQU0gR01UKzIgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHBwcCAgICB8IDEyOjAwOjAwIEFNIEdNVCswMjowMCAgICAgICAgICAgICB8IDIsNyAgIHxcbiAqIHwgQ29tYmluYXRpb24gb2YgZGF0ZSBhbmQgdGltZSAgICB8IFBwICAgICAgfCAwNC8yOS8xNDUzLCAxMjowMCBBTSAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUHBwICAgIHwgQXByIDI5LCAxNDUzLCAxMjowMDowMCBBTSAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQcHBwICB8IEFwcmlsIDI5dGgsIDE0NTMgYXQgLi4uICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUFBwcHBwfCBGcmlkYXksIEFwcmlsIDI5dGgsIDE0NTMgYXQgLi4uICAgfCAyLDcgICB8XG4gKiBOb3RlczpcbiAqIDEuIFwiRm9ybWF0dGluZ1wiIHVuaXRzIChlLmcuIGZvcm1hdHRpbmcgcXVhcnRlcikgaW4gdGhlIGRlZmF1bHQgZW4tVVMgbG9jYWxlXG4gKiAgICBhcmUgdGhlIHNhbWUgYXMgXCJzdGFuZC1hbG9uZVwiIHVuaXRzLCBidXQgYXJlIGRpZmZlcmVudCBpbiBzb21lIGxhbmd1YWdlcy5cbiAqICAgIFwiRm9ybWF0dGluZ1wiIHVuaXRzIGFyZSBkZWNsaW5lZCBhY2NvcmRpbmcgdG8gdGhlIHJ1bGVzIG9mIHRoZSBsYW5ndWFnZVxuICogICAgaW4gdGhlIGNvbnRleHQgb2YgYSBkYXRlLiBcIlN0YW5kLWFsb25lXCIgdW5pdHMgYXJlIGFsd2F5cyBub21pbmF0aXZlIHNpbmd1bGFyOlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnZG8gTExMTCcsIHtsb2NhbGU6IGNzfSkgLy89PiAnNi4gbGlzdG9wYWQnYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnZG8gTU1NTScsIHtsb2NhbGU6IGNzfSkgLy89PiAnNi4gbGlzdG9wYWR1J2BcbiAqXG4gKiAyLiBBbnkgc2VxdWVuY2Ugb2YgdGhlIGlkZW50aWNhbCBsZXR0ZXJzIGlzIGEgcGF0dGVybiwgdW5sZXNzIGl0IGlzIGVzY2FwZWQgYnlcbiAqICAgIHRoZSBzaW5nbGUgcXVvdGUgY2hhcmFjdGVycyAoc2VlIGJlbG93KS5cbiAqICAgIElmIHRoZSBzZXF1ZW5jZSBpcyBsb25nZXIgdGhhbiBsaXN0ZWQgaW4gdGFibGUgKGUuZy4gYEVFRUVFRUVFRUVFYClcbiAqICAgIHRoZSBvdXRwdXQgd2lsbCBiZSB0aGUgc2FtZSBhcyBkZWZhdWx0IHBhdHRlcm4gZm9yIHRoaXMgdW5pdCwgdXN1YWxseVxuICogICAgdGhlIGxvbmdlc3Qgb25lIChpbiBjYXNlIG9mIElTTyB3ZWVrZGF5cywgYEVFRUVgKS4gRGVmYXVsdCBwYXR0ZXJucyBmb3IgdW5pdHNcbiAqICAgIGFyZSBtYXJrZWQgd2l0aCBcIjJcIiBpbiB0aGUgbGFzdCBjb2x1bW4gb2YgdGhlIHRhYmxlLlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NJykgLy89PiAnTm92J2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTScpIC8vPT4gJ04nYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAzLiBTb21lIHBhdHRlcm5zIGNvdWxkIGJlIHVubGltaXRlZCBsZW5ndGggKHN1Y2ggYXMgYHl5eXl5eXl5YCkuXG4gKiAgICBUaGUgb3V0cHV0IHdpbGwgYmUgcGFkZGVkIHdpdGggemVyb3MgdG8gbWF0Y2ggdGhlIGxlbmd0aCBvZiB0aGUgcGF0dGVybi5cbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ3l5eXl5eXl5JykgLy89PiAnMDAwMDIwMTcnYFxuICpcbiAqIDQuIGBRUVFRUWAgYW5kIGBxcXFxcWAgY291bGQgYmUgbm90IHN0cmljdGx5IG51bWVyaWNhbCBpbiBzb21lIGxvY2FsZXMuXG4gKiAgICBUaGVzZSB0b2tlbnMgcmVwcmVzZW50IHRoZSBzaG9ydGVzdCBmb3JtIG9mIHRoZSBxdWFydGVyLlxuICpcbiAqIDUuIFRoZSBtYWluIGRpZmZlcmVuY2UgYmV0d2VlbiBgeWAgYW5kIGB1YCBwYXR0ZXJucyBhcmUgQi5DLiB5ZWFyczpcbiAqXG4gKiAgICB8IFllYXIgfCBgeWAgfCBgdWAgfFxuICogICAgfC0tLS0tLXwtLS0tLXwtLS0tLXxcbiAqICAgIHwgQUMgMSB8ICAgMSB8ICAgMSB8XG4gKiAgICB8IEJDIDEgfCAgIDEgfCAgIDAgfFxuICogICAgfCBCQyAyIHwgICAyIHwgIC0xIHxcbiAqXG4gKiAgICBBbHNvIGB5eWAgYWx3YXlzIHJldHVybnMgdGhlIGxhc3QgdHdvIGRpZ2l0cyBvZiBhIHllYXIsXG4gKiAgICB3aGlsZSBgdXVgIHBhZHMgc2luZ2xlIGRpZ2l0IHllYXJzIHRvIDIgY2hhcmFjdGVycyBhbmQgcmV0dXJucyBvdGhlciB5ZWFycyB1bmNoYW5nZWQ6XG4gKlxuICogICAgfCBZZWFyIHwgYHl5YCB8IGB1dWAgfFxuICogICAgfC0tLS0tLXwtLS0tLS18LS0tLS0tfFxuICogICAgfCAxICAgIHwgICAwMSB8ICAgMDEgfFxuICogICAgfCAxNCAgIHwgICAxNCB8ICAgMTQgfFxuICogICAgfCAzNzYgIHwgICA3NiB8ICAzNzYgfFxuICogICAgfCAxNDUzIHwgICA1MyB8IDE0NTMgfFxuICpcbiAqICAgIFRoZSBzYW1lIGRpZmZlcmVuY2UgaXMgdHJ1ZSBmb3IgbG9jYWwgYW5kIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyAoYFlgIGFuZCBgUmApLFxuICogICAgZXhjZXB0IGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXJzIGFyZSBkZXBlbmRlbnQgb24gYG9wdGlvbnMud2Vla1N0YXJ0c09uYFxuICogICAgYW5kIGBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZWAgKGNvbXBhcmUgW2dldElTT1dlZWtZZWFyXShodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL2dldElTT1dlZWtZZWFyKVxuICogICAgYW5kIFtnZXRXZWVrWWVhcl0oaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9nZXRXZWVrWWVhcikpLlxuICpcbiAqIDYuIFNwZWNpZmljIG5vbi1sb2NhdGlvbiB0aW1lem9uZXMgYXJlIGN1cnJlbnRseSB1bmF2YWlsYWJsZSBpbiBgZGF0ZS1mbnNgLFxuICogICAgc28gcmlnaHQgbm93IHRoZXNlIHRva2VucyBmYWxsIGJhY2sgdG8gR01UIHRpbWV6b25lcy5cbiAqXG4gKiA3LiBUaGVzZSBwYXR0ZXJucyBhcmUgbm90IGluIHRoZSBVbmljb2RlIFRlY2huaWNhbCBTdGFuZGFyZCAjMzU6XG4gKiAgICAtIGBpYDogSVNPIGRheSBvZiB3ZWVrXG4gKiAgICAtIGBJYDogSVNPIHdlZWsgb2YgeWVhclxuICogICAgLSBgUmA6IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKiAgICAtIGB0YDogc2Vjb25kcyB0aW1lc3RhbXBcbiAqICAgIC0gYFRgOiBtaWxsaXNlY29uZHMgdGltZXN0YW1wXG4gKiAgICAtIGBvYDogb3JkaW5hbCBudW1iZXIgbW9kaWZpZXJcbiAqICAgIC0gYFBgOiBsb25nIGxvY2FsaXplZCBkYXRlXG4gKiAgICAtIGBwYDogbG9uZyBsb2NhbGl6ZWQgdGltZVxuICpcbiAqIDguIGBZWWAgYW5kIGBZWVlZYCB0b2tlbnMgcmVwcmVzZW50IHdlZWstbnVtYmVyaW5nIHllYXJzIGJ1dCB0aGV5IGFyZSBvZnRlbiBjb25mdXNlZCB3aXRoIHllYXJzLlxuICogICAgWW91IHNob3VsZCBlbmFibGUgYG9wdGlvbnMudXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zYCB0byB1c2UgdGhlbS4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogOS4gYERgIGFuZCBgRERgIHRva2VucyByZXByZXNlbnQgZGF5cyBvZiB0aGUgeWVhciBidXQgdGhleSBhcmUgb2Z0ZW4gY29uZnVzZWQgd2l0aCBkYXlzIG9mIHRoZSBtb250aC5cbiAqICAgIFlvdSBzaG91bGQgZW5hYmxlIGBvcHRpb25zLnVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnNgIHRvIHVzZSB0aGVtLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0gZm9ybWF0IC0gVGhlIHN0cmluZyBvZiB0b2tlbnNcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqXG4gKiBAdGhyb3dzIGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3MgYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGxvY2FsaXplYCBwcm9wZXJ0eVxuICogQHRocm93cyBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0TG9uZ2AgcHJvcGVydHlcbiAqIEB0aHJvd3MgdXNlIGB5eXl5YCBpbnN0ZWFkIG9mIGBZWVlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHVzZSBgeXlgIGluc3RlYWQgb2YgYFlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHVzZSBgZGAgaW5zdGVhZCBvZiBgRGAgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB1c2UgYGRkYCBpbnN0ZWFkIG9mIGBERGAgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyBmb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDExIEZlYnJ1YXJ5IDIwMTQgaW4gbWlkZGxlLWVuZGlhbiBmb3JtYXQ6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgMSwgMTEpLCAnTU0vZGQveXl5eScpXG4gKiAvLz0+ICcwMi8xMS8yMDE0J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMiBKdWx5IDIwMTQgaW4gRXNwZXJhbnRvOlxuICogaW1wb3J0IHsgZW9Mb2NhbGUgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUvZW8nXG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgNiwgMiksIFwiZG8gJ2RlJyBNTU1NIHl5eXlcIiwge1xuICogICBsb2NhbGU6IGVvTG9jYWxlXG4gKiB9KVxuICogLy89PiAnMi1hIGRlIGp1bGlvIDIwMTQnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEVzY2FwZSBzdHJpbmcgYnkgc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnM6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgNiwgMiwgMTUpLCBcImggJ28nJ2Nsb2NrJ1wiKVxuICogLy89PiBcIjMgbydjbG9ja1wiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3QgbG9jYWxlID0gb3B0aW9ucz8ubG9jYWxlID8/IGRlZmF1bHRPcHRpb25zLmxvY2FsZSA/PyBkZWZhdWx0TG9jYWxlO1xuXG4gIGNvbnN0IGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA9XG4gICAgb3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgb3B0aW9ucz8ubG9jYWxlPy5vcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIDE7XG5cbiAgY29uc3Qgd2Vla1N0YXJ0c09uID1cbiAgICBvcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgMDtcblxuICBjb25zdCBvcmlnaW5hbERhdGUgPSB0b0RhdGUoZGF0ZSk7XG5cbiAgaWYgKCFpc1ZhbGlkKG9yaWdpbmFsRGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkludmFsaWQgdGltZSB2YWx1ZVwiKTtcbiAgfVxuXG4gIGxldCBwYXJ0cyA9IGZvcm1hdFN0clxuICAgIC5tYXRjaChsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cClcbiAgICAubWFwKChzdWJzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcInBcIiB8fCBmaXJzdENoYXJhY3RlciA9PT0gXCJQXCIpIHtcbiAgICAgICAgY29uc3QgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgICAgcmV0dXJuIGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGUuZm9ybWF0TG9uZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3Vic3RyaW5nO1xuICAgIH0pXG4gICAgLmpvaW4oXCJcIilcbiAgICAubWF0Y2goZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cClcbiAgICAubWFwKChzdWJzdHJpbmcpID0+IHtcbiAgICAgIC8vIFJlcGxhY2UgdHdvIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIHdpdGggb25lIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJcbiAgICAgIGlmIChzdWJzdHJpbmcgPT09IFwiJydcIikge1xuICAgICAgICByZXR1cm4geyBpc1Rva2VuOiBmYWxzZSwgdmFsdWU6IFwiJ1wiIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcIidcIikge1xuICAgICAgICByZXR1cm4geyBpc1Rva2VuOiBmYWxzZSwgdmFsdWU6IGNsZWFuRXNjYXBlZFN0cmluZyhzdWJzdHJpbmcpIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXSkge1xuICAgICAgICByZXR1cm4geyBpc1Rva2VuOiB0cnVlLCB2YWx1ZTogc3Vic3RyaW5nIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdENoYXJhY3Rlci5tYXRjaCh1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICAgICAgXCJGb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXIgYFwiICtcbiAgICAgICAgICAgIGZpcnN0Q2hhcmFjdGVyICtcbiAgICAgICAgICAgIFwiYFwiLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBpc1Rva2VuOiBmYWxzZSwgdmFsdWU6IHN1YnN0cmluZyB9O1xuICAgIH0pO1xuXG4gIC8vIGludm9rZSBsb2NhbGl6ZSBwcmVwcm9jZXNzb3IgKG9ubHkgZm9yIGZyZW5jaCBsb2NhbGVzIGF0IHRoZSBtb21lbnQpXG4gIGlmIChsb2NhbGUubG9jYWxpemUucHJlcHJvY2Vzc29yKSB7XG4gICAgcGFydHMgPSBsb2NhbGUubG9jYWxpemUucHJlcHJvY2Vzc29yKG9yaWdpbmFsRGF0ZSwgcGFydHMpO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0dGVyT3B0aW9ucyA9IHtcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGUsXG4gICAgd2Vla1N0YXJ0c09uLFxuICAgIGxvY2FsZSxcbiAgfTtcblxuICByZXR1cm4gcGFydHNcbiAgICAubWFwKChwYXJ0KSA9PiB7XG4gICAgICBpZiAoIXBhcnQuaXNUb2tlbikgcmV0dXJuIHBhcnQudmFsdWU7XG5cbiAgICAgIGNvbnN0IHRva2VuID0gcGFydC52YWx1ZTtcblxuICAgICAgaWYgKFxuICAgICAgICAoIW9wdGlvbnM/LnVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VucyAmJlxuICAgICAgICAgIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbih0b2tlbikpIHx8XG4gICAgICAgICghb3B0aW9ucz8udXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucyAmJlxuICAgICAgICAgIGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4odG9rZW4pKVxuICAgICAgKSB7XG4gICAgICAgIHdhcm5PclRocm93UHJvdGVjdGVkRXJyb3IodG9rZW4sIGZvcm1hdFN0ciwgU3RyaW5nKGRhdGUpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm9ybWF0dGVyID0gZm9ybWF0dGVyc1t0b2tlblswXV07XG4gICAgICByZXR1cm4gZm9ybWF0dGVyKG9yaWdpbmFsRGF0ZSwgdG9rZW4sIGxvY2FsZS5sb2NhbGl6ZSwgZm9ybWF0dGVyT3B0aW9ucyk7XG4gICAgfSlcbiAgICAuam9pbihcIlwiKTtcbn1cblxuZnVuY3Rpb24gY2xlYW5Fc2NhcGVkU3RyaW5nKGlucHV0KSB7XG4gIGNvbnN0IG1hdGNoZWQgPSBpbnB1dC5tYXRjaChlc2NhcGVkU3RyaW5nUmVnRXhwKTtcblxuICBpZiAoIW1hdGNoZWQpIHtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlZFsxXS5yZXBsYWNlKGRvdWJsZVF1b3RlUmVnRXhwLCBcIidcIik7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0O1xuIiwiaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIH0gZnJvbSBcIi4vZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZlllYXIgfSBmcm9tIFwiLi9zdGFydE9mWWVhci5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBnZXREYXlPZlllYXJcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBkYXkgb2YgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGRheSBvZiB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIGRheSBvZiB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIGRheSBvZiB0aGUgeWVhciBpcyAyIEp1bHkgMjAxND9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldERheU9mWWVhcihuZXcgRGF0ZSgyMDE0LCA2LCAyKSlcbiAqIC8vPT4gMTgzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZlllYXIoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgZGlmZiA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhfZGF0ZSwgc3RhcnRPZlllYXIoX2RhdGUpKTtcbiAgY29uc3QgZGF5T2ZZZWFyID0gZGlmZiArIDE7XG4gIHJldHVybiBkYXlPZlllYXI7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0RGF5T2ZZZWFyO1xuIiwiaW1wb3J0IHsgbWlsbGlzZWNvbmRzSW5XZWVrIH0gZnJvbSBcIi4vY29uc3RhbnRzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZklTT1dlZWsgfSBmcm9tIFwiLi9zdGFydE9mSVNPV2Vlay5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrWWVhciB9IGZyb20gXCIuL3N0YXJ0T2ZJU09XZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBnZXRJU09XZWVrXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBJU08gd2VlayBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgSVNPIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGdpdmVuIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgSVNPIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBvZiB0aGUgSVNPLXdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMiBKYW51YXJ5IDIwMDU/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRJU09XZWVrKG5ldyBEYXRlKDIwMDUsIDAsIDIpKVxuICogLy89PiA1M1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SVNPV2VlayhkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkaWZmID0gK3N0YXJ0T2ZJU09XZWVrKF9kYXRlKSAtICtzdGFydE9mSVNPV2Vla1llYXIoX2RhdGUpO1xuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2Ygd2Vla3MgdG8gdGhlIG5lYXJlc3QgaW50ZWdlciBiZWNhdXNlIHRoZSBudW1iZXIgb2ZcbiAgLy8gbWlsbGlzZWNvbmRzIGluIGEgd2VlayBpcyBub3QgY29uc3RhbnQgKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2ZcbiAgLy8gdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KS5cbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIG1pbGxpc2Vjb25kc0luV2VlaykgKyAxO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGdldElTT1dlZWs7XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrIH0gZnJvbSBcIi4vc3RhcnRPZklTT1dlZWsubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgZ2V0SVNPV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZSxcbiAqIHdoaWNoIGFsd2F5cyBzdGFydHMgMyBkYXlzIGJlZm9yZSB0aGUgeWVhcidzIGZpcnN0IFRodXJzZGF5LlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIElTTy13ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDIgSmFudWFyeSAyMDA1P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0SVNPV2Vla1llYXIobmV3IERhdGUoMjAwNSwgMCwgMikpXG4gKiAvLz0+IDIwMDRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElTT1dlZWtZZWFyKGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBfZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldEZ1bGxZZWFyKHllYXIgKyAxLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhcik7XG5cbiAgY29uc3QgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhciA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0RnVsbFllYXIoeWVhciwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IHN0YXJ0T2ZUaGlzWWVhciA9IHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIpO1xuXG4gIGlmIChfZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZk5leHRZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyICsgMTtcbiAgfSBlbHNlIGlmIChfZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZlRoaXNZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFyIC0gMTtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGdldElTT1dlZWtZZWFyO1xuIiwiaW1wb3J0IHsgbWlsbGlzZWNvbmRzSW5XZWVrIH0gZnJvbSBcIi4vY29uc3RhbnRzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiLi9zdGFydE9mV2Vlay5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrWWVhciB9IGZyb20gXCIuL3N0YXJ0T2ZXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGdldFdlZWt9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBnZXRXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGxvY2FsIHdlZWsgaW5kZXggb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGxvY2FsIHdlZWsgaW5kZXggb2YgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgZXhhY3QgY2FsY3VsYXRpb24gZGVwZW5kcyBvbiB0aGUgdmFsdWVzIG9mXG4gKiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gICh3aGljaCBpcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlaylcbiAqIGFuZCBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgICh3aGljaCBpcyB0aGUgZGF5IG9mIEphbnVhcnksIHdoaWNoIGlzIGFsd2F5cyBpblxuICogdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHdlZWstbnVtYmVyaW5nIHllYXIpXG4gKlxuICogV2VlayBudW1iZXJpbmc6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dlZWsjVGhlX0lTT193ZWVrX2RhdGVfc3lzdGVtXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZ2l2ZW4gZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBvZiB0aGUgbG9jYWwgd2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNSB3aXRoIGRlZmF1bHQgb3B0aW9ucz9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWsobmV3IERhdGUoMjAwNSwgMCwgMikpXG4gKiAvLz0+IDJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBvZiB0aGUgbG9jYWwgd2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNSxcbiAqIC8vIGlmIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLFxuICogLy8gYW5kIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyIGFsd2F5cyBjb250YWlucyA0IEphbnVhcnk/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrKG5ldyBEYXRlKDIwMDUsIDAsIDIpLCB7XG4gKiAgIHdlZWtTdGFydHNPbjogMSxcbiAqICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiA0XG4gKiB9KVxuICogLy89PiA1M1xuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IGRpZmYgPSArc3RhcnRPZldlZWsoX2RhdGUsIG9wdGlvbnMpIC0gK3N0YXJ0T2ZXZWVrWWVhcihfZGF0ZSwgb3B0aW9ucyk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiB3ZWVrcyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyIGJlY2F1c2UgdGhlIG51bWJlciBvZlxuICAvLyBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudCAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZlxuICAvLyB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpLlxuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gbWlsbGlzZWNvbmRzSW5XZWVrKSArIDE7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0V2VlaztcbiIsImltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiLi9zdGFydE9mV2Vlay5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGdldFdlZWtZZWFyfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZ2V0V2Vla1llYXJcbiAqIEBjYXRlZ29yeSBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSBleGFjdCBjYWxjdWxhdGlvbiBkZXBlbmRzIG9uIHRoZSB2YWx1ZXMgb2ZcbiAqIGBvcHRpb25zLndlZWtTdGFydHNPbmAgKHdoaWNoIGlzIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrKVxuICogYW5kIGBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZWAgKHdoaWNoIGlzIHRoZSBkYXkgb2YgSmFudWFyeSwgd2hpY2ggaXMgYWx3YXlzIGluXG4gKiB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgd2Vlay1udW1iZXJpbmcgeWVhcilcbiAqXG4gKiBXZWVrIG51bWJlcmluZzogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2VlayNUaGVfSVNPX3dlZWtfZGF0ZV9zeXN0ZW1cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKlxuICogQHJldHVybnMgVGhlIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBudW1iZXJpbmcgeWVhciBpcyAyNiBEZWNlbWJlciAyMDA0IHdpdGggdGhlIGRlZmF1bHQgc2V0dGluZ3M/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrWWVhcihuZXcgRGF0ZSgyMDA0LCAxMSwgMjYpKVxuICogLy89PiAyMDA1XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMjYgRGVjZW1iZXIgMjAwNCBpZiB3ZWVrIHN0YXJ0cyBvbiBTYXR1cmRheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWtZZWFyKG5ldyBEYXRlKDIwMDQsIDExLCAyNiksIHsgd2Vla1N0YXJ0c09uOiA2IH0pXG4gKiAvLz0+IDIwMDRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBudW1iZXJpbmcgeWVhciBpcyAyNiBEZWNlbWJlciAyMDA0IGlmIHRoZSBmaXJzdCB3ZWVrIGNvbnRhaW5zIDQgSmFudWFyeT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWtZZWFyKG5ldyBEYXRlKDIwMDQsIDExLCAyNiksIHsgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiA0IH0pXG4gKiAvLz0+IDIwMDRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtZZWFyKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBfZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3QgZmlyc3RXZWVrQ29udGFpbnNEYXRlID1cbiAgICBvcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgMTtcblxuICBjb25zdCBmaXJzdFdlZWtPZk5leHRZZWFyID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZmlyc3RXZWVrT2ZOZXh0WWVhci5zZXRGdWxsWWVhcih5ZWFyICsgMSwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZOZXh0WWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrT2ZOZXh0WWVhciwgb3B0aW9ucyk7XG5cbiAgY29uc3QgZmlyc3RXZWVrT2ZUaGlzWWVhciA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZpcnN0V2Vla09mVGhpc1llYXIuc2V0RnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZUaGlzWWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZlRoaXNZZWFyID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrT2ZUaGlzWWVhciwgb3B0aW9ucyk7XG5cbiAgaWYgKF9kYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mTmV4dFllYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXIgKyAxO1xuICB9IGVsc2UgaWYgKF9kYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXIgLSAxO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0V2Vla1llYXI7XG4iLCIvKipcbiAqIEBuYW1lIGlzRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gdmFsdWUgYSBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLiBUaGUgZnVuY3Rpb24gd29ya3MgZm9yIGRhdGVzIHRyYW5zZmVycmVkIGFjcm9zcyBpZnJhbWVzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgZGF0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYSB2YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKG5ldyBEYXRlKCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZShOYU4pKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBzb21lIHZhbHVlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKCcyMDE0LTAyLTMxJylcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIG9iamVjdDpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSh7fSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZSh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBEYXRlXVwiKVxuICApO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzRGF0ZTtcbiIsImltcG9ydCB7IGlzRGF0ZSB9IGZyb20gXCIuL2lzRGF0ZS5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBpc1ZhbGlkXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHZhbGlkP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyBmYWxzZSBpZiBhcmd1bWVudCBpcyBJbnZhbGlkIERhdGUgYW5kIHRydWUgb3RoZXJ3aXNlLlxuICogQXJndW1lbnQgaXMgY29udmVydGVkIHRvIERhdGUgdXNpbmcgYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXShodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZSlcbiAqIEludmFsaWQgRGF0ZSBpcyBhIERhdGUsIHdob3NlIHRpbWUgdmFsdWUgaXMgTmFOLlxuICpcbiAqIFRpbWUgdmFsdWUgb2YgRGF0ZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS45LjEuMVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGRhdGUgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZSBpcyB2YWxpZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKDIwMTQsIDEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbHVlLCBjb252ZXJ0YWJsZSBpbnRvIGEgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQoMTM5MzgwNDgwMDAwMClcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoJycpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChkYXRlKSB7XG4gIGlmICghaXNEYXRlKGRhdGUpICYmIHR5cGVvZiBkYXRlICE9PSBcIm51bWJlclwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICByZXR1cm4gIWlzTmFOKE51bWJlcihfZGF0ZSkpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzVmFsaWQ7XG4iLCJleHBvcnQgZnVuY3Rpb24gYnVpbGRGb3JtYXRMb25nRm4oYXJncykge1xuICByZXR1cm4gKG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIC8vIFRPRE86IFJlbW92ZSBTdHJpbmcoKVxuICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgIGNvbnN0IGZvcm1hdCA9IGFyZ3MuZm9ybWF0c1t3aWR0aF0gfHwgYXJncy5mb3JtYXRzW2FyZ3MuZGVmYXVsdFdpZHRoXTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBUaGUgbG9jYWxpemUgZnVuY3Rpb24gYXJndW1lbnQgY2FsbGJhY2sgd2hpY2ggYWxsb3dzIHRvIGNvbnZlcnQgcmF3IHZhbHVlIHRvXG4gKiB0aGUgYWN0dWFsIHR5cGUuXG4gKlxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqXG4gKiBAcmV0dXJucyBUaGUgY29udmVydGVkIHZhbHVlXG4gKi9cblxuLyoqXG4gKiBUaGUgbWFwIG9mIGxvY2FsaXplZCB2YWx1ZXMgZm9yIGVhY2ggd2lkdGguXG4gKi9cblxuLyoqXG4gKiBUaGUgaW5kZXggdHlwZSBvZiB0aGUgbG9jYWxlIHVuaXQgdmFsdWUuIEl0IHR5cGVzIGNvbnZlcnNpb24gb2YgdW5pdHMgb2ZcbiAqIHZhbHVlcyB0aGF0IGRvbid0IHN0YXJ0IGF0IDAgKGkuZS4gcXVhcnRlcnMpLlxuICovXG5cbi8qKlxuICogQ29udmVydHMgdGhlIHVuaXQgdmFsdWUgdG8gdGhlIHR1cGxlIG9mIHZhbHVlcy5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgZXJhIHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBCQyxcbiAqIHRoZSBzZWNvbmQgZWxlbWVudCByZXByZXNlbnRzIEFELlxuICovXG5cbi8qKlxuICogVGhlIHR1cGxlIG9mIGxvY2FsaXplZCBxdWFydGVyIHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBRMS5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgZGF5IHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBTdW5kYXkuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIG1vbnRoIHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBKYW51YXJ5LlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZExvY2FsaXplRm4oYXJncykge1xuICByZXR1cm4gKHZhbHVlLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IG9wdGlvbnM/LmNvbnRleHQgPyBTdHJpbmcob3B0aW9ucy5jb250ZXh0KSA6IFwic3RhbmRhbG9uZVwiO1xuXG4gICAgbGV0IHZhbHVlc0FycmF5O1xuICAgIGlmIChjb250ZXh0ID09PSBcImZvcm1hdHRpbmdcIiAmJiBhcmdzLmZvcm1hdHRpbmdWYWx1ZXMpIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdEZvcm1hdHRpbmdXaWR0aCB8fCBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucz8ud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBkZWZhdWx0V2lkdGg7XG5cbiAgICAgIHZhbHVlc0FycmF5ID1cbiAgICAgICAgYXJncy5mb3JtYXR0aW5nVmFsdWVzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbZGVmYXVsdFdpZHRoXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnM/LndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG5cbiAgICAgIHZhbHVlc0FycmF5ID0gYXJncy52YWx1ZXNbd2lkdGhdIHx8IGFyZ3MudmFsdWVzW2RlZmF1bHRXaWR0aF07XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gYXJncy5hcmd1bWVudENhbGxiYWNrID8gYXJncy5hcmd1bWVudENhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIEZvciBzb21lIHJlYXNvbiBUeXBlU2NyaXB0IGp1c3QgZG9uJ3Qgd2FudCB0byBtYXRjaCBpdCwgbm8gbWF0dGVyIGhvdyBoYXJkIHdlIHRyeS4gSSBjaGFsbGVuZ2UgeW91IHRvIHRyeSB0byByZW1vdmUgaXQhXG4gICAgcmV0dXJuIHZhbHVlc0FycmF5W2luZGV4XTtcbiAgfTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBidWlsZE1hdGNoRm4oYXJncykge1xuICByZXR1cm4gKHN0cmluZywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoO1xuXG4gICAgY29uc3QgbWF0Y2hQYXR0ZXJuID1cbiAgICAgICh3aWR0aCAmJiBhcmdzLm1hdGNoUGF0dGVybnNbd2lkdGhdKSB8fFxuICAgICAgYXJncy5tYXRjaFBhdHRlcm5zW2FyZ3MuZGVmYXVsdE1hdGNoV2lkdGhdO1xuICAgIGNvbnN0IG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKG1hdGNoUGF0dGVybik7XG5cbiAgICBpZiAoIW1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuXG4gICAgY29uc3QgcGFyc2VQYXR0ZXJucyA9XG4gICAgICAod2lkdGggJiYgYXJncy5wYXJzZVBhdHRlcm5zW3dpZHRoXSkgfHxcbiAgICAgIGFyZ3MucGFyc2VQYXR0ZXJuc1thcmdzLmRlZmF1bHRQYXJzZVdpZHRoXTtcblxuICAgIGNvbnN0IGtleSA9IEFycmF5LmlzQXJyYXkocGFyc2VQYXR0ZXJucylcbiAgICAgID8gZmluZEluZGV4KHBhcnNlUGF0dGVybnMsIChwYXR0ZXJuKSA9PiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZykpXG4gICAgICA6IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55IC0tIEkgY2hhbGxhbmdlIHlvdSB0byBmaXggdGhlIHR5cGVcbiAgICAgICAgZmluZEtleShwYXJzZVBhdHRlcm5zLCAocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpKTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKGtleSkgOiBrZXk7XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2tcbiAgICAgID8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgLS0gSSBjaGFsbGFuZ2UgeW91IHRvIGZpeCB0aGUgdHlwZVxuICAgICAgICBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpXG4gICAgICA6IHZhbHVlO1xuXG4gICAgY29uc3QgcmVzdCA9IHN0cmluZy5zbGljZShtYXRjaGVkU3RyaW5nLmxlbmd0aCk7XG5cbiAgICByZXR1cm4geyB2YWx1ZSwgcmVzdCB9O1xuICB9O1xufVxuXG5mdW5jdGlvbiBmaW5kS2V5KG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChcbiAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiZcbiAgICAgIHByZWRpY2F0ZShvYmplY3Rba2V5XSlcbiAgICApIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGZvciAobGV0IGtleSA9IDA7IGtleSA8IGFycmF5Lmxlbmd0aDsga2V5KyspIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oYXJncykge1xuICByZXR1cm4gKHN0cmluZywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3QgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5tYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcblxuICAgIGNvbnN0IHBhcnNlUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MucGFyc2VQYXR0ZXJuKTtcbiAgICBpZiAoIXBhcnNlUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICBsZXQgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2tcbiAgICAgID8gYXJncy52YWx1ZUNhbGxiYWNrKHBhcnNlUmVzdWx0WzBdKVxuICAgICAgOiBwYXJzZVJlc3VsdFswXTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55IC0tIEkgY2hhbGxhbmdlIHlvdSB0byBmaXggdGhlIHR5cGVcbiAgICB2YWx1ZSA9IG9wdGlvbnMudmFsdWVDYWxsYmFjayA/IG9wdGlvbnMudmFsdWVDYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIGNvbnN0IHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHsgdmFsdWUsIHJlc3QgfTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IGZvcm1hdERpc3RhbmNlIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS5tanNcIjtcbmltcG9ydCB7IGZvcm1hdExvbmcgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2Zvcm1hdExvbmcubWpzXCI7XG5pbXBvcnQgeyBmb3JtYXRSZWxhdGl2ZSB9IGZyb20gXCIuL2VuLVVTL19saWIvZm9ybWF0UmVsYXRpdmUubWpzXCI7XG5pbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gXCIuL2VuLVVTL19saWIvbG9jYWxpemUubWpzXCI7XG5pbXBvcnQgeyBtYXRjaCB9IGZyb20gXCIuL2VuLVVTL19saWIvbWF0Y2gubWpzXCI7XG5cbi8qKlxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IEVuZ2xpc2ggbG9jYWxlIChVbml0ZWQgU3RhdGVzKS5cbiAqIEBsYW5ndWFnZSBFbmdsaXNoXG4gKiBAaXNvLTYzOS0yIGVuZ1xuICogQGF1dGhvciBTYXNoYSBLb3NzIFtAa29zc25vY29ycF0oaHR0cHM6Ly9naXRodWIuY29tL2tvc3Nub2NvcnApXG4gKiBAYXV0aG9yIExlc2hhIEtvc3MgW0BsZXNoYWtvc3NdKGh0dHBzOi8vZ2l0aHViLmNvbS9sZXNoYWtvc3MpXG4gKi9cbmV4cG9ydCBjb25zdCBlblVTID0ge1xuICBjb2RlOiBcImVuLVVTXCIsXG4gIGZvcm1hdERpc3RhbmNlOiBmb3JtYXREaXN0YW5jZSxcbiAgZm9ybWF0TG9uZzogZm9ybWF0TG9uZyxcbiAgZm9ybWF0UmVsYXRpdmU6IGZvcm1hdFJlbGF0aXZlLFxuICBsb2NhbGl6ZTogbG9jYWxpemUsXG4gIG1hdGNoOiBtYXRjaCxcbiAgb3B0aW9uczoge1xuICAgIHdlZWtTdGFydHNPbjogMCAvKiBTdW5kYXkgKi8sXG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiAxLFxuICB9LFxufTtcblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBlblVTO1xuIiwiY29uc3QgZm9ybWF0RGlzdGFuY2VMb2NhbGUgPSB7XG4gIGxlc3NUaGFuWFNlY29uZHM6IHtcbiAgICBvbmU6IFwibGVzcyB0aGFuIGEgc2Vjb25kXCIsXG4gICAgb3RoZXI6IFwibGVzcyB0aGFuIHt7Y291bnR9fSBzZWNvbmRzXCIsXG4gIH0sXG5cbiAgeFNlY29uZHM6IHtcbiAgICBvbmU6IFwiMSBzZWNvbmRcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gc2Vjb25kc1wiLFxuICB9LFxuXG4gIGhhbGZBTWludXRlOiBcImhhbGYgYSBtaW51dGVcIixcblxuICBsZXNzVGhhblhNaW51dGVzOiB7XG4gICAgb25lOiBcImxlc3MgdGhhbiBhIG1pbnV0ZVwiLFxuICAgIG90aGVyOiBcImxlc3MgdGhhbiB7e2NvdW50fX0gbWludXRlc1wiLFxuICB9LFxuXG4gIHhNaW51dGVzOiB7XG4gICAgb25lOiBcIjEgbWludXRlXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IG1pbnV0ZXNcIixcbiAgfSxcblxuICBhYm91dFhIb3Vyczoge1xuICAgIG9uZTogXCJhYm91dCAxIGhvdXJcIixcbiAgICBvdGhlcjogXCJhYm91dCB7e2NvdW50fX0gaG91cnNcIixcbiAgfSxcblxuICB4SG91cnM6IHtcbiAgICBvbmU6IFwiMSBob3VyXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IGhvdXJzXCIsXG4gIH0sXG5cbiAgeERheXM6IHtcbiAgICBvbmU6IFwiMSBkYXlcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gZGF5c1wiLFxuICB9LFxuXG4gIGFib3V0WFdlZWtzOiB7XG4gICAgb25lOiBcImFib3V0IDEgd2Vla1wiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSB3ZWVrc1wiLFxuICB9LFxuXG4gIHhXZWVrczoge1xuICAgIG9uZTogXCIxIHdlZWtcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gd2Vla3NcIixcbiAgfSxcblxuICBhYm91dFhNb250aHM6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSBtb250aFwiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSBtb250aHNcIixcbiAgfSxcblxuICB4TW9udGhzOiB7XG4gICAgb25lOiBcIjEgbW9udGhcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gbW9udGhzXCIsXG4gIH0sXG5cbiAgYWJvdXRYWWVhcnM6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG5cbiAgeFllYXJzOiB7XG4gICAgb25lOiBcIjEgeWVhclwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxuXG4gIG92ZXJYWWVhcnM6IHtcbiAgICBvbmU6IFwib3ZlciAxIHllYXJcIixcbiAgICBvdGhlcjogXCJvdmVyIHt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxuXG4gIGFsbW9zdFhZZWFyczoge1xuICAgIG9uZTogXCJhbG1vc3QgMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwiYWxtb3N0IHt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERpc3RhbmNlID0gKHRva2VuLCBjb3VudCwgb3B0aW9ucykgPT4ge1xuICBsZXQgcmVzdWx0O1xuXG4gIGNvbnN0IHRva2VuVmFsdWUgPSBmb3JtYXREaXN0YW5jZUxvY2FsZVt0b2tlbl07XG4gIGlmICh0eXBlb2YgdG9rZW5WYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWU7XG4gIH0gZWxzZSBpZiAoY291bnQgPT09IDEpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm9uZTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm90aGVyLnJlcGxhY2UoXCJ7e2NvdW50fX1cIiwgY291bnQudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpZiAob3B0aW9ucz8uYWRkU3VmZml4KSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiAmJiBvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICByZXR1cm4gXCJpbiBcIiArIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdCArIFwiIGFnb1wiO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiaW1wb3J0IHsgYnVpbGRGb3JtYXRMb25nRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi5tanNcIjtcblxuY29uc3QgZGF0ZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwiRUVFRSwgTU1NTSBkbywgeVwiLFxuICBsb25nOiBcIk1NTU0gZG8sIHlcIixcbiAgbWVkaXVtOiBcIk1NTSBkLCB5XCIsXG4gIHNob3J0OiBcIk1NL2RkL3l5eXlcIixcbn07XG5cbmNvbnN0IHRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcImg6bW06c3MgYSB6enp6XCIsXG4gIGxvbmc6IFwiaDptbTpzcyBhIHpcIixcbiAgbWVkaXVtOiBcImg6bW06c3MgYVwiLFxuICBzaG9ydDogXCJoOm1tIGFcIixcbn07XG5cbmNvbnN0IGRhdGVUaW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIGxvbmc6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBtZWRpdW06IFwie3tkYXRlfX0sIHt7dGltZX19XCIsXG4gIHNob3J0OiBcInt7ZGF0ZX19LCB7e3RpbWV9fVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdExvbmcgPSB7XG4gIGRhdGU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6IFwiZnVsbFwiLFxuICB9KSxcblxuICB0aW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogdGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG5cbiAgZGF0ZVRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlVGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG59O1xuIiwiY29uc3QgZm9ybWF0UmVsYXRpdmVMb2NhbGUgPSB7XG4gIGxhc3RXZWVrOiBcIidsYXN0JyBlZWVlICdhdCcgcFwiLFxuICB5ZXN0ZXJkYXk6IFwiJ3llc3RlcmRheSBhdCcgcFwiLFxuICB0b2RheTogXCIndG9kYXkgYXQnIHBcIixcbiAgdG9tb3Jyb3c6IFwiJ3RvbW9ycm93IGF0JyBwXCIsXG4gIG5leHRXZWVrOiBcImVlZWUgJ2F0JyBwXCIsXG4gIG90aGVyOiBcIlBcIixcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRSZWxhdGl2ZSA9ICh0b2tlbiwgX2RhdGUsIF9iYXNlRGF0ZSwgX29wdGlvbnMpID0+XG4gIGZvcm1hdFJlbGF0aXZlTG9jYWxlW3Rva2VuXTtcbiIsImltcG9ydCB7IGJ1aWxkTG9jYWxpemVGbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTG9jYWxpemVGbi5tanNcIjtcblxuY29uc3QgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIkJcIiwgXCJBXCJdLFxuICBhYmJyZXZpYXRlZDogW1wiQkNcIiwgXCJBRFwiXSxcbiAgd2lkZTogW1wiQmVmb3JlIENocmlzdFwiLCBcIkFubm8gRG9taW5pXCJdLFxufTtcblxuY29uc3QgcXVhcnRlclZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCIxXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCJdLFxuICBhYmJyZXZpYXRlZDogW1wiUTFcIiwgXCJRMlwiLCBcIlEzXCIsIFwiUTRcIl0sXG4gIHdpZGU6IFtcIjFzdCBxdWFydGVyXCIsIFwiMm5kIHF1YXJ0ZXJcIiwgXCIzcmQgcXVhcnRlclwiLCBcIjR0aCBxdWFydGVyXCJdLFxufTtcblxuLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxuY29uc3QgbW9udGhWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wiSlwiLCBcIkZcIiwgXCJNXCIsIFwiQVwiLCBcIk1cIiwgXCJKXCIsIFwiSlwiLCBcIkFcIiwgXCJTXCIsIFwiT1wiLCBcIk5cIiwgXCJEXCJdLFxuICBhYmJyZXZpYXRlZDogW1xuICAgIFwiSmFuXCIsXG4gICAgXCJGZWJcIixcbiAgICBcIk1hclwiLFxuICAgIFwiQXByXCIsXG4gICAgXCJNYXlcIixcbiAgICBcIkp1blwiLFxuICAgIFwiSnVsXCIsXG4gICAgXCJBdWdcIixcbiAgICBcIlNlcFwiLFxuICAgIFwiT2N0XCIsXG4gICAgXCJOb3ZcIixcbiAgICBcIkRlY1wiLFxuICBdLFxuXG4gIHdpZGU6IFtcbiAgICBcIkphbnVhcnlcIixcbiAgICBcIkZlYnJ1YXJ5XCIsXG4gICAgXCJNYXJjaFwiLFxuICAgIFwiQXByaWxcIixcbiAgICBcIk1heVwiLFxuICAgIFwiSnVuZVwiLFxuICAgIFwiSnVseVwiLFxuICAgIFwiQXVndXN0XCIsXG4gICAgXCJTZXB0ZW1iZXJcIixcbiAgICBcIk9jdG9iZXJcIixcbiAgICBcIk5vdmVtYmVyXCIsXG4gICAgXCJEZWNlbWJlclwiLFxuICBdLFxufTtcblxuY29uc3QgZGF5VmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIlNcIiwgXCJNXCIsIFwiVFwiLCBcIldcIiwgXCJUXCIsIFwiRlwiLCBcIlNcIl0sXG4gIHNob3J0OiBbXCJTdVwiLCBcIk1vXCIsIFwiVHVcIiwgXCJXZVwiLCBcIlRoXCIsIFwiRnJcIiwgXCJTYVwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgd2lkZTogW1xuICAgIFwiU3VuZGF5XCIsXG4gICAgXCJNb25kYXlcIixcbiAgICBcIlR1ZXNkYXlcIixcbiAgICBcIldlZG5lc2RheVwiLFxuICAgIFwiVGh1cnNkYXlcIixcbiAgICBcIkZyaWRheVwiLFxuICAgIFwiU2F0dXJkYXlcIixcbiAgXSxcbn07XG5cbmNvbnN0IGRheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwiYVwiLFxuICAgIHBtOiBcInBcIixcbiAgICBtaWRuaWdodDogXCJtaVwiLFxuICAgIG5vb246IFwiblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiBcIkFNXCIsXG4gICAgcG06IFwiUE1cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwiYS5tLlwiLFxuICAgIHBtOiBcInAubS5cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxufTtcblxuY29uc3QgZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwiYVwiLFxuICAgIHBtOiBcInBcIixcbiAgICBtaWRuaWdodDogXCJtaVwiLFxuICAgIG5vb246IFwiblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiBcIkFNXCIsXG4gICAgcG06IFwiUE1cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwiYS5tLlwiLFxuICAgIHBtOiBcInAubS5cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxufTtcblxuY29uc3Qgb3JkaW5hbE51bWJlciA9IChkaXJ0eU51bWJlciwgX29wdGlvbnMpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICAvLyBJZiBvcmRpbmFsIG51bWJlcnMgZGVwZW5kIG9uIGNvbnRleHQsIGZvciBleGFtcGxlLFxuICAvLyBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgZm9yIGRpZmZlcmVudCBncmFtbWF0aWNhbCBnZW5kZXJzLFxuICAvLyB1c2UgYG9wdGlvbnMudW5pdGAuXG4gIC8vXG4gIC8vIGB1bml0YCBjYW4gYmUgJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RhdGUnLCAnZGF5T2ZZZWFyJyxcbiAgLy8gJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLlxuXG4gIGNvbnN0IHJlbTEwMCA9IG51bWJlciAlIDEwMDtcbiAgaWYgKHJlbTEwMCA+IDIwIHx8IHJlbTEwMCA8IDEwKSB7XG4gICAgc3dpdGNoIChyZW0xMDAgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJzdFwiO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJuZFwiO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJyZFwiO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyICsgXCJ0aFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvY2FsaXplID0ge1xuICBvcmRpbmFsTnVtYmVyLFxuXG4gIGVyYTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGVyYVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICAgIGFyZ3VtZW50Q2FsbGJhY2s6IChxdWFydGVyKSA9PiBxdWFydGVyIC0gMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBtb250aFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgZGF5UGVyaW9kOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gICAgZm9ybWF0dGluZ1ZhbHVlczogZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoOiBcIndpZGVcIixcbiAgfSksXG59O1xuIiwiaW1wb3J0IHsgYnVpbGRNYXRjaEZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRNYXRjaEZuLm1qc1wiO1xuaW1wb3J0IHsgYnVpbGRNYXRjaFBhdHRlcm5GbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4ubWpzXCI7XG5cbmNvbnN0IG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXihcXGQrKSh0aHxzdHxuZHxyZCk/L2k7XG5jb25zdCBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL1xcZCsvaTtcblxuY29uc3QgbWF0Y2hFcmFQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihifGEpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihiXFwuP1xccz9jXFwuP3xiXFwuP1xccz9jXFwuP1xccz9lXFwuP3xhXFwuP1xccz9kXFwuP3xjXFwuP1xccz9lXFwuPykvaSxcbiAgd2lkZTogL14oYmVmb3JlIGNocmlzdHxiZWZvcmUgY29tbW9uIGVyYXxhbm5vIGRvbWluaXxjb21tb24gZXJhKS9pLFxufTtcbmNvbnN0IHBhcnNlRXJhUGF0dGVybnMgPSB7XG4gIGFueTogWy9eYi9pLCAvXihhfGMpL2ldLFxufTtcblxuY29uc3QgbWF0Y2hRdWFydGVyUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bMTIzNF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9ecVsxMjM0XS9pLFxuICB3aWRlOiAvXlsxMjM0XSh0aHxzdHxuZHxyZCk/IHF1YXJ0ZXIvaSxcbn07XG5jb25zdCBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgYW55OiBbLzEvaSwgLzIvaSwgLzMvaSwgLzQvaV0sXG59O1xuXG5jb25zdCBtYXRjaE1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bamZtYXNvbmRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXihqYW58ZmVifG1hcnxhcHJ8bWF5fGp1bnxqdWx8YXVnfHNlcHxvY3R8bm92fGRlYykvaSxcbiAgd2lkZTogL14oamFudWFyeXxmZWJydWFyeXxtYXJjaHxhcHJpbHxtYXl8anVuZXxqdWx5fGF1Z3VzdHxzZXB0ZW1iZXJ8b2N0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaSxcbn07XG5jb25zdCBwYXJzZU1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogW1xuICAgIC9eai9pLFxuICAgIC9eZi9pLFxuICAgIC9ebS9pLFxuICAgIC9eYS9pLFxuICAgIC9ebS9pLFxuICAgIC9eai9pLFxuICAgIC9eai9pLFxuICAgIC9eYS9pLFxuICAgIC9ecy9pLFxuICAgIC9eby9pLFxuICAgIC9ebi9pLFxuICAgIC9eZC9pLFxuICBdLFxuXG4gIGFueTogW1xuICAgIC9eamEvaSxcbiAgICAvXmYvaSxcbiAgICAvXm1hci9pLFxuICAgIC9eYXAvaSxcbiAgICAvXm1heS9pLFxuICAgIC9eanVuL2ksXG4gICAgL15qdWwvaSxcbiAgICAvXmF1L2ksXG4gICAgL15zL2ksXG4gICAgL15vL2ksXG4gICAgL15uL2ksXG4gICAgL15kL2ksXG4gIF0sXG59O1xuXG5jb25zdCBtYXRjaERheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW3NtdHdmXS9pLFxuICBzaG9ydDogL14oc3V8bW98dHV8d2V8dGh8ZnJ8c2EpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihzdW58bW9ufHR1ZXx3ZWR8dGh1fGZyaXxzYXQpL2ksXG4gIHdpZGU6IC9eKHN1bmRheXxtb25kYXl8dHVlc2RheXx3ZWRuZXNkYXl8dGh1cnNkYXl8ZnJpZGF5fHNhdHVyZGF5KS9pLFxufTtcbmNvbnN0IHBhcnNlRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9ecy9pLCAvXm0vaSwgL150L2ksIC9edy9pLCAvXnQvaSwgL15mL2ksIC9ecy9pXSxcbiAgYW55OiBbL15zdS9pLCAvXm0vaSwgL150dS9pLCAvXncvaSwgL150aC9pLCAvXmYvaSwgL15zYS9pXSxcbn07XG5cbmNvbnN0IG1hdGNoRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYXxwfG1pfG58KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxuICBhbnk6IC9eKFthcF1cXC4/XFxzP21cXC4/fG1pZG5pZ2h0fG5vb258KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxufTtcbmNvbnN0IHBhcnNlRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIGFueToge1xuICAgIGFtOiAvXmEvaSxcbiAgICBwbTogL15wL2ksXG4gICAgbWlkbmlnaHQ6IC9ebWkvaSxcbiAgICBub29uOiAvXm5vL2ksXG4gICAgbW9ybmluZzogL21vcm5pbmcvaSxcbiAgICBhZnRlcm5vb246IC9hZnRlcm5vb24vaSxcbiAgICBldmVuaW5nOiAvZXZlbmluZy9pLFxuICAgIG5pZ2h0OiAvbmlnaHQvaSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBtYXRjaCA9IHtcbiAgb3JkaW5hbE51bWJlcjogYnVpbGRNYXRjaFBhdHRlcm5Gbih7XG4gICAgbWF0Y2hQYXR0ZXJuOiBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHBhcnNlUGF0dGVybjogcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICB2YWx1ZUNhbGxiYWNrOiAodmFsdWUpID0+IHBhcnNlSW50KHZhbHVlLCAxMCksXG4gIH0pLFxuXG4gIGVyYTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaEVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZUVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgICB2YWx1ZUNhbGxiYWNrOiAoaW5kZXgpID0+IGluZGV4ICsgMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZU1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxuXG4gIGRheTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBkYXlQZXJpb2Q6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJhbnlcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcbn07XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZkRheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mRGF5KGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZkRheTtcbiIsImltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZklTT1dlZWtcbiAqIEBjYXRlZ29yeSBJU08gV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhbiBJU08gd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mSVNPV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZJU09XZWVrKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZXZWVrKGRhdGUsIHsgd2Vla1N0YXJ0c09uOiAxIH0pO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZJU09XZWVrO1xuIiwiaW1wb3J0IHsgZ2V0SVNPV2Vla1llYXIgfSBmcm9tIFwiLi9nZXRJU09XZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrIH0gZnJvbSBcIi4vc3RhcnRPZklTT1dlZWsubWpzXCI7XG5pbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mSVNPV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsXG4gKiB3aGljaCBhbHdheXMgc3RhcnRzIDMgZGF5cyBiZWZvcmUgdGhlIHllYXIncyBmaXJzdCBUaHVyc2RheS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciAyIEp1bHkgMjAwNTpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZJU09XZWVrWWVhcihuZXcgRGF0ZSgyMDA1LCA2LCAyKSlcbiAqIC8vPT4gTW9uIEphbiAwMyAyMDA1IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mSVNPV2Vla1llYXIoZGF0ZSkge1xuICBjb25zdCB5ZWFyID0gZ2V0SVNPV2Vla1llYXIoZGF0ZSk7XG4gIGNvbnN0IGZvdXJ0aE9mSmFudWFyeSA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRGdWxsWWVhcih5ZWFyLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5KTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mSVNPV2Vla1llYXI7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFN1biBBdWcgMzEgMjAxNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LCB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkYXkgPSBfZGF0ZS5nZXREYXkoKTtcbiAgY29uc3QgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSB3ZWVrU3RhcnRzT247XG5cbiAgX2RhdGUuc2V0RGF0ZShfZGF0ZS5nZXREYXRlKCkgLSBkaWZmKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mV2VlaztcbiIsImltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuaW1wb3J0IHsgZ2V0V2Vla1llYXIgfSBmcm9tIFwiLi9nZXRXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla1llYXJ9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyLlxuICogVGhlIGV4YWN0IGNhbGN1bGF0aW9uIGRlcGVuZHMgb24gdGhlIHZhbHVlcyBvZlxuICogYG9wdGlvbnMud2Vla1N0YXJ0c09uYCAod2hpY2ggaXMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWspXG4gKiBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAod2hpY2ggaXMgdGhlIGRheSBvZiBKYW51YXJ5LCB3aGljaCBpcyBhbHdheXMgaW5cbiAqIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB3ZWVrLW51bWJlcmluZyB5ZWFyKVxuICpcbiAqIFdlZWsgbnVtYmVyaW5nOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XZWVrI1RoZV9JU09fd2Vla19kYXRlX3N5c3RlbVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGFuIGEgd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgMiBKdWx5IDIwMDUgd2l0aCBkZWZhdWx0IHNldHRpbmdzOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWtZZWFyKG5ldyBEYXRlKDIwMDUsIDYsIDIpKVxuICogLy89PiBTdW4gRGVjIDI2IDIwMDQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgMiBKdWx5IDIwMDVcbiAqIC8vIGlmIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHdlZWtcbiAqIC8vIGFuZCA0IEphbnVhcnkgaXMgYWx3YXlzIGluIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWtZZWFyKG5ldyBEYXRlKDIwMDUsIDYsIDIpLCB7XG4gKiAgIHdlZWtTdGFydHNPbjogMSxcbiAqICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiA0XG4gKiB9KVxuICogLy89PiBNb24gSmFuIDAzIDIwMDUgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrWWVhcihkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3QgZmlyc3RXZWVrQ29udGFpbnNEYXRlID1cbiAgICBvcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgMTtcblxuICBjb25zdCB5ZWFyID0gZ2V0V2Vla1llYXIoZGF0ZSwgb3B0aW9ucyk7XG4gIGNvbnN0IGZpcnN0V2VlayA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZpcnN0V2Vlay5zZXRGdWxsWWVhcih5ZWFyLCAwLCBmaXJzdFdlZWtDb250YWluc0RhdGUpO1xuICBmaXJzdFdlZWsuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IF9kYXRlID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrLCBvcHRpb25zKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZXZWVrWWVhcjtcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZZZWFyXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHllYXIgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mWWVhcihuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDAwKSlcbiAqIC8vPT4gV2VkIEphbiAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mWWVhcihkYXRlKSB7XG4gIGNvbnN0IGNsZWFuRGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgX2RhdGUgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBfZGF0ZS5zZXRGdWxsWWVhcihjbGVhbkRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZlllYXI7XG4iLCIvKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gYXJndW1lbnQgLSBUaGUgdmFsdWUgdG8gY29udmVydFxuICpcbiAqIEByZXR1cm5zIFRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIGNvbnN0IGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7XG5cbiAgLy8gQ2xvbmUgdGhlIGRhdGVcbiAgaWYgKFxuICAgIGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICh0eXBlb2YgYXJndW1lbnQgPT09IFwib2JqZWN0XCIgJiYgYXJnU3RyID09PSBcIltvYmplY3QgRGF0ZV1cIilcbiAgKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBhcmd1bWVudC5jb25zdHJ1Y3RvcigrYXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKFxuICAgIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJudW1iZXJcIiB8fFxuICAgIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIiB8fFxuICAgIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJzdHJpbmdcIiB8fFxuICAgIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIlxuICApIHtcbiAgICAvLyBUT0RPOiBDYW4gd2UgZ2V0IHJpZCBvZiBhcz9cbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRPRE86IENhbiB3ZSBnZXQgcmlkIG9mIGFzP1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgdG9EYXRlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zY3NzL3N0eWxlLnNjc3NcIjtcbmltcG9ydCB7IGZldGNoVXNlckxvY2F0aW9uIH0gZnJvbSBcIi4vanMvY29tcG9uZW50cy9nZXRMb2NhdGlvbi5qc1wiO1xuaW1wb3J0IHsgZ2V0V2VhdGhlckFwaVVSTCB9IGZyb20gXCIuL2pzL2FwaS9hcGkuanNcIjtcbmltcG9ydCB7IGluaXRXZWF0aGVyQXBwIH0gZnJvbSBcIi4vanMvaW5pdFwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBhc3luYyBmdW5jdGlvbiAoKSB7XG5cdC8vIGdldHRpbmcgdXNlcidzIGxvY2F0aW9uIGZyb20gdGhlIGJyb3dzZXJcblx0Ly8gdGhpcyBmdW5jdGlvbiByZXR1cm5zIHJlYWwgY29vcmRpbmF0ZXMsIGlmIHVzZXIgYWxsb3dzIGxvY2F0aW9uIHNlcnZpY2VzXG5cdC8vIG9yIGRlZmF1bHRzIHRvIExvbmRvbiwgaW4gd2hpY2ggY2FzZSBpdCB3aWxsIHJldHVybiBMb25kb24ncyBsYXQgYW5kIGxvbi5cblx0Y29uc3QgdXNlckxvY2F0aW9uID0gYXdhaXQgZmV0Y2hVc2VyTG9jYXRpb24oKTtcblxuXHQvLyBjb25zdHJ1Y3QgYSB3ZWF0aGVyIGFwaSB1cmwsIGJhc2VkIG9uIHVzZXIgbG9jYXRpb25cblx0Y29uc3Qgd2VhdGhlckFwaVVSTCA9IGdldFdlYXRoZXJBcGlVUkwoeyBsYXQ6IHVzZXJMb2NhdGlvbi5sYXQsIGxvbjogdXNlckxvY2F0aW9uLmxvbiB9KTtcblxuXHQvLyBpbml0IHdlYXRoZXIgYXBwIG9uIERPTSBsb2FkXG5cdGluaXRXZWF0aGVyQXBwKHdlYXRoZXJBcGlVUkwpO1xufSk7XG4iXSwibmFtZXMiOlsiYXBpIiwibG9jYXRpb24iLCJ1cmwiLCJwYXJhbXMiLCJrZXkiLCJxIiwibGltaXQiLCJkZWR1cGUiLCJub3JtYWxpemVjaXR5IiwidGFnIiwid2VhdGhlciIsImRheXMiLCJnZXRMb2NhdGlvbkFwaVVSTCIsInF1ZXJ5IiwicG9wdWxhdGVQYXJhbXMiLCJnZXRXZWF0aGVyQXBpVVJMIiwiX3JlZiIsImNpdHkiLCJsYXQiLCJsb24iLCJlbmNvZGVVUklDb21wb25lbnQiLCJFcnJvciIsImJhc2VVcmwiLCJxdWVyeVN0cmluZyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJqb2luIiwiZGlzcGxheURhdGEiLCJjcmVhdGVOb3RpZmljYXRpb24iLCJzaG93TG9hZGVyIiwiaGlkZUxvYWRlciIsImZldGNoRGF0YSIsInJlc3BvbnNlIiwiZmV0Y2giLCJtb2RlIiwib2siLCJkYXRhIiwianNvbiIsImZldGNoQW5kRGlzcGxheURhdGEiLCJ0aGVuIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJmb3JtYXQiLCJnZXRMb2NhdGlvbkRhdGEiLCJkYXRlIiwidGltZSIsImxvY2FsdGltZSIsInNwbGl0IiwiZm9ybWF0dGVkRGF0ZSIsImZvcm1hdERhdGUiLCJmb3JtYXR0ZWRUaW1lIiwiZm9ybWF0VGltZSIsImNvdW50cnkiLCJuYW1lIiwidHpfaWQiLCJyZWdpb24iLCJnZXRDdXJyZW50RGF0YSIsImNsb3VkcyIsImNsb3VkIiwiY29kZSIsImNvbmRpdGlvbiIsImljb24iLCJpY29uQ29kZSIsImV4dHJhY3RJY29uQ29kZSIsInRleHQiLCJodW1pZGl0eSIsInV2Iiwid2luZERpciIsIndpbmRfZGlyIiwiZmVlbHNMaWtlIiwibWV0cmljIiwiZmVlbHNsaWtlX2MiLCJpbXBlcmlhbCIsImZlZWxzbGlrZV9mIiwidGVtcCIsInRlbXBfYyIsIk1hdGgiLCJyb3VuZCIsInRlbXBfZiIsIndpbmQiLCJ3aW5kX2twaCIsIndpbmRfbXBoIiwicHJlY2lwaXRhdGlvbiIsInByZWNpcF9tbSIsInByZWNpcF9pbiIsImlzRGF5IiwiaXNfZGF5IiwiZ2V0Rm9yZWNhc3REYXRhIiwiZm9yZWNhc3REYXlzIiwiZm9yZWNhc3RkYXkiLCJkYXkiLCJhc3RybyIsInN1bnJpc2UiLCJzdW5zZXQiLCJjb25kaXRpb25JY29uIiwiY2hhbmNlT2ZSYWluIiwiZGFpbHlfY2hhbmNlX29mX3JhaW4iLCJjaGFuY2VPZlNub3ciLCJkYWlseV9jaGFuY2Vfb2Zfc25vdyIsIm1heCIsIm1heHRlbXBfYyIsIm1heHRlbXBfZiIsIm1pbiIsIm1pbnRlbXBfYyIsIm1pbnRlbXBfZiIsInByZWNpcCIsInRvdGFscHJlY2lwX21tIiwidG90YWxwcmVjaXBfaW4iLCJjdXJyZW50RGF0ZSIsIkRhdGUiLCJjdXJyZW50SG91ciIsImdldEhvdXJzIiwibmV4dDI0SG91cnMiLCJjdXJyZW50RGF5SG91cnMiLCJob3VyIiwic2xpY2UiLCJyZW1haW5pbmdIb3VycyIsImxlbmd0aCIsImkiLCJuZXh0RGF5SG91cnMiLCJjb25jYXQiLCJmb3JtYXREYXlEYXRlIiwiY2hhbmNlX29mX3JhaW4iLCJjaGFuY2Vfb2Zfc25vdyIsInZhbHVlIiwicmVwbGFjZSIsInRpbWVTdHJpbmciLCJob3VycyIsIm1pbnMiLCJnZXRNaW51dGVzIiwidG9TdHJpbmciLCJwYWRTdGFydCIsInNlY29uZHMiLCJnZXRTZWNvbmRzIiwiZGF5T3JOaWdodCIsInBvcHVsYXRlTG9jYXRpb24iLCJwb3B1bGF0ZUN1cnJlbnQiLCJwb3B1bGF0ZUZvcmVjYXN0IiwiZm9ybWF0ZWRMb2NhdGlvbiIsImZvcm1hdGVkQ3VycmVudCIsImN1cnJlbnQiLCJmb3JtYXRlZEZvcmVjYXN0IiwiZm9yZWNhc3QiLCJnZXRMb2NhdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImRlZmF1bHQiLCJpbmZvIiwid2FybiIsIm1lc3NhZ2UiLCJmZXRjaFVzZXJMb2NhdGlvbiIsInBvcHVsYXRlRE9NRWxlbWVudCIsImdldEZsYWciLCJnZW5lcmF0ZUR1YWxWYWx1ZUZpZWxkcyIsInN1bnJpc2VJY29uIiwic3Vuc2V0SWNvbiIsInVwZGF0ZVRpbWVDb250YWluZXIiLCJzZXREYXlOaWdodENsYXNzZXNPbkJvZHkiLCJjdXJyZW50VGVtcENvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImN1cnJlbnRJY29uQ29udGFpbmVyIiwic3JjIiwiZ2VuZXJhdGVJY29uVXJsIiwiY3VycmVudFRleHRDb250YWluZXIiLCJpbm5lckhUTUwiLCJjdXJyZW50SHVtaWRpdHlDb250YWluZXIiLCJjdXJyZW50V2luZENvbnRhaW5lciIsImN1cnJlbnRQcmVjaXBDb250YWluZXIiLCJjdXJyZW50Q2xvdWRzQ29udGFpbmVyIiwiY3VycmVudFdpbmREaXJDb250YWluZXIiLCJjdXJyZW50VVZDb250YWluZXIiLCJhc3Ryb0NvbnRhaW5lciIsIm5leHREYXlzQ29udGFpbmVyIiwiZm9yRWFjaCIsImRheUNhcmQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZGF5RGF0ZSIsImRheUljb24iLCJzZXRBdHRyaWJ1dGUiLCJkYXlDb25kaXRpb24iLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXlEZXRhaWxzQ29udGFpbmVyIiwidGVtcENvbnRhaW5lck1pbiIsInRlbXBDb250YWluZXJNaW5JY29uIiwidGV4dENvbnRlbnQiLCJ0ZW1wQ29udGFpbmVyTWluRHVhbCIsImFwcGVuZENoaWxkIiwiZGl2aWRlciIsInRlbXBDb250YWluZXJNYXgiLCJ0ZW1wQ29udGFpbmVyTWF4SWNvbiIsInRlbXBDb250YWluZXJNYXhEdWFsIiwiZGF5UHJlY2lwIiwiZGF5UHJlY2lwSWNvbiIsImRheVByZWNpcFZhbHVlcyIsIndlYXRoZXJIb3Vyc0NvbnRhaW5lciIsImluZGV4IiwiaG91ckNhcmQiLCJob3VyRGF0ZSIsImhvdXJWYWx1ZSIsImhvdXJJY29uIiwiaG91ckNvbmRpdGlvbiIsImhvdXJUZW1wIiwiaG91clRlbXBJY29uIiwiaG91clRlbXBWYWx1ZXMiLCJob3VyUHJlY2lwIiwiaG91clByZWNpcEljb24iLCJob3VyUHJlY2lwVmFsdWVzIiwiaG91clJhaW5Tbm93Q2hhbmNlIiwicmFpbkNoYW5jZSIsInBhcnNlSW50Iiwic25vd0NoYW5jZSIsImhvdXJXaW5kIiwiaG91cldpbmRJY29uIiwiaG91cldpbmRWYWx1ZXMiLCJkbiIsInNlYXJjaENpdHkiLCJ1cGRhdGVDdXJyZW50TG9jYXRpb25DYWxsYmFjayIsIm5ld0NpdHlGaWVsZCIsImdldEVsZW1lbnRCeUlkIiwibG9jYXRpb25Gb3JtIiwiaGlkZGVuRmllbGQiLCJoaWRkZW5GaWVsZFVJIiwic2VhcmNoQ29udGFpbmVyIiwicG9wdWxhckJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZHJvcGRvd24iLCJkZWJvdW5jZVRpbWVyIiwibW9iaWxlU2VhcmNoVHJpZ2dlciIsImRlYm91bmNlVGltZW91dCIsImlzU3VibWl0dGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudE5vZGUiLCJib2R5IiwiZSIsInRhcmdldCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIkFycmF5IiwiaXNBcnJheSIsImN1cnJlbnRJbmRleCIsIm9wdGlvbiIsImFkZHJlc3MiLCJjb3VudHJ5X2NvZGUiLCJkaXNwbGF5X25hbWUiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsImRpc3BsYXlfcGxhY2UiLCJ0cmltIiwiZ2V0QXR0cmlidXRlIiwic3VibWl0Rm9ybSIsInJlc2V0IiwiZXZlbnQiLCJpdGVtcyIsImZvY3VzIiwiY2xpY2siLCJ1c2VySW5wdXQiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwibmV3Q2l0eU5hbWUiLCJuZXdDaXR5Q29vcmRzIiwiY2l0eU5hbWUiLCJjaXR5Q29vcmRzIiwiYXBpVVJMIiwibG9nIiwiYmx1ciIsImJ1dHRvbiIsInNlbGVjdGVkQ2l0eSIsInJlbW92ZVNwZWNpYWxDaGFyYWN0ZXJzIiwic3RyIiwibm9ybWFsaXplIiwiY2hhbmdlVW5pdHMiLCJ1cGRhdGVUaW1lIiwiZHJhZ0hvdXJzIiwiY3VycmVudERpc3BsYXllZExvY2F0aW9uIiwiaW5pdFdlYXRoZXJBcHAiLCJpbml0aWFsV2VhdGhlclVybCIsInJlZnJlc2hCdXR0b24iLCJvbmNsaWNrIiwibG9jYXRlTWVCdXR0b24iLCJ1c2VyTG9jYXRpb24iLCJ1c2VyV2VhdGhlckFwaVVSTCIsInNldEludGVydmFsIiwidXBkYXRlQ3VycmVudExvY2F0aW9uIiwibmV3TG9jYXRpb25VcmwiLCJ3ZWF0aGVyTm93Q29udGFpbmVyIiwiY2hhbmdlVW5pdHNCdXR0b24iLCJ1bml0IiwidW5pdFN5c3RlbSIsImxvY2FsVW5pdCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJpbmNsdWRlcyIsInNldEl0ZW0iLCJjb3VudHJ5Q29kZXMiLCJnZXRDb3VudHJ5Q29kZSIsImNvdW50cnlOYW1lIiwiY291bnRyeUNvZGUiLCJmbGFnSWNvbiIsInRvTG93ZXJDYXNlIiwidHlwZSIsIm5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbk1lc3NhZ2UiLCJyZW1vdmVJY29uIiwidG9hc3RUaW1lT3V0IiwiaW50ZXJ2YWxJZCIsInRpbWVDb250YWluZXIiLCJjbGVhckludGVydmFsIiwic2xpZGVycyIsInNsaWRlciIsImlzRG93biIsInN0YXJ0WCIsInNjcm9sbExlZnQiLCJwcmVwYXJlR3JhYiIsInJlbW92ZUdyYWIiLCJzbGlkZU9uRHJhZyIsInBhZ2VYIiwib2Zmc2V0TGVmdCIsInNwZWVkIiwieCIsIndhbGsiLCJyZXNvbHZlVmFsdWVQYXRoIiwiY29udGFpbmVyIiwidmFsdWVQYXRoIiwidW5pdE0iLCJ1bml0SSIsIm1ldHJpY0NvbnRhaW5lciIsImltcGVyaWFsQ29udGFpbmVyIiwibG9jYWxUaW1lQ29udGFpbmVyIiwibm93IiwiU3RyaW5nIiwibWludXRlcyIsImN1cnJlbnRUaW1lIiwic2VsZWN0b3IiLCJjb250ZW50IiwiZWxlbWVudCIsIm9iaiIsInBhdGgiLCJyZWR1Y2UiLCJhY2MiLCJwYXJ0Iiwid2VhdGhlckFwaVVSTCJdLCJzb3VyY2VSb290IjoiIn0=