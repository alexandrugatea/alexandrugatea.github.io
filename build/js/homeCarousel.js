const holder = document.getElementById("holder");
let intervalId;
let isHovered = false; // Flag to track hovering state

function switchCard() {
    if (!isHovered) {
        const holder = document.getElementById("holder");
        const lastChild = holder.lastElementChild;
        lastChild.classList.add("kustom-fade-out");
        holder.classList.add("move");
        cardsProgressBar();

        setTimeout(function () {
            holder.removeChild(lastChild);
        }, 350);

        setTimeout(function () {
            holder.classList.remove("move");
            lastChild.classList.remove("kustom-fade-out");
        }, 400);

        setTimeout(function () {
            lastChild.classList.add("kustom-fade-in");
            holder.prepend(lastChild);
        }, 450);

        setTimeout(function () {
            lastChild.classList.remove("kustom-fade-in");
        }, 750);
    }
}

function cardsProgressBar() {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.visibility = 'visible'; // Make progress bar visible
    progressBar.style.animation = 'none'; // Reset animation
    setTimeout(() => {
        progressBar.style.animation = 'progressBarAnimation 3s linear forwards'; // Restart animation after a short delay
    }, 10); // Adjust the delay as needed
}

function autoPlayCards() {
    switchCard();
    clearInterval(intervalId);
    intervalId = setInterval(switchCard, 3000);
}

// Start the initial auto-play
intervalId = setInterval(switchCard, 3000);

holder.addEventListener("click", function () {
    // Allow clicking the holder to restart the interval
    if (isHovered) {
        isHovered = false; // Reset hover flag to allow interval restart
        progressBar.style.animationPlayState = 'paused';
    }
    autoPlayCards();
    isHovered = true;
    clearInterval(intervalId);
    progressBar.style.animationPlayState = 'paused';
});

holder.addEventListener("mouseenter", function () {
    isHovered = true;
    clearInterval(intervalId); // Pause the interval
    const progressBar = document.getElementById('progressBar');
    progressBar.style.animationPlayState = 'paused'; // Pause progress bar animation
});

holder.addEventListener("mouseleave", function () {
    isHovered = false;
    // Restart the interval with the original delay (3000)
    intervalId = setInterval(switchCard, 3000);
    const progressBar = document.getElementById('progressBar');
    progressBar.style.animationPlayState = 'running'; // Resume progress bar animation
});