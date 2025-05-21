/**
 * 746. 使用最小花费爬楼梯
 * 题目链接：https://leetcode.cn/problems/min-cost-climbing-stairs/
 *
 * 给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。
 * 一旦你支付此费用，即可选择向上爬一个或者两个台阶。
 * 你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
 * 请你计算并返回达到楼梯顶部的最低花费。
 *
 * 示例 1：
 * 输入：cost = [10,15,20]
 * 输出：15
 * 解释：你将从下标为 1 的台阶开始。
 * - 支付 15 ，向上爬两个台阶，到达楼梯顶部。
 * 总花费为 15 。
 *
 * 示例 2：
 * 输入：cost = [1,100,1,1,1,100,1,1,100,1]
 * 输出：6
 * 解释：你将从下标为 0 的台阶开始。
 * - 支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。
 * - 支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。
 * - 支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。
 * - 支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。
 * - 支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。
 * - 支付 1 ，向上爬一个台阶，到达楼梯顶部。
 * 总花费为 6 。
 *
 * 提示：
 * - 2 <= cost.length <= 1000
 * - 0 <= cost[i] <= 999
 */

/**
 * 问题: 使用最小花费爬楼梯
 * 解题思路：
 * 1. 问题本质
 * - 在给定花费数组的情况下，找到到达楼梯顶部的最小花费
 * - 每次可以选择爬1个或2个台阶
 * - 可以从第0个或第1个台阶开始
 * - 需要支付当前台阶的费用才能继续爬
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 动态规划（推荐）
 * - 定义状态：dp[i]表示到达第i个台阶的最小花费
 * - 状态转移：dp[i] = min(dp[i-1], dp[i-2]) + cost[i]
 * - 初始状态：dp[0] = cost[0], dp[1] = cost[1]
 * - 最终结果：dp[n]，其中n为cost数组长度
 *
 * B. 回溯法（不推荐）
 * - 从第0个或第1个台阶开始尝试
 * - 每次可以选择跳1步或2步
 * - 记录所有可能路径中的最小花费
 * - 使用全局变量记录最小花费
 *
 * 3. 具体执行流程(以动态规划为例)：
 * 以 cost = [10,15,20] 为例：
 * - 初始化：dp[0] = 10, dp[1] = 15
 * - 计算dp[2]：min(10, 15) + 20 = 30
 * - 计算dp[3]：min(15, 30) + 0 = 15
 * - 返回dp[3] = 15
 *
 * 4. 关键点
 * - 动态规划数组长度需要比cost数组多1，用于表示到达顶部
 * - 到达顶部时不需要支付费用
 * - 可以从第0个或第1个台阶开始，需要分别计算
 * - 状态转移方程需要考虑边界情况
 *
 * 5. 复杂度分析
 * - 动态规划：
 *   - 时间：O(n)，只需要遍历一次数组
 *   - 空间：O(n)，需要一个dp数组
 *   - 优化后空间：O(1)，只使用三个变量
 *
 * - 回溯法：
 *   - 时间：O(2^n)，每个位置都有两种选择
 *   - 空间：O(n)，递归调用栈的深度
 *
 * 6. 方法选择
 * - 动态规划是更优解，因为：
 *   - 时间复杂度更低
 *   - 空间复杂度可以优化
 *   - 避免了重复计算
 *   - 适合大规模输入
 *
 * - 回溯法虽然直观但效率低：
 *   - 存在大量重复计算
 *   - 时间复杂度指数级
 *   - 不适合大规模输入
 *
 * 7. 优化建议
 * - 使用滚动数组优化空间复杂度
 * - 可以只保存前两个状态
 * - 使用三个变量代替dp数组
 * - 注意处理边界情况
 */

export function minCostClimbingStairs(cost: number[]): number {
  // 创建dp数组，dp[i]表示到达第i个台阶的最小花费
  const dp = new Array(cost.length + 1).fill(0);

  // 初始化前两个台阶的花费
  dp[0] = cost[0];
  dp[1] = cost[1];

  // 从第三个台阶开始计算
  for (let i = 2; i <= cost.length; i++) {
    // 当前台阶的花费 = min(前一个台阶的花费, 前两个台阶的花费) + 当前台阶的花费
    // 注意：当i等于cost.length时，表示到达顶部，此时不需要加上cost[i]
    const currentCost = i === cost.length ? 0 : cost[i];
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + currentCost;
  }

  // 返回到达顶部的最小花费
  return dp[cost.length];
}

export function minCostClimbingStairs2(cost: number[]): number {
  let minCost = Infinity;

  // 回溯函数
  const backtrack = (index: number, currentCost: number) => {
    // 如果已经到达或超过顶部，更新最小花费
    if (index >= cost.length) {
      minCost = Math.min(minCost, currentCost);
      return;
    }

    // 支付当前台阶的费用
    currentCost += cost[index];

    // 尝试跳一步
    backtrack(index + 1, currentCost);
    // 尝试跳两步
    backtrack(index + 2, currentCost);
  };

  // 从第0个台阶开始
  backtrack(0, 0);
  // 从第1个台阶开始
  backtrack(1, 0);

  return minCost;
}

export default {
  run: () => {
    const examples = [
      {
        input: [10, 15, 20],
        output: 15,
      },
      {
        input: [1, 100, 1, 1, 1, 100, 1, 1, 100, 1],
        output: 6,
      },
    ];

    for (const example of examples) {
      const result = minCostClimbingStairs(example.input);
      console.log(`输入: cost = [${example.input}], 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
