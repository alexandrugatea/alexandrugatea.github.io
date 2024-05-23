import projectModal from "../layouts/projectmodal.html";
import taskModal from "../layouts/taskmodal.html";
import notesModal from "../layouts/notesmodal.html";
import confirmationModal from "../layouts/confirmationmodal.html";

export default function injectModals() {
	const modalsContainer = document.querySelector("#modals");
	modalsContainer.innerHTML += projectModal;
	modalsContainer.innerHTML += taskModal;
	modalsContainer.innerHTML += notesModal;
	modalsContainer.innerHTML += confirmationModal;
}
