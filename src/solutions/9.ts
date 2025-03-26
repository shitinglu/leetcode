/**
 * https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/?envType=study-plan-v2&envId=leetcode-75
 * 9. maxVowels
 *
 * 给你一个字符串 s 和一个整数 k 。
 * 请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。
 *
 * 元音字母为 'a'、'e'、'i'、'o'、'u' 。
 *
 * 示例 1：
 * 输入：s = "abciiidef", k = 3
 * 输出：3
 * 解释：子字符串 "iii" 包含 3 个元音字母。
 *
 * 示例 2：
 * 输入：s = "aeiou", k = 2
 * 输出：2
 * 解释：任意长度为 2 的子字符串都包含 2 个元音字母。
 *
 * 示例 3：
 * 输入：s = "leetcode", k = 3
 * 输出：2
 * 解释："eet" 和 "ode" 都包含 2 个元音字母。
 *
 * 示例 4：
 * 输入：s = "rhythm", k = 3
 * 输出：0
 * 解释：字符串中不含任何元音字母。
 *
 * 示例 5：
 * 输入：s = "tryhard", k = 4
 * 输出：1
 * 解释："tryh" 和 "ytra" 都包含 1 个元音字母。
 *
 * 提示：
 * 1 <= s.length <= 10^5
 * s 由小写英文字母组成
 * 1 <= k <= s.length
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 寻找长度为k的子串中元音字母的最大数量
 *    - 元音字母包括：a、e、i、o、u
 *
 * 2. 滑动窗口解法
 *    - 维护一个固定大小为k的窗口
 *    - 统计窗口内元音字母的数量
 *    - 滑动窗口时更新元音字母数量
 *
 * 3. 具体执行流程 (以 s="abciiidef", k=3 为例)：
 *    a) 初始窗口：
 *       - 统计"abc"中的元音字母：1个
 *       - maxSum = 1
 *    b) 滑动窗口：
 *       - 移除'a'，添加'i'：1-1+1=1
 *       - maxSum = 1
 *    c) 继续滑动：
 *       - 移除'b'，添加'i'：1-0+1=2
 *       - maxSum = 2
 *    d) 继续滑动：
 *       - 移除'c'，添加'i'：2-0+1=3
 *       - maxSum = 3
 *
 * 4. 关键点：
 *    - 使用数组存储元音字母，方便判断
 *    - 滑动窗口时只需检查移除和添加的字符
 *    - 维护最大元音字母数量
 *
 * 5. 复杂度：
 *    - 时间：O(n)，只需要遍历一次字符串
 *    - 空间：O(1)，只使用常数额外空间
 */

export function maxVowels(s: string, k: number) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  let sum = 0;

  for (let i = 0; i < k; i++) {
    const char = s[i];
    if (vowels.indexOf(char) >= 0) {
      sum++;
    }
  }
  let maxSum = sum;

  for (let j = k; j < s.length; j++) {
    const right = s[j];
    const left = s[j - k];
    if (vowels.indexOf(right) >= 0) {
      sum++;
    }
    if (vowels.indexOf(left) >= 0) {
      sum--;
    }

    maxSum = Math.max(maxSum, sum);
  }

  return maxSum;
}

export default {
  run: () => {
    // 示例运行代码
    console.log('maxVowels');
    const examples = [
      { s: 'abciiidef', k: 3 },
      { s: 'aeiou', k: 2 },
      { s: 'leetcode', k: 3 },
      { s: 'rhythm', k: 3 },
      { s: 'tryhard', k: 4 },
    ];
    examples.forEach(example => {
      console.log(maxVowels(example.s, example.k));
    });
  },
};
