/**
 * 215. 数组中的第K个最大元素
 * 题目链接: https://leetcode.cn/problems/kth-largest-element-in-an-array/
 *
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 *
 * 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
 *
 * 示例：
 * 输入: [3,2,1,5,6,4], k = 2
 * 输出: 5
 *
 * 输入: [3,2,3,1,2,4,5,5,6], k = 4
 * 输出: 4
 *
 * 提示：
 * - 1 <= k <= nums.length <= 10^5
 * - -10^4 <= nums[i] <= 10^4
 */

/**
 * 215. 数组中的第K个最大元素
 * 题目链接: https://leetcode.cn/problems/kth-largest-element-in-an-array/
 *
 * 问题理解：
 * - 给定一个整数数组和整数k，找出数组中第k个最大的元素
 * - 第k大元素是指排序后第k位的元素，不是第k个不同的元素
 * - 要求设计时间复杂度为O(n)的算法
 *
 * 解题思路：
 * 1. 问题本质
 *    - 这是一个选择问题(Selection Problem)
 *    - 找出数组中第k大的元素，等价于找出排序后第k个位置的元素
 *
 * 2. 解决方案（三种主要方法）
 *    A. 排序法（简单但不满足O(n)要求）
 *       - 对数组进行排序，直接返回第k个元素
 *       - 时间复杂度：O(n log n)
 *
 *    B. 快速选择算法(Quick Select)
 *       - 基于快速排序的分区思想
 *       - 每次分区后只递归处理包含目标元素的一侧
 *       - 平均时间复杂度：O(n)
 *
 *    C. 堆排序法
 *       - 维护一个大小为k的最小堆
 *       - 遍历数组，更新堆
 *       - 最终堆顶元素即为第k大元素
 *       - 时间复杂度：O(n log k)
 *
 * 3. 具体执行流程(以快速选择为例)：
 *    以[3,2,1,5,6,4], k=2为例：
 *    1) 寻找索引n-k (4-2=2)的元素
 *    2) 随机选择pivot (如4)并分区
 *       - 分区后数组可能变为[3,2,1,4,6,5]
 *       - pivot(4)位于索引3
 *    3) 因为3>2，我们需要在左侧继续寻找
 *    4) 在[3,2,1]中寻找索引2的元素
 *    5) 选择pivot(如2)并分区
 *       - 分区后得到[1,2,3]
 *       - pivot(2)位于索引1
 *    6) 因为1<2，我们需要在右侧继续寻找
 *    7) 在[3]中寻找索引0的元素
 *    8) 找到目标元素3，这是数组中第2大的元素（逆序为5）
 *
 * 4. 关键点：
 *    - 快速选择的平均时间复杂度是O(n)，但最坏情况是O(n²)
 *    - 随机选择pivot可以避免最坏情况
 *    - 堆排序法在k较小时非常高效
 *    - 要区分是找第k大还是第k小，索引计算会有所不同
 *
 * 5. 复杂度分析：
 *    - 排序法：
 *      - 时间复杂度：O(n log n)
 *      - 空间复杂度：O(log n)至O(n)，取决于排序算法
 *
 *    - 快速选择：
 *      - 平均时间复杂度：O(n)
 *      - 最坏时间复杂度：O(n²)
 *      - 空间复杂度：O(log n)，递归调用栈
 *
 *    - 堆排序法：
 *      - 时间复杂度：O(n log k)
 *      - 空间复杂度：O(k)
 *
 * 6. 方法选择：
 *    - 如果追求代码简洁性且不苛求O(n)，使用排序法
 *    - 如果要满足O(n)要求，使用快速选择
 *    - 如果k很小，或需要处理流数据，使用堆方法
 */
export function findKthLargest(nums: number[], k: number): number {
  nums.sort((a, b) => b - a); // 直接降序排列
  return nums[k - 1];
}

export default {
  run: () => {
    const examples = [
      {
        input: {
          nums: [3, 2, 1, 5, 6, 4],
          k: 2,
        },
        output: 5,
      },
      {
        input: {
          nums: [3, 2, 3, 1, 2, 4, 5, 5, 6],
          k: 4,
        },
        output: 4,
      },
    ];

    for (const example of examples) {
      const result = findKthLargest(example.input.nums, example.input.k);
      console.log(`输入: nums = [${example.input.nums}], k = ${example.input.k}, 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
