import { format, parseISO, differenceInHours, startOfTomorrow   } from "date-fns";
import Project from "./project";

export default function createTaskHTML(todo, index) {
	// console.log(`Creating task HTML for ${todo.name} with index ${index}`);

	const todoItem = document.createElement("div");
	todoItem.classList.add("task");
	// Create checkbox container
	const checkboxContainer = document.createElement("div");
	checkboxContainer.classList.add("checkbox-container");

	// Create and set up checkbox
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = `task${todo.projectName}${index}`;
	checkbox.className = "toggle-complete";
	checkbox.setAttribute("data-project", todo.projectName);
	if (todo.completed) checkbox.checked = true;

	// Create and set up label
	const label = document.createElement("label");
	label.setAttribute("for", checkbox.id);

	// Append checkbox and label to checkbox container
	checkboxContainer.appendChild(checkbox);
	checkboxContainer.appendChild(label);

	const nameSpan = document.createElement("span");
	nameSpan.className = "task-name";
	nameSpan.innerHTML += todo.name;
	nameSpan.innerHTML += `<span class="task-project">${todo.projectName}</span>`;

	const dueDateTimeSpan = document.createElement("span");
	dueDateTimeSpan.className = "task-date-time";
	const formattedDate = format(parseISO(todo.dueDate), "E, do 'of' MMMM");
	const superscriptedDate = formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
	dueDateTimeSpan.innerHTML = superscriptedDate;

    	// Add "due in X hours" if due today
	const currentDate = new Date();
	const taskDueDate = parseISO(todo.dueDate);
	if (format(currentDate, 'yyyy-MM-dd') === format(taskDueDate, 'yyyy-MM-dd')) {
		const hoursRemaining = differenceInHours(startOfTomorrow(), currentDate);
		dueDateTimeSpan.innerHTML += `<span class="due-in">due in ${hoursRemaining} hours</span>`;
	}

	const prioritySpan = document.createElement("span");
	prioritySpan.className = `task-priority ${todo.priority}`;
	// prioritySpan.textContent = todo.priority;

	const priorityIcon = document.createElement("span");
	prioritySpan.appendChild(priorityIcon);

	const editButton = document.createElement("button");
	editButton.className = "edit-task icon";
	editButton.textContent = "Edit";

	const deleteButton = document.createElement("button");
	deleteButton.className = "delete-task icon";
	deleteButton.textContent = "Delete";

	todoItem.appendChild(prioritySpan);
	todoItem.appendChild(checkboxContainer);
	todoItem.appendChild(nameSpan);
	todoItem.appendChild(dueDateTimeSpan);
	todoItem.appendChild(editButton);
	todoItem.appendChild(deleteButton);

	return todoItem;
}
