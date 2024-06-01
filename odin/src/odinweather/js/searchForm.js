import { showLoader, hideLoader } from "./showhideLoader";
import fetchData from "./fetchData";
import displayData from "./displayData";
import createNotification from "./createNotification";

export default function searchCity() {
	const apiKey = "pk.fa6e80804f9289787659846f822b3ee3";
	const limit = 5;
	const dedupe = 1;
	const newCityField = document.getElementById("newLocationField");
	const locationForm = document.getElementById("newLocationForm");
	const hiddenField = document.getElementById("valueToFetchWeather");
	const hiddenFieldUI = document.getElementById("valueToDisplyOnUI");

	let debounceTimeout;

	newCityField.addEventListener("input", function () {
		hiddenField.value = newCityField.value;
		hiddenFieldUI.value = newCityField.value;

		clearTimeout(debounceTimeout);
		const query = this.value;

		if (query.length > 2) {
			debounceTimeout = setTimeout(() => {
				const url = `https://api.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${query}&limit=${limit}&dedupe=${dedupe}`;
				const dropdown = document.getElementById("searchResults");
				fetch(url)
					.then((response) => response.json())
					.then((data) => {
						if (!Array.isArray(data)) {
							return;
							// throw new Error('Data is not an array');
						}

						// console.log(data);

						// Clear existing options
						dropdown.innerHTML = "";
						let currentIndex = -1;
						// Populate the dropdown
						data.forEach((location, index) => {
							const option = document.createElement("div");
							option.classList.add("dropdown-item");
							option.textContent = location.display_name;
							option.setAttribute("data-place", location.display_place);
							option.setAttribute("tabindex", -1);
							dropdown.appendChild(option);

							option.addEventListener("click", function () {
								newCityField.value = option.textContent;
								hiddenFieldUI.value = option.getAttribute("data-place");
								hiddenField.value = removeSpecialCharacters(option.getAttribute("data-place"));
								dropdown.innerHTML = "";
								locationForm.requestSubmit();
								locationForm.reset();
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
					})
					.catch((error) => {
						dropdown.innerHTML = "";
						const userInput = newCityField.value;

						const alert = document.createElement("div");
						alert.classList.add("dropdown-item");
						alert.innerHTML = `No locations found for <strong>${userInput}</strong>`;
						dropdown.appendChild(alert);
					});
			}, 100);
		}
	});

	locationForm.addEventListener("submit", function (e) {
		e.preventDefault();

		if (newCityField.value === "" || newCityField.value.length < 3) {
			createNotification("Please type a location", "toast");
			return;
		}

		const dropdown = document.getElementById("searchResults");
		dropdown.innerHTML = "";

		const newCity = hiddenField.value;

		if (newCity) {
			const apiKey = "62853d9a45c1413b89f201737240106";
			const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${newCity}&days=7`;

			// show a loader before starting to fetch data
			showLoader();
			fetchData(apiURL)
				.then((data) => {
					console.log(data);
					// hide the loader when data was fetched
					hideLoader();
					// display data on DOM
					displayData(data);
					locationForm.reset();
					// const specialName = document.getElementById("valueToDisplyOnUI").value;
					// const cityContainer = document.getElementById("locationCity");
					// cityContainer.innerHTML = `${specialName}`;
				})
				.catch((err) => {
					// console.error("Error fetching data: ", err);
					createNotification("Location not found", "toast");
					hideLoader();
				});
		} else {
			alert("Please enter a city name");
		}
	});

	const popularButtons = document.querySelectorAll(".popular-place");

	popularButtons.forEach((button) => {
		button.addEventListener("click", function (e) {
			e.preventDefault();
			const selectedCity = button.textContent;
			const apiKey = "62853d9a45c1413b89f201737240106";
			const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${selectedCity}&days=7`;

			showLoader();
			fetchData(apiURL)
				.then((data) => {
					console.log(data);
					hideLoader();
					displayData(data);
					locationForm.reset();
				})
				.catch((err) => {
					createNotification("Location not found", "toast");
					hideLoader();
				});
		});
	});
}

function removeSpecialCharacters(str) {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
