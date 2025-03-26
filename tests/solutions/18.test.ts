/**
 * 18. increasingTriplet - 单元测试
 */
import { increasingTriplet } from '../../src/solutions/18';

describe('increasingTriplet', () => {
  it('should return true for [1,2,3,4,5]', () => {
    const result = increasingTriplet([1, 2, 3, 4, 5]);
    expect(result).toBe(true);
  });

  it('should return false for [5,4,3,2,1]', () => {
    const result = increasingTriplet([5, 4, 3, 2, 1]);
    expect(result).toBe(false);
  });

  it('should return true for [2,1,5,0,4,6]', () => {
    const result = increasingTriplet([2, 1, 5, 0, 4, 6]);
    expect(result).toBe(true);
  });
});
