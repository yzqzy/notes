const { sum, subtract } = require('./demo');

// expect(sum(1, 2)).toBe(3);
// expect(subtract(2, 1)).toBe(1);

test('sum(1, 2) result is 3', () => {
  expect(sum(1, 2)).toBe(3);
})
test('subtract(2, 1) result is 1', () => {
  expect(subtract(2, 1)).toBe(1);
})

function test (message, callback) {
  try {
    callback();
  } catch (error) {
    console.error(`${ message }: ${ error }`);
  }
}

function expect (result) {
  return {
    toBe (expected) {
      if (result !== expected) {
        throw new Error(`expect result ${ expected }, but get ${ result }`);
      }
    }
  }
}