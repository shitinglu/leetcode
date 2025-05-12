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

// Definition for a binary tree node.
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
  // TODO: 实现解题函数
  return 0;
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
