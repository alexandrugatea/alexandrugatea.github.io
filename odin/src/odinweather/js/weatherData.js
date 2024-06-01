import { format } from "date-fns";

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
			time: formattedTime,
		},
		tz_id: data.tz_id,
		region: data.region,
	};
}

function getCurrentData(data) {
	return {
		clouds: data.cloud,
		code: data.condition.code,
		icon: data.condition.icon,
		text: data.condition.text,
		humidity: data.humidity,
		uv: data.uv,
		windDir: data.wind_dir,
		feelsLike: {
			metric: data.feelslike_c,
			imperial: data.feelslike_f,
		},
		temp: {
			metric: data.temp_c,
			imperial: Math.round(data.temp_f),
		},
		wind: {
			metric: data.wind_kph,
			imperial: data.wind_mph,
		},
		precipitation: {
			metric: data.precip_mm,
			imperial: data.precip_in,
		},
		isDay: data.is_day,
	};
}

function getForecastData(data, location) {
	const forecastDays = data.forecastday.map((day) => {
		return {
			date: formatDate(day.date),
			astro: {
				sunrise: day.astro.sunrise,
				sunset: day.astro.sunset,
			},
			condition: day.day.condition.text,
			conditionIcon: day.day.condition.icon,
			temp: {
				max: {
					metric: day.day.maxtemp_c,
					imperial: day.day.maxtemp_f,
				},
				min: {
					metric: day.day.mintemp_c,
					imperial: day.day.mintemp_f,
				},
			},
			precip: {
				metric: day.day.totalprecip_mm,
				imperial: day.day.totalprecip_in,
			},
		};
	});

	const currentDate = new Date(location.localtime);
	const currentHour = currentDate.getHours();
	let next24Hours = [];

	const currentDayHours = data.forecastday[0].hour.slice(currentHour);

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

	next24Hours = next24Hours.map((hour) => {
		const time = hour.time.split(" ")[1];
		const date = hour.time.split(" ")[0];

		return {
			date: formatDayDate(date),
			time: time,
			temp: {
				metric: hour.temp_c,
				imperial: hour.temp_f,
			},
			feelsLike: {
				metric: hour.feelslike_c,
				imperial: hour.feelslike_f,
			},
			precip: {
				metric: hour.precip_mm,
				imperial: hour.precip_in,
			},
			wind: {
				metric: hour.wind_kph,
				imperial: hour.wind_mph,
			},
			condition: hour.condition.text,
			conditionIcon: hour.condition.icon,
		};
	});

	return {
		forecastDays,
		currentDayHours: next24Hours,
	};
}

const formatDate = (value) => {
	const formattedDate = format(value, "E, MMMM do, yyyy");
	return formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
};

const formatDayDate = (value) => {
	const formattedDate = format(value, "E, do");
	return formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
};

const formatTime = (timeString) => {
	const [hours, mins] = timeString.split(":");
	const formattedTime = `${hours.padStart(2, "0")}:${mins.padStart(2, "0")}`;
	return formattedTime;
};

export { getLocationData, getCurrentData, getForecastData };
