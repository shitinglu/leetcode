/**
 * 1372. 二叉树中的最长交错路径
 * 题目链接: https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/
 *
 * 给你一棵以 root 为根的二叉树，二叉树中的交错路径定义如下：
 * - 选择二叉树中 任意 节点和一个方向（左或者右）。
 * - 如果前进方向为右，那么移动到当前节点的右子节点，否则移动到它的左子节点。
 * - 改变前进方向：左变右或者右变左。
 * - 重复第二步和第三步，直到你在树中无法继续移动。
 *
 * 交错路径的长度定义为：访问过的节点数目 - 1（单个节点的路径长度为 0）。
 *
 * 请你返回给定树中最长交错路径的长度。
 *
 * 示例：
 * 输入：root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]
 * 输出：3
 * 解释：蓝色节点为树中最长交错路径（右 -> 左 -> 右）。
 *
 * 输入：root = [1,1,1,null,1,null,null,1,1,null,1]
 * 输出：4
 * 解释：蓝色节点为树中最长交错路径（左 -> 右 -> 左 -> 右）。
 *
 * 输入：root = [1]
 * 输出：0
 *
 * 提示：
 * - 每棵树最多有 50000 个节点。
 * - 每个节点的值在 [1, 100] 之间。
 */
/**
 * 1372. 二叉树中的最长交错路径
 * 题目链接: https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/
 *
 * 解题思路：
 * 1. 问题本质
 *   - 寻找二叉树中的最长锯齿形路径
 *   - 锯齿形路径指的是交替向左和向右移动的路径
 *   - 路径长度为节点数-1（即边的数量）
 *   - 路径可以从任意节点开始，不一定是从根节点
 *
 * 2. 解决方案
 *   A. DFS深度优先搜索（本解法采用）
 *     - 使用三个参数：当前节点、当前移动方向、当前路径长度
 *     - 使用全局变量记录最大长度
 *     - 每个节点处理两种情况：继续当前锯齿路径 和 开始新的锯齿路径
 *
 *   B. 自底向上的动态规划
 *     - 对每个节点，维护两个值：从该节点出发向左的最长路径和向右的最长路径
 *     - 后序遍历树，自底向上计算每个节点的最长路径
 *
 * 3. 具体执行流程(以DFS为例)：
 *   以示例 [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1] 为例：
 *   - 从根节点1开始，尝试向左和向右两个方向
 *   - 向右走：1→右子节点1→左子节点1→右子节点1，长度为3
 *   - 每个节点访问时，更新全局最大长度
 *   - 当无法继续锯齿移动时（节点为null），结束当前路径
 *
 * 4. 关键点
 *   - 每个节点都需要考虑作为新路径的起点
 *   - 路径必须严格遵循左右交替的规则
 *   - 需要维护全局最大值，不断更新
 *   - 递归时需要改变方向：0(左)→1(右) 或 1(右)→0(左)
 *
 * 5. 复杂度分析
 *   - 时间复杂度：O(n)，其中n是树中节点的数量，每个节点最多被访问常数次
 *   - 空间复杂度：O(h)，其中h是树的高度，递归调用栈的最大深度
 *
 * 6. 方法选择
 *   - DFS方法直观且高效，适合此类问题
 *   - 动态规划方法也是可行的，但代码稍复杂
 *
 * 7. 为什么需要"重新开始新路径"？
 *   - 锯齿路径可以从树中任意节点开始，不一定从根节点开始
 *   - 如果只考虑严格遵循锯齿规则的路径，可能会错过最优解
 *   - 例如：遵循左-右-左路径走到一个节点，如果该节点的左子节点为空，则当前路径无法继续
 *     但该节点的右子节点可能开始一条新的锯齿路径，我们不能忽略这种可能性
 *   - 具体示例：在树 [1,2,3,4,5,null,6] 中
 *     - 如果从节点1开始，按照左-右-左走：1→2→5，但无法继续向左
 *     - 此时，节点5处需要考虑向右开始新路径的可能性
 *   - 这样可以确保我们不会错过任何可能的最长锯齿路径
 */

// 定义二叉树节点类型
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function longestZigZag(root: TreeNode | null): number {
  if (root === null) return 0;

  let maxLength = 0; // 全局最大值

  // dfs(node, direction, length)
  // direction: 0表示向左，1表示向右
  // pathCount: 当前路径长度
  const dfs = (node: TreeNode | null, direction: number, pathCount: number) => {
    if (node === null) return;

    // 更新全局最大值
    maxLength = Math.max(maxLength, pathCount);

    if (direction === 0) {
      dfs(node.left, 1, pathCount + 1);
      // 重新开始新路径
      dfs(node.right, 0, 1);
    } else {
      dfs(node.right, 0, pathCount + 1);
      // 重新开始新路径：向左
      dfs(node.left, 1, 1);
    }
  };

  // 从根节点开始，可以选择向左或向右，初始长度为0
  dfs(root, 0, 0); // 向左的初始路径
  dfs(root, 1, 0); // 向右的初始路径
  // 待实现
  return maxLength;
}

export default {
  run: () => {
    // 构建测试用例树
    const buildTree = (arr: (number | null)[]): TreeNode | null => {
      if (!arr.length) return null;
      const root = new TreeNode(arr[0] as number);
      const queue = [root];
      let i = 1;

      while (queue.length && i < arr.length) {
        const node = queue.shift()!;

        // 左子节点
        if (i < arr.length && arr[i] !== null) {
          node.left = new TreeNode(arr[i] as number);
          queue.push(node.left);
        }
        i++;

        // 右子节点
        if (i < arr.length && arr[i] !== null) {
          node.right = new TreeNode(arr[i] as number);
          queue.push(node.right);
        }
        i++;
      }

      return root;
    };

    const examples = [
      {
        input: [1, null, 1, 1, 1, null, null, 1, 1, null, 1, null, null, null, 1],
        expected: 3,
      },
      {
        input: [1, 1, 1, null, 1, null, null, 1, 1, null, 1],
        expected: 4,
      },
      {
        input: [1],
        expected: 0,
      },
    ];

    for (const example of examples) {
      const tree = buildTree(example.input);
      const result = longestZigZag(tree);
      console.log(`输入: [${example.input}]`);
      console.log(`输出: ${result}`);
      console.log(`期望: ${example.expected}`);
      console.log(`测试结果: ${result === example.expected ? '通过' : '失败'}`);
      console.log('-------------------');
    }
  },
};
