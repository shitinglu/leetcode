/**
 * 399. 除法求值
 * 题目链接: https://leetcode.cn/problems/evaluate-division/
 *
 * 给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 equations[i] = [Ai, Bi] 和 values[i] 共同表示等式 Ai / Bi = values[i] 。
 * 每个 Ai 或 Bi 是一个表示单个变量的字符串。
 *
 * 另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj = ? 的结果作为答案。
 *
 * 返回 所有问题的答案。如果存在某个无法确定的答案，则用 -1.0 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 -1.0 替代这个答案。
 *
 * 注意：输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。
 *
 * 示例 1：
 * 输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
 * 输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
 * 解释：
 * 条件：a / b = 2.0, b / c = 3.0
 * 问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
 * 结果：[6.0, 0.5, -1.0, 1.0, -1.0]
 *
 * 示例 2：
 * 输入：equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
 * 输出：[3.75000,0.40000,5.00000,0.20000]
 *
 * 示例 3：
 * 输入：equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
 * 输出：[0.50000,2.00000,-1.00000,-1.00000]
 *
 * 提示：
 * 1 <= equations.length <= 20
 * equations[i].length == 2
 * 1 <= Ai.length, Bi.length <= 5
 * values.length == equations.length
 * 0.0 < values[i] <= 20.0
 * 1 <= queries.length <= 20
 * queries[i].length == 2
 * 1 <= Cj.length, Dj.length <= 5
 * Ai, Bi, Cj, Dj 由小写英文字母与数字组成
 */

export function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  // 构建图
  const graph = new Map<string, Map<string, number>>();

  // 初始化图
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const value = values[i];

    // 添加正向边 a -> b
    if (!graph.has(a)) {
      graph.set(a, new Map());
    }
    graph.get(a)!.set(b, value);

    // 添加反向边 b -> a
    if (!graph.has(b)) {
      graph.set(b, new Map());
    }
    graph.get(b)!.set(a, 1 / value);
  }

  // 处理查询
  return queries.map(([start, end]) => {
    // 如果起点或终点不在图中，返回-1
    if (!graph.has(start) || !graph.has(end)) {
      return -1.0;
    }

    // 如果起点和终点相同，返回1
    if (start === end) {
      return 1.0;
    }

    // BFS搜索
    const queue: [string, number][] = [[start, 1.0]];
    const visited = new Set<string>([start]);

    while (queue.length > 0) {
      const [current, value] = queue.shift()!;

      // 遍历当前节点的所有邻居
      for (const [neighbor, weight] of graph.get(current)!) {
        if (neighbor === end) {
          return value * weight;
        }

        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, value * weight]);
        }
      }
    }

    return -1.0;
  });
}

export default {
  run: () => {
    const examples = [
      {
        equations: [
          ['a', 'b'],
          ['b', 'c'],
        ],
        values: [2.0, 3.0],
        queries: [
          ['a', 'c'],
          ['b', 'a'],
          ['a', 'e'],
          ['a', 'a'],
          ['x', 'x'],
        ],
        output: [6.0, 0.5, -1.0, 1.0, -1.0],
      },
      // {
      //   equations: [
      //     ['a', 'b'],
      //     ['b', 'c'],
      //     ['bc', 'cd'],
      //   ],
      //   values: [1.5, 2.5, 5.0],
      //   queries: [
      //     ['a', 'c'],
      //     ['c', 'b'],
      //     ['bc', 'cd'],
      //     ['cd', 'bc'],
      //   ],
      //   output: [3.75, 0.4, 5.0, 0.2],
      // },
      // {
      //   equations: [['a', 'b']],
      //   values: [0.5],
      //   queries: [
      //     ['a', 'b'],
      //     ['b', 'a'],
      //     ['a', 'c'],
      //     ['x', 'y'],
      //   ],
      //   output: [0.5, 2.0, -1.0, -1.0],
      // },
    ];

    for (const example of examples) {
      const result = calcEquation(example.equations, example.values, example.queries);
      console.log(
        `输入: equations = ${JSON.stringify(example.equations)}, values = ${JSON.stringify(example.values)}, queries = ${JSON.stringify(example.queries)}`
      );
      console.log(`输出: ${JSON.stringify(result)}`);
      console.log(
        `测试结果: ${JSON.stringify(result) === JSON.stringify(example.output) ? '通过' : '失败'}`
      );
    }
  },
};
