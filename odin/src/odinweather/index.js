import "./scss/style.scss";
import initWeatherApp from "./js/init";
import changeUnits from "./js/changeUnits";
import updateTime from "./js/localTime";
import dragHours from "./js/drag,js";

document.addEventListener("DOMContentLoaded", function () {
	const refresh = document.getElementById("refresh");

	// init weather app
	initWeatherApp();

	//
	changeUnits();

	setInterval(updateTime, 1000);
	updateTime();
	dragHours();

	// reinit weather app on button click
	refresh.onclick = function () {
		initWeatherApp();
	};
});
