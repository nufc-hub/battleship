import GameController from '../modules/gameController';
import Gameboard from '../modules/gameboard';

// Test creation of gameboard instance
test('createGameboard creates a new gameboard instance', () => {
  const gameController = new GameController();
  const gameboard = gameController.createGameboard();

  expect(gameboard).toBeInstanceOf(Gameboard);
});

// Test human player setup
test('createHumanPlayer initializes a human player with a gameboard', () => {
  const mockGameboard = { board: [], remainingShips: 0, ships: [] }; // Mocked version of gameboard
  const gameController = new GameController();
  gameController.createHumanPlayer(mockGameboard);

  expect(gameController.humanPlayer).toEqual({
    isHuman: true,
    gameBoard: mockGameboard,
  });
});

// Test computer player setup
test('createHumanPlayer initializes a human player with a gameboard', () => {
  const mockGameboard = { board: [], remainingShips: 0, ships: [] }; // Mocked version of gameboard
  const gameController = new GameController();
  gameController.createHumanPlayer(mockGameboard);

  expect(gameController.humanPlayer).toEqual({
    isHuman: true,
    gameBoard: mockGameboard,
  });
});
