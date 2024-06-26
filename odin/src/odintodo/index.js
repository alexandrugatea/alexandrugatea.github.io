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
const overdue = document.getElementById("overdue");
const projectModal = document.getElementById("projectModal");
export const taskModal = document.getElementById("taskModal");
const noteModal = document.getElementById("noteModal");
const closeProjectModal = document.getElementById("closeProjectModal");
const closeTaskModal = document.getElementById("closeTaskModal");
const closeNoteModal = document.getElementById("closeNoteModal");
const confirmationModal = document.getElementById("confirmationModal");
const closeConfirmationModal = document.getElementById("closeConfirmationModal");
const saveProjectForm = document.getElementById("projectForm");
export const saveTaskForm = document.getElementById("taskForm");
const saveNoteForm = document.getElementById("noteForm");
export const tasksContainer = document.getElementById("tasksContainer");
const notesContainer = document.getElementById("notesContainer");
export const projectSelect = document.getElementById("projectSelect");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const sidebarContainer = document.querySelector(".sidebar-container");
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
overdue.onclick = () => filterTasksByDate("overdue", projects, tasksContainer);
closeProjectModal.onclick = () => hideModal(projectModal, modalsContainer, saveProjectForm);
closeTaskModal.onclick = () => hideModal(taskModal, modalsContainer, saveTaskForm);
closeNoteModal.onclick = () => hideModal(noteModal, modalsContainer, saveNoteForm);
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

saveProjectForm.onsubmit = (e) => {
	e.preventDefault();
	const name = document.getElementById("projectName").value;
	const description = document.getElementById("projectDescription").value;
	if (name) {
		const project = new Project(name, description);
		projects.push(project);
		saveToLocalStorage();
		displayProjects();
		hideModal(projectModal, modalsContainer, saveProjectForm);
		document.getElementById("projectName").value = "";
		document.getElementById("projectDescription").value = "";
		disableAddProjectBtn();
	}
};

saveTaskForm.onsubmit = (e) => {
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

		const buttons = sidebarContainer.querySelectorAll(".list-item button, .project-btn");
		buttons.forEach((btn) => btn.parentNode.classList.remove("active"));
		const currentProject = document.querySelector(`.project-button[data-index="${projectIndex}"]`);
		currentProject.parentNode.classList.add("active");
		saveToLocalStorage();
		displayTasks(projects, projectIndex);
		hideModal(taskModal, modalsContainer, saveTaskForm);
	}
};

saveNoteForm.onsubmit = (e) => {
	e.preventDefault();
	const noteText = document.getElementById("noteText").value;
	if (noteText) {
		const dateAdded = formatDate(new Date());
		notes.push({ text: noteText, dateAdded });
		saveToLocalStorage();
		displayNotes();
		hideModal(noteModal, modalsContainer, saveNoteForm);
		document.getElementById("noteText").value = "";
	}
};

export function displayProjects() {
	const projectList = document.getElementById("projectList");
	projectList.innerHTML = "";
	projects.forEach((project, projectIndex) => {
		project.sortTodos();
		const projectItem = document.createElement("div");
		projectItem.className = "list-item";
		if (project.name === "Default") {
			projectItem.innerHTML = `
				<button class="project-button" data-index="${projectIndex}"><span>${project.name}</span></button> 
				<span class="project-description">${project.description}</span>`;
		} else {
			projectItem.innerHTML = `<button class="project-button" data-index="${projectIndex}"><span>${project.name}</span></button>
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

			if (projects[projectIndex].todos.length === 0) {
				displayTasks(projects, projectIndex);
				tasksContainer.innerHTML = `<span class="no-tasks">There are no tasks in this project.</span>`;
			} else {
				displayTasks(projects, projectIndex);
			}

			document.getElementById("sidebar").classList.remove("opened");
			const menuIcon = document.querySelector("#menuToggle .icon");
			console.log(menuIcon);
			menuIcon.textContent = menuIcon.textContent === "menu" ? "close" : "menu";
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

		if (noteIndex === 0) {
			noteItem.innerHTML = `
				<p>${note.text}</p>
				<p class="note-date">Added on: ${note.dateAdded}</p>
				<div class="note-actions default-note">
					<button class="edit-note icon" data-index="${noteIndex}">Edit</button>
					<button class="delete-note icon" data-index="${noteIndex}">Delete</button>
				</div>
			`;
		} else {
			noteItem.innerHTML = `
			<p>${note.text}</p>
			<p class="note-date">Added on: ${note.dateAdded}</p>
			<div class="note-actions">
				<button class="edit-note icon" data-index="${noteIndex}">Edit</button>
				<button class="delete-note icon" data-index="${noteIndex}">Delete</button>
			</div>
		`;
		}

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
			saveNoteForm.onsubmit = (e) => {
				e.preventDefault();
				notes[currentNoteIndex].text = document.getElementById("noteText").value;
				saveToLocalStorage();
				displayNotes();
				hideModal(noteModal, modalsContainer, saveNoteForm);
				document.getElementById("noteText").value = "Enter text";
			};
		};
	});
}

sidebarContainer.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON" && e.target.id !== "menuToggle") {
		const buttons = sidebarContainer.querySelectorAll(".list-item button, .project-btn");

		// Remove 'active' class from all buttons
		buttons.forEach((btn) => btn.parentNode.classList.remove("active"));
		e.target.parentNode.classList.add("active");
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

	const menuToggler = document.getElementById("menuToggle");

	menuToggler.addEventListener("click", () => {
		document.getElementById("sidebar").classList.toggle("opened");

		const icon = menuToggler.querySelector(".icon");
		icon.textContent = icon.textContent === "menu" ? "close" : "menu";
	});
});

// Initial display
displayProjects();
displayTasks(projects);
displayNotes();
disableAddProjectBtn();
