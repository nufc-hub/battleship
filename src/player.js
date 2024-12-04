// Init a player
// Each new player contains its own gameboard

class Player {
  constructor(isHuman, gameBoard) {
    this.isHuman = isHuman; // Set to true if player is human, false if computer
    this.gameBoard = gameBoard;
  }
}

export default Player;
