/**
 * https://leetcode.cn/problems/find-pivot-index/?envType=study-plan-v2&envId=leetcode-75
 * 13. pivotIndex
 *
 * 724. 寻找数组的中心下标
 * 给你一个整数数组 nums ，请计算数组的 中心下标 。
 * 数组 中心下标 是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。
 * 如果数组有多个中心下标，应该返回 最靠近左边 的那一个。如果数组不存在中心下标，返回 -1 。
 *
 * 示例 1：
 * 输入：nums = [1, 7, 3, 6, 5, 6]
 * 输出：3
 * 解释：
 * 中心下标是 3 。
 * 左侧数之和 sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11 ，
 * 右侧数之和 sum = nums[4] + nums[5] = 5 + 6 = 11 ，二者相等。
 *
 * 示例 2：
 * 输入：nums = [1, 2, 3]
 * 输出：-1
 * 解释：
 * 数组中不存在满足此条件的中心下标。
 *
 * 示例 3：
 * 输入：nums = [2, 1, -1]
 * 输出：0
 * 解释：
 * 中心下标是 0 。
 * 左侧数之和 sum = 0 ，（下标 0 左侧不存在元素），
 * 右侧数之和 sum = nums[1] + nums[2] = 1 + -1 = 0 ，二者相等。
 *
 * 提示：
 * 1 <= nums.length <= 10^4
 * -1000 <= nums[i] <= 1000
 *
 **/

/**
 * 解题思路：
 * 1. 问题本质
 *    - 找到一个下标，使得其左侧元素之和等于右侧元素之和
 *    - 需要考虑边界情况（最左侧和最右侧）
 *
 * 2. 优化解法
 *    - 先计算数组总和
 *    - 遍历时动态维护左侧和，通过总和计算右侧和
 *    - 避免重复计算
 *
 * 3. 具体执行流程 (以 nums = [1,7,3,6,5,6] 为例)：
 *    a) 计算总和 total = 28
 *    b) 遍历数组：
 *       - i=0: leftSum=0, rightSum=27, 不相等
 *       - i=1: leftSum=1, rightSum=20, 不相等
 *       - i=2: leftSum=8, rightSum=17, 不相等
 *       - i=3: leftSum=11, rightSum=11, 找到答案
 *
 * 4. 关键点：
 *    - 使用total记录数组总和
 *    - leftSum动态累加
 *    - rightSum = total - leftSum - 当前元素
 *
 * 5. 复杂度：
 *    - 时间：O(n)，只需要遍历两次数组（一次求和，一次查找）
 *    - 空间：O(1)，只使用常数级变量
 */

export function pivotIndex(nums: number[]) {
  // 计算总和
  const total = nums.reduce((sum, num) => sum + num, 0);
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    // 右边的和 = 总和 - 左边的和 - 当前元素
    const rightSum = total - leftSum - nums[i];

    if (leftSum === rightSum) {
      return i;
    }

    leftSum += nums[i];
  }

  return -1;
}

export default {
  run: () => {
    const examples = [
      [1, 7, 3, 6, 5, 6],
      [1, 2, 3],
      [2, 1, -1],
    ];

    examples.forEach(example => {
      console.log(pivotIndex(example));
    });
  },
};
