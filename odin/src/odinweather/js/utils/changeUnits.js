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

export { changeUnits }
