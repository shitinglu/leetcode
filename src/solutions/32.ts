/**
 * 104. 二叉树的最大深度
 * 题目链接: https://leetcode.cn/problems/maximum-depth-of-binary-tree/
 *
 * 给定一个二叉树，找出其最大深度。
 *
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例：
 * 输入：[3,9,20,null,null,15,7]
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 输出：3
 *
 * 提示：
 * - 树中节点的数量范围：[0, 10^4]
 * - -100 <= Node.val <= 100
 */

/**
 * 104. 二叉树的最大深度
 * 题目链接: https://leetcode.cn/problems/maximum-depth-of-binary-tree/
 *
 * 给定一个二叉树，找出其最大深度。
 *
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例：
 * 输入：[3,9,20,null,null,15,7]
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 输出：3
 *
 * 提示：
 * - 树中节点的数量范围：[0, 10^4]
 * - -100 <= Node.val <= 100
 *
 * 解题思路：
 * 1. 问题本质
 * - 计算二叉树从根节点到最远叶子节点的路径长度
 * - 节点数量即为深度，包括根节点和叶子节点
 * - 实质是树的高度计算问题
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 递归法（DFS）
 * - 基本思想：树的最大深度 = max(左子树深度, 右子树深度) + 1
 * - 通过后序遍历计算深度，自底向上返回结果
 * - 空节点的深度为0
 *
 * B. 迭代法（BFS）
 * - 使用层序遍历，记录层数
 * - 每遍历完一层，深度加1
 * - 队列为空时，返回记录的最大深度
 *
 * 3. 具体执行流程(以递归法为例)：
 * 以 [3,9,20,null,null,15,7] 为例：
 * - maxDepth(3) 调用：
 *   - 计算左子树: maxDepth(9) = 1（叶子节点）
 *   - 计算右子树: maxDepth(20)
 *     - 计算左子树: maxDepth(15) = 1（叶子节点）
 *     - 计算右子树: maxDepth(7) = 1（叶子节点）
 *     - 返回: max(1,1) + 1 = 2
 *   - 返回: max(1,2) + 1 = 3
 *
 * 4. 关键点
 * - 使用递归能简洁地解决问题
 * - 树的深度计算公式：max(左子树深度, 右子树深度) + 1
 * - 递归边界：节点为null时返回0
 * - 不需要关注节点值，只关注结构
 *
 * 5. 复杂度分析
 * - 递归法：
 *   - 时间复杂度：O(n)，每个节点只访问一次
 *   - 空间复杂度：O(h)，h为树高，最坏情况下O(n)
 *
 * - 迭代法(BFS)：
 *   - 时间复杂度：O(n)，每个节点只入队一次
 *   - 空间复杂度：O(w)，w为树最大宽度，最坏情况下O(n/2)
 *
 * 6. 方法选择
 * - 递归法代码简洁直观，实现容易
 * - BFS法在处理特别深的树时可能更节省栈空间
 * - 本题递归法更为合适，直接对应问题定义
 */

// 定义TreeNode类型
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

export function maxDepth(root: TreeNode | null): number {
  const getMaxDepth = (node: TreeNode | null): number => {
    // 递归边界，root 为空
    if (!node) {
      return 0;
    }
    // 使用递归求解左右子树的最大深度，然后取较大值+1
    const leftDepth = getMaxDepth(node.left);

    const rightDepth = getMaxDepth(node.right);
    // 当前节点的最大深度 = max(左子树深度, 右子树深度) + 1
    return Math.max(leftDepth, rightDepth) + 1;
  };

  // 实现逻辑
  return getMaxDepth(root);
}

export default {
  run: () => {
    // 示例1
    const tree1 = new TreeNode(3);
    tree1.left = new TreeNode(9);
    tree1.right = new TreeNode(20);
    tree1.right.left = new TreeNode(15);
    tree1.right.right = new TreeNode(7);

    // 示例2 - 单节点树
    const tree2 = new TreeNode(1);

    // 示例3 - 空树
    const tree3 = null;

    // 示例4 - 线性树
    const tree4 = new TreeNode(1);
    tree4.right = new TreeNode(2);
    tree4.right.right = new TreeNode(3);
    tree4.right.right.right = new TreeNode(4);

    console.log(`示例1: 输入:[3,9,20,null,null,15,7], 输出:${maxDepth(tree1)}, 预期:3`);
    console.log(`示例2: 输入:[1], 输出:${maxDepth(tree2)}, 预期:1`);
    console.log(`示例3: 输入:[], 输出:${maxDepth(tree3)}, 预期:0`);
    console.log(`示例4: 输入:[1,null,2,null,3,null,4], 输出:${maxDepth(tree4)}, 预期:4`);
  },
};
