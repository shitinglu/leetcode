/**
 * https://leetcode.cn/problems/reverse-words-in-a-string/?envType=study-plan-v2&envId=leetcode-75
 * 15. reverseWords
 * 151. 反转字符串中的单词
 *
 * 给你一个字符串 s ，请你反转字符串中 单词 的顺序。
 * 单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
 * 返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。
 * 注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。
 *
 * 示例 1：
 * 输入：s = "the sky is blue"
 * 输出："blue is sky the"
 *
 * 示例 2：
 * 输入：s = "  hello world  "
 * 输出："world hello"
 * 解释：反转后的字符串中不应包含前导空格和尾随空格。
 *
 * 示例 3：
 * 输入：s = "a good   example"
 * 输出："example good a"
 * 解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。
 *
 * 提示：
 * 1 <= s.length <= 10^4
 * s 包含英文大小写字母、数字和空格 ' '
 * s 中至少存在一个单词
 *
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 去除字符串首尾的空格
 *    - 将多个连续空格替换为单个空格
 *    - 反转单词的顺序
 *
 * 2. 解决方案（双指针法）
 *    - 先处理空格问题，将字符串转换为单词数组
 *    - 使用左右双指针，交换单词位置
 *    - 最后将单词数组用空格连接
 *
 * 3. 具体执行流程 (以 s = "  hello world  " 为例)：
 *    a) 处理空格：trim() 去除首尾空格，split(/\s+/) 分割多余空格
 *       - "  hello world  " -> ["hello", "world"]
 *    b) left=0, right=length-1 开始交换单词
 *       - ["hello", "world"] -> ["world", "hello"]
 *    c) 最后用空格连接
 *       - ["world", "hello"] -> "world hello"
 *
 * 4. 关键点：
 *    - 使用正则表达式处理多余空格
 *    - 双指针交换单词位置
 *    - 数组转字符串时使用空格连接
 *
 * 5. 复杂度分析：
 *    - 时间：O(n)，只需要遍历一次字符串
 *    - 空间：O(n)，需要存储单词数组
 *
 * 6. 优化方案：
 *    - 可以直接使用 split().reverse() 方法
 *    - 使用 filter() 过滤空字符串
 */

// 双指针方法
export function reverseWords(s: string) {
  let arr: string[] = s.trim().split(/\s+/);

  let left: number = 0;
  let right: number = arr.length - 1;

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  // 实现...
  return arr.join(' ');
}

// 使用数组内置方法
function reverseWords2(s: string): string {
  return s
    .trim()
    .split(/\s+/)
    .reverse()
    .filter(item => !!item)
    .join(' ');
}

export default {
  run: () => {
    // 示例运行代码
    const examples = ['the sky is blue', '  hello world  ', 'a good   example'];

    examples.forEach(example => {
      const result = reverseWords(example);
      console.log(`输入：${example}`);
      console.log(`输出：${result}`);
      console.log(`--------------------------------`);
    });
  },
};
