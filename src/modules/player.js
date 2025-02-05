class Player {
  constructor(isHuman, gameBoard) {
    this.isHuman = isHuman; // True if player is human, false if computer
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

    const attackResult = callback?.(row, col) ?? null; // If callback exists, call it; otherwise, return null

    return { row, col, result: attackResult }; // Return for debugging if needed
  }

  resetPreviousAttack() {
    this.previousAttack.clear();
  }
}

export default Player;
