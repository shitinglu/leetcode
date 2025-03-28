/**
 * https://leetcode.cn/problems/asteroid-collision/?envType=study-plan-v2&envId=leetcode-75
 * 26. asteroidCollision
 *
 * 给定一个整数数组 asteroids，表示在同一行的小行星。
 *
 * 对于数组中的每一个元素，其绝对值表示小行星的大小，正负表示小行星的移动方向（正表示向右移动，负表示向左移动）。
 * 每一颗小行星以相同的速度移动。
 *
 * 找出碰撞后剩下的所有小行星。碰撞规则：两个小行星相互碰撞，较小的小行星会爆炸。
 * 如果两颗小行星大小相同，则两颗小行星都会爆炸。两颗移动方向相同的小行星，永远不会发生碰撞。
 *
 * 示例 1：
 * 输入：asteroids = [5,10,-5]
 * 输出：[5,10]
 * 解释：10 和 -5 碰撞后只剩下 10。 5 和 10 永远不会发生碰撞。
 *
 * 示例 2：
 * 输入：asteroids = [8,-8]
 * 输出：[]
 * 解释：8 和 -8 碰撞后，两者都发生爆炸。
 *
 * 示例 3：
 * 输入：asteroids = [10,2,-5]
 * 输出：[10]
 * 解释：2 和 -5 发生碰撞后，2 爆炸。10 和 -5 发生碰撞后，-5 爆炸。
 *
 * 提示：
 * - 2 <= asteroids.length <= 10^4
 * - -1000 <= asteroids[i] <= 1000
 * - asteroids[i] != 0
 */

export function asteroidCollision(asteroids: number[]): number[] {
  const n = asteroids.length;
  for (let i = n - 1; i > 0; i--) {
    const last = asteroids[i];
    const pre = asteroids[i - 1];
    if (last > 0) {
      continue;
    }
    if (Math.abs(last) > Math.abs(pre)) {
      asteroids[i - 1] = last;
      asteroids.pop();
    }
    if (Math.abs(last) === Math.abs(pre)) {
      asteroids.pop();
      asteroids.pop();
    } else {
      asteroids.pop();
    }
  }
  console.log(asteroids);
  return asteroids;
}

export default {
  run: () => {
    const examples = [
      {
        input: [5, 10, -5],
        output: [5, 10],
      },
      {
        input: [8, -8],
        output: [],
      },
      {
        input: [10, 2, -5],
        output: [10],
      },
      {
        input: [-2, -1, 1, 2],
        output: [-2, -1, 1, 2],
      },
      {
        input: [-2, -2, 1, -2],
        output: [-2, -2, -2],
      },
    ];

    for (const example of examples) {
      const result = asteroidCollision(example.input);
      console.log(`输入: asteroids = [${example.input}], 输出: [${result}]`);
      console.log(
        `测试结果: ${JSON.stringify(result) === JSON.stringify(example.output) ? '通过' : '失败'}`
      );
    }
  },
};
