
// Variables
const gameOptionsPanel = document.getElementById('gameOponents');

const board = document.getElementById('board');
const cells = board.querySelectorAll('.cell');

const changeOponentButton = document.getElementById("changeOponent");
const resetGameButton = document.getElementById('resetBoard');

let playerOne, playerTwo, players = [], currentPlayer;

const gameMessages = {
    win: "wins this round!",
    draw: "It's a draw!"
}

let gameEnd = false;

const gameMessagesContainer = document.getElementById('gameMessage');

// LOGIC FOR CREATING PLAYER OBJECTS 
// Player factory function
const createPlayer = (name, mark, score, nameContainer, scoreContainer, hasWon) => {
    return { name, mark, score, nameContainer, scoreContainer, hasWon };
};

// Check for winning condition
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

// prefill inputfields with previously used names
updateNamesFromLocalStorage();

const playerOneNameContainer = document.getElementById('boardDisplayPlayer1');
const playerTwoNameContainer = document.getElementById('boardDisplayPlayer2');

const playerOneScoreContainer = document.getElementById("player1Score");
const playerTwoScoreContainer = document.getElementById("player2Score");


// VARIABLES FOR DEFINING OPONENTS 
const playAgainstHumanButton = document.getElementById('playAgainstHuman');
const playAgainstAIButton = document.getElementById('playAgainstOdin');

// Setting up event listeners
playAgainstHumanButton.addEventListener('click', function (event) {
    players = [];
    createPlayers(event);
    resetBoard();
    updateScoreBoard(playerOne, playerTwo, false);
    dismissPlayerChoosePanel();

    initGameVsHuman();
});

playAgainstAIButton.addEventListener('click', function (event) {
    console.log("Game Started. Player moves first");
    players = [];
    createPlayers(event);
    resetBoard();
    updateScoreBoard(playerOne, playerTwo, false);
    dismissPlayerChoosePanel();

    initGameVsAI();
});

// restart button
resetGameButton.addEventListener('click', resetBoard);

// change oponent button
changeOponentButton.addEventListener('click', showPlayerChoosePanel);


function createPlayers(event) {
    let playerOneName, playerTwoName;

    if (event.target.id == "playAgainstHuman") {
        playerOneName = document.getElementById('playerOneNameField').value || 'Player 1';
        playerTwoName = document.getElementById('playerTwoNameField').value || 'Player 2';

        if (playerOneName !== 'Player 1') {
            localStorage.setItem('playerOneName', playerOneName);
        }
        if (playerTwoName !== 'Player 2') {
            localStorage.setItem('playerTwoName', playerTwoName);
        }

    } else {
        playerOneName = document.getElementById('playerOneNameAI').value || 'Player';
        playerTwoName = 'Odin';

        if (playerOneName !== 'Player') {
            localStorage.setItem('playerName', playerOneName);
        }
    }

    playerOne = createPlayer(playerOneName, 'X', 0, playerOneNameContainer, playerOneScoreContainer, false );
    playerTwo = createPlayer(playerTwoName, '0', 0, playerTwoNameContainer,  playerTwoScoreContainer, false );

    localStorage.setItem("currentPlayer", JSON.stringify(playerOne));
    
    currentPlayer = playerOne;
    players.push(playerOne, playerTwo);

    return  players, currentPlayer;

}

function dismissPlayerChoosePanel() {
    gameOptionsPanel.classList.add('game-active');

    setTimeout(() => {
        board.classList.remove("will-clear");
    }, 100);
}
function showPlayerChoosePanel() {
    gameOptionsPanel.classList.remove('game-active');
    board.classList.add("will-clear");
    cells.forEach(cell => {
        cell.removeEventListener("click", handleHumanCellClick);
    });
}
function updateScoreBoard(playerOne, playerTwo, winner) {
    playerOneNameContainer.textContent = playerOne.name;
    playerTwoNameContainer.textContent = playerTwo.name;

    playerOneScoreContainer.textContent = playerOne.score;
    playerTwoScoreContainer.textContent = playerTwo.score;

    if (winner) {
        players.forEach(player => {
            if (player.hasWon) {
                player.nameContainer.parentNode.classList.add('winner');
            } else {
                player.nameContainer.parentNode.classList.add('looser');
            }
        })
    }
}

