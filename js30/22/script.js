(function () {
    const triggers = document.querySelectorAll('#follow .lesson a');
    const container = document.querySelector("#follow .lesson");

    const highlight = document.createElement('span');
    highlight.classList.add('highlight');
    container.appendChild(highlight);
    

    function highlightLink() {
        const linkCoords = this.getBoundingClientRect(); // the magic of getting the coordinates
        const containerCoords = container.getBoundingClientRect(); // the magic of getting



        let styles = {
            top: linkCoords.top - containerCoords.top,
            left: linkCoords.left - containerCoords.left,
            width: linkCoords.width,
            height: linkCoords.height
        }

        highlight.style.width = `${styles.width}px`;
        highlight.style.height = `${styles.height}px`;
        highlight.style.transform = `translate(${styles.left}px, ${styles.top}px)`;
        highlight.classList.add('active')
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', highlightLink);
    });
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => e.preventDefault());
    })
})();