const boxes = document.querySelectorAll(".box");

const gameInfo = document.querySelector(".gameInformation");

const newGameButton = document.querySelector(".button");

let currentPlayer;
let gameGrid;

const winningPosition = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

// Function to intialize a new game

function newGame() {
	currentPlayer = "X";
	gameGrid = ["", "", "", "", "", "", "", "", ""];

	newGameButton.classList.remove("active");

	gameInfo.innerText = `Current Player - ${currentPlayer} `;

	// making each box empty in UI and making all boxes cursor pointer
	boxes.forEach((box) => {
		box.style.pointerEvents = "all";
		box.innerText = "";
		box.classList.remove("win");
	});
}

newGame();

// adding event listener on each box . Here's index the index of box in boxes list of elements
// index tell us the box on which we clicked in order to add data to gameGrid
// hence we didn't used Event.target

boxes.forEach((box, index) => {
	box.addEventListener("click", () => {
		handleClick(index);
	});
});

// will add appropriate text to box which is clicked

function handleClick(index) {
	// first checking if the current box is empty or not
	if (gameGrid[index] === "") {
		// making box unclickable
		boxes[index].style.pointerEvents = "none";

		// adding correct symbol to box using 'currentPlayer'
		boxes[index].innerText = currentPlayer;

		// adding the correct symbol to 'gameGrid' also
		gameGrid[index] = currentPlayer;

		// Switching the player
		switchPlayer();

		// Checking anyone won or not
		checkGameOver();
	}
}

// function to switch player

function switchPlayer() {
	if (currentPlayer === "X") {
		currentPlayer = "O";
	} else {
		currentPlayer = "X";
	}

	// Updating Current Player in UI
	gameInfo.innerText = `Current Player - ${currentPlayer} `;
}

function checkGameOver() {
	let winner = "";

	winningPosition.forEach((position) => {
		if (
			gameGrid[position[0]] !== "" &&
			gameGrid[position[1]] !== "" &&
			gameGrid[position[2]] !== "" &&
			gameGrid[position[0]] == gameGrid[position[1]] &&
			gameGrid[position[1]] == gameGrid[position[2]]
		) {
			// finding the winner
			if (gameGrid[position[0]] == "X") {
				winner = "X";
			} else {
				winner = "O";
			}

			// making the box green

			boxes[position[0]].classList.add("win");
			boxes[position[1]].classList.add("win");
			boxes[position[2]].classList.add("win");
		}

		// it means we've a winner
		if (winner != "") {
			gameInfo.innerText = `Winner - ${winner}`;
			newGameButton.classList.add("active");

			boxes.forEach((box) => {
				// made box unclickable to stop the game
				box.style.pointerEvents = "none";
			});
			return;
		}

		// if there's a TIE
		let fillCount = 0;

		gameGrid.forEach((box) => {
			if (box != "") fillCount++;
		});

		// if all the boxes are filled and there's no winner
		if (fillCount === 9) {
			gameInfo.innerText = "Game Tied !";
			newGameButton.classList.add("active");
		}
	});
}

// Whenever new game will be clicked , new game will be intialized
newGameButton.addEventListener("click", () => {
	newGame();
});
