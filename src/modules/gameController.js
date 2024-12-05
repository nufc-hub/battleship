// import Ship from '../modules/ship';
import Gameboard from '../modules/gameboard';
import Player from '../modules/player';

// To place a ship:
// const humanPlayerGameboard = this.humanplayer.gameboard
// humanPlayerGameboard.placeShip(.., ..)

// Same for computuer placing a ships

class GameController {
  constructor() {
    this.humanPlayer = null;
    this.computerPlayer = null;
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
}
// Create ships
// Create board
// Create human and computer players
// Add ships to the gamebaord
// Add ability for both players to attack
// Add ability to restart game at anypoint and when game is over
export default GameController;
