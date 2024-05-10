
console.clear();
// ============================================================
// Variables    
// ============================================================

const resetGameButton = document.getElementById('resetBoard');

const board = document.getElementById('board');
const cells = board.querySelectorAll('.cell');


const playOptions = document.getElementById('gameOptions');

//Play Buttons
const playAgainstHuman = document.getElementById('playAgainstHuman');
const playAgainstOdin = document.getElementById('playAgainstOdin');

// score board
const scoreBoardPlayer1Name = document.getElementById('boardDisplayPlayer1');
const scoreBoardPlayer2Name = document.getElementById('boardDisplayPlayer2');

// playerMarks

const p1Mark = "x";
const p2Mark = "0";

let turn = true; 

let boardState = ["", "", "", "", "", "", "", "", ""];


const changeOponentButton = document.getElementById("changeOponent");


// ============================================================
// LISTENERS    
// ============================================================

playAgainstHuman.addEventListener("click", (e) => playHuman(e));
playAgainstOdin.addEventListener("click", (e) => playOdin(e));

resetGameButton.addEventListener('click', resetBoard);
changeOponentButton.addEventListener('click', changeOponent);

// ============================================================
// PLAY AGAINST HUMAN
// ============================================================
function playHuman(e) {
    prepareBoard(e);
    console.log("board ready");
    cells.forEach(cell => cell.addEventListener('click', playerMove));
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let winner = null;
    winConditions.forEach((condition) => {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            winner = boardState[a];
        }
    });

    if (winner) {
        alert("Winner is " + winner);
        // resetBoard();
    } else if (boardState.every(cell => cell !== "")) {
        alert("It's a tie!");
        // resetBoard();
    }
}

function playOdin(e) {
    prepareBoard(e);
    console.log("AI board ready");
    cells.forEach(cell => cell.addEventListener('click', function(e) {
        playerMove(e);
        setTimeout(aiMove, 300); // AI makes a move shortly after the player
    }));
}

function aiMove() {
    const emptyCells = Array.from(cells).filter(c => c.textContent == "");
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (randomCell) {
        randomCell.textContent = switchTurn();
        checkWin(); // Check if AI wins
    }
}


// --------------- PLAY AGAINST HUMAN END --------------------------

// ============================================================
// PLAY AGAINST AI
// ============================================================

function playOdin(e) {
    prepareBoard(e);
}

// --------------- PLAY AGAINST AI END -------------------------- 



// ============================================================
// FUNCTIONS    
// ============================================================

function changeOponent() {
    playOptions.classList.remove("game-active")
}

function switchTurn() {
    const currentMark = turn ? p1Mark : p2Mark;
    turn = !turn;
    return currentMark;
}

function resetBoard() {
    board.classList.add("will-clear");
    const timeout = 0.03 * 9 * 1000;
    turn = true;
    boardState = ["", "", "", "", "", "", "", "", ""];

    setTimeout(() => {
        emptyCell()
        board.classList.remove("will-clear");
    }, timeout + 140);
}

function emptyCell() {
    cells.forEach((cell) => {
        cell.innerHTML = '';
    });
}


function playerMove(e) {
    const index = Array.from(cells).indexOf(e.target);

    if (boardState[index] == "") {
        const mark = switchTurn();
        boardState[index] = mark;
        e.target.textContent = mark;
        checkWin();
    } else {
        return;
    }
}



function prepareBoard(e) {
    playOptions.classList.add("game-active")
    resetBoard();
    const clickedButton = e.target.id;

    if (clickedButton === "playAgainstHuman") {
        getPlayerNames("playerOne", "playerTwo")
        
    } else {
        getPlayerNames("playerOneVsAI", "playerTwoVsAI")
    }
}

function getPlayerNames(player1, player2) {
    player1 = document.getElementById(player1);
    player2 = document.getElementById(player2);

    scoreBoardPlayer1Name.textContent = player1.value != "" ? player1.value : "Player 1";
    scoreBoardPlayer2Name.textContent = player2.value != "" ? player2.value : "Player 2";

    if (player2.value == "Odin") {
        scoreBoardPlayer1Name.textContent = player1.value != "" ? player1.value : "Player";
    }
}