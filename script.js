function getGameBoard() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

function playerChoice(gameBoard) {
    let choice;
    while (true) {
        choice = parseInt(prompt("Select a tile (1 to 9): "), 10);
        if (choice >= 1 && choice <= 9 && typeof gameBoard[choice - 1] === "number") {
            break;
        }
        alert("Invalid choice! Please pick an available number between 1 and 9.")
    }
    return choice;
};

function players() {
    let gameBoard = getGameBoard();
    let player1Choices = [];
    let player2Choices = [];

    for (let i = 0; i < 5; i++) {   // this loop defines the maximum ammount of turns of each player
        let choice1 = playerChoice(gameBoard);
        console.log("Player 1 chose:", choice1);
        player1Choices.push(choice1);
        gameBoard[choice1 - 1] = "X"; // Marks with an "X"
        console.log(gameBoard);

        if (checkWin(player1Choices)) {
            console.log("Player 1 Wins!");
            return;
        }

        if (gameBoard.every(tile => typeof tile !== "number")) break; // Stop if the board is full!

        let choice2 = playerChoice(gameBoard);
        console.log("Player 2 chose: ", choice2);
        player2Choices.push(choice2);
        gameBoard[choice2 - 1] = "O"; // Marks with an "O"
        console.log(gameBoard);

        if(checkWin(player2Choices)) {
            console.log("Player 2 wins!");
            return;
        }
    }

    console.log("It's a draw!"); // draw possibility

};

function checkWin(choices) {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    return winningCombinations.some(combination =>
        combination.every(num => choices.includes(num))
    );
}


function gameFlow() {
    console.log("Starting the game...");
    console.log("Please make your choice")
    players();    
};

//game start
gameFlow();