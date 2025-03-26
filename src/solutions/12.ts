/**
 * https://leetcode.cn/problems/find-the-highest-altitude/?envType=study-plan-v2&envId=leetcode-75
 *
 * 12. largestAltitude
 *
 * 1732. 找到最高海拔
 * 有一个自行车手打算进行一场公路骑行，这条路线总共由 n + 1 个不同海拔的点组成。自行车手从海拔为 0 的点 0 开始骑行。
 * 给你一个长度为 n 的整数数组 gain ，其中 gain[i] 是点 i 和点 i + 1 的 净海拔高度差（0 <= i < n）。请你返回 最高点的海拔 。
 *
 * 示例 1：
 * 输入：gain = [-5,1,5,0,-7]
 * 输出：1
 * 解释：海拔高度依次为 [0,-5,-4,1,1,-6] 。最高海拔为 1 。
 *
 *
 * 示例 2：
 * 输入：gain = [-4,-3,-2,-1,4,3,2]
 * 输出：0
 * 解释：海拔高度依次为 [0,-4,-7,-9,-10,-6,-3,-1] 。最高海拔为 0 。
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 计算每个点的实际海拔高度
 *    - 找出所有海拔点中的最大值
 *
 * 2. 前缀和解法
 *    - 每个点的实际海拔是从起点到该点所有海拔差的累加和
 *    - 使用前缀和的思想，边累加边记录最大值
 *
 * 3. 具体执行流程 (以 gain = [-5,1,5,0,-7] 为例)：
 *    a) 起点海拔为0
 *    b) 第一个点：0 + (-5) = -5
 *    c) 第二个点：-5 + 1 = -4
 *    d) 第三个点：-4 + 5 = 1
 *    e) 第四个点：1 + 0 = 1
 *    f) 第五个点：1 + (-7) = -6
 *    过程中记录最大值为1
 *
 * 4. 关键点：
 *    - 起点海拔为0需要考虑在内
 *    - 使用currentHeight记录当前海拔
 *    - 使用maxHeight记录遇到的最大海拔
 *
 * 5. 复杂度：
 *    - 时间：O(n)，只需要遍历一次数组
 *    - 空间：O(1)，只使用两个变量
 */

export function largestAltitude(gain: number[]) {
  let currentHeight = 0; // 当前的前缀和
  let maxHeight = 0; // 最大前缀和

  for (const diff of gain) {
    currentHeight = currentHeight + diff;
    maxHeight = Math.max(maxHeight, currentHeight);
  }

  return maxHeight;
}

export default {
  run: () => {
    const examples = [
      [-5, 1, 5, 0, -7],
      [-4, -3, -2, -1, 4, 3, 2],
    ];

    examples.forEach(example => {
      console.log(largestAltitude(example));
    });
  },
};
