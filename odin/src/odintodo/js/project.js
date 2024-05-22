import { compareAsc, parseISO } from "date-fns";

export default class Project {
	constructor(name, description) {
		this.name = name;
		this.description = description;
		this.todos = [];
	}

	addTodo = (todo) => {
		this.todos.push(todo);
	};

	deleteTodo = (todoIndex) => {
		this.todos.splice(todoIndex, 1);
	};

	editTodo = (todoIndex, newDetails) => {
		Object.assign(this.todos[todoIndex], newDetails);
	};

	sortTodos = () => {
		this.todos.sort((a, b) => {
			const dateA = parseISO(`${a.dueDate}`);
			const dateB = parseISO(`${b.dueDate}`);
			const dateComparison = compareAsc(dateA, dateB);
			if (dateComparison !== 0) return dateComparison;
			// If dates are equal, sort by priority
			const priorityOrder = { low: 3, medium: 2, high: 1 };
			return priorityOrder[a.priority] - priorityOrder[b.priority];
		});
	};
}
