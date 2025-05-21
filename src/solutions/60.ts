/**
 * 435. 无重叠区间
 * 题目链接 https://leetcode.cn/problems/non-overlapping-intervals/
 *
 * 给定一个区间的集合 intervals，其中 intervals[i] = [starti, endi]。
 * 返回需要移除的区间的最小数量，使剩余区间互不重叠。
 *
 * 示例：
 * 输入：intervals = [[1,2],[2,3],[3,4],[1,3]]
 * 输出：1
 * 解释：移除 [1,3] 后，剩下的区间没有重叠。
 *
 * 输入：intervals = [[1,2],[1,2],[1,2]]
 * 输出：2
 * 解释：你需要移除两个 [1,2] 来使剩下的区间没有重叠。
 *
 * 输入：intervals = [[1,2],[2,3]]
 * 输出：0
 * 解释：你不需要移除任何区间，因为它们已经是无重叠的。
 *
 * 提示：
 * - 1 <= intervals.length <= 10^5
 * - intervals[i].length == 2
 * - -5 * 10^4 <= starti < endi <= 5 * 10^4
 */
/**
 * 问题: 435. 无重叠区间
 * 解题思路：
 * 1. 问题本质
 * - 给定一组区间，求移除最少的区间使剩余区间互不重叠
 * - 等价于求最多能保留多少个不重叠的区间
 * - 是一个贪心算法的经典应用
 *
 * 2. 解决方案
 * A. 贪心算法（按区间结束时间排序）
 * - 将所有区间按结束时间从小到大排序
 * - 优先选择结束时间早的区间
 * - 选择区间后，排除所有与该区间重叠的区间
 * - 重复上述过程直到处理完所有区间
 *
 * B. 贪心算法（按区间开始时间排序）
 * - 将所有区间按开始时间从小到大排序
 * - 选择不与当前所选区间冲突且开始时间最早的区间
 * - 重复上述过程直到处理完所有区间
 *
 * C. 动态规划（不是最优方案）
 * - 定义dp[i]为考虑前i个区间能得到的最大不重叠区间数
 * - 对每个区间，判断是选择还是不选择
 *
 * 3. 具体执行流程(以贪心算法结束时间排序为例)：
 * 以 intervals = [[1,2],[2,3],[3,4],[1,3]] 为例：
 * - 第一步：按结束时间排序
 *   - 排序后: [[1,2],[2,3],[1,3],[3,4]]
 * - 第二步：贪心选择
 *   - 选择[1,2]，end = 2
 *   - 检查[2,3]：2 >= 2，不重叠，选择，end = 3
 *   - 检查[1,3]：1 < 3，重叠，移除
 *   - 检查[3,4]：3 >= 3，不重叠，选择，end = 4
 * - 总共保留3个区间，需要移除1个，答案为1
 *
 * 4. 关键点
 * - 按区间结束时间排序是贪心策略的核心
 * - 优先选择结束早的区间可以为后面留出更多空间
 * - 重叠判断：如果当前区间的开始时间小于前一个选择区间的结束时间，则发生重叠
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n log n)
 *   - 排序操作为O(n log n)
 *   - 遍历一次数组为O(n)
 *   - 总体为O(n log n)
 * - 空间复杂度：O(1)
 *   - 只需要常数级别的额外空间
 *
 * 6. 方法选择
 * - 贪心算法在此问题上比动态规划更高效
 * - 按结束时间排序的贪心策略最为直观和高效
 * - 该问题是经典的区间调度问题，贪心算法能保证最优解
 */
export function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  intervals.sort((a, b) => a[1] - b[1]);

  let result: number = 0;
  let end = intervals[0][1]; // 当前选择区间的结束群区间

  for (let i = 1; i < intervals.length; i++) {
    // 如果当前区间的开始时间小于上一个区间的结束时间，则发生重叠，需要移除
    if (intervals[i][0] < end) {
      result++;
    } else {
      // 否则，当前区间可以保留，更新结束时间
      end = intervals[i][1];
    }
  }

  return result;
}

export default {
  run: () => {
    const examples = [
      {
        input: [
          [1, 2],
          [2, 3],
          [3, 4],
          [1, 3],
        ],
        output: 1,
      },
      {
        input: [
          [1, 2],
          [1, 2],
          [1, 2],
        ],
        output: 2,
      },
      {
        input: [
          [1, 2],
          [2, 3],
        ],
        output: 0,
      },
    ];

    for (const example of examples) {
      const result = eraseOverlapIntervals(example.input);
      console.log(`输入: intervals = ${JSON.stringify(example.input)}, 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
