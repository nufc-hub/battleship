class Ship {
  constructor(length) {
    this.length = length;
    this.numberOfHits = 0;
    this.sunk = false;
  }

  // hit() function that increases the number of ‘hits’ in your ship.
  hit() {
    this.numberOfHits += 1;
    return;
  }
}

export default Ship;
