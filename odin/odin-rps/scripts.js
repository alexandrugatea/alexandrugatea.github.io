let playerChoice = document.querySelectorAll(".player-choice");
let computerSelection;
let playerScoreContainer = document.getElementById("playerScore");
let computerScoreContainer = document.getElementById("computerScore");
let computerChoiceContainer = document.getElementById("computerChoice");
let messageContainer = document.querySelector(".message");
let message = messageContainer.querySelector(".result");

let playerScore = 0;
let computerScore = 0;
let maxScore = 5;

let resetGame = document.getElementById("resetGame");

playerChoice.forEach(function (choice) {
	choice.addEventListener("click", function () {
		playerChoice.forEach(function (ch) {
			ch.classList.remove("selected");
		});
		choice.classList.add("selected");

		let playerSelection = choice.getAttribute("data-choice");
		console.log(playerSelection);
		computerSelection = getComputerChoice();

		console.log(computerSelection);

		let result = playRound(playerSelection, computerSelection);
		console.log(result);

		messageContainer.classList.remove("hidden");
	});
});

function playRound(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
		message.innerText = "It's a tie!";
		message.classList.remove("victory", "defeat");
	} else if (
		(playerSelection === "rock" && computerSelection === "scissors") ||
		(playerSelection === "paper" && computerSelection === "rock") ||
		(playerSelection === "scissors" && computerSelection === "paper")
	) {
		message.innerText = "You Won!";
		message.classList.remove("defeat");
		message.classList.add("victory");

		playerScore++;
		playerScoreContainer.innerText = playerScore;

		if (playerScore === maxScore) {
			message.innerText = "You Won the Game!";
			gameOver();
		}
	} else {
		message.innerText = "You Lost!";
		message.classList.remove("victory");
		message.classList.add("defeat");

		computerScore++;
		computerScoreContainer.innerText = computerScore;

		if (computerScore === maxScore) {
			message.innerText = "Computer Won the Game!";
			gameOver();
		}
	}
	return message.innerText;
}

// Get Computer's choice
function getComputerChoice() {
	// generate a random number from 0 to 1
	const randomNumber = Math.floor(Math.random() * 3);

	// declare the choice of the computer
	let computerChoice;

	// assign rock, paper or scissors based on the random number
	if (randomNumber === 0) {
		computerChoice = "rock";
	} else if (randomNumber === 1) {
		computerChoice = "paper";
	} else {
		computerChoice = "scissors";
	}

	return (computerChoiceContainer.innerText = computerChoice);
}

function gameOver() {
	playerChoice.forEach(function (choice) {
		choice.setAttribute("disabled", true);
		choice.classList.remove("selected");
	});

	resetGame.style.display = "block";
}

function reset() {
	playerScore = 0;
	computerScore = 0;
	playerScoreContainer.innerText = playerScore;
	computerScoreContainer.innerText = computerScore;

	playerChoice.forEach(function (choice) {
		choice.removeAttribute("disabled");
	});

	resetGame.style.display = "none";
	messageContainer.classList.add("hidden");
}

resetGame.addEventListener("click", reset);
