/**
 * https://leetcode.cn/problems/equal-row-and-column-pairs/?envType=study-plan-v2&envId=leetcode-75
 * 23. equalPairs - 相等行列对
 *

 * 示例 1：
 * 输入：grid = [[3,2,1],[1,7,6],[2,7,7]]
 * 输出：1
 * 解释：存在一对相等行列对：
 * - (第 2 行，第 1 列)：[2,7,7]
 *
 * 示例 2：
 * 输入：grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
 * 输出：3
 * 解释：存在三对相等行列对：
 * - (第 0 行，第 0 列)：[3,1,2,2]
 * - (第 2 行，第 2 列)：[2,4,2,2]
 * - (第 3 行，第 2 列)：[2,4,2,2]
 *
 * 提示：
 * - n == grid.length == grid[i].length
 * - 1 <= n <= 200
 * - 1 <= grid[i][j] <= 10^5
 */

/**
 * 解题思路：
 * 1. 问题分析：
 *    - 需要找出矩阵中行和列完全相等的对数
 *    - 矩阵是 n x n 的方阵，即行数等于列数
 *    - 行和列相等意味着它们的元素在相同位置上值都相同
 *
 * 2. 解决方案：
 *    方案1 - 暴力解法（O(n³)）：
 *    - 遍历每一行和每一列进行比较
 *    - 需要三层循环：行、列、元素比较
 *
 *    方案2 - 哈希表优化（O(n²)）：
 *    - 使用哈希表存储每一行的特征（转为字符串）
 *    - 统计每种行的出现次数
 *    - 遍历列并检查是否存在匹配的行
 *
 * 3. 代码实现要点：
 *    - 使用 Map 存储行的字符串表示及其出现次数
 *    - 将列转换为数组后再转字符串，与行进行匹配
 *    - 当找到匹配时，累加该行的出现次数
 *
 * 4. 复杂度分析：
 *    时间复杂度：O(n²)
 *    - 需要遍历矩阵的所有元素一次来处理行
 *    - 需要再次遍历来处理列
 *    空间复杂度：O(n²)
 *    - 需要存储行的字符串表示
 *
 */

export function equalPairs(grid: number[][]) {
  const n = grid.length;
  const rowMap = new Map<string, number>();

  // 步骤1：统计每种行的出现次数
  for (let i = 0; i < n; i++) {
    const rowStr = grid[i].toString(); // 将行转换为字符串作为特征
    rowMap.set(rowStr, (rowMap.get(rowStr) || 0) + 1);
  }

  // 步骤2：检查每一列是否与某行匹配
  let count = 0;
  for (let j = 0; j < n; j++) {
    // 提取第j列并转换为数组
    const column = [];
    for (let i = 0; i < n; i++) {
      column.push(grid[i][j]);
    }

    // 将列转为字符串并查找是否有匹配的行
    const colStr = column.toString();
    if (rowMap.has(colStr)) {
      count += rowMap.get(colStr) || 0;
    }
  }

  return count;
}

export default {
  run: () => {
    const examples = [
      {
        input: [
          [3, 2, 1],
          [1, 7, 6],
          [2, 7, 7],
        ],
        output: 1,
      },
      {
        input: [
          [3, 1, 2, 2],
          [1, 4, 4, 5],
          [2, 4, 2, 2],
          [2, 4, 2, 2],
        ],
        output: 3,
      },
    ];

    for (const example of examples) {
      const result = equalPairs(example.input);
      console.log(`输入: ${JSON.stringify(example.input)}, 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
