import Player from '../modules/player';
import GameBoard from '../modules/gameboard';

// Real player initialisation

test('initialises a real game player containing a gameBoard', () => {
  const gameboard = new GameBoard();
  const humanPlayer = new Player(true, gameboard);
  expect(humanPlayer.isHuman).toBe(true);
});

// Computer player initialisation

test('initialises a computer player containing a gameBoard', () => {
  const gameboard = new GameBoard();
  const computerPayer = new Player(false, gameboard);
  expect(computerPayer.isHuman).toBe(false);
});
