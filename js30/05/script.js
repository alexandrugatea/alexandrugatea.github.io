(function () {
    console.clear();

    const panels = document.querySelectorAll('.panel');

    function toggleOpen(e) {
        console.log(e.target);
        panels.forEach(panel => panel.classList.remove("open"));
        this.classList.toggle('open');
    }

    function toggleActive(e) {
        if (e.propertyName.includes("flex")) return;
        this.classList.toggle('active')
    }

    panels.forEach(panel => panel.addEventListener("click", toggleOpen));
    panels.forEach(panel => panel.addEventListener("transitionend", toggleActive));
})();