import Player from '../modules/player.js';
import GameBoard from './gameboard.js';
import Ship from './ship.js';

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
    this.gameState = 'placingShips'; // Initial state // Other state include 'ready' will possibly refactor to add 'game over' state later
    this.stateChangeListeners = []; // Listeners for state changes
  }

  // Subscribe to game state changes
  onGameStateChange(callback) {
    this.stateChangeListeners.push(callback);
  }

  // Loops through all listeners and notifies them of state change
  notifyGameStateChange() {
    this.stateChangeListeners.forEach((callback) => callback(this.gameState));
  }

  // Used after ships have been placed. Possibly refactor to use for when game is over too. And for when a new game starts.
  setGameState(state) {
    this.gameState = state;
    this.notifyGameStateChange();
  }

  // Once game is ready, board clicks will be allowed.
  isGameReady() {
    return this.gameState === 'ready';
  }

  initGameController() {
    // Create players and player boards
    this.createHumanPlayer(this.createGameBoard());
    this.createComputerPlayer(this.createGameBoard());
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

  createGameBoard() {
    return new GameBoard();
  }

  // Places all five ships radomly on the game board
  // Use player parameter to set which players ships are placed randomly
  placeShipsRandomly(player) {
    this.ships.forEach((shipConfig) => {
      // Loop through each object in this.ships array
      let placed = false;

      while (!placed) {
        const isHorizontal = Math.random() < 0.5; // Used to randomly set ship orientation
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const ship = new Ship(shipConfig.length, isHorizontal);
        try {
          // Keep trying to place ship until successfully placed on board
          player.gameBoard.placeShip(row, col, ship);

          placed = true; // Ship successfully placed and loop stops
        } catch (error) {
          // Handle placement errors, e.g., overlap or out-of-bounds
          console.log(`Error placing ship: ${error.message}`);
        }

        console.log(this.humanPlayer);
        console.log(this.computerPlayer);
      }
    });
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

      this.gameState = 'gameOver';
    }
  }
}

// Create ships

// Add computer ships when creating the computer player and gameboard

// Add human ships after creating the human player and gameboard

// Add ships to the gamebaord

// Add ability to restart game at anypoint and when game is over
export default GameController;
