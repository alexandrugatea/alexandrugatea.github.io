function createNotification(text, type, timer = 3000) {
	const notification = document.createElement("div");
	notification.classList.add(type);

	const notificationMessage = document.createElement("p");
	notificationMessage.classList.add(`${type}-message`);
	notificationMessage.innerHTML = `<span>${text}</span>`;

	const removeIcon = document.createElement("i");
	removeIcon.textContent = "close";

	// Define the size of the progress circle
	const progressSize = 40;
	const strokeWidth = 3;
	const radius = progressSize / 2 - strokeWidth; // Subtract stroke width (2)
	const circumference = 2 * Math.PI * radius;

	// Create the progress circle
	const progressCircle = document.createElement("div");
	progressCircle.classList.add("progress-circle");
	progressCircle.style.width = `${progressSize}px`;
	progressCircle.style.height = `${progressSize}px`;
	progressCircle.innerHTML = `
		<svg width="${progressSize}" height="${progressSize}">
			<circle cx="${progressSize / 2}" 
					cy="${progressSize / 2}" 
					r="${radius}" 
					stroke-dasharray="${circumference}" 
					stroke-width="${strokeWidth}"
					stroke-dashoffset="0"></circle>
		</svg>
	`;
	removeIcon.appendChild(progressCircle);

	notificationMessage.appendChild(removeIcon);
	notification.appendChild(notificationMessage);
	document.body.appendChild(notification);

	setTimeout(function () {
		notification.classList.add("open");
	}, 100);

	removeIcon.addEventListener("click", function () {
		notification.classList.remove("open");

		setTimeout(function () {
			notification.remove();
		}, 350);
	});

	const toastTimeOut = timer;

	if (type === "toast") {
		const circle = progressCircle.querySelector("circle");
		setTimeout(() => {
			circle.style.transition = `stroke-dashoffset ${toastTimeOut}ms linear`;
			circle.style.strokeDashoffset = circumference;
		}, 100);

		setTimeout(function () {
			notification.classList.remove("open");
		}, toastTimeOut + 200);
		setTimeout(function () {
			notification.remove();
		}, toastTimeOut * 2);
	}
}

export { createNotification };
