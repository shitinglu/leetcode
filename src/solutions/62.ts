/**
 * 547. 省份数量
 * 题目链接: https://leetcode.cn/problems/number-of-provinces/
 *
 * 有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，
 * 且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。
 *
 * 省份是一组直接或间接相连的城市，组内不含其他没有相连的城市。
 *
 * 给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市
 * 和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。
 *
 * 返回矩阵中 省份 的数量。
 *
 * 示例：
 * 输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
 * 输出：2
 * 解释：
 * 有 3 个城市。城市 0 和城市 1 相连，城市 2 与其他城市不相连。
 * 因此有 2 个省份：[0,1] 和 [2]
 *
 * 输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
 * 输出：3
 * 解释：
 * 有 3 个城市。每个城市都与其他城市不相连。所以有 3 个省份：[0], [1], [2]
 *
 * 提示：
 * - 1 <= n <= 200
 * - n == isConnected.length
 * - n == isConnected[i].length
 * - isConnected[i][j] 为 1 或 0
 * - isConnected[i][i] == 1
 * - isConnected[i][j] == isConnected[j][i]
 */

/**
详细执行流程
以示例 [[1,1,0],[1,1,0],[0,0,1]] 为例，我会一步步解释执行过程：
初始化：
n = 3（3个城市）
visited = [false, false, false]（所有城市初始未访问）
provinces = 0（省份计数器初始为0）
开始遍历：
i = 0：城市0未访问
provinces = 1（发现第一个省份）
调用dfs(0)
DFS(0)执行：
标记城市0为已访问：visited = [true, false, false]
遍历所有城市寻找与城市0相连的城市：
j = 0：isConnected[0][0] = 1，但已访问，跳过
j = 1：isConnected[0][1] = 1，未访问，调用dfs(1)
DFS(1)执行：
标记城市1为已访问：visited = [true, true, false]
遍历所有城市寻找与城市1相连的城市：
j = 0：isConnected[1][0] = 1，但已访问，跳过
j = 1：isConnected[1][1] = 1，但已访问，跳过
j = 2：isConnected[1][2] = 0，不相连，跳过
dfs(1)执行完毕，返回到dfs(0)
继续DFS(0)：
j = 2：isConnected[0][2] = 0，不相连，跳过
dfs(0)执行完毕，返回到主循环
继续主循环：
i = 1：城市1已被访问，跳过
i = 2：城市2未被访问
provinces = 2（发现第二个省份）
调用dfs(2)
DFS(2)执行：
标记城市2为已访问：visited = [true, true, true]
遍历所有城市寻找与城市2相连的城市：
j = 0：isConnected[2][0] = 0，不相连，跳过
j = 1：isConnected[2][1] = 0，不相连，跳过
j = 2：isConnected[2][2] = 1，但已访问，跳过
dfs(2)执行完毕，返回到主循环
结束主循环，返回结果：
所有城市都已访问完毕
返回provinces = 2
关键点解析
访问标记：visited数组确保每个城市只被访问一次，避免无限递归
递归深入：当发现相连城市时，DFS会立即深入到该城市，而不是继续水平遍历
省份计数：每次从一个未访问的城市开始新的DFS，就表示发现了一个新的独立省份
连通性传递：由于DFS会递归访问所有相连城市，所以能正确处理间接相连的情况
这种DFS方法能有效找出所有连通分量（省份），时间复杂度为O(n²)，空间复杂度为O(n)。
 */

export function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const visited = new Array(n).fill(false);
  let provinces = 0;
  // DFS函数，访问城市i以及所有与之相连的城市
  const dfs = (i: number) => {
    visited[i] = true;

    for (let j = 0; j < n; j++) {
      if (isConnected[i][j] === 1 && !visited[j]) {
        dfs(j);
      }
    }
  };

  // 遍历每个城市
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      // 每发现一个未访问的城市，意味着找到了一个新的省份
      provinces++;
      dfs(i);
    }
  }

  return provinces;
}

export default {
  run: () => {
    const examples = [
      {
        input: [
          [1, 1, 0],
          [1, 1, 0],
          [0, 0, 1],
        ],
        output: 2,
      },
      {
        input: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        output: 3,
      },
    ];

    for (const example of examples) {
      const result = findCircleNum(example.input);
      console.log(`输入: isConnected = ${JSON.stringify(example.input)}, 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
