/**
 * 16. productExceptSelf - 单元测试
 */
import { productExceptSelf } from '../../src/solutions/16';

describe('productExceptSelf', () => {
  it('示例1', () => {
    const result = productExceptSelf([1, 2, 3, 4]);
    expect(result).toEqual([24, 12, 8, 6]);
  });

  it('示例2', () => {
    const result = productExceptSelf([-1, 1, 0, -3, 3]);
    expect(result).toEqual([0, 0, 9, 0, 0]);
  });
});
