function showLoader() {
	document.getElementById("loader").classList.add("open");
}

function hideLoader() {
	document.getElementById("loader").classList.remove("open");
}

export { showLoader, hideLoader };
