import appendTask from "./appendTask";

export default function displayTasks(projects, projectIndex = null) {
	tasksContainer.innerHTML = "";
	if (projectIndex === null) {
		projects.forEach((project) => {
			project.sortTodos();
			project.todos.forEach((todo, index) => {
				appendTask(todo, index, tasksContainer);
			});
		});
	} else {
		const project = projects[projectIndex];
		project.sortTodos();
		project.todos.forEach((todo, index) => {
			appendTask(todo, index, tasksContainer);
		});
	}
}
