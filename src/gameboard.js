class GameBoard {
  // Initialises a 10 x 10 game board with all values set to 0
  constructor() {
    // Cell with ship - not hit: Value = 1
    // Cell with ship - hit: Value = -1
    // Empty cell - not hit: Value = 0
    // Empty cell - hit: value = -2

    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
  }

  // row and col parameters are coordinates
  placeShip(row, col, ship) {
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
  }

  placeShipHorizontal(row, col, ship) {
    const { length, isHorizontal } = ship;
    // Horizontally
    if (isHorizontal) {
      for (let i = 0; i < length; i++) {
        // When the loop reaches the destination of the coord
        // change the board value from 0 to 1
        this.board[row - 1][col - 1] = 1;
        col++;
      }
    }
  }

  placeShipVertical(row, col, ship) {
    const { length, isHorizontal } = ship;
    // Vertically
    if (!isHorizontal) {
      for (let i = 0; i < length; i++) {
        // When the loop reaches the destination of the coord
        // change the board value from 0 to 1
        this.board[row - 1][col - 1] = 1;
        row++;
      }
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

  receiveAttack(row, col) {
    // Attack misses
    if (this.board[row - 1][col - 1] === 0) {
      this.receiveMiss(row, col);
    }
  }

  // Attack misses
  receiveMiss(row, col) {
    if (this.board[row - 1][col - 1] === 0) {
      this.board[row - 1][col - 1] = -2; // Mark missed shot on the board
    }
  }
}

export default GameBoard;
