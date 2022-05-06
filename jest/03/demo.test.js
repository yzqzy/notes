import { sum, subtract } from './demo';

test('sum(1, 2) result is 3', () => {
  expect(sum(1, 2)).toBe(3);
})
test('subtract(2, 1) result is 1', () => {
  expect(subtract(2, 1)).toBe(1);
})
