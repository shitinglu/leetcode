/**
 * 875. 爱吃香蕉的珂珂
 * 题目链接 https://leetcode.cn/problems/koko-eating-bananas/
 *
 * 珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。
 *
 * 珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。
 *
 * 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
 *
 * 返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。
 *
 * 示例 1：
 * 输入：piles = [3,6,7,11], h = 8
 * 输出：4
 *
 * 示例 2：
 * 输入：piles = [30,11,23,4,20], h = 5
 * 输出：30
 *
 * 示例 3：
 * 输入：piles = [30,11,23,4,20], h = 6
 * 输出：23
 *
 * 提示：
 * - 1 <= piles.length <= 10^4
 * - piles.length <= h <= 10^9
 * - 1 <= piles[i] <= 10^9
 */
/**
 * 问题理解：
 * 珂珂吃香蕉有特定规则：1) 每小时选择一堆香蕉，以速度k吃；2) 如果这堆香蕉少于k根，
 * 会全部吃完但不会再吃其他堆；3) 需要在h小时内吃完所有香蕉。
 * 目标是找到满足条件的最小速度k。
 *
 * 解题思路：
 * 1. 问题本质
 * - 这是一个"二分查找"优化问题
 * - 速度k的范围有明确界限：最小为1，最大为香蕉堆中的最大值
 * - 对于任意速度k，可以计算吃完所有香蕉需要的总时间
 * - 需要找到能在h小时内吃完所有香蕉的最小速度k
 *
 * 2. 解决方案
 * A. 暴力法
 * - 从k=1开始尝试每个可能的速度值
 * - 计算每个速度下吃完所有香蕉需要的时间
 * - 返回第一个满足时间≤h的速度值
 *
 * B. 二分查找法（优化方案）
 * - 观察到吃香蕉的时间与速度k成反比关系
 * - 速度越大，吃完所需时间越少；速度越小，时间越多
 * - 使用二分查找在可能的速度范围内查找最小满足条件的k
 *
 * 3. 具体执行流程(以二分查找为例)：
 * 以 piles = [3,6,7,11], h = 8 为例：
 * - 初始查找范围：left=1, right=11（数组最大值）
 * - 第一次迭代：mid=6, totalHours=6（计算吃完需要的时间）
 *   - 3/6向上取整=1小时，6/6=1小时，7/6向上取整=2小时，11/6向上取整=2小时
 *   - 共需6小时 < h=8，可以尝试更小速度，right=6
 * - 第二次迭代：mid=3, totalHours=10（3+2+3+4=12，超时）
 *   - 不满足条件，需要更大速度，left=4
 * - 第三次迭代：mid=5, totalHours=7
 *   - 满足条件，可以尝试更小速度，right=5
 * - 第四次迭代：mid=4, totalHours=8
 *   - 刚好满足条件，可以尝试更小速度，right=4
 * - 循环结束，left=4，这就是答案
 *
 * 4. 关键点
 * - 将每堆香蕉吃完所需时间计算公式：Math.ceil(pile / k)
 * - 二分查找的初始范围设置：最小速度1，最大速度为最大堆的大小
 * - 二分查找结束条件：left >= right
 * - 最终答案是left，即满足条件的最小速度
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n log m)
 *   - n是香蕉堆数量，m是最大堆的香蕉数
 *   - 二分查找执行log m次迭代
 *   - 每次迭代需要O(n)时间计算总时间
 * - 空间复杂度：O(1)
 *   - 只使用常数额外空间
 *
 * 6. 方法选择
 * - 二分查找法明显优于暴力法
 * - 暴力法时间复杂度为O(n*m)，m可能非常大（最大可达10^9）
 * - 二分查找充分利用了时间与速度的单调关系
 */
export function minEatingSpeed(piles: number[], h: number): number {
  // 最小速度为一个小时吃一根
  let left = 1;
  // 最大速度为数组里面最大的速度
  let right = Math.max(...piles);

  while (left < right) {
    // 吃香蕉的速度
    const mid = Math.floor((left + right) / 2);

    // 吃香蕉的总时间

    let totalHours = 0;
    for (const pile of piles) {
      // 向上取整，因为吃不完一堆也要花一小时
      totalHours += Math.ceil(pile / mid);
    }

    // 如果totalHours小于等于h，说明速度可以更慢
    if (totalHours <= h) {
      right = mid;
    } else {
      // 速度太慢，需要更快
      left = mid + 1;
    }
  }

  // 函数实现
  return left;
}

export default {
  run: () => {
    const examples = [
      {
        input: {
          piles: [3, 6, 7, 11],
          h: 8,
        },
        output: 4,
      },
      {
        input: {
          piles: [30, 11, 23, 4, 20],
          h: 5,
        },
        output: 30,
      },
      {
        input: {
          piles: [30, 11, 23, 4, 20],
          h: 6,
        },
        output: 23,
      },
    ];

    for (const example of examples) {
      const result = minEatingSpeed(example.input.piles, example.input.h);
      console.log(
        `输入: piles = [${example.input.piles}], h = ${example.input.h}, 输出: ${result}`
      );
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
