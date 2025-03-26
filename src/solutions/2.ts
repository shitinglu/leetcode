/**
 * https://leetcode.cn/problems/merge-strings-alternately/description/?envType=study-plan-v2&envId=leetcode-75
 *
 * 2. mergeAlternately
 *
 * 给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串。
 * 如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾。
 * 返回 合并后的字符串 。
 *
 * 示例：
 * 输入：word1 = "abc", word2 = "pqr"
 * 输出："apbqcr"
 * 解释：字符串合并情况如下所示：
 * word1：  a   b   c
 * word2：    p   q   r
 * 合并后：  apbqcr
 *
 * 输入：word1 = "ab", word2 = "pqrs"
 * 输出："apbqrs"
 * 解释：注意，word2 比 word1 长，"rs" 需要追加到合并后字符串的末尾。
 * word1：  a   b
 * word2：    p   q   r   s
 * 合并后：  apbqrs
 *
 * 输入：word1 = "abcd", word2 = "pq"
 * 输出："apbqcd"
 * 解释：注意，word1 比 word2 长，"cd" 需要追加到合并后字符串的末尾。
 * word1：  a   b   c   d
 * word2：    p   q
 * 合并后：  apbqcd
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 将两个字符串按交替顺序合并
 *    - 处理长度不同的情况
 *
 * 2. 数组解法
 *    - 使用数组存储合并后的字符
 *    - 遍历两个字符串，交替添加字符
 *
 * 3. 具体执行流程 (以 word1="abc", word2="pqr" 为例)：
 *    a) 第一轮：i=0
 *       - 添加 word1[0]='a'
 *       - 添加 word2[0]='p'
 *    b) 第二轮：i=1
 *       - 添加 word1[1]='b'
 *       - 添加 word2[1]='q'
 *    c) 第三轮：i=2
 *       - 添加 word1[2]='c'
 *       - 添加 word2[2]='r'
 *
 * 4. 关键点：
 *    - 使用 Math.max(word1.length, word2.length) 确定遍历次数
 *    - 处理字符未定义的情况（undefined）
 *    - 使用数组的 join 方法合并结果
 *
 * 5. 复杂度：
 *    - 时间：O(max(n,m))，n和m是两个字符串的长度
 *    - 空间：O(n+m)，存储合并后的字符串
 */

export function solution(word1: string, word2: string) {
  const arr: string[] = [];
  // 遍历两个字符串, 交替添加字母, 如果一个字符串比另一个字符串长, 就将多出来的字母追加到合并后字符串的末尾
  for (let i = 0; i < Math.max(word1.length, word2.length); i++) {
    let a = word1[i];
    let b = word2[i];

    if (a === undefined && b !== undefined) {
      arr.push(b);
    } else if (b === undefined && a !== undefined) {
      arr.push(a);
    } else if (a !== undefined && b !== undefined) {
      arr.push(a);
      arr.push(b);
    }
  }

  return arr.join('');
}

export default {
  run: () => {
    // 示例运行代码
    console.log('请实现解题函数并添加示例运行代码');
    const examples = [
      { word1: 'abc', word2: 'pqr' },
      { word1: 'ab', word2: 'pqrs' },
      { word1: 'abcd', word2: 'pq' },
    ];

    examples.forEach((example, index) => {
      const result = solution(example.word1, example.word2);
      console.log(`示例 ${index + 1}:`);
      console.log(`输入: word1 = "${example.word1}", word2 = "${example.word2}"`);
      console.log(`输出: "${result}"`);
      console.log('---');
    });
  },
};
