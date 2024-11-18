class GameBoard {
  // Initialises a 10 x 10 game board with all values set to 0
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
  }

  // row and col parameters are coordinates
  placeShip(row, col, ship) {
    // Throw error if ship is placed off the board
    if (!this.isValidPlacement(row, col, ship)) {
      throw new Error('Ship placement is out of bounds.');
    }

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
}

export default GameBoard;
