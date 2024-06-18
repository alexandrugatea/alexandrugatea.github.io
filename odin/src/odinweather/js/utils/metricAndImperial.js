import { resolveValuePath } from "./resolvePath";

function metricAndImperial(valuePath, unitM, unitI, data) {
	const value = resolveValuePath(data, valuePath);

	return `
		<div class="dual-value">
			<span class="metric">
				${value.metric}<span class="unit">${unitM}</span>
			</span>
			<span class="imperial">
				${value.imperial}<span class="unit">${unitI}</span>
			</span>
		</div>
	`
}

export { metricAndImperial };