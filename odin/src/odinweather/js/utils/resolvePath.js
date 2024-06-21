function resolveValuePath(obj, path) {
	return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export { resolveValuePath };
