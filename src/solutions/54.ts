/**
 * 2300. 咒语和药水的成功对数
 * 题目链接: https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/?envType=study-plan-v2&envId=leetcode-75
 *
 * 给你两个正整数数组 spells 和 potions ，长度分别为 n 和 m ，其中 spells[i] 表示第 i 个咒语的能量强度，potions[j] 表示第 j 瓶药水的能量强度。
 *
 * 同时给你一个整数 success 。一个咒语和药水的能量强度相乘如果 大于或等于 success ，那么它们视为一对成功的组合。
 *
 * 请你返回一个长度为 n 的整数数组 pairs，其中 pairs[i] 是能跟第 i 个咒语成功组合的药水数目。
 *
 * 示例 1：
 * 输入：spells = [5,1,3], potions = [1,2,3,4,5], success = 7
 * 输出：[4,0,3]
 * 解释：
 * - 第 0 个咒语：5 * [1,2,3,4,5] = [5,10,15,20,25] 。有 4 个成功组合。
 * - 第 1 个咒语：1 * [1,2,3,4,5] = [1,2,3,4,5] 。有 0 个成功组合。
 * - 第 2 个咒语：3 * [1,2,3,4,5] = [3,6,9,12,15] 。有 3 个成功组合。
 * 所以返回 [4,0,3] 。
 *
 * 示例 2：
 * 输入：spells = [3,1,2], potions = [8,5,8], success = 16
 * 输出：[2,0,2]
 * 解释：
 * - 第 0 个咒语：3 * [8,5,8] = [24,15,24] 。有 2 个成功组合。
 * - 第 1 个咒语：1 * [8,5,8] = [8,5,8] 。有 0 个成功组合。
 * - 第 2 个咒语：2 * [8,5,8] = [16,10,16] 。有 2 个成功组合。
 * 所以返回 [2,0,2] 。
 *
 * 提示：
 * - n == spells.length
 * - m == potions.length
 * - 1 <= n, m <= 10^5
 * - 1 <= spells[i], potions[i] <= 10^5
 * - 1 <= success <= 10^10
 */

/**
 * 问题：2300. 咒语和药水的成功对数
 *
 * 解题思路：
 * 1. 问题本质
 * - 对于每个咒语，计算有多少药水与之相乘后大于等于success
 * - 需要返回一个数组，表示每个咒语的成功组合数
 *
 * 2. 解决方案
 * A. 暴力法
 * - 对每个咒语，遍历所有药水并计数
 * - 时间复杂度：O(n*m)，当n,m达到10^5时可能超时
 *
 * B. 排序+二分查找（优化方案）
 * - 将药水数组排序
 * - 对于每个咒语spell，计算minPotion = ⌈success/spell⌉
 * - 使用二分查找找到第一个大于等于minPotion的药水位置
 * - 该位置之后的所有药水都能与该咒语组成成功组合
 *
 * 3. 具体执行流程(以排序+二分查找为例)：
 * 以spells = [5,1,3], potions = [1,2,3,4,5], success = 7为例：
 * - 排序后potions仍为[1,2,3,4,5]
 * - 对于咒语5：
 *   - minPotion = ⌈7/5⌉ = 2
 *   - 二分查找找到第一个>=2的位置：索引1
 *   - 成功组合数：5-1=4个
 * - 对于咒语1：
 *   - minPotion = ⌈7/1⌉ = 7
 *   - 由于最大药水才5，所以没有成功组合
 * - 对于咒语3：
 *   - minPotion = ⌈7/3⌉ = 3
 *   - 二分查找找到第一个>=3的位置：索引2
 *   - 成功组合数：5-2=3个
 *
 * 4. 关键点
 * - 对药水排序是优化的关键，使得二分查找成为可能
 * - 提前处理边界情况可以减少二分查找次数：
 *   - 当minPotion大于最大药水时，直接返回0
 *   - 当minPotion小于等于最小药水时，直接返回所有药水数量
 * - 二分查找结束时，left和right指向同一个位置，即第一个>=minPotion的位置
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(m*log(m) + n*log(m))
 *   - 排序药水：O(m*log(m))
 *   - n次二分查找：O(n*log(m))
 * - 空间复杂度：O(n)，存储结果数组
 */

export function successfulPairs(spells: number[], potions: number[], success: number): number[] {
  const n = spells.length;
  const m = potions.length;
  const result = new Array(n).fill(0);

  // 对药水数组进行排序
  potions.sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    const spell = spells[i];

    // 计算最小需要的药水强度
    const minPotion = Math.ceil(success / spell);

    if (minPotion > potions[m - 1]) {
      result[i] = 0;
      continue;
    }
    if (minPotion <= potions[0]) {
      result[i] = m;
      continue;
    }

    // 如果不符合上面两个，肯定是有部分符合用二分查找一个大于等于minPotion的药水;
    let left = 0;
    let right = m - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (potions[mid] >= minPotion) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    // 计算成功组合的数量
    result[i] = m - right;
  }

  return result;
}

export function successfulPairs2(spells: number[], potions: number[], success: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < spells.length; i++) {
    let count = 0;
    for (let j = 0; j < potions.length; j++) {
      if (spells[i] * potions[j] >= success) {
        count++;
      }
    }
    arr.push(count);
  }
  return arr;
}

export default {
  run: () => {
    const examples = [
      {
        spells: [5, 1, 3],
        potions: [1, 2, 3, 4, 5],
        success: 7,
        output: [4, 0, 3],
      },
      {
        spells: [3, 1, 2],
        potions: [8, 5, 8],
        success: 16,
        output: [2, 0, 2],
      },
    ];

    for (const example of examples) {
      const result = successfulPairs(example.spells, example.potions, example.success);
      console.log(
        `输入: spells = [${example.spells}], potions = [${example.potions}], success = ${example.success}`
      );
      console.log(`输出: [${result}]`);
      console.log(
        `测试结果: ${JSON.stringify(result) === JSON.stringify(example.output) ? '通过' : '失败'}`
      );
    }
  },
};
