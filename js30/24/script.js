(function () {
    const navbar = document.querySelector("#main");
    const body = document.querySelector(".project-wrapper");
    let navbarHeight = navbar.clientHeight;
    const topOfnav = navbar.offsetTop;



    function fixNav() {
        body.scrollTop >= topOfnav ? setFixed(body) : removeFixed(body);
    }

    function setFixed(el) {
        el.classList.add("fixed");
        el.style.marginTop = `${navbarHeight}px`;
    }

    function removeFixed(el) {
        el.classList.remove("fixed");
        el.style.marginTop = 0;

    }

    body.addEventListener("scroll", fixNav);
})();