import createTaskHTML from "./createTask";
import { showModal, hideModal } from "./showHideModals";
import saveToLocalStorage from "./saveToLocalStorage";
import { projects } from "..";
import displayTasks from "./displayTasks";
import { showConfirmationModal } from "..";
import { modalsContainer } from "..";

export default function appendTask(todo, index, tasksContainer) {
	const todoItem = createTaskHTML(todo, index);
	tasksContainer.appendChild(todoItem);

	if (todo.completed) {
		todoItem.classList.add("completed");
	}

	// Add event listener for delete task button
	todoItem.querySelector(".delete-task").onclick = () => {
		const taskName = todo.name;
		showConfirmationModal("task", taskName, () => {
			const project = projects.find((p) => p.name === todo.projectName);
			const projectIndex = projects.indexOf(project);
			const todoIndex = project.todos.indexOf(todo);
			project.deleteTodo(todoIndex);
			saveToLocalStorage();
			displayTasks(projects, projectIndex);
		});
	};

	// Add event listener for edit task button
	todoItem.querySelector(".edit-task").onclick = () => {
		document.getElementById("taskName").value = todo.name;
		document.getElementById("dueDate").value = todo.dueDate;

		// Set the correct radio button for priority
		document.querySelector(`input[name="priority"][value="${todo.priority}"]`).checked = true;

		projectSelect.value = todo.projectName;

		const project = projects.find((p) => p.name === todo.projectName);
		const projectIndex = projects.indexOf(project);

		showModal(taskModal, modalsContainer);

		document.getElementById("saveTaskBtn").onclick = (e) => {
            e.preventDefault();
			todo.name = document.getElementById("taskName").value;
			todo.dueDate = document.getElementById("dueDate").value;
			todo.priority = document.querySelector('input[name="priority"]:checked').value;
			todo.projectName = projectSelect.value;

			saveToLocalStorage();
			displayTasks(projects, projectIndex);
			hideModal(taskModal, modalsContainer);
		};
	};

	todoItem.querySelector(".toggle-complete").onclick = (e) => {
		const project = projects.find((p) => p.name === todo.projectName);
		const todoIndex = project.todos.indexOf(todo);
		project.todos[todoIndex].toggleComplete();
		if (e.target.checked) {
			todoItem.classList.add("completed");
		} else {
			todoItem.classList.remove("completed");
		}

		saveToLocalStorage();
	};
}
