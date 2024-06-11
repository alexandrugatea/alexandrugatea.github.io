import { displayData } from "../components/displayData";
import { createNotification } from "../utils/createNotification";
import { showLoader, hideLoader } from "../utils/showhideLoader";

async function fetchData(url) {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}

function fetchAndDisplayData(url) {
    showLoader();
    fetchData(url)
        .then((data) => {
            hideLoader();
            displayData(data);
        })
        .catch((err) => {
            console.error("Error fetching data: ", err);
            createNotification("Location not found", "toast");
            hideLoader();
        });
}

export { fetchData, fetchAndDisplayData }