/**
 * 1161. 二叉树的最大层内元素和
 * 题目链接 https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/
 *
 * 给你一个二叉树的根节点 root。设根节点位于二叉树的第 1 层，而根节点的子节点位于第 2 层，依此类推。
 *
 * 请返回层内元素之和 最大 的那一层的层号（从 1 开始）。如果存在多个层号满足条件，返回最小的层号。
 *
 * 示例：
 * 输入：root = [1,7,0,7,-8,null,null]
 * 输出：2
 * 解释：
 * 第 1 层各元素之和为 1，
 * 第 2 层各元素之和为 7 + 0 = 7，
 * 第 3 层各元素之和为 7 + (-8) = -1，
 * 所以我们返回第 2 层的层号，它的层内元素之和最大。
 *
 * 输入：root = [989,null,10250,98693,-89388,null,null,null,-32127]
 * 输出：2
 *
 * 提示：
 * - 树中的节点数在 [1, 10^4]范围内
 * - -10^5 <= Node.val <= 10^5
 */

/**
 * 1161. 二叉树的最大层内元素和
 * 题目链接 https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/
 *
 * 解题思路：
 * 1. 问题本质
 * - 需要找出二叉树中哪一层的节点值之和最大
 * - 如果多层具有相同的最大和，返回层号最小的那一层
 * - 层号从1开始计数（根节点为第1层）
 *
 * 2. 解决方案
 * A. 广度优先搜索(BFS)
 * - 使用队列按层遍历二叉树的所有节点
 * - 记录每一层的节点值之和
 * - 跟踪最大和及其对应的层号
 *
 * B. 深度优先搜索(DFS)
 * - 使用哈希表或数组记录每一层的节点值之和
 * - 递归遍历整棵树，将节点值添加到对应层的和中
 * - 找出具有最大和的层
 *
 * 3. 具体执行流程(以BFS为例)：
 * 以示例 [1,7,0,7,-8,null,null] 为例：
 * - 初始化：maxLevel=1, maxTotal=-Infinity, queue=[root(1)]
 * - 第1层：
 *   - 当前层节点：[1]
 *   - 当前层之和：1
 *   - 更新maxTotal=1, maxLevel=1
 *   - 队列更新为：[7,0]
 * - 第2层：
 *   - 当前层节点：[7,0]
 *   - 当前层之和：7+0=7
 *   - 更新maxTotal=7, maxLevel=2
 *   - 队列更新为：[7,-8]
 * - 第3层：
 *   - 当前层节点：[7,-8]
 *   - 当前层之和：7+(-8)=-1
 *   - maxTotal仍为7，maxLevel仍为2
 *   - 队列为空，结束遍历
 * - 返回maxLevel=2
 *
 * 4. 关键点
 * - 使用队列实现逐层遍历是BFS的标准做法
 * - 需要记录当前处理的层号(level)
 * - 初始化maxTotal为负无穷大，因为节点值可能为负
 * - 使用当前层的长度(levelSize)来确保一次处理完整一层
 * - 如果有多层和相等，保留较小的层号
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n)，其中n是树中的节点数量，每个节点只访问一次
 * - 空间复杂度：O(w)，其中w是树的最大宽度，即队列中存储的最大节点数量
 *
 * 6. 方法选择
 * - BFS在这个问题中更直观，因为我们需要按层处理节点
 * - DFS也可以解决，但需要额外的数据结构记录每层的和
 * - BFS的实现更简洁，不需要递归，逻辑更清晰
 */

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function maxLevelSum(root: TreeNode | null): number {
  if (!root) return 0;
  let maxLevel = 1;
  let level = 0;
  let maxTotal = -Infinity;

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    level++;
    let total = 0;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;

      total += node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (total > maxTotal) {
      maxLevel = level;
      maxTotal = total;
    }
  }
  return maxLevel;
}

export default {
  run: () => {
    // 示例1
    const root1 = new TreeNode(1);
    root1.left = new TreeNode(7);
    root1.right = new TreeNode(0);
    root1.left.left = new TreeNode(7);
    root1.left.right = new TreeNode(-8);

    // 示例2
    const root2 = new TreeNode(989);
    root2.right = new TreeNode(10250);
    root2.right.left = new TreeNode(98693);
    root2.right.right = new TreeNode(-89388);
    root2.right.right.right = new TreeNode(-32127);

    console.log(`示例1结果: ${maxLevelSum(root1)}`); // 应输出: 2
    console.log(`示例2结果: ${maxLevelSum(root2)}`); // 应输出: 2
  },
};
