describe('common matchers', () => {
  test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
    expect('hello').toBe('hello');
    expect(true).toBe(true);
  
    const author = { name: 'yueluo' };
    expect(author).toBe(author); // toBe 只可以判断对象引用
    expect({ name: 'yueluo' }).toEqual({ name: 'yueluo' }); // toEqual 可以判断对象属性是否相同
  });
});

describe('truthiness', () => {
  test('null', () => {
    const n = null;
    expect(n).toBeNull(); // 判断为 null
    expect(n).toBeDefined(); // 判断是否已定义
    expect(n).not.toBeUndefined(); // 判断不是未定义
    expect(n).not.toBeTruthy(); // 判断不是 true
    expect(n).toBeFalsy(); // 判断是 false
  });
  
  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull(); // 判断不是 null
    expect(z).toBeDefined(); // 判断是否已定义
    expect(z).not.toBeUndefined(); // 判断不是未定义
    expect(z).not.toBeTruthy();// 判断不是 true
    expect(z).toBeFalsy(); // 判断是 false
  });
});

describe('numbers', () => {
  test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  })

  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3); This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });
})

describe('strings', () => {
  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });
  
  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });
})

describe('arrays', () => {
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];
  
  test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
  });
})

describe('exceptions', () => {
  function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
  }
  
  test('compiling android goes as expected', () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);
  
    // You can also use the exact error message or a regexp
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);
  });
})