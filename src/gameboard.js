class GameBoard {
  // Cell with ship - not hit: Value = 1
  // Cell with ship - hit: Value = -1
  // Empty cell - not hit: Value = 0
  // Empty cell - hit: value = -2

  constructor() {
    // Initialises a 10 x 10 game board with all values set to 0
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.ships = []; //Array to store placed ship and their position
    this.remainingShips = 0; // Used to track game over
  }

  // Get ship at specified coords from this.ships

  getShip(row, col) {
    // loop through this.ships
    for (const { ship, positions } of this.ships) {
      if (positions.some(([r, c]) => r === row - 1 && c === col - 1)) {
        // Check each position in ships.positions to see if it matches the entered coords
        return ship; // If ship is found return it
      }
    }
    return null; // No ship found at this position.
  }

  // Ship placement

  // row and col parameters are coordinates
  placeShip(row, col, ship) {
    // Validate the starting coords
    this.validateCoordinates(row, col);

    // Throw error if ship is placed off the board
    if (!this.isValidPlacement(row, col, ship)) {
      throw new Error('Ship placement is out of bounds.');
    }

    // Throw error if ship is overlapping with another ship
    if (this.isOverlapping(row, col, ship)) {
      throw new Error('Ship placement overlaps with another ship.');
    }

    // Logic for placing ships
    if (ship.isHorizontal) {
      this.placeShipHorizontal(row, col, ship); // Places ship horizontally
    } else {
      this.placeShipVertical(row, col, ship); // Places ship vertically
    }

    this.remainingShips += 1; // Incremement remaining ships when a new ship is placed
  }

  placeShipHorizontal(row, col, ship) {
    const { length, isHorizontal } = ship;

    const shipPositions = [];

    // Horizontally
    if (isHorizontal) {
      for (let i = 0; i < length; i++) {
        // When the loop reaches the destination of the coord
        // change the board value from 0 to 1
        this.board[row - 1][col - 1 + i] = 1;
        shipPositions.push([row - 1, col - 1 + i]); // Send coords to shipPositions array
      }

      this.ships.push({ ship, positions: shipPositions }); // This is so the board can use the getShips function
    }
  }

  placeShipVertical(row, col, ship) {
    const { length, isHorizontal } = ship;

    const shipPositions = [];

    // Vertically
    if (!isHorizontal) {
      for (let i = 0; i < length; i++) {
        // When the loop reaches the destination of the coord
        // change the board value from 0 to 1
        this.board[row - 1 + i][col - 1] = 1;
        shipPositions.push([row - 1 + i, col - 1]); // Send coords to shipPositions array
      }

      this.ships.push({ ship, positions: shipPositions }); // This is so the board can use the getShips function
    }
  }

  // Checks ship is being placed within boundaries of board
  isValidPlacement(row, col, ship) {
    const { length, isHorizontal } = ship;

    // Check horizontal placement
    if (isHorizontal && col - 1 + length > this.board.length) {
      return false;
    }

    // Check vertical placement
    if (!isHorizontal && row - 1 + length > this.board.length) {
      return false;
    }
    return true;
  }

  // Checks if ship is overlapping with another ship
  isOverlapping(row, col, ship) {
    const { length, isHorizontal } = ship;
    for (let i = 0; i < length; i++) {
      if (isHorizontal) {
        // Horizontal placement
        // Loops through column checking if checking if a ship is already present
        if (this.board[row - 1][col - 1 + i] === 1) return true;
      } else {
        //Vertical placement
        // Loops through row checking if checking if a ship is already present
        if (this.board[row - 1 + i][col - 1] === 1) return true;
      }
    }
    return false;
  }

  // Attacks

  receiveAttack(row, col) {
    // Make sure attack coords are within game board bounds
    this.validateCoordinates(row, col);

    const cell = this.board[row - 1][col - 1];

    switch (cell) {
      // Check for double hits
      case -2:
      case -1:
        this.preventDoubleHit(row, col);
        break;

      // Attack misses
      case 0:
        this.receiveMiss(row, col);
        break;

      // Attack hits
      case 1:
        this.receiveHit(row, col);
        break;

      default:
        throw new Error('Invalid cell state.');
    }
  }

  // Attack misses
  receiveMiss(row, col) {
    this.board[row - 1][col - 1] = -2; // Mark missed shot on the board
  }

  // Attack hits
  receiveHit(row, col) {
    const ship = this.getShip(row, col); // Get the ship at these coordinates
    if (ship) {
      ship.hit(); // Delegate the hit to the ship - will increment ship.numberOfHits
      this.handleSunkShip(ship); // Check if ship has been sunk
    }

    this.board[row - 1][col - 1] = -1; // Mark the hit on the board
  }

  preventDoubleHit() {
    throw new Error("'This position has already been attacked!'");
  }

  // Check if coords exist on the board - used for things such as when player puts coords in for an attack
  validateCoordinates(row, col) {
    if (row < 1 || row > 10 || col < 1 || col > 10) {
      throw new Error('Row and column must be between 1 and 10.');
    }
  }

  // Check if ship has been sunk

  handleSunkShip(ship) {
    if (ship.isSunk()) {
      this.remainingShips -= 1; // Number of ships on board decrements

      // Check if all ships have been sunk

      if (this.areAllShipsSunk()) {
        return {
          message: 'Game over! All ships have been sunk!',
          remainingShips: 0,
        };
      }

      return {
        message: 'A ship has been sunk',
        remainingShips: this.remainingShips,
      };
    }
  }

  // Check if all ships have been sunk

  areAllShipsSunk() {
    return this.remainingShips === 0;
  }
}

export default GameBoard;
