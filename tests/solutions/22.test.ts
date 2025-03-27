/**
 * 22. uniqueOccurrences - 单元测试
 */
import { uniqueOccurrences } from '../../src/solutions/22';

describe('uniqueOccurrences', () => {
  it('示例1', () => {
    const result = uniqueOccurrences([1, 2, 2, 1, 1, 3]);
    expect(result).toBe(true);
  });

  it('示例2', () => {
    const result = uniqueOccurrences([1, 2]);
    expect(result).toBe(false);
  });

  it('示例3', () => {
    const result = uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0]);
    expect(result).toBe(true);
  });
});
