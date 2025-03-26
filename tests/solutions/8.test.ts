/**
 * 8. findMaxAverage - 单元测试
 */
import { findMaxAverage } from '../../src/solutions/8';

describe('findMaxAverage', () => {
  it('示例1', () => {
    const result = findMaxAverage([1, 12, -5, -6, 50, 3], 4);
    expect(result).toEqual(12.75);
  });
  it('示例2', () => {
    const result = findMaxAverage([5], 1);
    expect(result).toEqual(5.0);
  });
});
