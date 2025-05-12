/**
 * 236. 二叉树的最近公共祖先
 * 题目链接: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/
 *
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 *
 * 百度百科中最近公共祖先的定义为："对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，
 * 满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。"
 *
 * 示例 1：
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * 输出：3
 * 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
 *
 * 示例 2：
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * 输出：5
 * 解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
 *
 * 示例 3：
 * 输入：root = [1,2], p = 1, q = 2
 * 输出：1
 *
 * 提示：
 * - 树中节点数目在范围 [2, 10^5] 内。
 * - -10^9 <= Node.val <= 10^9
 * - 所有 Node.val 互不相同。
 * - p != q
 * - p 和 q 均存在于给定的二叉树中。
 */

/**
 * 解题思路：
 * 1. 问题本质
 * - 在二叉树中找到两个节点的最近公共祖先
 * - 最近公共祖先是指同时是这两个节点的祖先，且深度最大的节点
 * - 一个节点可以是它自己的祖先
 *
 * 2. 解决方案（递归法）
 * - 从根节点开始遍历
 * - 如果当前节点是p或q中的一个，则返回当前节点
 * - 如果当前节点的左子树和右子树分别包含p和q，则当前节点就是最近公共祖先
 * - 如果只有左子树或右子树包含p和q，则返回该子树的结果
 *
 * 3. 具体执行流程(以示例1为例)：
 * 以 root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1 为例：
 * - 从根节点3开始
 * - 遍历左子树，找到节点5，返回5
 * - 遍历右子树，找到节点1，返回1
 * - 因为左右子树都返回非null，所以返回当前节点3
 *
 * 4. 关键点
 * - 递归终止条件：当节点为空或等于p或q时返回
 * - 递归逻辑：分别递归左子树和右子树，根据返回值判断最近公共祖先
 * - 时间复杂度：O(N)，其中N是树中节点数
 * - 空间复杂度：O(H)，其中H是树的高度，最坏情况下为O(N)
 *
 * 5. 关于递归遍历的疑问
 * - 问题：递归会遍历完所有的节点吗？
 * - 回答：不会。因为函数中有一个提前返回的机制，当找到p或q节点时，函数会立即返回该节点
 * - 这意味着一旦在某个子树中找到p或q，就不会继续遍历该子树的其他分支
 * - 在最坏情况下（p和q分别位于树的最左和最右叶子节点），函数会遍历所有节点
 * - 但通常情况下，函数会在找到p和q后提前返回，不会遍历所有节点
 * - 这种提前返回的机制是算法的一个优化，使得函数在最坏情况下时间复杂度为O(N)，但在平均情况下会更快
 */

// 定义二叉树节点
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

export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (root === null || root === p || root === q) {
    return root;
  }

  // 递归查找左子树和右子树
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 如果左右子树都找到了结果，说明当前节点是最近公共祖先
  if (left !== null && right !== null) {
    return root;
  }

  // 如果只有左子树找到了结果，返回左子树的结果
  if (left !== null) {
    return left;
  }

  // 如果只有右子树找到了结果，返回右子树的结果
  return right;
}

export default {
  run: () => {
    // 构建示例树 [3,5,1,6,2,0,8,null,null,7,4]
    const tree1 = new TreeNode(3);
    tree1.left = new TreeNode(5);
    tree1.right = new TreeNode(1);
    tree1.left.left = new TreeNode(6);
    tree1.left.right = new TreeNode(2);
    tree1.right.left = new TreeNode(0);
    tree1.right.right = new TreeNode(8);
    tree1.left.right.left = new TreeNode(7);
    tree1.left.right.right = new TreeNode(4);

    // 示例1
    const p1 = tree1.left; // 节点5
    const q1 = tree1.right; // 节点1
    const result1 = lowestCommonAncestor(tree1, p1, q1);
    console.log(`示例1结果:${result1?.val}  ${result1?.val === 3}`); // 应该输出3

    // 示例2
    const p2 = tree1.left; // 节点5
    const q2 = tree1.left.right.right; // 节点4
    const result2 = lowestCommonAncestor(tree1, p2, q2);
    console.log(`示例2结果:${result2?.val} ${result2?.val === 5}`); // 应该输出5

    // 示例3
    const tree3 = new TreeNode(1);
    tree3.left = new TreeNode(2);
    const p3 = tree3; // 节点1
    const q3 = tree3.left; // 节点2
    const result3 = lowestCommonAncestor(tree3, p3, q3);
    console.log(`示例3结果: ${result3?.val} ${result3?.val === 1}`); // 应该输出1
  },
};
