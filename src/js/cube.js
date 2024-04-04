// Select the parent element
const cubeContainer = document.getElementById('cubeContainer');
const wH = window.innerHeight;

// Create text element
const txt = document.createElement('span');
txt.classList.add("scroll-text");
txt.innerText = "scroll down";

cubeContainer.appendChild(txt);


// Create cube-scroll element
const cubeScroll = document.createElement('div');
cubeScroll.classList.add('cube-scroll');


// Create cube sides and append to cube-scroll
const sides = ['front', 'left', 'back', 'right', 'top', 'bottom'];
sides.forEach(side => {
    const cubeSide = document.createElement('div');
    cubeSide.classList.add('side', side);
    cubeScroll.appendChild(cubeSide);

    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined");
    icon.innerText = "expand_more";
    cubeSide.append(icon);
});

// Append cube-scroll to cube-container
cubeContainer.appendChild(cubeScroll);

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

            if (cubeContainer) {
                if (windowScrollPercent <= 0) {
                    cubeContainer.style.transform = `translateX(-50%) translateY(${scrollPercent}%) scale(0)`;
                } else {
                    cubeContainer.style.transform = `translateX(-50%) translateY(${-scrollPercent}%) scale(${windowScrollPercent / 100})`;
                }
            }

            if (!isScrollEnabled) return;
            container.style.transform = `translateX(-50%) translateY(${scrollPercent}%) `;

            isScrolling = false;
        });

        isScrolling = true;
    }
});