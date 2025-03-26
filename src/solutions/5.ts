/**
 * https://leetcode.cn/problems/can-place-flowers/?envType=study-plan-v2&envId=leetcode-75
 * 5. canPlaceFlowers
 *
 * 假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
 * 给定一个花坛（表示为一个数组），和一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false。
 *
 * 示例 1:
 * 输入: flowerbed = [1,0,0,0,1], n = 1
 * 输出: true
 *
 * 示例 2:
 * 输入: flowerbed = [1,0,0,0,1], n = 2
 * 输出: false
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 在给定的花坛中判断是否能种植指定数量的花
 *    - 相邻位置不能同时种花
 *
 * 2. 贪心解法
 *    - 从左到右遍历花坛
 *    - 在满足条件的位置尽可能多地种花
 *    - 统计最多能种多少朵花
 *
 * 3. 具体执行流程 (以 flowerbed=[1,0,0,0,1], n=1 为例)：
 *    a) 遍历第一个位置(1)：
 *       - 已有花，跳过
 *    b) 遍历第二个位置(0)：
 *       - 检查前后位置：前=1，后=0
 *       - 不能种花，跳过
 *    c) 遍历第三个位置(0)：
 *       - 检查前后位置：前=0，后=0
 *       - 可以种花，max++
 *    d) 遍历第四个位置(0)：
 *       - 检查前后位置：前=1，后=1
 *       - 不能种花，跳过
 *
 * 4. 关键点：
 *    - 需要检查当前位置的前后位置
 *    - 边界位置特殊处理（第一个位置前和最后一个位置后）
 *    - 种花后需要更新花坛状态
 *
 * 5. 复杂度：
 *    - 时间：O(n)，只需要遍历一次数组
 *    - 空间：O(1)，只使用常数额外空间
 */

export function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  let max = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 1) continue;
    const preeN = flowerbed[i - 1];
    const n = flowerbed[i];
    const nextN = flowerbed[i + 1];
    if (n === 0 && preeN !== 1 && nextN !== 1) {
      max++;
      flowerbed[i] = 1;
    }
  }
  return max >= n;
}

export default {
  run: () => {
    console.log('种花问题');
    const examples = [
      { flowerbed: [1, 0, 0, 0, 1], n: 1 },
      { flowerbed: [1, 0, 0, 0, 1], n: 2 },
      { flowerbed: [0, 0, 1, 0, 1], n: 1 },
      { flowerbed: [1, 0, 0, 0, 1, 0, 0], n: 2 },
    ];

    examples.forEach(example => {
      console.log(canPlaceFlowers(example.flowerbed, example.n));
    });
  },
};
