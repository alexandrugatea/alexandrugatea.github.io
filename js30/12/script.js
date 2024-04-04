(function () {
    console.clear();
    const pressed = [];

    const words = ['Quixotic', 'Jazz', 'Gymkhana', 'Flyovers', 'Brick', 'Waldorf', 'Mumps', 'Synchronize', 'Liquid', 'Vex'];
    const code = words[1][0] + words[2].slice(-1) + words[3][4] + words[5][1] + 
        words[3].slice(-1) + words[0].slice(-1) + words[4][1] + words[8].slice(-2, -1) + words[6].slice(-2, -1) + words[0].slice(-3, -2);
    
    const secretCode = code.toLowerCase();
    const prize = document.getElementById('prize');

    function keyUpHandler(e) {
        pressed.push(e.key);
        pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
        // console.log(pressed);

        if (pressed.join("").includes(secretCode)) {
            // console.log("You did it");
            prize.classList.add("active");
            window.removeEventListener('keyup', keyUpHandler);

        } else {
            prize.classList.remove('active');
        }
    }

    window.addEventListener('keyup', keyUpHandler);


})();