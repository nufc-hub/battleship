import GameBoard from './modules/gameboard.js';
import GameController from './modules/gameController.js';
import BoardRenderer from './modules/boardRenderer.js';
import EventManager from './modules/eventManager.js';

// DOM element IDs
const HUMAN_BOARD_ID = 'humanBoard';
const COMPUTER_BOARD_ID = 'computerBoard';
const GAME_OVER_DIV_ID = 'gameOverDiv';
const NEW_GAME_BUTTON_CLASS = '.new-game-button';
const PLACE_SHIPS_RANDOMLY_DIV_ID = 'placeShipsRandomlyDiv';
const GAME_OVER_TEXT_ID = 'gameOverText';

// Initialise game controller
const gameController = new GameController(new GameBoard());

// Initialise board renderer
const boardRenderer = new BoardRenderer(gameController);

// Initialise eventManager
const eventManager = new EventManager(
  gameController,
  boardRenderer,
  HUMAN_BOARD_ID,
  COMPUTER_BOARD_ID,
  GAME_OVER_DIV_ID,
  NEW_GAME_BUTTON_CLASS,
  PLACE_SHIPS_RANDOMLY_DIV_ID,
  GAME_OVER_TEXT_ID
);

// Create human and computer player. Create human and computer game board and randomly place ships on computer board.
gameController.initGameController();

// Render game boards
boardRenderer.renderBoard(
  gameController.humanPlayer.gameBoard.board,
  HUMAN_BOARD_ID
);

boardRenderer.renderBoard(
  gameController.computerPlayer.gameBoard.board,
  COMPUTER_BOARD_ID
);

// Add button events
eventManager.addButtonEvents(
  HUMAN_BOARD_ID,
  COMPUTER_BOARD_ID,
  GAME_OVER_DIV_ID,
  NEW_GAME_BUTTON_CLASS,
  PLACE_SHIPS_RANDOMLY_DIV_ID
);
