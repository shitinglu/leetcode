/**
 * 437. 路径总和 III
 * 题目链接 https://leetcode.cn/problems/path-sum-iii/
 *
 * 给定一个二叉树的根节点 root 和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
 *
 * 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 *
 * 示例：
 * 输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
 * 输出：3
 * 解释：和等于 8 的路径有 3 条，如图所示。
 *
 * 提示：
 * - 二叉树的节点个数的范围是 [0, 1000]
 * - -10^9 <= Node.val <= 10^9
 * - -1000 <= targetSum <= 1000
 */

/**
 * 问题: 437. 路径总和 III
 * 解题思路：
 * 1. 问题本质
 *    - 在二叉树中找出节点值之和等于目标值的所有路径数量
 *    - 路径必须是从上到下(父节点到子节点)的连续节点
 *    - 路径可以从任意节点开始，不必从根开始或在叶节点结束
 *
 * 2. 解决方案（两种主要方法）
 *
 *    A. 双重DFS法
 *    - 外层DFS遍历每个节点，将其作为潜在路径的起点
 *    - 内层DFS从该起点开始，寻找所有满足条件的路径
 *    - 时间复杂度为O(n²)，因为每个节点都可能成为起点，且每个起点都要遍历其所有子节点
 *
 *    B. 前缀和 + DFS法（优化）
 *    - 使用前缀和的概念，记录从根到当前节点路径上的所有前缀和
 *    - 如果存在前缀和current_sum - target_sum，说明存在一段路径和为target_sum
 *    - 用哈希表记录前缀和出现次数，实现O(1)查找
 *    - 时间复杂度降低到O(n)
 *
 * 3. 具体执行流程:
 *
 *    以 [10,5,-3,3,2,null,11] 和 targetSum = 8 为例：
 *
 *    - 双重DFS法执行流程:
 *      · 以节点10为起点：
 *        - 检查10自身: 10 != 8，不计数
 *        - 检查10->5: 10+5=15 != 8，不计数
 *        - 检查10->-3: 10+(-3)=7 != 8，不计数
 *        - ... 继续递归检查其他路径
 *      · 以节点5为起点：
 *        - 检查5自身: 5 != 8，不计数
 *        - 检查5->3: 5+3=8 == 8，计数+1 (找到第一条路径)
 *        - ... 继续递归检查其他路径
 *      · 以此类推检查每个节点...
 *
 *    - 前缀和法执行流程:
 *      · 初始：prefixSumCount={0:1}, count=0, currentSum=0
 *      · 访问节点10：currentSum=10
 *        - 检查prefixSumCount[10-8]=prefixSumCount[2]=0，无匹配
 *        - 更新prefixSumCount={0:1, 10:1}
 *      · 访问节点5：currentSum=15
 *        - 检查prefixSumCount[15-8]=prefixSumCount[7]=0，无匹配
 *        - 更新prefixSumCount={0:1, 10:1, 15:1}
 *      · 访问节点3：currentSum=18
 *        - 检查prefixSumCount[18-8]=prefixSumCount[10]=1，找到匹配
 *        - count=1 (找到路径10->5->3)
 *        - 更新prefixSumCount={0:1, 10:1, 15:1, 18:1}
 *      · 继续此过程，最终找到3条路径
 *
 * 4. 关键点
 *    - 双重DFS方法中，内层DFS传递剩余目标值(remainingSum)，而不是累积和
 *    - 前缀和方法中，初始设置prefixSumCount[0]=1很关键，表示空路径出现一次
 *    - 前缀和方法需要回溯，离开节点时减少对应前缀和的计数
 *    - 需要正确处理负数情况，因为可能有正负抵消的路径
 *
 * 5. 复杂度分析
 *    - 双重DFS法：
 *      · 时间复杂度：O(n²)，最坏情况下每个节点都要遍历一遍其子树
 *      · 空间复杂度：O(n)，递归栈的深度，与树高相关
 *
 *    - 前缀和法：
 *      · 时间复杂度：O(n)，只需遍历树一次
 *      · 空间复杂度：O(n)，存储前缀和的哈希表和递归栈的空间
 *
 * 6. 方法选择
 *    - 小规模数据：双重DFS方法直观易懂，实现简单
 *    - 大规模数据：前缀和方法效率更高，尤其是对于大型或不平衡的树结构
 *    - 面试场景：两种方法都值得掌握，优先考虑前缀和方法的优化思路
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
// 解题思路一
export function pathSum(root: TreeNode | null, targetSum: number): number {
  if (root === null) return 0;
  const dfs = (node: TreeNode | null, remainingSum: number) => {
    // 基本情况：如果节点为空，返回0
    if (node === null) return 0;

    // 计算剩余需要的和
    const newRemainingSum = remainingSum - node.val;
    // 如果当前节点值正好等于剩余和，则找到一条路径
    let pathCount = newRemainingSum === 0 ? 1 : 0;

    // 继续向下查找路径
    pathCount += dfs(node.left, newRemainingSum);
    pathCount += dfs(node.right, newRemainingSum);

    return pathCount;
  };
  // 外层DFS：对每个节点，都计算以它为起点的路径数量
  // 1. 以当前节点为起点的路径数量
  var totalPaths = dfs(root, targetSum);
  console.log('----', root.val, totalPaths);

  // 2. 以左子节点为根的子树中的路径数量
  totalPaths += pathSum(root.left, targetSum);

  // 3. 以右子节点为根的子树中的路径数量
  totalPaths += pathSum(root.right, targetSum);

  return totalPaths;
}

export function pathSum2(root: TreeNode | null, targetSum: number): number {
  // 使用哈希表记录前缀和出现的次数
  const prefixSumCount = new Map<number, number>();
  // 初始前缀和为0，出现1次（表示空路径）
  prefixSumCount.set(0, 1);

  let count = 0;

  // 定义DFS函数，currentSum表示从根到当前节点的路径和
  const dfs = (node: TreeNode | null, currentSum: number): void => {
    if (node === null) return;

    // 更新当前路径和
    currentSum += node.val;

    // 查找是否存在路径前缀和为 currentSum - targetSum
    // 如果存在，则说明从某个前缀节点到当前节点的路径和为targetSum
    count += prefixSumCount.get(currentSum - targetSum) || 0;

    // 将当前前缀和加入哈希表，出现次数+1
    prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);

    // 递归处理左右子树
    dfs(node.left, currentSum);
    dfs(node.right, currentSum);

    // 回溯：从哈希表中减少当前前缀和的计数
    // 这是因为我们要离开当前节点，返回父节点，当前路径结束
    prefixSumCount.set(currentSum, prefixSumCount.get(currentSum)! - 1);
  };

  dfs(root, 0);
  return count;
}

// 创建二叉树的辅助函数
function createTree(arr: Array<number | null>, index: number = 0): TreeNode | null {
  if (index >= arr.length || arr[index] === null) return null;

  const node = new TreeNode(arr[index] as number);
  node.left = createTree(arr, 2 * index + 1);
  node.right = createTree(arr, 2 * index + 2);

  return node;
}

// 解题思路二

export default {
  run: () => {
    const examples = [
      {
        input: [[10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], 8],
        output: 3,
      },
    ];
    for (const example of examples) {
      const tree = createTree(example.input[0] as (number | null)[]);
      const targetSum = example.input[1] as number;
      const result = pathSum(tree, targetSum);
      console.log(`输入: root = [${example.input[0]}], targetSum = ${targetSum}`);
      console.log(`输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
