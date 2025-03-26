/**
 * https://leetcode.cn/problems/max-number-of-k-sum-pairs/?envType=study-plan-v2&envId=leetcode-75
 * 20. maxOperations
 *
 * 给你一个整数数组 nums 和一个整数 k 。
 *
 * 每一步操作中，你需要从数组中选出和为 k 的两个整数，并将它们从数组中删除。
 *
 * 返回你可以对数组执行的最大操作数。
 *
 * 示例 1：
 * 输入：nums = [1,2,3,4], k = 5
 * 输出：2
 * 解释：开始时 nums = [1,2,3,4]。
 * 可以执行以下操作：
 * - 移出 1 和 4 ，之后 nums = [2,3]
 * - 移出 2 和 3 ，之后 nums = []
 * 不再有和为 5 的数对，因此最多执行 2 次操作。
 *
 * 示例 2：
 * 输入：nums = [3,1,3,4,3], k = 6
 * 输出：1
 * 解释：开始时 nums = [3,1,3,4,3]。
 * 可以执行以下操作：
 * - 移出前两个 3 ，之后 nums = [1,4,3]
 * - 移出 1 和 4 ，之后 nums = [3]
 * 不再有和为 6 的数对，因此最多执行 1 次操作。
 *
 * 提示：
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^9
 * 1 <= k <= 10^9
 *
 */

/**
 * 解题思路：
 * 1. 问题本质
 * - 找出数组中所有和为k的数对，每个数只能用一次
 * - 计算最多能找出多少个不重叠的数对
 * - 本质是一个配对问题
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 排序+双指针法
 * - 先对数组排序，然后使用左右指针从两端向中间移动
 * - 如果当前和等于k，找到一个数对，两个指针都移动
 * - 如果当前和小于k，左指针右移寻找更大的值
 * - 如果当前和大于k，右指针左移寻找更小的值
 *
 * B. 哈希表法
 * - 使用哈希表记录每个数字的出现次数
 * - 遍历数组，对每个数字num，检查(k-num)是否在哈希表中
 * - 如果存在，找到一个数对，减少(k-num)的计数
 * - 如果不存在，将当前数字加入哈希表
 *
 * 3. 具体执行流程(以排序+双指针法为例)：
 * 以 [1,2,3,4], k=5 为例：
 * - 排序后数组不变 [1,2,3,4]
 * - 初始状态：left=0 (值=1), right=3 (值=4)
 * - 1+4=5=k，找到一对，count++，left++，right--
 * - 现在 left=1 (值=2), right=2 (值=3)
 * - 2+3=5=k，找到一对，count++，left++，right--
 * - left=2, right=1，不满足 left<right，退出循环
 * - 返回 count=2
 *
 * 4. 关键点
 * - 排序+双指针法的核心是利用排序后数组的有序性，可以避免重复检查
 * - 哈希表法的核心是空间换时间，直接记录每个数字的计数
 * - 哈希表法不需要排序，时间复杂度更优，为O(n)
 *
 * 5. 复杂度分析
 * - 排序+双指针法：
 *   - 时间：O(nlogn)，主要是排序的开销
 *   - 空间：O(1)，只使用常数级别的额外空间（如果不考虑排序的空间开销）
 *
 * - 哈希表法：
 *   - 时间：O(n)，只需遍历数组一次
 *   - 空间：O(n)，哈希表最多可能存储所有元素
 *
 * 6. 方法选择
 * - 当数据量大但内存受限时，可选排序+双指针法
 * - 当对时间要求严格时，可选哈希表法
 * - 如果不希望修改原数组，也应选哈希表法
 */

export function maxOperations(nums: number[], k: number) {
  // 先对数组排序
  nums.sort((a, b) => a - b);

  let left = 0;
  let right = nums.length - 1;
  let count = 0;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === k) {
      count++;
      left++;
      right--;
    } else if (sum < k) {
      // 和小于k，左指针右移
      left++;
    } else {
      // 和大于k，右指针左移
      right--;
    }
  }

  return count;
}

// 哈希表解法
export function maxOperationsWithHash(nums: number[], k: number) {
  const map = new Map<number, number>();
  let count = 0;

  for (const num of nums) {
    const complement = k - num;

    if (map.has(complement) && map.get(complement)! > 0) {
      // 找到一对，计数加1
      count++;
      // 将配对数的计数减1
      map.set(complement, map.get(complement)! - 1);
    } else {
      // 将当前数字加入map，或增加其计数
      map.set(num, (map.get(num) || 0) + 1);
    }
  }

  return count;
}

export default {
  run: () => {
    const examples = [
      {
        input: { nums: [1, 2, 3, 4], k: 5 },
        output: 2,
      },
      {
        input: { nums: [3, 1, 3, 4, 3], k: 6 },
        output: 1,
      },
      {
        input: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k: 11 },
        output: 5,
      },
    ];

    for (const example of examples) {
      const result = maxOperations(example.input.nums, example.input.k);

      console.log(`输入: ${JSON.stringify(example.input)}, 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
