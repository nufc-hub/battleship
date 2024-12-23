class EventManager {
  constructor(gameController, boardRenderer) {
    this.gameController = gameController;
    this.boardRenderer = boardRenderer;
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

  // This is the result of the attack and will change the gameBoard appearance accordingly
  handleCellClick(cell, row, col, gameOverElement, humanBoardDivId) {
    // Attack computer game board
    const humanAttackResult = this.gameController.processHumanAttack(row, col); // Human attack computer game board

    // After human attack, update computer board visually
    const computerGameBoard =
      this.gameController.computerPlayer.gameBoard.board;

    this.boardRenderer.setCellColor(computerGameBoard, cell, row, col);

    this.triggerGameOverScreen(gameOverElement); // triggers if all computer ships are sunk

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
    const humanGameBoard = this.gameController.humanPlayer.gameBoard.board;

    this.boardRenderer.setCellColor(
      humanGameBoard,
      humanBoardCell,
      computerRow,
      computerCol
    );

    this.triggerGameOverScreen(gameOverElement); // triggers if all computer ships are sunk

    console.log(
      'Human Attack - Row (0-based):',
      row,
      'Col (0-based):',
      col,
      humanAttackResult,
      this.gameController.humanPlayer
    );

    console.log(
      'Computer Attack - Row (0-based):',
      computerRow,
      'Col (0-based):',
      computerCol,
      computerAttackResult,
      this.gameController.computerPlayer
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
      this.boardRenderer.toggleGameOverScreen(gameOverElement);
    }
  }

  // startNewGame() {
  //   // THis is for when the new game
  //   // button is clicked in the game over screen
  // this.gameController.handleGameOver(); //Add this to start new game function

  //   //
  // }
}

export default EventManager;

// Display appropriate message depending on board state