function resetBoard() {
    board.classList.add("will-clear");
    board.classList.remove('game-ended', 'game-tie');
    const timeout = 0.03 * 9 * 1000;

    players.forEach(player => {
        player.nameContainer.parentNode.classList.remove('winner', 'looser');
        player.hasWon = false;
    })

    // board reset logic
    setTimeout(() => {
        cells.forEach((cell) => { 
            cell.textContent = ''; 
            cell.classList.remove('winner', 'marked');
        });

        board.classList.remove("will-clear");
        if (!gameEnd) {
            currentPlayer = playerOne;
        } else if (currentPlayer.name === 'Odin' && gameEnd) {
            makeAIMove(true);
        }
        
        displayTurnMessage(currentPlayer);

        gameEnd = false;

    }, timeout + 140);
}

function updateNamesFromLocalStorage() {
    const playerOneName = localStorage.getItem('playerOneName');
    const playerTwoName = localStorage.getItem('playerTwoName');
    const playerName = localStorage.getItem('playerName');

    if (playerOneName) {
        document.getElementById('playerOneNameField').value = playerOneName;
    }
    if (playerTwoName) {
        document.getElementById('playerTwoNameField').value = playerTwoName;
    }
    if (playerName) {
        document.getElementById('playerOneNameAI').value = playerName;
    }

    if (localStorage.getItem('currentPlayer')) {
        let cp = JSON.parse(localStorage.getItem('currentPlayer'));
        let cpm = cp.mark;

        gameMessagesContainer.innerHTML = `It's <span> ${cp.name} </span>'s turn to place ${cpm}.`;
    }
}

function displayTurnMessage(player) {
    gameMessagesContainer.innerHTML = `It's <span> ${player.name} </span>'s turn to place ${player.mark}.`;
}

function initGameVsHuman() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleAICellClick);
        cell.addEventListener('click', handleHumanCellClick);
    }); 
}

// Handle cell click events
function handleHumanCellClick(event) {
    const cell = event.target;
    cell.classList.remove(`mark-${playerOne.mark}`, `mark-${playerTwo.mark}`);
    if (markCell(cell, currentPlayer.mark)) {
        if (checkWin(currentPlayer.mark)) {
            gameWon(currentPlayer);
            switchTurns();
            return;
        } else if (isBoardFull()) {
            gameTie();
            switchTurns();
            return;
        }
        switchTurns();
    }

}

function markCell(cell, mark) {
    if (cell.textContent === '') {
        cell.textContent = mark;
        cell.classList.add('marked');
        return true;
    }
    return false;
}

function initGameVsAI() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleHumanCellClick);
        cell.addEventListener('click', handleAICellClick);
    });
}

function handleAICellClick(event) {
    let cell = event.target;
    console.log("Player move at cell: ", cell.dataset.cell);
    cell.classList.remove(`mark-${playerOne.mark}`, `mark-${playerTwo.mark}`);

    if (markCell(cell, currentPlayer.mark)) {
        if (checkWin(currentPlayer.mark)) {
            gameWon(currentPlayer);
            console.log(`${currentPlayer.name} made last move and won;`)
        } else if (isBoardFull()) {
            gameTie();
            console.log(`${currentPlayer.name} made last move. Board is Full. It's a tie;`)
        }
        switchTurns();
    }

    // AI makes its move only if the game has not ended
    if (!gameEnd) {
        let aiMoveMade = makeAIMove();
        if (!aiMoveMade) {
            if (isBoardFull()) {
                gameTie();
            } else {
                switchTurns();
            }
        }
    }
}

