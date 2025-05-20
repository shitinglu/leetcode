/**
 * 216. 组合总和 III
 * 题目链接: https://leetcode.cn/problems/combination-sum-iii/
 *
 * 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
 *
 * 说明：
 * - 所有数字都是正整数。
 * - 解集不能包含重复的组合。
 *
 * 示例 1:
 * 输入: k = 3, n = 7
 * 输出: [[1,2,4]]
 *
 * 示例 2:
 * 输入: k = 3, n = 9
 * 输出: [[1,2,6], [1,3,5], [2,3,4]]
 *
 * 提示：
 * - 2 <= k <= 9
 * - 1 <= n <= 60
 */
/**
 * 问题: 216. 组合总和 III
 *
 * 解题思路：
 * 1. 问题本质
 * - 找出所有相加之和为n的k个数的组合
 * - 只能使用1-9的正整数，且每个组合中不允许重复数字
 * - 需要找出所有可能的组合
 *
 * 2. 解决方案
 * - 回溯算法是解决组合问题的标准方法
 * - 通过递归构建候选解，并在不满足条件时进行回溯
 * - 使用深度优先搜索遍历解空间树
 *
 * 3. 具体执行流程(以k=3, n=7为例)
 * - 从数字1开始，构建组合
 * - 第一层：选择1
 *   - 第二层：选择2
 *     - 第三层：选择3 -> [1,2,3]总和为6，不符合
 *     - 第三层：选择4 -> [1,2,4]总和为7，符合要求，加入结果集
 *     - 第三层：选择5及以上 -> 总和超过7，不再继续
 *   - 第二层：选择3及以上 -> 同理继续遍历
 * - 通过剪枝优化，当组合长度达到k或总和已经超过n时停止
 *
 * 4. 关键点
 * - 使用回溯算法解决组合问题
 * - 状态参数：当前尝试的起始数字(index)和当前组合(current)
 * - 终止条件：组合大小达到k且和为n
 * - 剪枝优化：组合大小超过k时提前终止
 * - 重复处理：通过递增index保证不会选择重复数字
 * - 状态回溯：在递归返回后弹出最后添加的元素
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(C(9,k))，即组合数C(9,k)，因为我们在9个数字中选择k个
 * - 空间复杂度：O(k)，递归栈的最大深度为k，额外空间为存储当前组合的数组
 *
 * 6. 方法选择
 * - 回溯法是此类组合问题的最佳解决方案
 * - 与动态规划相比，回溯更适合求所有可能的组合
 * - 相较于暴力枚举，回溯算法通过剪枝大大提高了效率
 */

export function combinationSum3(k: number, n: number): number[][] {
  const result: number[][] = [];

  const backtrack = (index: number, current: number[]) => {
    // console.log(current, current.length, k);
    if (current.length === k && current.reduce((acc, curr) => acc + curr, 0) === n) {
      result.push([...current]);

      return;
    }
    // 剪枝：长度超出或和超出
    if (current.length >= k) {
      return;
    }

    for (let i = index; i <= 9; i++) {
      current.push(i);
      backtrack(i + 1, current);
      current.pop(); // 回溯，移除最后添加的元素
    }
  };

  backtrack(1, []);
  return result;
}

export default {
  run: () => {
    const examples = [
      {
        input: [3, 7],
        output: [[1, 2, 4]],
      },
      {
        input: [3, 9],
        output: [
          [1, 2, 6],
          [1, 3, 5],
          [2, 3, 4],
        ],
      },
    ];

    for (const example of examples) {
      const result = combinationSum3(example.input[0], example.input[1]);
      console.log(
        `输入: k = ${example.input[0]}, n = ${example.input[1]}, 输出: ${JSON.stringify(result)}`
      );

      // 检查结果是否正确 (注意：需要比较两个数组集合是否相等，这里的比较方法是简化的)
      const resultStr = JSON.stringify(result.map(arr => arr.sort()).sort());
      const expectedStr = JSON.stringify(example.output.map(arr => arr.sort()).sort());
      console.log(`测试结果: ${resultStr === expectedStr ? '通过' : '失败'}`);
    }
  },
};
