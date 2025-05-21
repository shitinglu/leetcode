/**
 * 1143. 最长公共子序列
 * 题目链接 https://leetcode.cn/problems/longest-common-subsequence/
 *
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0。
 *
 * 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 * - 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
 *
 * 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
 *
 * 示例：
 * 输入：text1 = "abcde", text2 = "ace"
 * 输出：3
 * 解释：最长公共子序列是 "ace"，它的长度为 3。
 *
 * 输入：text1 = "abc", text2 = "abc"
 * 输出：3
 * 解释：最长公共子序列是 "abc"，它的长度为 3。
 *
 * 输入：text1 = "abc", text2 = "def"
 * 输出：0
 * 解释：两个字符串没有公共子序列，返回 0。
 *
 * 提示：
 * - 1 <= text1.length, text2.length <= 1000
 * - text1 和 text2 仅由小写英文字符组成。
 */

/**
 * 问题：最长公共子序列
 * 解题思路：
 * 1. 问题本质
 * - 寻找两个字符串中按原顺序出现的最长公共部分
 * - 关键点在于字符必须按原顺序出现，但可以不连续
 * - 例如："ace"是"abcde"的子序列，我们可以从"abcde"中删除'b'和'd'得到
 *
 * 2. 解决方案
 * - 动态规划是解决此类问题的最佳方法
 * - 定义状态：dp[i][j]表示text1的前i个字符和text2的前j个字符的最长公共子序列长度
 * - 状态转移方程：
 *   - 当text1[i-1] === text2[j-1]时：dp[i][j] = dp[i-1][j-1] + 1（找到一个匹配字符）
 *   - 否则：dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])（取前面计算的最大值）
 *
 * 3. 具体执行流程(以"abcde"和"ace"为例)：
 * - 创建dp表，初始化为0：
 *   dp = [
 *     [0, 0, 0, 0],
 *     [0, 0, 0, 0],
 *     [0, 0, 0, 0],
 *     [0, 0, 0, 0],
 *     [0, 0, 0, 0],
 *     [0, 0, 0, 0]
 *   ]
 * - 遍历填充dp表：
 *   - 当i=1,j=1时：text1[0]='a', text2[0]='a'，匹配，dp[1][1] = dp[0][0] + 1 = 1
 *   - 当i=1,j=2时：text1[0]='a', text2[1]='c'，不匹配，dp[1][2] = max(dp[0][2], dp[1][1]) = 1
 *   - 当i=2,j=1时：text1[1]='b', text2[0]='a'，不匹配，dp[2][1] = max(dp[1][1], dp[2][0]) = 1
 *   - ...以此类推
 *   - 当i=3,j=2时：text1[2]='c', text2[1]='c'，匹配，dp[3][2] = dp[2][1] + 1 = 2
 *   - ...继续填充
 *   - 当i=5,j=3时：text1[4]='e', text2[2]='e'，匹配，dp[5][3] = dp[4][2] + 1 = 3
 * - 最终dp[5][3] = 3，即为所求
 *
 * 4. 详细执行过程
 * - 初始化dp表，所有元素为0
 * - 双重循环填充dp表：
 *   - 外层循环i从1到m(text1长度)
 *   - 内层循环j从1到n(text2长度)
 *   - 每一步都基于之前计算好的结果，逐步构建解决方案
 * - 如果当前字符相同，则在dp[i-1][j-1]的基础上加1
 * - 如果当前字符不同，则取dp[i-1][j]和dp[i][j-1]的最大值
 * - 最终dp表右下角的值即为最长公共子序列的长度
 *
 * 5. 关键点
 * - 动态规划状态定义清晰：dp[i][j]表示两个字符串前缀的LCS长度
 * - 基础情况：空字符串与任何字符串的LCS为0，因此dp表第一行和第一列均为0
 * - 状态转移方程处理两种情况：字符匹配和不匹配
 * - 填表顺序：从左到右，从上到下，确保每个dp[i][j]计算时，依赖的dp[i-1][j-1]、dp[i-1][j]和dp[i][j-1]已经计算完毕
 *
 * 6. 复杂度分析
 * - 时间复杂度：O(m×n)，需要填充m×n大小的dp表
 * - 空间复杂度：O(m×n)，需要存储m×n大小的dp表
 *   - 可以优化为O(min(m,n))，因为每次计算只依赖前一行的结果
 *
 * 7. 方法选择
 * - 动态规划是解决LCS问题的标准方法，既高效又直观
 * - 递归+记忆化也可以解决，但可能导致栈溢出
 * - 动态规划自底向上的方法避免了递归调用的开销
 */

export function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;

  // 创建DP表，dp[i][j]表示text1的前i个字符和text2的前j个字符的LCS长度
  const dp = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));
  // console.log(dp);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // 如果当前字符相同，LCS长度+1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // 否则取前面计算的最大值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

export default {
  run: () => {
    const examples = [
      {
        input: ['abcde', 'ace'],
        output: 3,
      },
      {
        input: ['abc', 'abc'],
        output: 3,
      },
      {
        input: ['abc', 'def'],
        output: 0,
      },
    ];

    for (const example of examples) {
      const result = longestCommonSubsequence(example.input[0], example.input[1]);
      console.log(
        `输入: text1 = "${example.input[0]}", text2 = "${example.input[1]}", 输出: ${result}`
      );
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
