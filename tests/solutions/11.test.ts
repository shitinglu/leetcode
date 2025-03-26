/**
 * 11. longestSubarray - 单元测试
 */
import { longestSubarray } from '../../src/solutions/11';

describe('longestSubarray', () => {
  it('should return the correct result', () => {
    expect(longestSubarray([1, 1, 0, 1])).toBe(3);
    expect(longestSubarray([1, 1, 1, 0, 1, 1, 1, 0, 1])).toBe(6);
    expect(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])).toBe(5);
  });

  it('should return 0 if the array is empty', () => {
    expect(longestSubarray([])).toBe(-1);
  });

  it('should return 0 if the array contains only 0s', () => {
    expect(longestSubarray([0, 0, 0, 0, 0])).toBe(0);
  });

  it('should return the correct result for an array with multiple 0s', () => {
    expect(longestSubarray([1, 1, 0, 0, 1, 1, 1, 0, 1])).toBe(4);
  });
});
