/**
 * 198. 打家劫舍
 * 题目链接: https://leetcode.cn/problems/house-robber/
 *
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
 * 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 *
 * 给定一个代表每个房屋存放金额的非负整数数组 nums ，
 * 请计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 *
 * 示例：
 * 输入: nums = [1,2,3,1]
 * 输出: 4
 * 解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
 *      偷窃到的最高金额 = 1 + 3 = 4 。
 *
 * 输入: nums = [2,7,9,3,1]
 * 输出: 12
 * 解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
 *      偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 *
 * 提示：
 * - 1 <= nums.length <= 100
 * - 0 <= nums[i] <= 400
 */

/**
 * 问题：打家劫舍
 * 解题思路：
 * 1. 问题本质
 *    - 在一排房屋中选择若干不相邻的房屋进行偷窃，使得获得的总金额最大
 *    - 关键约束是不能选择相邻的房屋（会触发警报）
 *    - 本质上是一个动态规划问题
 *
 * 2. 解决方案
 *    A. 动态规划
 *       - 定义状态：dp[i]表示偷到第i个房屋时能获得的最大金额
 *       - 状态转移方程：dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 *         * dp[i-1]：不偷第i个房屋的最大金额
 *         * dp[i-2] + nums[i]：偷第i个房屋的最大金额
 *       - 初始条件：
 *         * dp[0] = nums[0]（只有一间房）
 *         * dp[1] = max(nums[0], nums[1])（两间房取最大值）
 *       - 优化：使用滚动数组，只保存前两个状态
 *
 *    B. 递归+记忆化（自顶向下）
 *       - 使用递归函数计算rob(i)表示偷到第i个房屋的最大金额
 *       - 使用记忆化避免重复计算
 *
 * 3. 具体执行流程(以动态规划为例)
 *    以nums = [2,7,9,3,1]为例：
 *    - dp[0] = 2（只偷第一间房能得到2）
 *    - dp[1] = max(2,7) = 7（在前两间房中选择金额大的7）
 *    - dp[2] = max(dp[1], dp[0]+nums[2]) = max(7, 2+9) = 11（可以选择不偷第3间或偷第3间）
 *    - dp[3] = max(dp[2], dp[1]+nums[3]) = max(11, 7+3) = 11（可以选择不偷第4间或偷第4间）
 *    - dp[4] = max(dp[3], dp[2]+nums[4]) = max(11, 11+1) = 12（可以选择不偷第5间或偷第5间）
 *    - 最终最大金额为12
 *
 * 4. 代码的详细执行过程
 *    对于滚动数组优化的版本：
 *    - prev2 = 2（第一间房）
 *    - prev1 = 7（前两间房中的最大值）
 *    - i=2：计算current = max(7, 2+9) = 11，更新prev2=7, prev1=11
 *    - i=3：计算current = max(11, 7+3) = 11，更新prev2=11, prev1=11
 *    - i=4：计算current = max(11, 11+1) = 12，更新prev2=11, prev1=12
 *    - 返回prev1 = 12作为结果
 *
 * 5. 关键点
 *    - 状态定义明确：dp[i]表示偷到第i个房屋的最大金额
 *    - 选择的处理：对每个房屋，可以选择偷或不偷
 *    - 不能偷相邻房屋的约束处理：不偷选dp[i-1]，偷选dp[i-2]+nums[i]
 *    - 边界条件处理：特别处理数组长度为0和1的情况
 *    - 空间优化：使用滚动数组，只需O(1)空间
 *
 * 6. 复杂度分析
 *    - 时间复杂度：O(n)，其中n是房屋数量，只需遍历一次数组
 *    - 空间复杂度：
 *      * 常规动态规划：O(n)，需要一个长度为n的dp数组
 *      * 优化后的滚动数组：O(1)，只需常数空间
 *
 * 7. 方法选择
 *    - 优先使用滚动数组优化的动态规划方法，既简洁又高效
 *    - 对于理解，可以先从常规动态规划开始，再优化到滚动数组
 *    - 递归+记忆化也是可行的，但动态规划更为直观
 */

export function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  // 方法1：使用数组存储所有状态
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[nums.length - 1];

  // 方法2：使用滚动数组优化空间复杂度
  /*
  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);
  
  for (let i = 2; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
  */
}

export default {
  run: () => {
    const examples = [
      {
        input: [1, 2, 3, 1],
        output: 4,
      },
      {
        input: [2, 7, 9, 3, 1],
        output: 12,
      },
      {
        input: [1, 2, 3],
        output: 4,
      },
    ];

    for (const example of examples) {
      const result = rob(example.input);
      console.log(`输入: nums = [${example.input}], 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
