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
}

export default GameController;
