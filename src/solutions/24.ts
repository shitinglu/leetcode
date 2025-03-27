/**
 * https://leetcode.cn/problems/determine-if-two-strings-are-close/description/?envType=study-plan-v2&envId=leetcode-75
 * 24. closeStrings
 *
 * 如果可以使用以下操作从一个字符串得到另一个字符串，则认为两个字符串 接近 ：
 *
 * - 操作 1：交换任意两个 现有 字符
 *   例如，abcde -> aecdb
 *
 * - 操作 2：将一个字符的每次出现都转换为另一个字符，并对另一个字符执行相同的操作
 *   例如，aacabb -> bbcbaa（所有 a 转化为 b，而所有的 b 转化为 a）
 *
 * 你可以根据需要对任意一个字符串多次使用这两种操作。
 *
 * 给你两个字符串，word1 和 word2 。如果 word1 和 word2 接近 ，就返回 true ；否则，返回 false 。
 *
 * 示例 1：
 * 输入：word1 = "abc", word2 = "bca"
 * 输出：true
 * 解释：2 次操作从 word1 获得 word2 。
 * - 执行操作 1："abc" -> "acb"
 * - 执行操作 1："acb" -> "bca"
 *
 * 示例 2：
 * 输入：word1 = "a", word2 = "aa"
 * 输出：false
 * 解释：不管执行多少次操作，都无法从 word1 得到 word2 ，反之亦然。
 *
 * 示例 3：
 * 输入：word1 = "cabbba", word2 = "abbccc"
 * 输出：true
 * 解释：3 次操作从 word1 获得 word2 。
 * - 执行操作 1："cabbba" -> "caabbb"
 * - 执行操作 2："caabbb" -> "baaccc"
 * - 执行操作 2："baaccc" -> "abbccc"
 *
 * 提示：
 * - 1 <= word1.length, word2.length <= 10^5
 * - word1 和 word2 仅包含小写英文字母
 */

/**
 *
 * 解题思路：
 * 1. 问题本质
 *    - 判断两个字符串是否可以通过指定操作变成相同的字符串
 *    - 操作1允许交换任意两个现有字符的位置
 *    - 操作2允许将一个字符的所有出现替换为另一个字符
 *
 * 2. 常见误区
 *    ❌ 错误思路：直接对字符串排序后比较
 *    原因：这只能处理操作1（位置交换），无法处理操作2（字符替换）
 *    例如："aabb" 和 "bbaa" 排序后都是 "aabb"，这是正确的
 *    但："aabb" 和 "ccdd" 排序后不同，实际上它们是可以通过操作2转换的
 *
 * 3. 正确解决方案
 *    要判断两个字符串是否"接近"，需要满足两个条件：
 *
 *    A. 两个字符串必须包含相同的字符集
 *       - 因为操作1和操作2都只能使用现有字符
 *       - 例如："aabb" 和 "cccd" 就不可能接近，因为字符集不同
 *       实现方法：
 *       - 使用Set或Map的keys来比较字符集
 *       - 如果str1Map的某个字符在str2Map中不存在，直接返回false
 *
 *    B. 两个字符串中字符的频次分布必须相同
 *       - 因为操作2可以交换任意字符的身份
 *       - 例如："aabb"(a:2,b:2) 可以变成 "ccdd"(c:2,d:2)
 *       实现方法：
 *       - 获取两个Map中的所有频次值
 *       - 将频次值排序后比较是否完全相同
 *
 * 4. 具体实现步骤
 *    1) 使用Map统计两个字符串中每个字符的出现次数
 *    2) 检查字符集是否相同（Map.size和keys）
 *    3) 将字符频次数组排序后比较
 *
 * 5. 优化点
 *    - 可以先比较字符串长度，不相等直接返回false
 *    - 由于只包含小写字母，可以用数组替代Map优化性能
 *    - 检查字符集时，只需检查一个方向（size相同的情况下）
 *
 * 6. 复杂度分析
 *    时间复杂度：O(nlogn)
 *    - 统计频次：O(n)
 *    - 排序频次：O(klogk)，其中k最大为26（字母表大小）
 *    空间复杂度：O(k)，k为字符集大小（最多26个小写字母）
 *
 * 7. 示例分析
 *    输入：word1 = "cabbba", word2 = "abbccc"
 *    步骤：
 *    1) 统计频次：
 *       word1: {c:1, a:2, b:3}
 *       word2: {a:1, b:2, c:3}
 *    2) 检查字符集：都是{a,b,c} ✓
 *    3) 比较频次：[1,2,3] === [1,2,3] ✓
 *    返回：true
 */

export function closeStrings(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;

  let str1Map = new Map<string, number>();
  let str2Map = new Map<string, number>();

  // 统计word1中每个字符的出现次数
  for (let i = 0; i < word1.length; i++) {
    const str1 = word1[i];
    str1Map.set(str1, (str1Map.get(str1) || 0) + 1);
  }
  // 统计word2中每个字符的出现次数
  for (let i = 0; i < word2.length; i++) {
    const str2 = word2[i];
    str2Map.set(str2, (str2Map.get(str2) || 0) + 1);
  }

  // 两个字符串包含的字符集是否相同
  for (const key of str1Map.keys()) {
    if (!str2Map.has(key)) {
      return false;
    }
  }

  // 检查字符集是否相同（可以替代两个循环）
  if (str1Map.size !== str2Map.size) return false;
  for (const key of str1Map.keys()) {
    if (!str2Map.has(key)) return false;
  }
  // 检查字符出现频次的分布是否相同
  const freq1 = Array.from(str1Map.values()).sort((a, b) => a - b);
  const freq2 = Array.from(str2Map.values()).sort((a, b) => a - b);

  return freq1.join() === freq2.join();
}

export default {
  run: () => {
    const examples = [
      {
        input: {
          word1: 'abc',
          word2: 'bca',
        },
        output: true,
      },
      {
        input: {
          word1: 'a',
          word2: 'aa',
        },
        output: false,
      },
      {
        input: {
          word1: 'cabbba',
          word2: 'abbccc',
        },
        output: true,
      },
    ];

    for (const example of examples) {
      const result = closeStrings(example.input.word1, example.input.word2);
      console.log(
        `输入: word1 = "${example.input.word1}", word2 = "${example.input.word2}", 输出: ${result}`
      );
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
