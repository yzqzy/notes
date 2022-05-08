function forEach (items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index], index);
  }
}

test('mock functions', () => {
  const items = ['js', 'ts', 'nodejs'];

  const mockFn  = jest.fn((value, index) => {
    return value + 1;
  });

  // 调用函数设置返回值会覆盖上面的实现 
  // mockFn.mockReturnValue(123);
  // 调用函数设置第一个返回值
  mockFn.mockReturnValueOnce(123);


  forEach(items, mockFn);

  console.log(mockFn.mock);

  expect(mockFn.mock.calls.length).toBe(items.length);
  expect(mockFn.mock.calls[0][0]).toBe('js');
  expect(mockFn.mock.calls[0][1]).toBe(0);
}) 