function makeAIMove(aiMovesFirst = false) {
    // AI's strategy to win or block
    
    if (aiMovesFirst) {
        console.log("Ai moves first");
        return makeRandomMove();
    }

    let winningMove = findBestMove(currentPlayer.mark);
    if (winningMove !== null) {
        markCell(cells[winningMove], currentPlayer.mark);
        console.log("Winning move at cell: ", winningMove + 1); // Debugging output
        checkWin(currentPlayer.mark);
        gameWon(currentPlayer);
        switchTurns();
        return true;
    }
    
    // Try to block the human player if they are about to win
    let blockingMove = findBestMove(currentPlayer === playerOne ? playerTwo.mark : playerOne.mark);
    if (blockingMove !== null) {
        markCell(cells[blockingMove], currentPlayer.mark);
        console.log("Blocking move at cell: ", blockingMove + 1); // Debugging output

        if (isBoardFull()) {
            gameTie();
            switchTurns();
            return;
        }
        switchTurns();

        return true;
    }

    if (checkWin(currentPlayer.mark)) {
        gameWon(currentPlayer);
        switchTurns();
        return;
    } else if (isBoardFull()) {
        gameTie();
        switchTurns();
        return;
    }

    // Otherwise, pick a random cell
    return makeRandomMove();
}

function findBestMove(mark) {
    for (let condition of winConditions) {
        let countMark = condition.reduce((acc, i) => acc + (cells[i].textContent === mark ? 1 : 0), 0);
        if (countMark === 2) {
            // Check if there's a free spot to complete the line
            let emptySpot = condition.find(i => cells[i].textContent === '');
            if (emptySpot !== undefined) return emptySpot;
        }
    }
    return null;
}

function makeRandomMove() {
    let emptyIndices = [];
    cells.forEach((cell, index) => {
        if (cell.textContent === '') {
            emptyIndices.push(index);
        }
    });

    if (emptyIndices.length >=8 && emptyIndices.includes(4)) {
    // If the middle cell is empty, make a move there
        markCell(cells[4], currentPlayer.mark);
        console.log("Random move at cell: ", 5); // Debugging output
        switchTurns();
        return true;
    }

    // No available moves, should handle as a draw if not already won
    if (emptyIndices.length === 0) {
        if (!gameEnd) {
            gameTie();
            console.log("Board was full. No random move could be made.")
        }
        return false;
    }

    // Select a random empty cell and make a move
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    if (markCell(cells[randomIndex], currentPlayer.mark)) {
        // if (checkWin(currentPlayer.mark)) {
        //     console.log("Winning move at index %s", randomIndex); 
        //     gameWon(currentPlayer);
        //     return true;
        // }

        // Check if this move resulted in a full board without a win
        if (isBoardFull()) {
            gameTie();
             console.log("Random Blocking move at index: ", randomIndex + 1); 
            return true;
        }

        console.log("Random move at cell:", randomIndex + 1);
        switchTurns();
        return true;
    }

    return false; // Failsafe return in case markCell fails unexpectedly
}



function gameWon(player) {
    player.score++;
    player.hasWon = true;
    board.classList.add('game-ended');
    updateScoreBoard(playerOne, playerTwo, true);
    addEndGameMessage(currentPlayer, true);
    gameEnd = true;
}

function gameTie() {
    board.classList.add('game-tie');
    addEndGameMessage(currentPlayer, false);
    gameEnd = true;
}




function checkWin(mark) {  
    for (let condition of winConditions) {
        if (condition.every(index => cells[index].textContent === mark)) {
            // If a winning combination is found, add a class to those cells
            condition.forEach(index => {
                cells[index].classList.add('winner');
            });
            return true;  // Return true to indicate a win has been found
        }
    }
    return false;  // Return false if no winning combination is found
}

// Check if the board is full
function isBoardFull() {
    return [...cells].every(cell => cell.textContent !== '');
}

// Switch turns between players
function switchTurns() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
    if(!gameEnd) {
        displayTurnMessage(currentPlayer);
    }

    return currentPlayer;
}

function addEndGameMessage(player, winner) {
    if (winner) {
        gameMessagesContainer.innerHTML = `<span> ${player.name} </span> ${gameMessages.win}`;
    } else {
        gameMessagesContainer.innerHTML = `${gameMessages.draw}`;
    }
}

cells.forEach(cell => {
    cell.addEventListener("mouseover", (e) => displayHoverMark(e));
    cell.addEventListener("mouseleave", (e) => hideHoverMark(e));
})

function displayHoverMark(e) {
    if (e.target.textContent === "") {
        e.target.classList.add(`mark-${currentPlayer.mark}`);
    } else {
        return;
    }
}

function hideHoverMark(e) {
    e.target.classList.remove(`mark-${currentPlayer.mark}`);
}