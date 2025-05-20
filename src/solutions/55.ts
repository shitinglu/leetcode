/**
 * 162. 寻找峰值
 * 题目链接: https://leetcode.cn/problems/find-peak-element/
 *
 * 峰值元素是指其值严格大于左右相邻值的元素。
 * 给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
 * 你可以假设 nums[-1] = nums[n] = -∞ 。
 * 你必须实现时间复杂度为 O(log n) 的算法来解决此问题。
 *
 * 示例：
 * 输入：nums = [1,2,3,1]
 * 输出：2
 * 解释：3 是峰值元素，你的函数应该返回其索引 2。
 *
 * 输入：nums = [1,2,1,3,5,6,4]
 * 输出：1 或 5
 * 解释：你的函数可以返回索引 1，其峰值元素为 2；或者返回索引 5，其峰值元素为 6。
 *
 * 提示：
 * - 1 <= nums.length <= 1000
 * - -2^31 <= nums[i] <= 2^31 - 1
 * - 对于所有有效的 i 都有 nums[i] != nums[i + 1]
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 在数组中找到任意一个峰值元素的索引
 *    - 峰值定义：严格大于左右相邻元素的值
 *    - 边界条件：nums[-1]和nums[n]被视为负无穷，所以第一个和最后一个元素只需比较一侧
 *
 * 2. 解决方案
 *    A. 线性扫描法(O(n))
 *       - 从左到右遍历数组，检查每个位置是否是峰值
 *       - 一旦找到峰值立即返回
 *
 *    B. 二分查找法(O(log n))
 *       - 利用题目要求的O(log n)复杂度的特点
 *       - 基于峰值的特性进行二分：如果一个位置的元素小于其右侧元素，则右侧一定存在峰值
 *       - 每次二分都能排除一半的搜索空间
 *
 * 3. 具体执行流程(以二分查找法为例)：
 *    以 nums = [1,2,1,3,5,6,4] 为例：
 *    - 初始：left=0, right=6
 *    - 第一次迭代：mid=3, nums[3]=3 < nums[4]=5，向右查找，left=4, right=6
 *    - 第二次迭代：mid=5, nums[5]=6 > nums[6]=4，向左查找，left=4, right=5
 *    - 第三次迭代：mid=4, nums[4]=5 < nums[5]=6，向右查找，left=5, right=5
 *    - 循环结束，返回right=5，nums[5]=6是一个峰值
 *
 * 4. 关键点
 *    - 二分查找的关键在于确定搜索方向
 *    - 当nums[mid] < nums[mid+1]时，mid+1到right区间一定存在峰值
 *    - 当nums[mid] > nums[mid+1]时，left到mid区间一定存在峰值
 *    - 相邻元素不相等这一条件保证了总能找到峰值
 *
 * 5. 复杂度分析
 *    - 时间复杂度：O(log n)，二分查找的标准时间复杂度
 *    - 空间复杂度：O(1)，只使用常数额外空间
 *
 * 6. 方法选择
 *    - 二分查找是满足题目O(log n)要求的唯一方案
 *    - 线性扫描虽然直观，但无法满足题目的时间复杂度要求
 */

export function findPeakElement(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    // 如果中间元素比右边元素小，则峰值在右侧
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    }
    // 否则峰值在左侧（包括mid位置）
    else {
      right = mid;
    }
  }

  // 请在此处实现解题函数
  return right;
}

export default {
  run: () => {
    const examples = [
      {
        input: [1, 2, 3, 1],
        output: 2,
      },
      {
        input: [1, 2, 1, 3, 5, 6, 4],
        possibleOutputs: [1, 5], // 这道题可能有多个正确答案
      },
    ];

    for (const example of examples) {
      const result = findPeakElement(example.input);
      console.log(`输入: nums = [${example.input}], 输出: ${result}`);

      if (example.possibleOutputs) {
        console.log(`测试结果: ${example.possibleOutputs.includes(result) ? '通过' : '失败'}`);
      } else {
        console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
      }
    }
  },
};
