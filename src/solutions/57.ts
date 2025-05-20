/**
 * 17. 电话号码的字母组合
 * 题目链接: https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 *
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 *
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 *
 * 2 -> abc
 * 3 -> def
 * 4 -> ghi
 * 5 -> jkl
 * 6 -> mno
 * 7 -> pqrs
 * 8 -> tuv
 * 9 -> wxyz
 *
 * 示例：
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 * 输入：digits = ""
 * 输出：[]
 *
 * 输入：digits = "2"
 * 输出：["a","b","c"]
 *
 * 提示：
 * - 0 <= digits.length <= 4
 * - digits[i] 是范围 ['2', '9'] 的一个数字。
 */

/**
 * 17. 电话号码的字母组合
 * 题目链接: https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 *
 * 问题理解：
 * - 给定一个包含数字2-9的字符串，返回所有可能的字母组合
 * - 每个数字对应电话键盘上的多个字母：2(abc), 3(def), 4(ghi)...
 * - 需要返回所有可能的组合，顺序不限
 *
 * 解题思路：
 * 1. 问题本质
 *    - 这是一个组合问题，需要生成所有可能的字母排列
 *    - 每个数字可以映射到多个字母，需要考虑所有可能的排列组合
 *    - 最终结果数量是每个数字对应字母数量的乘积
 *
 * 2. 解决方案
 *    A. 回溯法（首选方案）
 *       - 递归尝试每个数字对应的所有可能字母
 *       - 当处理完所有数字时，将当前组合加入结果
 *
 *    B. 迭代法
 *       - 用队列存储中间结果，逐个数字处理
 *       - 对每个数字，取出队列中所有现有组合，并与该数字的每个字母组合
 *
 * 3. 具体执行流程(以回溯法为例)：
 *    以输入 "23" 为例：
 *    - 初始状态：结果集为空，开始回溯
 *    - 处理数字'2'：分别尝试'a'、'b'、'c'
 *      - 选择'a'后，处理数字'3'：尝试'd'、'e'、'f'
 *        - 得到组合"ad"，加入结果集
 *        - 得到组合"ae"，加入结果集
 *        - 得到组合"af"，加入结果集
 *      - 选择'b'后，处理数字'3'：尝试'd'、'e'、'f'
 *        - 得到组合"bd"，加入结果集
 *        - 得到组合"be"，加入结果集
 *        - 得到组合"bf"，加入结果集
 *      - 选择'c'后，处理数字'3'：尝试'd'、'e'、'f'
 *        - 得到组合"cd"，加入结果集
 *        - 得到组合"ce"，加入结果集
 *        - 得到组合"cf"，加入结果集
 *    - 最终返回所有组合：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 * 4. 关键点
 *    - 使用映射表将数字映射到对应的字母
 *    - 回溯时记录当前处理的数字索引和已构建的字符串
 *    - 递归终止条件是处理完所有数字
 *    - 注意处理输入为空字符串的边界情况
 *
 * 5. 复杂度分析
 *    - 时间复杂度：O(4^n)，其中n是输入数字的个数
 *      每个数字最多对应4个字母(数字7和9)，需要生成所有可能的组合
 *    - 空间复杂度：O(n)，主要是递归调用栈的开销和存储当前组合的空间
 *
 * 6. 方法选择
 *    - 回溯法是解决此类组合问题的标准方法，代码简洁明了
 *    - 对于本题的约束条件（输入长度不超过4），回溯法效率足够
 */
const phoneMap: Record<string, string> = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz',
};
export function letterCombinations(digits: string): string[] {
  if (!digits.length) return [];
  const result: string[] = [];

  const backtrack = (index: number, current: string) => {
    if (index === digits.length) {
      result.push(current);
      return;
    }
    const letters = phoneMap[digits[index]];

    for (let letter of letters) {
      backtrack(index + 1, current + letter);
    }
  };

  backtrack(0, '');
  return result;
}

export default {
  run: () => {
    const examples = [
      {
        input: '23',
        output: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'],
      },
      {
        input: '',
        output: [],
      },
      {
        input: '2',
        output: ['a', 'b', 'c'],
      },
    ];

    for (const example of examples) {
      const result = letterCombinations(example.input);
      console.log(`输入: digits = "${example.input}", 输出: ${JSON.stringify(result)}`);
      console.log(
        `测试结果: ${JSON.stringify(result) === JSON.stringify(example.output) ? '通过' : '失败'}`
      );
    }
  },
};
