class EventManager {
  constructor(gameController, boardRenderer) {
    this.gameController = gameController;
    this.boardRenderer = boardRenderer;
  }

  // Attack clicks only added to computer-board
  addAttackListeners(boardDivId) {
    const boardDiv = document.getElementById(boardDivId); // Get board html element
    const cells = boardDiv.childNodes; // Get cell html elements

    if (boardDivId) {
      // Add event listeners
      cells.forEach((cell) => {
        cell.addEventListener('click', () => {
          const row = parseInt(cell.dataset.row, 10); // Keep these in or not?
          const col = parseInt(cell.dataset.col, 10);

          this.handleCellClick(cell, row, col);
        });
      });
    } else {
      console.error(`Board container with ID "${boardDivId}" not found.`);
    }
  }

  // This is the result of the attack and will change the gameBoard appearance accordingly
  handleCellClick(cell, row, col) {
    // Attack computer game board
    const humanAttackResult = this.gameController.processHumanAttack(row, col); // Human attack computer game board

    // After human attack, update computer board visually
    const computerGameBoard =
      this.gameController.computerPlayer.gameBoard.board;

    this.boardRenderer.setCellColor(computerGameBoard, cell, row, col);

    const {
      // Computer attacks human game board
      row: computerRow,
      col: computerCol,
      Result: computerAttackResult,
    } = this.gameController.processComputerAttack();

    // Locate the corresponding cell in the human board's DOM
    const humanBoardDiv = document.getElementById('human-board');
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

    // After computer attack, update human board visually

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
}

export default EventManager;

// Get clicks to change human board cell color
// Display appropriate message depending on board state
