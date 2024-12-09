class DomManager {
  constructor(gameController) {
    this.gameController = gameController;
  }

  renderHumanGameboard() {
    this.renderGameboard(this.getHumanGameboard(), 'human-board');
  }

  renderComputerGameboard() {
    this.renderGameboard(this.getComputerGameboard(), 'computer-board');
  }

  renderGameboard(gameboard, boardDivId) {
    // Loop through gameboard rendering it to webpage
    gameboard.forEach((row) => {
      row.forEach((col) => {
        const humanBoardDiv = document.getElementById(boardDivId);
        const cell = document.createElement('div');
        cell.classList = 'board-cell';
        cell.dataset.value = col; // Placeholder.Change this later to represent the ship there.

        // Append each cell to the board
        humanBoardDiv.appendChild(cell);
      });
    });
  }

  // Get gameboards from players initialised in gameController

  getHumanGameboard() {
    const gameBoard = this.gameController.humanPlayer.gameBoard;
    return gameBoard.board;
  }

  getComputerGameboard() {
    const gameBoard = this.gameController.computerPlayer.gameBoard;
    return gameBoard.board;
  }
}

export default DomManager;
