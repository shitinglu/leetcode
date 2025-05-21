/**
 * 714. 买卖股票的最佳时机含手续费
 * 题目链接：https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
 *
 * 给定一个整数数组 prices，其中 prices[i] 表示第 i 天的股票价格；另给定一个整数 fee 表示交易股票的手续费用。
 *
 * 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
 *
 * 返回获得利润的最大值。
 *
 * 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
 *
 * 示例：
 * 输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
 * 输出：8
 * 解释：能够达到的最大利润:
 * 在此处买入 prices[0] = 1
 * 在此处卖出 prices[3] = 8
 * 在此处买入 prices[4] = 4
 * 在此处卖出 prices[5] = 9
 * 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8
 *
 * 输入：prices = [1,3,7,5,10,3], fee = 3
 * 输出：6
 *
 * 提示：
 * - 1 <= prices.length <= 5 * 10^4
 * - 1 <= prices[i] < 5 * 10^4
 * - 0 <= fee < 5 * 10^4
 */

/**
 * 问题：买卖股票的最佳时机含手续费
 * 解题思路：
 * 1. 问题本质
 * - 在一系列交易日中寻找最佳的买卖时机，获取最大利润
 * - 每次交易需要支付固定的手续费
 * - 可以进行多次交易，但在卖出之前不能再次购买
 *
 * 2. 解决方案
 * - 动态规划：使用两个状态变量跟踪每天结束时的最大利润
 * - 贪心算法：找到低买高卖的机会，但需要考虑手续费的影响
 *
 * 本解法采用动态规划方法：维护两个变量表示两种状态
 *
 * 3. 具体执行流程(以[1,3,2,8,4,9], fee=2为例)
 * - 初始状态：hold = -1, notHold = 0
 * - 第1天(价格3)：
 *   - hold = max(-1, 0-3) = -1 (保持持有或买入)
 *   - notHold = max(0, -1+3-2) = 0 (保持不持有或卖出)
 * - 第2天(价格2)：
 *   - hold = max(-1, 0-2) = -1
 *   - notHold = max(0, -1+2-2) = 0
 * - 第3天(价格8)：
 *   - hold = max(-1, 0-8) = -1
 *   - notHold = max(0, -1+8-2) = 5
 * - 第4天(价格4)：
 *   - hold = max(-1, 5-4) = 1
 *   - notHold = max(5, 1+4-2) = 5
 * - 第5天(价格9)：
 *   - hold = max(1, 5-9) = 1
 *   - notHold = max(5, 1+9-2) = 8
 * - 最终结果：notHold = 8
 *
 * 4. 代码的详细执行过程
 * - 初始化两个变量：hold表示持有股票的最大利润，notHold表示不持有股票的最大利润
 * - 对于第0天：hold初始化为-prices[0]（买入股票），notHold初始化为0（不操作）
 * - 遍历每一天的价格prices[i]：
 *   - 对于持有状态：可以保持前一天的持有状态，或者从不持有状态买入新股票
 *   - 对于不持有状态：可以保持前一天的不持有状态，或者从持有状态卖出股票并支付手续费
 *   - 计算这两种状态的最大利润
 * - 最终返回不持有状态的最大利润（因为最后一定是卖出股票才能获得最大收益）
 *
 * 5. 关键点
 * - 状态定义：hold表示持有股票的最大利润，notHold表示不持有股票的最大利润
 * - 状态转移方程：
 *   - hold = max(hold, notHold - prices[i])
 *   - notHold = max(notHold, hold + prices[i] - fee)
 * - 需要临时保存前一个hold状态，因为状态更新会相互依赖
 *
 * 6. 复杂度分析
 * - 时间复杂度：O(n)，其中n是股票价格数组的长度，只需遍历一次数组
 * - 空间复杂度：O(1)，只使用两个变量来维护状态，与数组大小无关
 *
 * 7. 方法选择
 * - 动态规划是解决此类问题的经典方法，便于理解和实现
 * - 也可以使用贪心算法，但实现上需要更多考虑手续费的影响
 * - 本题使用动态规划更为清晰，状态转移直观
 */

export function maxProfit(prices: number[], fee: number): number {
  if (prices.length <= 1) return 0;

  // 初始状态：第0天结束时的状态
  let hold = -prices[0]; // 持有股票的最大利润（负数，表示花钱买入）
  let notHold = 0; // 不持有股票的最大利润

  // 遍历每一天，更新状态
  for (let i = 1; i < prices.length; i++) {
    // 更新状态：今天结束时的最大利润
    let prevHold = hold;
    hold = Math.max(hold, notHold - prices[i]); // 保持持有 或 买入新股票
    notHold = Math.max(notHold, prevHold + prices[i] - fee); // 保持不持有 或 卖出股票并支付手续费
  }

  // 最终结果一定是不持有股票的状态
  return notHold;
}

export default {
  run: () => {
    const examples = [
      {
        input: [[1, 3, 2, 8, 4, 9], 2],
        output: 8,
      },
      {
        input: [[1, 3, 7, 5, 10, 3], 3],
        output: 6,
      },
    ];

    for (const example of examples) {
      const result = maxProfit(example.input[0], example.input[1]);
      console.log(
        `输入: prices = [${example.input[0]}], fee = ${example.input[1]}, 输出: ${result}`
      );
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
