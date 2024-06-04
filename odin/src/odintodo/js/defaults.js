import { startOfToday, addDays, addWeeks, formatISO, format } from "date-fns";
import ToDo from "./todo";

const today = formatISO(startOfToday(), { representation: "date" });
const tomorrow = formatISO(addDays(startOfToday(), 1), { representation: "date" });
const nextWeek = formatISO(addWeeks(startOfToday(), 1), { representation: "date" });
const inThePast = formatISO(addDays(startOfToday(), -6), { representation: "date" });

export const defaultProjects = {
	Default: {
		name: "Default",
		description: "Default project. Cannot be removed",
		todos: [
			new ToDo("Example of High Priority task that is overdue", inThePast, "high", "Default"),
			new ToDo("Example of High Priority task that is due Today", today, "high", "Default"),
			new ToDo("Example of task that is due Tomorrow", tomorrow, "low", "Default"),
			new ToDo("Example of High Priority task that is due Next Week", nextWeek, "medium", "Default"),
		],
	},
};
const formatDate = (date) => {
	const formattedDate = format(date, "E, do 'of' MMMM yyyy HH:mm:ss");
	return formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
};

export const defaultNotes = [
	{
		text: "This is a sample note. Notes are for storing information, like a recipe, a phone number, an address, etc. Notes are not ToDo tasks",
		dateAdded: formatDate(new Date()),
	},
];

export { formatDate };
