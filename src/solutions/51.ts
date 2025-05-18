/**
 * 2542. 最大子序列的分数
 * 题目链接：https://leetcode.cn/problems/maximum-subsequence-score/?envType=study-plan-v2&envId=leetcode-75
 *
 * 给你两个下标从 0 开始的整数数组 nums1 和 nums2 ，两者长度都是 n ，再给你一个正整数 k 。
 * 你必须从 nums1 中选择一个长度为 k 的 子序列 对应的下标。
 * 对于选择的下标 i0, i1, ..., ik-1 ，你的 分数 定义为：
 * - nums1[i0] + nums1[i1] + ... + nums1[ik-1] 乘以 min(nums2[i0], nums2[i1], ..., nums2[ik-1]) 。
 * 请你返回 最大 可能的分数。
 *
 * 一个数组的 子序列 是从原数组中删除一些元素后（也可以一个也不删除），剩余元素不改变顺序得到的数组。
 *
 * 示例：
 * 输入：nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
 * 输出：12
 * 解释：
 * 四个可能的子序列分数为：
 * - 选择下标 0, 1, 2 得到分数 (1+3+3) * min(2,1,3) = 7
 * - 选择下标 0, 1, 3 得到分数 (1+3+2) * min(2,1,4) = 6
 * - 选择下标 0, 2, 3 得到分数 (1+3+2) * min(2,3,4) = 12
 * - 选择下标 1, 2, 3 得到分数 (3+3+2) * min(1,3,4) = 8
 * 所以最大分数为 12
 *
 * 输入：nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
 * 输出：30
 * 解释：
 * 选择下标 2 得到分数 3 * 10 = 30 是最大可能的分数。
 *
 * 提示：
 * - n == nums1.length == nums2.length
 * - 1 <= n <= 10^5
 * - 0 <= nums1[i], nums2[i] <= 10^5
 * - 1 <= k <= n
 */
/**
 * 2542. 最大子序列的分数
 * 题目链接：https://leetcode.cn/problems/maximum-subsequence-score/?envType=study-plan-v2&envId=leetcode-75
 *
 * 解题思路：
 * 1. 问题本质
 * - 从两个数组中选取k个相同下标的元素
 * - 计算分数：nums1选中元素之和 × nums2选中元素的最小值
 * - 找到能够获得最大分数的组合
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 贪心 + 最小堆（高效解法）
 * - 按照nums2元素降序排序，确保较大的nums2元素优先考虑
 * - 使用最小堆维护当前选择的k个nums1元素
 * - 当考虑到第i个元素时，nums2[i]一定是当前选择中的最小值
 *
 * B. 回溯法（暴力解法）
 * - 生成所有可能的k个索引组合
 * - 计算每个组合的分数
 * - 记录最大分数
 * - 注：当n和k较大时会超时
 *
 * 3. 具体执行流程(以贪心+最小堆为例)：
 * 以 nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3 为例：
 * - 排序后的索引顺序：[3,0,2,1]（按nums2降序）
 * - 迭代1：
 *   - 选择nums1[3]=2，堆=[2]，和=2
 * - 迭代2：
 *   - 选择nums1[0]=1，堆=[2,1]，和=3
 * - 迭代3：
 *   - 选择nums1[2]=3，堆=[2,1,3]，和=6
 *   - 堆大小=k，计算分数：6*3=18
 * - 迭代4：
 *   - 选择nums1[1]=3，堆=[2,1,3,3]，和=9
 *   - 移除最小元素1，堆=[2,3,3]，和=8
 *   - 计算分数：8*1=8
 * - 返回最大分数：18
 *
 * 4. 关键点
 * - 贪心策略：按nums2降序排列，优先考虑较大的nums2值
 * - 最小堆：高效维护和更新当前选择的k个nums1元素
 * - 分数计算时机：只有当选中恰好k个元素时才计算分数
 * - 排序后，当前处理的nums2值必然是所选元素中的最小值
 *
 * 5. 复杂度分析
 * - 贪心+最小堆：
 *   - 时间：O(n log n)，主要来自排序和堆操作
 *   - 空间：O(n)，用于存储索引数组和堆
 *
 * - 回溯法（暴力解）：
 *   - 时间：O(C(n,k) * k)，组合数量乘以计算每个组合的时间
 *   - 空间：O(k)，用于存储当前组合
 *
 * 6. 方法选择
 * - 当n和k较大时，贪心+最小堆是唯一可行的方法
 * - 回溯法虽然直观，但在大规模输入下会超时
 * - 使用最小堆比简单数组模拟堆更高效
 */
export function maxScore(nums1: number[], nums2: number[], k: number): number {
  // 构建索引对，按照nums2降序排序
  const indices = Array.from({ length: nums1.length }, (_, i) => i);
  indices.sort((a, b) => nums2[b] - nums2[a]);

  let sum = 0;
  let result = 0;
  const minHeap: number[] = [];

  // 遍历排序后的索引
  for (const idx of indices) {
    // 将对应的nums1元素加入最小堆和总和
    minHeap.push(nums1[idx]);
    sum += nums1[idx];

    // 如果堆大小超过k，移除最小元素
    if (minHeap.length > k) {
      const min = Math.min(...minHeap);
      const minIndex = minHeap.indexOf(min);
      minHeap.splice(minIndex, 1);
      sum -= min;
    }

    // 计算当前分数
    if (minHeap.length === k) {
      // 注意：nums2[idx]是当前索引对应的nums2元素
      // 由于我们按nums2降序排序，所以当前nums2[idx]就是当前组合中的最小值
      result = Math.max(result, sum * nums2[idx]);
    }
  }

  return result;
}

export function maxScore2(nums1: number[], nums2: number[], k: number): number {
  let maxScore = 0;

  // 生成所有可能的索引组合
  function backtrack(start: number, current: number[]) {
    // 基本情况：当前组合已达到k个索引
    if (current.length === k) {
      // 计算当前组合的分数
      let sum = 0;
      let minVal = Infinity;

      for (const index of current) {
        sum += nums1[index];
        minVal = Math.min(minVal, nums2[index]);
      }

      // 更新最大分数
      maxScore = Math.max(maxScore, sum * minVal);
      return;
    }

    // 尝试从start开始选择索引
    for (let i = start; i < nums1.length; i++) {
      current.push(i); // 选择当前索引
      backtrack(i + 1, current); // 递归选择下一个索引
      current.pop(); // 回溯：撤销选择
    }
  }

  backtrack(0, []);
  return maxScore;
}

export default {
  run: () => {
    const examples = [
      {
        input: {
          nums1: [1, 3, 3, 2],
          nums2: [2, 1, 3, 4],
          k: 3,
        },
        output: 12,
      },
      {
        input: {
          nums1: [4, 2, 3, 1, 1],
          nums2: [7, 5, 10, 9, 6],
          k: 1,
        },
        output: 30,
      },
    ];

    for (const example of examples) {
      const { nums1, nums2, k } = example.input;
      const result = maxScore(nums1, nums2, k);
      console.log(`输入: nums1 = [${nums1}], nums2 = [${nums2}], k = ${k}`);
      console.log(`输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
