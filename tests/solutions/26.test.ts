/**
 * 26. asteroidCollision - 单元测试
 */
import { asteroidCollision } from '../../src/solutions/26';

describe('asteroidCollision', () => {
  test('示例1', () => {
    const result = asteroidCollision([5, 10, -5]);
    expect(result).toEqual([5, 10]);
  });
  test('示例2', () => {
    const result = asteroidCollision([8, -8]);
    expect(result).toEqual([]);
  });
  test('示例3', () => {
    const result = asteroidCollision([10, 2, -5]);
    expect(result).toEqual([10]);
  });
  test('示例4', () => {
    const result = asteroidCollision([-2, -1, 1, 2]);
    expect(result).toEqual([-2, -1, 1, 2]);
  });
});
