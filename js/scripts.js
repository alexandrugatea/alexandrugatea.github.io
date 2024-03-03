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
const hoverElements = document.querySelectorAll('.kursor-hover, .lg-prev, .lg-next');


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

window.addEventListener('resize', () => {
  container.innerHTML = '';
  createGrid();
});

var isScrollEnabled = true;

// ============================================================
// Init Functions
// ============================================================

smoothScroll(target, 98, 14);


// ============================================================
// Events
// ============================================================


document.addEventListener("DOMContentLoaded", function () {

  // Page transition effect
  setTimeout(() => {
    pageTransition.classList.remove("active");
  }, 1200);

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
    "txt": "edit",
    "send": "send"
  };

  // Function to set cursor message based on element's class
  function setCursorMessage(element) {
    const classNames = Array.from(element.classList);
    const matchingClass = classNames.find(className => cursorMessages.hasOwnProperty(className));
    cursorMessage.innerHTML = matchingClass ? cursorMessages[matchingClass] : "";
  }

  hoverElements.forEach(function (element) {
    element.addEventListener('mouseover', function () {
      cursor.classList.add('hovering');
      trail.classList.add('hovering');
      setCursorMessage(element);

      if (element.classList.contains("invertedImage")) {
        cursor.classList.add('about');
      } else {
        cursor.classList.remove('about');
      }
    });

    element.addEventListener('mouseleave', function () {
      cursor.classList.remove('hovering');
      trail.classList.remove('hovering');
      cursorMessage.innerHTML = ""; // reset any icon from inside the kursor
    });
  });


  const aboutMeHover = document.querySelector(".graphic-block-container.about-me");
  if (aboutMeHover) {
    aboutMeHover.addEventListener('mouseover', function () {
      aboutMeHover.classList.add("hovered");
    });
  }

  const mouse = document.getElementById("mouse-scroll");
  const wH = window.innerHeight;

  // ==========
  // SCROLL
  // ==========
  window.addEventListener("scroll", function () {
    const totalScrollHeight = document.body.scrollHeight - window.innerHeight;

      let parallaxOffset = 50;

      // edge case for contact page where there are 2 * 100vh sections
      if (totalScrollHeight == window.innerHeight) {
        parallaxOffset = 25;
      }

    const scrollPosition = window.scrollY;

    // Do not use Math.floor here or the grid will have a jumpy move
      const scrollPercent = (scrollPosition / totalScrollHeight) * - parallaxOffset + 1;
    let windowScrollPercent = 100 - (scrollPosition / wH) * 200;

    if (mouse) {
      mouse.style.opacity = windowScrollPercent / 100;
    }

    if (!isScrollEnabled) return;
    container.style.transform = `translateX(-50%) translateY(${scrollPercent}%) `;
  });

  // Redirect links
  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      var goTo = this.getAttribute('href');

      pageTransition.classList.add('active');

      setTimeout(function () {
        window.location.href = goTo;
      }, 350);
    });
  });


  // disable smooth scroll while lightgallery is opened

  if (document.body.classList.contains("work")) {
    gallery.addEventListener('lgBeforeOpen', function () {
      isScrollEnabled = false;
    });

    gallery.addEventListener('lgAfterClose', function () {
      isScrollEnabled = true;
    });
  }

  // END of DomContentLoaded
});





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
  var pos = target.scrollTop || document.documentElement.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target;

  function scrolled(e) {
    e.preventDefault();
    if (!isScrollEnabled) return; // Don't scroll if scrolling is disabled
    var delta = normalizeWheelDelta(e);
    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // limit scrolling
    if (!moving) {
      update();
    }
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta) {
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1); // Opera else
      } else {
        return -e.detail / 3; // Firefox
      }
    } else {
      return e.wheelDelta / 120; // IE,Safari,Chrome
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

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });
  target.addEventListener("scroll", scrolled, { passive: false });
}

function createGrid() {
  const gridWidth = window.innerWidth * 2;
  const gridHeight = document.documentElement.clientHeight * 2;
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