const dash = document.getElementById("dash");
const side = document.getElementById("side");
const sideTrigger = document.getElementById("sidebarTrigger");
const highlighterContainer = side.querySelector('.sidebar-content');
const highlighterContainerPosition = highlighterContainer.getBoundingClientRect();
const highlightTriggers = document.querySelectorAll('li.sidebar-list-item');
const highlighter = document.createElement('div');
const searchForm = document.getElementById("searchForm");
highlighter.classList.add("highlighter");
highlighterContainer.appendChild(highlighter);

sideTrigger.addEventListener("click", collapse);
setHighlighterInitialPosition();

function collapse () {
  dash.classList.toggle("collapsed");
  sideTrigger.classList.toggle("collapsed");
}

function setHighlighterInitialPosition() {
    const activeItemPosition = document.querySelector(".sidebar-list-item.active").getBoundingClientRect();

    highlighter.style.cssText = `
        width     : ${activeItemPosition.width}px;
        height    : ${activeItemPosition.height}px;
        transform : translate(
                        ${activeItemPosition.left - highlighterContainerPosition.left}px, 
                        ${activeItemPosition.top - highlighterContainerPosition.top}px
                    );
        opacity: 0`;
}

function moveHighlighter(e) {

    if (e.target.classList.contains('active')) {
        dismissHighlighter();
        return;
    } 
    let hoveredItemTopPosition;
    
    setTimeout(() => {
        hoveredItemTopPosition = e.target.getBoundingClientRect();
        highlighter.style.cssText = `
        width     : ${hoveredItemTopPosition.width}px;
        height    : ${hoveredItemTopPosition.height}px;
        transform : translate(
                        ${hoveredItemTopPosition.left - highlighterContainerPosition.left}px, 
                        ${hoveredItemTopPosition.top - highlighterContainerPosition.top}px
                    );
        opacity: 0.35`;
    }, 50);
    
}

function dismissHighlighter() {
    highlighter.style.opacity = 0;
    // highlighter.style.width = 0;
}

function setActiveItem() {
    highlightTriggers.forEach(trigger => trigger.classList.remove("active"));
    this.classList.add("active");
    dismissHighlighter(); 
};

highlightTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', moveHighlighter);
    trigger.addEventListener('click', setActiveItem);
});

highlighterContainer.addEventListener("mouseleave", dismissHighlighter);

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchForm.reset();
});