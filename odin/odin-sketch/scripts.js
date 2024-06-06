// Get DOM Elements
const gridContainer = document.getElementById("grid");
const applySize = document.getElementById("changeGrid");
const clearDrawing = document.getElementById("clearDrawing");
const toggleOptions = document.getElementById("toggleMobileSettings");
const optionsPanel = document.querySelector(".game-options");
const mirrorHButton = document.getElementById("mirrorH");
const mirrorVButton = document.getElementById("mirrorV");
const exportDrawingButton = document.getElementById("exportDrawing");
const customColorInput = document.getElementById("customColor");
const actionStack = [];
const maxActions = 30;
const undoDrawingButton = document.getElementById("undoDrawing");

let gridSize;
let currentGridSize = document.getElementById("currentGridSize");
let selectedSize = document.getElementById("selectedSize");
let rangeSlider = document.getElementById("gridSize");
let drawingColor = document.querySelector(".color-list .selected").getAttribute("data-color");
let availableColors = document.querySelectorAll(".color-list li button.color");
let currentBackgroundColor = document
	.querySelector(".background-list-item button.background.selected")
	.getAttribute("data-color");
let bgBtn = document.querySelectorAll("button.background");
let showGuides = document.querySelector("#showGuides");
let recentColors = document.getElementById("recentlyUsed");
let mirrorH = false;
let mirrorV = false;

// Disable UNDO button as default
undoDrawingButton.disabled = true;

const windowWidth = window.innerWidth;
if (windowWidth < 1200) {
	gridSize = 16;
	document.getElementById("gridSize").value = gridSize;
	generateGrid(gridSize);
	updateCurrentGridSize(gridSize);
	selectedSize.innerText = gridSize + " x " + gridSize
} else {
	gridSize = document.getElementById("gridSize").value
	generateGrid(gridSize);
	updateCurrentGridSize(gridSize);
}

// Init functions

drawOnDrag();
changeBackgroundColor(currentBackgroundColor);

// Event Listeners
rangeSlider.addEventListener("input", function () {
	gridSize = document.getElementById("gridSize").value;
	selectedSize.innerText = gridSize + " x " + gridSize;
});

customColorInput.addEventListener("input", function () {
	drawingColor = this.value;

	availableColors.forEach((color) => {
		color.classList.remove("selected");
	});
});

customColorInput.addEventListener("change", function () {
	customColorInput.parentNode.classList.add("selected");
	const newColor = this.value;
	if (!recentColors) {
		recentColors = document.createElement("datalist");
		recentColors.id = "recentlyUsed";
		this.setAttribute("list", "recentlyUsed");
		document.body.appendChild(recentColors); // Or append to a more appropriate container
	}

	const allOptions = recentColors.querySelectorAll("option");
	let isNewColor = true;

	allOptions.forEach(function (option) {
		if (option.value === newColor) {
			isNewColor = false;
		}
	});

	if (isNewColor) {
		const option = document.createElement("option");
		option.value = newColor;
		recentColors.appendChild(option);
	}
});

applySize.addEventListener("click", function () {
	gridSize = document.getElementById("gridSize").value;
	updateCurrentGridSize(gridSize);
	destroyGrid();
	generateGrid(gridSize);
	actionStack.length = 0;
	drawOnDrag();
});

availableColors.forEach(function (color) {
	color.addEventListener("click", function () {
		let newColor = this.getAttribute("data-color");
		drawingColor = newColor;
		customColorInput.parentNode.classList.remove("selected");
		updateActiveItem(document.querySelector(".color-list"), color);
	});
});

exportDrawingButton.addEventListener("click", exportDrawing);

bgBtn.forEach(function (item) {
	item.addEventListener("click", function () {
		let newBackgroundColor = this.getAttribute("data-color");
		changeBackgroundColor(newBackgroundColor);
		updateActiveItem(document.querySelector(".background-list"), item);
	});
});

clearDrawing.addEventListener("click", clearBoard);

showGuides.addEventListener("click", toggleGuides);

undoDrawingButton.addEventListener("click", undoLastAction);
mirrorHButton.addEventListener("click", toggleMirrorHorizontal);
mirrorVButton.addEventListener("click", toggleMirrorVertical);

toggleOptions.addEventListener("click", () => {
	optionsPanel.classList.toggle("opened");
	const icon = toggleOptions.querySelector(".icon");
	icon.textContent = icon.textContent === "menu" ? "close" : "menu";
});

// Functions

function toggleGuides() {
	showGuides.classList.toggle("active");
	gridContainer.classList.toggle("no-guides")
}

