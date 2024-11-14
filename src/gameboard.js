class GameBoard {
  // Initialises a 10 x 10 game board with all values set to 0.
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
  }
}

export default GameBoard;
