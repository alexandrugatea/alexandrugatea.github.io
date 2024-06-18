
import { updateTime } from "../utils/updateTime";

let intervalId;

function updateTimeContainer(data) {
    const timeContainer = document.querySelector("#locationTime");
    if (intervalId) {
        clearInterval(intervalId);
    }
    updateTime(data, timeContainer);
    intervalId = setInterval(() => updateTime(data, timeContainer), 1000);
}

export { updateTimeContainer }