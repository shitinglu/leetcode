/**
 * 199. 二叉树的右视图
 * 题目链接 https://leetcode.cn/problems/binary-tree-right-side-view/
 *
 * 给定一个二叉树的根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 *
 * 示例：
 * 输入: [1,2,3,null,5,null,4]
 * 输出: [1,3,4]
 *
 * 输入: [1,null,3]
 * 输出: [1,3]
 *
 * 输入: []
 * 输出: []
 *
 * 提示：
 * - 二叉树的节点个数的范围是 [0,100]
 * - -100 <= Node.val <= 100
 */

/**
 *
 * 问题理解：
 * - 从二叉树的右侧观察，返回每一层最右边的节点值
 * - 需要按照从顶部到底部的顺序返回
 * - 如果某一层没有节点，则不需要返回该层
 *
 * 解题思路：
 * 1. 问题本质
 * - 需要获取二叉树每一层最右边的节点
 * - 可以通过层序遍历或深度优先搜索实现
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 层序遍历（BFS）
 * - 使用队列进行层序遍历
 * - 记录每一层的节点数量
 * - 将每层最后一个节点加入结果数组
 *
 * B. 深度优先搜索（DFS）
 * - 优先遍历右子树
 * - 使用深度信息记录每层第一个被访问的节点
 * - 当右子树没有节点时，遍历左子树
 *
 * 3. 具体执行流程(以层序遍历为例)：
 * 以 [1,2,3,null,5,null,4] 为例：
 * - 第一层：[1] -> 取1
 * - 第二层：[2,3] -> 取3
 * - 第三层：[5,4] -> 取4
 * - 最终结果：[1,3,4]
 *
 * 4. 关键点
 * - 层序遍历：
 *   - 使用队列存储每层节点
 *   - 通过levelSize控制每层遍历
 *   - 每层最后一个节点即为右视图节点
 *
 * - 深度优先搜索：
 *   - 使用depth参数记录当前深度
 *   - 通过result.length判断是否记录当前节点
 *   - 优先遍历右子树确保获取最右节点
 *
 * 5. 复杂度分析
 * - 层序遍历：
 *   - 时间：O(n)，需要访问所有节点
 *   - 空间：O(n)，队列最大存储n个节点
 *
 * - 深度优先搜索：
 *   - 时间：O(n)，需要访问所有节点
 *   - 空间：O(h)，h为树的高度，递归调用栈的深度
 *
 * 6. 方法选择
 * - 层序遍历更直观，易于理解
 * - 深度优先搜索空间复杂度更优
 * - 两种方法都能正确解决问题，选择取决于具体需求
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

export function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;

      // 如果是当前层的最后一个节点，加入结果
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      // 将子节点加入队列
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

// 你想用深度优先搜索(DFS)的方式，优先遍历右子树，当右子树到达某个深度没有节点时，再遍历左子树。我来帮你实现这个思路：
export function rightSideView2(root: TreeNode | null): number[] {
  const result: number[] = [];

  const dfs = (node: TreeNode | null, depth: number): void => {
    if (!node) return;

    // 如果当前深度还没有记录节点，说明这是这个深度第一个被访问的节点（最右边的）
    if (depth === result.length) {
      result.push(node.val);
    }

    // 优先遍历右子树
    dfs(node.right, depth + 1);
    // 如果右子树没有节点，再遍历左子树
    dfs(node.left, depth + 1);
  };

  dfs(root, 0);
  return result;
}

export default {
  run: () => {
    // 构建测试用例
    const testCases = [
      {
        input: new TreeNode(
          1,
          new TreeNode(2, null, new TreeNode(5)),
          // new TreeNode(3, null, new TreeNode(4)),
          new TreeNode(3, new TreeNode(4), null)
        ),
        output: [1, 3, 4],
      },
      {
        input: new TreeNode(1, null, new TreeNode(3)),
        output: [1, 3],
      },
      {
        input: null,
        output: [],
      },
    ];

    // 运行测试用例
    for (const testCase of testCases) {
      const result = rightSideView(testCase.input);
      console.log(`输入: ${JSON.stringify(testCase.input)}, 输出: [${result}]`);
      console.log(
        `测试结果: ${JSON.stringify(result) === JSON.stringify(testCase.output) ? '通过' : '失败'}`
      );
    }
  },
};
