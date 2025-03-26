/**
 * https://leetcode.cn/problems/increasing-triplet-subsequence/?envType=study-plan-v2&envId=leetcode-75
 * 18. increasingTriplet
 *
 * 给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。
 * 如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。
 *
 * 示例 1：
 * 输入：nums = [1,2,3,4,5]
 * 输出：true
 * 解释：任何 i < j < k 的三元组都满足题意
 *
 * 示例 2：
 * 输入：nums = [5,4,3,2,1]
 * 输出：false
 * 解释：没有三元组下标 (i, j, k) 满足 i < j < k ，使得 nums[i] < nums[j] < nums[k] 。
 *
 * 示例 3：
 * 输入：nums = [2,1,5,0,4,6]
 * 输出：true
 * 解释：三元组 (3, 4, 5) 满足题意，因为 nums[3] == 0 < nums[4] == 4 < nums[5] == 6
 *
 * 提示：
 * 1 <= nums.length <= 5 * 10^5
 * -2^31 <= nums[i] <= 2^31 - 1
 */

/**
 * 解题思路：
 * 1. 问题本质
 * - 判断数组中是否存在长度为3的递增子序列
 * - 子序列不必连续，只需满足位置索引 i < j < k 且 nums[i] < nums[j] < nums[k]
 * - 返回布尔值表示是否存在这样的三元组
 *
 * 2. 解决方案（贪心算法）
 * - 使用两个变量记录遍历过程中的最小值和第二小值
 * - 如果找到比这两个值都大的元素，则存在递增三元组
 *
 * 3. 具体执行流程(以 [20, 100, 10, 12, 5, 13] 为例)：
 * - 初始状态：firstMin = ∞, secondMin = ∞
 * - 遍历数组：
 *   - 20: 更新 firstMin = 20
 *   - 100: 更新 secondMin = 100
 *   - 10: 更新 firstMin = 10 (更小的值)
 *   - 12: 更新 secondMin = 12
 *   - 5: 更新 firstMin = 5
 *   - 13: 发现 13 > secondMin > firstMin，返回 true
 *
 * 4. 关键点：
 * - !!!重要!!! 递增子序列元素不必连续，我之前错误地寻找连续的三个递增元素
 * - 贪心思想：始终保持最小的 firstMin 和 secondMin，增加找到第三个元素的概率
 * - firstMin 和 secondMin 不一定是最终三元组的前两个元素，只是用来辅助判断
 *
 * 5. 复杂度分析：
 * - 时间：O(n)，只需遍历一次数组
 * - 空间：O(1)，只使用两个变量存储状态
 *
 * 6. 优化方案：
 * - 这个算法已经是最优解，时间和空间复杂度都是最优的
 * - 对于特殊情况（数组长度小于3）进行了提前判断，避免不必要的计算
 */

export function increasingTriplet(nums: number[]) {
  // 长度不够的直接返回
  if (nums.length < 3) return false;

  // 记录遍历过程中的最小值和第二小值
  let firstMin = Number.MAX_SAFE_INTEGER;
  let secondMin = Number.MAX_SAFE_INTEGER;

  // 遍历整个数组
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];

    // 如果当前值小于等于最小值，更新最小值
    if (current <= firstMin) {
      firstMin = current;
    }
    // 如果当前值小于等于第二小值但大于最小值，更新第二小值
    else if (current <= secondMin) {
      secondMin = current;
    }
    // 如果当前值大于最小值和第二小值，找到了递增三元组
    else {
      return true;
    }
  }

  return false;
}

// 我的解题思路 但是搞复杂了
export function increasingTriplet2(nums: number[]) {
  // 长度不够的直接返回
  if (nums.length < 3) return false;

  // 遍历数组，寻找以每个元素开始的递增三元组
  for (let i = 0; i < nums.length - 2; i++) {
    // 初始化第一个元素和计数
    let first = nums[i];
    let second = Number.MAX_SAFE_INTEGER;
    let found = false;

    // 从i+1开始查找第二个和第三个元素
    for (let j = i + 1; j < nums.length; j++) {
      // 如果还没找到第二个元素，且当前元素大于第一个元素
      if (!found && nums[j] > first) {
        second = nums[j];
        found = true;
      }
      // 如果已经找到第二个元素，且当前元素大于第二个元素
      else if (found && nums[j] > second) {
        return true; // 找到递增三元组
      }
    }
  }

  return false;
}
export default {
  run: () => {
    const examples = [
      {
        input: [1, 2, 3, 4, 5],
        output: true,
      },
      {
        input: [5, 4, 3, 2, 1],
        output: false,
      },
      {
        input: [2, 1, 5, 0, 4, 6],
        output: true,
      },
      {
        input: [20, 100, 10, 12, 5, 13],
        output: true,
      },
    ];

    for (const example of examples) {
      const result = increasingTriplet(example.input);
      console.log(`输入: ${example.input}, 输出: ${result}`);
    }
  },
};
