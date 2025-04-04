/**
 * 25. removeStars
 *
 * https://leetcode.cn/problems/removing-stars-from-a-string/?envType=study-plan-v2&envId=leetcode-75
 *
 * 给你一个包含若干星号 * 的字符串 s 。
 *
 * 在一步操作中，你可以：
 * - 选中 s 中的一个星号。
 * - 移除星号 左侧 最近的那个 非星号 字符，并移除该星号自身。
 *
 * 返回移除 所有 星号之后的字符串。
 *
 * 注意：
 * - 生成的输入保证总是可以执行题面中描述的操作。
 * - 可以证明结果字符串是唯一的。
 *
 * 示例 1：
 * 输入：s = "leet**cod*e"
 * 输出："lecoe"
 * 解释：从左到右执行移除操作：
 * - 距离第 1 个星号最近的字符是 "leet**cod*e" 中的 't' ，删除 "t" 和星号，得到 "lee*cod*e" 。
 * - 距离第 2 个星号最近的字符是 "lee*cod*e" 中的 'e' ，删除 "e" 和星号，得到 "lecod*e" 。
 * - 距离第 3 个星号最近的字符是 "lecod*e" 中的 'd' ，删除 "d" 和星号，得到 "lecoe" 。
 * 不存在其他星号，返回 "lecoe" 。
 *
 * 示例 2：
 * 输入：s = "erase*****"
 * 输出：""
 * 解释：整个字符串都会被移除，所以返回空字符串。
 *
 * 提示：
 * - 1 <= s.length <= 10^5
 * - s 由小写英文字母和星号 * 组成
 * - s 可以执行上述操作
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 当遇到星号(*)时，需要删除前一个非星号字符和星号本身
 *    - 这种"撤销"前一个操作的模式非常适合使用栈结构
 *
 * 2. 常见解法
 *    - 栈方法（最优解）：遍历字符串，遇到非星号字符入栈，遇到星号则弹出栈顶元素
 *    - 双指针法：使用读写指针，遇到星号时回退写指针
 *    - 递归法：每次找到星号，递归处理删除相应字符后的子问题
 *
 * 3. 本题选择栈方法的原因
 *    - 符合问题的"后进先出"特性：最近添加的字符最先被星号删除
 *    - 实现简单清晰：代码量少，逻辑直观
 *    - 效率高：单次遍历即可得到结果
 *
 * 4. 实现步骤
 *    1) 初始化空栈用于存储结果字符
 *    2) 从左到右遍历字符串的每个字符
 *       - 如果是普通字符，将其压入栈中
 *       - 如果是星号(*)，弹出栈顶元素（删除最近的非星号字符）
 *    3) 最后，栈中剩余的字符就是结果，将它们连接成字符串返回
 *
 * 5. 复杂度分析
 *    - 时间复杂度：O(n)，其中n是字符串长度，每个字符只被处理一次
 *    - 空间复杂度：O(n)，最坏情况下（没有星号）需要存储整个字符串
 *
 * 6. 边界情况分析
 *    - 空字符串：直接返回空字符串
 *    - 只有星号的字符串：由于题目保证操作总是可行，不会出现这种情况
 *    - 所有字符都被删除：返回空字符串（如示例2）
 *
 * 7. 优化可能性
 *    - 对于超大字符串，可考虑使用字符数组而非字符串数组作为栈减少内存消耗
 *    - 预分配栈空间可减少动态调整带来的开销
 *    - 在多核环境下，可以考虑分段并行处理再合并结果，但需处理好分段边界
 */

export function removeStars(s: string): string {
  // 使用数组作为栈
  const stack: string[] = [];

  // 遍历字符串
  for (const char of s) {
    if (char === '*') {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.join('');
}

export default {
  run: () => {
    // 示例运行代码
    const examples = [
      {
        input: 'leet**cod*e',
        output: 'lecoe',
      },
      {
        input: 'erase*****',
        output: '',
      },
    ];

    for (const example of examples) {
      const result = removeStars(example.input);
      console.log(`输入: s = "${example.input}", 输出: ${result}`);
      console.log(`测试结果: ${result === example.output ? '通过' : '失败'}`);
    }
  },
};
