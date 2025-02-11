class EventManager {
  constructor(
    gameController,
    boardRenderer,
    humanBoardDivId,
    computerBoardDivId,
    gameOverElement,
    startNewGameButton,
    randomlyPlaceShipsButton,
    gameOverMessageId
  ) {
    this.gameController = gameController;
    this.boardRenderer = boardRenderer;
    this.humanBoardDivId = humanBoardDivId;
    this.computerBoardDivId = computerBoardDivId;
    this.gameOverElement = gameOverElement;
    this.startNewGameButton = startNewGameButton;
    this.randomlyPlaceShipsButton = randomlyPlaceShipsButton;
    this.gameOverMessageId = gameOverMessageId;
    // Listen for game state changes
    this.gameController.onGameStateChange((newState) => {
      if (newState === 'ready') {
        this.addBoardEvents(
          computerBoardDivId,
          humanBoardDivId,
          gameOverElement,
          gameOverMessageId
        );
      }
    });
  }

  addBoardEvents(
    computerBoardDivId,
    humanBoardDivId,
    gameOverElement,
    gameOverMessageId
  ) {
    this.attachAttackListeners(
      // Attach attack events
      computerBoardDivId,
      humanBoardDivId,
      gameOverElement,
      gameOverMessageId,
      (gameBoard, cell, row, col) => {
        this.boardRenderer.setCellColor(gameBoard, cell, row, col);
      }
    );
  }

  addButtonEvents(
    humanBoardDivId,
    computerBoardDivId,
    gameOverElement,
    startNewGameButton,
    randomlyPlaceShipsButton
  ) {
    // Attach place human player ships randomly event
    this.attachPlaceShipsRandomlyListener(
      randomlyPlaceShipsButton,
      humanBoardDivId
    );

    this.attachStartNewGameListeners(
      // Attach start new game click events
      humanBoardDivId,
      computerBoardDivId,
      gameOverElement,
      startNewGameButton,
      randomlyPlaceShipsButton
    );
  }

  // Board listeners

  // Attack clicks only attached to computer-board
  attachAttackListeners(
    computerBoardDivId,
    humanBoardDivId,
    gameOverElement,
    gameOverMessageId
  ) {
    const boardDiv = document.getElementById(computerBoardDivId); // Get board html element
    const cells = boardDiv.childNodes; // Get cell html elements

    if (computerBoardDivId) {
      // Attach event listeners
      cells.forEach((cell) => {
        cell.addEventListener(
          'click',
          () => {
            if (!this.gameController.isGameReady()) {
              return;
            }
            const row = parseInt(cell.dataset.row, 10); // Keep these in or not?
            const col = parseInt(cell.dataset.col, 10);

            this.handleCellClick(
              cell,
              row,
              col,
              gameOverElement,
              humanBoardDivId,
              gameOverMessageId
            );
          },
          { once: true }
        );
      });
    } else {
      console.error(
        `Board container with ID "${computerBoardDivId}" not found.`
      );
    }
  }

  // Button listeners

  // Attach event to placeShipsRandomly button - used only for human player placing ships
  attachPlaceShipsRandomlyListener(randomlyPlaceShipsButton, boardDivId) {
    const placeShipsRandomlyButton = document.getElementById(
      randomlyPlaceShipsButton
    );

    // When button is clicked human player ships will be placed randomly
    // Computer player ships are always set randomly during game init
    placeShipsRandomlyButton.addEventListener('click', () => {
      // Set up player ships in the game board array
      this.gameController.placeShipsRandomly(this.gameController.humanPlayer);

      // Display ships on the player game board
      this.boardRenderer.renderPlayerShips(
        boardDivId,
        this.gameController.humanPlayer.gameBoard.board // Human player game board
      );

      // Toggle button display to none
      this.boardRenderer.toggleElementDisplay(randomlyPlaceShipsButton);

      // Set gameContoroller.gameState to 'ready'.
      this.gameController.setGameState('ready');
    });
  }

  attachStartNewGameListeners(
    humanBoardDivId,
    computerBoardDivId,
    gameOverElement,
    startNewGameButton,
    randomlyPlaceShipsButton
  ) {
    const newGameButtons = document.querySelectorAll(startNewGameButton); // Button(s) to attach event listener to
    newGameButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Display the placeShipsRandomly button
        this.boardRenderer.toggleElementDisplay(randomlyPlaceShipsButton);

        // Set up game boards, render boards, etc
        this.startNewGame(
          humanBoardDivId,
          computerBoardDivId,
          gameOverElement,
          startNewGameButton,
          randomlyPlaceShipsButton
        );
      });
    });
  }

  startNewGame(
    humanBoardDivId,
    computerBoardDivId,
    gameOverElement,
    startNewGameButton,
    randomlyPlaceShipsButton
  ) {
    this.resetAndRerenderGame(
      humanBoardDivId,
      computerBoardDivId,
      gameOverElement,
      startNewGameButton,
      randomlyPlaceShipsButton
    );
    this.gameController.setGameState('placingShips');
  }

  // Used for setting up a new game, after a game over has occured
  resetAndRerenderGame(humanBoardDivId, computerBoardDivId, gameOverElement) {
    this.gameController.handleGameOver(); // Reset board state

    // Gameboards
    const humanPlayerGameBoard = this.gameController.humanPlayer.gameBoard; // Get game boards
    const computerPlayerGameBoard =
      this.gameController.computerPlayer.gameBoard;

    // Render player board
    this.boardRenderer.renderBoard(humanPlayerGameBoard.board, humanBoardDivId);

    // Render Computer board
    this.boardRenderer.renderBoard(
      computerPlayerGameBoard.board,
      computerBoardDivId
    );

    // Place computer ships
    this.gameController.placeShipsRandomly(this.gameController.computerPlayer);

    // Toggle game over screen
    this.boardRenderer.toggleElementDisplay(gameOverElement);
  }

  // This is the result of the attack and will change the gameBoard appearance accordingly
  handleCellClick(
    cell,
    row,
    col,
    gameOverElement,
    humanBoardDivId,
    gameOverMessageId
  ) {
    // Attack computer game board
    this.gameController.processHumanAttack(row, col); // Human attack computer game board

    // After human attack, update computer board visually
    const computerGameBoard = this.gameController.computerPlayer.gameBoard;

    this.boardRenderer.setCellColor(computerGameBoard.board, cell, row, col);

    // Game stops. Player wins game
    if (computerGameBoard.areAllShipsSunk()) {
      this.boardRenderer.renderWinMessage(gameOverMessageId); // Set game over message to win
      this.triggerGameOverScreen(gameOverElement); // triggers if all computer ships are sunk
      return;
    }

    const {
      // Computer attacks human game board
      row: computerRow,
      col: computerCol,
    } = this.gameController.processComputerAttack();

    // Locate the corresponding cell in the human board's DOM
    const humanBoardDiv = document.getElementById(humanBoardDivId);
    const humanBoardCell = humanBoardDiv.querySelector(
      `[data-row="${computerRow}"][data-col="${computerCol}"]`
    );

    // After computer attack, update human board visually
    const humanGameBoard = this.gameController.humanPlayer.gameBoard;

    this.boardRenderer.setCellColor(
      humanGameBoard.board,
      humanBoardCell,
      computerRow,
      computerCol
    );

    // Game stops. Computer wins game
    if (humanGameBoard.areAllShipsSunk()) {
      this.boardRenderer.renderLoseMessage(gameOverMessageId); // Set game over message to lose
      this.triggerGameOverScreen(gameOverElement); // triggers if all computer ships are sunk
      return;
    }
  }

  triggerGameOverScreen(gameOverElement) {
    const humanPlayerGameBoard = this.gameController.humanPlayer.gameBoard; // Get game boards
    const computerPlayerGameBoard =
      this.gameController.computerPlayer.gameBoard;

    if (
      humanPlayerGameBoard.areAllShipsSunk() || // Check if either players ships are all sunk
      computerPlayerGameBoard.areAllShipsSunk()
    ) {
      this.boardRenderer.toggleElementDisplay(gameOverElement); // Displays the game over screen
    }
  }
}

export default EventManager;
