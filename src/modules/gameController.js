import Player from '../modules/player.js';
import GameBoard from './gameboard.js';
import Ship from './ship.js';

// To place a ship:
// const humanPlayerGameBoard = this.humanplayer.gameBoard
// humanPlayerGameBoard.placeShip(.., ..)

// Same for computuer placing a ships

class GameController {
  constructor() {
    this.humanPlayer = null;
    this.computerPlayer = null;
    this.ships = [
      { name: 'carrier', length: 5 },
      { name: 'battleship', length: 4 },
      { name: 'cruiser', length: 3 },
      { name: 'submarine', length: 3 },
      { name: 'destroyer', length: 2 },
    ];
  }

  initGameController() {
    // Create players and player boards
    this.createHumanPlayer(this.createGameBoard());
    this.createComputerPlayer(this.createGameBoard());
    this.placeShipsRandomly(this.humanPlayer);
    this.placeShipsRandomly(this.computerPlayer);
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

  handleGameOver() {
    const humanGameBoardObj = this.humanPlayer.gameBoard;
    const computerGameBoardObj = this.computerPlayer.gameBoard;

    if (
      humanGameBoardObj.areAllShipsSunk() || // Check if all ships are sunk
      computerGameBoardObj.areAllShipsSunk()
    ) {
      humanGameBoardObj.resetGameBoard(); // Reset game board state for both players
      computerGameBoardObj.resetGameBoard();

      this.humanPlayer.resetPreviousAttack(); // Reset previousAttack set for both players
      this.computerPlayer.resetPreviousAttack();
    }
  }
}

// Create ships

// Add computer ships when creating the computer player and gameboard

// Add human ships after creating the human player and gameboard

// Add ships to the gamebaord

// Add ability to restart game at anypoint and when game is over
export default GameController;
