/**
 * 136. 只出现一次的数字
 * 题目链接: https://leetcode.cn/problems/single-number/
 *
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现一次的元素。
 * 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
 *
 * 示例 1：
 * 输入：nums = [2,2,1]
 * 输出：1
 *
 * 示例 2：
 * 输入：nums = [4,1,2,1,2]
 * 输出：4
 *
 * 示例 3：
 * 输入：nums = [1]
 * 输出：1
 *
 * 提示：
 * - 1 <= nums.length <= 3 * 10^4
 * - -3 * 10^4 <= nums[i] <= 3 * 10^4
 * - 除了某个元素只出现一次以外，其余每个元素均出现两次。
 *
 * 解题思路：
 * 1. 问题本质
 * - 在一个整数数组中找出唯一一个只出现一次的元素
 * - 其余元素都出现两次
 * - 要求线性时间复杂度和常量空间复杂度
 *
 * 2. 解决方案
 * A. 异或运算（XOR）
 * - 利用异或运算的特性：a ⊕ a = 0，a ⊕ 0 = a
 * - 任何数与自身异或结果为0
 * - 任何数与0异或结果为其本身
 * - 异或运算满足交换律和结合律
 *
 * B. 哈希表法（不符合空间复杂度要求）
 * - 使用哈希表记录每个元素出现次数
 * - 返回出现次数为1的元素
 *
 * 3. 具体执行流程（以异或运算为例）
 * 以 nums = [4,1,2,1,2] 为例：
 * - 初始 result = 0
 * - 遍历数组：
 *   - result = 0 ⊕ 4 = 4
 *   - result = 4 ⊕ 1 = 5
 *   - result = 5 ⊕ 2 = 7
 *   - result = 7 ⊕ 1 = 6 (1出现第二次，被抵消)
 *   - result = 6 ⊕ 2 = 4 (2出现第二次，被抵消)
 * - 最终结果：4
 *
 * 4. 关键点
 * - 异或运算的特性是解决此问题的关键
 * - 出现两次的元素在异或运算中会"抵消"
 * - 最终只剩下出现一次的元素
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n)，只需要遍历一次数组
 * - 空间复杂度：O(1)，只使用了一个变量
 *
 * 6. 方法选择
 * - 异或运算法是最优解，满足题目的所有要求
 * - 哈希表法虽然直观，但空间复杂度为O(n)，不满足题目要求
 */

export function singleNumber(nums: number[]): number {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}

export default {
  run: () => {
    const examples = [
      {
        input: [2, 2, 1],
        output: 1,
      },
      {
        input: [4, 1, 2, 1, 2],
        output: 4,
      },
      {
        input: [1],
        output: 1,
      },
    ];

    for (const example of examples) {
      const result = singleNumber(example.input);
      console.log(`输入: nums = [${example.input}], 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
