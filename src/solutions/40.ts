/**
 * 700. 二叉搜索树中的搜索
 * 题目链接 https://leetcode.cn/problems/search-in-a-binary-search-tree/
 *
 * 给定二叉搜索树（BST）的根节点 root 和一个整数值 val。
 * 你需要在BST中找到节点值等于 val 的节点。 返回以该节点为根的子树。如果节点不存在，则返回 null。
 *
 * 示例：
 * 输入：root = [4,2,7,1,3], val = 2
 * 输出：[2,1,3]
 *
 * 输入：root = [4,2,7,1,3], val = 5
 * 输出：[]
 *
 * 提示：
 * - 树中节点数在 [1, 5000] 范围内
 * - 1 <= Node.val <= 10^7
 * - root 是二叉搜索树
 * - 1 <= val <= 10^7
 */

// 二叉树节点定义
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

export function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) return null;

  const dsf = (node: TreeNode | null): TreeNode | null => {
    if (node === null) return null;

    if (node.val === val) {
      return node;
    }
    // 接收递归调用的返回值，所以找到目标节点后无法返回
    // 利用二叉搜索树的特性进行搜索优化
    const leftResult: TreeNode | null = dsf(node.left);
    if (leftResult) return leftResult;

    const rightResult: TreeNode | null = dsf(node.right);
    if (rightResult) return rightResult;

    // 如果左右子树都没找到
    return null;
  };

  return dsf(root);
}

// 根据数组创建二叉树
function createTree(arr: (number | null)[]): TreeNode | null {
  if (!arr.length || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: (TreeNode | null)[] = [root];
  let i = 1;

  while (i < arr.length) {
    const node = queue.shift();
    if (node) {
      // 左子节点
      if (i < arr.length) {
        if (arr[i] !== null) {
          node.left = new TreeNode(arr[i] as number);
        }
        queue.push(node.left);
        i++;
      }

      // 右子节点
      if (i < arr.length) {
        if (arr[i] !== null) {
          node.right = new TreeNode(arr[i] as number);
        }
        queue.push(node.right);
        i++;
      }
    }
  }

  return root;
}

// 将二叉树转换为数组形式（用于输出）
function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) return [];

  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // 移除末尾的null
  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

export default {
  run: () => {
    const examples = [
      {
        root: [4, 2, 7, 1, 3],
        val: 2,
        output: [2, 1, 3],
      },
      {
        root: [4, 2, 7, 1, 3],
        val: 5,
        output: [],
      },
    ];

    for (const example of examples) {
      const root = createTree(example.root);
      const result = searchBST(root, example.val);
      const resultArray = treeToArray(result);

      console.log(`输入: root = [${example.root}], val = ${example.val}`);
      console.log(`输出: [${resultArray}]`);
      console.log(
        `测试结果: ${JSON.stringify(resultArray) === JSON.stringify(example.output) ? '通过' : '失败'}`
      );
      console.log('---');
    }
  },
};
