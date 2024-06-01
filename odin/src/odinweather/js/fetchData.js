export default async function fetchData(url) {
	const response = await fetch(url, { mode: "cors" });
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data;
}
