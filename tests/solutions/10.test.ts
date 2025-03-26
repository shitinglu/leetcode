/**
 * 10. longestOnes - 单元测试
 */
import { longestOnes } from '../../src/solutions/10';

describe('longestOnes', () => {
  it('should return the correct result', () => {
    expect(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)).toBe(6);
    expect(longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3)).toBe(10);
  });
});
