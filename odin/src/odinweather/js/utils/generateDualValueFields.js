import { resolveValuePath } from "./resolvePath";

function generateDualValueFields(container, valuePath, unitM, unitI, data) {
	const value = resolveValuePath(data, valuePath);
	const metricContainer = document.createElement("span");
	const imperialContainer = document.createElement("span");

	metricContainer.classList.add("metric");
	imperialContainer.classList.add("imperial");

	metricContainer.innerHTML = `${value.metric}<span class="unit">${unitM}</span>`;
	imperialContainer.innerHTML = `${value.imperial}<span class="unit">${unitI}</span>`;

	container.innerHTML = "";
	container.classList.add("dual-value");
	container.appendChild(metricContainer);
	container.appendChild(imperialContainer);
}

export { generateDualValueFields };