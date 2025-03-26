/**
 * https://leetcode.cn/problems/container-with-most-water/?envType=study-plan-v2&envId=leetcode-75
 * 19. maxArea
 *
 * 11. 盛最多水的容器
 *
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 *
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 *
 * 返回容器可以储存的最大水量。
 *
 * 说明：你不能倾斜容器。
 * https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg
 * 示例 1：
 * 输入：height = [1,8,6,2,5,4,8,3,7]
 * 输出：49
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 *
 * 示例 2：
 * 输入：height = [1,1]
 * 输出：1
 *
 * 提示：
 * n == height.length
 * 2 <= n <= 10^5
 * 0 <= height[i] <= 10^4
 */

/**
 * 解题思路：
 * 1. 问题本质
 * - 在一个数组中找两个元素，使得它们之间形成的容器容量最大
 * - 容器容量 = 两元素间距离(宽度) × 两元素中较小值(高度)
 * - 目标是找到使容量最大的两个元素
 *
 * 2. 解决方案（双指针法）
 * - 使用两个指针（左右指针）从数组两端向中间移动
 * - 每次计算当前指针对应的容器容量，并更新最大值
 * - 始终移动指向较短线段的指针
 *
 * 3. 具体执行流程(以 [1,8,6,2,5,4,8,3,7] 为例)：
 * - 初始状态：left=0 (高度=1), right=8 (高度=7)
 *   容量 = (8-0) × min(1,7) = 8
 * - 1<7，移动左指针 left=1 (高度=8)
 *   容量 = (8-1) × min(8,7) = 7×7 = 49
 * - 8>7，移动右指针 right=7 (高度=3)
 *   容量 = (7-1) × min(8,3) = 6×3 = 18
 * - 8>3，继续移动右指针...以此类推
 *
 * 4. 关键点：
 * - !!!重要!!! 为什么移动较短的线段不会错过最优解？
 *   - 假设当前 heights[left] < heights[right]
 *   - 对于任意 k 满足 left < k < right，由 left 和 k 形成的容器：
 *     宽度必然小于当前宽度，高度仍受限于 heights[left]
 *     因此容量必定小于当前容量，可以安全跳过
 * - 贪心思想：通过每次移动较短边，我们"贪心地"希望找到更高的线段来增加容量
 *
 * 5. 复杂度分析：
 * - 时间：O(n)，只需遍历一次数组
 * - 空间：O(1)，只使用常数级别的额外空间
 *
 * 6. 与暴力解法对比：
 * - 暴力解法尝试所有可能的组合，时间复杂度为 O(n²)
 * - 双指针算法通过贪心策略跳过肯定不是最优解的状态，将复杂度降至 O(n)
 */

export function maxArea(heights: number[]) {
  let maxVolume = 0;
  let left = 0;
  let right = heights.length - 1;

  while (left < right) {
    // 计算当前容器的容量

    const width = right - left;
    const height = Math.min(heights[left], heights[right]);
    const volume = width * height;

    // 更新最大容量
    maxVolume = Math.max(maxVolume, volume);

    // 移动较短的那一边
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxVolume;
}

// 我的解法 时间复杂度为O(n²)，可能会超时
// 对每个高度i，只考虑了以i为左边界的情况
// 时间复杂度为O(n²)，可能会超时
// 没有考虑以i为右边界的情况
export function maxArea2(heights: number[]) {
  let maxVolume = 0;

  for (let i = 0; i < heights.length; i++) {
    let left = i;
    let right = i;

    const current = heights[i];

    while (right < heights.length - 1) {
      right++;
      let w = right - left;

      let h = Math.min(heights[right], current);

      let Volume = w * h;
      maxVolume = Math.max(maxVolume, Volume);
    }
  }

  return maxVolume;
}

export default {
  run: () => {
    const examples = [
      {
        input: [1, 8, 6, 2, 5, 4, 8, 3, 7],
        output: 49,
      },
      {
        input: [1, 1],
        output: 1,
      },
    ];

    for (const example of examples) {
      const result = maxArea(example.input);
      console.log(``);
      console.log(`输入: ${example.input}, `);
      console.log(`输出: ${result}`);
      console.log(`----------------`);
    }
  },
};
