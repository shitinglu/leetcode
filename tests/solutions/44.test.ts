/**
 * 44. singleNumber - 单元测试
 */
import { singleNumber } from '../../src/solutions/44';

describe('singleNumber', () => {
  it('示例1', () => {
    const nums = [1, 2, 1, 3, 2, 5];
    const result = singleNumber(nums);
    expect(result).toEqual(2);
  });

  it('示例2', () => {
    const nums = [-1, 0];
    const result = singleNumber(nums);
    expect(result).toEqual(2);
  });

  it('示例3', () => {
    const nums = [0, 1];
    const result = singleNumber(nums);
    expect(result).toEqual(2);
  });
});
