/**
 * 338. 比特位计数
 * 题目链接：https://leetcode.cn/problems/counting-bits/
 *
 * 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数，返回一个长度为 n + 1 的数组 ans 作为答案。
 *
 * 示例 1：
 * 输入：n = 2
 * 输出：[0,1,1]
 * 解释：
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 *
 * 示例 2：
 * 输入：n = 5
 * 输出：[0,1,1,2,1,2]
 * 解释：
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 * 3 --> 11
 * 4 --> 100
 * 5 --> 101
 *
 * 提示：
 * - 0 <= n <= 10^5
 */

/**
 * 338. 比特位计数
 * 题目链接：https://leetcode.cn/problems/counting-bits/
 *
 * 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数，返回一个长度为 n + 1 的数组 ans 作为答案。
 *
 * 示例 1：
 * 输入：n = 2
 * 输出：[0,1,1]
 * 解释：
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 *
 * 示例 2：
 * 输入：n = 5
 * 输出：[0,1,1,2,1,2]
 * 解释：
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 * 3 --> 11
 * 4 --> 100
 * 5 --> 101
 *
 * 提示：
 * - 0 <= n <= 10^5
 */

/**
 * 解题思路：
 * 1. 问题本质
 * - 计算从0到n的每个数字的二进制表示中1的个数
 * - 需要将每个数字转换为二进制，然后统计1的个数
 *
 * 2. 解决方案
 * 直接转换法：
 * - 将每个数字转换为二进制字符串
 * - 计算字符串中'1'的个数
 *
 * 3. 具体执行流程
 * 以n=5为例：
 * 0 -> "0" -> 0个1
 * 1 -> "1" -> 1个1
 * 2 -> "10" -> 1个1
 * 3 -> "11" -> 2个1
 * 4 -> "100" -> 1个1
 * 5 -> "101" -> 2个1
 *
 * 4. 代码执行过程
 * 对于每个数字i：
 * 1) 使用toString(2)将数字转换为二进制字符串
 * 2) 使用split('')将字符串分割成字符数组
 * 3) 使用filter(bit => bit === '1')筛选出所有'1'
 * 4) 使用length获取'1'的个数
 *
 * 5. 复杂度分析
 * - 时间复杂度：O(n * log n)
 *   - 每个数字转换二进制需要log n时间
 *   - 总共需要处理n个数字
 * - 空间复杂度：O(1)
 *   - 不考虑返回数组的空间
 *   - 只使用常数额外空间
 *
 * 6. 方法选择
 * - 优点：实现简单，容易理解
 * - 缺点：性能不如位运算方法
 * - 适用场景：对性能要求不高，需要代码可读性的情况
 */

export function countBits(n: number): number[] {
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i & (i - 1)] + 1;

    // 第二种解法
    // const binaryStr = i.toString(2);
    // const count = binaryStr.split('').filter(bit => bit === '1').length;
    // dp[i] = count;
  }

  return dp;
}

export default {
  run: () => {
    const examples = [
      {
        input: 2,
        output: [0, 1, 1],
      },
      {
        input: 5,
        output: [0, 1, 1, 2, 1, 2],
      },
    ];

    for (const example of examples) {
      const result = countBits(example.input);
      console.log(`输入: n = ${example.input}, 输出: [${result}]`);
      console.log(
        `测试结果: ${JSON.stringify(result) === JSON.stringify(example.output) ? '通过' : '失败'}`
      );
    }
  },
};