function clearBoard() {
	let boardCell = document.querySelectorAll(".grid-cell");
	boardCell.forEach(function (cell) {
		cell.removeAttribute("style");
	});
	actionStack.length = 0; // Clear the action stack
	updateUndoButtonState();
}

function updateActiveItem(parent, activeItem) {
	let container = parent;
	let bgListItems = container.querySelectorAll("button");
	bgListItems.forEach(function (bg) {
		bg.classList.remove("selected");
	});
	activeItem.classList.add("selected");
}

function changeBackgroundColor(color) {
	gridContainer.style.backgroundColor = color;
}

function exportDrawing() {
	const now = new Date();
	const year = now.getFullYear().toString();
	const month = (now.getMonth() + 1).toString().padStart(2, "0");
	const day = now.getDate().toString().padStart(2, "0");
	const hours = now.getHours().toString().padStart(2, "0");
	const minutes = now.getMinutes().toString().padStart(2, "0");
	const seconds = now.getSeconds().toString().padStart(2, "0");
	const filename = `AG_PixelAvatar_${year}${month}${day}${hours}${minutes}${seconds}.png`;

	gridContainer.classList.toggle("no-guides");

	if (mirrorH) {
		gridContainer.classList.remove("mirror-h-active");
	}
	if (mirrorV) {
		gridContainer.classList.remove("mirror-v-active");
	}

	html2canvas(gridContainer, { backgroundColor: null, scale: 4 })
		.then((canvas) => {
			// Create an image from the canvas
			let image = canvas.toDataURL("image/png");
			// Create a link to download the image
			let link = document.createElement("a");
			link.download = filename;
			link.href = image;
			link.click();
		})
		.then(function () {
			gridContainer.classList.toggle("no-guides");
			if (mirrorH) {
				gridContainer.classList.add("mirror-h-active");
			}
			if (mirrorV) {
				gridContainer.classList.add("mirror-v-active");
			}
		});
}

function saveAction(cells) {
	if (actionStack.length >= maxActions) {
		actionStack.shift(); // Remove the oldest action if we exceed maxActions
	}
	actionStack.push(cells);
	updateUndoButtonState();
}

function undoLastAction() {
	if (actionStack.length === 0) return;

	const lastAction = actionStack.pop();
	lastAction.forEach((cell) => {
		cell.element.style.background = cell.previousColor;
	});

	updateUndoButtonState();
}

function updateUndoButtonState() {
	undoDrawingButton.disabled = actionStack.length === 0;
	const availableUndos = actionStack.length;
	console.log(availableUndos);

	const undoDomDisplay = document.querySelector("#availableUndo");
	undoDomDisplay.innerText = availableUndos;

	if (availableUndos === 0) {
		undoDomDisplay.innerText = "";
	}
}

