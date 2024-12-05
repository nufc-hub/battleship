import GameController from '../modules/gameController';
import Gameboard from '../modules/gameboard';

// Test creation of gameboard instance
test('createGameboard creates a new gameboard instance', () => {
  const gameController = new GameController();
  const gameboard = gameController.createGameboard();

  expect(gameboard).toBeInstanceOf(Gameboard);
});
