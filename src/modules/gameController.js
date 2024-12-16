// import Ship from '../modules/ship';
import Gameboard from '../modules/gameboard.js';
import Player from '../modules/player.js';

// To place a ship:
// const humanPlayerGameboard = this.humanplayer.gameboard
// humanPlayerGameboard.placeShip(.., ..)

// Same for computuer placing a ships

class GameController {
  constructor() {
    this.humanPlayer = null;
    this.computerPlayer = null;
  }

  initGameController() {
    const gameboard = this.createGameboard();
    this.createHumanPlayer(gameboard);
    this.createComputerPlayer(gameboard);
  }

  // Create gameboard instance
  createGameboard() {
    return new Gameboard();
  }

  //Create a human player with its own gameboard
  createHumanPlayer(gameboard) {
    this.humanPlayer = new Player(true, gameboard);
  }

  //Create a computer player with its own gameboard
  createComputerPlayer(gameboard) {
    this.computerPlayer = new Player(false, gameboard);
  }

  // Used by the DOM module when handling a cell click - changes boards' state depending on hit/ miss
  processHumanAttack(row, col) {
    return this.computerPlayer.gameBoard.receiveAttack(row, col); // Change the value in the players gameboard (array)
  }
}
// Create ships
// Add ships to the gamebaord
// Add ability for both players to attack
// Add ability to restart game at anypoint and when game is over
export default GameController;
