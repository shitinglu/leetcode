/**
 * 1318. 使 a OR b 等于 c 的最少翻转次数
 * 题目链接: https://leetcode.cn/problems/minimum-flips-to-make-a-or-b-equal-to-c/
 *
 * 给你三个正整数 a、b 和 c。
 * 你可以对 a 和 b 的二进制表示进行位翻转操作，返回使 a OR b 等于 c 所需的最少翻转次数。
 * 「位翻转操作」是指将某个二进制位上的 1 变成 0 或者将 0 变成 1。
 *
 * 示例 1：
 * 输入：a = 2, b = 6, c = 5
 * 输出：3
 * 解释：翻转后 a = 1 , b = 4 , c = 5 使得 a OR b = c
 *
 * 示例 2：
 * 输入：a = 4, b = 2, c = 7
 * 输出：1
 *
 * 示例 3：
 * 输入：a = 1, b = 2, c = 3
 * 输出：0
 *
 * 提示：
 * 1 <= a <= 10^9
 * 1 <= b <= 10^9
 * 1 <= c <= 10^9
 */

/**
 * 解题思路：
 * 1. 问题本质
 * - 需要计算将a和b的二进制位翻转，使得a OR b = c的最少次数
 * - 需要逐位比较a、b和c的二进制表示
 *
 * 2. 解决方案
 * - 位运算方法：
 *   1. 逐位检查a、b和c的二进制位
 *   2. 对于每一位，计算需要翻转的次数
 *   3. 累加所有位的翻转次数
 *
 * 3. 具体执行流程
 * 以 a = 2(10), b = 6(110), c = 5(101) 为例：
 * - 从右到左逐位比较：
 *   第0位：a=0, b=0, c=1 -> 需要翻转1次
 *   第1位：a=1, b=1, c=0 -> 需要翻转2次
 *   第2位：a=0, b=1, c=1 -> 需要翻转0次
 * - 总翻转次数 = 1 + 2 + 0 = 3
 *
 * 4. 关键点
 * - 使用位运算获取每一位的值
 * - 需要同时考虑a和b的位值
 * - 注意处理不同长度的二进制数
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(log(max(a,b,c)))，需要遍历所有二进制位
 * - 空间复杂度：O(1)，只使用常数空间
 */

export function minFlips(a: number, b: number, c: number): number {
  let flips = 0;
  while (a > 0 || b > 0 || c > 0) {
    const bitA = a & 1;
    const bitB = b & 1;
    const bitC = c & 1;

    if ((bitA | bitB) !== bitC) {
      if (bitC === 1) {
        flips += 1;
      } else {
        flips += (bitA === 1 ? 1 : 0) + (bitB === 1 ? 1 : 0);
      }
    }

    a >>= 1;
    b >>= 1;
    c >>= 1;
  }
  return flips;
}

export default {
  run: () => {
    const examples = [
      { a: 2, b: 6, c: 5, expected: 3 },
      { a: 4, b: 2, c: 7, expected: 1 },
      { a: 1, b: 2, c: 3, expected: 0 },
    ];

    for (const example of examples) {
      const result = minFlips(example.a, example.b, example.c);
      console.log(`输入: a = ${example.a}, b = ${example.b}, c = ${example.c}`);
      console.log(`输出: ${result}`);
      console.log(`预期: ${example.expected}`);
      console.log(`测试结果: ${result === example.expected ? '通过' : '失败'}\n`);
    }
  },
};
