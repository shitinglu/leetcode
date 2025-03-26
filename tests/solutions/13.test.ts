/**
 * 13. pivotIndex - 单元测试
 */
import { pivotIndex } from '../../src/solutions/13';

describe('pivotIndex', () => {
  it('示例1', () => {
    const result = pivotIndex([1, 7, 3, 6, 5, 6]);
    expect(result).toBe(3);
  });

  it('示例2', () => {
    const result = pivotIndex([1, 2, 3]);
    expect(result).toBe(-1);
  });

  it('示例3', () => {
    const result = pivotIndex([2, 1, -1]);
    expect(result).toBe(0);
  });
});
