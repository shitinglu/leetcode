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

/**
 * 394. 字符串解码
 *
 * 解题思路：
 * 1. 问题本质
 * - 解析带有重复计数的嵌套字符串结构
 * - 本质上是一个简单的词法解析器问题
 * - 需要处理数字、字母和括号三种token类型
 *
 * 2. 解决方案（两种主要方法）
 *
 * A. 栈方法
 * - 使用栈存储字符串和重复次数
 * - 遇到[时保存当前上下文
 * - 遇到]时处理重复逻辑
 *
 * B. 递归方法（词法解析）
 * - 将输入分解为token流
 * - 递归处理嵌套结构
 * - 支持错误处理和回退
 *
 * 3. 具体执行流程(以"3[a]2[bc]"为例)：
 * - 遇到3：收集数字
 * - 遇到[：保存上下文{str: "", count: 3}
 * - 遇到a：收集字符串
 * - 遇到]：弹出上下文，重复字符串 -> "aaa"
 * - 遇到2：收集数字
 * - 遇到[：保存上下文{str: "aaa", count: 2}
 * - 遇到bc：收集字符串
 * - 遇到]：弹出上下文，重复字符串 -> "aaabcbc"
 *
 * 4. 关键点
 * - 多位数字的处理：需要累积 num = num * 10 + digit
 * - 嵌套结构的处理：使用栈或递归
 * - 上下文的保存和恢复：包含当前字符串和重复次数
 * - 字符串的拼接时机：在处理]时进行
 *
 * 5. 复杂度分析
 * 栈方法：
 * - 时间复杂度：O(n)，其中n为输出字符串的长度
 * - 空间复杂度：O(m)，其中m为嵌套深度
 *
 * 递归方法：
 * - 时间复杂度：O(n)
 * - 空间复杂度：O(m)，递归调用栈深度
 *
 * 6. 方法选择
 * - 如果不需要错误处理，栈方法更简单直接
 * - 如果需要完整的词法解析，递归方法更合适
 * - 实际业务中建议使用递归方法，更容易扩展和维护
 */

const isNumber = (char: string): boolean => {
  return !isNaN(Number(char));
};
export function decodeString(s: string): string {
  const stack: Array<{ str: string; count: number }> = [];
  let currentStr = '';
  let currentNum = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (isNumber(char)) {
      currentNum = currentNum * 10 + Number(char);
    } else if (char === '[') {
      // 保存当前状态并入栈
      console.log(currentStr, currentNum);
      stack.push({ str: currentStr, count: currentNum });

      currentStr = '';
      currentNum = 0;
    } else if (char === ']') {
      // 处理当前层级
      const { str, count } = stack.pop()!;
      currentStr = str + currentStr.repeat(count);
    } else {
      currentStr += char;
    }
  }

  return currentStr;
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
