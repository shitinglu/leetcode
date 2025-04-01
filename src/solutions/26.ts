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

/**
 * 问题：小行星碰撞
 *
 * 解题思路：
 * 1. 问题本质
 *   - 模拟小行星的移动和碰撞过程
 *   - 正数表示向右移动，负数表示向左移动的小行星
 *   - 碰撞只发生在一个向右移动的小行星后面跟着一个向左移动的小行星时
 *   - 碰撞规则：较小的小行星爆炸，相同大小则都爆炸，同向移动不会碰撞
 *
 * 2. 解决方案
 *   A. 栈方法
 *   - 使用栈来模拟小行星的运动轨迹
 *   - 栈顶元素代表最右边的小行星
 *   - 当前小行星只可能与栈顶小行星发生碰撞
 *   - 碰撞条件：当前小行星向左移动(负数)且栈顶小行星向右移动(正数)
 *
 * 3. 具体执行流程：
 *   以 asteroids = [5, 10, -5] 为例：
 *   - 遍历5：入栈 -> [5]
 *   - 遍历10：10向右移动，入栈 -> [5, 10]
 *   - 遍历-5：-5向左移动，与栈顶的10碰撞
 *     - |10| > |-5|，所以-5爆炸，不入栈
 *     - 最终结果：[5, 10]
 *
 *   以 [8, -8] 为例：
 *   - 遍历8：入栈 -> [8]
 *   - 遍历-8：-8向左移动，与栈顶的8碰撞
 *     - |8| = |-8|，两者都爆炸，栈变为 -> []
 *     - 最终结果：[]
 *
 * 4. 关键点
 *   - 栈结构的选择：后进先出特性适合模拟碰撞
 *   - 碰撞判断条件：当前小行星为负且栈顶为正时才可能碰撞
 *   - 碰撞结果处理：
 *     a) 栈顶小行星较小：移除栈顶，当前小行星继续与新栈顶比较
 *     b) 大小相等：移除栈顶，当前小行星也不入栈
 *     c) 栈顶小行星较大：当前小行星爆炸，不入栈
 *   - 一个向左的小行星可能连续摧毁多个向右的小行星
 *
 * 5. 复杂度分析
 *   - 时间复杂度：O(n)，每个小行星最多入栈出栈各一次
 *   - 空间复杂度：O(n)，最坏情况下所有小行星都在栈中
 *
 * 6. 方法选择
 *   - 栈方法直观模拟了碰撞过程
 *   - 实现简单且高效
 *   - 没有其他更优的算法选择
 */

export function asteroidCollision(asteroids: number[]): number[] {
  const stack: number[] = [];

  for (let i = 0; i < asteroids.length; i++) {
    let shouldAdd = true;

    let asteroid = asteroids[i];

    while (asteroid < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      // 出栈
      const top = stack[stack.length - 1];

      // 栈顶小行星较小，它会爆炸
      if (top < -asteroid) {
        stack.pop();
        // 这里不需要continue，因为while循环会继续检查下一个栈顶元素
      } // 大小相等，两者都爆炸
      else if (top === -asteroid) {
        stack.pop();
        shouldAdd = false;
        break;
      } // 栈顶小行星较大，当前小行星爆炸
      else {
        shouldAdd = false;
        break;
      }
    }
    if (shouldAdd) {
      stack.push(asteroid);
    }
  }

  return stack;
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
