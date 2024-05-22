export default class ToDo {
	constructor(name, dueDate, priority, projectName, completed = false) {
		this.name = name;
		this.dueDate = dueDate;
		this.priority = priority;
		this.projectName = projectName;
		this.completed = completed;
	}

	toggleComplete() {
		this.completed = !this.completed;
	}
}
