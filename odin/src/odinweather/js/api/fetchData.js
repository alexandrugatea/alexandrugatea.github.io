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
function fetchAndDisplayData(url) {
	// Show loading indicator
	showLoader();

	// Fetch data from the provided URL
	fetchData(url)
		.then((data) => {
			console.log(data); // Debug

			// Hide loading indicator
			hideLoader();

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

export { fetchData, fetchAndDisplayData };
