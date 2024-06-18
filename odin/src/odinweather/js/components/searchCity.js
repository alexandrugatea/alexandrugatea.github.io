import { showLoader, hideLoader } from "../utils/showhideLoader";
import { fetchData } from "../api/fetchData";
import { displayData } from "./displayData";
import { createNotification } from "../utils/createNotification";
import { getLocationApiURL, getWeatherApiURL } from "../api/api";

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


    mobileSearchTrigger.addEventListener('click', function() {
        locationForm.parentNode.classList.add("mobile-open");
    });

    document.body.addEventListener("click", function(e) {
        const target = document.querySelector('.weather-header');
        if (!target.contains(e.target))  {
            locationForm.parentNode.classList.remove("mobile-open");
            dropdown.innerHTML = "";
            searchContainer.classList.remove("open");
        };
    });

    newCityField.addEventListener("input", function () {
        hiddenFieldUI.value = newCityField.value;

        clearTimeout(debounceTimeout);
        const query = this.value;

        if (query.length > 2 && !isSubmitted) {
            debounceTimeout = setTimeout(() => {
                const url = getLocationApiURL(query);
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        dropdown.innerHTML = "";
                        if (!Array.isArray(data) || data.length === 0) {
                            throw new Error("No locations found");
                        }

                        let currentIndex = -1;
                        data.forEach((location) => {
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
                    })
                    .catch(() => {
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
            createNotification("Please type a location", "toast");
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
            apiURL = getWeatherApiURL({ lat, lon });
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
                updateCurrentLocationCallback(apiURL); // Update current displayed location
                locationForm.reset();
				newCityField.blur();
				isSubmitted = false;
            })
            .catch((err) => {
                createNotification("Location not found", "toast");
                hideLoader();
            });
    }

    newCityField.addEventListener("click", function () {
        searchContainer.classList.add("open");
    });

    popularButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const selectedCity = button.getAttribute("data-id");
            const apiURL = getWeatherApiURL({ city: selectedCity });
            searchContainer.classList.remove("open");
            showLoader();
            fetchData(apiURL)
                .then((data) => {
                    hideLoader();
                    displayData(data);
                    newCityField.blur();
                    updateCurrentLocationCallback(apiURL); // Update current displayed location
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

export { searchCity };
