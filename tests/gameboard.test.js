import GameBoard from '../src/gameboard';

// Test the game board's length

test('initialises a 10 x 10 game board with all cells set to 0', () => {
  const gameBoard = new GameBoard();

  expect(gameBoard.board.length).toBe(10); // Exactly 10 rows in game board

  gameBoard.board.forEach((row) => {
    expect(row.length).toBe(10); // Each row contains exactly 10 items
    expect(row.every((cell) => cell === 0)).toBe(true); //  Value in each cell is 0
  });
});
