/**
 * https://leetcode.cn/problems/maximum-average-subarray-i/?envType=study-plan-v2&envId=leetcode-75
 * 8. findMaxAverage
 *
 * 给你一个由 n 个元素组成的整数数组 nums 和一个整数 k 。
 * 请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数。
 *
 * 任何误差小于 10-5 的答案都将被视为正确答案。
 *
 * 示例 1：
 * 输入：nums = [1,12,-5,-6,50,3], k = 4
 * 输出：12.75
 * 解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
 *
 * 示例 2：
 * 输入：nums = [5], k = 1
 * 输出：5.00000
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 寻找长度为k的连续子数组的最大平均值
 *    - 等价于寻找长度为k的连续子数组的最大和
 *
 * 2. 滑动窗口解法
 *    - 维护一个固定大小为k的窗口
 *    - 计算窗口内元素的和
 *    - 滑动窗口时更新和
 *
 * 3. 具体执行流程 (以 nums=[1,12,-5,-6,50,3], k=4 为例)：
 *    a) 初始窗口：
 *       - 计算[1,12,-5,-6]的和：2
 *       - maxSum = 2
 *    b) 滑动窗口：
 *       - 移除1，添加50：2-1+50=51
 *       - maxSum = 51
 *    c) 继续滑动：
 *       - 移除12，添加3：51-12+3=42
 *       - maxSum保持不变
 *    d) 计算最终结果：
 *       - 最大平均值 = 51/4 = 12.75
 *
 * 4. 关键点：
 *    - 使用滑动窗口避免重复计算
 *    - 维护窗口和时只需减去窗口首元素，加上新元素
 *    - 最后除以k得到平均值
 *
 * 5. 复杂度：
 *    - 时间：O(n)，只需要遍历一次数组
 *    - 空间：O(1)，只使用常数额外空间
 */

export function findMaxAverage(nums: number[], k: number) {
  // 计算第一个窗口的总和
  let sum = 0;

  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  // 初始化最大和为一个窗口的和
  let maxSum = sum;
  3;
  for (let j = k; j < nums.length; j++) {
    sum = sum + nums[j] - nums[j - k];

    maxSum = Math.max(maxSum, sum);
  }

  return maxSum / k;
}

export default {
  run: () => {
    // 示例运行代码
    console.log('findMaxAverage');
    const examples = [
      { nums: [1, 12, -5, -6, 50, 3], k: 4 },
      { nums: [5], k: 1 },
    ];
    examples.forEach(example => {
      console.log(findMaxAverage(example.nums, example.k));
    });
  },
};
