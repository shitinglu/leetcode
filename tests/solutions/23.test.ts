/**
 * 23. equalPairs - 单元测试
 */
import { equalPairs } from '../../src/solutions/23';

describe('equalPairs', () => {
  it('示例1', () => {
    const result = equalPairs([
      [3, 2, 1],
      [1, 7, 6],
      [2, 7, 7],
    ]);
    expect(result).toBe(1);
  });

  it('示例2', () => {
    const result = equalPairs([
      [3, 1, 2, 2],
      [1, 4, 4, 5],
      [2, 4, 2, 2],
      [2, 4, 2, 2],
    ]);
    expect(result).toBe(3);
  });
});
