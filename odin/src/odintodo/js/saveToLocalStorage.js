import { projects } from "..";
import { notes } from "..";

export default function saveToLocalStorage() {
	localStorage.setItem("projects", JSON.stringify(projects));
	localStorage.setItem("notes", JSON.stringify(notes));
}
