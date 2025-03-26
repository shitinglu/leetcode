/**
 * 1. 两数之和
 *
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，
 * 并返回它们的数组下标。
 *
 * 示例：
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 * 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 在数组中寻找两个数，使其和等于目标值
 *    - 需要返回这两个数的下标
 *
 * 2. 哈希表解法
 *    - 使用Map存储遍历过的数字及其下标
 *    - 对于每个数字，寻找其补数（target - 当前数字）
 *
 * 3. 具体执行流程 (以 nums = [2,7,11,15], target = 9 为例)：
 *    a) 遍历2：
 *       - 计算补数：9-2=7
 *       - Map为空，将(2,0)加入Map
 *    b) 遍历7：
 *       - 计算补数：9-7=2
 *       - 在Map中找到2，返回[0,1]
 *
 * 4. 关键点：
 *    - 使用Map存储已遍历的数字，避免重复遍历
 *    - 一次遍历即可完成查找
 *    - 返回的下标顺序不重要
 *
 * 5. 复杂度：
 *    - 时间：O(n)，只需要遍历一次数组
 *    - 空间：O(n)，最坏情况下需要存储n-1个元素
 */

export function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i);
  }

  return [-1, -1]; // 未找到结果
}

export default {
  run: () => {
    const examples = [
      { nums: [2, 7, 11, 15], target: 9 },
      { nums: [3, 2, 4], target: 6 },
      { nums: [3, 3], target: 6 },
    ];

    examples.forEach((example, index) => {
      const result = twoSum(example.nums, example.target);
      console.log(`示例 ${index + 1}:`);
      console.log(`输入: nums = [${example.nums}], target = ${example.target}`);
      console.log(`输出: [${result}]`);
      console.log('---');
    });
  },
};
