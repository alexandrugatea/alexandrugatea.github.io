function updateTime() {
	const localTimeContainer = document.getElementById("localTime");
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");
	const currentTime = `
        <span class="local-time hours">${hours}</span>
        <span class="local-time divider">:</span>
        <span class="local-time minutes">${minutes}</span>
        <span class="local-time divider">:</span>
        <span class="local-time seconds">${seconds}</span>
    `;

	localTimeContainer.innerHTML = currentTime;
}

export { updateTime };
