import appendTask from "./appendTask";
import { tasksContainer } from "..";

export const taskProjectNameContainer = document.getElementById("taskProjectName");
export default function displayTasks(projects, projectIndex = null) {
	tasksContainer.innerHTML = "";
	document.getElementById("sidebar").classList.remove("opened");
	taskProjectNameContainer.textContent = "";

	if (projectIndex === null) {
		projects.forEach((project) => {
			project.sortTodos();
			taskProjectNameContainer.innerHTML = `from <span class="pn">all projects</span>`;
			project.todos.forEach((todo, index) => {
				appendTask(todo, index, tasksContainer);
			});
		});
	} else {
		const project = projects[projectIndex];
		project.sortTodos();
		taskProjectNameContainer.innerHTML = `from <span class="pn">${project.name}</span> project`;
		project.todos.forEach((todo, index) => {
			appendTask(todo, index, tasksContainer);
		});
	}
}
