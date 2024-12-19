class Player {
  constructor(isHuman, gameBoard) {
    this.isHuman = isHuman; // Set to true if player is human, false if player is computer
    this.gameBoard = gameBoard;
    this.previousAttack = new Set(); // Track already hit coordinates to avoid duplicate hits
  }

  makeComputerAttack(callback) {
    // Validations
    if (this.isHuman) {
      throw new Error(
        'makeComputerAttack can only be used by computer players.'
      );
    }

    let row, col;

    // Generate a random number between 0 and 9
    do {
      row = Math.floor(Math.random() * 10);

      col = Math.floor(Math.random() * 10);
    } while (this.previousAttack.has(`${row},${col}`)); // Check if the cell has been hit already

    // Prevents attack using the same coords again
    this.previousAttack.add(`${row},${col}`);

    // Then carry out the attack

    let attackResult = null;

    if (callback && typeof callback === 'function') {
      attackResult = callback(row, col);
    }
    return { row, col, Result: attackResult }; // Return for debugging if needed
  }
}

export default Player;
