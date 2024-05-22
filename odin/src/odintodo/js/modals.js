import projectModal from "../layouts/projectmodal.html";
import taskModal from "../layouts/taskmodal.html";
import notesModal from "../layouts/notesmodal.html";
import confirmationModal from "../layouts/confirmationmodal.html";
import { format } from "date-fns";

export default function injectModals() {
	const modalsContainer = document.querySelector("#modals");
	modalsContainer.innerHTML += projectModal;
	modalsContainer.innerHTML += taskModal;
	modalsContainer.innerHTML += notesModal;
	modalsContainer.innerHTML += confirmationModal;

	const dueDateInput = document.getElementById("dueDate");
	// const dueTimeInput = document.getElementById("dueTime");
	setCurrentDate(dueDateInput);
}

function setCurrentDate(dueDateInput) {
	const now = new Date();
	const formattedDate = format(now, "yyyy-MM-dd");

	dueDateInput.value = formattedDate;
}
