/**
 * 841. 钥匙和房间
 * 题目链接: https://leetcode.cn/problems/keys-and-rooms/
 *
 * 有 n 个房间，房间按从 0 到 n-1 编号。最初，除 0 号房间外的其余所有房间都被锁住。
 * 你的目标是进入所有的房间。然而，你不能在没有获得钥匙的时候进入锁住的房间。
 *
 * 当你进入一个房间，你可能会在里面找到一套不同的钥匙，每把钥匙上都有对应的房间号，
 * 即表示你可以使用这把钥匙打开编号对应的房间。
 *
 * 你可以拿上所有钥匙去解锁其他房间。
 * 给你一个数组 rooms 其中 rooms[i] 是你进入 i 号房间可以获得的钥匙集合。
 * 如果能进入所有房间返回 true，否则返回 false。
 *
 * 示例：
 * 输入：rooms = [[1],[2],[3],[]]
 * 输出：true
 * 解释：
 * 我们从 0 号房间开始，拿到钥匙 1。
 * 之后我们去 1 号房间，拿到钥匙 2。
 * 然后我们去 2 号房间，拿到钥匙 3。
 * 最后我们去了 3 号房间。
 * 由于我们能够进入每个房间，我们返回 true。
 *
 * 输入：rooms = [[1,3],[3,0,1],[2],[0]]
 * 输出：false
 * 解释：我们不能进入 2 号房间。
 *
 * 提示：
 * - n == rooms.length
 * - 2 <= n <= 1000
 * - 0 <= rooms[i].length <= 1000
 * - 1 <= sum(rooms[i].length) <= 3000
 * - 0 <= rooms[i][j] < n
 * - 所有 rooms[i] 的值互不相同
 */

/**
 * 841. 钥匙和房间
 * 题目链接: https://leetcode.cn/problems/keys-and-rooms/
 *
 * 解题思路：
 * 1. 问题本质
 * - 本质上是一个图的可达性问题
 * - 每个房间是图中的一个节点
 * - 房间中的钥匙代表从该节点可以到达的其他节点
 * - 问题转化为：从节点0出发，是否能到达所有节点
 *
 * 2. 解决方案
 * A. 深度优先搜索(DFS)
 * - 从房间0开始，递归地访问所有能到达的房间
 * - 使用集合记录已访问的房间，避免重复访问
 * - 最后检查已访问的房间数是否等于总房间数
 *
 * B. 广度优先搜索(BFS)
 * - 使用队列从房间0开始，逐层访问相邻房间
 * - 同样使用集合记录已访问房间
 * - 检查最终访问房间数是否等于总房间数
 *
 * 3. 具体执行流程(以DFS为例)
 * 以 rooms = [[1],[2],[3],[]] 为例：
 * - 访问房间0，标记已访问，获得钥匙[1]
 * - 递归访问房间1，标记已访问，获得钥匙[2]
 * - 递归访问房间2，标记已访问，获得钥匙[3]
 * - 递归访问房间3，标记已访问，没有钥匙
 * - 所有递归结束，visited = {0,1,2,3}，总房间数也是4，返回true
 *
 * 4. 关键点
 * - 使用Set作为visited集合，避免重复访问同一房间
 * - DFS可用递归实现，也可用栈实现
 * - BFS需要使用队列进行层次遍历
 * - 返回条件是visited.size === rooms.length
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n + e)，其中n是房间数量，e是所有钥匙的总数
 *   - 每个房间最多被访问一次
 *   - 每把钥匙最多被处理一次
 * - 空间复杂度：O(n)
 *   - visited集合最大为n
 *   - 递归调用栈或队列最大为n
 *
 * 6. 方法选择
 * - 本题DFS和BFS都适用，复杂度相同
 * - DFS递归实现更简洁
 * - 如果考虑最短路径问题，BFS会更合适
 * - 如果担心递归栈溢出，可选择BFS或非递归DFS
 */
export function canVisitAllRooms(rooms: number[][]): boolean {
  let visited: Set<number> = new Set<number>(); // 记录已访问的房间

  let n = rooms.length;

  const dfs = (roomId: number) => {
    visited.add(roomId);

    for (const key of rooms[roomId]) {
      if (!visited.has(key)) {
        dfs(key);
      }
    }
  };
  // 从房间0开始搜索
  dfs(0);

  return visited.size === n;
}

export default {
  run: () => {
    const examples = [
      {
        input: [[1], [2], [3], []],
        output: true,
      },
      {
        input: [[1, 3], [3, 0, 1], [2], [0]],
        output: false,
      },
    ];

    for (const example of examples) {
      const result = canVisitAllRooms(example.input);
      console.log(`输入: rooms = ${JSON.stringify(example.input)}, 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
