
let gridSize = document.getElementById("gridSize").value;
const gridContainer = document.getElementById("grid");
let currentGridSize = document.getElementById("currentGridSize");
let selectedSize = document.getElementById("selectedSize");
let rangeSlider = document.getElementById("gridSize");
const applySize = document.getElementById("changeGrid");
let drawingColor = document.querySelector(".color-list .selected").getAttribute("data-color");
let availableColors = document.querySelectorAll(".color-list li button.color");
let currentBackgroundColor = document.querySelector(".background-list-item button.background.selected").getAttribute("data-color");
let bgBtn = document.querySelectorAll("button.background");
let showGuides = document.querySelector("#showGuides");
const clearDrawing = document.getElementById("clearDrawing");
const toggleOptions = document.getElementById("toggleMobileSettings");
const optionsPanel = document.querySelector(".game-options");
// import html2canvas from 'html2canvas';
// Init functions
updateCurrentGridSize(gridSize);
generateGrid(gridSize);
drawOnDrag();
changeBackgroundColor(currentBackgroundColor);

// Event Listeners
rangeSlider.addEventListener("input", function(){
    gridSize = document.getElementById("gridSize").value;
    selectedSize.innerText = gridSize + " x " + gridSize
});


applySize.addEventListener("click", function() {
    gridSize = document.getElementById("gridSize").value;
    updateCurrentGridSize(gridSize);
    destroyGrid();
    generateGrid(gridSize);
    drawOnDrag();
});

availableColors.forEach(function(color) {
    color.addEventListener("click", function() {
        let newColor = this.getAttribute("data-color");
        drawingColor = newColor;
        updateActiveItem(document.querySelector(".color-list"),color)
    });

});

document.getElementById('exportDrawing').addEventListener('click', exportDrawing);

bgBtn.forEach(function(item) {
    item.addEventListener("click", function() {
        let newBackgroundColor = this.getAttribute("data-color");
        changeBackgroundColor(newBackgroundColor);
        updateActiveItem(document.querySelector(".background-list"),item)
    });
});


clearDrawing.addEventListener("click", clearBoard);

showGuides.addEventListener("click", () => gridContainer.classList.toggle("no-guides"));


// Functions
function clearBoard () {
    let boardCell = document.querySelectorAll(".grid-cell");

    boardCell.forEach(function(cell) {
        cell.style = "";
    });
}

function updateActiveItem(parent, activeItem) {
    let container = parent;
    let bgListItems = container.querySelectorAll('button');
    bgListItems.forEach(function (bg) {
        bg.classList.remove('selected');
    });
    activeItem.classList.add('selected');
}

function changeBackgroundColor(color) {
    gridContainer.style.backgroundColor = color;
}

function exportDrawing() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const filename = `AG_PixelAvatar_${year}${month}${day}${hours}${minutes}${seconds}.png`;

    html2canvas(gridContainer, {backgroundColor:null}).then(canvas => {
        // Create an image from the canvas
        let image = canvas.toDataURL("image/png");
        // Create a link to download the image
        let link = document.createElement('a');
        link.download = filename;
        link.href = image;
        link.click();
    });
}

function drawOnDrag() {
    let isDrawing = false;

    function startDrawing(originalEvent) {
        isDrawing = true;
        // Handle touch events separately, ensuring not to lose the original event object
        const e = originalEvent.touches ? originalEvent.touches[0] : originalEvent;
        draw(e);
        originalEvent.preventDefault(); // Use the original event here
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function draw(originalEvent) {
        if (!isDrawing) return;
        // Determine if this is a touch event and extract the relevant coordinates
        const e = originalEvent.touches ? originalEvent.touches[0] : originalEvent;
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target && target.classList.contains('grid-cell')) {
            target.style.background = drawingColor;
        }
        if (originalEvent.preventDefault) { // Check if preventDefault is available before calling
            originalEvent.preventDefault(); // Prevent default actions like scrolling
        }
    }

    // Mouse event listeners
    gridContainer.addEventListener("mousedown", startDrawing);
    document.addEventListener("mouseup", stopDrawing);
    document.addEventListener("mousemove", draw);

    // Touch event listeners, marked as non-passive to allow calling preventDefault
    gridContainer.addEventListener("touchstart", startDrawing, { passive: false });
    document.addEventListener("touchend", stopDrawing, { passive: false });
    document.addEventListener("touchmove", draw, { passive: false });
}

function updateCurrentGridSize(size) {
    currentGridSize.innerText = size + "px * " + size + "px";
}

function generateGrid (gridSize) {
    gridContainer.style.setProperty('--cells', gridSize);
    
    for (let i = 1; i<=gridSize; i++) {
        for (let j = 1; j<=gridSize; j++) {
            const gridCell = document.createElement("div");
            gridCell.classList.add("grid-cell", 'cell-index-' + i + "-" + j);
            gridContainer.appendChild(gridCell);
        }
    }
}

function destroyGrid() {
    gridContainer.innerHTML= "";
}


toggleOptions.addEventListener('click', () => {
    optionsPanel.classList.toggle('opened');
});