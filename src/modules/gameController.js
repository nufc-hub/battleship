// import Ship from '../modules/ship';
import GameBoard from '../modules/gameboard.js';
import Player from '../modules/player.js';

// To place a ship:
// const humanPlayerGameBoard = this.humanplayer.gameBoard
// humanPlayerGameBoard.placeShip(.., ..)

// Same for computuer placing a ships

class GameController {
  constructor() {
    this.humanPlayer = null;
    this.computerPlayer = null;
  }

  initGameController() {
    const humanGameBoard = this.createGameBoard();
    const computerGameBoard = this.createGameBoard();
    this.createHumanPlayer(humanGameBoard);
    this.createComputerPlayer(computerGameBoard);
  }

  // Create gameBoard instance
  createGameBoard() {
    return new GameBoard();
  }

  //Create a human player with its own gameBoard
  createHumanPlayer(gameBoard) {
    this.humanPlayer = new Player(true, gameBoard);
  }

  //Create a computer player with its own gameBoard
  createComputerPlayer(gameBoard) {
    this.computerPlayer = new Player(false, gameBoard);
  }

  // Used by the DOM module when handling a cell click - changes boards' state depending on hit/ miss
  processHumanAttack(row, col) {
    return this.computerPlayer.gameBoard.receiveAttack(row, col); // Change the value in the players gameBoard (array)
  }

  processComputerAttack() {
    return this.computerPlayer.makeComputerAttack((row, col) => {
      return this.humanPlayer.gameBoard.receiveAttack(row, col);
    });
  }
}
// Create ships
// Add ships to the gamebaord
// Add ability for both players to attack
// Add ability to restart game at anypoint and when game is over
export default GameController;
