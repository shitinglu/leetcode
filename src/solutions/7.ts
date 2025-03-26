/**
 * https://leetcode.cn/problems/is-subsequence/?envType=study-plan-v2&envId=leetcode-75
 * 6. isSubsequence
 *
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 *
 *
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
 *
 * 示例 1：
 * 输入：s = "abc", t = "ahbgdc"
 * 输出：true
 *
 * 示例 2：
 * 输入：s = "axc", t = "ahbgdc"
 * 输出：false
 *
 *
 *
 */

/**
 * 解题思路：
 * 1. 问题本质
 *    - 判断字符串s是否是字符串t的子序列
 *    - 子序列要求保持字符的相对顺序
 *
 * 2. 双指针解法
 *    - slow指针：指向s中当前要匹配的字符
 *    - fast指针：遍历t寻找匹配的字符
 *
 * 3. 具体执行流程 (以 s="abc", t="ahbgdc" 为例)：
 *    a) 初始状态：
 *       - slow=0, fast=0
 *       - s="abc", t="ahbgdc"
 *    b) fast=0时：
 *       - t[0]='a' 匹配 s[0]='a'
 *       - slow++
 *    c) fast=1时：
 *       - t[1]='h' 不匹配 s[1]='b'
 *       - slow不变
 *    d) fast=2时：
 *       - t[2]='b' 匹配 s[1]='b'
 *       - slow++
 *    e) fast=3时：
 *       - t[3]='g' 不匹配 s[2]='c'
 *       - slow不变
 *    f) fast=4时：
 *       - t[4]='d' 不匹配 s[2]='c'
 *       - slow不变
 *    g) fast=5时：
 *       - t[5]='c' 匹配 s[2]='c'
 *       - slow++
 *       - slow=s.length，返回true
 *
 * 4. 关键点：
 *    - 使用双指针维护匹配位置
 *    - 只在找到匹配字符时移动slow指针
 *    - 保持字符的相对顺序
 *
 * 5. 复杂度：
 *    - 时间：O(n)，n为t的长度
 *    - 空间：O(1)，只使用常数额外空间
 */

export function isSubsequence(s: string, t: string) {
  let slowIndex = 0;

  // while (fastIndex < t.length) {

  //   if (s[slowIndex] === t[fastIndex]){
  //     slowIndex++;

  //     // 如果s已经遍历完，说明找到了所有字符
  //     if (slowIndex === s.length) {
  //       return true;
  //     }
  //   }
  //   fastIndex++;
  // }
  let fastIndex = 0;
  for (; fastIndex < t.length; fastIndex++) {
    if (s[slowIndex] === t[fastIndex]) {
      slowIndex++;

      // 如果s已经遍历完，说明找到了所有字符
      if (slowIndex === s.length) {
        return true;
      }
    }
  }

  return false;
}

export default {
  run: () => {
    const examples = [
      { s: 'abc', t: 'ahbgdc' },
      { s: 'axc', t: 'hbgdc' },
    ];

    examples.forEach(example => {
      console.log(isSubsequence(example.s, example.t));
    });
  },
};
