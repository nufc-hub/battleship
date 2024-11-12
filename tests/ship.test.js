import Ship from '../src/ship';

test('return ship length with a value of 3', () => {
  const ship = new Ship(3);

  expect(ship.length).toBe(3);
});

test('return ship length with a value of 3', () => {
  const ship = new Ship(0);

  expect(ship.length).toBe(0);
});
