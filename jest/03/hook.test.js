const data = {
  author: 'yueluo'
}

let user = null;

beforeAll(() => {
  console.log('before all')
})

afterAll(() => {
  console.log('after all')
})

// 每个实例运行之前
beforeEach(() => {
  user = Object.assign({}, data)
})

// 每个实例运行之后
afterEach(() => {
  user = null
})

test('test 1', () => {
  user.author = 'heora';
  expect(user.author).toBe('heora')
})

test('test 2', () => {
  expect(user.author).toBe('yueluo')
})


describe('group', () => {
  beforeEach(() => {
    console.log('group before each')
  })

  afterEach(() => {
    console.log('group after each')
  })

  test('test1', () => {
    console.log('group test1')
  })

  test('test2', () => {
    console.log('group test2')
  })
})
