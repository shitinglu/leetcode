/**
 * 394. 字符串解码
 *
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 *
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。
 * 注意 k 保证为正整数。
 *
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 *
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 *
 * 示例：
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 *
 * 输入：s = "3[a2[c]]"
 * 输出："accaccacc"
 *
 * 输入：s = "2[abc]3[cd]ef"
 * 输出："abcabccdcdcdef"
 *
 * 提示：
 * - 1 <= s.length <= 30
 * - s 由小写英文字母、数字和方括号 '[]' 组成
 * - s 保证是一个有效的输入。
 * - s 中所有整数的取值范围为 [1, 300]
 */

export function decodeString(s: string): string {
  return stack.join('');
}

export default {
  run: () => {
    const examples = [
      {
        input: '3[a]2[bc]',
        output: 'aaabcbc',
      },
      {
        input: '3[a2[c]]',
        output: 'accaccacc',
      },
      {
        input: '2[abc]3[cd]ef',
        output: 'abcabccdcdcdef',
      },
    ];

    for (const example of examples) {
      const result = decodeString(example.input);
      console.log(`输入: s = "${example.input}", 输出: "${result}"`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
