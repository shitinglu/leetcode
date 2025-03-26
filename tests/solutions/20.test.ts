/**
 * 20. maxOperations - 单元测试
 */
import { maxOperations } from '../../src/solutions/20';

describe('maxOperations', () => {
  it('should return 2 for [1,2,3,4], 5', () => {
    const result = maxOperations([1, 2, 3, 4], 5);
    expect(result).toBe(2);
  });

  it('should return 1 for [3,1,3,4,3], 6', () => {
    const result = maxOperations([3, 1, 3, 4, 3], 6);
    expect(result).toBe(1);
  });
});
