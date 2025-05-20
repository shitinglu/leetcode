/**
 * 994. 腐烂的橘子
 * 题目链接：https://leetcode.cn/problems/rotting-oranges/
 *
 * 在给定的 m x n 网格中，每个单元格可以有以下三个值之一：
 * - 值 0 代表空单元格；
 * - 值 1 代表新鲜橘子；
 * - 值 2 代表腐烂的橘子。
 *
 * 每分钟，腐烂的橘子会感染上、下、左、右四个方向相邻的新鲜橘子。
 * 返回直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1。
 *
 * 示例：
 * 输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
 * 输出：4
 *
 * 输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
 * 输出：-1
 * 解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个正向上。
 *
 * 输入：grid = [[0,2]]
 * 输出：0
 * 解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
 *
 * 提示：
 * - m == grid.length
 * - n == grid[i].length
 * - 1 <= m, n <= 10
 * - grid[i][j] 仅为 0、1 或 2
 *
 * 问题：腐烂的橘子
 * 解题思路：
 * 1. 问题本质
 * - 这是一个多源BFS（广度优先搜索）问题
 * - 所有腐烂的橘子同时开始感染，每分钟感染相邻的新鲜橘子
 * - 需要计算所有新鲜橘子被感染所需的最少时间
 * - 如果存在无法被感染的新鲜橘子，返回-1
 *
 * 2. 解决方案
 * A. 多源BFS方法
 * - 将所有初始腐烂的橘子（值为2）加入队列
 * - 每一轮BFS代表一分钟的感染过程
 * - 使用队列存储当前所有腐烂的橘子
 * - 记录新鲜橘子的数量，用于判断是否全部腐烂
 *
 * 3. 具体执行流程(以示例1为例)
 * 输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
 * - 初始状态：
 *   - 腐烂橘子位置：(0,0)
 *   - 新鲜橘子数量：6
 * - 第一分钟：
 *   - 感染(0,1)和(1,0)
 *   - 新鲜橘子数量：4
 * - 第二分钟：
 *   - 感染(0,2)和(1,1)
 *   - 新鲜橘子数量：2
 * - 第三分钟：
 *   - 感染(2,1)
 *   - 新鲜橘子数量：1
 * - 第四分钟：
 *   - 感染(2,2)
 *   - 新鲜橘子数量：0
 *
 * 4. 代码的详细执行过程
 * - 第一步：初始化
 *   - 遍历网格，统计新鲜橘子数量
 *   - 将腐烂橘子加入队列
 * - 第二步：BFS过程
 *   - 每次处理当前层的所有腐烂橘子
 *   - 对每个腐烂橘子，检查四个方向
 *   - 如果遇到新鲜橘子，将其感染并加入队列
 * - 第三步：结果判断
 *   - 如果新鲜橘子数量为0，返回分钟数
 *   - 否则返回-1
 *
 * 5. 关键点
 * - 数据结构选择：
 *   - 使用队列存储腐烂橘子，保证按层处理
 *   - 使用方向数组简化四个方向的遍历
 * - 算法步骤：
 *   1. 统计初始状态
 *   2. 多源BFS模拟感染过程
 *   3. 判断是否全部感染
 * - 时间复杂度：O(m*n)，需要遍历整个网格
 * - 空间复杂度：O(m*n)，队列在最坏情况下可能存储所有格子
 *
 * 6. 复杂度分析
 * - 时间复杂度：O(m*n)
 *   - 需要遍历整个网格一次进行初始化
 *   - BFS过程最多访问每个格子一次
 * - 空间复杂度：O(m*n)
 *   - 队列在最坏情况下可能存储所有格子
 *   - 方向数组使用常数空间
 *
 * 7. 方法选择
 * - 选择多源BFS的原因：
 *   1. 需要模拟同时感染的过程
 *   2. 保证找到最短时间
 *   3. 可以处理无法全部感染的情况
 * - 其他可能的解法：
 *   1. DFS：不适合，因为需要按层处理
 *   2. 动态规划：不适用，因为状态转移不明确
 */

export function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  // 存坏橘子的坐标
  const queue: number[][] = [];
  // 新鲜橘子的数量
  let freshCount = 0;
  // 所用的时间
  let minutes = 0;

  // 统计新鲜橘子数量并收集腐烂的橘子
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        freshCount++;
      } else if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }

  // 如果没有新鲜橘子，直接返回0
  if (freshCount === 0) return 0;

  // 四个方向：上、右、下、左
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  // BFS过程
  while (queue.length > 0 && freshCount > 0) {
    const size = queue.length;

    // 处理当前层的所有腐烂橘子
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift()!;

      // 检查四个方向
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        // 检查边界和是否为新鲜橘子
        if (newX >= 0 && newX < m && newY >= 0 && newY < n && grid[newX][newY] === 1) {
          // 感染新鲜橘子
          grid[newX][newY] = 2;
          freshCount--;
          queue.push([newX, newY]);
        }
      }
    }

    // 如果这一轮有橘子被感染，时间加1
    if (queue.length > 0) {
      minutes++;
    }
  }

  // 如果还有新鲜橘子，返回-1
  return freshCount === 0 ? minutes : -1;
}

export default {
  run: () => {
    const examples = [
      {
        input: [
          [2, 1, 1],
          [1, 1, 0],
          [0, 1, 1],
        ],
        output: 4,
      },
      {
        input: [
          [2, 1, 1],
          [0, 1, 1],
          [1, 0, 1],
        ],
        output: -1,
      },
      {
        input: [[0, 2]],
        output: 0,
      },
    ];

    for (const example of examples) {
      const result = orangesRotting(example.input);
      console.log(`输入: grid = ${JSON.stringify(example.input)}`);
      console.log(`输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
