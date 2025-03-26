/**
 * 12. largestAltitude - 单元测试
 */
import { largestAltitude } from '../../src/solutions/12';

describe('largestAltitude', () => {
  it('示例1', () => {
    const result = largestAltitude([-5, 1, 5, 0, -7]);
    expect(result).toBe(1);
  });

  it('示例2', () => {
    const result = largestAltitude([-4, -3, -2, -1, 4, 3, 2]);
    expect(result).toBe(0);
  });
});
