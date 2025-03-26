/**
 * 4. kidsWithCandies - 单元测试
 */
import { solution } from '../../src/solutions/4';

describe('kidsWithCandies', () => {
  test('示例1', () => {
    const result = solution([2, 3, 5, 1, 3], 3);
    expect(result).toEqual([true, true, true, false, true]);
  });

  test('示例2', () => {
    const result = solution([4, 2, 1, 1, 2], 1);
    expect(result).toEqual([true, false, false, false, false]);
  });

  test('示例3', () => {
    const result = solution([12, 1, 12], 10);
    expect(result).toEqual([true, false, true]);
  });
});
