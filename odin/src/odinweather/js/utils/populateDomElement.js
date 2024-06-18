function populateDOMElement(selector, content, image = false) {
	const element = document.querySelector(selector) || selector;
	if (element && !image) {
		return element.innerHTML = content;
	} 
	if (image) {
		return element.src = content;
	}
	
}

function clear(element) {
	return element.innerHTML = "";
}

export { populateDOMElement, clear };
