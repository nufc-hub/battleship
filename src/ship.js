class Ship {
  constructor(length) {
    this.length = length;
    this.numberOfHits = 0;
  }

  // Throw error if a length of <= 0 or >= 4 is inputted.

  // Increases number of hits on ship.
  hit() {
    this.numberOfHits += 1;
  }

  // Returns true if the ship has been sunk.
  isSunk() {}
}

export default Ship;
