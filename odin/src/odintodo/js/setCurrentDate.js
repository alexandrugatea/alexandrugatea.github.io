import { format } from 'date-fns';

export default function setCurrentDate() {
	const now = new Date();
	const formattedDate = format(now, "yyyy-MM-dd");
    const taskModalDateInput = document.getElementById('dueDate');
	taskModalDateInput.value = formattedDate;
}