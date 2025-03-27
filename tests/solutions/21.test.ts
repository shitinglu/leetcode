/**
 * 21. findDifference - 单元测试
 */
import { findDifference } from '../../src/solutions/21';

describe('findDifference', () => {
  it('示例1', () => {
    const result = findDifference([1, 2, 3], [2, 4, 6]);
    expect(result).toEqual([
      [1, 3],
      [4, 6],
    ]);
  });

  it('示例2', () => {
    const result = findDifference([1, 2, 3, 3], [1, 1, 2, 2]);
    expect(result).toEqual([[3], []]);
  });
});
