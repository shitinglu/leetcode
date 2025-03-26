/**
 * https://leetcode.cn/problems/string-compression/?envType=study-plan-v2&envId=leetcode-75
 * 17. compress
 * 
 * 443. 压缩字符串
 *      
 * 给你一个字符数组 chars ，请使用下述算法压缩：
 * 给你一个字符数组 chars ，请使用下述算法压缩：
 * 从一个空字符串 s 开始。对于 chars 中的每组 连续重复字符 ：

 * 如果这一组长度为 1 ，则将字符追加到 s 中。
 * 否则，需要向 s 追加字符，后跟这一组的长度。
 * 压缩后得到的字符串 s 不应该直接返回 ，需要转储到字符数组 chars 中。需要注意的是，如果组长度为 10 或 10 以上，则在 chars 数组中会被拆分为多个字符。
 * 请在 修改完输入数组后 ，返回该数组的新长度。
 * 你必须设计并实现一个只使用常量额外空间的算法来解决此问题。
 * 
 * 
 * 示例 1：
 *输入：chars = ["a","a","b","b","c","c","c"]
 *输出：返回 6 ，输入数组的前 6 个字符应该是：["a","2","b","2","c","3"]
 *解释："aa" 被 "a2" 替代。"bb" 被 "b2" 替代。"ccc" 被 "c3" 替代。
 *示例 2：

 *输入：chars = ["a"]
 *输出：返回 1 ，输入数组的前 1 个字符应该是：["a"]
 *解释：唯一的组是"a"，它保持未压缩，因为它是一个字符。
 *示例 3：

 *输入：chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
 *输出：返回 4 ，输入数组的前 4 个字符应该是：["a","b","1","2"]。
 *解释：由于字符 "a" 不重复，所以不会被压缩。"bbbbbbbbbbbb" 被 "b12" 替代。
 * 
 * 
 */

/**
 *
 *
 * 解题思路：
 * 1. 问题本质
 * - 压缩连续重复字符
 * - 在原数组上进行修改
 * - 返回新的数组长度
 *
 * 2. 解决方案（双指针法）
 * - 使用读写双指针：read（读取位置）和 write（写入位置）
 * - read 指针用于统计连续字符数量
 * - write 指针用于写入压缩后的结果
 *
 * 3. 具体执行流程(以 chars = ["a", "a", "b", "b", "c", "c", "c"] 为例)：
 * a) 初始状态：read = 0, write = 0
 * b) 统计连续字符：
 * - 遇到 "aa"，count = 2，写入 "a2"
 * - 遇到 "bb"，count = 2，写入 "b2"
 * - 遇到 "ccc"，count = 3，写入 "c3"
 * c) 最终结果：["a", "2", "b", "2", "c", "3"]
 *
 * 4. 关键点：
 * - 使用双指针避免额外空间
 * - 处理数字大于9的情况（需要拆分数字）
 * - 原地修改数组
 *
 * 5. 复杂度分析：
 * - 时间：O(n)，只需要遍历一次数组
 * - 空间：O(1)，只使用常量额外空间
 *
 * 6. 优化方案：
 * - 可以使用快慢指针
 * - 直接在原数组上操作，无需额外空间
 */

// 推荐解法
function compress(chars: string[]): number {
  let write = 0; // 写入位置
  let read = 0; // 读取位置

  while (read < chars.length) {
    let count = 0;
    let currentChar = chars[read];

    // 统计当前字符的连续出现次数
    while (read < chars.length && chars[read] === currentChar) {
      read++;
      count++;
    }

    // 写入字符
    chars[write++] = currentChar;

    // 如果count>1，需要写入数字
    if (count > 1) {
      // 将数字转为字符串，然后逐位写入
      for (let digit of count.toString()) {
        chars[write++] = digit;
      }
    }
  }

  return write; // 返回新数组的长度
}

//  我的解法
export function compress2(chars: string[]) {
  if (chars.length === 0) return 0;

  let writeIndex = 0; // 写入位置指针
  let count = 1; // 当前字符计数

  // 遍历到倒数第二个字符，最后一个字符特殊处理
  for (let i = 1; i < chars.length; i++) {
    if (chars[i] === chars[i - 1]) {
      // 如果当前字符与前一个相同，计数加1
      count++;
    } else {
      // 当遇到不同字符时，写入前一个字符及其计数
      chars[writeIndex++] = chars[i - 1];
      if (count > 1) {
        for (let digit of count.toString()) {
          chars[writeIndex++] = digit;
        }
      }
      count = 1; // 重置计数
    }
  }

  // 处理最后一组字符
  chars[writeIndex++] = chars[chars.length - 1];
  if (count > 1) {
    for (let digit of count.toString()) {
      chars[writeIndex++] = digit;
    }
  }

  return writeIndex;
}

export default {
  run: () => {
    const examples = [
      {
        input: ['a', 'a', 'b', 'b', 'c', 'c', 'c'],
        output: 6,
      },
      {
        input: ['a'],
        output: 1,
      },
      {
        input: ['a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        output: 4,
      },
    ];

    examples.forEach(example => {
      const result = compress(example.input);
      console.log(`输入: ${example.input.join(',')}, 输出: ${result}`);
    });
  },
};
