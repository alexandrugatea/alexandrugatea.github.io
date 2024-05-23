function showModal(modal, container, currentProject) {
	modal.classList.add("open");
	container.classList.add("open");

	if (modal === taskModal) {
		const projectOptions = projectSelect.options;
		for (let i = 0; i < projectOptions.length; i++) {
			if (projectOptions[i].value === currentProject) {
				projectOptions[i].selected = true;
				break;
			}
		}
	}
}

function hideModal(modal, container, resetForm) {
	modal.classList.remove("open");
	container.classList.remove("open");

	resetForm.reset();
}

export { showModal, hideModal };
