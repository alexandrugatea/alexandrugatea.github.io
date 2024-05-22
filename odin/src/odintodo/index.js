import "./scss/style.scss";

import Project from "./js/project";
import ToDo from "./js/todo";

import injectModals from "./js/modals";
import injectSidebar from "./js/sidebar";
import injectNotes from "./js/notes";

import { defaultProjects, defaultNotes, formatDate } from "./js/defaults";

import { showModal, hideModal } from "./js/showHideModals";
import saveToLocalStorage from "./js/saveToLocalStorage";
import filterTasksByDate from "./js/filterTasks";
import displayTasks from "./js/displayTasks";
// import appendTask from "./js/appendTask";

injectModals();
injectSidebar();
injectNotes();

function createProjectFromData(projectData) {
	const newProject = new Project(projectData.name, projectData.description);
	projectData.todos.forEach((todoData) => {
		const todo = new ToDo(
			todoData.name,
			todoData.dueDate,
			todoData.priority,
			todoData.projectName,
			todoData.completed
		);
		newProject.addTodo(todo);
	});
	return newProject;
}
export let projects =
	JSON.parse(localStorage.getItem("projects")) || Object.values(defaultProjects).map(createProjectFromData);

projects = projects.map(createProjectFromData);

export let notes = JSON.parse(localStorage.getItem("notes")) || defaultNotes;
export let currentProject = projects[0].name || "";

const addProjectBtn = document.getElementById("addProjectBtn");
const addTaskBtn = document.getElementById("addTaskBtn");
const addNoteBtn = document.getElementById("addNoteBtn");
const viewAllBtn = document.getElementById("viewAllBtn");
const todayBtn = document.getElementById("todayBtn");
const tomorrowBtn = document.getElementById("tomorrowBtn");
const thisWeekBtn = document.getElementById("thisWeekBtn");
const nextWeekBtn = document.getElementById("nextWeekBtn");
const projectModal = document.getElementById("projectModal");
const taskModal = document.getElementById("taskModal");
const noteModal = document.getElementById("noteModal");
const closeProjectModal = document.getElementById("closeProjectModal");
const closeTaskModal = document.getElementById("closeTaskModal");
const closeNoteModal = document.getElementById("closeNoteModal");
const confirmationModal = document.getElementById("confirmationModal");
const closeConfirmationModal = document.getElementById("closeConfirmationModal");
const saveProjectBtn = document.getElementById("projectForm");
const saveTaskBtn = document.getElementById("taskForm");
const saveNoteBtn = document.getElementById("noteForm");
const tasksContainer = document.getElementById("tasksContainer");
const notesContainer = document.getElementById("notesContainer");
const projectSelect = document.getElementById("projectSelect");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
export const modalsContainer = document.getElementById("modals");

let deleteAction = null;

function disableAddProjectBtn() {
	if (projects.length >= 5) {
		addProjectBtn.setAttribute("disabled", "disabled");
	} else {
		addProjectBtn.removeAttribute("disabled");
	}
}

addProjectBtn.onclick = () => showModal(projectModal, modalsContainer);
addTaskBtn.onclick = () => showModal(taskModal, modalsContainer, currentProject);
addNoteBtn.onclick = () => showModal(noteModal, modalsContainer);
viewAllBtn.onclick = () => displayTasks(projects);
todayBtn.onclick = () => filterTasksByDate("today", projects, tasksContainer);
tomorrowBtn.onclick = () => filterTasksByDate("tomorrow", projects, tasksContainer);
thisWeekBtn.onclick = () => filterTasksByDate("thisWeek", projects, tasksContainer);
nextWeekBtn.onclick = () => filterTasksByDate("nextWeek", projects, tasksContainer);
closeProjectModal.onclick = () => hideModal(projectModal, modalsContainer);
closeTaskModal.onclick = () => hideModal(taskModal, modalsContainer);
closeNoteModal.onclick = () => hideModal(noteModal, modalsContainer);
closeConfirmationModal.onclick = () => hideConfirmationModal();
cancelDeleteBtn.onclick = () => hideConfirmationModal();
confirmDeleteBtn.onclick = () => {
	if (deleteAction) {
		deleteAction();
		hideConfirmationModal();
	}
};

export function showConfirmationModal(message, elementName, action) {
	document.getElementById("conformationModalElement").textContent = message;
	document.getElementById("confirmationMessage").textContent = elementName;
	deleteAction = action;
	modalsContainer.classList.add("open");
	confirmationModal.classList.add("open");
}

export function hideConfirmationModal() {
	modalsContainer.classList.remove("open");
	confirmationModal.classList.remove("open");
	deleteAction = null;
}

saveProjectBtn.onclick = () => {
	const name = document.getElementById("projectName").value;
	const description = document.getElementById("projectDescription").value;
	if (name) {
		const project = new Project(name, description);
		projects.push(project);
		saveToLocalStorage();
		displayProjects();
		hideModal(projectModal, modalsContainer);
		document.getElementById("projectName").value = "";
		document.getElementById("projectDescription").value = "";
		disableAddProjectBtn();
	}
};

