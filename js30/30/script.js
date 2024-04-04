(function () {
    console.clear();
    
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const bestScoreContainer = document.querySelector('.best-score');
    const moles = document.querySelectorAll('.mole');
    let timerContainer = document.querySelector('#timer');
    let lastHole;
    let timeUp = false;
    let score = 0;
    let bestScore = 0;

    bestScore = localStorage.getItem('score');
    if (bestScore) console.log(bestScore);

    bestScore ? bestScoreContainer.innerHTML = bestScore : bestScoreContainer.innerHTML = "0";

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            return randomHole(holes);
        }

        lastHole = hole;
        return hole;
    }

    function peep() {
        const time = randomTime(400, 1100);
        const hole = randomHole(holes);

        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) peep();
        }, time);
    }

    function startGame() {
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
        playTime = 10; // seconds
        peep();
        setTimeout(() => {
            timeUp = true
        }, playTime * 1000)

        timerContainer.textContent = playTime
        const countdown = setInterval(() => {
            playTime--;
            timerContainer.textContent = parseInt(Math.round(playTime));

            if (playTime <= 0) {
                clearInterval(countdown);
                timerContainer.innerHTML = playTime;
                return;
            };
        }, 1000);

    }

    function gameScore(e) {
        if (!e.isTrusted) return;
        score++;

        if (score > bestScore) {
            bestScore = score;
            bestScoreContainer.innerHTML = bestScore;
            localStorage.setItem('score', bestScore);
        }

        this.parentElement.classList.remove('up');
        scoreBoard.textContent = score;
    }

    moles.forEach(mole => mole.addEventListener("click", gameScore));

    document.getElementById("startGame").addEventListener("click", startGame);

})();

