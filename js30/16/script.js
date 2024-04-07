(function () {
    const hero = document.querySelector('.hero');
    const text = hero.querySelector('h1');
    const walk = 300;

    function shadow(e) {
        const width = hero.offsetWidth;
        const height = hero.offsetHeight;

        let x = e.offsetX;
        let y = e.offsetY;

        if (this !== e.target) {
            x = x + e.target.offsetLeft;
            y = y + e.target.offsetTop;
        }

        const xWalk = Math.round((x / width * walk) - (walk / 2));
        const yWalk = Math.round((y / height * walk) - (walk / 2));

        text.style.textShadow = `
            ${xWalk}px ${yWalk}px  0 rgba(200, 55, 0, 0.75), 
            ${xWalk * -1}px ${yWalk * -1}px  0 rgba(55, 155, 100, 0.75), 
            ${yWalk}px ${xWalk}px  0 rgba(55, 0, 155, 0.75), 
            ${-yWalk}px ${-xWalk}px  0 rgba(100, 55, 100, 0.75)  `;

    }

    hero.addEventListener("mousemove", shadow)
})();