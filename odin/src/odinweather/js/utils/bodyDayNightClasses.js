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

export { setDayNightClassesOnBody };
