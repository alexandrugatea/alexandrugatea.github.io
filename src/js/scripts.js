// ============================================================
// Variables & Constants
// ============================================================

// ============================================================
// get elements for creating the background grid

let container = document.getElementById("grdbg");
const body = document.body;

// Get the target for smooth scroll
var target =
    document.scrollingElement ||
    document.documentElement ||
    document.body.parentNode ||
    document.body;


// Get elements for custom cursor
const cursor = document.querySelector('#kursor');
const cursorMessage = cursor.querySelector("#kMessage");
const trail = document.querySelector('#kursorTrail');
const hoverElements = document.querySelectorAll('.kursor-hover, .lg-prev, .lg-next, .lg-close, .lg-zoom-in, .lg-zoom-out');


// Get elements for sidebar functionality

const navTrig = document.getElementById("navTrigger");
const nav = document.getElementById("nav");
const navList = document.querySelector(".nav-list");

// Get elements for transition effect on page change
const pageTransition = document.getElementById("pt");

// Get links for page transitions

var links = document.querySelectorAll('.link');

// ============================================================
// Create grid on load & resize
window.onload = createGrid;

var windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

let lastWindowWidth = windowWidth; 

if (windowWidth > 1200) {
    smoothScroll(target, 91, 14);
}

window.addEventListener('resize', () => {
    const currentWindowWidth = window.innerWidth;

    if (currentWindowWidth !== lastWindowWidth) {
        container.innerHTML = ''; 
        createGrid(); 
        lastWindowWidth = currentWindowWidth; 
    }

});

var isScrollEnabled = true;


// ============================================================
// Events
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
    // Page transition effect
    setTimeout(() => {
        pageTransition.classList.remove("active");
    }, 1200);

    // animate the background grid
    setTimeout(() => {
        container.classList.add("animate");
    }, 1300);

    // Open close navbar
    navTrig.addEventListener("click", function () {

        if (!navTrig.classList.contains("open")) {
            openMenu();
            disableScroll()
        } else {
            closeMenu();
            enableScroll();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            cursor.style.display = 'block';
            trail.style.display = 'block';

            if (navTrig.classList.contains("open")) {
                closeMenu();
                enableScroll();
            }
        }
    });


    // Move the kustom cursor
    document.addEventListener('mousemove', function (e) {
        const x = e.clientX;
        const y = e.clientY;
        moveKustomMouse(cursor, trail, x, y);
    });

    // add effects on kustom cursor based on element hovered

    const cursorMessages = {
        "external": "arrow_outward",
        "root": "home",
        "internal": "link",
        "gd": "brush",
        "dev": "code_blocks",
        "maps": "explore",
        "hire": "person_add",
        "mail": "mail",
        "play": "chevron_right",
        "phone": "phone",
        "zoom": "expand_content",
        "lg-prev": "navigate_before",
        "lg-next": "navigate_next",
        "lg-zoom-in": "zoom_out_map",
        "lg-zoom-out": "zoom_in_map",
        "lg-close": "close",
        "txt": "edit",
        "send": "send",
        "accept": "done",
        "download": "download",
        "color-pick": "colorize",
        "range": "arrow_range",
        "nav-corner-item": "rounded_corner",
        "nav-trigger": "menu_open"
    };

    function setCursorMessage(element) {
        const classNames = Array.from(element.classList);
        if (classNames.includes('nav-trigger') && classNames.includes('open')) {
            cursorMessage.innerHTML = 'close'; 
            return; 
        }
        const matchingClass = classNames.find(className => cursorMessages.hasOwnProperty(className));
        cursorMessage.innerHTML = matchingClass ? cursorMessages[matchingClass] : "";
    }

    hoverElements.forEach(function (element) {
        element.addEventListener('mouseover', function () {
            cursor.classList.add('hovering');
            trail.classList.add('hovering');
            setCursorMessage(element);
        });

        element.addEventListener('mouseleave', function () {
            cursor.classList.remove('hovering');
            trail.classList.remove('hovering');
            cursorMessage.innerHTML = ""; 
        });
    });


    const mouse = document.getElementById("cubeContainer");
    const wH = window.innerHeight;

    // ==========
    // SCROLL
    // ==========

    let isScrolling = false;

    window.addEventListener("scroll", function () {

        if (!isScrolling) {
            window.requestAnimationFrame(function () {
                const totalScrollHeight = document.body.scrollHeight - wH;

                let parallaxOffset = 50;

                // edge case for contact page where there are 2 * 100vh sections
                if (totalScrollHeight == wH) {
                    parallaxOffset = 25;
                }

                const scrollPosition = window.scrollY;

                // Do not use Math.floor here or the grid will have a jumpy move
                const scrollPercent = (scrollPosition / totalScrollHeight) * - parallaxOffset + 1;
                let windowScrollPercent = 100 - (scrollPosition / wH) * 200;

                if (mouse) {
                    if (windowScrollPercent <= 0) {
                        mouse.style.transform = `translateX(-50%) translateY(${scrollPercent}%) scale(0)`;
                    } else {
                        mouse.style.transform = `translateX(-50%) translateY(${-scrollPercent}%) scale(${windowScrollPercent / 100})`;
                    }
                }

                if (!isScrollEnabled) return;
                container.style.transform = `translateX(-50%) translateY(${scrollPercent}%) `;

                isScrolling = false;
            });

            isScrolling = true;
        }
    });

    // Redirect links
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var goTo = this.getAttribute('href');
            pageTransition.classList.add('active');

            setTimeout(function () {
                //closeMenu();
                //enableScroll();

                //pageTransition.classList.remove('active');
                // Use pushState to change the URL without navigating
                history.pushState({ path: goTo }, '', goTo);

                window.location.href = goTo;
            }, 550);
        });
    });

    window.onpopstate = function (event) {
        // Optionally initiate any animations or cleanup here
        // Then force a reload (consider UX implications)
        window.location.reload();
    };


    // disable smooth scroll while lightgallery is opened

    if (document.body.classList.contains("work")) {
        gallery.addEventListener('lgBeforeOpen', function () {
            isScrollEnabled = false;
        });

        gallery.addEventListener('lgAfterClose', function () {
            isScrollEnabled = true;
            cursor.style.display = 'block';
            trail.style.display = 'block';
        });
    }

    // END of DomContentLoaded
});

