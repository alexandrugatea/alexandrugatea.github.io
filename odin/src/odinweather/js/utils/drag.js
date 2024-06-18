function dragHours() {
	const sliders = [document.querySelector("#weatherHoursContainer"), document.querySelector("#popularPlaces")];

	sliders.forEach((slider) => {
		let isDown = false; // flag variable to indicate whether the slider is clicked or not
		let startX; // position on page where we first click (inside the scrollable div)
		let scrollLeft; // pixels to scroll

		// Add event listeners for mouse actions
		slider.addEventListener("mousedown", prepareGrab);
		slider.addEventListener("mouseleave", removeGrab);
		document.addEventListener("mouseup", removeGrab); // Change: Listened on the document
		slider.addEventListener("mousemove", (e) => slideOnDrag(e, 1.5)); // Adjust speed

		function removeGrab() {
			isDown = false;
			slider.parentNode.classList.remove("active");
		}

		function prepareGrab(e) {
			isDown = true; // When this is true, we will be able to scroll

			slider.parentNode.classList.add("active");
			// Calculate the position where we clicked taking into account the offset of the element
			startX = e.pageX - slider.offsetLeft;
			// Take into account the current scroll position of the element
			scrollLeft = slider.scrollLeft;
			// Change: Prevent default behavior to avoid text selection and other default actions
			e.preventDefault();
		}
		
		function slideOnDrag(e, speed) {
			if (!isDown) return; // Only proceed if mouse click while dragging
			e.preventDefault(); // Change: Prevent default behavior to avoid unintended actions
			// Determine the number of pixels the cursor moved, from mousedown event
			const x = e.pageX - slider.offsetLeft;
			const walk = x - startX;

			slider.scrollLeft = scrollLeft - walk * speed;
		}
	});
}

export { dragHours };
