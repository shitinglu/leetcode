/**
 * 6. moveZeroes - 单元测试
 */
import { moveZeroes } from '../../src/solutions/6';

describe('moveZeroes', () => {
  it('示例1', () => {
    const result = moveZeroes([0, 1, 0, 3, 12]);
    expect(result).toEqual([1, 3, 12, 0, 0]);
  });

  it('示例2', () => {
    const result = moveZeroes([0, 0, 1]);
    expect(result).toEqual([1, 0, 0]);
  });
});
