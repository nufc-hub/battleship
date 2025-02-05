class Ship {
  constructor(length, isHorizontal) {
    if (length <= 1 || length > 5) {
      // Validate ship length
      throw new Error('Invalid ship length. Must be between 1 and 5.');
    }

    // Is horizontal should be boolean
    if (typeof isHorizontal !== 'boolean') {
      throw new Error(
        'Invalid ship orientation. Must be true (horizontal) or false (vertical).'
      );
    }

    this.length = length;
    this.isHorizontal = isHorizontal; // Game board will check ship orientation during placement
    this.numberOfHits = 0;
  }

  // Throw error if a length of <= 0 or >= 4 is inputted?

  // Increases number of hits on ship.
  hit() {
    if (this.isSunk()) return; // Prevent further hits if ship already sunk
    this.numberOfHits += 1;
  }

  // Returns true if the ship has been sunk, otherwise false.
  isSunk() {
    return this.numberOfHits >= this.length;
  }
}

export default Ship;
