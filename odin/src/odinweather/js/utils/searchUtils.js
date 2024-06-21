import { getWeatherApiURL } from "../api/api";
import { showLoader, hideLoader } from "./showhideLoader";
import { fetchData } from "../api/fetchData";
import { createNotification } from "./createNotification";
import { displayData } from "../components/displayData";

function createSearchInputMessage(dropdownElement, searchedInput = null, loading = false) {
	clearDropdownItems(dropdownElement);
	const message = document.createElement("div");
	message.className = "dropdown-item";

	if (searchedInput && searchedInput.length > 2 && !loading) {
		message.innerHTML = `No locations found for <strong>"${searchedInput}"</strong>`;
	} else if (loading) {
		message.innerHTML = `Searching for <strong>"${searchedInput}"</strong>`;
	} else {
		message.innerHTML = "At least 3 characters are needed for a search";
	}

	dropdownElement.appendChild(message);
}

function createDropdownItem(location, index, options) {
	const {
		newCityField,
		hiddenFieldUI,
		hiddenField,
		requestWeatherDataBasedOn,
		searchContainer,
		locationForm,
		dropdown,
		state,
	} = options;

	const option = document.createElement("div");
	option.classList.add("dropdown-item");
	setAttributes(option, {
		"data-place": location.display_place,
		"data-lat-lon": `${location.lat},${location.lon}`,
		tabindex: -1,
	});

	if (index === 0) {
		option.classList.add("current");
	}
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

	dropdown.appendChild(option);

	option.addEventListener("click", function () {
		newCityField.value = option.querySelector(".dic-name").textContent.trim();
		hiddenFieldUI.value = option.getAttribute("data-place");
		hiddenField.value = option.getAttribute("data-lat-lon");
		requestWeatherDataBasedOn(newCityField.value, hiddenField.value);
		searchContainer.classList.remove("open");
		locationForm.parentNode.classList.remove("mobile-open");
		state.isDropdownActive = false;
	});
}

function clearDropdownItems(dropdownElement) {
	dropdownElement.innerHTML = "";
}

function setAttributes(element, attributes) {
	Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));
}

function openMobileSearchAndFocusIt(form, input) {
	form.parentNode.classList.add("mobile-open");
	input.focus();
}

function dismissSearchOnBodyClickIfOnMobile(e, form, container) {
	const target = form;
	if (!target.contains(e.target)) {
		form.parentNode.classList.remove("mobile-open");
		container.classList.remove("open");
	}
}

function openSearchContainer(container) {
	container.classList.add("open");
}

function handlePopularButtonClick(
	event,
	button,
	searchContainer,
	locationForm,
	newCityField,
	updateCurrentLocationCallback
) {
	event.preventDefault();
	const selectedCity = button.getAttribute("data-id");
	const apiURL = getWeatherApiURL({ city: selectedCity });
	searchContainer.classList.remove("open");
	locationForm.parentNode.classList.remove("mobile-open");
	window.scroll({
		top: 0, 
		left: 0, 
		behavior: 'smooth' 
	});
	showLoader();
	fetchData(apiURL)
		.then((data) => {
			hideLoader();
			// console.log(data); // Debugging log
			displayData(data);
			newCityField.blur();
			updateCurrentLocationCallback(apiURL);
		})
		.catch((err) => {
			console.error(err); // Debugging log
			createNotification("Location not found", "toast");
			hideLoader();
		});
}

// Add arrow navigation functionality
// so the user can use arrows to navigate the dropdown results
function handleKeyDown(
	event,
	dropdownElement,
	state,
	form,
	newCityField,
	hiddenFieldUI,
	hiddenField,
	requestWeatherDataBasedOn,
	searchContainer
) {
	const items = dropdownElement.querySelectorAll(".dropdown-item");

	if (event.key === "ArrowDown") {
		event.preventDefault();
		if (items.length === 0) return;
		items[state.currentIndex].classList.remove("current");
		state.currentIndex = (state.currentIndex + 1) % items.length;
		items[state.currentIndex].classList.add("current");
		items[state.currentIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
	} else if (event.key === "ArrowUp") {
		event.preventDefault();
		if (items.length === 0) return;
		items[state.currentIndex].classList.remove("current");
		state.currentIndex = (state.currentIndex - 1 + items.length) % items.length;
		items[state.currentIndex].classList.add("current");
		items[state.currentIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
	} else if (event.key === "Enter") {
		event.preventDefault();
		if (state.isDropdownActive && items[state.currentIndex]) {
			items[state.currentIndex].click();
		} else {
			if (newCityField.value === "" || newCityField.value.length < 3) {
				createNotification("Please type a location", "toast");
				return;
			}

			const newCityName = hiddenFieldUI.value;
			const newCityCoords = hiddenField.value;
			requestWeatherDataBasedOn(newCityName, newCityCoords);
			form.parentNode.classList.remove("mobile-open");

			clearDropdownItems(dropdownElement);
			searchContainer.classList.remove("open");
		}
	} else if (event.key === "Escape") {
		clearDropdownItems(dropdownElement);
		form.reset();
		state.isDropdownActive = false;
	}
}

export {
	dismissSearchOnBodyClickIfOnMobile,
	openMobileSearchAndFocusIt,
	createSearchInputMessage,
	createDropdownItem,
	clearDropdownItems,
	openSearchContainer,
	handleKeyDown,
	handlePopularButtonClick,
};
