class Player {
  constructor(isHuman, gameBoard) {
    this.isHuman = isHuman; // Set to true if player is human, false if player is computer
    this.gameBoard = gameBoard;
    this.previousAttack = new Set(); // Track already hit coordinates to avoid duplicate hits
  }
}

export default Player;
