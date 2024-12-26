class DomManager {
  constructor(gameController, boardRenderer, eventManager) {
    this.gameController = gameController;
    this.boardRenderer = boardRenderer;
    this.eventManager = eventManager;
  }

  renderGame(humanBoardDivId, computerBoardDivId) {
    this.renderHumanGameBoard(humanBoardDivId);
    this.renderComputerGameBoard(computerBoardDivId);
  }

  renderHumanGameBoard(humanBoardDivId) {
    this.boardRenderer.renderBoard(this.getHumanGameBoard(), humanBoardDivId);
  }

  renderComputerGameBoard(computerBoardDivId) {
    this.boardRenderer.renderBoard(
      this.getComputerGameBoard(),
      computerBoardDivId
    );
  }

  // Get game boards from players initialised in gameController
  getHumanGameBoard() {
    const gameBoard = this.gameController.humanPlayer.gameBoard;
    return gameBoard.board; // Return the board array
  }

  getComputerGameBoard() {
    const gameBoard = this.gameController.computerPlayer.gameBoard;
    return gameBoard.board; // Return the board array
  }

  // Not used currently - clears cell in dom but not in player game board array
  clearBoard(boardDivId) {
    const boardDiv = document.getElementById(boardDivId);
    boardDiv.replaceChildren(); // Delete cells in game board
  }
}

export default DomManager;
