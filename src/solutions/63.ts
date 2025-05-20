/**
 * 1466. 重新规划路线
 * 题目链接: https://leetcode.cn/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/
 *
 * n 座城市，从 0 到 n-1 编号，其间共有 n-1 条道路。因此，所有城市形成了一个简单无环连通图。
 * 城市图由数组 edges 组成，其中 edges[i] = [fromi, toi] 表示城市 fromi 和 toi 之间有一条有向边。
 * 题目保证任意城市之间只有一条路径。
 *
 * 示例：
 * 输入：n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
 * 输出：3
 * 解释：更改以红色显示的路线方向，使得每个城市都可以到达城市 0。
 *
 * 示例 2：
 * 输入：n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
 * 输出：2
 * 解释：更改以红色显示的路线方向，使得每个城市都可以到达城市 0。
 *
 * 示例 3：
 * 输入：n = 3, connections = [[1,0],[2,0]]
 * 输出：0
 *
 * 提示：
 * - 2 <= n <= 5 * 10^4
 * - connections.length == n-1
 * - connections[i].length == 2
 * - 0 <= fromi, toi <= n-1
 * - fromi != toi
 */

export function minReorder(n: number, connections: number[][]): number {
  // 实现函数
  return 0;
}

export default {
  run: () => {
    const examples = [
      {
        input: [
          6,
          [
            [0, 1],
            [1, 3],
            [2, 3],
            [4, 0],
            [4, 5],
          ],
        ],
        output: 3,
      },
      {
        input: [
          5,
          [
            [1, 0],
            [1, 2],
            [3, 2],
            [3, 4],
          ],
        ],
        output: 2,
      },
      {
        input: [
          3,
          [
            [1, 0],
            [2, 0],
          ],
        ],
        output: 0,
      },
    ];

    for (const example of examples) {
      const [n, connections] = example.input;
      const result = minReorder(n, connections);
      console.log(`输入: n = ${n}, connections = ${JSON.stringify(connections)}`);
      console.log(`输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
      console.log('---');
    }
  },
};