function drawOnDrag() {
	let isDrawing = false;
	let currentAction = [];
	let coloredCells = new Set();
	let touchInProgress = false;

	function startDrawing(originalEvent) {
		if (originalEvent.type === "touchstart") {
			if (touchInProgress) return;
			touchInProgress = true;
		}
		isDrawing = true;
		currentAction = []; // Start a new action
		coloredCells.clear(); // Clear the set of colored cells
		const e = originalEvent.touches ? originalEvent.touches[0] : originalEvent;
		draw(e);
		originalEvent.preventDefault();
	}

	function stopDrawing(originalEvent) {
		if (originalEvent.type === "touchend") {
			touchInProgress = false;
		}
		if (isDrawing) {
			saveAction(currentAction); // Save the completed action
		}
		isDrawing = false;
	}

	function draw(originalEvent) {
		if (!isDrawing) return;
		const e = originalEvent.touches ? originalEvent.touches[0] : originalEvent;
		const target = document.elementFromPoint(e.clientX, e.clientY);

		if (target && target.classList.contains("grid-cell") && !coloredCells.has(target)) {
			const previousColor = target.style.backgroundColor;
			colorCell(target);
			currentAction.push({ element: target, previousColor: previousColor });
			coloredCells.add(target);
			if (mirrorH && mirrorV) {
				mirrorBoth(target);
			} else {
				if (mirrorH) {
					mirrorHorizontal(target);
				}
				if (mirrorV) {
					mirrorVertical(target);
				}
			}
		}

		if (originalEvent.preventDefault) {
			originalEvent.preventDefault();
		}
	}

	function colorCell(cell) {
		cell.style.background = drawingColor;
	}

	function mirrorHorizontal(cell) {
		const x = parseInt(cell.dataset.x);
		const y = parseInt(cell.dataset.y);
		const targetIndex = gridSize - x + 1;
		const mirroredHorizontalTarget = document.querySelector(`[data-x="${targetIndex}"][data-y="${y}"]`);
		if (mirroredHorizontalTarget && !coloredCells.has(mirroredHorizontalTarget)) {
			const previousColor = mirroredHorizontalTarget.style.backgroundColor;
			colorCell(mirroredHorizontalTarget);
			currentAction.push({ element: mirroredHorizontalTarget, previousColor: previousColor });
			coloredCells.add(mirroredHorizontalTarget);
		}
	}

	function mirrorVertical(cell) {
		const x = parseInt(cell.dataset.x);
		const y = parseInt(cell.dataset.y);
		const targetIndex = gridSize - y + 1;
		const mirroredVerticalTarget = document.querySelector(`[data-x="${x}"][data-y="${targetIndex}"]`);
		if (mirroredVerticalTarget && !coloredCells.has(mirroredVerticalTarget)) {
			const previousColor = mirroredVerticalTarget.style.backgroundColor;
			colorCell(mirroredVerticalTarget);
			currentAction.push({ element: mirroredVerticalTarget, previousColor: previousColor });
			coloredCells.add(mirroredVerticalTarget);
		}
	}

	function mirrorBoth(cell) {
		const x = parseInt(cell.dataset.x);
		const y = parseInt(cell.dataset.y);
		const targetIndexH = gridSize - x + 1;
		const targetIndexV = gridSize - y + 1;

		const mirroredHorizontalTarget = document.querySelector(`[data-x="${targetIndexH}"][data-y="${y}"]`);
		const mirroredVerticalTarget = document.querySelector(`[data-x="${x}"][data-y="${targetIndexV}"]`);
		const mirroredBothTarget = document.querySelector(`[data-x="${targetIndexH}"][data-y="${targetIndexV}"]`);

		if (mirroredHorizontalTarget && !coloredCells.has(mirroredHorizontalTarget)) {
			const previousColor = mirroredHorizontalTarget.style.backgroundColor;
			colorCell(mirroredHorizontalTarget);
			currentAction.push({ element: mirroredHorizontalTarget, previousColor: previousColor });
			coloredCells.add(mirroredHorizontalTarget);
		}
		if (mirroredVerticalTarget && !coloredCells.has(mirroredVerticalTarget)) {
			const previousColor = mirroredVerticalTarget.style.backgroundColor;
			colorCell(mirroredVerticalTarget);
			currentAction.push({ element: mirroredVerticalTarget, previousColor: previousColor });
			coloredCells.add(mirroredVerticalTarget);
		}
		if (mirroredBothTarget && !coloredCells.has(mirroredBothTarget)) {
			const previousColor = mirroredBothTarget.style.backgroundColor;
			colorCell(mirroredBothTarget);
			currentAction.push({ element: mirroredBothTarget, previousColor: previousColor });
			coloredCells.add(mirroredBothTarget);
		}
	}

	gridContainer.addEventListener("mousedown", startDrawing);
	document.addEventListener("mouseup", stopDrawing);
	document.addEventListener("mousemove", draw);

	gridContainer.addEventListener("touchstart", startDrawing, { passive: false });
	document.addEventListener("touchend", stopDrawing, { passive: false });
	document.addEventListener("touchmove", draw, { passive: false });
}

function toggleMirrorHorizontal() {
	mirrorH = !mirrorH;
	mirrorHButton.classList.toggle("active");
	gridContainer.classList.toggle("mirror-h-active");
}

function toggleMirrorVertical() {
	mirrorV = !mirrorV;
	mirrorVButton.classList.toggle("active");
	gridContainer.classList.toggle("mirror-v-active");
}

function updateCurrentGridSize(size) {
	currentGridSize.innerText = size + "px * " + size + "px";
}

function generateGrid(gridSize) {
	actionStack.length = 0;
	gridContainer.style.setProperty("--cells", gridSize);

	for (let i = 1; i <= gridSize; i++) {
		for (let j = 1; j <= gridSize; j++) {
			const gridCell = document.createElement("div");
			gridCell.classList.add("grid-cell");
			gridCell.setAttribute("data-x", j);
			gridCell.setAttribute("data-y", i);

			if (i === gridSize / 2) {
				gridCell.classList.add("middle", "h");
			}

			if (i === gridSize / 4 || i === (gridSize / 4) * 3) {
				gridCell.classList.add("quart", "h");
			}

			if (j === gridSize / 2) {
				gridCell.classList.add("middle", "v");
			}

			if (j === gridSize / 4 || j === (gridSize / 4) * 3) {
				gridCell.classList.add("quart", "v");
			}

			gridContainer.appendChild(gridCell);
		}
	}
}

function destroyGrid() {
	gridContainer.innerHTML = "";
}
