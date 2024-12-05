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

  createGameboard() {
    return new Gameboard();
  }
}

export default GameController;
