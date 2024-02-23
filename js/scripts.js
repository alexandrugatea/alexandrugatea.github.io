let container = document.getElementById("grdbg");
const body = document.body;

function createGrid() {
  const gridWidth = window.innerWidth * 2;
  const bodyHeight = document.body.scrollHeight;
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
  container.appendChild(svg);

  // Creating row lines
  for (let i = 0; i < rowCount; i++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", "grid-line row-line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", i * rowGap);
    line.setAttribute("x2", gridWidth);
    line.setAttribute("y2", i * rowGap);
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

window.onload = createGrid;

window.addEventListener("scroll", function () {
  const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPosition = window.scrollY;
  const scrollPercent = (scrollPosition / totalScrollHeight) * -50;
  container.style.transform = `translateX(-50%) translateY(${scrollPercent}%) `;


});

function smoothScroll(target, speed, smooth) {
  var moving = false;
  var pos = target.scrollTop || document.documentElement.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target;

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });
  target.addEventListener("scroll", scrolled, { passive: false });

  function scrolled(e) {
    e.preventDefault();
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
}

var target =
  document.scrollingElement ||
  document.documentElement ||
  document.body.parentNode ||
  document.body;

smoothScroll(target, 70, 35);




// open close the navBar


document.addEventListener("DOMContentLoaded", function () {
  const navTrig = document.getElementById("navTrigger");
  const nav = document.getElementById("nav");
  const navList = document.querySelector(".nav-list");


  navTrig.addEventListener("click", function () {
    
    if (!navTrig.classList.contains("open")) {

      nav.classList.add("open");
      navList.classList.add("open");
      navTrig.classList.add("open");
      disableScroll()

    } else {

      nav.classList.remove("open");
      navList.classList.remove("open");
      navTrig.classList.remove("open");
      enableScroll();

    }



    function disableScroll() {
      var oldWidth = body.offsetWidth;
      scrollPosition = window.scrollY;
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = -scrollPosition + 'px';
      body.style.width = oldWidth + 'px';
    }

    function enableScroll() {
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }
  });

});