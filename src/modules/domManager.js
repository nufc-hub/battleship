class DomManager {
  constructor(gameController, boardRenderer, eventManager) {
    this.gameController = gameController;
    this.boardRenderer = boardRenderer;
    this.eventManager = eventManager;
  }

  renderGame(
    humanBoardDivId,
    computerBoardDivId,
    gameOverElement,
    startNewGameButton,
    randomlyPlaceShipsButton
  ) {
    this.eventManager.clearEventListeners(humanBoardDivId, computerBoardDivId);
    this.renderHumanGameBoard(humanBoardDivId);
    this.renderComputerGameBoard(computerBoardDivId);
    this.eventManager.addButtonEvents(
      humanBoardDivId,
      computerBoardDivId,
      gameOverElement,
      startNewGameButton,
      randomlyPlaceShipsButton
    );
  }

  renderHumanGameBoard(humanBoardDivId) {
    this.boardRenderer.renderBoard(
      this.gameController.humanPlayer.gameBoard.board,
      humanBoardDivId
    );
  }

  renderComputerGameBoard(computerBoardDivId) {
    this.boardRenderer.renderBoard(
      this.gameController.computerPlayer.gameBoard.board,
      computerBoardDivId
    );
  }
}

export default DomManager;
