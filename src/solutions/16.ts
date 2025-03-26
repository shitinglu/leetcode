/**
 * https://leetcode.cn/problems/product-of-array-except-self/?envType=study-plan-v2&envId=leetcode-75
 * 16. productExceptSelf
 *
 * 238. 除自身以外数组的乘积
 *
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 *
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在 32 位 整数范围内。
 *
 * 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
 *
 * 示例 1:
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 *
 * 示例 2:
 * 输入: nums = [-1,1,0,-3,3]
 * 输出: [0,0,9,0,0]
 *
 * 提示:
 * 2 <= nums.length <= 10^5
 * -30 <= nums[i] <= 30
 * 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在 32 位 整数范围内
 *
 * 解题思路：
 * 1. 问题本质
 *    - 计算数组中除当前元素外其他所有元素的乘积
 *    - 不能使用除法
 *    - 要求时间复杂度 O(n)
 *
 * 2. 解决方案（前缀积和后缀积）
 *    - 将问题分解为左侧乘积和右侧乘积
 *    - 两次遍历数组：第一次计算左侧乘积，第二次计算右侧乘积
 *    - 最终结果是左侧乘积与右侧乘积的乘积
 *
 * 3. 具体执行流程 (以 nums = [1,2,3,4] 为例)：
 *    a) 第一次遍历：计算每个位置左边的乘积
 *       - [1, 1, 2, 6]
 *    b) 第二次遍历：从右向左，计算右边的乘积并与左边的乘积相乘
 *       - rightProduct: 24 -> 12 -> 4 -> 1
 *       - 最终结果: [24, 12, 8, 6]
 *
 * 4. 关键点：
 *    - 使用额外数组存储左侧乘积
 *    - 用单个变量 rightProduct 跟踪右侧乘积
 *    - 正向和反向遍历结合
 *
 * 5. 复杂度分析：
 *    - 时间：O(n)，只需要遍历两次数组
 *    - 空间：O(1)，除了返回数组外只使用常数空间
 *
 * 6. 优化方案：
 *    - 已经是最优解，既满足时间复杂度要求
 *    - 也避免了使用除法运算
 */

export function productExceptSelf(nums: number[]) {
  const n = nums.length;
  const answer = new Array(n).fill(1);

  // 第一次遍历：计算每个位置左边所有数字的乘积
  // answer[i] 存储的是 nums[0] * nums[1] * ... * nums[i-1]
  for (let i = 1; i < n; i++) {
    answer[i] = answer[i - 1] * nums[i - 1];
  }

  // 计算右侧乘积并得到最终结果
  let rightProduct = 1;

  // 从最右边开始向左处理
  for (let i = n - 1; i >= 0; i--) {
    // 当前位置的结果 = 左边的乘积(answer[i]) × 右边的乘积(rightProduct)
    const currentResult = answer[i] * rightProduct;
    answer[i] = currentResult;

    // 更新右侧乘积：把当前数字乘进去，供下一个位置使用
    rightProduct = rightProduct * nums[i];
  }

  return answer;
}

// 我自己的解法 但是时间复杂度为 O(n²)，不符合题目要求的 O(n)
export function productExceptSelf2(nums: number[]) {
  let arr = [];
  let index = 0;

  while (index < nums.length) {
    let left = 1;
    let right = 1;
    // 求右边的乘积
    for (var i = index + 1; i < nums.length; i++) {
      right *= nums[i];
    }

    for (let j = 0; j < index; j++) {
      left *= nums[j];
    }
    arr.push(left * right);
    index++;
  }

  return arr;
}

export default {
  run: () => {
    const examples = [
      { nums: [1, 2, 3, 4], expected: [24, 12, 8, 6] },
      { nums: [-1, 1, 0, -3, 3], expected: [0, 0, 9, 0, 0] },
    ];

    examples.forEach(example => {
      const result = productExceptSelf(example.nums);
      console.log(`输入: ${example.nums}`);
      console.log(`输出: ${result}`);
      console.log(`--------------------------------`);
    });
  },
};
