// ============================================================
// Variables & Constants
// ============================================================

// ============================================================

const body = document.body;

// Get elements for sidebar functionality
const navTrig = document.getElementById("navTrigger");
const nav = document.getElementById("nav");
const navList = document.querySelector(".nav-list");



// Get links for page transitions

let links = document.querySelectorAll('.link');

// ============================================================
// Create grid on load & resize

let isScrollEnabled = true;


// ============================================================
// Events
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

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
        if (event.key === "Escape" && (navTrig.classList.contains("open"))) {
            closeMenu();
            enableScroll();
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

    // Check if 'defaultCursor' is set in localStorage and update checkbox accordingly
    const defaultCursorSetting = localStorage.getItem('defaultCursor') === 'true';
    const checkbox = document.getElementById('pointerType');
    checkbox.checked = defaultCursorSetting;

    // Apply the 'default-cursor' class to the body if checkbox is checked
    updateCursor(defaultCursorSetting);

    // Listen for changes on the checkbox to update local storage and body class
    checkbox.addEventListener('change', function () {
        localStorage.setItem('defaultCursor', checkbox.checked);
        updateCursor(checkbox.checked);
    });
});

// ============================================================
// Functions
// ============================================================

// Function to add/remove 'default-cursor' class based on the checkbox state
function updateCursor(checked) {
    if (checked) {
        document.body.classList.add('default-cursor');
    } else {
        document.body.classList.remove('default-cursor');
    }
}

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

var cookieBannerSliderPos = 0;

function showCookieBanner() {
    var cookiebanner = document.getElementById("cookiebanner");
    var dialogHeight = parseInt(cookiebanner.offsetHeight);
    cookiebanner.style.bottom = (cookieBannerSliderPos - dialogHeight) + "px";
    cookieBannerSliderPos += 4;
    if (cookieBannerSliderPos < dialogHeight) {
        setTimeout(function () {
            showCookieBanner();
        }, 1);
    } else {
        cookieBannerSliderPos = 0;
        cookiebanner.style.bottom = "0px";
    }
}

function hideCookieBanner() {
    var cookiebanner = document.getElementById("cookiebanner");
    cookiebanner.style.display = "none";
}