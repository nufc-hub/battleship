import Ship from '../src/ship';

// Test ship length.

test('return ship length with a value of 3', () => {
  const ship = new Ship(3);

  expect(ship.length).toBe(3);
});

test('return ship length with a value of 0', () => {
  const ship = new Ship(0);

  expect(ship.length).toBe(0);
});

// Test times ship has been hit.

test('number of hits will be 0', () => {
  const ship = new Ship(3);

  expect(ship.numberOfHits).toBe(0);
});

// Tests if the ship has been sunk.

test('ship is not sunk initially', () => {
  const ship = new Ship(3);

  expect(ship.sunk).toBe(false);
});