function updateCurrentNavItem() {
    // Get the current path from the URL, consider root as '/' or just the domain
    const currentPath = window.location.pathname === '/' ? '/' : window.location.pathname;

    // Select all li elements with the class 'nav-list-link'
    const navItems = document.querySelectorAll('li.nav-list-link');

    // Flag to check if any nav item matches the current URL
    let isAnyNavItemCurrent = false;

    // Remove the 'current' class from all nav items and check for a match with the current URL
    navItems.forEach(item => {
        item.classList.remove('current');
        const anchor = item.querySelector('a.nav-list-url');
        const anchorPath = anchor.getAttribute('href');
        // Adjusting for root URL comparison
        const formattedAnchorPath = anchorPath === '/' ? '/' : `/${anchorPath}`;
        if (formattedAnchorPath === currentPath) {
            item.classList.add('current');
            isAnyNavItemCurrent = true;
        }
    });

    // If no nav items match and the current path is the root, set 'current' on 'nav-list-logo'
    if (!isAnyNavItemCurrent && currentPath === '/') {
        const logoItem = document.querySelector('.nav-list-logo');
        if (logoItem) {
            logoItem.classList.add('current');
        }
    }
}

// Call the function to update the nav items based on the current URL
updateCurrentNavItem();

// Optionally, call this function on window load or hashchange if your site uses hash-based navigation
window.addEventListener('load', updateCurrentNavItem);


document.addEventListener("DOMContentLoaded", function () {
    
    var colorList = document.getElementById('colorList');
    colorList.addEventListener('click', handleColorClick);


    // Function to handle click event on li elements
    function handleColorClick(event) {
        var target = event.target;
        if (target.tagName === 'LI') {
            var newColor = target.getAttribute('data-color');
            changeAccentColor(newColor);
            updateActiveListItem(target);
        }
    }

    function changeAccentColor(newColor) {
        // Set the --accent CSS custom property
        document.documentElement.style.setProperty('--accent', newColor);

        // Assuming newColor is in the format "#RRGGBB"
        if (newColor[0] === '#') {
            const r = parseInt(newColor.slice(1, 3), 16);
            const g = parseInt(newColor.slice(3, 5), 16);
            const b = parseInt(newColor.slice(5, 7), 16);

            // Set the individual color components
            document.documentElement.style.setProperty('--accent-r', r.toString());
            document.documentElement.style.setProperty('--accent-g', g.toString());
            document.documentElement.style.setProperty('--accent-b', b.toString());

            // Store the individual color components in local storage
            localStorage.setItem('accentColorR', r);
            localStorage.setItem('accentColorG', g);
            localStorage.setItem('accentColorB', b);
        }

        // Store the accent color in local storage
        localStorage.setItem('accentColor', newColor);
    }

    function updateActiveListItem(activeItem) {
        var listItems = colorList.querySelectorAll('li');
        listItems.forEach(function (li) {
            li.classList.remove('selected');
        });
        activeItem.classList.add('selected');
    }

    // Check if there's a color stored in localStorage and apply it
    var storedColor = localStorage.getItem('accentColor');
    if (storedColor) {
        changeAccentColor(storedColor);

        var listItems = colorList.querySelectorAll('li');
        listItems.forEach(function (li) {
            if (li.getAttribute('data-color') === storedColor) {
                updateActiveListItem(li);
            }
        });
    }
    
    var radiusList = document.getElementById('radiusList');
    radiusList.addEventListener('click', handleRadiusClick);

    // Function to handle click event on li elements
    function handleRadiusClick(event) {
        var target = event.target;
        if (target.tagName === 'LI') {
            var newRadius = target.getAttribute('data-radius');
            var newCircleRadius = target.getAttribute('data-radius-circle');
            
            changeRadius(newRadius, newCircleRadius);
            updateActiveRadius(target);
        }
    }

    function changeRadius(radius, radiusCircle) {
        document.documentElement.style.setProperty('--radius', radius);
        document.documentElement.style.setProperty('--radius-circle', radiusCircle);
        localStorage.setItem('radius', radius);
        localStorage.setItem('radius-circle', radiusCircle);
    }

    function updateActiveRadius(activeItem) {
        var listItems = radiusList.querySelectorAll('li');
        listItems.forEach(function (li) {
            li.classList.remove('selected');
        });
        activeItem.classList.add('selected');
    }

    // Check if there's a color stored in localStorage and apply it
    var storedRadius = localStorage.getItem('radius');
    var storedRadiusCircle = localStorage.getItem('radius-circle');
    if (storedRadius && storedRadiusCircle) {
        changeRadius(storedRadius, storedRadiusCircle);

        var listItems = radiusList.querySelectorAll('li');
        listItems.forEach(function (li) {
            if (li.getAttribute('data-radius') === storedRadius && li.getAttribute('data-radius-circle') === storedRadiusCircle) {
                updateActiveRadius(li);
            }
        });
    }
});

