(function () {
    function getGameBoard() {
        return Array(9).fill(null); // empty game board creation
    }

    let gameBoard = getGameBoard();
    let currentPlayer = "X";
    let player1Choices = [];
    let player2Choices = [];
    let gameOver = false; // gameover flag
    let gameMessages = document.getElementById('game-messages');
    gameMessages.textContent = "Enjoy!";

    function handleTileClick(event) {
        if (gameOver) return; // prevents clicks if the game is over

        const tile = event.target;
        const tileIndex = parseInt(tile.dataset.index, 10);

        // prevent clicking an already chosen tile
        if (gameBoard[tileIndex] !== null) {
            gameMessages.textContent = "Tile already taken! Choose another!";
            return;
        }

        tile.textContent = currentPlayer;
        gameBoard[tileIndex] = currentPlayer;

        //store player choices
        if (currentPlayer === "X") {
            player1Choices.push(tileIndex + 1);
            if (checkWin(player1Choices)) {
                gameMessages.textContent = "Player 1 Wins!!";
                gameOver = true;
                return;
            }
        } else {
            player2Choices.push(tileIndex + 1);
            if (checkWin(player2Choices)) {
                gameMessages.textContent = "Player 2 Wins!!";
                gameOver = true;
                return;
            }
        }

        // check for a draw
        if (gameBoard.every(tile => tile !== null)) {
            gameMessages.textContent = "It's a Draw!!";
            gameOver = true;
            return;
        }

        //switch players
        currentPlayer = currentPlayer === "X" ? "O" : "X";

    }

    // old console log gamecode
    // function players() {
    //     let gameBoard = getGameBoard();
    //     let player1Choices = [];
    //     let player2Choices = [];

    //     for (let i = 0; i < 5; i++) {   // this loop defines the maximum ammount of turns of each player
    //         let choice1 = playerChoice(gameBoard);
    //         console.log("Player 1 chose:", choice1);
    //         player1Choices.push(choice1);
    //         gameBoard[choice1 - 1] = "X"; // Marks with an "X"
    //         console.log(gameBoard);

    //         if (checkWin(player1Choices)) {
    //             console.log("Player 1 Wins!");
    //             return;
    //         }

    //         if (gameBoard.every(tile => typeof tile !== "number")) break; // Stop if the board is full!

    //         let choice2 = playerChoice(gameBoard);
    //         console.log("Player 2 chose: ", choice2);
    //         player2Choices.push(choice2);
    //         gameBoard[choice2 - 1] = "O"; // Marks with an "O"
    //         console.log(gameBoard);

    //         if(checkWin(player2Choices)) {
    //             console.log("Player 2 wins!");
    //             return;
    //         }
    //     }

    //     console.log("It's a draw!"); // draw possibility

    // };

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


    // old gamestart code
    // function gameFlow() {
    //     console.log("Starting the game...");
    //     console.log("Please make your choice")
    //     players();    
    // };

    (function domManagement() {
        const gameBoardElement = document.getElementById('game-board');
        gameBoardElement.innerHTML = ""; //clear previous tiles

        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.index = i; //store index for reference
            tile.addEventListener('click', handleTileClick);
            gameBoardElement.appendChild(tile);
        }

    })();

    (function resetButton() {
        const buttonContainer = document.getElementById('buttons-container');

        const resetButton = document.createElement('button'); //create button   
        resetButton.className = 'reset-button';
        resetButton.textContent = 'Play again';
        buttonContainer.appendChild(resetButton);

        let gameCount = 1; //counts rounds

        resetButton.addEventListener('click', () => {
            gameCount += 1;
            gameBoard = getGameBoard();
            currentPlayer = "X";
            player1Choices = [];
            player2Choices = [];
            gameOver = false;
            gameMessages.textContent = `Restarting game, Round ${gameCount}`;

            const tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => {
                tile.textContent = ''; //reset tiles
            });
        });
    })();

    //game start
    domManagement();
})();