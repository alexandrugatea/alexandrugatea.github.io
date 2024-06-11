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

    let debounceTimeout;

    newCityField.addEventListener("input", function () {
        hiddenField.value = newCityField.value;
        hiddenFieldUI.value = newCityField.value;

        clearTimeout(debounceTimeout);
        const query = this.value;

        if (query.length > 2) {
            debounceTimeout = setTimeout(() => {
                const url = getLocationApiURL(query);
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        if (!Array.isArray(data)) return;

                        dropdown.innerHTML = "";
                        let currentIndex = -1;
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
                                searchContainer.classList.remove("open");
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
                        alert.innerHTML = `No locations found for <strong>${userInput}</strong>`;
                        dropdown.appendChild(alert);
                    });
            }, 400);
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
            const apiURL = getWeatherApiURL({ city: newCity });

            showLoader();
            fetchData(apiURL)
                .then((data) => {
                    hideLoader();
                    displayData(data);
                    updateCurrentLocationCallback(apiURL);  // Update current displayed location
                    locationForm.reset();
                })
                .catch((err) => {
                    createNotification("Location not found", "toast");
                    hideLoader();
                });
        } else {
            alert("Please enter a city name");
        }
    });

    newCityField.addEventListener("click", function () {
        searchContainer.classList.add("open");
    });

    popularButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const selectedCity = button.textContent;
            const apiURL = getWeatherApiURL({ city: selectedCity });
            searchContainer.classList.remove("open");
            showLoader();
            fetchData(apiURL)
                .then((data) => {
                    hideLoader();
                    displayData(data);
                    updateCurrentLocationCallback(apiURL);  // Update current displayed location
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


export { searchCity }