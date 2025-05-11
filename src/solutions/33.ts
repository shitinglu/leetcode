/**
 * 872. 叶子相似的树
 * 题目链接 https://leetcode.cn/problems/leaf-similar-trees/
 *
 * 请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个叶值序列。
 *
 * 如果有两棵二叉树的叶值序列是相同，那么我们就认为它们是叶相似的。
 *
 * 如果给定的两个根结点分别为root1 和root2的树是叶相似的，则返回true；否则返回false。
 *
 * 示例：
 * 输入：root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
 * 输出：true
 *
 * 输入：root1 = [1,2,3], root2 = [1,3,2]
 * 输出：false
 *
 * 提示：
 * - 给定的两棵树结点数在 [1, 200] 范围内
 * - 给定的两棵树上的值在 [0, 200] 范围内
 */

/**
 *
 * 解题思路：
 * 1. 问题本质
 * - 需要比较两棵二叉树的叶子节点值序列是否完全相同
 * - 叶子节点是指没有子节点的节点
 * - 叶值序列是按照从左到右的顺序排列的叶子节点值
 *
 * 2. 解决方案
 * - 遍历两棵树，分别收集它们的叶子节点值
 * - 比较两个叶子节点值序列是否相同
 *
 * 3. 具体执行流程
 * - 使用深度优先搜索(DFS)遍历二叉树
 * - 当遇到叶子节点时，将其值添加到结果数组中
 * - 对两棵树分别执行上述操作，得到两个叶值序列
 * - 比较两个序列是否完全相同
 *
 * 4. 关键点
 * - 使用递归或迭代方式遍历二叉树
 * - 正确识别叶子节点（左右子节点都为null）
 * - 按照从左到右的顺序收集叶子节点值
 * - 比较两个数组是否完全相同
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n)，其中n是两棵树中节点数的总和
 * - 空间复杂度：O(h)，其中h是树的高度，最坏情况下为O(n)
 *
 * 6. 方法选择
 * - 使用深度优先搜索(DFS)是最直观的方法
 * - 也可以使用广度优先搜索(BFS)，但需要额外处理层序遍历
 * - 对于数组比较，可以使用JSON.stringify或循环比较
 */

// 二叉树节点定义
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

export function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const getLeafValues = (node: TreeNode | null, arr: number[] = []): number[] => {
    if (node === null) return arr;

    if (node.left === null && node.right === null) {
      arr.push(node.val);
    }
    getLeafValues(node.left, arr);
    getLeafValues(node.right, arr);

    return arr;
  };

  const leaves1 = getLeafValues(root1);

  const leaves2 = getLeafValues(root2);

  // 使用JSON.stringify比较
  return JSON.stringify(leaves1) === JSON.stringify(leaves2);
}

export default {
  run: () => {
    // 创建第一棵树 [3,5,1,6,2,9,8,null,null,7,4]
    const tree1 = new TreeNode(3);
    tree1.left = new TreeNode(5);
    tree1.right = new TreeNode(1);
    tree1.left.left = new TreeNode(6);
    tree1.left.right = new TreeNode(2);
    tree1.right.left = new TreeNode(9);
    tree1.right.right = new TreeNode(8);
    tree1.left.right.left = new TreeNode(7);
    tree1.left.right.right = new TreeNode(4);

    // 创建第二棵树 [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
    const tree2 = new TreeNode(3);
    tree2.left = new TreeNode(5);
    tree2.right = new TreeNode(1);
    tree2.left.left = new TreeNode(6);
    tree2.left.right = new TreeNode(7);
    tree2.right.left = new TreeNode(4);
    tree2.right.right = new TreeNode(2);
    tree2.right.right.left = new TreeNode(9);
    tree2.right.right.right = new TreeNode(8);

    // 创建第三棵树 [1,2,3]
    const tree3 = new TreeNode(1);
    tree3.left = new TreeNode(2);
    tree3.right = new TreeNode(3);

    // 创建第四棵树 [1,3,2]
    const tree4 = new TreeNode(1);
    tree4.left = new TreeNode(3);
    tree4.right = new TreeNode(2);

    // 测试用例
    console.log(`测试用例1: ${leafSimilar(tree1, tree2)}`); // 应该输出: true
    console.log(`测试用例2: ${leafSimilar(tree3, tree4)}`); // 应该输出: false
  },
};
