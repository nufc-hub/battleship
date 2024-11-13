class Ship {
  constructor(length) {
    this.length = length;
    this.numberOfHits = 0;
  }

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
