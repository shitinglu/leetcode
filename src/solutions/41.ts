/**
 * 450. 删除二叉搜索树中的节点
 * 题目链接: https://leetcode.cn/problems/delete-node-in-a-bst/
 *
 * 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。
 * 返回二叉搜索树（有可能被更新）的根节点的引用。
 *
 * 一般来说，删除节点可分为两个步骤：
 * 1. 首先找到需要删除的节点；
 * 2. 如果找到了，删除它。
 *
 * 示例：
 * 输入：root = [5,3,6,2,4,null,7], key = 3
 * 输出：[5,4,6,2,null,null,7] 或者 [5,2,6,null,4,null,7]
 * 解释：给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
 * 有两个方案：
 * 1. 用 4 填补，变成这样：[5,4,6,2,null,null,7]
 * 2. 用 2 填补，变成这样：[5,2,6,null,4,null,7]
 *
 * 提示：
 * - 节点数的范围 [0, 10^4]
 * - -10^5 <= Node.val <= 10^5
 * - 节点值唯一
 * - root 是合法的二叉搜索树
 * - -10^5 <= key <= 10^5
 */

/**
 * 问题: 450. 删除二叉搜索树中的节点
 * 解题思路:
 *
 * 1. 问题本质
 * - 在二叉搜索树(BST)中找到并删除特定值的节点
 * - 删除操作后必须保持二叉搜索树的性质不变
 * - 需要处理多种删除情况(叶子节点、单子节点、双子节点)
 *
 * 2. 解决方案
 *
 * A. 递归查找并删除节点
 * - 利用BST特性(左<根<右)向下查找目标节点
 * - 根据节点子树情况采取不同删除策略
 * - 通过返回值重建树的连接关系
 *
 * 3. 具体执行流程(以[5,3,6,2,4,null,7], key=3为例):
 * - 从根节点5开始，3<5，递归左子树
 * - 找到节点3，发现有两个子节点(2和4)
 * - 找到3的后继节点(右子树中最小值)：4
 * - 用4的值替换3的值(节点3实际上变成了值为4的节点)
 * - 递归删除原来值为4的节点(此时已变成冗余节点)
 * - 最终得到新树[5,4,6,2,null,null,7]
 *
 * 4. 关键点
 * - 删除后继节点的理解：
 *   为什么需要删除后继节点？因为我们用后继节点的值替换了当前节点，
 *   此时树中存在两个相同值的节点，必须删除原来的后继节点以保持BST特性。
 *   这相当于"偷天换日"：不直接删除复杂的双子节点，而是把简单情况的
 *   后继节点的值复制过来，然后去删除那个后继节点。
 *
 *   root.right = deleteNode(root.right, successor.val) 的含义是：
 *   在右子树中删除后继节点，并将新的右子树重新连接到当前节点。
 *   由于后继节点是右子树中的最小节点，它最多只有一个右子节点(没有左子节点)，
 *   所以删除它相对简单。
 *
 * - 递归函数返回值的处理：
 *   每次递归都返回更新后的(子)树根节点，用于重建树的连接关系
 *
 * - 节点值替换而非节点替换：
 *   对于双子节点，我们替换值而非替换整个节点结构，这大大简化了操作
 *
 * 5. 复杂度分析
 * - 时间复杂度: O(h)，h为树的高度，平均情况下为O(log n)，最坏情况下为O(n)
 * - 空间复杂度: O(h)，递归调用栈的深度
 *
 * 6. 方法选择
 * - 递归方法实现简洁，逻辑清晰
 * - 也可以用迭代方法实现，但需要额外记录父节点信息
 */

// 定义二叉树节点类型
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
// 辅助函数：找到树中的最小值节点
function findMin(node: TreeNode): TreeNode {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
}

export function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (root === null) return null;

  // 如果key小于当前节点值，在左子树中删除
  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  }
  // 如果key大于当前节点值，在右子树中删除
  else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  }
  // 找到了要删除的节点
  else {
    // 情况1: 叶子节点，直接删除
    if (!root.left && !root.right) {
      return null;
    }

    // 情况2: 只有一个子节点，用子节点替代当前节点
    if (!root.left) {
      return root.right;
    }
    if (!root.right) {
      return root.left;
    }

    // 情况3: 有两个子节点
    // 找到右子树中的最小节点(中序后继)
    const successor = findMin(root.right);
    // 用后继节点的值替换当前节点的值
    root.val = successor.val;
    // 在右子树中删除这个后继节点
    root.right = deleteNode(root.right, successor.val);
  }

  return root;
}

// 工具函数：将数组转换为二叉树
function arrayToTree(arr: (number | null)[]): TreeNode | null {
  if (!arr.length || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
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
}

// 工具函数：将二叉树转换为数组（层序遍历）
function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) return [];

  const result: (number | null)[] = [];
  const queue = [root];

  while (queue.length) {
    const node: TreeNode | null = queue.shift()!;

    if (node === null) {
      result.push(null);
    } else {
      result.push(node.val);
      queue.push(node.left!);
      queue.push(node.right!);
    }
  }

  // 移除末尾的null
  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

// 工具函数：检查两个二叉树是否等价
function isEquivalentBST(a: TreeNode | null, b: TreeNode | null): boolean {
  // 两个BST可能结构不同但仍是有效的解
  // 这里使用中序遍历比较（BST的中序遍历是有序数组）
  const inorder = (root: TreeNode | null, result: number[] = []): number[] => {
    if (!root) return result;
    inorder(root.left, result);
    result.push(root.val);
    inorder(root.right, result);
    return result;
  };

  return JSON.stringify(inorder(a)) === JSON.stringify(inorder(b));
}

export default {
  run: () => {
    const examples = [
      {
        input: {
          root: [5, 3, 6, 2, 4, null, 7],
          key: 3,
        },
        possibleOutputs: [
          [5, 4, 6, 2, null, null, 7],
          [5, 2, 6, null, 4, null, 7],
        ],
      },
      {
        input: {
          root: [5, 3, 6, 2, 4, null, 7],
          key: 0,
        },
        possibleOutputs: [[5, 3, 6, 2, 4, null, 7]],
      },
      {
        input: {
          root: [],
          key: 0,
        },
        possibleOutputs: [[]],
      },
    ];

    for (const example of examples) {
      const { root, key } = example.input;
      const inputTree = arrayToTree(root);
      const result = deleteNode(inputTree, key);
      const resultArray = treeToArray(result);

      console.log(`输入: root = [${root}], key = ${key}`);
      console.log(`输出: [${resultArray}]`);

      // 检查结果是否为可能的输出之一
      const isValid = example.possibleOutputs.some(possibleOutput => {
        const expectedTree = arrayToTree(possibleOutput);
        return isEquivalentBST(result, expectedTree);
      });

      console.log(`测试结果: ${isValid ? '通过' : '失败'}`);
      console.log('-----------------');
    }
  },
};
