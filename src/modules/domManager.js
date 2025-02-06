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

    this.renderGameBoard(
      this.gameController.humanPlayer.gameBoard.board,
      humanBoardDivId
    );
    this.renderGameBoard(
      this.gameController.computerPlayer.gameBoard.board,
      computerBoardDivId
    );

    this.eventManager.addButtonEvents(
      humanBoardDivId,
      computerBoardDivId,
      gameOverElement,
      startNewGameButton,
      randomlyPlaceShipsButton
    );
  }

  renderGameBoard(gameBoard, boardDivId) {
    this.boardRenderer.renderBoard(gameBoard, boardDivId);
  }
}

export default DomManager;
