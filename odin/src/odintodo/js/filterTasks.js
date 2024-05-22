import {
	startOfToday,
	addDays,
	startOfWeek,
	endOfWeek,
	isSameDay,
	isWithinInterval,
	addWeeks,
	parseISO,
} from "date-fns";

import appendTask from "./appendTask";

export default function filterTasksByDate(filter, projects, tasksContainer) {
	const today = startOfToday();
	const tomorrow = addDays(today, 1);
	const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
	const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });
	const nextWeekStart = startOfWeek(addWeeks(today, 1), { weekStartsOn: 1 });
	const nextWeekEnd = endOfWeek(nextWeekStart, { weekStartsOn: 1 });

	// console.log(`Filtering tasks for: ${filter}`);

	tasksContainer.innerHTML = "";
	projects.forEach((project) => {
		project.todos.forEach((todo, index) => {
			const taskDate = parseISO(todo.dueDate);
			let shouldAppend = false;

			if (filter === "today" && isSameDay(taskDate, today)) {
				shouldAppend = true;
			} else if (filter === "tomorrow" && isSameDay(taskDate, tomorrow)) {
				shouldAppend = true;
			} else if (
				filter === "thisWeek" &&
				isWithinInterval(taskDate, {
					start: startOfWeekDate,
					end: endOfWeekDate,
				})
			) {
				shouldAppend = true;
			} else if (
				filter === "nextWeek" &&
				isWithinInterval(taskDate, {
					start: nextWeekStart,
					end: nextWeekEnd,
				})
			) {
				shouldAppend = true;
			}

			if (shouldAppend) {
				// console.log(`Appending task: ${todo.name} due on ${todo.dueDate}`);
				appendTask(todo, index, tasksContainer);
			}
		});
	});
}
