/**
 * 6. moveZeroes
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 *
 * 示例 1：
 * 输入: [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 *
 * 示例 2：
 * 输入: [0,0,1]
 * 输出: [1,0,0]
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 将数组中的0移动到末尾
 *    - 保持非零元素的相对顺序不变
 *
 * 2. 双指针解法
 *    - slow指针：指向应该放置非零元素的位置
 *    - fast指针：遍历数组寻找非零元素
 *
 * 3. 具体执行流程 (以 nums=[0,1,0,3,12] 为例)：
 *    a) 初始状态：
 *       - slow=0, fast=0
 *       - nums=[0,1,0,3,12]
 *    b) fast=0时：
 *       - nums[0]=0，不交换
 *       - slow不变
 *    c) fast=1时：
 *       - nums[1]=1，与nums[0]交换
 *       - slow++
 *       - nums=[1,0,0,3,12]
 *    d) fast=2时：
 *       - nums[2]=0，不交换
 *       - slow不变
 *    e) fast=3时：
 *       - nums[3]=3，与nums[1]交换
 *       - slow++
 *       - nums=[1,3,0,0,12]
 *
 * 4. 关键点：
 *    - 使用双指针维护非零元素的位置
 *    - 只在找到非零元素时进行交换
 *    - 保持非零元素的相对顺序
 *
 * 5. 复杂度：
 *    - 时间：O(n)，只需要遍历一次数组
 *    - 空间：O(1)，原地修改数组
 */

export function moveZeroes(nums: number[]) {
  // 如果数组为空或只有一个元素，直接返回
  if (nums.length <= 1) return nums;

  // 双指针法
  let slow = 0; // 指向应该放置非零元素的位置

  // 遍历数组
  for (let fast = 0; fast < nums.length; fast++) {
    // 如果当前元素不是0，则将其交换到slow位置
    if (nums[fast] !== 0) {
      // 交换元素
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      // slow指针前进
      slow++;
    }
  }

  return nums;
}

export default {
  run: () => {
    const examples = [{ nums: [0, 1, 0, 3, 12] }, { nums: [0, 0, 1] }];

    examples.forEach(example => {
      console.log(moveZeroes(example.nums));
    });
  },
};
