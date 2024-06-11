function dragHours() {
    const slider = document.querySelector('#weatherHoursContainer');

    let isDown = false; // flag variable to indicate whether the slider is clicked or not
    let startX; // position on page where we first click (inside the scrollable div)
    let scrollLeft; // pixels to scroll

    // Add event listeners for mouse actions
    slider.addEventListener('mousedown', prepareGrab);
    slider.addEventListener('mouseleave', removeGrab);
    document.addEventListener('mouseup', removeGrab); // Change: Listened on the document
    document.addEventListener('mouseleave', removeGrab); // Change: Listened on the document
    slider.addEventListener('mousemove', (e) => slideOnDrag(e, 1.5)); // Adjust speed

    function removeGrab() {
        isDown = false;
        slider.classList.remove('active');
    }

    function prepareGrab(e) {
        isDown = true; // When this is true, we will be able to scroll
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft; // Calculate the position where we clicked taking into account the offset of the element
        scrollLeft = slider.scrollLeft; // Take into account the current scroll position of the element
        e.preventDefault(); // Change: Prevent default behavior to avoid text selection and other default actions
    }

    function slideOnDrag(e, speed) {
        if (!isDown) return; // Only proceed if mouse click while dragging
        const x = e.pageX - slider.offsetLeft; // Determine the number of pixels the cursor moved, from mousedown event
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk * speed;
        e.preventDefault(); // Change: Prevent default behavior to avoid unintended actions
    }
}

export { dragHours }
