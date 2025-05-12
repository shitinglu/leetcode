/**
 * 1448. 统计二叉树中好节点的数目
 * 题目链接: https://leetcode.cn/problems/count-good-nodes-in-binary-tree/
 *
 * 给你一棵根为 root 的二叉树，请你返回二叉树中好节点的数目。
 * 「好节点」X 定义为：从根到该节点 X 所经过的节点中，没有任何节点的值大于 X 的值。
 *
 * 示例：
 * https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/16/test_sample_1.png
 * 输入：root = [3,1,4,3,null,1,5]
 * 输出：4
 * 解释：图中蓝色节点为好节点。
 * 根节点 (3) 永远是个好节点。
 * 节点 4 -> (3,4) 是路径中的最大值。
 * 节点 5 -> (3,4,5) 是路径中的最大值。
 * 节点 3 -> (3,1,3) 是路径中的最大值。
 *
 * 输入：root = [3,3,null,4,2]
 * 输出：3
 * 解释：节点 2 -> (3,3,2) 不是好节点，因为 "3" 比它大。
 * https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/16/test_sample_2.png
 * 输入：root = [1]
 * 输出：1
 * 解释：根节点是好节点。
 *
 * 提示：
 * - 二叉树中节点数目范围是 [1, 10^5]
 * - 每个节点权值的范围是 [-10^4, 10^4]
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

export function goodNodes(root: TreeNode | null): number {
  const dfs = (node: TreeNode | null, path_max: number): number => {
    // 如果节点为空，返回0
    if (!node) return 0;

    // 判断当前节点是否是好节点
    // 如果当前节点值大于等于路径最大值，则它是好节点
    let count = node.val >= path_max ? 1 : 0;

    // 更新路径最大值
    const new_max = Math.max(path_max, node.val);

    // 递归处理左右子树，并累加好节点数量
    count += dfs(node.left, new_max);
    count += dfs(node.right, new_max);

    return count;
  };

  // 从根节点开始，初始路径最大值为根节点的值（或负无穷如果根为空）
  return dfs(root, root ? root.val : -Infinity);
}

export default {
  run: () => {
    // 构建示例1: [3,1,4,3,null,1,5]
    const example1 = new TreeNode(3);
    example1.left = new TreeNode(1);
    example1.left.left = new TreeNode(3);
    example1.right = new TreeNode(4);
    example1.right.left = new TreeNode(1);
    example1.right.right = new TreeNode(5);

    // 构建示例2: [3,3,null,4,2]
    const example2 = new TreeNode(3);
    example2.left = new TreeNode(3);
    example2.left.left = new TreeNode(4);
    example2.left.right = new TreeNode(2);

    // 构建示例3: [1]
    const example3 = new TreeNode(1);

    console.log(`示例1结果: ${goodNodes(example1)}, 期望输出: 4`);
    console.log(`示例2结果: ${goodNodes(example2)}, 期望输出: 3`);
    console.log(`示例3结果: ${goodNodes(example3)}, 期望输出: 1`);
  },
};
