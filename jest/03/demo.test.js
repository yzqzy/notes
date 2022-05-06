import { sum, subtract } from './demo';
import { describe, expect, test } from '@jest/globals';

// jest.autoMockOn
// jest.useFakeTimers

beforeAll(() => {
  console.log('before All');
});

beforeEach(() => {
  console.log('before each');
});

describe('demo', () => {
  test('sum(1, 2) result is 3', () => {
    expect(sum(1, 2)).toBe(3);
  })
  test('subtract(2, 1) result is 1', () => {
    expect(subtract(2, 1)).toBe(1);
  })
})

describe('global', () => {
  test('global expect', () => {
    expect(2 + 2).toBe(4); // 匹配数字
    expect({ name: 'jack' }).toEqual({ name: 'jack' }); // 匹配对象
    expect('yueluosensen').toMatch(/yueluo/); // 正则匹配
    expect(4).toBeGreaterThan(2); // 大于
    expect(4).toBeLessThan(5); // 小于
  })
})
