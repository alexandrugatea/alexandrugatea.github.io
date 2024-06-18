function updateTime(data, timeContainer) {
	const [hours] = data.localtime.time.split(":");
	const now = new Date();
	const minutes = now.getMinutes().toString().padStart(2, "0");
	const seconds = now.getSeconds().toString().padStart(2, "0");
	const formattedTime = `${hours}:${minutes}:${seconds}`;
	timeContainer.innerHTML = `${data.localtime.date}, ${formattedTime}`;
}

export { updateTime };
