import { showLoader, hideLoader } from "../utils/showhideLoader";
import { fetchData, checkLocationMismatch } from "../api/fetchData";
import { displayData } from "./displayData";
import { createNotification } from "../utils/createNotification";
import { getLocationApiURL, getWeatherApiURL } from "../api/api";
import {
	handleKeyDown,
	createSearchInputMessage,
	createDropdownItem,
	clearDropdownItems,
	openSearchContainerAndChangeIcon,
	dismissSearchOnBodyClickIfOnMobile,
	openMobileSearchAndFocusIt,
	handlePopularButtonClick,
	changeSubmitButtonIcon,
	resetFormAndFocusInput
} from "../utils/searchUtils";

// Get Existing DOM elements
const newCityField = document.getElementById("newLocationField");
const locationForm = document.getElementById("newLocationForm");
const formSubmitButton = document.getElementById("submitForm");
const hiddenField = document.getElementById("valueToFetchWeather");
const hiddenFieldUI = document.getElementById("valueToDisplyOnUI");
const searchContainer = document.querySelector(".search-results-container");
const popularButtons = document.querySelectorAll(".popular-place");
const dropdown = document.getElementById("searchResults");
const mobileSearchTrigger = document.getElementById("mobileSearchTrigger");
const body = document.body;
const debounceTimer = 200;
let debounceTimeout;

const submitButtonIcons = {
	search: "search",
	delete: "close"
}

const state = {
	currentIndex: 0,
	isDropdownActive: false,
};

function searchCity(updateCurrentLocationCallback) {
	mobileSearchTrigger.addEventListener("click", () => openMobileSearchAndFocusIt(locationForm, newCityField, newCityField.value, formSubmitButton, submitButtonIcons.delete));
	body.addEventListener("click", (e) => dismissSearchOnBodyClickIfOnMobile(e, locationForm, searchContainer, formSubmitButton, submitButtonIcons.search));

	newCityField.addEventListener("input", function () {
		const query = this.value;

		// Grab current value in a hidden input for later use.
		hiddenFieldUI.value = newCityField.value;
		clearTimeout(debounceTimeout);

		// Change search button icon if tere is at least one character in the input field.
		query.length > 0 ? 
		changeSubmitButtonIcon(formSubmitButton, submitButtonIcons.delete) :
		changeSubmitButtonIcon(formSubmitButton, submitButtonIcons.search);
		
		// Display a message if query is empty or has less than 3 characters
		if (query.length >= 0 && query.length <= 2) {
			return createSearchInputMessage(dropdown);
		}

		if (query.length > 2) {
			debounceTimeout = setTimeout(() => {
				// Create an API URL based on user's input
				const url = getLocationApiURL(query);

				// Display a message for user informing about API searching for his input
				// based on network speed, this message can or cannot be seen.
				createSearchInputMessage(dropdown, query, true);

				fetch(url)
					.then((response) => response.json())
					.then((data) => {
						clearDropdownItems(dropdown);
						openSearchContainerAndChangeIcon(searchContainer, newCityField.value, formSubmitButton, submitButtonIcons.delete);
						state.isDropdownActive = true;

						if (!Array.isArray(data) || data.length === 0) {
							throw new Error("No locations found");
						}

						data.forEach((location, index) => {
							createDropdownItem(location, index, {
								newCityField,
								hiddenFieldUI,
								hiddenField,
								requestWeatherDataBasedOn,
								searchContainer,
								locationForm,
								dropdown,
								state,
								formSubmitButton,
								submitButtonIcons
							});
						});

						state.currentIndex = 0;
					})
					.catch((err) => {
						console.warn(err);
						createSearchInputMessage(dropdown, query, false);
					});
			}, debounceTimer);
		}
	});

	document.removeEventListener("keydown", handleKeyDownWrapper);
	document.addEventListener("keydown", handleKeyDownWrapper);

	locationForm.addEventListener("submit", function (e) {
		e.preventDefault();
		
		resetFormAndFocusInput(
			formSubmitButton,
			submitButtonIcons.search,
			dropdown,
			locationForm,
			newCityField
		);
	});

	function handleKeyDownWrapper(event) {
		handleKeyDown(
			event,
			dropdown,
			state,
			locationForm,
			newCityField,
			hiddenFieldUI,
			hiddenField,
			requestWeatherDataBasedOn,
			searchContainer
		);
	}

	function requestWeatherDataBasedOn(cityName, cityCoords) {
		let apiURL;
		let requestedCoords = null;

		if (cityCoords) {
			const [lat, lon] = cityCoords.split(",");
			apiURL = getWeatherApiURL({ lat, lon });
			requestedCoords = { lat: parseFloat(lat), lon: parseFloat(lon) };
		} else if (cityName) {
			apiURL = getWeatherApiURL({ city: cityName });
		} else {
			alert("Please enter a city name");
			return;
		}

		showLoader();
		fetchData(apiURL)
			.then((data) => {
				hideLoader();
				displayData(data);
				updateCurrentLocationCallback(apiURL);
				newCityField.blur();

				// Check for location mismatch after data is displayed
				if (requestedCoords) {
				const isMismatch = checkLocationMismatch(requestedCoords, data.location);
				if (isMismatch) {
					createNotification("WeatherAPI failed to retrieve data for this location and has defaulted to a different location", "toast", 6000);
				}
			}
			})
			.catch((err) => {
				createNotification("Location not found", "toast");
				hideLoader();
			});
	}

	newCityField.addEventListener("click", () => openSearchContainerAndChangeIcon(searchContainer, newCityField.value, formSubmitButton, submitButtonIcons.delete));

	popularButtons.forEach((button) => {
		button.addEventListener("click", function (e) {
			changeSubmitButtonIcon(formSubmitButton, submitButtonIcons.search)
			handlePopularButtonClick(
				e,
				button,
				searchContainer,
				locationForm,
				newCityField,
				updateCurrentLocationCallback
			);
		});
	});
}

export { searchCity };
