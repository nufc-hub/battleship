class Ship {
  constructor(length, isHorizontal) {
    this.length = length;
    this.isHorizontal = isHorizontal; // Game board will check ship orientation during placement
    this.numberOfHits = 0;
  }

  // Throw error if a length of <= 0 or >= 4 is inputted?

  // Increases number of hits on ship.
  hit() {
    this.numberOfHits += 1;
  }

  // Returns true if the ship has been sunk, otherwise false.
  isSunk() {
    return this.numberOfHits >= this.length;
  }
}

export default Ship;
