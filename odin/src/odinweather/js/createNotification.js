export default function createNotification(text, type) {
	const notification = document.createElement("div");
	notification.classList.add(type);

	const notificationMessage = document.createElement("p");
	notificationMessage.classList.add(`${type}-message`);
	notificationMessage.innerHTML = text;
	notification.appendChild(notificationMessage);

	const removeIcon = document.createElement("span");
	removeIcon.classList.add("icon");
	removeIcon.textContent = "close";

	notification.appendChild(removeIcon);
	document.body.appendChild(notification);

	setTimeout(function () {
		notification.classList.add("open");
	}, 300);

	removeIcon.addEventListener("click", function () {
		notification.classList.remove("open");

		setTimeout(function () {
			notification.remove();
		}, 300);
	});

	const toastTimeOut = 3000;

	if (type === "toast") {
		setTimeout(function () {
			notification.classList.remove("open");
		}, toastTimeOut);
		setTimeout(function () {
			notification.remove();
		}, toastTimeOut * 2);
	}
}
