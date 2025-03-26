/**
 * https://leetcode.cn/problems/longest-subarray-of-1s-after-deleting-one-element/?envType=study-plan-v2&envId=leetcode-75
 * 11. longestSubarray
 *
 * 给你一个二进制数组 nums ，你需要从中删掉一个元素。
 *
 * 请你在删掉元素后，返回数组中最大连续 1 的个数。
 *
 * 输入: nums = [1,1,0,1]
 * 输出: 3
 * 解释:
 * 删除下标 2 处的 0 ，数组变为 [1,1,1]。
 * 连续 1 的个数为 3。
 *
 * 输入: nums = [0,1,1,1,0,1,1,0,1]
 * 输出: 5
 * 解释:
 * 删掉位置 4 的数字后，[0,1,1,1,1,1,0,1] 的最长全 1 子数组为 [1,1,1,1,1] 。
 * 连续 1 的个数为 5。
 *
 * 输入: nums = [1,1,1]
 * 输出: 2
 * 解释: 你必须要删除一个元素。
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 实际上是要找一个最长的子数组，该子数组最多包含一个0
 *    - 删除这个0就能得到最长的连续1
 *
 * 2. 滑动窗口解法
 *    - left和right双指针维护窗口
 *    - zeroCount记录窗口内0的个数
 *    - maxLength记录最大长度
 *
 * 3. 具体执行流程 (以 [1,1,0,1,0,1,1] 为例)：
 *    a) 初始状态：[1] left=0, right=0, zeroCount=0
 *    b) 扩展窗口：[1,1,0] zeroCount=1
 *    c) 继续扩展：[1,1,0,1] 更新maxLength=4
 *    d) 遇到第二个0：[1,1,0,1,0]
 *       - zeroCount=2
 *       - 移动left直到只包含一个0：[0,1,0]
 *    e) 继续扩展：[0,1,0,1,1]
 *
 * 4. 关键点：
 *    - while循环收缩窗口，确保窗口内最多一个0
 *    - 全1数组需要特殊处理（必须删除一个元素）
 *
 * 5. 复杂度：
 *    - 时间：O(n)，每个元素最多被访问两次
 *    - 空间：O(1)，只使用常数额外空间
 */

export function longestSubarray(nums: number[]) {
  let left = 0;
  let right = 0;
  let zeroCount = 0;
  let maxLength = 0;

  for (; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeroCount++;
    }

    while (zeroCount > 1) {
      if (nums[left] === 0) {
        zeroCount--;
      }
      left++;
    }

    maxLength = Math.max(maxLength, right - left);
  }

  return maxLength === nums.length ? maxLength - 1 : maxLength;
}

export default {
  run: () => {
    // 示例运行代码
    const examples = [
      { nums: [1, 1, 0, 1] },
      { nums: [0, 1, 1, 1, 0, 1, 1, 0, 1] },
      { nums: [1, 1, 1] },
    ];

    examples.forEach(example => {
      console.log(longestSubarray(example.nums));
    });
  },
};
