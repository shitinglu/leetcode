/**
 * 1926. 迷宫中离入口最近的出口
 * 题目链接：https://leetcode.cn/problems/nearest-exit-from-entrance-in-maze/
 *
 * 给你一个 m x n 的迷宫矩阵 maze （下标从 0 开始），矩阵中有空格子（用 '.' 表示）和墙（用 '+' 表示）。
 * 同时给你迷宫的入口 entrance ，用 entrance = [entrance_row, entrance_col] 表示你一开始所在格子的行和列。
 *
 * 每一步操作，你可以往 上，下，左，右 移动一格。你不能进入墙所在的格子，也不能离开迷宫。
 * 你的目标是找到离 entrance 最近的出口。出口 的含义是 maze 边界上的空格子。entrance 格子不算作出口。
 *
 * 请你返回从 entrance 到最近出口的最短路径的 步数 ，如果不存在这样的路径，请你返回 -1 。
 *
 * 示例 1：
 * 输入：maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
 * 输出：1
 * 解释：总共有 3 个出口，分别位于 (1,0)，(0,2) 和 (2,3) 。
 * 一开始，你在入口格子 (1,2) 处。
 * - 你可以往左移动 2 步到达 (1,0) 。
 * - 你可以往上移动 1 步到达 (0,2) 。
 * 从入口处没法到达 (2,3) 。
 * 所以，最近的出口是 (0,2) ，距离为 1 步。
 *
 * 示例 2：
 * 输入：maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0]
 * 输出：2
 * 解释：迷宫中只有 1 个出口，在 (1,2) 处。
 * (1,0) 不算作出口，因为它是入口格子。
 * 初始时，你在入口格子 (1,0) 处。
 * - 你可以往右移动 2 步到达 (1,2) 处。
 * 所以，最近的出口距离为 2 步。
 *
 * 示例 3：
 * 输入：maze = [[".","+"]], entrance = [0,0]
 * 输出：-1
 * 解释：这个迷宫中没有出口。
 *
 * 提示：
 * - maze.length == m
 * - maze[i].length == n
 * - 1 <= m, n <= 100
 * - maze[i][j] 要么是 '.' ，要么是 '+' 。
 * - entrance.length == 2
 * - 0 <= entrance_row < m
 * - 0 <= entrance_col < n
 * - entrance 一定是空格子。
 */

/**
 * 解题思路：
 * 1. 问题本质
 * - 这是一个寻找最短路径的问题
 * - 需要从入口找到最近的边界出口
 * - 可以使用广度优先搜索(BFS)来解决，因为BFS可以保证找到最短路径
 *
 * 2. 解决方案
 * - 使用BFS进行遍历
 * - 使用队列存储待访问的节点
 * - 使用visited数组记录已访问的位置
 * - 使用方向数组简化四个方向的移动
 *
 * 3. 具体执行流程(以示例1为例)：
 * maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
 * - 初始化：将入口点(1,2)加入队列，步数为0
 * - 第一层遍历：
 *   - 检查(1,2)的四个方向
 *   - 发现(0,2)是出口，返回步数1
 *
 * 4. 代码执行过程
 * - 初始化：
 *   - 创建方向数组：上、右、下、左
 *   - 创建访问数组记录已访问位置
 *   - 将入口点加入队列
 * - BFS遍历：
 *   - 从队列取出当前位置和步数
 *   - 检查四个方向的新位置
 *   - 如果新位置有效且未访问：
 *     - 检查是否到达出口
 *     - 如果是出口，返回步数+1
 *     - 如果不是出口，加入队列
 *
 * 5. 关键点
 * - 数据结构选择：
 *   - 队列：用于BFS遍历
 *   - 二维数组：记录已访问位置
 *   - 方向数组：简化四个方向的移动
 * - 算法步骤：
 *   - 使用BFS保证最短路径
 *   - 记录已访问位置避免重复
 *   - 判断出口条件：在边界上且不是入口
 *
 * 6. 复杂度分析
 * - 时间复杂度：O(m*n)，其中m和n是迷宫的行数和列数
 * - 空间复杂度：O(m*n)，用于存储队列和访问数组
 *
 * 7. 方法选择
 * - 选择BFS而不是DFS的原因：
 *   - BFS可以保证找到最短路径
 *   - DFS可能会找到更长的路径
 *   - BFS更适合处理最短路径问题
 */

export function nearestExit(maze: string[][], entrance: number[]): number {
  const rows = maze.length;
  const cols = maze[0].length;

  // 方向数组：上、右、下、左
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  // 创建访问数组
  const visited = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(false));
  console.log('visited', visited);

  // 创建队列，存储 [row, col, steps]
  const queue: [number, number, number][] = [[entrance[0], entrance[1], 0]];
  visited[entrance[0]][entrance[1]] = true;

  while (queue.length > 0) {
    const [row, col, steps] = queue.shift()!;

    // 检查四个方向
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      // 检查是否在边界内且未访问过
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited[newRow][newCol] &&
        maze[newRow][newCol] === '.'
      ) {
        // 检查是否到达出口（在边界上且不是入口）
        if (newRow === 0 || newRow === rows - 1 || newCol === 0 || newCol === cols - 1) {
          return steps + 1;
        }

        // 将新位置加入队列
        queue.push([newRow, newCol, steps + 1]);
        visited[newRow][newCol] = true;
      }
    }
  }

  return -1;
}

export default {
  run: () => {
    const examples = [
      {
        maze: [
          ['+', '+', '.', '+'],
          ['.', '.', '.', '+'],
          ['+', '+', '+', '.'],
        ],
        entrance: [1, 2],
        output: 1,
      },
      // {
      //   maze: [
      //     ['+', '+', '+'],
      //     ['.', '.', '.'],
      //     ['+', '+', '+'],
      //   ],
      //   entrance: [1, 0],
      //   output: 2,
      // },
      // {
      //   maze: [['.', '+']],
      //   entrance: [0, 0],
      //   output: -1,
      // },
    ];

    for (const example of examples) {
      const result = nearestExit(example.maze, example.entrance);
      console.log(
        `输入: maze = ${JSON.stringify(example.maze)}, entrance = ${JSON.stringify(example.entrance)}`
      );
      console.log(`输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
