/**
 * 374. 猜数字大小
 * 题目链接 https://leetcode.cn/problems/guess-number-higher-or-lower/
 *
 * 猜数字游戏的规则如下：
 *
 * 1. 我从 1 到 n 选择一个数字。
 * 2. 你来猜我选了哪个数字。
 * 3. 如果你猜的数字 小于 我选择的数字，我会告诉你：'太小了'
 * 4. 如果你猜的数字 大于 我选择的数字，我会告诉你：'太大了'
 * 5. 如果你猜的数字 等于 我选择的数字，我会告诉你：'猜对了'
 *
 * 你调用一个预先定义好的接口 int guess(int num)，它会返回 3 个可能的结果：
 * 1. -1：我选出的数字比你猜的数字小
 * 2. 1：我选出的数字比你猜的数字大
 * 3. 0：我选出的数字和你猜的数字一样。恭喜！你猜对了！
 *
 * 示例 1：
 * 输入：n = 10, pick = 6
 * 输出：6
 *
 * 示例 2：
 * 输入：n = 1, pick = 1
 * 输出：1
 *
 * 示例 3：
 * 输入：n = 2, pick = 1
 * 输出：1
 *
 * 提示：
 * - 1 <= n <= 2^31 - 1
 * - 1 <= pick <= n
 */

// API 接口，实际由LeetCode后台实现
function guess(num: number): number {
  // 这个函数在LeetCode平台上由系统提供，此处为模拟实现
  const pick = 6; // 假设选中的数字是6
  if (num > pick) return -1;
  if (num < pick) return 1;
  return 0;
}

export function guessNumber(n: number): number {
  let left = 1;
  let right = n;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    const res = guess(mid);

    if (res === 0) {
      return mid; // 猜对了
    } else if (res === 1) {
      left = mid + 1; // 猜小了，往右找
    } else {
      right = mid - 1; // 猜大了，往左找
    }
  }

  return -1; // 正常情况下不会到这里
}

export default {
  run: () => {
    const examples = [
      {
        input: 10,
        output: 6,
      },
      {
        input: 1,
        output: 1,
      },
      {
        input: 2,
        output: 1,
      },
    ];

    // 注意：由于guess函数是由LeetCode平台提供的，
    // 在本地运行时我们只能模拟，因此结果可能与预期不同
    for (const example of examples) {
      const result = guessNumber(example.input);
      console.log(`输入: n = ${example.input}, 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
