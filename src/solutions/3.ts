/**
 * https://leetcode.cn/problems/greatest-common-divisor-of-strings/?envType=study-plan-v2&envId=leetcode-75
 *
 * 3. gcdOfStrings
 * 对于字符串 s 和 t，只有在 s = t + t + t + ... + t + t（t 自身连接 1 次或多次）时，我们才认定 "t 能除尽 s"。
 * 给定两个字符串 str1 和 str2 。返回 最长字符串 x，要求满足 x 能除尽 str1 且 x 能除尽 str2 。
 *
 * 示例 1：
 * 输入：str1 = "ABCABC", str2 = "ABC"
 * 输出："ABC"
 *
 * 示例 2：
 * 输入：str1 = "ABABAB", str2 = "ABAB"
 * 输出："AB"
 *
 * 示例 3：
 * 输入：str1 = "LEET", str2 = "CODE"
 * 输出：""
 *
 * 提示：
 * 1 <= str1.length, str2.length <= 1000
 * str1 和 str2 由大写英文字母组成
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 寻找两个字符串的最大公共因子字符串
 *    - 该字符串必须能同时除尽两个输入字符串
 *
 * 2. 数学解法
 *    - 利用字符串长度的最大公约数
 *    - 使用欧几里得算法计算最大公约数
 *
 * 3. 具体执行流程 (以 str1="ABCABC", str2="ABC" 为例)：
 *    a) 检查 str1 + str2 === str2 + str1
 *       - 如果不等，说明不存在公共因子，返回空字符串
 *    b) 计算字符串长度的最大公约数
 *       - str1.length = 6
 *       - str2.length = 3
 *       - gcd(6,3) = 3
 *    c) 返回 str1 的前 gcdLength 个字符
 *       - 返回 "ABC"
 *
 * 4. 关键点：
 *    - 使用 str1 + str2 === str2 + str1 判断是否存在公共因子
 *    - 最大公共因子的长度一定是两个字符串长度的最大公约数
 *    - 使用欧几里得算法高效计算最大公约数
 *
 * 5. 复杂度：
 *    - 时间：O(log(min(n,m)))，计算最大公约数的时间复杂度
 *    - 空间：O(1)，只使用常数额外空间
 */

// 使用欧几里得算法计算最大公约数
function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

export function solution(str1: string, str2: string) {
  // 如果 str1 + str2 不等于 str2 + str1，则不存在最大公因子
  if (str1 + str2 !== str2 + str1) {
    return '';
  }
  // 计算两个字符串长度的最大公约数
  const gcdLength = gcd(str1.length, str2.length);

  // 实现...
  return str1.substring(0, gcdLength);
}

export default {
  run: () => {
    const examples = [
      { str1: 'ABCABC', str2: 'ABC' },
      { str1: 'ABABAB', str2: 'ABAB' },
      { str1: 'LEET', str2: 'CODE' },
    ];

    examples.forEach((example, index) => {
      const result = solution(example.str1, example.str2);
      console.log(`示例 ${index + 1}:`);
      console.log(`输入: str1 = "${example.str1}", str2 = "${example.str2}"`);
      console.log(`输出: "${result}"`);
      console.log('---');
    });
  },
};
