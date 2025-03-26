/**
 * https://leetcode.cn/problems/max-consecutive-ones-iii/?envType=study-plan-v2&envId=leetcode-75
 * 10. longestOnes
 *
 * 给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0 ，则返回 数组中连续 1 的最大个数 。
 *
 * 输入: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
 * 输出: 6
 * 解释:
 * 开始时数组 nums = [1,1,1,0,0,0,1,1,1,1,0]，
 * 翻转第一个 0 可以得到最长的连续 1 的序列是 [1,1,1,0,0,1,1,1,1,1,1]。
 * 翻转第二个 0 可以得到最长的连续 1 的序列是 [1,1,1,0,0,1,1,1,1,1,1]。
 * 因为最多只能翻转两个 0 ，所以返回 6。
 *
 * 输入: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
 * 输出: 10
 * 解释:
 * 开始时数组 nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1]，
 * 翻转第一个 0 可以得到最长的连续 1 的序列是 [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]。
 * 翻转第二个 0 可以得到最长的连续 1 的序列是 [0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1]。
 * 翻转第三个 0 可以得到最长的连续 1 的序列是 [0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1]。
 * 因为最多只能翻转三个 0 ，所以返回 10。
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 寻找包含最多k个0的最长连续子数组
 *    - 等价于寻找包含最多k个0的滑动窗口
 *
 * 2. 滑动窗口解法
 *    - left指针：窗口左边界
 *    - right指针：窗口右边界
 *    - zeroCount：窗口内0的数量
 *
 * 3. 具体执行流程 (以 nums=[1,1,1,0,0,0,1,1,1,1,0], k=2 为例)：
 *    a) 初始状态：
 *       - left=0, right=0
 *       - zeroCount=0
 *       - maxLength=0
 *    b) 扩展窗口：
 *       - right=3时遇到第一个0
 *       - zeroCount=1
 *       - maxLength=4
 *    c) 继续扩展：
 *       - right=4时遇到第二个0
 *       - zeroCount=2
 *       - maxLength=5
 *    d) 遇到第三个0：
 *       - zeroCount=3 > k
 *       - 移动left直到zeroCount <= k
 *       - 更新maxLength
 *
 * 4. 关键点：
 *    - 使用滑动窗口维护当前窗口
 *    - 当窗口内0的数量超过k时，需要收缩窗口
 *    - 记录最大窗口长度
 *
 * 5. 复杂度：
 *    - 时间：O(n)，每个元素最多被访问两次
 *    - 空间：O(1)，只使用常数额外空间
 */

export function longestOnes(nums: number[], k: number) {
  let left = 0;
  let right = 0;
  let zeroCount = 0;
  let maxLength = 0;

  for (; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeroCount++;
    }
    // 当窗口内0的数量超过k时，需要移动左指针缩小窗口
    while (zeroCount > k) {
      if (nums[left] === 0) {
        zeroCount--;
      }
      // 如果没找到nums[left]===0的情况就一直++
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}

export default {
  run: () => {
    // 示例运行代码
    console.log('请实现解题函数并添加示例运行代码');
    const examples = [
      { nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k: 2 },
      { nums: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k: 3 },
    ];
    examples.forEach(example => {
      console.log(longestOnes(example.nums, example.k));
    });
  },
};
