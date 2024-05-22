// Get elements for custom cursor
const cursor = document.querySelector('#kursor');
const cursorMessage = cursor.querySelector("#kMessage");
const trail = document.querySelector('#kursorTrail');
const hoverElements = document.querySelectorAll('.kursor-hover, .lg-prev, .lg-next, .lg-close, .lg-zoom-in, .lg-zoom-out');



document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            cursor.style.display = 'block';
            trail.style.display = 'block';
        }
    });
    
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
        "nav-trigger": "menu_open",
        "form-toggle": "toggle_on"
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
    
    // Move the kustom cursor
    document.addEventListener('mousemove', function (e) {
        const x = e.clientX;
        const y = e.clientY;
        moveKustomMouse(cursor, trail, x, y);
    });
    document.addEventListener('mousedown', scaleKursorDown);
    document.addEventListener('mouseup', scaleKursorUp);
    
    function moveKustomMouse(cursor, trail, x, y) {
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
    
        // setTimeout(() => {
        //     trail.style.left = x + 'px';
        //     trail.style.top = y + 'px';
        // }, 14);
    
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

    function scaleKursorDown() {
        trail.style.transform = "translate(-50%, -50%) scale(0.5)";
    }

    function scaleKursorUp() {
        setTimeout(() => {
            trail.style.transform = "translate(-50%, -50%) scale(1)";
        }, 50);
    }

});