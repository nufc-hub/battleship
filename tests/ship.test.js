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

// Tests if the ship has been hit

test('hit increases the number of hits to 1', () => {
  const ship = new Ship(3);
  //One hit.
  ship.hit();
  expect(ship.numberOfHits).toBe(1);
});

test('hit increases the number of hits to 2', () => {
  const ship = new Ship(3);
  // Two hits.
  ship.hit();
  ship.hit();
  expect(ship.numberOfHits).toBe(2);
});

// Tests if the ship has been sunk.

test('calculates if a ship of length 3 has been sunk after 0 hits', () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).toBe(false); // After 0 hits
});

test('calculates if a ship of length 3 has been sunk after 3 hits', () => {
  const ship = new Ship(3);
  ship.hit(); //
  expect(ship.isSunk()).toBe(false); // After 1 hit
  ship.hit();
  expect(ship.isSunk()).toBe(false); // After 2 hits
  ship.hit();
  expect(ship.isSunk()).toBe(true); // After 3 hits
});

test('calculates if a ship of length 2 has been sunk after 2 hits', () => {
  const ship = new Ship(2);
  ship.hit();
  expect(ship.isSunk()).toBe(false); // After 1 hit
  ship.hit();
  expect(ship.isSunk()).toBe(true); // After 2 hits
});
