(function () {
    console.clear();
    const slider = document.querySelector('.items');

    let isDown = false; // flag variable to indicate wether the slider is clicked or not
    let startX; // position on page where we first click (inside the scrollable div)
    let scrollLeft; // pixels to scroll

    slider.addEventListener('mousedown', (e) => prepareGrab(e));
    slider.addEventListener('mouseup', removeGrab);
    slider.addEventListener('mouseleave', removeGrab);
    slider.addEventListener('mousemove', (e) => slideOnDrag(e, 5));

    function removeGrab() {
        isDown = false;
        slider.classList.remove('active');
    }

    function prepareGrab(e) {
        isDown = true; // when this is true, we will be able to scroll
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft; // calculate the position where we clicked taking into account the offset of the element
        scrollLeft = slider.scrollLeft; // take into account current scroll position of the element
    }

    function slideOnDrag(e, speed) {
        if (!isDown) return; // only proceed if mouse click while dragging
        const x = e.pageX - slider.offsetLeft; //determine the number of pixels the cursor moved, from mousedown event
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk * speed;
    }
})();