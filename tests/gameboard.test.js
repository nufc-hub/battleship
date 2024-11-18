import GameBoard from '../src/gameboard';
import Ship from '../src/ship';

// Test the game board's length

test('initialises a 10 x 10 game board with all cells set to 0', () => {
  const gameBoard = new GameBoard();

  expect(gameBoard.board.length).toBe(10); // Exactly 10 rows in game board

  gameBoard.board.forEach((row) => {
    expect(row.length).toBe(10); // Each row contains exactly 10 items
    expect(row.every((cell) => cell === 0)).toBe(true); //  Value in each cell is 0
  });
});

// Verify horizontal ship placement
test('places a horizontal ship on a game board', () => {
  const horizontalShip = new Ship(3, true);
  const gameBoard = new GameBoard();
  gameBoard.placeShip(2, 3, horizontalShip);

  // Verify the correct cells have been changed to 1
  expect(gameBoard.board[1][2]).toBe(1); // If ship placed, value will be 1 not 0
  expect(gameBoard.board[1][3]).toBe(1);
  expect(gameBoard.board[1][4]).toBe(1);

  // Verify other cells are still 0
  expect(gameBoard.board[2][2]).toBe(0); // Checking cells close to ship for unintended consequences
  expect(gameBoard.board[2][6]).toBe(0);
  expect(gameBoard.board[1][5]).toBe(0);
  expect(gameBoard.board[1][1]).toBe(0);
});

// Verify vertical ship placement
test('places a vertical ship on a game board', () => {
  const verticalShip = new Ship(3, false);
  const gameBoard = new GameBoard();
  gameBoard.placeShip(2, 3, verticalShip);

  // Verify the correct cells have been changed to 1
  expect(gameBoard.board[1][2]).toBe(1); // If ship placed, value will be 1 not 0
  expect(gameBoard.board[2][2]).toBe(1);
  expect(gameBoard.board[3][2]).toBe(1);

  // Verify other cells are still 0
  expect(gameBoard.board[0][2]).toBe(0); // Checking cells close to ship for unintended consequences
  expect(gameBoard.board[4][2]).toBe(0);
  expect(gameBoard.board[1][3]).toBe(0);
  expect(gameBoard.board[3][3]).toBe(0);
});

// Verify ship is within board boundaries

test('checks if a ship is within game board boundaries', () => {
  const horizontalShip = new Ship(3, true);
  const gameBoard = new GameBoard();
  const result = gameBoard.placeShip(8, 8, horizontalShip);
  expect(result).toBe(false);
});
