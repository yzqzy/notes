// function getData (callback) {
//   setTimeout(() => {
//     callback({ author: 'heora' })
//   }, 1000)
// }
// // 错误示范：这种写法不会等待定时器结束
// test('async fail', () => {
//   getData(data => {
//     expect(data).toEqual({ author: 'heora' })
//   })
// })
// // 正确做法
// test('async success', (done) => {
//   getData(data => {
//     done();
//     expect(data).toEqual({ author: 'heora' })
//   })
// })

function getData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ author: 'heora' })
    }, 1000)
  })
}

test('async promise1', (done) => {
  getData().then(data => {
    done();
    expect(data).toEqual({ author: 'heora' })
  })
})

test('async promise2', () => {
  return getData().then(data => {
    expect(data).toEqual({ author: 'heora' })
  })
})

test('async promise3', () => {
  // return expect(getData()).rejects.toMatch('error');
  return expect(getData()).resolves.toEqual({ author: 'heora' });
})

test('async promise4', async () => {
  try {
    const data = await getData();

    expect(data).toEqual({ author: 'heora' })
  } catch (error) {
    expect(error).toMatch('error');
  }
})

test('async promise5', async () => {
  // await expect(getData()).rejects.toMatch('error');
  await expect(getData()).resolves.toEqual({ author: 'heora' });
})