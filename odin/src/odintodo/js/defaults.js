import { startOfToday, addDays, addWeeks, formatISO, format } from "date-fns";
import ToDo from "./todo";

const today = formatISO(startOfToday(), { representation: "date" });
const tomorrow = formatISO(addDays(startOfToday(), 1), { representation: "date" });
const nextWeek = formatISO(addWeeks(startOfToday(), 1), { representation: "date" });

export const defaultProjects = {
	Default: {
		name: "Default",
		description: "Default project. Cannot be removed",
		todos: [
			new ToDo("Default High Prio Task", today, "high", "Default"),
			new ToDo("Default Medium Prio Task", today, "medium", "Default"),
			new ToDo("Default Low Prio Task", today, "low", "Default"),
			new ToDo("Default High Prio Task Tomorrow", tomorrow, "high", "Default"),
			new ToDo("Default Medium Prio Task Next Week", nextWeek, "medium", "Default"),
		],
	},
};
const formatDate = (date) => {
	const formattedDate = format(date, "E, do 'of' MMMM yyyy HH:mm:ss");
	return formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
};

export const defaultNotes = [
	{
		text: "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick",
		dateAdded: formatDate(new Date()),
	},
	{
		text: "Sample Note 2",
		dateAdded: formatDate(new Date()),
	},
];

export { formatDate };
