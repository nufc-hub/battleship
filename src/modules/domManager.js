class DomManager {
  constructor(gameController) {
    this.gameController = gameController;
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
