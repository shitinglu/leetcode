/**
 * 两数之和单元测试
 */
import { twoSum } from '../../src/solutions/1';

describe('两数之和', () => {
  test('示例1: nums = [2,7,11,15], target = 9', () => {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const result = twoSum(nums, target);
    expect(result).toEqual(expect.arrayContaining([0, 1]));
    expect(result.length).toBe(2);
  });

  test('示例2: nums = [3,2,4], target = 6', () => {
    const nums = [3, 2, 4];
    const target = 6;
    const result = twoSum(nums, target);
    expect(result).toEqual(expect.arrayContaining([1, 2]));
    expect(result.length).toBe(2);
  });

  test('示例3: nums = [3,3], target = 6', () => {
    const nums = [3, 3];
    const target = 6;
    const result = twoSum(nums, target);
    expect(result).toEqual(expect.arrayContaining([0, 1]));
    expect(result.length).toBe(2);
  });

  test('找不到结果: nums = [1,2,3], target = 7', () => {
    const nums = [1, 2, 3];
    const target = 7;
    const result = twoSum(nums, target);
    expect(result).toEqual([-1, -1]);
  });
});
