import GameBoard from './modules/gameboard.js';
import GameController from './modules/gameController.js';
import BoardRenderer from './modules/boardRenderer.js';
import EventManager from './modules/eventManager.js';
import DomManager from './modules/domManager.js';

const gameController = new GameController(new GameBoard());

const boardRenderer = new BoardRenderer(gameController);

const eventManager = new EventManager(
  gameController,
  boardRenderer,
  'humanBoard',
  'computerBoard',
  'gameOverDiv',
  '.new-game-button',
  'placeShipsRandomlyDiv',
  'gameOverText'
);

const domManager = new DomManager(gameController, boardRenderer, eventManager);

gameController.initGameController();
domManager.renderGame(
  'humanBoard',
  'computerBoard',
  'gameOverDiv',
  '.new-game-button',
  'placeShipsRandomlyDiv'
);
