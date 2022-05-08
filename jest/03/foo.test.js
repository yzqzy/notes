jest.mock('./foo');

import foo from "./foo";

foo
  .mockImplementation(() => 42)

test('mock implementations', () => {
  expect(foo()).toBe(42);
});