//const slider = document.getElementById('FontSize');
//const root = document.documentElement;
//const rootSize = parseInt(window.getComputedStyle(root).fontSize);


//let savedScale = window.localStorage.getItem('scale');
//console.log(savedScale);

//if (savedScale) {
//    root.style.fontSize = savedScale + "px";
//    slider.value = savedScale;
//}

//slider.addEventListener('input', () => {
//    setTimeout(() => {
//        let uiScale = slider.value;
//        root.style.fontSize = uiScale + "px";
//        window.localStorage.setItem('scale', uiScale);
//    }, 300);
//});


// ============================================================
// Functions
// ============================================================

function disableScroll() {
    if (!isScrollEnabled) return;
    var oldWidth = body.offsetWidth;
    scrollPosition = window.scrollY;
    body.classList.add("locked");
    body.style.top = -scrollPosition + 'px';
    body.style.width = oldWidth + 'px';
    isScrollEnabled = false;
}

function enableScroll() {
    if (isScrollEnabled) return;
    body.classList.remove("locked");
    body.style.top = '';
    body.style.width = '';
    window.scrollTo(0, scrollPosition);
    isScrollEnabled = true;
}

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

    function scrolled(e) {
        e.preventDefault();
        if (!isScrollEnabled) return; // Don't scroll if scrolling is disabled
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
    container.appendChild(svg);

    const middleRow = Math.floor(rowCount / 2);
    const middleCol = Math.floor(columnCount / 2);
    const incrementalDelay = 2;
    // Creating row lines
    for (let i = 0; i < rowCount; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("class", "grid-line row-line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", i * rowGap);
        line.setAttribute("x2", gridWidth);
        line.setAttribute("y2", i * rowGap);
        line.setAttribute("y2", i * rowGap);

        const distanceFromMiddle = Math.abs(i - middleRow);
        const delay = (distanceFromMiddle / middleRow) * incrementalDelay;

        //line.style.setProperty("--grl", delay + "s");
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

        const distanceFromMiddle = Math.abs(j - middleCol);
        const delay = (distanceFromMiddle / middleCol) * incrementalDelay;

        //line.style.setProperty("--gcl", delay + "s");
        line.style.setProperty("--gcl", j * 0.03 + "s");
        svg.appendChild(line);
    }

    const circles = [0, 0, 1, 2];

    // creating circles on intersections
    for (let m = 0; m < columnCount; m++) {
        for (let n = 0; n < rowCount; n++) {
            const radius = Math.floor(Math.random() * circles.length);

            const circle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );
            circle.setAttribute("class", "circle");
            circle.setAttribute("r", circles[radius]);
            circle.setAttribute("cx", m * rowGap);
            circle.setAttribute("cy", n * columnGap);
            svg.appendChild(circle);
        }
    }
}

function moveKustomMouse(cursor, trail, x, y) {
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';

    setTimeout(() => {
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
    }, 35);

    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('mouseover', function () {
            cursor.style.display = 'none';
            trail.style.display = 'none';
        });
        iframe.addEventListener('mouseout', function () {
            cursor.style.display = 'block';
            trail.style.display = 'block';
        });
    });
}

function openMenu() {
    nav.classList.add("open");
    navList.classList.add("open");
    navTrig.classList.add("open");
}

function closeMenu() {
    nav.classList.remove("open");
    navList.classList.remove("open");
    navTrig.classList.remove("open");
}