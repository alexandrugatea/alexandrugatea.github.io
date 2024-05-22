import notesHTML from "../layouts/notes.html";

export default function injectNotes() {
	const notesHTMLContainer = document.querySelector("#notes");
	const notes = notesHTML;
	notesHTMLContainer.innerHTML = notes;
}
