// Select the parent element
const cubeContainer = document.getElementById('cubeContainer');

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