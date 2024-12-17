class EventManager {
  constructor(gameController) {
    this.gameController = gameController;
  }

  // Attack clicks only added to computer-board
  addAttackListeners(boardDivId, callback) {
    const boardDiv = document.getElementById(boardDivId); // Get board html element
    const cells = boardDiv.childNodes; // Get cell html elements

    if (boardDivId) {
      // Add event listeners
      cells.forEach((cell) => {
        cell.addEventListener('click', () => {
          const row = parseInt(cell.dataset.row, 10); // Keep these in or not?
          const col = parseInt(cell.dataset.col, 10);
          console.log(`Clicked Row (0-based): ${row}, Col (0-based): ${col}`);
          this.handleCellClick(row, col);

          // Callback - change cell color depending on miss or hit
          if (typeof callback === 'function') {
            const computerGameBoard =
              this.gameController.computerPlayer.gameBoard.board;

            callback(computerGameBoard, cell, row, col);
          }
        });
      });
    } else {
      console.error(`Board container with ID "${boardDivId}" not found.`);
    }
  }

  // This is the result of the attack and will change the gameBoard appearance accordingly
  handleCellClick(row, col) {
    const attackResult = this.gameController.processHumanAttack(row, col);
    console.log('Row (0-based):', row, 'Col (0-based):', col, attackResult); // Debugging
  }
}

export default EventManager;

// Get clicks to change cell color and display appropriate message depending on board state