saveTaskBtn.onsubmit = (e) => {
	e.preventDefault();
	const taskName = document.getElementById("taskName").value;
	const dueDate = document.getElementById("dueDate").value;
	const projectName = projectSelect.value;

	// Get the selected priority from the radio buttons
	const priority = document.querySelector('input[name="priority"]:checked').value;

	if (taskName && dueDate && projectName && priority) {
		const todo = new ToDo(taskName, dueDate, priority, projectName);
		const projectIndex = projects.findIndex((p) => p.name === projectName);
		const project = projects[projectIndex];
		project.addTodo(todo);
		saveToLocalStorage();
		displayTasks(projects, projectIndex);
		hideModal(taskModal, modalsContainer);
	}
};

saveNoteBtn.onclick = () => {
	const noteText = document.getElementById("noteText").value;
	if (noteText) {
		const dateAdded = formatDate(new Date());
		notes.push({ text: noteText, dateAdded });
		saveToLocalStorage();
		displayNotes();
		hideModal(noteModal, modalsContainer);
	}
};

function displayProjects() {
	const projectList = document.getElementById("projectList");
	projectList.innerHTML = "";
	projects.forEach((project, projectIndex) => {
		project.sortTodos();
		const projectItem = document.createElement("div");
		projectItem.className = "list-item";
		if (project.name === "Default") {
			projectItem.innerHTML = `<button class="project-button" data-index="${projectIndex}">${project.name}</button> <span class="project-description">${project.description}</span>`;
		} else {
			projectItem.innerHTML = `<button class="project-button" data-index="${projectIndex}">${project.name}</button>
                                     <button class="delete-project" data-index="${projectIndex}"><span class="icon">delete</span></button>
                                     <span class="project-description">${project.description}</span>`;
		}
		projectList.appendChild(projectItem);
	});

	projectSelect.innerHTML = "";
	projects.forEach((project) => {
		const option = document.createElement("option");
		option.value = project.name;
		option.textContent = project.name;
		projectSelect.appendChild(option);
	});

	// Add event listeners for project buttons
	document.querySelectorAll(".project-button").forEach((button) => {
		button.onclick = (e) => {
			const projectIndex = e.target.dataset.index;
			currentProject = projects[projectIndex].name;

			displayTasks(projects, projectIndex);
		};
	});

	// Add event listeners for delete project buttons
	document.querySelectorAll(".delete-project").forEach((button) => {
		button.onclick = (e) => {
			const projectIndex = e.target.dataset.index;
			const projectName = `Name: ${projects[projectIndex].name}, For: ${projects[projectIndex].description}`;

			showConfirmationModal("project", projectName, () => {
				projects.splice(projectIndex, 1);
				saveToLocalStorage();
				displayProjects();
				disableAddProjectBtn();
			});
		};
	});
}

function displayNotes() {
	notesContainer.innerHTML = "";
	notes.forEach((note, noteIndex) => {
		const noteItem = document.createElement("div");
		noteItem.className = "note";
		noteItem.innerHTML = `
            <p>${note.text}</p>
            <p class="note-date">Added on: ${note.dateAdded}</p>
            <div class="note-actions">
                <button class="edit-note icon" data-index="${noteIndex}">Edit</button>
                <button class="delete-note icon" data-index="${noteIndex}">Delete</button>
            </div>
        `;
		notesContainer.appendChild(noteItem);

		// Add event listener for delete note button
		noteItem.querySelector(".delete-note").onclick = () => {
			showConfirmationModal("note", null, () => {
				notes.splice(noteIndex, 1);
				saveToLocalStorage();
				displayNotes();
			});
		};

		noteItem.querySelector(".edit-note").onclick = () => {
			document.getElementById("noteText").value = note.text;
			showModal(noteModal, modalsContainer);

			// Temporarily store the index of the note being edited
			let currentNoteIndex = noteIndex;

			// Save the edited note
			saveNoteBtn.onclick = () => {
				notes[currentNoteIndex].text = document.getElementById("noteText").value;
				saveToLocalStorage();
				displayNotes();
				hideModal(noteModal, modalsContainer);
			};
		};
	});
}

const sidebarContainer = document.querySelector(".sidebar-container");

sidebarContainer.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON") {
		const buttons = sidebarContainer.querySelectorAll(".list-item button, .project-btn");

		// Remove 'active' class from all buttons
		buttons.forEach((btn) => btn.parentNode.classList.remove("active"));

		// Add 'active' class to the clicked button's parent
		if (e.target.parentNode.classList.contains("list-item") || e.target.classList.contains("project-btn")) {
			e.target.parentNode.classList.add("active");
		} else if (e.target.classList.contains("project-btn")) {
			e.target.classList.add("active");
		}
	}
});

function setMinDate() {
	const dateInput = document.getElementById("dueDate");
	const today = new Date().toISOString().split("T")[0];
	dateInput.setAttribute("min", today);
}

document.addEventListener("DOMContentLoaded", () => {
	setMinDate();
	const defaultPriority = "high";
	const priorityRadios = document.querySelectorAll('input[name="priority"]');
	priorityRadios.forEach((radio) => {
		if (radio.value === defaultPriority) {
			radio.checked = true;
		}
	});
});

// Initial display
displayProjects();
displayTasks(projects);
displayNotes();
disableAddProjectBtn();
