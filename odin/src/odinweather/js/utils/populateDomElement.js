function populateDOMElement(selector, content) {
	const element = document.querySelector(selector);
	if (element) {
		element.innerHTML = content;
	}
}

export { populateDOMElement };
