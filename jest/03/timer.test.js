describe('timer: long', () => {
  function getData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ author: 'heora' })
      }, 10 * 1000)
    })
  }
  
  // mock 定时器
  jest.useFakeTimers();
  
  test('timer mock', () => {
    // 至少存在一次断言调用
    expect.assertions(1);
  
    getData().then(data => {
      expect(data).toEqual({ author: 'heora' })
    })
  
    // 快进所有定时器到结束
    jest.runAllTimers()
  })
});

describe('timer: loop', () => {
  function getData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ author: 'heora' })
        getData();
      }, 10 * 1000)
    })
  }
  
  // mock 定时器
  jest.useFakeTimers();
  
  test('timer mock', () => {
    // 至少存在一次断言调用
    expect.assertions(1);
  
    getData().then(data => {
      expect(data).toEqual({ author: 'heora' })
    })
  
    // 快进当前进行的定时器结束，不等待其它
    jest.runOnlyPendingTimers()
  })
});

describe('timer: set time', () => {
  function getData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ author: 'heora' })
      }, 10 * 1000)
    })
  }
  
  // mock 定时器
  jest.useFakeTimers();
  
  test('timer mock', () => {
    // 至少存在一次断言调用
    expect.assertions(1);
  
    getData().then(data => {
      expect(data).toEqual({ author: 'heora' })
    })
    
    jest.advanceTimersByTime(9 * 1000);
    jest.advanceTimersByTime(1 * 1000);
  })
});