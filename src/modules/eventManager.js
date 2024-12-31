class EventManager {
  constructor(
    gameController,
    boardRenderer,
    humanBoardDivId,
    computerBoardDivId,
    gameOverElement,
    startNewGameButton
  ) {
    this.gameController = gameController;
    this.boardRenderer = boardRenderer;
    this.humanBoardDivId = humanBoardDivId;
    this.computerBoardDivId = computerBoardDivId;
    this.gameOverElement = gameOverElement;
    this.startNewGameButton = startNewGameButton;
  }

  attachEvents(computerBoardDivId, humanBoardDivId, gameOverElement) {
    this.addAttackListeners(
      // Add attack events
      computerBoardDivId,
      humanBoardDivId,
      gameOverElement,
      (gameBoard, cell, row, col) => {
        this.boardRenderer.setCellColor(gameBoard, cell, row, col);
      }
    );
  }

  // Remove event listeners from board cells
  clearEventListeners(humanBoardDivId, computerBoardDivId) {
    const humanBoardDiv = document.getElementById(humanBoardDivId); // Get board html element
    const humanboardCells = humanBoardDiv.childNodes; // Get cell html elements

    const computerBoardDiv = document.getElementById(computerBoardDivId); // Get board html element
    const computerboardCells = computerBoardDiv.childNodes; // Get cell html elements

    humanboardCells.forEach((cell) => {
      const newcell = cell.cloneNode(true); // Clone the element to remove listeners
      cell.parentNode.replaceChild(newcell, cell); // Replace old element with new
    });

    computerboardCells.forEach((cell) => {
      const newcell = cell.cloneNode(true); // Clone the element to remove listeners
      cell.parentNode.replaceChild(newcell, cell); // Replace old element with new
    });
  }

  // Attack clicks only added to computer-board
  addAttackListeners(computerBoardDivId, humanBoardDivId, gameOverElement) {
    const boardDiv = document.getElementById(computerBoardDivId); // Get board html element
    const cells = boardDiv.childNodes; // Get cell html elements

    if (computerBoardDivId) {
      // Add event listeners
      cells.forEach((cell) => {
        cell.addEventListener('click', () => {
          const row = parseInt(cell.dataset.row, 10); // Keep these in or not?
          const col = parseInt(cell.dataset.col, 10);

          this.handleCellClick(
            cell,
            row,
            col,
            gameOverElement,
            humanBoardDivId
          );
        });
      });
    } else {
      console.error(
        `Board container with ID "${computerBoardDivId}" not found.`
      );
    }
  }

  resetAndRerenderGame(
    humanBoardDivId,
    computerBoardDivId,
    gameOverElement
    // startNewGameButton
  ) {
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

    // Clear event listeners
    this.clearEventListeners(humanBoardDivId, computerBoardDivId);

    // Attach new event listeners

    // this.attachEvents(
    //   computerBoardDivId,
    //   humanBoardDivId,
    //   gameOverElement,
    //   startNewGameButton
    // );

    // Toggle game over screen
    this.boardRenderer.toggleElementDisplay(gameOverElement);
  }

  // This is the result of the attack and will change the gameBoard appearance accordingly
  handleCellClick(cell, row, col, gameOverElement, humanBoardDivId) {
    // Attack computer game board
    const humanAttackResult = this.gameController.processHumanAttack(row, col); // Human attack computer game board

    // After human attack, update computer board visually
    const computerGameBoard = this.gameController.computerPlayer.gameBoard;

    this.boardRenderer.setCellColor(computerGameBoard.board, cell, row, col);

    console.log(
      'Human Attack - Row (0-based):',
      row,
      'Col (0-based):',
      col,
      humanAttackResult,
      this.gameController.computerPlayer
    );

    // Game stops. Player wins game
    if (computerGameBoard.areAllShipsSunk()) {
      this.triggerGameOverScreen(gameOverElement); // triggers if all computer ships are sunk
      return;
    }

    const {
      // Computer attacks human game board
      row: computerRow,
      col: computerCol,
      Result: computerAttackResult,
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
      this.triggerGameOverScreen(gameOverElement); // triggers if all computer ships are sunk
      return;
    }

    this.triggerGameOverScreen(gameOverElement); // triggers if all computer ships are sunk

    console.log(
      'Computer Attack - Row (0-based):',
      computerRow,
      'Col (0-based):',
      computerCol,
      computerAttackResult,
      this.gameController.humanPlayer
    );
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

// Check game when remaining ship is not 0
