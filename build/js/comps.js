// get elements for creating the background grid

let container = document.getElementById("grdbg");
// Get elements for transition effect on page change
const pageTransition = document.getElementById("pt");

// Get the target for smooth scroll
let target =
    document.scrollingElement ||
    document.documentElement ||
    document.body.parentNode ||
    document.body;

window.onload = createGrid;

let windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

let lastWindowWidth = windowWidth;

if (windowWidth > 1200) {
    smoothScroll(target, 91, 14);
}



document.addEventListener("DOMContentLoaded", function () {
    // Page transition effect
    setTimeout(() => {
        pageTransition.classList.remove("active");
    }, 1200);

    // animate the background grid
    setTimeout(() => {
        container.classList.add("animate");
    }, 1300);
});

window.addEventListener('resize', () => {
    const currentWindowWidth = window.innerWidth;
    if (currentWindowWidth !== lastWindowWidth) {
        container.innerHTML = '';
        createGrid();
        lastWindowWidth = currentWindowWidth;
    }
});


function smoothScroll(target, speed, smooth) {
    var moving = false;
    var pos = window.pageYOffset || document.documentElement.scrollTop; // Get the initial scroll position
    var frame = target === document.body && document.documentElement ? document.documentElement : target;

    // Initialize the scroll position only once to prevent the jump
    var initialized = false;
    function initScrollPosition() {
        if (!initialized) {
            pos = target.scrollTop || document.documentElement.scrollTop;
            initialized = true;
        }
    }

    function isCookiebotDialogOpen() {
        return !!document.querySelector('.CybotCookiebotDialogActive');
    }

    function scrolled(e) {
        if (!isScrollEnabled || isCookiebotDialogOpen()) return; // Don't scroll if scrolling is disabled
        e.preventDefault();
        initScrollPosition(); // Ensure the initial position is set
        var delta = normalizeWheelDelta(e);
        pos += -delta * speed;
        pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // Limit scrolling
        if (!moving) {
            update();
        }
    }

    function normalizeWheelDelta(e) {
        if (e.detail) {
            if (e.wheelDelta) {
                return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1); // Opera
            } else {
                return -e.detail / 3; // Firefox
            }
        } else {
            return e.wheelDelta / 120; // IE, Safari, Chrome
        }
    }

    function update() {
        moving = true;
        var delta = (pos - target.scrollTop) / smooth;
        target.scrollTop += delta;

        if (Math.abs(delta) > 0.5) {
            requestFrame(update);
        } else {
            moving = false;
        }
    }

    var requestFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (func) {
                window.setTimeout(func, 1000 / 60);
            }
        );
    })();

    // Ensure the initial scroll position is correctly set before any scroll events occur
    initScrollPosition();

    target.addEventListener("mousewheel", scrolled, { passive: false });
    target.addEventListener("DOMMouseScroll", scrolled, { passive: false });
    target.addEventListener("scroll", scrolled, { passive: false });
}


function createGrid() {
    const gridWidth = window.innerWidth * 2;
    const gridHeight = document.documentElement.clientHeight * 2.2;
    const columnGap = 70;
    const rowGap = 70;
    const columnCount = Math.ceil(gridWidth / columnGap);
    const rowCount = Math.ceil(gridHeight / rowGap);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${gridWidth} ${gridHeight}`);
    svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
    svg.setAttribute("width", gridWidth);
    svg.setAttribute("height", gridHeight);
    svg.setAttribute("id", "jsgrid");

    if (container.children.length === 0 || !container.querySelector('svg')) {
        container.appendChild(svg);
    } else {
        return;
    }

    // Creating row lines
    for (let i = 0; i < rowCount; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("class", "grid-line row-line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", i * rowGap);
        line.setAttribute("x2", gridWidth);
        line.setAttribute("y2", i * rowGap);
        line.style.setProperty("--grl", i * 0.03 + "s");
        svg.appendChild(line);
    }

    // Creating column lines
    for (let j = 0; j < columnCount; j++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("class", "grid-line col-line");
        line.setAttribute("x1", j * columnGap);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", j * columnGap);
        line.setAttribute("y2", gridHeight);
        line.style.setProperty("--gcl", j * 0.03 + "s");
        svg.appendChild(line);
    }

    const circles = [0, 0, 1, 2];

    // creating circles on intersections
    for (let m = 0; m < columnCount; m++) {
        for (let n = 0; n < rowCount; n++) {
            const radius = Math.floor(Math.random() * circles.length);

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("class", "circle");
            circle.setAttribute("r", circles[radius]);
            circle.setAttribute("cx", m * columnGap); // Corrected to columnGap
            circle.setAttribute("cy", n * rowGap); // Corrected to rowGap
            svg.appendChild(circle);
        }
    }
}