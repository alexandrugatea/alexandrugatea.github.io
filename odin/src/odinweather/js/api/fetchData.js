import { displayData } from "../components/displayData";
import { createNotification } from "../utils/createNotification";
import { showLoader, hideLoader } from "../utils/showhideLoader";

//Fetches data from a given URL using the Fetch API.
async function fetchData(url) {
	const response = await fetch(url, { mode: "cors" });
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
function fetchAndDisplayData(url, requestedCoords = null) {
	// Show loading indicator
	showLoader();

	// Fetch data from the provided URL
	fetchData(url)
		.then((data) => {
			// console.log(data); // Debug

			// Hide loading indicator
			hideLoader();

			// Check for location mismatch
			if (requestedCoords) {
				const isMismatch = checkLocationMismatch(requestedCoords, data.location);
				if (isMismatch) {
					createNotification("Returned location does not match the requested coordinates", "toast");
				}
			}

			// Display the fetched data
			displayData(data);
		})
		.catch((err) => {
			// Log error to console
			console.error("Error fetching data: ", err);

			// Show a notification to the user
			createNotification("Location not found", "toast");

			// Hide loading indicator
			hideLoader();
		});
}


/**
 * Checks if the returned location coordinates significantly differ from the requested coordinates.
 *
 * @param {object} requestedCoords - The requested coordinates with lat and lon properties.
 * @param {object} returnedLocation - The location object from the API response.
 * @returns {boolean} - Returns true if the coordinates mismatch significantly, false otherwise.
 */
function checkLocationMismatch(requestedCoords, returnedLocation) {
	const { lat: reqLat, lon: reqLon } = requestedCoords;
	const { lat: retLat, lon: retLon } = returnedLocation;

	// Threshold for considering the coordinates as a mismatch (in degrees)
	const threshold = 1;

	return (
		Math.abs(reqLat - retLat) > threshold ||
		Math.abs(reqLon - retLon) > threshold
	);
}

export { fetchData, fetchAndDisplayData, checkLocationMismatch };
